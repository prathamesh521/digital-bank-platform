import apiClient from '@/services/apiClient'
import type { AuthCredentials, AuthResponse } from '@/types'
import { mapUser, type ApiUser } from '@/utils/apiMappers'

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<{ token: string; user: ApiUser }>(
      '/api/auth/login',
      credentials,
    )
    return { token: data.token, user: mapUser(data.user) }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  },

  async getCurrentUser(): Promise<AuthResponse['user'] | null> {
    const token = localStorage.getItem('auth_token')
    if (!token) return null

    try {
      const { data } = await apiClient.get<ApiUser>('/api/profile')
      return mapUser(data)
    } catch {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      return null
    }
  },
}
