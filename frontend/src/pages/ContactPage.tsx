import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import type { ContactFormData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'NextGen Bank Tower, BKC, Mumbai 400051' },
  { icon: Phone, label: 'Phone', value: '1800-123-4567 (Toll Free)' },
  { icon: Mail, label: 'Email', value: 'support@nextgen.bank' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat, 9:00 AM – 6:00 PM IST' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (_data: ContactFormData) => {
    // Future: await apiClient.post('/contact', data)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    reset()
  }

  return (
    <div className="animate-fade-in">
      <section className="gradient-soft py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Have a question or need assistance? Our team is here to help you 24/7.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>
            <p className="mt-2 text-slate-600">
              Fill out the form and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="mt-8 space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100">
                    <info.icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{info.label}</p>
                    <p className="text-sm text-slate-600">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card padding="lg">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Mail className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Message Sent!</h3>
                <p className="mt-2 text-slate-600">
                  Thank you for reaching out. We&apos;ll respond shortly.
                </p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  label="Subject"
                  placeholder="How can we help?"
                  error={errors.subject?.message}
                  {...register('subject')}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    rows={5}
                    placeholder="Tell us more..."
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" isLoading={isSubmitting}>
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>
    </div>
  )
}
