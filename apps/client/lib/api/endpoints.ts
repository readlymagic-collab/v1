
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    ADMIN_LOGIN: "/api/admin/login",
    ADMIN_VERIFY: "/api/admin/verify",
  },

  // Student Section (SSR)
  STUDENTS: {
    LIST: "/api/students",
    PROFILE: (id: string) => `/api/students/${id}`,
    SESSIONS: (id: string) => `/api/students/${id}/sessions`,
  },

  // Reading Content
  CONTENT: {
    PASSAGES: "/api/passages",
    PASSAGE_DETAIL: (slug: string) => `/api/passages/${slug}`,
    CATEGORIES: "/api/passages/categories",
  },

  // Parent Section
  PARENT: {
    DASHBOARD: "/api/parent/dashboard",
    STUDENTS: "/api/parent/students",
  },

  // System
  SYSTEM: {
    HEALTH: "/api/health",
    STATS: "/api/admin/stats",
  }
} as const;
