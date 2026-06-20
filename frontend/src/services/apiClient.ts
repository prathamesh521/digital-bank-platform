import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { APP_CONFIG } from '@/constants/config'
import type { ApiError } from '@/types'

/**
 * Shared axios instance for Spring Boot REST API integration.
 * Mock services bypass this for now; real services should use apiClient.
 */
export const apiClient = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const message =
      error.response?.data?.message ?? error.message ?? 'An unexpected error occurred'
    return Promise.reject({ message, statusCode: error.response?.status })
  },
)

export default apiClient
