import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { KpiSummary } from '../../core/models/activity.model';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="stat-card" appearance="outlined">
      <mat-card-content class="stat-card__content">
        <div class="stat-card__icon">
          <mat-icon>{{ kpi().icon }}</mat-icon>
        </div>
        <div class="stat-card__body">
          <p class="stat-card__label">{{ kpi().label }}</p>
          <p class="stat-card__value">{{ kpi().value }}</p>
          <p
            class="stat-card__delta"
            [class.stat-card__delta--up]="kpi().trend === 'up'"
            [class.stat-card__delta--down]="kpi().trend === 'down'"
          >
            @if (kpi().trend !== 'flat') {
              <mat-icon class="stat-card__delta-icon">{{
                kpi().trend === 'up' ? 'arrow_upward' : 'arrow_downward'
              }}</mat-icon>
            }
            {{ kpi().trend === 'flat' ? 'No change' : (kpi().delta > 0 ? '+' : '') + kpi().delta + '% vs last month' }}
          </p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .stat-card {
        transition: box-shadow var(--duration-base) var(--ease-standard);
      }
      .stat-card:hover {
        box-shadow: var(--shadow-md);
      }
      .stat-card__content {
        display: flex !important;
        gap: var(--space-4);
        align-items: flex-start;
      }
      .stat-card__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-sm);
        background: var(--color-info-bg);
        color: var(--color-blue-600);
        flex-shrink: 0;
      }
      .stat-card__label {
        font-size: var(--text-sm);
        color: var(--text-secondary);
        margin-bottom: var(--space-1);
      }
      .stat-card__value {
        font-size: var(--text-2xl);
        font-weight: 700;
        color: var(--text-primary);
        line-height: 1.15;
      }
      .stat-card__delta {
        display: flex;
        align-items: center;
        gap: 2px;
        margin-top: var(--space-1);
        font-size: var(--text-xs);
        color: var(--text-tertiary);
      }
      .stat-card__delta-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }
      .stat-card__delta--up { color: var(--color-success); }
      .stat-card__delta--down { color: var(--color-danger); }
    `,
  ],
})
export class StatCardComponent {
  kpi = input.required<KpiSummary>();
}
