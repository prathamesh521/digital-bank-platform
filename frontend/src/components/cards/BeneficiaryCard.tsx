import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import type { Beneficiary } from '@/types'
import { maskAccountNumber } from '@/utils'
import { Building2, Pencil, Trash2 } from 'lucide-react'

export function BeneficiaryCard({
  beneficiary,
  onEdit,
  onDelete,
}: {
  beneficiary: Beneficiary
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card hover className="group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{beneficiary.name}</h3>
            {beneficiary.nickname && (
              <p className="text-xs text-brand-600">{beneficiary.nickname}</p>
            )}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            aria-label={`Edit ${beneficiary.name}`}
            className="p-2"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            aria-label={`Delete ${beneficiary.name}`}
            className="p-2 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Account</span>
          <span className="font-medium text-slate-700">
            {maskAccountNumber(beneficiary.accountNumber)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Bank</span>
          <span className="font-medium text-slate-700">{beneficiary.bankName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">IFSC</span>
          <span className="font-mono text-xs font-medium text-slate-700">
            {beneficiary.ifscCode}
          </span>
        </div>
      </div>
    </Card>
  )
}
