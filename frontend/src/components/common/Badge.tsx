import { cn } from '@/utils'
import type { TransactionStatus } from '@/types'
import type { ReactNode } from 'react'

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  outline: 'border border-slate-200 bg-white text-slate-600',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const map: Record<TransactionStatus, BadgeVariant> = {
    completed: 'success',
    pending: 'warning',
    failed: 'error',
    cancelled: 'default',
  }
  return <Badge variant={map[status]}>{status}</Badge>
}

export function TypeBadge({ type }: { type: 'credit' | 'debit' }) {
  return (
    <Badge variant={type === 'credit' ? 'success' : 'default'}>
      {type}
    </Badge>
  )
}
