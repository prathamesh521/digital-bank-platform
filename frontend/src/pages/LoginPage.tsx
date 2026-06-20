import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { APP_CONFIG } from '@/constants/config'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/context/AuthContext'
import type { AuthCredentials } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'priya.sharma@email.com', password: 'password123' },
  })

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  const onSubmit = async (data: AuthCredentials) => {
    try {
      setError(null)
      await login(data)
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      setError((err as { message?: string }).message ?? 'Login failed')
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 gradient-brand lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{APP_CONFIG.appName}</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Welcome back to smarter banking
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Access your accounts, track spending, manage loans, and grow your wealth — all
            from one secure dashboard.
          </p>
        </div>
        <p className="text-sm text-white/60">
          Protected by 256-bit encryption and multi-factor authentication
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-slide-up">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Sign in to your account</h2>
            <p className="mt-2 text-slate-600">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <Card padding="lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
                  {error}
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300" />
                  Remember me
                </label>
                <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Demo: use any valid email and password (min 6 chars)
            </p>
          </Card>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.HOME} className="font-medium text-brand-600 hover:text-brand-700">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
