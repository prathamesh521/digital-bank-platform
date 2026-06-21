import apiClient from '@/services/apiClient'
import type { PaginatedResponse, Transaction, TransactionFilters } from '@/types'
import { mapTransaction, type ApiTransaction } from '@/utils/apiMappers'

interface ApiPaginatedTransactions {
  data: ApiTransaction[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

function toApiParams(filters: TransactionFilters) {
  return {
    page: filters.page ?? 1,
    pageSize: filters.pageSize ?? 10,
    ...(filters.search && { search: filters.search }),
    ...(filters.type && filters.type !== 'all' && { type: filters.type.toUpperCase() }),
    ...(filters.status && filters.status !== 'all' && { status: filters.status.toUpperCase() }),
  }
}

export const transactionService = {
  async getTransactions(filters: TransactionFilters = {}): Promise<PaginatedResponse<Transaction>> {
    const { data } = await apiClient.get<ApiPaginatedTransactions>('/api/transactions', {
      params: toApiParams(filters),
    })
    return {
      data: data.data.map(mapTransaction),
      total: data.total,
      page: data.page,
      pageSize: data.pageSize,
      totalPages: data.totalPages,
    }
  },

  async getTransactionById(id: string): Promise<Transaction | null> {
    try {
      const { data } = await apiClient.get<ApiTransaction>(`/api/transactions/${id}`)
      return mapTransaction(data)
    } catch {
      return null
    }
  },
}
