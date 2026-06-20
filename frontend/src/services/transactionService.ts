import { filterTransactions, mockTransactions } from '@/constants/mockData'
import { mockDelay } from '@/utils'
import type { PaginatedResponse, Transaction, TransactionFilters } from '@/types'

/** Replace with: apiClient.get('/transactions', { params: filters }) */
export const transactionService = {
  async getTransactions(filters: TransactionFilters = {}): Promise<PaginatedResponse<Transaction>> {
    await mockDelay()
    return filterTransactions(mockTransactions, filters)
  },

  async getTransactionById(id: string): Promise<Transaction | null> {
    await mockDelay()
    return mockTransactions.find((t) => t.id === id) ?? null
  },
}
