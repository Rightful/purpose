import type { Company } from '@/types'

export const companies: Company[] = [
  {
    id: 'company1',
    name: 'Tech Solutions Inc.',
    industry: 'Technology',
    size: '50-200 employees',
    location: 'Dubai, UAE',
    website: 'https://techsolutions.com',
    contactEmail: 'careers@techsolutions.com',
    logo: '/company-logos/tech-solutions.png',
    description: 'A leading technology company specializing in innovative software solutions for businesses across the Middle East.',
    faithAlignment: {
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true,
      halalIncome: true
    }
  },
  {
    id: 'company2',
    name: 'Green Energy Ltd.',
    industry: 'Renewable Energy',
    size: '200-500 employees',
    location: 'Riyadh, Saudi Arabia',
    website: 'https://greenenergy.com',
    contactEmail: 'hr@greenenergy.com',
    logo: '/company-logos/green-energy.png',
    description: 'Pioneering sustainable energy solutions and environmental technologies for a greener future.',
    faithAlignment: {
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true,
      halalIncome: true
    }
  },
  {
    id: 'company3',
    name: 'Islamic Finance Group',
    industry: 'Finance',
    size: '500-1000 employees',
    location: 'Kuala Lumpur, Malaysia',
    website: 'https://islamicfinance.com',
    contactEmail: 'recruitment@islamicfinance.com',
    logo: '/company-logos/islamic-finance.png',
    description: 'A global leader in Sharia-compliant financial services and investment solutions.',
    faithAlignment: {
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true,
      halalIncome: true
    }
  }
] 