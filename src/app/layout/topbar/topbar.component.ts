import { Component, input, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatBadgeModule],
  template: `
    <mat-toolbar class="topbar">
      @if (isHandset()) {
        <button
          mat-icon-button
          type="button"
          class="topbar__menu-btn"
          (click)="menuClick.emit()"
          aria-label="Open navigation menu"
        >
          <mat-icon>menu</mat-icon>
        </button>
      }

      <nav class="topbar__breadcrumb" aria-label="Breadcrumb">
        @if (!isHandset()) {
          <mat-icon class="topbar__breadcrumb-icon">home</mat-icon>
          <span class="topbar__breadcrumb-sep" aria-hidden="true">/</span>
        }
        <span class="topbar__breadcrumb-current" aria-current="page">{{ breadcrumb() }}</span>
      </nav>

      @if (!isHandset()) {
        <div class="topbar__search">
          <mat-icon>search</mat-icon>
          <input
            type="text"
            placeholder="Search customers, contacts, deals…"
            aria-label="Search"
          />
        </div>
      }

      <div class="topbar__actions">
        <button
          mat-icon-button
          type="button"
          (click)="toggleTheme.emit()"
          [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <mat-icon>{{ isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>

        <button
          mat-icon-button
          type="button"
          aria-label="Notifications"
          matBadge="3"
          matBadgeSize="small"
          matBadgeColor="warn"
        >
          <mat-icon>notifications</mat-icon>
        </button>

        <button type="button" class="topbar__user" aria-label="Open profile menu">
          <span class="topbar__avatar">VG</span>
          @if (!isHandset()) {
            <span class="topbar__user-name">Vijay Gaikwad</span>
            <mat-icon class="topbar__chevron">expand_more</mat-icon>
          }
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .topbar {
        display: flex;
        align-items: center;
        gap: var(--space-6);
        height: var(--topbar-height);
        padding: 0 var(--space-6);
        background: var(--surface-raised);
        border-bottom: 1px solid var(--border-subtle);
      }
      .topbar__menu-btn {
        flex-shrink: 0;
        margin-right: calc(-1 * var(--space-2));
      }

      @media (max-width: 900px) {
        .topbar {
          gap: var(--space-3);
          padding: 0 var(--space-3);
        }
      }
      .topbar__breadcrumb {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-sm);
        color: var(--text-secondary);
        white-space: nowrap;
        min-width: 0;
        overflow: hidden;
      }
      .topbar__breadcrumb-current {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .topbar__breadcrumb-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
      .topbar__breadcrumb-sep {
        color: var(--text-tertiary);
      }
      .topbar__breadcrumb-current {
        color: var(--text-primary);
        font-weight: 600;
      }
      .topbar__search {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        flex: 1;
        max-width: 420px;
        padding: var(--space-2) var(--space-3);
        background: var(--surface-sunken);
        border: 1px solid transparent;
        border-radius: var(--radius-sm);
        color: var(--text-tertiary);
      }
      .topbar__search:focus-within {
        border-color: var(--border-focus);
        background: var(--surface-raised);
      }
      .topbar__search mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .topbar__search input {
        flex: 1;
        border: none;
        background: transparent;
        outline: none;
        font-size: var(--text-sm);
        color: var(--text-primary);
        font-family: var(--font-ui);
      }
      .topbar__actions {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-left: auto;
      }
      .topbar__user {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-1) var(--space-2);
        border: none;
        border-radius: var(--radius-sm);
        background: transparent;
        cursor: pointer;
      }
      .topbar__user:hover {
        background: var(--surface-sunken);
      }
      .topbar__avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--color-navy-800);
        color: var(--color-blue-500);
        font-size: var(--text-xs);
        font-weight: 700;
      }
      .topbar__user-name {
        font-size: var(--text-sm);
        font-weight: 500;
        color: var(--text-primary);
      }
      .topbar__chevron {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: var(--text-tertiary);
      }
    `,
  ],
})
export class TopbarComponent {
  breadcrumb = input('Dashboard');
  isDark = input(false);
  isHandset = input(false);
  toggleTheme = output<void>();
  menuClick = output<void>();
}
