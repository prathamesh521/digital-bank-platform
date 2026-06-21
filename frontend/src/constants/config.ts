/**
 * Central configuration for API integration.
 * Set VITE_API_BASE_URL in .env (host only, no /api suffix).
 */
export const APP_CONFIG = {
  appName: 'NextGen Bank',
  tagline: 'Banking reimagined for the digital age',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'https://digital-bank-platform-api.onrender.com',
  mockDelayMs: 400,
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50],
  },
} as const
