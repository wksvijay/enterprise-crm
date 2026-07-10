import { Injectable, signal } from '@angular/core';
import { ActivityItem, FunnelStage, KpiSummary, TaskItem } from '../models/activity.model';

/**
 * Dashboard-only mock data. Kept separate from CustomerService since in a
 * real app these come from a reporting/analytics endpoint, not the customer
 * CRUD API — separating them now avoids a false coupling later.
 */
@Injectable({ providedIn: 'root' })
export class DashboardService {
  readonly kpis = signal<KpiSummary[]>([
    { label: 'Monthly recurring revenue', value: '$64,400', delta: 6.2, trend: 'up', icon: 'trending_up' },
    { label: 'Active customers', value: '6', delta: 0, trend: 'flat', icon: 'domain' },
    { label: 'Open leads', value: '23', delta: -3.1, trend: 'down', icon: 'person_search' },
    { label: 'Open pipeline value', value: '$134,300', delta: 11.4, trend: 'up', icon: 'payments' },
  ]);

  readonly funnel = signal<FunnelStage[]>([
    { stage: 'Prospecting', count: 14, value: 58200 },
    { stage: 'Proposal', count: 9, value: 41900 },
    { stage: 'Negotiation', count: 4, value: 30100 },
    { stage: 'Won (this quarter)', count: 6, value: 26800 },
  ]);

  readonly activities = signal<ActivityItem[]>([
    { id: 'a1', type: 'call', customerName: 'Northwind Health Alliance', summary: 'Renewal call — leaning toward multi-year plan', timestamp: '2026-07-02T14:30:00', actorInitials: 'PS' },
    { id: 'a2', type: 'email', customerName: 'Cascade Youth Foundation', summary: 'Sent re-engagement sequence after usage drop', timestamp: '2026-06-19T09:10:00', actorInitials: 'TA' },
    { id: 'a3', type: 'meeting', customerName: 'Harborline Literacy Project', summary: 'Enterprise upgrade scoping session', timestamp: '2026-07-03T11:00:00', actorInitials: 'DC' },
    { id: 'a4', type: 'note', customerName: 'Blue Harbor Museum Trust', summary: 'Onboarding call 2 of 3 scheduled', timestamp: '2026-07-01T16:45:00', actorInitials: 'PS' },
  ]);

  readonly tasks = signal<TaskItem[]>([
    { id: 't1', title: 'Send renewal proposal to Northwind', dueDate: '2026-07-07', priority: 'high', done: false, relatedCustomer: 'Northwind Health Alliance' },
    { id: 't2', title: 'Follow up on Cascade health score drop', dueDate: '2026-07-08', priority: 'high', done: false, relatedCustomer: 'Cascade Youth Foundation' },
    { id: 't3', title: 'Prep Harborline enterprise upgrade deck', dueDate: '2026-07-09', priority: 'medium', done: false, relatedCustomer: 'Harborline Literacy Project' },
    { id: 't4', title: 'Log Q2 win-back list for churned accounts', dueDate: '2026-07-11', priority: 'low', done: true },
  ]);
}
