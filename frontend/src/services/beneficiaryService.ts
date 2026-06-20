import { mockBeneficiaries } from '@/constants/mockData'
import { mockDelay } from '@/utils'
import type { Beneficiary } from '@/types'

/** Replace with: apiClient.get('/beneficiaries') */
export const beneficiaryService = {
  async getBeneficiaries(): Promise<Beneficiary[]> {
    await mockDelay()
    return mockBeneficiaries
  },
}
