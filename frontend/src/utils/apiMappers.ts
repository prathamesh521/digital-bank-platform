import type {
  AnalyticsData,
  AppNotification,
  Beneficiary,
  DashboardSummary,
  Transaction,
  TransactionStatus,
  TransactionType,
  User,
} from '@/types'

const CATEGORY_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']

export interface ApiAddress {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface ApiUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  accountNumber?: string
  balance?: number
  rewardsPoints?: number
  address: ApiAddress
  createdAt: string
}

export interface ApiTransaction {
  id: string
  type: string
  status: string
  amount: number
  description: string
  category: string
  referenceNumber: string
  transactionDate: string
}

export interface ApiNotification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface ApiSavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline?: string
  active: boolean
}

export interface ApiLoanSummary {
  id: string
  loanType: string
  outstandingBalance: number
  monthlyEmi: number
  startDate: string
  endDate: string
}

export interface ApiDashboardSummary {
  totalBalance: number
  monthlySpending: number
  monthlyIncome: number
  rewardsPoints: number
  activeSavingsGoal: ApiSavingsGoal | null
  loanSummary: ApiLoanSummary | null
  recentTransactions: ApiTransaction[]
  recentNotifications: ApiNotification[]
}

export interface ApiAnalytics {
  monthlyExpenses: { month: string; amount: number }[]
  categorySpending: { category: string; amount: number }[]
  incomeVsExpense: { income: number; expense: number }
  savingsTrend: { month: string; amount: number }[]
}

const toNumber = (value: number | string | null | undefined): number =>
  value == null ? 0 : Number(value)

const toTransactionType = (type: string): TransactionType => {
  const normalized = type.toLowerCase()
  return normalized === 'credit' ? 'credit' : 'debit'
}

const toTransactionStatus = (status: string): TransactionStatus =>
  status.toLowerCase() as TransactionStatus

const toNotificationType = (type: string): AppNotification['type'] => {
  switch (type.toUpperCase()) {
    case 'SECURITY':
      return 'warning'
    case 'PROMOTION':
    case 'SAVINGS':
      return 'success'
    case 'LOAN':
      return 'error'
    default:
      return 'info'
  }
}

export const mapUser = (user: ApiUser): User => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  memberSince: user.createdAt,
  address: {
    street: user.address.street,
    city: user.address.city,
    state: user.address.state,
    zipCode: user.address.postalCode,
    country: user.address.country,
  },
})

export const mapTransaction = (txn: ApiTransaction): Transaction => ({
  id: txn.id,
  description: txn.description,
  category: txn.category,
  amount: toNumber(txn.amount),
  type: toTransactionType(txn.type),
  status: toTransactionStatus(txn.status),
  date: txn.transactionDate,
  reference: txn.referenceNumber,
})

export const mapNotification = (notif: ApiNotification): AppNotification => ({
  id: notif.id,
  title: notif.title,
  message: notif.message,
  type: toNotificationType(notif.type),
  timestamp: notif.createdAt,
  read: notif.read,
})

export const mapDashboardSummary = (dto: ApiDashboardSummary): DashboardSummary => ({
  totalBalance: toNumber(dto.totalBalance),
  monthlySpending: toNumber(dto.monthlySpending),
  monthlyIncome: toNumber(dto.monthlyIncome),
  rewardsPoints: dto.rewardsPoints ?? 0,
  savingsGoal: dto.activeSavingsGoal
    ? {
        label: dto.activeSavingsGoal.name,
        current: toNumber(dto.activeSavingsGoal.currentAmount),
        target: toNumber(dto.activeSavingsGoal.targetAmount),
      }
    : { label: 'No active goal', current: 0, target: 0 },
  loanSummary: dto.loanSummary
    ? {
        activeLoans: 1,
        totalOutstanding: toNumber(dto.loanSummary.outstandingBalance),
        nextEmiAmount: toNumber(dto.loanSummary.monthlyEmi),
        nextEmiDate: dto.loanSummary.endDate ?? dto.loanSummary.startDate,
      }
    : {
        activeLoans: 0,
        totalOutstanding: 0,
        nextEmiAmount: 0,
        nextEmiDate: new Date().toISOString(),
      },
  recentTransactions: dto.recentTransactions.map(mapTransaction),
  notifications: dto.recentNotifications.map(mapNotification),
})

export const mapAnalytics = (dto: ApiAnalytics): AnalyticsData => ({
  monthlyExpenses: dto.monthlyExpenses.map((item) => ({
    label: item.month,
    value: toNumber(item.amount),
  })),
  spendingCategories: dto.categorySpending.map((item, index) => ({
    category: item.category,
    amount: toNumber(item.amount),
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
  })),
  incomeVsExpense: [
    {
      month: 'Overall',
      income: toNumber(dto.incomeVsExpense.income),
      expense: toNumber(dto.incomeVsExpense.expense),
    },
  ],
  savingsTrend: dto.savingsTrend.map((item) => ({
    label: item.month,
    value: toNumber(item.amount),
  })),
})

export const mapBeneficiary = (item: {
  id: string
  name: string
  accountNumber: string
  bankName: string
  ifscCode: string
  nickname?: string
}): Beneficiary => ({
  id: item.id,
  name: item.name,
  accountNumber: item.accountNumber,
  bankName: item.bankName,
  ifscCode: item.ifscCode,
  nickname: item.nickname,
})
