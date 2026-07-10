import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../core/services/dashboard.service';
import { StatCardComponent } from '../../shared/stat-card/stat-card.component';
import { BadgeComponent, statusToTone } from '../../shared/badge/badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    DecimalPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    StatCardComponent,
    BadgeComponent,
  ],
  template: `
    <div class="dashboard">
      <div class="dashboard__header">
        <div>
          <h1>Good afternoon, Vijay</h1>
          <p class="dashboard__subtitle">Here's where the book of business stands today.</p>
        </div>
        <div class="dashboard__quick-actions">
          <button mat-stroked-button type="button">
            <mat-icon>add</mat-icon> New task
          </button>
          <button mat-flat-button color="primary" type="button" [routerLink]="['/customers']">
            <mat-icon>person_add</mat-icon> New customer
          </button>
        </div>
      </div>

      <section class="dashboard__kpis" aria-label="Key metrics">
        @for (kpi of dashboardService.kpis(); track kpi.label) {
          <app-stat-card [kpi]="kpi" />
        }
      </section>

      <div class="dashboard__grid">
        <mat-card class="panel panel--funnel" appearance="outlined" aria-labelledby="funnel-heading">
          <mat-card-content>
            <h2 id="funnel-heading">Sales funnel</h2>
            <ul class="funnel">
              @for (stage of dashboardService.funnel(); track stage.stage) {
                <li class="funnel__row">
                  <span class="funnel__label">{{ stage.stage }}</span>
                  <div class="funnel__bar-track">
                    <div
                      class="funnel__bar"
                      [style.width.%]="(stage.value / maxFunnelValue()) * 100"
                    ></div>
                  </div>
                  <span class="funnel__value mono">{{ stage.count }} · \${{ stage.value | number }}</span>
                </li>
              }
            </ul>
          </mat-card-content>
        </mat-card>

        <mat-card class="panel panel--activity" appearance="outlined" aria-labelledby="activity-heading">
          <mat-card-content>
            <h2 id="activity-heading">Recent activity</h2>
            <ul class="activity-list">
              @for (item of dashboardService.activities(); track item.id) {
                <li class="activity-list__item">
                  <span class="activity-list__avatar">{{ item.actorInitials }}</span>
                  <div class="activity-list__body">
                    <p class="activity-list__summary">{{ item.summary }}</p>
                    <p class="activity-list__meta">{{ item.customerName }} · {{ item.timestamp | date: 'MMM d, h:mm a' }}</p>
                  </div>
                </li>
              }
            </ul>
          </mat-card-content>
        </mat-card>

        <mat-card class="panel panel--tasks" appearance="outlined" aria-labelledby="tasks-heading">
          <mat-card-content>
            <h2 id="tasks-heading">Tasks due this week</h2>
            <ul class="task-list">
              @for (task of dashboardService.tasks(); track task.id) {
                <li class="task-list__item" [class.task-list__item--done]="task.done">
                  <input type="checkbox" [checked]="task.done" [attr.aria-label]="task.title" />
                  <div class="task-list__body">
                    <p class="task-list__title">{{ task.title }}</p>
                    @if (task.relatedCustomer) {
                      <p class="task-list__meta">{{ task.relatedCustomer }}</p>
                    }
                  </div>
                  <app-badge [tone]="statusToTone(task.priority)">{{ task.priority }}</app-badge>
                </li>
              }
            </ul>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-6);
        gap: var(--space-4);
        flex-wrap: wrap;
      }
      h1 { font-size: var(--text-xl); }
      .dashboard__subtitle {
        color: var(--text-secondary);
        margin-top: var(--space-1);
        font-size: var(--text-sm);
      }
      .dashboard__quick-actions {
        display: flex;
        gap: var(--space-3);
        flex-shrink: 0;
      }
      .dashboard__quick-actions button mat-icon {
        margin-right: var(--space-1);
      }

      .dashboard__kpis {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-4);
        margin-bottom: var(--space-6);
      }
      @media (max-width: 1100px) {
        .dashboard__kpis { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 600px) {
        .dashboard__kpis { grid-template-columns: 1fr; }
      }

      .dashboard__grid {
        display: grid;
        grid-template-columns: 1.4fr 1fr 1fr;
        gap: var(--space-4);
        align-items: start;
      }
      @media (max-width: 1100px) {
        .dashboard__grid { grid-template-columns: 1fr; }
      }

      .panel h2 {
        font-size: var(--text-md);
        margin-bottom: var(--space-4);
      }

      .funnel { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
      .funnel__row { display: grid; grid-template-columns: 120px 1fr auto; align-items: center; gap: var(--space-3); }
      @media (max-width: 420px) {
        .funnel__row { grid-template-columns: 84px 1fr auto; gap: var(--space-2); }
      }
      .funnel__label { font-size: var(--text-sm); color: var(--text-secondary); }
      .funnel__bar-track { height: 8px; background: var(--surface-sunken); border-radius: 4px; overflow: hidden; }
      .funnel__bar { height: 100%; background: var(--color-blue-500); border-radius: 4px; transition: width var(--duration-base) var(--ease-standard); }
      .funnel__value { font-size: var(--text-xs); color: var(--text-tertiary); white-space: nowrap; }

      .activity-list, .task-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-4); }
      .activity-list__item { display: flex; gap: var(--space-3); }
      .activity-list__avatar {
        display: flex; align-items: center; justify-content: center;
        width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
        background: var(--color-info-bg); color: var(--color-blue-600);
        font-size: var(--text-xs); font-weight: 700;
      }
      .activity-list__summary { font-size: var(--text-sm); color: var(--text-primary); }
      .activity-list__meta { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 2px; }

      .task-list__item { display: flex; align-items: flex-start; gap: var(--space-3); }
      .task-list__item--done .task-list__title { text-decoration: line-through; color: var(--text-tertiary); }
      .task-list__body { flex: 1; }
      .task-list__title { font-size: var(--text-sm); color: var(--text-primary); }
      .task-list__meta { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 2px; }
      .task-list__item input[type='checkbox'] { margin-top: 3px; accent-color: var(--color-blue-600); }
    `,
  ],
})
export class DashboardComponent {
  readonly dashboardService = inject(DashboardService);
  readonly statusToTone = statusToTone;

  maxFunnelValue(): number {
    return Math.max(...this.dashboardService.funnel().map((f) => f.value));
  }
}
