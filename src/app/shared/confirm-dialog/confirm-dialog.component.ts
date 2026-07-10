import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  /** Material Icons Outlined name shown in the 44×44 rounded icon chip. */
  icon: string;
  title: string;
  description: string;
  /** Short bullet points rendered with check icons inside a tinted callout box. */
  highlights?: string[];
  /** Optional banner-error strip at the bottom, for "cannot be undone" style warnings. */
  warning?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

/**
 * Generic confirm/info dialog matching the GiveSmart design system's
 * "Dialog" spec (design-system-showcase-v1.html → #components → Dialog):
 * icon chip + headline, description, optional highlight callout, optional
 * error banner, Cancel / Primary action footer. 28px radius and shadow-4
 * come from the global dialog token overrides in styles.scss.
 *
 * Usage:
 *   private dialog = inject(MatDialog);
 *
 *   openDialog() {
 *     const ref = this.dialog.open(ConfirmDialogComponent, {
 *       data: {
 *         icon: 'person_add',
 *         title: 'Add new customer account?',
 *         description: 'A new account record will be created in your pipeline.',
 *         highlights: ['Starts in \'onboarding\' status', 'Assigned to you by default'],
 *         confirmLabel: 'Create customer',
 *       } satisfies ConfirmDialogData,
 *     });
 *     ref.afterClosed().subscribe((confirmed) => { ... });
 *   }
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog">
      <div class="confirm-dialog__header">
        <div class="confirm-dialog__icon">
          <mat-icon>{{ data.icon }}</mat-icon>
        </div>
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>

      <div mat-dialog-content>
        <p class="confirm-dialog__desc">{{ data.description }}</p>

        @if (data.highlights?.length) {
          <div class="confirm-dialog__highlights">
            @for (item of data.highlights; track item) {
              <div class="confirm-dialog__highlight">
                <mat-icon>check</mat-icon>
                <span>{{ item }}</span>
              </div>
            }
          </div>
        }

        @if (data.warning) {
          <div class="confirm-dialog__warning">
            <mat-icon>lock</mat-icon>
            <span>{{ data.warning }}</span>
          </div>
        }
      </div>

      <div mat-dialog-actions align="end">
        <button mat-stroked-button type="button" (click)="dialogRef.close(false)">
          {{ data.cancelLabel || 'Cancel' }}
        </button>
        <button mat-flat-button color="primary" type="button" (click)="dialogRef.close(true)">
          {{ data.confirmLabel || 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      /* Material applies its own (asymmetric) padding separately to
         [mat-dialog-title]/[mat-dialog-content]/[mat-dialog-actions] — 6px/24px/13px,
         20px/24px, and 16px/24px respectively by default. Since our icon chip sits
         outside all three as a plain sibling div, it got zero padding while the
         title/content/actions each got their own mismatched inset, throwing the
         whole layout out of alignment. Zeroing all three here and padding the
         single outer wrapper instead gives every section the same consistent inset. */
      :host {
        --mat-dialog-headline-padding: 0;
        --mat-dialog-content-padding: 0;
        --mat-dialog-with-actions-content-padding: 0;
        --mat-dialog-actions-padding: 0;
      }
      .confirm-dialog {
        width: min(420px, 100%);
        box-sizing: border-box;
        padding: var(--space-6);
      }
      .confirm-dialog__header {
        display: flex;
        gap: var(--space-4);
        align-items: flex-start;
        min-width: 0;
      }
      .confirm-dialog__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: var(--radius-md);
        background: var(--color-blue-100);
        color: var(--color-blue-600);
        flex-shrink: 0;
      }
      h2[mat-dialog-title] {
        font-size: var(--text-xl);
        line-height: 32px;
        margin: 0;
        min-width: 0;
        flex: 1 1 auto;
        white-space: normal;
        overflow-wrap: anywhere;
      }
      [mat-dialog-content] {
        margin-top: var(--space-5);
      }
      [mat-dialog-actions] {
        margin-top: var(--space-5);
        gap: var(--space-3);
      }
      .confirm-dialog__desc {
        font-size: var(--text-sm);
        color: var(--text-secondary);
        line-height: 1.6;
      }
      .confirm-dialog__highlights {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        background: var(--color-blue-100);
        border-radius: var(--radius-md);
        padding: var(--space-4);
        margin-top: var(--space-5);
      }
      .confirm-dialog__highlight {
        display: flex;
        gap: var(--space-2);
        font-size: var(--text-sm);
        color: var(--color-blue-600);
      }
      .confirm-dialog__highlight mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        margin-top: 2px;
        flex-shrink: 0;
      }
      .confirm-dialog__warning {
        display: flex;
        gap: var(--space-3);
        align-items: flex-start;
        margin-top: var(--space-5);
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-md);
        background: var(--color-danger-bg);
        color: var(--color-danger);
        font-size: var(--text-sm);
        line-height: 1.6;
      }
      .confirm-dialog__warning mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
