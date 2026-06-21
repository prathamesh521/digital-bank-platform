import apiClient from '@/services/apiClient'
import type { AppNotification } from '@/types'
import { mapNotification, type ApiNotification } from '@/utils/apiMappers'

export const notificationService = {
  async getNotifications(): Promise<AppNotification[]> {
    const { data } = await apiClient.get<ApiNotification[]>('/api/notifications')
    return data.map(mapNotification)
  },
}
