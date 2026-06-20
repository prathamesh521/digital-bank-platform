import { mockNotifications } from '@/constants/mockData'
import { mockDelay } from '@/utils'
import type { AppNotification } from '@/types'

/** Replace with: apiClient.get('/notifications') */
export const notificationService = {
  async getNotifications(): Promise<AppNotification[]> {
    await mockDelay()
    return mockNotifications
  },
}
