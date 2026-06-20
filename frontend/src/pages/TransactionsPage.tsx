import { StatusBadge, TypeBadge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { ErrorState } from '@/components/common/ErrorState'
import { Input } from '@/components/common/Input'
import { PageLoader } from '@/components/common/Loader'
import { Select } from '@/components/common/Select'
import { Table } from '@/components/common/Table'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { DashboardHeader } from '@/components/layout/Sidebar'
import { APP_CONFIG } from '@/constants/config'
import { transactionService } from '@/services/transactionService'
import type { Transaction, TransactionFilters } from '@/types'
import { formatCurrency, formatDate } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useState } from 'react'

export default function TransactionsPage() {
  const [filters, setFilters] = useState<TransactionFilters>({
    search: '',
    status: 'all',
    type: 'all',
    page: 1,
    pageSize: APP_CONFIG.pagination.defaultPageSize,
  })

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => transactionService.getTransactions(filters),
  })

  const columns = [
    {
      key: 'description',
      header: 'Description',
      render: (txn: Transaction) => (
        <div>
          <p className="font-medium text-slate-900">{txn.description}</p>
          <p className="text-xs text-slate-400">{txn.reference}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
    },
    {
      key: 'date',
      header: 'Date',
      render: (txn: Transaction) => formatDate(txn.date),
    },
    {
      key: 'type',
      header: 'Type',
      render: (txn: Transaction) => <TypeBadge type={txn.type} />,
    },
    {
      key: 'status',
      header: 'Status',
      render: (txn: Transaction) => <StatusBadge status={txn.status} />,
    },
    {
      key: 'amount',
      header: 'Amount',
      className: 'text-right',
      render: (txn: Transaction) => (
        <span
          className={`font-semibold ${txn.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}
        >
          {txn.type === 'credit' ? '+' : '-'}
          {formatCurrency(txn.amount)}
        </span>
      ),
    },
  ]

  return (
    <div>
      <Breadcrumb items={[{ label: 'Transactions' }]} />
      <DashboardHeader
        title="Transactions"
        subtitle="View and filter all your account transactions."
      />

      <Card className="mb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Search transactions..."
            leftIcon={<Search className="h-4 w-4" />}
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))
            }
          />
          <Select
            label="Status"
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'completed', label: 'Completed' },
              { value: 'pending', label: 'Pending' },
              { value: 'failed', label: 'Failed' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            value={filters.status ?? 'all'}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                status: e.target.value as TransactionFilters['status'],
                page: 1,
              }))
            }
          />
          <Select
            label="Type"
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'credit', label: 'Credit' },
              { value: 'debit', label: 'Debit' },
            ]}
            value={filters.type ?? 'all'}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                type: e.target.value as TransactionFilters['type'],
                page: 1,
              }))
            }
          />
          <Select
            label="Page Size"
            options={APP_CONFIG.pagination.pageSizeOptions.map((size) => ({
              value: String(size),
              label: `${size} per page`,
            }))}
            value={String(filters.pageSize)}
            onChange={(e) =>
              setFilters((f) => ({ ...f, pageSize: Number(e.target.value), page: 1 }))
            }
          />
        </div>
      </Card>

      {isLoading ? (
        <PageLoader />
      ) : isError || !data ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : (
        <>
          <Table
            columns={columns}
            data={data.data}
            keyExtractor={(txn) => txn.id}
            emptyMessage="No transactions match your filters."
          />

          {/* Pagination — ready for Spring Boot pageable API */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing {(data.page - 1) * data.pageSize + 1}–
              {Math.min(data.page * data.pageSize, data.total)} of {data.total} transactions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={data.page <= 1}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))}
                leftIcon={<ChevronLeft className="h-4 w-4" />}
              >
                Previous
              </Button>
              <span className="px-3 text-sm text-slate-600">
                Page {data.page} of {data.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={data.page >= data.totalPages}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
                rightIcon={<ChevronRight className="h-4 w-4" />}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
