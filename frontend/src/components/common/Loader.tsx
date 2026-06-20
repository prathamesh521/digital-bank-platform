import { cn } from '@/utils'
import { Loader2 } from 'lucide-react'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

const sizeMap = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

export function Loader({ size = 'md', text, fullScreen = false }: LoaderProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={cn('animate-spin text-brand-600', sizeMap[size])} />
      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">{content}</div>
    )
  }

  return content
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader size="lg" text="Loading..." />
    </div>
  )
}
