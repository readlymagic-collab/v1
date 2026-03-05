export interface SessionResult {
  date: string;
  score: number;
  total: number;
  accuracy: number;
  level: number;
}

export function saveSessionResult(result: SessionResult) {
  if (typeof window === "undefined") return;
  const history = getSessionHistory();
  history.unshift(result);
  localStorage.setItem(
    "readly_magic_history",
    JSON.stringify(history.slice(0, 50))
  );
}

export function getSessionHistory(): SessionResult[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("readly_magic_history");
  return stored ? JSON.parse(stored) : [];
}

export function getGlobalStats() {
  const history = getSessionHistory();
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
  localStorage.removeItem("readly_magic_history");
}
