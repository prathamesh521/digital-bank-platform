import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils'
import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link
            to={ROUTES.DASHBOARD}
            className="flex items-center text-slate-400 transition-colors hover:text-brand-600"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="h-4 w-4 text-slate-300" />
            {item.href ? (
              <Link
                to={item.href}
                className="text-slate-500 transition-colors hover:text-brand-600"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  index === items.length - 1
                    ? 'font-medium text-slate-900'
                    : 'text-slate-500',
                )}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
