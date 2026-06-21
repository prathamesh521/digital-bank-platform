import apiClient from '@/services/apiClient'
import type { Beneficiary } from '@/types'
import { mapBeneficiary } from '@/utils/apiMappers'

export const beneficiaryService = {
  async getBeneficiaries(): Promise<Beneficiary[]> {
    const { data } = await apiClient.get<
      {
        id: string
        name: string
        accountNumber: string
        bankName: string
        ifscCode: string
        nickname?: string
      }[]
    >('/api/beneficiaries')
    return data.map(mapBeneficiary)
  },
}
