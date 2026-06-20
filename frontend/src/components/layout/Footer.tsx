import { APP_CONFIG } from '@/constants/config'
import { ROUTES } from '@/constants/routes'
import { Building2, Globe, MessageCircle, Share2, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = {
  company: [
    { label: 'About Us', to: ROUTES.ABOUT },
    { label: 'Services', to: ROUTES.SERVICES },
    { label: 'Contact', to: ROUTES.CONTACT },
    { label: 'Careers', to: '#' },
  ],
  products: [
    { label: 'Savings Account', to: ROUTES.SERVICES },
    { label: 'Credit Cards', to: ROUTES.SERVICES },
    { label: 'Personal Loans', to: ROUTES.SERVICES },
    { label: 'Investments', to: ROUTES.SERVICES },
  ],
  support: [
    { label: 'Help Center', to: '#' },
    { label: 'FAQs', to: ROUTES.HOME },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
  ],
}

const socialLinks = [
  { icon: Share2, label: 'Share', href: '#' },
  { icon: Globe, label: 'Website', href: '#' },
  { icon: MessageCircle, label: 'Chat', href: '#' },
  { icon: Users, label: 'Community', href: '#' },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">{APP_CONFIG.appName}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {APP_CONFIG.tagline}. Trusted by millions for secure, smart, and seamless banking.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {APP_CONFIG.appName}. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            DICGC insured up to ₹5 lakh per depositor
          </p>
        </div>
      </div>
    </footer>
  )
}
