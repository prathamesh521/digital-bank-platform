import { mockUser } from '@/constants/mockData'
import { mockDelay } from '@/utils'
import type { User } from '@/types'

/** Replace with: apiClient.get('/profile') */
export const profileService = {
  async getProfile(): Promise<User> {
    await mockDelay()
    return mockUser
  },
}
