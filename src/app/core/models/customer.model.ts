export type CustomerStatus = 'active' | 'at-risk' | 'onboarding' | 'churned';
export type CustomerTier = 'enterprise' | 'mid-market' | 'smb';

export interface Customer {
  id: string;
  name: string;
  domain: string;
  logoInitial: string;
  owner: string;
  ownerInitials: string;
  status: CustomerStatus;
  tier: CustomerTier;
  mrr: number;
  openDeals: number;
  lastActivity: string; // ISO date
  healthScore: number; // 0-100
  contacts: CustomerContact[];
  notes: CustomerNote[];
  deals: CustomerDeal[];
}

export interface CustomerContact {
  id: string;
  name: string;
  title: string;
  email: string;
  primary: boolean;
}

export interface CustomerNote {
  id: string;
  author: string;
  date: string;
  body: string;
}

export interface CustomerDeal {
  id: string;
  name: string;
  stage: 'prospecting' | 'proposal' | 'negotiation' | 'won' | 'lost';
  value: number;
  closeDate: string;
}
