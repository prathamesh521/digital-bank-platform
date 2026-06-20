import { Card, CardHeader, CardTitle } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { DashboardHeader } from '@/components/layout/Sidebar'
import { calculateEmi, formatCurrencyPrecise } from '@/utils'
import { Calculator, IndianRupee, Percent, Calendar } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState(2500000)
  const [interestRate, setInterestRate] = useState(8.25)
  const [durationMonths, setDurationMonths] = useState(240)

  const result = useMemo(
    () => calculateEmi(amount, interestRate, durationMonths),
    [amount, interestRate, durationMonths],
  )

  const durationYears = Math.floor(durationMonths / 12)
  const remainingMonths = durationMonths % 12

  return (
    <div>
      <Breadcrumb items={[{ label: 'Loan Calculator' }]} />
      <DashboardHeader
        title="Loan Calculator"
        subtitle="Calculate your EMI, total payable, and interest for any loan."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card padding="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-brand-600" />
              Loan Details
            </CardTitle>
          </CardHeader>

          <div className="space-y-6">
            <div>
              <Input
                label="Loan Amount (₹)"
                type="number"
                min={10000}
                max={50000000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                leftIcon={<IndianRupee className="h-4 w-4" />}
              />
              <input
                type="range"
                min={100000}
                max={10000000}
                step={50000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-2 w-full accent-brand-600"
                aria-label="Loan amount slider"
              />
            </div>

            <div>
              <Input
                label="Interest Rate (% p.a.)"
                type="number"
                min={1}
                max={30}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                leftIcon={<Percent className="h-4 w-4" />}
              />
              <input
                type="range"
                min={5}
                max={18}
                step={0.25}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="mt-2 w-full accent-brand-600"
                aria-label="Interest rate slider"
              />
            </div>

            <div>
              <Input
                label="Duration (months)"
                type="number"
                min={6}
                max={360}
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                leftIcon={<Calendar className="h-4 w-4" />}
                hint={`${durationYears} years${remainingMonths ? ` ${remainingMonths} months` : ''}`}
              />
              <input
                type="range"
                min={12}
                max={360}
                step={6}
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="mt-2 w-full accent-brand-600"
                aria-label="Duration slider"
              />
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card variant="gradient" padding="lg" className="gradient-brand border-0 text-white">
            <p className="text-sm font-medium text-white/80">Monthly EMI</p>
            <p className="mt-2 text-4xl font-bold">{formatCurrencyPrecise(result.emi)}</p>
            <p className="mt-2 text-sm text-white/70">
              Fixed monthly payment for {durationMonths} months
            </p>
          </Card>

          <Card padding="lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-slate-600">Principal Amount</span>
                <span className="text-lg font-semibold text-slate-900">
                  {formatCurrencyPrecise(amount)}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-slate-600">Total Interest</span>
                <span className="text-lg font-semibold text-amber-600">
                  {formatCurrencyPrecise(result.totalInterest)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total Payable</span>
                <span className="text-lg font-semibold text-brand-600">
                  {formatCurrencyPrecise(result.totalPayable)}
                </span>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <CardHeader>
              <CardTitle>Breakdown</CardTitle>
            </CardHeader>
            <div className="flex h-4 overflow-hidden rounded-full">
              <div
                className="bg-brand-500 transition-all duration-500"
                style={{
                  width: `${(amount / result.totalPayable) * 100}%`,
                }}
                title="Principal"
              />
              <div
                className="bg-amber-400 transition-all duration-500"
                style={{
                  width: `${(result.totalInterest / result.totalPayable) * 100}%`,
                }}
                title="Interest"
              />
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                Principal ({((amount / result.totalPayable) * 100).toFixed(1)}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Interest ({((result.totalInterest / result.totalPayable) * 100).toFixed(1)}%)
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
