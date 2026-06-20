import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar variant="public" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
