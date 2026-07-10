import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../core/services/customer.service';
import { Customer, CustomerStatus } from '../../core/models/customer.model';
import { BadgeComponent, statusToTone } from '../../shared/badge/badge.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

type SortKey = 'name' | 'mrr' | 'healthScore' | 'lastActivity';

const STATUS_FILTERS: CustomerStatus[] = ['active', 'at-risk', 'onboarding', 'churned'];

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    RouterLink,
    DecimalPipe,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    BadgeComponent,
    EmptyStateComponent,
  ],
  template: `
    <div class="customers">
      <div class="customers__header">
        <div>
          <h1>Customers</h1>
          <p class="customers__subtitle">{{ filtered().length }} of {{ customerService.customers().length }} accounts</p>
        </div>
        <button mat-flat-button color="primary" type="button" (click)="openNewCustomerDialog()">
          <mat-icon>add</mat-icon> New customer
        </button>
      </div>

      <div class="customers__toolbar">
        <div class="customers__search">
          <mat-icon>search</mat-icon>
          <input
            type="text"
            placeholder="Search by name or domain"
            [value]="searchTerm()"
            (input)="searchTerm.set($any($event.target).value)"
            aria-label="Search customers"
          />
        </div>

        <mat-chip-listbox aria-label="Filter by status" multiple (change)="onFilterChange($event)">
          @for (status of statusFilters; track status) {
            <mat-chip-option [value]="status" [selected]="activeFilters().has(status)">
              {{ status }}
            </mat-chip-option>
          }
        </mat-chip-listbox>
      </div>

      @if (customerService.loading()) {
        <mat-progress-bar mode="indeterminate" />
      }

      @if (!customerService.loading() && paged().length === 0) {
        <app-empty-state
          icon="search_off"
          title="No customers match these filters"
          description="Try clearing the search or status filters to see the full list."
        />
      }

      @if (!customerService.loading() && paged().length > 0) {
        <div class="customers__table-scroll">
        <table mat-table [dataSource]="paged()" class="customers__table">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef [attr.aria-sort]="ariaSortFor('name')">
              <button class="sort-btn" (click)="setSort('name')">Account {{ sortIndicator('name') }}</button>
            </th>
            <td mat-cell *matCellDef="let c">
              <a class="account-cell" [routerLink]="['/customers', c.id]">
                <span class="account-cell__logo">{{ c.logoInitial }}</span>
                <span>
                  <span class="account-cell__name">{{ c.name }}</span>
                  <span class="account-cell__domain">{{ c.domain }}</span>
                </span>
              </a>
            </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let c">
              <app-badge [tone]="statusToTone(c.status)">{{ c.status }}</app-badge>
            </td>
          </ng-container>

          <ng-container matColumnDef="owner">
            <th mat-header-cell *matHeaderCellDef>Owner</th>
            <td mat-cell *matCellDef="let c">{{ c.owner }}</td>
          </ng-container>

          <ng-container matColumnDef="mrr">
            <th mat-header-cell *matHeaderCellDef [attr.aria-sort]="ariaSortFor('mrr')">
              <button class="sort-btn" (click)="setSort('mrr')">MRR {{ sortIndicator('mrr') }}</button>
            </th>
            <td mat-cell *matCellDef="let c" class="mono">{{ c.mrr === 0 ? '—' : '$' + (c.mrr | number) }}</td>
          </ng-container>

          <ng-container matColumnDef="health">
            <th mat-header-cell *matHeaderCellDef [attr.aria-sort]="ariaSortFor('healthScore')">
              <button class="sort-btn" (click)="setSort('healthScore')">Health {{ sortIndicator('healthScore') }}</button>
            </th>
            <td mat-cell *matCellDef="let c">
              <div class="health" [class.health--low]="c.healthScore < 50" [class.health--mid]="c.healthScore >= 50 && c.healthScore < 75">
                <div class="health__track"><div class="health__fill" [style.width.%]="c.healthScore"></div></div>
                <span class="mono">{{ c.healthScore }}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="lastActivity">
            <th mat-header-cell *matHeaderCellDef [attr.aria-sort]="ariaSortFor('lastActivity')">
              <button class="sort-btn" (click)="setSort('lastActivity')">Last activity {{ sortIndicator('lastActivity') }}</button>
            </th>
            <td mat-cell *matCellDef="let c">{{ c.lastActivity }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns"></tr>
        </table>
        </div>

        <mat-paginator
          [length]="filtered().length"
          [pageSize]="pageSize()"
          [pageSizeOptions]="[5, 10, 25]"
          [pageIndex]="pageIndex()"
          (page)="onPage($event)"
          aria-label="Select page of customers"
        />
      }
    </div>
  `,
  styles: [
    `
      .customers__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-5);
        flex-wrap: wrap;
        gap: var(--space-3);
      }
      h1 { font-size: var(--text-xl); }
      .customers__subtitle { color: var(--text-secondary); font-size: var(--text-sm); margin-top: var(--space-1); }

      .btn {
        display: inline-flex; align-items: center; gap: var(--space-2);
        padding: var(--space-2) var(--space-4); border-radius: var(--radius-sm);
        border: 1px solid transparent; font-size: var(--text-sm); font-weight: 600; cursor: pointer;
      }
      .btn .material-symbols-outlined { font-size: 18px; }
      .btn--primary { background: var(--color-navy-800); color: var(--text-on-navy); }
      .btn--primary:hover { background: var(--color-navy-700); }

      .customers__toolbar {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        margin-bottom: var(--space-4);
        flex-wrap: wrap;
      }
      .customers__search {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        flex: 1 1 320px;
        max-width: 320px;
        height: 36px;
        padding: 0 var(--space-3);
        background: var(--surface-raised);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-sm);
        color: var(--text-tertiary);
      }
      .customers__search:focus-within {
        border-color: var(--color-blue-500);
        box-shadow: 0 0 0 3px rgba(36, 128, 166, 0.13);
      }
      .customers__search mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }
      .customers__search input {
        flex: 1;
        height: 100%;
        border: none;
        background: transparent;
        outline: none;
        font-size: var(--text-sm);
        color: var(--text-primary);
        font-family: var(--font-ui);
      }
      .customers__search input::placeholder {
        color: var(--text-tertiary);
      }

      .customers__table-scroll {
        width: 100%;
        overflow-x: auto;
        background: var(--surface-raised);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
      }
      .customers__table {
        width: 100%;
        min-width: 720px;
      }

      @media (max-width: 600px) {
        .customers__search {
          max-width: none;
          flex-basis: 100%;
        }
      }
      ::ng-deep .customers__table .mat-mdc-header-row { background: var(--surface-sunken); }
      ::ng-deep .customers__table .mat-mdc-header-cell { color: var(--text-secondary); font-weight: 600; font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.03em; }
      ::ng-deep .customers__table .mat-mdc-cell { color: var(--text-primary); font-size: var(--text-sm); border-color: var(--border-subtle); }
      ::ng-deep .customers__table .mat-mdc-row:hover { background: var(--surface-sunken); }

      .sort-btn {
        background: none; border: none; padding: 0; cursor: pointer;
        font: inherit; color: inherit; text-transform: inherit; letter-spacing: inherit;
      }

      .account-cell { display: flex; align-items: center; gap: var(--space-3); text-decoration: none; }
      .account-cell__logo {
        display: flex; align-items: center; justify-content: center;
        width: 32px; height: 32px; border-radius: var(--radius-sm);
        background: var(--color-info-bg); color: var(--color-blue-600);
        font-weight: 700; font-size: var(--text-sm); flex-shrink: 0;
      }
      .account-cell__name { display: block; color: var(--text-primary); font-weight: 600; font-size: var(--text-sm); }
      .account-cell__domain { display: block; color: var(--text-tertiary); font-size: var(--text-xs); }

      .health { display: flex; align-items: center; gap: var(--space-2); }
      .health__track { width: 64px; height: 6px; border-radius: 3px; background: var(--surface-sunken); overflow: hidden; }
      .health__fill { height: 100%; background: var(--color-success); border-radius: 3px; }
      .health--mid .health__fill { background: var(--color-warning); }
      .health--low .health__fill { background: var(--color-danger); }

      mat-paginator { background: transparent; margin-top: var(--space-2); }
    `,
  ],
})
export class CustomersListComponent implements OnInit {
  readonly customerService = inject(CustomerService);
  private readonly dialog = inject(MatDialog);
  readonly statusToTone = statusToTone;
  readonly statusFilters = STATUS_FILTERS;
  readonly columns = ['name', 'status', 'owner', 'mrr', 'health', 'lastActivity'];

  readonly searchTerm = signal('');
  readonly activeFilters = signal<Set<CustomerStatus>>(new Set());
  readonly sortKey = signal<SortKey>('name');
  readonly sortAsc = signal(true);
  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);

  readonly filtered = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const filters = this.activeFilters();
    return this.customerService.customers().filter((c) => {
      const matchesTerm =
        !term || c.name.toLowerCase().includes(term) || c.domain.toLowerCase().includes(term);
      const matchesFilter = filters.size === 0 || filters.has(c.status);
      return matchesTerm && matchesFilter;
    });
  });

  readonly sorted = computed(() => {
    const key = this.sortKey();
    const dir = this.sortAsc() ? 1 : -1;
    return [...this.filtered()].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  });

  readonly paged = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.customerService.load();
  }

  /** Demonstrates the shared design-system dialog (see confirm-dialog.component.ts). */
  openNewCustomerDialog() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        icon: 'person_add',
        title: 'Add new customer account?',
        description:
          'A new account record will be created in your pipeline. You can add contacts, deals, and notes once it’s saved.',
        highlights: ['Starts in ‘onboarding’ status', 'Assigned to you by default'],
        confirmLabel: 'Create customer',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // Wire up to CustomerService.create(...) once the backend exists.
      }
    });
  }

  onFilterChange(event: { value: CustomerStatus[] }) {
    this.activeFilters.set(new Set(event.value));
    this.pageIndex.set(0);
  }

  setSort(key: SortKey) {
    if (this.sortKey() === key) {
      this.sortAsc.set(!this.sortAsc());
    } else {
      this.sortKey.set(key);
      this.sortAsc.set(true);
    }
  }

  sortIndicator(key: SortKey): string {
    if (this.sortKey() !== key) return '';
    return this.sortAsc() ? '↑' : '↓';
  }

  /** aria-sort for the <th> — lets screen readers announce sort state, not just the visual arrow glyph. */
  ariaSortFor(key: SortKey): 'ascending' | 'descending' | null {
    if (this.sortKey() !== key) return null;
    return this.sortAsc() ? 'ascending' : 'descending';
  }

  onPage(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
