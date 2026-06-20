import { mockDelay } from '@/utils'
import type { AuthCredentials, AuthResponse } from '@/types'
import { mockUser } from '@/constants/mockData'

/**
 * Auth service — replace mock with: apiClient.post('/auth/login', credentials)
 */
export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    await mockDelay()

    if (!credentials.email || !credentials.password) {
      throw { message: 'Email and password are required', statusCode: 400 }
    }

    // Mock: accept any non-empty credentials
    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: { ...mockUser, email: credentials.email },
    }
  },

  async logout(): Promise<void> {
    await mockDelay(200)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  },

  async getCurrentUser(): Promise<AuthResponse['user'] | null> {
    await mockDelay(200)
    const stored = localStorage.getItem('auth_user')
    if (!stored) return null
    return JSON.parse(stored) as AuthResponse['user']
  },
}
