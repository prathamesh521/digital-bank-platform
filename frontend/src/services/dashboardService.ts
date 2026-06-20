import { mockDashboardSummary } from '@/constants/mockData'
import { mockDelay } from '@/utils'
import type { DashboardSummary } from '@/types'

/** Replace with: apiClient.get('/dashboard/summary') */
export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    await mockDelay()
    return mockDashboardSummary
  },
}
