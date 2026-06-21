import apiClient from '@/services/apiClient'
import type { User } from '@/types'
import { mapUser, type ApiUser } from '@/utils/apiMappers'

export const profileService = {
  async getProfile(): Promise<User> {
    const { data } = await apiClient.get<ApiUser>('/api/profile')
    return mapUser(data)
  },
}
