import { useState, useEffect, useCallback, useRef } from 'react';
import { MockWebSocket } from '@/lib/mock-websocket';

const STALE_AFTER_MS = 30_000;

// Replace MockWebSocket with `new WebSocket(WS_URL)` when a real server exists.
function openSocket() {
  return new MockWebSocket();
}

export function useCameras() {
  const [cameras, setCameras] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isStale, setIsStale] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const wsRef = useRef(null);
  const staleTimerRef = useRef(null);
  const pollFallbackRef = useRef(null);

  const resetStaleTimer = useCallback(() => {
    clearTimeout(staleTimerRef.current);
    setIsStale(false);
    staleTimerRef.current = setTimeout(() => setIsStale(true), STALE_AFTER_MS);
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = openSocket();
    wsRef.current = ws;

    ws.onmessage = ({ data }) => {
      const msg = JSON.parse(data);

      if (msg.type === 'snapshot') {
        setCameras(msg.cameras);
        setIsConnected(true);
        setLastUpdated(new Date());
        resetStaleTimer();
        clearInterval(pollFallbackRef.current);
        pollFallbackRef.current = null;
      }

      if (msg.type === 'delta') {
        setCameras((prev) => {
          const map = new Map(prev.map((c) => [c.id, c]));
          for (const { id, status } of msg.updates) {
            if (map.has(id)) map.set(id, { ...map.get(id), status });
          }
          return Array.from(map.values());
        });
        setLastUpdated(new Date());
        resetStaleTimer();
      }
    };

    // On WS failure fall back to polling the mock via reconnect attempts
    ws.onerror = () => {
      setIsConnected(false);
      if (!pollFallbackRef.current) {
        pollFallbackRef.current = setInterval(() => connect(), 15_000);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };
  }, [resetStaleTimer]);

  // Manual refresh: re-open the socket which re-emits a fresh snapshot
  const refresh = useCallback(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      clearTimeout(staleTimerRef.current);
      clearInterval(pollFallbackRef.current);
    };
  }, [connect]);

  return { cameras, lastUpdated, isStale, isConnected, refresh };
}
