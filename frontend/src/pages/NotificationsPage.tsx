import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { ErrorState } from '@/components/common/ErrorState'
import { PageLoader } from '@/components/common/Loader'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { DashboardHeader } from '@/components/layout/Sidebar'
import { notificationService } from '@/services/notificationService'
import { formatDateTime } from '@/utils'
import { useQuery } from '@tanstack/react-query'

const typeVariant = {
  info: 'info' as const,
  success: 'success' as const,
  warning: 'warning' as const,
  error: 'error' as const,
}

export default function NotificationsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
  })

  if (isLoading) return <PageLoader />
  if (isError || !data) return <ErrorState onRetry={() => void refetch()} />

  return (
    <div>
      <Breadcrumb items={[{ label: 'Notifications' }]} />
      <DashboardHeader
        title="Notifications"
        subtitle="Stay updated with your account activity."
      />

      <Card padding="lg">
        <div className="relative">
          <div className="absolute left-[11px] top-3 h-[calc(100%-24px)] w-px bg-slate-200" />
          <div className="space-y-0">
            {data.map((notif) => (
              <div key={notif.id} className="relative flex gap-6 pb-8 last:pb-0">
                <div
                  className={`relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border-4 border-white ${
                    notif.type === 'success'
                      ? 'bg-emerald-500'
                      : notif.type === 'warning'
                        ? 'bg-amber-500'
                        : notif.type === 'error'
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-white hover:shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-900">{notif.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{notif.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={typeVariant[notif.type]}>{notif.type}</Badge>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-brand-500" title="Unread" />
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{formatDateTime(notif.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
