import baseData from '../../data/cameras.json';

const ALL_STATUSES = ['ACTIVE', 'OFFLINE', 'DOCKED', 'LOW BATTERY'];

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Simulates a WebSocket connection that pushes camera status delta events.
 *
 * Exposes the same callback surface as the browser WebSocket API:
 *   ws.onmessage = ({ data }) => { ... }   // data is a JSON string
 *   ws.onerror   = (err) => { ... }
 *   ws.onclose   = () => { ... }
 *   ws.close()
 *
 * Swap `new MockWebSocket()` for `new WebSocket(WS_URL)` when a real
 * server is available — the useCameras hook won't need to change.
 *
 * Each tick emits: { type: 'delta', updates: [{ id, status }] }
 * A full snapshot on open:  { type: 'snapshot', cameras: [...] }
 */
export class MockWebSocket {
  constructor() {
    this.onmessage = null;
    this.onerror = null;
    this.onclose = null;
    this._interval = null;
    this._closed = false;

    // Emit initial snapshot on next tick so the caller can attach handlers first
    setTimeout(() => {
      if (this._closed) return;
      this._emit({ type: 'snapshot', cameras: baseData.cameras });
      this._startTicking();
    }, 0);
  }

  close() {
    this._closed = true;
    clearInterval(this._interval);
    this._interval = null;
    this.onclose?.();
  }

  _emit(payload) {
    this.onmessage?.({ data: JSON.stringify(payload) });
  }

  _startTicking() {
    // Push delta updates every 3–6 seconds to simulate live churn
    const jitter = () => 3000 + Math.random() * 3000;

    const tick = () => {
      if (this._closed) return;

      const count = 2 + Math.floor(Math.random() * 4); // 2–5 cameras per tick
      const chosen = pickRandom(baseData.cameras, count);
      const updates = chosen.map((cam) => ({
        id: cam.id,
        status: ALL_STATUSES[Math.floor(Math.random() * ALL_STATUSES.length)],
      }));

      this._emit({ type: 'delta', updates });
      this._interval = setTimeout(tick, jitter());
    };

    this._interval = setTimeout(tick, jitter());
  }
}
