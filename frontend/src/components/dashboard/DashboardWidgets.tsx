import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import type { Transaction } from '@/types'
import { formatCurrency, formatDate, formatRelativeTime } from '@/utils'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import type { ComponentType } from 'react'

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}: {
  title: string
  value: string
  subtitle?: string
  icon: ComponentType<{ className?: string }>
  trend?: { value: string; positive: boolean }
  variant?: 'default' | 'primary' | 'accent'
}) {
  const bgMap = {
    default: 'bg-white',
    primary: 'gradient-brand text-white',
    accent: 'bg-emerald-500 text-white',
  }

  const iconBgMap = {
    default: 'bg-brand-100 text-brand-600',
    primary: 'bg-white/20 text-white',
    accent: 'bg-white/20 text-white',
  }

  return (
    <Card
      className={`${bgMap[variant]} ${variant !== 'default' ? 'border-0 shadow-lg' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-sm font-medium ${variant === 'default' ? 'text-slate-500' : 'text-white/80'}`}
          >
            {title}
          </p>
          <p
            className={`mt-2 text-2xl font-bold ${variant === 'default' ? 'text-slate-900' : 'text-white'}`}
          >
            {value}
          </p>
          {subtitle && (
            <p
              className={`mt-1 text-xs ${variant === 'default' ? 'text-slate-400' : 'text-white/70'}`}
            >
              {subtitle}
            </p>
          )}
          {trend && (
            <p
              className={`mt-2 text-xs font-medium ${trend.positive ? 'text-emerald-400' : 'text-red-300'}`}
            >
              {trend.value}
            </p>
          )}
        </div>
        <div className={`rounded-xl p-3 ${iconBgMap[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isCredit = transaction.type === 'credit'

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            isCredit ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {isCredit ? (
            <ArrowDownLeft className="h-4 w-4" />
          ) : (
            <ArrowUpRight className="h-4 w-4" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{transaction.description}</p>
          <p className="text-xs text-slate-500">
            {formatDate(transaction.date)} · {transaction.category}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-semibold ${isCredit ? 'text-emerald-600' : 'text-slate-900'}`}
        >
          {isCredit ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>
        <Badge variant={transaction.status === 'completed' ? 'success' : 'warning'}>
          {transaction.status}
        </Badge>
      </div>
    </div>
  )
}

export function NotificationItem({
  title,
  message,
  timestamp,
  type,
}: {
  title: string
  message: string
  timestamp: string
  type: 'info' | 'success' | 'warning' | 'error'
}) {
  const dotColor = {
    info: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  }

  return (
    <div className="relative flex gap-4 pb-8 last:pb-0">
      <div className="flex flex-col items-center">
        <div className={`h-3 w-3 rounded-full ${dotColor[type]} ring-4 ring-white`} />
        <div className="mt-1 w-px flex-1 bg-slate-200" />
      </div>
      <div className="flex-1 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          <span className="shrink-0 text-xs text-slate-400">
            {formatRelativeTime(timestamp)}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">{message}</p>
      </div>
    </div>
  )
}

export function SavingsGoalProgress({
  label,
  current,
  target,
}: {
  label: string
  current: number
  target: number
}) {
  const percentage = Math.min(Math.round((current / target) * 100), 100)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-brand-600">{percentage}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full gradient-brand transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{formatCurrency(current)} saved</span>
        <span>Goal: {formatCurrency(target)}</span>
      </div>
    </div>
  )
}
