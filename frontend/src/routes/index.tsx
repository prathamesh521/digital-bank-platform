import { ROUTES } from '@/constants/routes'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import AboutPage from '@/pages/AboutPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import BeneficiariesPage from '@/pages/BeneficiariesPage'
import ContactPage from '@/pages/ContactPage'
import DashboardPage from '@/pages/DashboardPage'
import HomePage from '@/pages/HomePage'
import LoanCalculatorPage from '@/pages/LoanCalculatorPage'
import LoginPage from '@/pages/LoginPage'
import NotificationsPage from '@/pages/NotificationsPage'
import ProfilePage from '@/pages/ProfilePage'
import ServicesPage from '@/pages/ServicesPage'
import TransactionsPage from '@/pages/TransactionsPage'
import { createBrowserRouter, Navigate } from 'react-router-dom'

/**
 * Route configuration with nested layouts.
 * Public routes share Navbar + Footer; protected routes use DashboardLayout with auth guard.
 */
export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.SERVICES, element: <ServicesPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'transactions', element: <TransactionsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'loans', element: <LoanCalculatorPage /> },
      { path: 'beneficiaries', element: <BeneficiariesPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.HOME} replace />,
  },
])
