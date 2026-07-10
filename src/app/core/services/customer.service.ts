import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Customer } from '../models/customer.model';

/**
 * Loads and holds customer state for the app.
 *
 * A real CRM backs this with a paginated API + optimistic mutations; the
 * signal-based store here stands in for that so components can consume
 * `customers()` / `loading()` reactively without knowing the data source.
 */
@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly http = inject(HttpClient);

  private readonly _customers = signal<Customer[]>([]);
  private readonly _loading = signal(true);

  readonly customers = this._customers.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly totalMrr = computed(() =>
    this._customers().reduce((sum, c) => sum + c.mrr, 0)
  );

  readonly activeCount = computed(
    () => this._customers().filter((c) => c.status === 'active').length
  );

  readonly atRiskCount = computed(
    () => this._customers().filter((c) => c.status === 'at-risk').length
  );

  load() {
    if (this._customers().length) return;
    this._loading.set(true);
    this.http
      .get<Customer[]>('assets/mock/customers.json')
      .pipe(tap(() => this._loading.set(false)))
      .subscribe((data) => this._customers.set(data));
  }

  byId(id: string): Customer | undefined {
    return this._customers().find((c) => c.id === id);
  }
}
