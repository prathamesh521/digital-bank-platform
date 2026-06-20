import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { APP_CONFIG } from '@/constants/config'
import {
  mockFaqs,
  mockOffers,
  mockServices,
  mockStatistics,
  mockTestimonials,
} from '@/constants/mockData'
import { ROUTES } from '@/constants/routes'
import {
  ArrowRight,
  Award,
  ChevronDown,
  CreditCard,
  Home,
  PiggyBank,
  Shield,
  Star,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react'
import { useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  PiggyBank,
  Wallet,
  Home,
  CreditCard,
  TrendingUp,
}

const benefits = [
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: '256-bit encryption and multi-factor authentication protect every transaction.',
  },
  {
    icon: Zap,
    title: 'Instant Transfers',
    description: 'Send money instantly via UPI, IMPS, or NEFT with zero hidden charges.',
  },
  {
    icon: Award,
    title: 'Premium Rewards',
    description: 'Earn cashback, reward points, and exclusive partner offers on every spend.',
  },
]

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="pr-4 font-medium text-slate-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-slate-600 animate-fade-in">{answer}</p>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-soft">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700">
              Trusted by 2.5M+ customers
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Banking that works as hard as{' '}
              <span className="text-gradient">you do</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Experience next-generation digital banking with smart tools, competitive rates,
              and personalized financial insights — all in one beautiful platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to={ROUTES.LOGIN}>
                <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Open Account
                </Button>
              </Link>
              <Link to={ROUTES.SERVICES}>
                <Button size="lg" variant="outline">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {mockStatistics.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-brand-600">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Redefining digital banking in India
            </h2>
            <p className="mt-4 text-slate-600">
              {APP_CONFIG.appName} combines cutting-edge technology with personalized service to
              deliver a banking experience that puts you in control of your financial future.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Featured Offers
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {mockOffers.map((offer) => (
              <Card key={offer.id} hover variant="glass">
                {offer.badge && (
                  <span className="mb-3 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                    {offer.badge}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-slate-900">{offer.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{offer.description}</p>
                <Link to={ROUTES.LOGIN} className="mt-4 inline-block">
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-3 w-3" />}>
                    Learn More
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Schemes & Credit Cards */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card variant="gradient" className="overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-brand-100 p-3">
                  <Home className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Home Loan Schemes</h3>
                  <p className="mt-2 text-slate-600">
                    Own your dream home with rates starting at 8.25% p.a. Flexible tenure up to
                    30 years with instant eligibility check.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li>• Up to ₹5 crore loan amount</li>
                    <li>• Balance transfer facility</li>
                    <li>• Top-up loans available</li>
                  </ul>
                  <Link to={ROUTES.LOANS} className="mt-6 inline-block">
                    <Button size="sm">Calculate EMI</Button>
                  </Link>
                </div>
              </div>
            </Card>
            <Card variant="gradient" className="overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-violet-100 p-3">
                  <CreditCard className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Credit Card Promotions</h3>
                  <p className="mt-2 text-slate-600">
                    Nova Platinum Card — 5% cashback on dining, 3% on travel, and exclusive
                    lounge access at 500+ airports.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li>• Lifetime free for first year</li>
                    <li>• Welcome bonus of 10,000 points</li>
                    <li>• Zero forex markup</li>
                  </ul>
                  <Link to={ROUTES.SERVICES} className="mt-6 inline-block">
                    <Button size="sm">Apply Now</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Our Services
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockServices.slice(0, 6).map((service) => {
              const Icon = iconMap[service.icon] ?? PiggyBank
              return (
                <Card key={service.id} hover>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                    <Icon className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Why Choose {APP_CONFIG.appName}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand shadow-lg shadow-brand-500/25">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="gradient-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id} variant="glass">
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <Card padding="lg">
            {mockFaqs.map((faq) => (
              <FaqAccordion key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl gradient-brand px-8 py-16 text-center shadow-2xl shadow-brand-500/30">
            <h2 className="text-3xl font-bold text-white">
              Ready to transform your banking?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Join millions of customers who trust st for their everyday banking needs.
            </p>
            <Link to={ROUTES.LOGIN} className="mt-8 inline-block">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-brand-600 hover:bg-slate-100"
              >
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
