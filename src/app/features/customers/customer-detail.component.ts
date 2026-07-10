import { Component, computed, inject, input, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from '../../core/services/customer.service';
import { BadgeComponent, statusToTone } from '../../shared/badge/badge.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    RouterLink,
    DecimalPipe,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    BadgeComponent,
    EmptyStateComponent,
  ],
  template: `
    @if (customer(); as c) {
      <div class="detail">
        <a class="detail__back" [routerLink]="['/customers']">
          <mat-icon class="detail__back-icon">arrow_back</mat-icon> Customers
        </a>

        <header class="detail__header">
          <div class="detail__identity">
            <span class="detail__logo">{{ c.logoInitial }}</span>
            <div>
              <h1>{{ c.name }}</h1>
              <p class="detail__domain">{{ c.domain }}</p>
            </div>
            <app-badge [tone]="statusToTone(c.status)">{{ c.status }}</app-badge>
          </div>
          <div class="detail__actions">
            <button mat-stroked-button type="button">
              <mat-icon>edit</mat-icon> Edit
            </button>
            <button mat-flat-button color="primary" type="button">
              <mat-icon>add</mat-icon> Log activity
            </button>
          </div>
        </header>

        <div class="detail__stats">
          <div class="detail__stat">
            <p class="detail__stat-label">MRR</p>
            <p class="detail__stat-value">{{ c.mrr === 0 ? '—' : '$' + (c.mrr | number) }}</p>
          </div>
          <div class="detail__stat">
            <p class="detail__stat-label">Open deals</p>
            <p class="detail__stat-value">{{ c.openDeals }}</p>
          </div>
          <div class="detail__stat">
            <p class="detail__stat-label">Health score</p>
            <p class="detail__stat-value">{{ c.healthScore }}</p>
          </div>
          <div class="detail__stat">
            <p class="detail__stat-label">Owner</p>
            <p class="detail__stat-value">{{ c.owner }}</p>
          </div>
          <div class="detail__stat">
            <p class="detail__stat-label">Last activity</p>
            <p class="detail__stat-value">{{ c.lastActivity }}</p>
          </div>
        </div>

        <mat-tab-group animationDuration="150ms" class="detail__tabs">
          <mat-tab label="Overview">
            <div class="tab-panel">
              @if (c.notes.length) {
                <h3>Latest note</h3>
                <p class="note">{{ c.notes[0].body }}</p>
                <p class="note-meta">{{ c.notes[0].author }} · {{ c.notes[0].date }}</p>
              } @else {
                <app-empty-state icon="edit_note" title="No notes yet" description="Notes logged from calls and meetings will show up here." />
              }
            </div>
          </mat-tab>

          <mat-tab [label]="'Contacts (' + c.contacts.length + ')'">
            <div class="tab-panel">
              @if (c.contacts.length === 0) {
                <app-empty-state icon="person_off" title="No contacts on file" description="Add a primary contact so the team knows who to reach." />
              } @else {
                <ul class="contact-list">
                  @for (contact of c.contacts; track contact.id) {
                    <li class="contact-list__item">
                      <span class="contact-list__avatar">{{ initials(contact.name) }}</span>
                      <div>
                        <p class="contact-list__name">
                          {{ contact.name }}
                          @if (contact.primary) {
                            <app-badge tone="info">Primary</app-badge>
                          }
                        </p>
                        <p class="contact-list__meta">{{ contact.title }} · {{ contact.email }}</p>
                      </div>
                    </li>
                  }
                </ul>
              }
            </div>
          </mat-tab>

          <mat-tab [label]="'Deals (' + c.deals.length + ')'">
            <div class="tab-panel">
              @if (c.deals.length === 0) {
                <app-empty-state icon="handshake" title="No open deals" description="Deals created for this account will appear here." />
              } @else {
                <ul class="deal-list">
                  @for (deal of c.deals; track deal.id) {
                    <li class="deal-list__item">
                      <div>
                        <p class="deal-list__name">{{ deal.name }}</p>
                        <p class="deal-list__meta">Closes {{ deal.closeDate }}</p>
                      </div>
                      <div class="deal-list__right">
                        <span class="mono">{{ '$' + (deal.value | number) }}</span>
                        <app-badge [tone]="statusToTone(deal.stage)">{{ deal.stage }}</app-badge>
                      </div>
                    </li>
                  }
                </ul>
              }
            </div>
          </mat-tab>

          <mat-tab label="Notes">
            <div class="tab-panel">
              @if (c.notes.length === 0) {
                <app-empty-state icon="edit_note" title="No notes yet" />
              } @else {
                <ul class="note-list">
                  @for (note of c.notes; track note.id) {
                    <li class="note-list__item">
                      <p class="note">{{ note.body }}</p>
                      <p class="note-meta">{{ note.author }} · {{ note.date }}</p>
                    </li>
                  }
                </ul>
              }
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    } @else {
      <app-empty-state icon="search_off" title="Customer not found" description="It may have been removed, or the link is out of date.">
        <a mat-stroked-button [routerLink]="['/customers']">Back to customers</a>
      </app-empty-state>
    }
  `,
  styles: [
    `
      .detail__back {
        display: inline-flex; align-items: center; gap: var(--space-1);
        color: var(--text-secondary); text-decoration: none; font-size: var(--text-sm);
        margin-bottom: var(--space-4);
      }
      .detail__back:hover { color: var(--text-primary); }
      .detail__back-icon { font-size: 18px; width: 18px; height: 18px; vertical-align: text-bottom; }

      .detail__header {
        display: flex; justify-content: space-between; align-items: flex-start;
        flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-5);
      }
      .detail__identity { display: flex; align-items: center; gap: var(--space-4); }
      .detail__logo {
        display: flex; align-items: center; justify-content: center;
        width: 48px; height: 48px; border-radius: var(--radius-md);
        background: var(--color-info-bg); color: var(--color-blue-600);
        font-weight: 700; font-size: var(--text-lg); flex-shrink: 0;
      }
      h1 { font-size: var(--text-xl); }
      .detail__domain { color: var(--text-tertiary); font-size: var(--text-sm); }
      .detail__actions { display: flex; gap: var(--space-3); }

      .btn {
        display: inline-flex; align-items: center; gap: var(--space-2);
        padding: var(--space-2) var(--space-4); border-radius: var(--radius-sm);
        border: 1px solid transparent; font-size: var(--text-sm); font-weight: 600; cursor: pointer;
        text-decoration: none;
      }
      .btn .material-symbols-outlined { font-size: 18px; }
      .btn--primary { background: var(--color-navy-800); color: var(--text-on-navy); }
      .btn--primary:hover { background: var(--color-navy-700); }
      .btn--secondary { background: var(--surface-raised); color: var(--text-primary); border-color: var(--border-default); }
      .btn--secondary:hover { background: var(--surface-sunken); }

      .detail__stats {
        display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-4);
        background: var(--surface-raised); border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md); padding: var(--space-4) var(--space-5);
        margin-bottom: var(--space-5);
      }
      @media (max-width: 900px) { .detail__stats { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 480px) { .detail__stats { grid-template-columns: 1fr; } }
      .detail__stat-label { font-size: var(--text-xs); color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.03em; }
      .detail__stat-value { font-size: var(--text-lg); font-weight: 700; color: var(--text-primary); margin-top: var(--space-1); }

      .detail__tabs { background: var(--surface-raised); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
      .tab-panel { padding: var(--space-5); }

      .note { font-size: var(--text-sm); color: var(--text-primary); line-height: 1.6; }
      .note-meta { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2); }
      .note-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-4); }
      .note-list__item { padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-subtle); }
      .note-list__item:last-child { border-bottom: none; padding-bottom: 0; }

      .contact-list, .deal-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-4); }
      .contact-list__item { display: flex; align-items: center; gap: var(--space-3); }
      .contact-list__avatar {
        display: flex; align-items: center; justify-content: center;
        width: 36px; height: 36px; border-radius: 50%; background: var(--surface-sunken);
        color: var(--text-secondary); font-weight: 700; font-size: var(--text-xs); flex-shrink: 0;
      }
      .contact-list__name { display: flex; align-items: center; gap: var(--space-2); font-weight: 600; font-size: var(--text-sm); color: var(--text-primary); }
      .contact-list__meta { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 2px; }

      .deal-list__item { display: flex; justify-content: space-between; align-items: center; padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-subtle); }
      .deal-list__item:last-child { border-bottom: none; padding-bottom: 0; }
      .deal-list__name { font-weight: 600; font-size: var(--text-sm); color: var(--text-primary); }
      .deal-list__meta { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 2px; }
      .deal-list__right { display: flex; align-items: center; gap: var(--space-3); }
    `,
  ],
})
export class CustomerDetailComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  readonly statusToTone = statusToTone;

  // Bound automatically from the :id route param via withComponentInputBinding()
  readonly id = input.required<string>();

  readonly customer = computed(() => this.customerService.byId(this.id()));

  ngOnInit(): void {
    this.customerService.load();
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
