import { Button } from '@/components/common/Button'
import { APP_CONFIG } from '@/constants/config'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils'
import { Building2, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const publicLinks = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.SERVICES, label: 'Services' },
  { to: ROUTES.CONTACT, label: 'Contact' },
]

interface NavbarProps {
  variant?: 'public' | 'dashboard'
}

export function Navbar({ variant = 'public' }: NavbarProps) {
  const { isAuthenticated } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand shadow-lg shadow-brand-500/30">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">{APP_CONFIG.appName}</span>
        </Link>

        {variant === 'public' && (
          <>
            <div className="hidden items-center gap-8 md:flex">
              {publicLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-medium transition-colors hover:text-brand-600',
                      isActive ? 'text-brand-600' : 'text-slate-600',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              {isAuthenticated ? (
                <Link to={ROUTES.DASHBOARD}>
                  <Button size="sm">Dashboard</Button>
                </Link>
              ) : (
                <Link to={ROUTES.LOGIN}>
                  <Button size="sm" variant="outline">
                    Login
                  </Button>
                </Link>
              )}
              <Link to={ROUTES.LOGIN}>
                <Button size="sm">Get Started</Button>
              </Link>
            </div>

            <button
              className="rounded-lg p-2 text-slate-600 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </>
        )}
      </nav>

      {variant === 'public' && mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {publicLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                {link.label}
              </NavLink>
            ))}
            <Link to={ROUTES.LOGIN} onClick={() => setMobileOpen(false)}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
