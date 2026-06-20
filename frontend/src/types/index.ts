export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  avatarUrl?: string
  address: Address
  memberSince: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'cancelled'
export type TransactionType = 'credit' | 'debit'

export interface Transaction {
  id: string
  description: string
  category: string
  amount: number
  type: TransactionType
  status: TransactionStatus
  date: string
  reference: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface TransactionFilters {
  search?: string
  status?: TransactionStatus | 'all'
  type?: TransactionType | 'all'
  page?: number
  pageSize?: number
}

export interface DashboardSummary {
  totalBalance: number
  monthlySpending: number
  monthlyIncome: number
  rewardsPoints: number
  savingsGoal: SavingsGoal
  loanSummary: LoanSummary
  recentTransactions: Transaction[]
  notifications: AppNotification[]
}

export interface SavingsGoal {
  target: number
  current: number
  label: string
}

export interface LoanSummary {
  activeLoans: number
  totalOutstanding: number
  nextEmiAmount: number
  nextEmiDate: string
}

export interface AppNotification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: string
  read: boolean
}

export interface Beneficiary {
  id: string
  name: string
  accountNumber: string
  bankName: string
  ifscCode: string
  nickname?: string
}

export interface AnalyticsData {
  monthlyExpenses: ChartDataPoint[]
  spendingCategories: CategorySpend[]
  incomeVsExpense: IncomeExpensePoint[]
  savingsTrend: ChartDataPoint[]
}

export interface ChartDataPoint {
  label: string
  value: number
}

export interface CategorySpend {
  category: string
  amount: number
  color: string
}

export interface IncomeExpensePoint {
  month: string
  income: number
  expense: number
}

export interface LoanCalculationInput {
  amount: number
  interestRate: number
  durationMonths: number
}

export interface LoanCalculationResult {
  emi: number
  totalPayable: number
  totalInterest: number
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Offer {
  id: string
  title: string
  description: string
  badge?: string
}

export interface ApiError {
  message: string
  statusCode?: number
}
