import { Component, computed, input } from '@angular/core';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span class="badge" [class]="'badge--' + tone()"><ng-content /></span>`,
  styles: [
    `
      .badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-1);
        padding: 3px 10px;
        border-radius: var(--radius-full);
        border: 1px solid transparent;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.01em;
        line-height: 16px;
        white-space: nowrap;
      }
      .badge--success { background: var(--color-success-bg); color: var(--color-success); border-color: color-mix(in srgb, var(--color-success) 20%, transparent); }
      .badge--warning { background: var(--color-warning-bg); color: var(--color-warning); border-color: color-mix(in srgb, var(--color-warning) 20%, transparent); }
      .badge--danger  { background: var(--color-danger-bg); color: var(--color-danger); border-color: color-mix(in srgb, var(--color-danger) 20%, transparent); }
      .badge--info    { background: var(--color-info-bg); color: var(--color-info); border-color: color-mix(in srgb, var(--color-info) 20%, transparent); }
      .badge--neutral { background: var(--surface-sunken); color: var(--text-secondary); border-color: var(--border-subtle); }
    `,
  ],
})
export class BadgeComponent {
  tone = input<BadgeTone>('neutral');
}

/** Maps a customer/task status string to a badge tone so feature components
 *  don't each re-implement the same switch statement. */
export function statusToTone(status: string): BadgeTone {
  switch (status) {
    case 'active':
    case 'won':
    case 'low':
      return 'success';
    case 'at-risk':
    case 'medium':
    case 'negotiation':
      return 'warning';
    case 'churned':
    case 'lost':
    case 'high':
      return 'danger';
    case 'onboarding':
    case 'proposal':
    case 'prospecting':
      return 'info';
    default:
      return 'neutral';
  }
}
