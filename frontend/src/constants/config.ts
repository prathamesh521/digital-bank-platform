/**
 * Central configuration for API integration.
 * When connecting to Spring Boot, update VITE_API_BASE_URL in .env
 * and swap mock implementations in services/ for axios calls.
 */
export const APP_CONFIG = {
  appName: 'NextGen Bank',
  tagline: 'Banking reimagined for the digital age',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  mockDelayMs: 400,
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50],
  },
} as const
