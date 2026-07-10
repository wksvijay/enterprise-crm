export interface ActivityItem {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  customerName: string;
  summary: string;
  timestamp: string; // ISO date
  actorInitials: string;
}

export interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  done: boolean;
  relatedCustomer?: string;
}

export interface KpiSummary {
  label: string;
  value: string;
  delta: number; // percentage change, signed
  trend: 'up' | 'down' | 'flat';
  icon: string; // Material Symbols name
}

export interface FunnelStage {
  stage: string;
  count: number;
  value: number;
}
