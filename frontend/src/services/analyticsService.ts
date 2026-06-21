import apiClient from '@/services/apiClient'
import type { AnalyticsData } from '@/types'
import { mapAnalytics, type ApiAnalytics } from '@/utils/apiMappers'

export const analyticsService = {
  async getAnalytics(): Promise<AnalyticsData> {
    const { data } = await apiClient.get<ApiAnalytics>('/api/analytics')
    return mapAnalytics(data)
  },
}
