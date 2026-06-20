import { Card, CardHeader, CardTitle } from '@/components/common/Card'
import { ErrorState } from '@/components/common/ErrorState'
import { PageLoader } from '@/components/common/Loader'
import {
  IncomeVsExpenseChart,
  MonthlyExpensesChart,
  SavingsTrendChart,
  SpendingCategoriesChart,
} from '@/components/charts/AnalyticsCharts'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { DashboardHeader } from '@/components/layout/Sidebar'
import { analyticsService } from '@/services/analyticsService'
import { useQuery } from '@tanstack/react-query'

export default function AnalyticsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => analyticsService.getAnalytics(),
  })

  if (isLoading) return <PageLoader />
  if (isError || !data) return <ErrorState onRetry={() => void refetch()} />

  return (
    <div>
      <Breadcrumb items={[{ label: 'Analytics' }]} />
      <DashboardHeader
        title="Financial Analytics"
        subtitle="Insights into your spending patterns and savings growth."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <MonthlyExpensesChart data={data.monthlyExpenses} />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <SpendingCategoriesChart data={data.spendingCategories} />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Income vs Expense</CardTitle>
          </CardHeader>
          <IncomeVsExpenseChart data={data.incomeVsExpense} />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Trend</CardTitle>
          </CardHeader>
          <SavingsTrendChart data={data.savingsTrend} />
        </Card>
      </div>
    </div>
  )
}
