# NextGen Bank — Frontend

Production-quality digital banking UI built with React, TypeScript, and Vite. Designed for future integration with a Spring Boot REST API.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- TanStack Query
- Axios
- React Hook Form + Zod
- Recharts
- Lucide Icons

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment config
cp .env.example .env

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Demo Login

Navigate to `/login` and sign in with any valid email and password (minimum 6 characters). Pre-filled demo credentials are provided on the login page.

## Project Structure

```
src/
├── assets/              # Static assets
├── components/
│   ├── common/          # Reusable UI (Button, Card, Modal, Table, etc.)
│   ├── layout/          # Navbar, Sidebar, Footer, Breadcrumb
│   ├── dashboard/       # Dashboard-specific widgets
│   ├── charts/          # Recharts wrappers
│   ├── cards/           # Domain cards (Beneficiary, etc.)
│   └── forms/           # Form components (extend as needed)
├── constants/           # Config, routes, mock data
├── context/             # Auth context (mock authentication)
├── hooks/               # Custom hooks (extend as needed)
├── layouts/             # PublicLayout, DashboardLayout
├── pages/               # Route-level page components
├── routes/              # React Router configuration
├── services/            # API abstraction layer (mock → REST)
├── types/               # TypeScript interfaces
└── utils/               # Formatting, EMI calc, helpers
```

## Architecture Decisions

### Services Layer

All data access goes through `src/services/`. Each service returns mocked promises today and can be swapped for `apiClient` calls without changing UI components:

```typescript
// Current (mock)
export const dashboardService = {
  async getSummary() {
    await mockDelay()
    return mockDashboardSummary
  },
}

// Future (Spring Boot)
export const dashboardService = {
  async getSummary() {
    const { data } = await apiClient.get('/dashboard/summary')
    return data
  },
}
```

### TanStack Query

Pages use `useQuery` with service functions as `queryFn`. When backend is ready, only services need updating — query keys and component logic stay the same.

### Authentication

Mock auth stores JWT token and user in `localStorage`. `AuthProvider` wraps the app; `DashboardLayout` guards protected routes. Replace `authService.login()` with `POST /api/auth/login` when backend is available.

### Pagination

Transactions page implements client-side pagination with filter state shaped for Spring Boot `Pageable` (`page`, `pageSize`, filters).

## Routes

| Route | Layout | Description |
|-------|--------|-------------|
| `/` | Public | Home |
| `/about` | Public | About |
| `/services` | Public | Services |
| `/contact` | Public | Contact form |
| `/login` | Standalone | Authentication |
| `/dashboard` | Protected | Customer dashboard |
| `/dashboard/transactions` | Protected | Transaction table |
| `/dashboard/analytics` | Protected | Charts & insights |
| `/dashboard/loans` | Protected | EMI calculator |
| `/dashboard/beneficiaries` | Protected | Beneficiary management |
| `/dashboard/notifications` | Protected | Notification timeline |
| `/dashboard/profile` | Protected | Profile & security |

## Backend Integration Checklist

1. Set `VITE_API_BASE_URL` in `.env`
2. Implement Spring Boot endpoints matching service method signatures
3. Replace mock implementations in `src/services/*.ts`
4. Update `AuthContext` if token refresh or OAuth is needed
5. Configure CORS on Spring Boot for the Vite dev server origin

## Component Implementation Order

1. Config, types, utils, mock data
2. Services layer + apiClient
3. Common components (Button, Card, Input, etc.)
4. Layout components (Navbar, Sidebar, Footer)
5. Auth context + layouts
6. Public pages
7. Dashboard pages
8. Charts + domain widgets
9. Routing + App shell
