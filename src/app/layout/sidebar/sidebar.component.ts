import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  comingSoon?: boolean;
  /** Renders a divider above this item — used to separate CRM features from utility pages. */
  divider?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <nav class="sidebar" [class.sidebar--collapsed]="collapsed()">
      <div class="sidebar__brand">
        <div class="sidebar__mark">EC</div>
        @if (!collapsed()) {
          <span class="sidebar__name">Enterprise CRM</span>
        }
      </div>

      <ul class="sidebar__list">
        @for (item of navItems; track item.label) {
          @if (item.divider) {
            <li class="sidebar__divider" role="separator" aria-hidden="true"></li>
          }
          <li>
            @if (item.route) {
              <a
                class="sidebar__item"
                [routerLink]="item.route"
                routerLinkActive="sidebar__item--active"
                [matTooltip]="collapsed() ? item.label : ''"
                matTooltipPosition="right"
                (click)="navigate.emit()"
              >
                <mat-icon class="sidebar__icon">{{ item.icon }}</mat-icon>
                @if (!collapsed()) {
                  <span class="sidebar__label">{{ item.label }}</span>
                }
              </a>
            } @else {
              <div
                class="sidebar__item sidebar__item--disabled"
                [matTooltip]="collapsed() ? item.label + ' (planned)' : ''"
                matTooltipPosition="right"
              >
                <mat-icon class="sidebar__icon">{{ item.icon }}</mat-icon>
                @if (!collapsed()) {
                  <span class="sidebar__label">{{ item.label }}</span>
                  <span class="sidebar__soon">Planned</span>
                }
              </div>
            }
          </li>
        }
      </ul>

      @if (showCollapseToggle()) {
        <button
          mat-icon-button
          type="button"
          class="sidebar__collapse-toggle"
          (click)="toggleCollapsed.emit()"
          [attr.aria-label]="collapsed() ? 'Expand navigation' : 'Collapse navigation'"
        >
          <mat-icon>{{ collapsed() ? 'chevron_right' : 'chevron_left' }}</mat-icon>
        </button>
      }
    </nav>
  `,
  styles: [
    `
      .sidebar {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        color: var(--text-on-navy);
        overflow: hidden;
      }
      .sidebar__brand {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-5) var(--space-4);
        height: var(--topbar-height);
        flex-shrink: 0;
      }
      .sidebar__mark {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: var(--radius-sm);
        background: var(--color-blue-500);
        color: var(--color-navy-900);
        font-family: var(--font-mono);
        font-weight: 700;
        font-size: 13px;
        flex-shrink: 0;
      }
      .sidebar__name {
        font-weight: 600;
        font-size: var(--text-md);
        white-space: nowrap;
      }
      .sidebar__list {
        list-style: none;
        margin: 0;
        padding: var(--space-2);
        flex: 1;
        overflow-y: auto;
      }
      .sidebar__divider {
        height: 1px;
        margin: var(--space-2) var(--space-3);
        background: rgba(238, 244, 250, 0.12);
      }
      .sidebar__item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-3);
        border-radius: var(--radius-sm);
        color: rgba(238, 244, 250, 0.72);
        text-decoration: none;
        font-size: var(--text-sm);
        cursor: pointer;
        white-space: nowrap;
      }
      .sidebar__icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }
      .sidebar__item:hover {
        background: rgba(238, 244, 250, 0.08);
        color: var(--text-on-navy);
      }
      .sidebar__item--active {
        background: rgba(114, 194, 235, 0.16);
        color: var(--color-blue-500);
        font-weight: 600;
      }
      .sidebar__item--disabled {
        /* Bumped from 0.34 (~2.8:1) — still clearly "inactive" but more readable;
           WCAG exempts disabled controls from the 4.5:1 text contrast requirement,
           this is a readability improvement rather than a strict compliance fix. */
        color: rgba(238, 244, 250, 0.55);
        cursor: default;
      }
      .sidebar__item--disabled:hover {
        background: transparent;
        color: rgba(238, 244, 250, 0.55);
      }
      .sidebar__label {
        flex: 1;
      }
      .sidebar__soon {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: rgba(238, 244, 250, 0.55);
      }
      .sidebar__collapse-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: var(--space-3);
        color: rgba(238, 244, 250, 0.7);
        flex-shrink: 0;
      }
      .sidebar__collapse-toggle:hover {
        color: var(--text-on-navy);
      }
    `,
  ],
})
export class SidebarComponent {
  collapsed = input(false);
  showCollapseToggle = input(true);
  toggleCollapsed = output<void>();
  /** Emitted when a nav link is clicked — lets the shell auto-close the mobile overlay drawer. */
  navigate = output<void>();

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Customers', icon: 'domain', route: '/customers' },
    { label: 'Leads', icon: 'person_search', comingSoon: true },
    { label: 'Opportunities', icon: 'trending_up', comingSoon: true },
    { label: 'Activities', icon: 'history', comingSoon: true },
    { label: 'Tasks', icon: 'checklist', comingSoon: true },
    { label: 'Calendar', icon: 'calendar_month', comingSoon: true },
    { label: 'Reports', icon: 'bar_chart', comingSoon: true },
    { label: 'Settings', icon: 'settings', comingSoon: true },
    { label: 'Design System', icon: 'palette', route: '/design-system', divider: true },
  ];
}
