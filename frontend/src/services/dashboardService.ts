import apiClient from '@/services/apiClient'
import type { DashboardSummary } from '@/types'
import { mapDashboardSummary, type ApiDashboardSummary } from '@/utils/apiMappers'

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const { data } = await apiClient.get<ApiDashboardSummary>('/api/dashboard/summary')
    return mapDashboardSummary(data)
  },
}
