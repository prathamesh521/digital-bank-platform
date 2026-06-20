import { mockAnalyticsData } from '@/constants/mockData'
import { mockDelay } from '@/utils'
import type { AnalyticsData } from '@/types'

/** Replace with: apiClient.get('/analytics') */
export const analyticsService = {
  async getAnalytics(): Promise<AnalyticsData> {
    await mockDelay()
    return mockAnalyticsData
  },
}
