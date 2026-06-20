import { Card } from '@/components/common/Card'
import { APP_CONFIG } from '@/constants/config'
import { Award, Globe, Heart, Target, Users } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'Every decision we make starts with our customers. Your financial wellbeing is our priority.',
  },
  {
    icon: Target,
    title: 'Innovation Driven',
    description:
      'We leverage cutting-edge technology to deliver seamless, intuitive banking experiences.',
  },
  {
    icon: Award,
    title: 'Integrity & Trust',
    description:
      'Transparency and ethical practices form the foundation of everything we do.',
  },
  {
    icon: Globe,
    title: 'Inclusive Banking',
    description:
      'Financial services accessible to everyone, regardless of background or location.',
  },
]

const milestones = [
  { year: '2010', event: 'NextGen Bank founded in Mumbai' },
  { year: '2015', event: 'Crossed 1 million customers nationwide' },
  { year: '2019', event: 'Launched digital-first banking platform' },
  { year: '2023', event: 'Reached 2.5 million active customers' },
  { year: '2026', event: 'Expanded to 450+ branches across India' },
]

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <section className="gradient-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              About {APP_CONFIG.appName}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Founded in 2010, {APP_CONFIG.appName} has grown from a regional institution to one of
              India&apos;s most trusted digital banks, serving over 2.5 million customers with
              innovative financial products and exceptional service.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                To democratize access to premium banking services by combining human expertise
                with digital innovation. We believe everyone deserves a bank that understands
                their goals and helps them achieve financial freedom.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                From savings accounts to home loans, investment portfolios to credit cards —
                we offer a comprehensive suite of products designed for modern India.
              </p>
            </div>
            <Card variant="gradient" padding="lg">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-brand">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">2.5M+</p>
                  <p className="text-slate-600">Happy customers across India</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-2xl font-bold text-brand-600">450+</p>
                  <p className="text-sm text-slate-500">Branches</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-600">98%</p>
                  <p className="text-sm text-slate-500">Satisfaction Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-600">₹850Cr</p>
                  <p className="text-sm text-slate-500">Daily Transactions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-600">15+</p>
                  <p className="text-sm text-slate-500">Years of Trust</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} hover>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                  <value.icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-brand-200 md:left-1/2" />
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative mb-8 flex items-center gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <Card className="inline-block">
                    <p className="text-sm font-bold text-brand-600">{milestone.year}</p>
                    <p className="mt-1 text-slate-700">{milestone.event}</p>
                  </Card>
                </div>
                <div className="absolute left-4 z-10 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-white md:left-1/2 md:-translate-x-1/2" />
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
