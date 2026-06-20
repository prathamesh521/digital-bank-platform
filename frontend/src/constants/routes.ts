export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/dashboard/transactions',
  ANALYTICS: '/dashboard/analytics',
  LOANS: '/dashboard/loans',
  BENEFICIARIES: '/dashboard/beneficiaries',
  NOTIFICATIONS: '/dashboard/notifications',
  PROFILE: '/dashboard/profile',
} as const

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.SERVICES,
  ROUTES.CONTACT,
  ROUTES.LOGIN,
] as const

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.TRANSACTIONS,
  ROUTES.ANALYTICS,
  ROUTES.LOANS,
  ROUTES.BENEFICIARIES,
  ROUTES.NOTIFICATIONS,
  ROUTES.PROFILE,
] as const
