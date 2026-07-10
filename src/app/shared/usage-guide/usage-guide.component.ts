import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Inline "usage guidelines" callout for the design system's Components
 * library. Dropped in after a component demo (or a pair of commonly
 * confused ones) to answer "which one do I use, and how do I wire it up".
 * Kept deliberately terse — this is a quick-reference card, not a full
 * design-system doc site.
 */
@Component({
  selector: 'app-usage-guide',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="usage-guide">
      <div class="usage-guide__header">
        <mat-icon>menu_book</mat-icon>
        <span>Usage guidelines</span>
      </div>
      <div class="usage-guide__grid">
        <div class="usage-guide__col">
          <p class="usage-guide__label">Use it when</p>
          <p class="usage-guide__text">{{ useWhen() }}</p>

          <p class="usage-guide__label usage-guide__label--alt">Reach for something else when</p>
          <p class="usage-guide__text">{{ insteadUse() }}</p>

          @if (tip()) {
            <p class="usage-guide__note usage-guide__note--tip">
              <mat-icon>check_circle</mat-icon>{{ tip() }}
            </p>
          }
          @if (pitfall()) {
            <p class="usage-guide__note usage-guide__note--pitfall">
              <mat-icon>error_outline</mat-icon>{{ pitfall() }}
            </p>
          }
        </div>
        <div class="usage-guide__col">
          <p class="usage-guide__label">Usage</p>
          <pre class="usage-guide__code"><code>{{ snippet() }}</code></pre>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .usage-guide {
        margin-top: var(--space-4);
        border: 1px solid var(--border-subtle);
        border-left: 3px solid var(--color-blue-500);
        border-radius: var(--radius-md);
        background: var(--surface-sunken);
        padding: var(--space-4) var(--space-5);
      }
      .usage-guide__header {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-blue-600);
        margin-bottom: var(--space-3);
      }
      .usage-guide__header mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
      .usage-guide__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-6);
      }
      @media (max-width: 720px) {
        .usage-guide__grid {
          grid-template-columns: 1fr;
        }
      }
      .usage-guide__label {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-tertiary);
        margin: 0 0 2px;
      }
      .usage-guide__label--alt {
        margin-top: var(--space-3);
      }
      .usage-guide__text {
        font-size: var(--text-sm);
        color: var(--text-primary);
        line-height: 1.55;
        margin: 0;
      }
      .usage-guide__note {
        display: flex;
        gap: var(--space-2);
        align-items: flex-start;
        font-size: var(--text-xs);
        line-height: 1.5;
        margin: var(--space-3) 0 0;
      }
      .usage-guide__note mat-icon {
        font-size: 15px;
        width: 15px;
        height: 15px;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .usage-guide__note--tip {
        color: var(--color-success);
      }
      .usage-guide__note--pitfall {
        color: var(--color-danger);
      }
      .usage-guide__code {
        margin: 0;
        padding: var(--space-3);
        background: var(--color-navy-900);
        color: #e6f1ff;
        border-radius: var(--radius-sm);
        font-family: var(--font-mono);
        font-size: 12px;
        line-height: 1.6;
        overflow-x: auto;
        white-space: pre;
      }
    `,
  ],
})
export class UsageGuideComponent {
  useWhen = input.required<string>();
  insteadUse = input.required<string>();
  snippet = input.required<string>();
  tip = input<string>('');
  pitfall = input<string>('');
}
