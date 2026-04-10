export interface SessionResult {
  date: string;
  score: number;
  total: number;
  accuracy: number;
  level: number;
}

const API_URL = 'http://localhost:5000/api';

export async function saveSessionResult(result: SessionResult) {
  // 1. Save locally as fallback
  if (typeof window !== "undefined") {
    const history = getSessionHistoryLocally();
    history.unshift(result);
    localStorage.setItem(
      "readly_magic_history",
      JSON.stringify(history.slice(0, 50))
    );
  }

  // 2. Sync to Backend (MongoDB)
  try {
    await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
  } catch (err) {
    console.warn('Backend sync failed, using offline storage:', err);
  }
}

function getSessionHistoryLocally(): SessionResult[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("readly_magic_history");
  return stored ? JSON.parse(stored) : [];
}

export async function getSessionHistory(): Promise<SessionResult[]> {
  try {
    const response = await fetch(`${API_URL}/sessions`);
    if (response.ok) {
      const result = await response.json();
      // Extract data from the structured response
      return (result.data || []).map((s: any) => ({
        ...s,
        date: s.timestamp || s.date 
      }));
    }
  } catch (err) {
    console.warn('Backend fetch failed, using local history:', err);
  }
  return getSessionHistoryLocally();
}

export async function getGlobalStats() {
  try {
    const response = await fetch(`${API_URL}/stats`);
    if (response.ok) {
      const result = await response.json();
      return result.data;
    }
  } catch (err) {
    console.warn('Backend stats failed, calculating locally:', err);
  }

  const history = getSessionHistoryLocally();
  const totalSessions = history.length;
  const avgAccuracy =
    totalSessions > 0
      ? history.reduce((acc, curr) => acc + curr.accuracy, 0) / totalSessions
      : 0;

  return {
    totalSessions,
    avgAccuracy: Math.round(avgAccuracy),
  };
}

export function resetDemoData() { 
  if (typeof window !== "undefined") {
    localStorage.removeItem("readly_magic_history");
  }
}
