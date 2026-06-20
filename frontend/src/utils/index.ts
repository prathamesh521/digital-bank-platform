import { APP_CONFIG } from '@/constants/config'

/** Simulates network latency for mock services */
export const mockDelay = (ms: number = APP_CONFIG.mockDelayMs): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const formatCurrency = (
  amount: number,
  currency = 'INR',
  locale = 'en-IN',
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)

export const formatCurrencyPrecise = (
  amount: number,
  currency = 'INR',
  locale = 'en-IN',
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

export const formatDate = (date: string | Date, locale = 'en-IN'): string =>
  new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))

export const formatDateTime = (date: string | Date, locale = 'en-IN'): string =>
  new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))

export const formatRelativeTime = (date: string | Date): string => {
  const now = Date.now()
  const then = new Date(date).getTime()
  const diffMs = now - then
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

export const calculateEmi = (
  principal: number,
  annualRate: number,
  months: number,
): { emi: number; totalPayable: number; totalInterest: number } => {
  if (months <= 0 || principal <= 0) {
    return { emi: 0, totalPayable: 0, totalInterest: 0 }
  }

  const monthlyRate = annualRate / 12 / 100
  if (monthlyRate === 0) {
    const emi = principal / months
    return { emi, totalPayable: principal, totalInterest: 0 }
  }

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayable = emi * months
  const totalInterest = totalPayable - principal

  return { emi, totalPayable, totalInterest }
}

export const cn = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(' ')

export const getInitials = (firstName: string, lastName: string): string =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

export const maskAccountNumber = (accountNumber: string): string => {
  if (accountNumber.length <= 4) return accountNumber
  return `****${accountNumber.slice(-4)}`
}
