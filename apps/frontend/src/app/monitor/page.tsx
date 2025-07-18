"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeCheck, XCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type ServiceStatus = {
  health: number;
  latency: number;
  uptime: number;
};

export default function MonitorPage() {
  const [status, setStatus] = useState<Record<string, ServiceStatus> | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("http://localhost:8080/status");
        setStatus(await res.json());
      } catch {
        setStatus(null);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!status) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Service Health Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2">Service</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Uptime (s)</th>
                <th className="text-left py-2">Latency (ms)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(status).map(([svc, stats]) => (
                <tr key={svc} className="border-t">
                  <td className="py-2 font-medium">{svc}</td>
                  <td className="py-2">
                    {stats.health === 1 ? (
                      <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                        <BadgeCheck className="w-4 h-4" /> UP
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle className="w-4 h-4" /> DOWN
                      </span>
                    )}
                  </td>
                  <td className="py-2">{stats.health === 1 ? stats.uptime.toFixed(0) : "-"}</td>
                  <td className="py-2">{stats.health === 1 ? stats.latency.toFixed(1) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
} 