import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="empty-state">
      <mat-icon class="empty-state__icon">{{ icon() }}</mat-icon>
      <p class="empty-state__title">{{ title() }}</p>
      @if (description()) {
        <p class="empty-state__desc">{{ description() }}</p>
      }
      <ng-content />
    </div>
  `,
  styles: [
    `
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: var(--space-10) var(--space-6);
        color: var(--text-secondary);
      }
      .empty-state__icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        color: var(--text-tertiary);
        margin-bottom: var(--space-3);
      }
      .empty-state__title {
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-1);
      }
      .empty-state__desc {
        font-size: var(--text-sm);
        max-width: 320px;
      }
    `,
  ],
})
export class EmptyStateComponent {
  icon = input('inbox');
  title = input('Nothing here yet');
  description = input<string>('');
}
