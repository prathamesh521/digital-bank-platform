import { Button } from '@/components/common/Button'
import { Card, CardHeader, CardTitle } from '@/components/common/Card'
import { ErrorState } from '@/components/common/ErrorState'
import { PageLoader } from '@/components/common/Loader'
import {
  NotificationItem,
  SavingsGoalProgress,
  StatCard,
  TransactionRow,
} from '@/components/dashboard/DashboardWidgets'
import { DashboardHeader } from '@/components/layout/Sidebar'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/context/AuthContext'
import { dashboardService } from '@/services/dashboardService'
import { formatCurrency, formatDate } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeftRight,
  Bell,
  CreditCard,
  Gift,
  PiggyBank,
  Send,
  TrendingDown,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const quickActions = [
  { label: 'Transfer', icon: Send, to: ROUTES.BENEFICIARIES },
  { label: 'Pay Bills', icon: CreditCard, to: ROUTES.TRANSACTIONS },
  { label: 'Add Money', icon: Wallet, to: ROUTES.TRANSACTIONS },
  { label: 'Exchange', icon: ArrowLeftRight, to: ROUTES.TRANSACTIONS },
]

export default function DashboardPage() {
  const { user } = useAuth()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: () => dashboardService.getSummary(),
  })

  if (isLoading) return <PageLoader />
  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />
  }

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div>
      <DashboardHeader
        title={`${greeting()}, ${user?.firstName ?? 'Customer'}!`}
        subtitle="Here's an overview of your finances today."
      />

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={formatCurrency(data.totalBalance)}
          subtitle="Across all accounts"
          icon={Wallet}
          variant="primary"
        />
        <StatCard
          title="Monthly Spending"
          value={formatCurrency(data.monthlySpending)}
          trend={{ value: '↓ 8% vs last month', positive: true }}
          icon={TrendingDown}
        />
        <StatCard
          title="Rewards Points"
          value={data.rewardsPoints.toLocaleString()}
          subtitle="Redeem for cashback"
          icon={Gift}
          variant="accent"
        />
        <StatCard
          title="Monthly Income"
          value={formatCurrency(data.monthlyIncome)}
          subtitle="Including salary & credits"
          icon={PiggyBank}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.to}>
                  <button className="flex w-full flex-col items-center gap-2 rounded-xl border border-slate-100 p-4 transition-all hover:border-brand-200 hover:bg-brand-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">{action.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link to={ROUTES.TRANSACTIONS}>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {data.recentTransactions.map((txn) => (
                <TransactionRow key={txn.id} transaction={txn} />
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Savings Goal */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Goal</CardTitle>
            </CardHeader>
            <SavingsGoalProgress
              label={data.savingsGoal.label}
              current={data.savingsGoal.current}
              target={data.savingsGoal.target}
            />
          </Card>

          {/* Loan Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
            </CardHeader>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Active Loans</span>
                <span className="font-semibold">{data.loanSummary.activeLoans}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Outstanding</span>
                <span className="font-semibold">
                  {formatCurrency(data.loanSummary.totalOutstanding)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Next EMI</span>
                <span className="font-semibold text-brand-600">
                  {formatCurrency(data.loanSummary.nextEmiAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Due Date</span>
                <span className="font-semibold">
                  {formatDate(data.loanSummary.nextEmiDate)}
                </span>
              </div>
            </div>
            <Link to={ROUTES.LOANS} className="mt-4 block">
              <Button variant="outline" size="sm" className="w-full">
                View Calculator
              </Button>
            </Link>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </CardTitle>
              <Link to={ROUTES.NOTIFICATIONS}>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div>
              {data.notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  title={notif.title}
                  message={notif.message}
                  timestamp={notif.timestamp}
                  type={notif.type}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
