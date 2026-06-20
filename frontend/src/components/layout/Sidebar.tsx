import { APP_CONFIG } from '@/constants/config'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils'
import {
  BarChart3,
  Bell,
  Building2,
  Calculator,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Receipt,
  User,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.TRANSACTIONS, label: 'Transactions', icon: Receipt },
  { to: ROUTES.ANALYTICS, label: 'Analytics', icon: BarChart3 },
  { to: ROUTES.LOANS, label: 'Loan Calculator', icon: Calculator },
  { to: ROUTES.BENEFICIARIES, label: 'Beneficiaries', icon: Users },
  { to: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell },
  { to: ROUTES.PROFILE, label: 'Profile', icon: User },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-64',
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-5">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-brand">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">{APP_CONFIG.appName}</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.DASHBOARD}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'gradient-brand text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-3">
        {!collapsed && user && (
          <div className="mb-3 rounded-xl bg-slate-50 px-3 py-2">
            <p className="truncate text-sm font-medium text-slate-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
        )}
        <button
          onClick={() => void handleLogout()}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
    </div>
  )
}
