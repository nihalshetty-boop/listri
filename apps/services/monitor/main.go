package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	dto "github.com/prometheus/client_model/go"
)

var (
	serviceURLs = map[string]string{
		"frontend": "http://localhost:3000",
		"backend":  "http://localhost:4000",
		"chat":     "http://localhost:8081",
	}

	uptimeGauge = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "service_uptime_seconds",
			Help: "Uptime of monitored services in seconds.",
		},
		[]string{"service"},
	)

	latencyGauge = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "service_latency_ms",
			Help: "HTTP latency to monitored services in milliseconds.",
		},
		[]string{"service"},
	)

	healthGauge = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "service_health",
			Help: "Health status of monitored services (1=up, 0=down).",
		},
		[]string{"service"},
	)

	uptimeStart = map[string]time.Time{}
)

func checkService(service, url string) {
	start := time.Now()
	resp, err := http.Get(url)
	latency := float64(time.Since(start).Milliseconds())
	latencyGauge.WithLabelValues(service).Set(latency)

	if err != nil || resp.StatusCode >= 400 {
		healthGauge.WithLabelValues(service).Set(0)
		uptimeStart[service] = time.Time{} // reset uptime
		uptimeGauge.WithLabelValues(service).Set(0)
		return
	}
	defer resp.Body.Close()

	healthGauge.WithLabelValues(service).Set(1)
	if uptimeStart[service].IsZero() {
		uptimeStart[service] = time.Now()
	}
	uptime := time.Since(uptimeStart[service]).Seconds()
	uptimeGauge.WithLabelValues(service).Set(uptime)
}

func monitorServices() {
	for {
		for svc, url := range serviceURLs {
			checkService(svc, url)
		}
		time.Sleep(10 * time.Second)
	}
}

func getGaugeValue(gauge *prometheus.GaugeVec, label string) float64 {
	var m prometheus.Metric
	ch := make(chan prometheus.Metric, 1)
	gauge.WithLabelValues(label).Collect(ch)
	select {
	case m = <-ch:
		var pb dto.Metric
		if err := m.Write(&pb); err == nil {
			if pb.Gauge != nil {
				return pb.Gauge.GetValue()
			}
		}
	default:
	}
	return 0
}

func statusHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	status := make(map[string]map[string]interface{})
	for svc := range serviceURLs {
		status[svc] = map[string]interface{}{
			"health":  getGaugeValue(healthGauge, svc),
			"latency": getGaugeValue(latencyGauge, svc),
			"uptime":  getGaugeValue(uptimeGauge, svc),
		}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(status)
}

func dashboardHandler(w http.ResponseWriter, r *http.Request) {
	dashboard := `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MonitorService Dashboard</title>
  <style>
    body { font-family: sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
    h1 { background: #222; color: #fff; margin: 0; padding: 1rem; }
    table { margin: 2rem auto; border-collapse: collapse; min-width: 400px; background: #fff; box-shadow: 0 2px 8px #0001; }
    th, td { padding: 0.75rem 1.5rem; text-align: center; border-bottom: 1px solid #eee; }
    th { background: #f1f1f1; }
    tr:last-child td { border-bottom: none; }
    .up { color: #2ecc40; font-weight: bold; }
    .down { color: #ff4136; font-weight: bold; }
  </style>
</head>
<body>
  <h1>MonitorService Dashboard</h1>
  <table id="status-table">
    <thead>
      <tr><th>Service</th><th>Status</th><th>Uptime (s)</th><th>Latency (ms)</th></tr>
    </thead>
    <tbody></tbody>
  </table>
  <script>
    async function fetchStatus() {
      const res = await fetch('/status');
      const data = await res.json();
      const tbody = document.querySelector('#status-table tbody');
      tbody.innerHTML = '';
      for (const [svc, stats] of Object.entries(data)) {
        const up = stats.health === 1;
        tbody.innerHTML += '<tr><td>' + svc + '</td><td class="' + (up ? 'up' : 'down') + '">' + (up ? 'UP' : 'DOWN') + '</td><td>' + (up ? stats.uptime.toFixed(0) : '-') + '</td><td>' + (up ? stats.latency.toFixed(1) : '-') + '</td></tr>';
      }
    }
    fetchStatus();
    setInterval(fetchStatus, 5000);
  </script>
</body>
</html>`
	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(dashboard))
}

func main() {
	prometheus.MustRegister(uptimeGauge, latencyGauge, healthGauge)

	go monitorServices()

	http.Handle("/metrics", promhttp.Handler())
	http.HandleFunc("/status", statusHandler)
	http.HandleFunc("/", dashboardHandler)

	log.Println("MonitorService running on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
} 