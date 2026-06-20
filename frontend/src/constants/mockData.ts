import type {
  AnalyticsData,
  Beneficiary,
  DashboardSummary,
  PaginatedResponse,
  Transaction,
  TransactionFilters,
  User,
} from '@/types'

export const mockUser: User = {
  id: 'usr-001',
  email: 'priya.sharma@email.com',
  firstName: 'Priya',
  lastName: 'Sharma',
  phone: '+91 98765 43210',
  avatarUrl: undefined,
  memberSince: '2019-03-15',
  address: {
    street: '42, Green Park Extension',
    city: 'New Delhi',
    state: 'Delhi',
    zipCode: '110016',
    country: 'India',
  },
}

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    description: 'Salary Credit - TechCorp India',
    category: 'Income',
    amount: 125000,
    type: 'credit',
    status: 'completed',
    date: '2026-06-01T09:00:00Z',
    reference: 'REF-SAL-202606',
  },
  {
    id: 'txn-002',
    description: 'Amazon India',
    category: 'Shopping',
    amount: 4599,
    type: 'debit',
    status: 'completed',
    date: '2026-06-02T14:22:00Z',
    reference: 'REF-AMZ-88421',
  },
  {
    id: 'txn-003',
    description: 'Swiggy Food Delivery',
    category: 'Food & Dining',
    amount: 680,
    type: 'debit',
    status: 'completed',
    date: '2026-06-03T20:15:00Z',
    reference: 'REF-SWG-33210',
  },
  {
    id: 'txn-004',
    description: 'Electricity Bill - BSES',
    category: 'Utilities',
    amount: 3200,
    type: 'debit',
    status: 'completed',
    date: '2026-06-04T11:00:00Z',
    reference: 'REF-UTL-99102',
  },
  {
    id: 'txn-005',
    description: 'Mutual Fund SIP - HDFC Flexi Cap',
    category: 'Investments',
    amount: 10000,
    type: 'debit',
    status: 'completed',
    date: '2026-06-05T08:30:00Z',
    reference: 'REF-INV-55432',
  },
  {
    id: 'txn-006',
    description: 'Cashback Reward',
    category: 'Rewards',
    amount: 250,
    type: 'credit',
    status: 'completed',
    date: '2026-06-06T16:45:00Z',
    reference: 'REF-RWD-77891',
  },
  {
    id: 'txn-007',
    description: 'Uber Ride',
    category: 'Transport',
    amount: 385,
    type: 'debit',
    status: 'completed',
    date: '2026-06-07T19:20:00Z',
    reference: 'REF-UBR-22109',
  },
  {
    id: 'txn-008',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 649,
    type: 'debit',
    status: 'completed',
    date: '2026-06-08T00:01:00Z',
    reference: 'REF-NFX-44567',
  },
  {
    id: 'txn-009',
    description: 'Transfer to Rahul Mehta',
    category: 'Transfer',
    amount: 15000,
    type: 'debit',
    status: 'pending',
    date: '2026-06-09T10:30:00Z',
    reference: 'REF-TRF-66789',
  },
  {
    id: 'txn-010',
    description: 'Pharmacy - Apollo',
    category: 'Healthcare',
    amount: 1240,
    type: 'debit',
    status: 'completed',
    date: '2026-06-10T17:00:00Z',
    reference: 'REF-MED-33456',
  },
  {
    id: 'txn-011',
    description: 'Freelance Payment',
    category: 'Income',
    amount: 35000,
    type: 'credit',
    status: 'completed',
    date: '2026-06-11T12:00:00Z',
    reference: 'REF-FRL-88901',
  },
  {
    id: 'txn-012',
    description: 'Home Loan EMI',
    category: 'Loan',
    amount: 28500,
    type: 'debit',
    status: 'completed',
    date: '2026-06-12T06:00:00Z',
    reference: 'REF-EMI-11223',
  },
  {
    id: 'txn-013',
    description: 'BigBasket Groceries',
    category: 'Groceries',
    amount: 2890,
    type: 'debit',
    status: 'failed',
    date: '2026-06-13T09:45:00Z',
    reference: 'REF-BBK-55678',
  },
  {
    id: 'txn-014',
    description: 'Insurance Premium',
    category: 'Insurance',
    amount: 8500,
    type: 'debit',
    status: 'completed',
    date: '2026-06-14T08:00:00Z',
    reference: 'REF-INS-99001',
  },
  {
    id: 'txn-015',
    description: 'Interest Credit - Savings',
    category: 'Income',
    amount: 1250,
    type: 'credit',
    status: 'completed',
    date: '2026-06-15T00:00:00Z',
    reference: 'REF-INT-22334',
  },
]

export const mockNotifications = [
  {
    id: 'notif-001',
    title: 'Salary Credited',
    message: 'Your salary of ₹1,25,000 has been credited to your account.',
    type: 'success' as const,
    timestamp: '2026-06-01T09:00:00Z',
    read: true,
  },
  {
    id: 'notif-002',
    title: 'Payment Successful',
    message: 'Payment of ₹4,599 to Amazon India was processed successfully.',
    type: 'success' as const,
    timestamp: '2026-06-02T14:22:00Z',
    read: true,
  },
  {
    id: 'notif-003',
    title: 'Cashback Received',
    message: 'You earned ₹250 cashback on your recent purchase.',
    type: 'info' as const,
    timestamp: '2026-06-06T16:45:00Z',
    read: false,
  },
  {
    id: 'notif-004',
    title: 'Loan EMI Reminder',
    message: 'Your home loan EMI of ₹28,500 is due on July 12, 2026.',
    type: 'warning' as const,
    timestamp: '2026-06-10T08:00:00Z',
    read: false,
  },
  {
    id: 'notif-005',
    title: 'Transfer Pending',
    message: 'Transfer of ₹15,000 to Rahul Mehta is awaiting confirmation.',
    type: 'info' as const,
    timestamp: '2026-06-09T10:30:00Z',
    read: false,
  },
  {
    id: 'notif-006',
    title: 'Security Alert',
    message: 'New login detected from Chrome on Windows. If this wasn\'t you, secure your account.',
    type: 'error' as const,
    timestamp: '2026-06-08T22:15:00Z',
    read: true,
  },
]

export const mockDashboardSummary: DashboardSummary = {
  totalBalance: 487650,
  monthlySpending: 78483,
  monthlyIncome: 161250,
  rewardsPoints: 12450,
  savingsGoal: {
    label: 'Emergency Fund',
    target: 500000,
    current: 325000,
  },
  loanSummary: {
    activeLoans: 1,
    totalOutstanding: 2450000,
    nextEmiAmount: 28500,
    nextEmiDate: '2026-07-12',
  },
  recentTransactions: mockTransactions.slice(0, 5),
  notifications: mockNotifications.slice(0, 3),
}

export const mockBeneficiaries: Beneficiary[] = [
  {
    id: 'ben-001',
    name: 'Rahul Mehta',
    accountNumber: '123456789012',
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0001234',
    nickname: 'Brother',
  },
  {
    id: 'ben-002',
    name: 'Anita Desai',
    accountNumber: '987654321098',
    bankName: 'ICICI Bank',
    ifscCode: 'ICIC0005678',
    nickname: 'Landlord',
  },
  {
    id: 'ben-003',
    name: 'TechCorp India Pvt Ltd',
    accountNumber: '456789012345',
    bankName: 'Axis Bank',
    ifscCode: 'UTIB0009012',
  },
  {
    id: 'ben-004',
    name: 'Sunita Sharma',
    accountNumber: '789012345678',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0003456',
    nickname: 'Mother',
  },
]

export const mockAnalyticsData: AnalyticsData = {
  monthlyExpenses: [
    { label: 'Jan', value: 62000 },
    { label: 'Feb', value: 58000 },
    { label: 'Mar', value: 71000 },
    { label: 'Apr', value: 65000 },
    { label: 'May', value: 72000 },
    { label: 'Jun', value: 78483 },
  ],
  spendingCategories: [
    { category: 'Shopping', amount: 18500, color: '#6366f1' },
    { category: 'Food & Dining', amount: 12400, color: '#8b5cf6' },
    { category: 'Utilities', amount: 9800, color: '#06b6d4' },
    { category: 'Transport', amount: 7200, color: '#10b981' },
    { category: 'Entertainment', amount: 5600, color: '#f59e0b' },
    { category: 'Healthcare', amount: 4800, color: '#ef4444' },
    { category: 'Others', amount: 20183, color: '#64748b' },
  ],
  incomeVsExpense: [
    { month: 'Jan', income: 125000, expense: 62000 },
    { month: 'Feb', income: 125000, expense: 58000 },
    { month: 'Mar', income: 160000, expense: 71000 },
    { month: 'Apr', income: 125000, expense: 65000 },
    { month: 'May', income: 125000, expense: 72000 },
    { month: 'Jun', income: 161250, expense: 78483 },
  ],
  savingsTrend: [
    { label: 'Jan', value: 280000 },
    { label: 'Feb', value: 295000 },
    { label: 'Mar', value: 305000 },
    { label: 'Apr', value: 310000 },
    { label: 'May', value: 318000 },
    { label: 'Jun', value: 325000 },
  ],
}

export const mockTestimonials = [
  {
    id: 'test-001',
    name: 'Arjun Patel',
    role: 'Software Engineer',
    content:
      'NextGen Bank transformed how I manage my finances. The dashboard is intuitive and the rewards program is genuinely valuable.',
    rating: 5,
  },
  {
    id: 'test-002',
    name: 'Meera Krishnan',
    role: 'Business Owner',
    content:
      'Best banking experience I have had. Seamless transfers, transparent fees, and excellent customer support.',
    rating: 5,
  },
  {
    id: 'test-003',
    name: 'Vikram Singh',
    role: 'Doctor',
    content:
      'The home loan process was smooth and the EMI calculator helped me plan my finances perfectly.',
    rating: 4,
  },
]

export const mockFaqs = [
  {
    id: 'faq-001',
    question: 'How do I open a savings account?',
    answer:
      'You can open a savings account online in under 10 minutes. Click "Get Started", complete KYC verification, and fund your account with a minimum deposit of ₹5,000.',
  },
  {
    id: 'faq-002',
    question: 'Are my deposits insured?',
    answer:
      'Yes, all deposits are insured up to ₹5 lakh per depositor under the Deposit Insurance and Credit Guarantee Corporation (DICGC) scheme.',
  },
  {
    id: 'faq-003',
    question: 'What are the credit card reward rates?',
    answer:
      'Our premium credit cards offer up to 5% cashback on dining, 3% on travel, and 1% on all other purchases. Rewards are credited instantly to your account.',
  },
  {
    id: 'faq-004',
    question: 'How secure is online banking?',
    answer:
      'We use 256-bit encryption, multi-factor authentication, and real-time fraud monitoring. Your security is our top priority.',
  },
]

export const mockOffers = [
  {
    id: 'offer-001',
    title: 'Zero Fee Savings Account',
    description: 'Open a premium savings account with zero maintenance fees for the first year.',
    badge: 'Popular',
  },
  {
    id: 'offer-002',
    title: '5% Cashback Credit Card',
    description: 'Get up to 5% cashback on dining and entertainment with our NextGen Platinum card.',
    badge: 'New',
  },
  {
    id: 'offer-003',
    title: 'Home Loan at 8.25%',
    description: 'Special interest rates on home loans for salaried professionals. Limited time offer.',
    badge: 'Limited',
  },
]

export const mockStatistics = [
  { label: 'Active Customers', value: '2.5M+' },
  { label: 'Daily Transactions', value: '₹850Cr' },
  { label: 'Branches Nationwide', value: '450+' },
  { label: 'Customer Satisfaction', value: '98%' },
]

export const mockServices = [
  {
    id: 'svc-001',
    title: 'Savings Account',
    description: 'High-yield savings with instant access and zero hidden fees.',
    icon: 'PiggyBank',
    features: ['Up to 7% interest', 'Zero balance option', 'Free debit card', 'Mobile banking'],
  },
  {
    id: 'svc-002',
    title: 'Current Account',
    description: 'Business-ready accounts with unlimited transactions and overdraft facility.',
    icon: 'Building2',
    features: ['Unlimited transactions', 'Overdraft facility', 'Multi-user access', 'Trade services'],
  },
  {
    id: 'svc-003',
    title: 'Personal Loan',
    description: 'Quick personal loans with competitive rates and flexible repayment.',
    icon: 'Wallet',
    features: ['Up to ₹25 lakh', 'Instant approval', 'Flexible tenure', 'No collateral'],
  },
  {
    id: 'svc-004',
    title: 'Home Loan',
    description: 'Make your dream home a reality with our affordable home loan products.',
    icon: 'Home',
    features: ['Up to ₹5 crore', '8.25% starting rate', '30-year tenure', 'Balance transfer'],
  },
  {
    id: 'svc-005',
    title: 'Credit Card',
    description: 'Premium credit cards with rewards, lounge access, and travel benefits.',
    icon: 'CreditCard',
    features: ['5% cashback', 'Airport lounge', 'EMI conversion', 'Fraud protection'],
  },
  {
    id: 'svc-006',
    title: 'Investments',
    description: 'Grow your wealth with mutual funds, FDs, and portfolio management services.',
    icon: 'TrendingUp',
    features: ['Mutual funds', 'Fixed deposits', 'SIP plans', 'Wealth advisory'],
  },
]

export function filterTransactions(
  transactions: Transaction[],
  filters: TransactionFilters,
): PaginatedResponse<Transaction> {
  const page = filters.page ?? 1
  const pageSize = filters.pageSize ?? 10
  let filtered = [...transactions]

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.description.toLowerCase().includes(search) ||
        t.category.toLowerCase().includes(search) ||
        t.reference.toLowerCase().includes(search),
    )
  }

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter((t) => t.status === filters.status)
  }

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter((t) => t.type === filters.type)
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const data = filtered.slice(start, start + pageSize)

  return { data, total, page, pageSize, totalPages }
}
