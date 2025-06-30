"use client";

import { useState, useEffect } from "react";

interface ChatConnectionStatusProps {
  connectionStatus: string;
  isConnected: boolean;
  isConnecting: boolean;
  hasError: boolean;
  onReconnect?: () => void;
}

export default function ChatConnectionStatus({
  connectionStatus,
  isConnected,
  isConnecting,
  hasError,
  onReconnect
}: ChatConnectionStatusProps) {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [statusHistory, setStatusHistory] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering time on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setLastUpdate(timeString);
      setStatusHistory(prev => [...prev.slice(-4), `${timeString}: ${connectionStatus}`]);
    }
  }, [connectionStatus, isClient]);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "error":
        return "Connection Error";
      case "disconnected":
        return "Disconnected";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">Chat Connection Status</h3>
        <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm">
          <span className="font-medium">Status:</span> {getStatusText()}
        </div>
        
        {isClient && lastUpdate && (
          <div className="text-xs text-gray-500">
            Last update: {lastUpdate}
          </div>
        )}

        {hasError && onReconnect && (
          <button
            onClick={onReconnect}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Reconnect
          </button>
        )}

        {isClient && statusHistory.length > 0 && (
          <div className="mt-2">
            <div className="text-xs font-medium text-gray-600 mb-1">Recent Status Changes:</div>
            <div className="text-xs text-gray-500 space-y-1 max-h-20 overflow-y-auto">
              {statusHistory.map((status, index) => (
                <div key={index} className="font-mono">
                  {status}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 