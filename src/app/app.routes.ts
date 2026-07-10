import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Dashboard · Enterprise CRM',
    data: { breadcrumb: 'Dashboard' },
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./features/customers/customers-list.component').then(
        (m) => m.CustomersListComponent
      ),
    title: 'Customers · Enterprise CRM',
    data: { breadcrumb: 'Customers' },
  },
  {
    path: 'customers/:id',
    loadComponent: () =>
      import('./features/customers/customer-detail.component').then(
        (m) => m.CustomerDetailComponent
      ),
    title: 'Customer · Enterprise CRM',
    data: { breadcrumb: 'Customer detail' },
  },
  {
    path: 'design-system',
    loadComponent: () =>
      import('./features/design-system/design-system.component').then(
        (m) => m.DesignSystemComponent
      ),
    title: 'Design System · Enterprise CRM',
    data: { breadcrumb: 'Design System' },
  },
  {
    path: 'design-system/components',
    loadComponent: () =>
      import('./features/design-system/components-library.component').then(
        (m) => m.ComponentsLibraryComponent
      ),
    title: 'Components · Design System · Enterprise CRM',
    data: { breadcrumb: 'Components' },
  },
  { path: '**', redirectTo: 'dashboard' },
];
