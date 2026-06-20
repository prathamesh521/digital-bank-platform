import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { mockServices } from '@/constants/mockData'
import { ROUTES } from '@/constants/routes'
import {
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  Home,
  PiggyBank,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  PiggyBank,
  Building2,
  Wallet,
  Home,
  CreditCard,
  TrendingUp,
}

export default function ServicesPage() {
  return (
    <div className="animate-fade-in">
      <section className="gradient-soft py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Our Services</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Comprehensive financial solutions tailored to your needs — from everyday banking
            to long-term wealth creation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {mockServices.map((service) => {
              const Icon = iconMap[service.icon] ?? PiggyBank
              return (
                <Card key={service.id} hover padding="lg">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-brand shadow-lg shadow-brand-500/20">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-slate-900">{service.title}</h2>
                      <p className="mt-2 text-slate-600">{service.description}</p>
                      <ul className="mt-4 space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link to={ROUTES.LOGIN} className="mt-6 inline-block">
                        <Button
                          size="sm"
                          variant="outline"
                          rightIcon={<ArrowRight className="h-3 w-3" />}
                        >
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
