import { Button } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Modal } from '@/components/common/Modal'
import { PageLoader } from '@/components/common/Loader'
import { BeneficiaryCard } from '@/components/cards/BeneficiaryCard'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { DashboardHeader } from '@/components/layout/Sidebar'
import { beneficiaryService } from '@/services/beneficiaryService'
import type { Beneficiary } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Plus, UserPlus } from 'lucide-react'
import { useState } from 'react'

export default function BeneficiariesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<'add' | 'edit' | 'delete'>('add')
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['beneficiaries'],
    queryFn: () => beneficiaryService.getBeneficiaries(),
  })

  const openModal = (action: 'add' | 'edit' | 'delete', beneficiary?: Beneficiary) => {
    setModalAction(action)
    setSelectedBeneficiary(beneficiary ?? null)
    setModalOpen(true)
  }

  const modalContent = {
    add: {
      title: 'Add Beneficiary',
      description: 'This form will connect to POST /api/beneficiaries when backend is ready.',
    },
    edit: {
      title: 'Edit Beneficiary',
      description: `Editing ${selectedBeneficiary?.name}. Will connect to PUT /api/beneficiaries/{id}.`,
    },
    delete: {
      title: 'Delete Beneficiary',
      description: `Remove ${selectedBeneficiary?.name}? Will connect to DELETE /api/beneficiaries/{id}.`,
    },
  }

  if (isLoading) return <PageLoader />
  if (isError || !data) return <ErrorState onRetry={() => void refetch()} />

  return (
    <div>
      <Breadcrumb items={[{ label: 'Beneficiaries' }]} />
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <DashboardHeader
            title="Beneficiaries"
            subtitle="Manage your saved transfer recipients."
          />
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => openModal('add')}>
          Add Beneficiary
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((beneficiary) => (
          <BeneficiaryCard
            key={beneficiary.id}
            beneficiary={beneficiary}
            onEdit={() => openModal('edit', beneficiary)}
            onDelete={() => openModal('delete', beneficiary)}
          />
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent[modalAction].title}
        description={modalContent[modalAction].description}
      >
        <div className="py-4 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100">
            <UserPlus className="h-7 w-7 text-brand-600" />
          </div>
          <p className="text-sm text-slate-600">
            Backend integration point ready. UI actions are wired; API calls will be added when
            Spring Boot endpoints are available.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>
              {modalAction === 'delete' ? 'Confirm Delete' : 'Save'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
