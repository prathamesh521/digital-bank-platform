import { Button } from '@/components/common/Button'
import { Card, CardHeader, CardTitle } from '@/components/common/Card'
import { ErrorState } from '@/components/common/ErrorState'
import { Input } from '@/components/common/Input'
import { PageLoader } from '@/components/common/Loader'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { DashboardHeader } from '@/components/layout/Sidebar'
import { profileService } from '@/services/profileService'
import { formatDate, getInitials } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Camera, Lock, Mail, MapPin, Phone, Shield, User } from 'lucide-react'

export default function ProfilePage() {
  const { data: profile, isLoading, isError, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
  })

  if (isLoading) return <PageLoader />
  if (isError || !profile) return <ErrorState onRetry={() => void refetch()} />

  return (
    <div>
      <Breadcrumb items={[{ label: 'Profile' }]} />
      <DashboardHeader
        title="My Profile"
        subtitle="Manage your personal information and security settings."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar & Summary */}
        <Card padding="lg" className="text-center lg:col-span-1">
          <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full gradient-brand text-2xl font-bold text-white">
            {getInitials(profile.firstName, profile.lastName)}
            <button
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
              aria-label="Change avatar"
            >
              <Camera className="h-4 w-4 text-slate-600" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-sm text-slate-500">{profile.email}</p>
          <p className="mt-2 text-xs text-slate-400">
            Member since {formatDate(profile.memberSince)}
          </p>
        </Card>

        {/* Personal Information */}
        <Card padding="lg" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-brand-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First Name" defaultValue={profile.firstName} readOnly />
            <Input label="Last Name" defaultValue={profile.lastName} readOnly />
            <Input
              label="Email"
              defaultValue={profile.email}
              leftIcon={<Mail className="h-4 w-4" />}
              readOnly
            />
            <Input
              label="Phone"
              defaultValue={profile.phone}
              leftIcon={<Phone className="h-4 w-4" />}
              readOnly
            />
          </div>
          <Button className="mt-6" variant="outline" size="sm">
            Edit Information
          </Button>
        </Card>

        {/* Address */}
        <Card padding="lg" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-600" />
              Address
            </CardTitle>
          </CardHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Street" defaultValue={profile.address.street} readOnly className="sm:col-span-2" />
            <Input label="City" defaultValue={profile.address.city} readOnly />
            <Input label="State" defaultValue={profile.address.state} readOnly />
            <Input label="ZIP Code" defaultValue={profile.address.zipCode} readOnly />
            <Input label="Country" defaultValue={profile.address.country} readOnly />
          </div>
        </Card>

        {/* Security Settings */}
        <Card padding="lg" className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-600" />
              Security
            </CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition-colors hover:bg-slate-50">
              <Lock className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900">Change Password</p>
                <p className="text-xs text-slate-500">Last changed 3 months ago</p>
              </div>
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition-colors hover:bg-slate-50">
              <Shield className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900">Two-Factor Auth</p>
                <p className="text-xs text-emerald-600">Enabled</p>
              </div>
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition-colors hover:bg-slate-50">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900">Login Activity</p>
                <p className="text-xs text-slate-500">View recent sessions</p>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
