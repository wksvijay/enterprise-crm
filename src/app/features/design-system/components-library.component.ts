import { AfterViewInit, Component, ViewChild, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BadgeComponent, statusToTone } from '../../shared/badge/badge.component';
import { StatCardComponent } from '../../shared/stat-card/stat-card.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { UsageGuideComponent } from '../../shared/usage-guide/usage-guide.component';
import { KpiSummary } from '../../core/models/activity.model';

interface CategoryNav {
  id: string;
  label: string;
  count: number;
}

const CATEGORIES: CategoryNav[] = [
  { id: 'actions', label: 'Actions', count: 8 },
  { id: 'forms', label: 'Forms', count: 13 },
  { id: 'data', label: 'Data display', count: 13 },
  { id: 'nav', label: 'Navigation', count: 7 },
  { id: 'feedback', label: 'Feedback & status', count: 9 },
  { id: 'overlays', label: 'Overlays', count: 3 },
];

/** Minimal content component shown inside the Bottom Sheet demo. */
@Component({
  selector: 'app-ds-bottom-sheet-demo',
  standalone: true,
  imports: [MatListModule, MatIconModule],
  template: `
    <mat-nav-list class="bs-demo">
      <a mat-list-item (click)="ref.dismiss('email')">
        <mat-icon matListItemIcon>mail</mat-icon>
        <span matListItemTitle>Email customer</span>
      </a>
      <a mat-list-item (click)="ref.dismiss('call')">
        <mat-icon matListItemIcon>call</mat-icon>
        <span matListItemTitle>Log a call</span>
      </a>
      <a mat-list-item (click)="ref.dismiss('task')">
        <mat-icon matListItemIcon>checklist</mat-icon>
        <span matListItemTitle>Create task</span>
      </a>
    </mat-nav-list>
  `,
  styles: [
    `
      .bs-demo {
        padding-bottom: var(--space-2);
      }
    `,
  ],
})
export class DsBottomSheetDemoComponent {
  ref = inject(MatBottomSheetRef<DsBottomSheetDemoComponent>);
}

interface DemoRow {
  name: string;
  status: string;
  mrr: string;
}

interface ComplexRow {
  name: string;
  status: string;
  owner: string;
  mrr: number;
}

@Component({
  selector: 'app-components-library',
  standalone: true,
  imports: [
    RouterLink,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDatepickerModule,
    MatCardModule,
    MatTableModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatExpansionModule,
    MatStepperModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatSortModule,
    CurrencyPipe,
    BadgeComponent,
    StatCardComponent,
    EmptyStateComponent,
    UsageGuideComponent,
  ],
  template: `
    <div class="cl">
      <header class="cl__header">
        <nav class="cl__switcher" aria-label="Design system pages">
          <a routerLink="/design-system" routerLinkActive="cl__switcher-item--active">Foundations</a>
          <a routerLink="/design-system/components" routerLinkActive="cl__switcher-item--active" class="cl__switcher-item--active">Components</a>
        </nav>
        <p class="cl__eyebrow">Component library</p>
        <h1>53 components, one design language</h1>
        <p class="cl__desc">
          Representative variants of every interactive and data-display pattern used across the
          app — grouped by purpose. Each one renders live with the same GiveSmart tokens and
          Angular Material structure as the rest of the CRM, so what you see here is exactly what
          ships.
        </p>
      </header>

      <mat-tab-group class="cl__tabs" animationDuration="150ms">
        <!-- ============================= ACTIONS ============================= -->
        <mat-tab label="Actions (8)">
          <div class="cl__panel">
            <div class="component-block">
              <p class="ds__group-label">1. Buttons</p>
              <div class="demo-row">
                <button mat-flat-button color="primary" type="button"><mat-icon>check</mat-icon> Save settings</button>
                <button mat-raised-button type="button">Raised</button>
                <button mat-stroked-button type="button">Cancel</button>
                <button mat-flat-button type="button" disabled>Disabled</button>
                <button mat-button type="button">Text button</button>
              </div>
              <app-usage-guide
                useWhen="A single primary action per view (flat/raised), or secondary/tertiary actions (stroked/text) alongside it."
                insteadUse="Choosing between mutually exclusive options — use a Button toggle group instead of several buttons."
                tip="Keep exactly one flat/primary button per section so the main action stays obvious."
                pitfall="Don't style more than one button as 'primary' in the same row — it kills the visual hierarchy."
                [snippet]="snippetButtons"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">2. Icon buttons</p>
              <div class="demo-row">
                <button mat-icon-button type="button" aria-label="Edit"><mat-icon>edit</mat-icon></button>
                <button mat-icon-button type="button" aria-label="Delete"><mat-icon>delete_outline</mat-icon></button>
                <button mat-icon-button type="button" aria-label="Share"><mat-icon>ios_share</mat-icon></button>
                <button mat-icon-button type="button" disabled aria-label="Disabled"><mat-icon>block</mat-icon></button>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">3. FAB / mini FAB</p>
              <div class="demo-row">
                <button mat-fab color="primary" type="button" aria-label="Add"><mat-icon>add</mat-icon></button>
                <button mat-mini-fab type="button" aria-label="Add small"><mat-icon>add</mat-icon></button>
                <button mat-fab extended color="primary" type="button"><mat-icon>add</mat-icon> New customer</button>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">4. Button toggle group</p>
              <div class="demo-row">
                <mat-button-toggle-group value="month" aria-label="Report period">
                  <mat-button-toggle value="week">Week</mat-button-toggle>
                  <mat-button-toggle value="month">Month</mat-button-toggle>
                  <mat-button-toggle value="quarter">Quarter</mat-button-toggle>
                </mat-button-toggle-group>
                <mat-button-toggle-group multiple aria-label="View options">
                  <mat-button-toggle value="grid" checked><mat-icon>grid_view</mat-icon></mat-button-toggle>
                  <mat-button-toggle value="list"><mat-icon>view_list</mat-icon></mat-button-toggle>
                </mat-button-toggle-group>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">5. Action chips</p>
              <div class="demo-row">
                <mat-chip-set aria-label="Quick actions">
                  <mat-chip (click)="noop()"><mat-icon matChipAvatar>mail</mat-icon> Email</mat-chip>
                  <mat-chip (click)="noop()"><mat-icon matChipAvatar>call</mat-icon> Call</mat-chip>
                  <mat-chip disabled>Archived</mat-chip>
                </mat-chip-set>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">6. Menu</p>
              <div class="demo-row">
                <button mat-stroked-button type="button" [matMenuTriggerFor]="actionsMenu">
                  Bulk actions <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
                </button>
                <mat-menu #actionsMenu="matMenu">
                  <button mat-menu-item type="button"><mat-icon>label</mat-icon> Add tag</button>
                  <button mat-menu-item type="button"><mat-icon>archive</mat-icon> Archive</button>
                  <button mat-menu-item type="button" disabled><mat-icon>delete</mat-icon> Delete</button>
                </mat-menu>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">7. Split button</p>
              <div class="demo-row">
                <div class="split-btn">
                  <button mat-flat-button color="primary" type="button" class="split-btn__main">Create deal</button>
                  <button mat-flat-button color="primary" type="button" class="split-btn__caret" [matMenuTriggerFor]="splitMenu" aria-label="More create options">
                    <mat-icon>arrow_drop_down</mat-icon>
                  </button>
                </div>
                <mat-menu #splitMenu="matMenu">
                  <button mat-menu-item type="button">Create from template</button>
                  <button mat-menu-item type="button">Import deals</button>
                </mat-menu>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">8. Favorite toggle</p>
              <div class="demo-row">
                <button mat-icon-button type="button" (click)="favorited.set(!favorited())" [attr.aria-pressed]="favorited()" aria-label="Toggle favorite">
                  <mat-icon [style.color]="favorited() ? 'var(--color-warning)' : 'var(--text-tertiary)'">
                    {{ favorited() ? 'star' : 'star_border' }}
                  </mat-icon>
                </button>
                <span class="cl__hint">Click the star — it's the one live toggle in this row.</span>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- ============================== FORMS =============================== -->
        <mat-tab label="Forms (13)">
          <div class="cl__panel">
            <div class="component-block">
              <p class="ds__group-label">9. Text input</p>
              <div class="demo-row demo-row--wrap">
                <mat-form-field appearance="outline">
                  <mat-label>Account name</mat-label>
                  <input matInput placeholder="Blue Harbor Museum Trust" />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Disabled</mat-label>
                  <input matInput value="Locked field" disabled />
                </mat-form-field>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">10. Textarea</p>
              <mat-form-field appearance="outline" class="cl__field-wide">
                <mat-label>Notes</mat-label>
                <textarea matInput rows="3" placeholder="Add call notes..."></textarea>
              </mat-form-field>
            </div>

            <div class="component-block">
              <p class="ds__group-label">11. Input with icons</p>
              <div class="demo-row demo-row--wrap">
                <mat-form-field appearance="outline">
                  <mat-label>Search</mat-label>
                  <mat-icon matPrefix>search</mat-icon>
                  <input matInput placeholder="Search customers" />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Password</mat-label>
                  <input matInput [type]="passwordHidden() ? 'password' : 'text'" value="••••••••" />
                  <button mat-icon-button matSuffix type="button" (click)="passwordHidden.set(!passwordHidden())" [attr.aria-label]="passwordHidden() ? 'Show password' : 'Hide password'">
                    <mat-icon>{{ passwordHidden() ? 'visibility' : 'visibility_off' }}</mat-icon>
                  </button>
                </mat-form-field>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">12. Select</p>
              <mat-form-field appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select value="active">
                  <mat-option value="active">Active</mat-option>
                  <mat-option value="at-risk">At risk</mat-option>
                  <mat-option value="onboarding">Onboarding</mat-option>
                  <mat-option value="churned">Churned</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="component-block">
              <p class="ds__group-label">13. Autocomplete</p>
              <mat-form-field appearance="outline">
                <mat-label>Owner</mat-label>
                <input matInput [matAutocomplete]="ownerAuto" placeholder="Type a name" />
                <mat-autocomplete #ownerAuto="matAutocomplete">
                  <mat-option value="Priya Shah">Priya Shah</mat-option>
                  <mat-option value="Daniel Cho">Daniel Cho</mat-option>
                  <mat-option value="Maria Alvarez">Maria Alvarez</mat-option>
                </mat-autocomplete>
              </mat-form-field>
              <app-usage-guide
                useWhen="Select for a short, fixed list (roughly under 15 options) where users pick from what's already shown."
                insteadUse="Autocomplete for long or dynamic lists — customers, owners, tags — where typing narrows results faster than scrolling."
                tip="Give Autocomplete a sensible unfiltered default list so it's still useful before the user types anything."
                pitfall="Don't use Select for a searchable list of 50+ items — it forces endless scrolling with no way to filter."
                [snippet]="snippetAutocomplete"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">14. Checkbox</p>
              <div class="demo-row">
                <mat-checkbox [checked]="true">Checked</mat-checkbox>
                <mat-checkbox [checked]="false">Unchecked</mat-checkbox>
                <mat-checkbox [indeterminate]="true">Indeterminate</mat-checkbox>
                <mat-checkbox [checked]="true" disabled>Disabled</mat-checkbox>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">15. Radio group</p>
              <mat-radio-group aria-label="Contact preference" class="demo-row">
                <mat-radio-button name="contact-pref" [checked]="true">Email</mat-radio-button>
                <mat-radio-button name="contact-pref">Phone</mat-radio-button>
                <mat-radio-button name="contact-pref" disabled>SMS</mat-radio-button>
              </mat-radio-group>
            </div>

            <div class="component-block">
              <p class="ds__group-label">16. Slide toggle</p>
              <div class="demo-row">
                <mat-slide-toggle [checked]="true">Email alerts</mat-slide-toggle>
                <mat-slide-toggle [checked]="false">SMS alerts</mat-slide-toggle>
                <mat-slide-toggle [checked]="true" disabled>Locked</mat-slide-toggle>
              </div>
              <app-usage-guide
                useWhen="Checkbox for independent multi-select choices; Radio group for one choice among 2–5 visible options; Slide toggle for a setting that takes effect immediately."
                insteadUse="More than ~5 mutually exclusive options — use Select instead of a radio group."
                tip="Slide toggle changes should apply right away with no separate Save step — that's what makes it feel like a toggle, not a form field."
                pitfall="Don't use a slide toggle for something that needs explicit confirmation before it takes effect — use a checkbox plus a Save action."
                [snippet]="snippetSelectionControls"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">17. Slider</p>
              <div class="demo-row demo-row--wrap">
                <mat-slider min="0" max="100" step="10" class="cl__slider">
                  <input matSliderThumb value="40" />
                </mat-slider>
                <mat-slider min="0" max="100" step="1" class="cl__slider" discrete>
                  <input matSliderThumb value="70" />
                </mat-slider>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">18. Datepicker</p>
              <mat-form-field appearance="outline">
                <mat-label>Follow-up date</mat-label>
                <input matInput [matDatepicker]="picker" placeholder="MM/DD/YYYY" />
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
            </div>

            <div class="component-block">
              <p class="ds__group-label">19. Chip input (removable)</p>
              <mat-chip-grid #tagGrid aria-label="Tags" class="cl__field-wide">
                @for (chip of demoChips(); track chip) {
                  <mat-chip-row (removed)="removeChip(chip)">
                    {{ chip }}
                    <button matChipRemove [attr.aria-label]="'Remove ' + chip">
                      <mat-icon>cancel</mat-icon>
                    </button>
                  </mat-chip-row>
                }
                <input placeholder="Add a tag..." [matChipInputFor]="tagGrid" />
              </mat-chip-grid>
            </div>

            <div class="component-block">
              <p class="ds__group-label">20. Form field states</p>
              <div class="demo-row demo-row--wrap">
                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput value="not-an-email" />
                  <mat-error>Enter a valid email address</mat-error>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Website</mat-label>
                  <input matInput placeholder="https://" />
                  <mat-hint>Include https://</mat-hint>
                </mat-form-field>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">21. Filter chip options</p>
              <mat-chip-listbox aria-label="Example filter">
                <mat-chip-option selected>active</mat-chip-option>
                <mat-chip-option>at-risk</mat-chip-option>
                <mat-chip-option>onboarding</mat-chip-option>
              </mat-chip-listbox>
              <app-usage-guide
                useWhen="Action chips for quick one-tap commands attached to a record (email/call); filter chip options for toggling multi-select filters in a toolbar."
                insteadUse="Representing a record's state — use a Status badge instead of a chip, and use Slide toggle for a single binary setting."
                tip="Filter chips should visually show selected vs. unselected state clearly — rely on mat-chip-option's built-in selected styling rather than custom colors."
                pitfall="Don't use chips as the only way to trigger a destructive action (delete/archive) — pair with a confirm dialog."
                [snippet]="snippetChips"
              ></app-usage-guide>
            </div>
          </div>
        </mat-tab>

        <!-- ========================== DATA DISPLAY ============================ -->
        <mat-tab label="Data display (13)">
          <div class="cl__panel">
            <div class="component-block">
              <p class="ds__group-label">22. Card</p>
              <div class="demo-row demo-row--wrap">
                <mat-card appearance="outlined" class="demo-card">
                  <mat-card-content>
                    <div class="demo-card__icon"><mat-icon>domain</mat-icon></div>
                    <div class="demo-card__label">Accounts</div>
                    <div class="demo-card__value">114</div>
                    <div class="demo-card__meta">8 onboarding</div>
                  </mat-card-content>
                </mat-card>
                <mat-card appearance="outlined" class="demo-card">
                  <mat-card-header>
                    <mat-card-title>Blue Harbor Trust</mat-card-title>
                    <mat-card-subtitle>Nonprofit · Active</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>
                    <p class="cl__card-copy">Renewed annual membership plan last week.</p>
                  </mat-card-content>
                  <mat-card-actions align="end">
                    <button mat-button type="button">View</button>
                  </mat-card-actions>
                </mat-card>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">23. Table</p>
              <table mat-table [dataSource]="tableRows" class="cl__table">
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Account</th>
                  <td mat-cell *matCellDef="let row">{{ row.name }}</td>
                </ng-container>
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let row"><app-badge tone="success">{{ row.status }}</app-badge></td>
                </ng-container>
                <ng-container matColumnDef="mrr">
                  <th mat-header-cell *matHeaderCellDef>MRR</th>
                  <td mat-cell *matCellDef="let row" class="mono">{{ row.mrr }}</td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="tableColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: tableColumns"></tr>
              </table>
            </div>

            <div class="component-block">
              <p class="ds__group-label">24. List (basic)</p>
              <mat-list class="cl__list-demo">
                <mat-list-item>Renewal reminder sent</mat-list-item>
                <mat-list-item>Contract signed</mat-list-item>
                <mat-list-item>Kickoff call scheduled</mat-list-item>
              </mat-list>
            </div>

            <div class="component-block">
              <p class="ds__group-label">25. List with avatars</p>
              <mat-nav-list class="cl__list-demo">
                <a mat-list-item>
                  <div matListItemAvatar class="cl__avatar cl__avatar--sm">PS</div>
                  <span matListItemTitle>Priya Shah</span>
                  <span matListItemLine>Account owner</span>
                </a>
                <a mat-list-item>
                  <div matListItemAvatar class="cl__avatar cl__avatar--sm">DC</div>
                  <span matListItemTitle>Daniel Cho</span>
                  <span matListItemLine>CSM</span>
                </a>
              </mat-nav-list>
              <app-usage-guide
                useWhen="Card for a self-contained summary with visual weight (KPI, account snapshot) that may carry its own actions; List for a dense, scannable sequence of similar items."
                insteadUse="A page full of near-identical rows — wrapping each in its own Card adds noise; use a plain List or Table instead."
                tip="Reserve cards for content that deserves a visual boundary — dashboards, summaries, single-record previews."
                pitfall="Don't nest a card inside a list item 'for emphasis' — it usually just adds unnecessary padding and borders."
                [snippet]="snippetCardList"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">26. Grid list</p>
              <mat-grid-list cols="3" rowHeight="72px" gutterSize="12px" class="cl__grid-demo">
                <mat-grid-tile>Open</mat-grid-tile>
                <mat-grid-tile>Won</mat-grid-tile>
                <mat-grid-tile>Lost</mat-grid-tile>
              </mat-grid-list>
              <app-usage-guide
                useWhen="Table for comparing structured records across multiple attributes/columns (accounts, deals); Grid list for a compact, uniform visual grid where layout matters more than comparison."
                insteadUse="Data that needs sorting or column-by-column comparison — use a Table instead of a grid list."
                tip="Keep grid list tiles the same visual weight — it works best for evenly-sized summary tiles, not variable-length content."
                pitfall="Don't use a grid list when users need to sort or scan a specific column — that's a Table's job."
                [snippet]="snippetTable"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">27. Divider</p>
              <p class="cl__card-copy">Section one content.</p>
              <mat-divider></mat-divider>
              <p class="cl__card-copy">Section two content.</p>
            </div>

            <div class="component-block">
              <p class="ds__group-label">28. Avatar</p>
              <div class="demo-row">
                <div class="cl__avatar">PS</div>
                <div class="cl__avatar cl__avatar--purple">DC</div>
                <div class="cl__avatar cl__avatar--icon"><mat-icon>domain</mat-icon></div>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">29. Stat card</p>
              <div class="demo-row">
                <app-stat-card [kpi]="sampleKpi" class="cl__stat-wrap"></app-stat-card>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">30. Status badge</p>
              <div class="demo-row">
                <app-badge tone="success">active</app-badge>
                <app-badge tone="warning">at-risk</app-badge>
                <app-badge tone="danger">churned</app-badge>
                <app-badge tone="info">onboarding</app-badge>
                <app-badge tone="neutral">hidden</app-badge>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">31. Notification badge</p>
              <div class="demo-row">
                <button mat-icon-button matBadge="4" matBadgeColor="warn" type="button" aria-label="Notifications">
                  <mat-icon>notifications</mat-icon>
                </button>
                <button mat-icon-button matBadge="•" matBadgeColor="accent" matBadgeSize="small" type="button" aria-label="Messages">
                  <mat-icon>mail</mat-icon>
                </button>
              </div>
              <app-usage-guide
                useWhen="Status badge (app-badge) labels a record's state in tables/cards; Notification badge (matBadge) overlays a count or dot on an icon to flag unread items."
                insteadUse="A clickable filter or action — use a Chip or Button instead of a badge, which is a passive label, not an interactive control."
                tip="Keep notification badge numbers accurate and low-friction to clear — stale counts train users to ignore them."
                pitfall="Don't use a notification badge to show static status text (e.g. 'active') — that's what Status badge is for."
                [snippet]="snippetBadges"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">32. Expansion panel</p>
              <mat-accordion class="cl__field-wide">
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title>Billing details</mat-panel-title>
                    <mat-panel-description>Plan, invoices, payment method</mat-panel-description>
                  </mat-expansion-panel-header>
                  <p class="cl__card-copy">Annual plan · renews March 2027.</p>
                </mat-expansion-panel>
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title>Integration settings</mat-panel-title>
                  </mat-expansion-panel-header>
                  <p class="cl__card-copy">Connected to 2 external systems.</p>
                </mat-expansion-panel>
              </mat-accordion>
            </div>

            <div class="component-block">
              <p class="ds__group-label">33. Timeline</p>
              <ol class="cl__timeline">
                <li><span class="cl__timeline-dot"></span><div><strong>Deal created</strong><br /><span class="cl__hint">Jun 2</span></div></li>
                <li><span class="cl__timeline-dot"></span><div><strong>Proposal sent</strong><br /><span class="cl__hint">Jun 14</span></div></li>
                <li><span class="cl__timeline-dot cl__timeline-dot--active"></span><div><strong>Contract signed</strong><br /><span class="cl__hint">Jul 1</span></div></li>
              </ol>
            </div>

            <div class="component-block">
              <p class="ds__group-label">53. Data table — sort, search & select</p>
              <p class="cl__block-desc">
                Fully wired, not a mock: click a column header to sort, type to filter across
                every row, check rows for bulk actions, and page through results.
              </p>

              <div class="cl__dt-toolbar">
                <div class="cl__dt-search">
                  <mat-icon>search</mat-icon>
                  <input
                    type="text"
                    placeholder="Search accounts, owners, status..."
                    aria-label="Search accounts"
                    (input)="applyDtFilter($event)"
                  />
                </div>
                @if (dtSelection.selected.length > 0) {
                  <div class="cl__dt-bulk">
                    <span>{{ dtSelection.selected.length }} selected</span>
                    <button mat-stroked-button type="button" (click)="bulkArchive()">
                      <mat-icon>archive</mat-icon> Archive
                    </button>
                  </div>
                }
              </div>

              <div class="cl__dt-table-wrap">
                <table mat-table matSort #dtSort="matSort" [dataSource]="dtDataSource" class="cl__dt-table">
                  <ng-container matColumnDef="select">
                    <th mat-header-cell *matHeaderCellDef>
                      <mat-checkbox
                        (change)="$event ? toggleAllDtRows() : null"
                        [checked]="dtSelection.hasValue() && isAllDtSelected()"
                        [indeterminate]="dtSelection.hasValue() && !isAllDtSelected()"
                        aria-label="Select all rows"
                      ></mat-checkbox>
                    </th>
                    <td mat-cell *matCellDef="let row">
                      <mat-checkbox
                        (click)="$event.stopPropagation()"
                        (change)="$event ? dtSelection.toggle(row) : null"
                        [checked]="dtSelection.isSelected(row)"
                        [attr.aria-label]="'Select ' + row.name"
                      ></mat-checkbox>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Account</th>
                    <td mat-cell *matCellDef="let row">{{ row.name }}</td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                    <td mat-cell *matCellDef="let row"><app-badge [tone]="statusTone(row.status)">{{ row.status }}</app-badge></td>
                  </ng-container>

                  <ng-container matColumnDef="owner">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Owner</th>
                    <td mat-cell *matCellDef="let row">{{ row.owner }}</td>
                  </ng-container>

                  <ng-container matColumnDef="mrr">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header class="cl__dt-num">MRR</th>
                    <td mat-cell *matCellDef="let row" class="mono cl__dt-num">{{ row.mrr | currency: 'USD' : 'symbol' : '1.0-0' }}</td>
                  </ng-container>

                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let row">
                      <button
                        mat-icon-button
                        type="button"
                        [matMenuTriggerFor]="dtRowMenu"
                        [matMenuTriggerData]="{ row: row }"
                        aria-label="Row actions"
                        (click)="$event.stopPropagation()"
                      >
                        <mat-icon>more_vert</mat-icon>
                      </button>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="dtColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: dtColumns"></tr>
                </table>

                @if (dtDataSource.filteredData.length === 0) {
                  <app-empty-state
                    icon="search_off"
                    title="No matching accounts"
                    description="Try a different search term."
                  ></app-empty-state>
                }
              </div>

              <mat-paginator #dtPaginator [pageSizeOptions]="[5, 10]" pageSize="5" aria-label="Select page of accounts"></mat-paginator>

              <mat-menu #dtRowMenu="matMenu">
                <ng-template matMenuContent let-row="row">
                  <button mat-menu-item type="button"><mat-icon>visibility</mat-icon> View</button>
                  <button mat-menu-item type="button"><mat-icon>edit</mat-icon> Edit</button>
                  <button mat-menu-item type="button" (click)="archiveRow(row)"><mat-icon>archive</mat-icon> Archive</button>
                </ng-template>
              </mat-menu>

              <app-usage-guide
                useWhen="A real dataset the user needs to scan, sort, search, and act on in bulk — account lists, deal pipelines, activity logs."
                insteadUse="A handful of static rows with nothing to sort or filter — the plain Table demo above is lighter weight for that."
                tip="Wire MatTableDataSource's sort/paginator in ngAfterViewInit, and call dataSource.paginator?.firstPage() whenever the filter changes so users don't land on an empty page."
                pitfall="Don't skip the empty state for 'no results after filtering' — an unexplained blank table reads as broken, not empty."
                [snippet]="snippetDataTable"
              ></app-usage-guide>
            </div>
          </div>
        </mat-tab>

        <!-- =========================== NAVIGATION ============================= -->
        <mat-tab label="Navigation (7)">
          <div class="cl__panel">
            <div class="component-block">
              <p class="ds__group-label">34. Tabs</p>
              <mat-tab-group class="cl__nested-tabs">
                <mat-tab label="Overview">
                  <p class="cl__card-copy cl__tab-pad">Account summary content.</p>
                </mat-tab>
                <mat-tab label="Activity">
                  <p class="cl__card-copy cl__tab-pad">Recent activity feed.</p>
                </mat-tab>
                <mat-tab label="Files">
                  <p class="cl__card-copy cl__tab-pad">Attached documents.</p>
                </mat-tab>
              </mat-tab-group>
            </div>

            <div class="component-block">
              <p class="ds__group-label">35. Stepper</p>
              <mat-stepper class="cl__stepper">
                <mat-step label="Account info">
                  <p class="cl__card-copy cl__tab-pad">Step 1 content.</p>
                  <button mat-button matStepperNext type="button">Next</button>
                </mat-step>
                <mat-step label="Contacts">
                  <p class="cl__card-copy cl__tab-pad">Step 2 content.</p>
                  <button mat-button matStepperPrevious type="button">Back</button>
                  <button mat-button matStepperNext type="button">Next</button>
                </mat-step>
                <mat-step label="Review">
                  <p class="cl__card-copy cl__tab-pad">Step 3 content.</p>
                  <button mat-button matStepperPrevious type="button">Back</button>
                </mat-step>
              </mat-stepper>
              <app-usage-guide
                useWhen="Tabs to switch between independent views of the same object (Overview/Activity/Files); Button toggle group to pick one value from a short set that filters the same view; Stepper to walk through an ordered, multi-step process."
                insteadUse="A strictly sequential flow where steps must happen in order — use a Stepper, not Tabs, so users can't skip required steps."
                tip="Only use a Stepper when steps genuinely depend on each other — otherwise Tabs give users more freedom to jump around."
                pitfall="Don't use Tabs for a checkout- or wizard-style flow — users can land on step 3 without completing step 1."
                [snippet]="snippetNavigation"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">36. Toolbar</p>
              <mat-toolbar class="cl__toolbar-demo">
                <span>Account: Blue Harbor Trust</span>
                <span class="cl__spacer"></span>
                <button mat-icon-button type="button" aria-label="Refresh"><mat-icon>refresh</mat-icon></button>
                <button mat-icon-button type="button" aria-label="Settings"><mat-icon>settings</mat-icon></button>
              </mat-toolbar>
            </div>

            <div class="component-block">
              <p class="ds__group-label">37. Breadcrumb</p>
              <nav aria-label="Breadcrumb" class="cl__breadcrumb">
                <a href="javascript:void(0)">Customers</a>
                <mat-icon>chevron_right</mat-icon>
                <a href="javascript:void(0)">Blue Harbor Trust</a>
                <mat-icon>chevron_right</mat-icon>
                <span aria-current="page">Activity</span>
              </nav>
            </div>

            <div class="component-block">
              <p class="ds__group-label">38. Paginator</p>
              <mat-paginator [length]="114" [pageSize]="10" [pageSizeOptions]="[5, 10, 25]" aria-label="Select page"></mat-paginator>
            </div>

            <div class="component-block">
              <p class="ds__group-label">39. Sortable table header</p>
              <table class="cl__mini-sort-table">
                <thead>
                  <tr>
                    <th [attr.aria-sort]="'ascending'">Account <mat-icon>arrow_upward</mat-icon></th>
                    <th [attr.aria-sort]="'none'">MRR <mat-icon>unfold_more</mat-icon></th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Blue Harbor Trust</td><td class="mono">$2,400</td></tr>
                  <tr><td>Northgate Health</td><td class="mono">$1,850</td></tr>
                </tbody>
              </table>
            </div>

            <div class="component-block">
              <p class="ds__group-label">40. Sidenav</p>
              <div class="cl__sidenav-demo">
                <mat-sidenav-container class="cl__sidenav-container">
                  <mat-sidenav mode="side" opened class="cl__sidenav-panel">
                    <mat-nav-list>
                      <a mat-list-item>Overview</a>
                      <a mat-list-item>Contacts</a>
                      <a mat-list-item>Billing</a>
                    </mat-nav-list>
                  </mat-sidenav>
                  <mat-sidenav-content class="cl__sidenav-content">
                    Panel content area
                  </mat-sidenav-content>
                </mat-sidenav-container>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- ======================== FEEDBACK & STATUS ========================= -->
        <mat-tab label="Feedback & status (9)">
          <div class="cl__panel">
            <div class="component-block">
              <p class="ds__group-label">41. Progress bar</p>
              <div class="cl__field-wide">
                <mat-progress-bar mode="determinate" [value]="62"></mat-progress-bar>
                <mat-progress-bar mode="indeterminate" class="cl__progress-gap"></mat-progress-bar>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">42. Progress spinner</p>
              <div class="demo-row">
                <mat-progress-spinner mode="determinate" [value]="70" diameter="40"></mat-progress-spinner>
                <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
              </div>
              <app-usage-guide
                useWhen="Progress bar for a linear, page/section-level operation — especially when you can show a determinate percentage (upload, sync); Progress spinner for a smaller, localized loading state (a button, a card, a dialog)."
                insteadUse="An operation with no meaningful percentage and no fixed container — a full-page indeterminate bar at the very top can work better than a centered spinner."
                tip="Pair long-running indeterminate progress with status text ('Syncing 3 of 12 records...') so it doesn't feel stuck."
                pitfall="Don't show a spinner with zero context for anything that might take more than a couple of seconds."
                [snippet]="snippetProgress"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">43. Tooltip</p>
              <button mat-stroked-button type="button" matTooltip="Syncs every 15 minutes">Sync status</button>
              <app-usage-guide
                useWhen="Supplemental, non-essential context on icon-only controls or truncated text."
                insteadUse="Information the user needs to complete a task — put it inline (a hint or label) instead, since tooltips aren't reliably discoverable on touch devices."
                tip="Keep tooltip text to a few words — if it needs a full sentence, it probably belongs in the UI itself."
                pitfall="Never put an error message only in a tooltip — use inline validation so it's visible without hovering."
                [snippet]="snippetTooltip"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">44. Banners</p>
              <div class="banner-list">
                <div class="banner banner--info"><mat-icon>info</mat-icon><span>Informational message with helpful context.</span></div>
                <div class="banner banner--success"><mat-icon>check_circle</mat-icon><span>Something completed successfully.</span></div>
                <div class="banner banner--warning"><mat-icon>warning</mat-icon><span>Heads up — this needs attention.</span></div>
                <div class="banner banner--danger"><mat-icon>lock</mat-icon><span>This action can't be undone.</span></div>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">45. Empty state</p>
              <app-empty-state icon="inbox" title="No activity yet" description="Logged calls, emails, and meetings will show up here."></app-empty-state>
            </div>

            <div class="component-block">
              <p class="ds__group-label">46. Skeleton loader</p>
              <div class="demo-row demo-row--wrap">
                <div class="cl__skeleton cl__skeleton--text"></div>
                <div class="cl__skeleton cl__skeleton--text cl__skeleton--short"></div>
                <div class="cl__skeleton cl__skeleton--avatar"></div>
              </div>
            </div>

            <div class="component-block">
              <p class="ds__group-label">47. Inline validation</p>
              <p class="cl__inline-msg cl__inline-msg--danger"><mat-icon>error_outline</mat-icon> This field is required.</p>
            </div>

            <div class="component-block">
              <p class="ds__group-label">48. Warning text</p>
              <p class="cl__inline-msg cl__inline-msg--warning"><mat-icon>warning</mat-icon> This account hasn't been contacted in 30+ days.</p>
            </div>

            <div class="component-block">
              <p class="ds__group-label">49. Snackbar</p>
              <button mat-stroked-button type="button" (click)="openSnack()">
                <mat-icon>notifications</mat-icon> Trigger snackbar
              </button>
              <app-usage-guide
                useWhen="Snackbar for a brief, transient confirmation of an action just taken (auto-dismisses); Banner for a persistent, page-level message that stays until resolved; Inline validation for a specific field's error, shown next to that field."
                insteadUse="Anything that requires the user's attention or action — a snackbar disappears on its own, so use a Banner or inline error instead."
                tip="Give destructive actions an 'Undo' action in the snackbar rather than a separate confirm dialog when it's easily reversible."
                pitfall="Don't rely on a snackbar to communicate an error the user must fix — it will vanish before they act on it."
                [snippet]="snippetFeedback"
              ></app-usage-guide>
            </div>
          </div>
        </mat-tab>

        <!-- ============================ OVERLAYS ============================== -->
        <mat-tab label="Overlays (3)">
          <div class="cl__panel">
            <div class="component-block">
              <p class="ds__group-label">50. Dialog</p>
              <button mat-stroked-button type="button" (click)="openExampleDialog()">
                <mat-icon>open_in_full</mat-icon> Open example dialog
              </button>
            </div>

            <div class="component-block">
              <p class="ds__group-label">51. Bottom sheet</p>
              <button mat-stroked-button type="button" (click)="openBottomSheet()">
                <mat-icon>vertical_align_bottom</mat-icon> Open bottom sheet
              </button>
              <app-usage-guide
                useWhen="Dialog for a focused decision that needs a clear confirm/cancel (create, delete, confirm); Bottom sheet for a lightweight list of quick actions or options."
                insteadUse="A simple list of 2–4 action links — a bottom sheet is lighter-weight than a full dialog for that case."
                tip="Reserve dialogs for anything with form input or a destructive confirmation — they demand full attention by design."
                pitfall="Don't use a bottom sheet for anything requiring validation or multi-field input — that belongs in a Dialog."
                [snippet]="snippetOverlay"
              ></app-usage-guide>
            </div>

            <div class="component-block">
              <p class="ds__group-label">52. Row kebab menu</p>
              <div class="cl__kebab-row">
                <span>Northgate Health Alliance</span>
                <button mat-icon-button type="button" [matMenuTriggerFor]="kebabMenu" aria-label="Row actions">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #kebabMenu="matMenu">
                  <button mat-menu-item type="button"><mat-icon>visibility</mat-icon> View</button>
                  <button mat-menu-item type="button"><mat-icon>edit</mat-icon> Edit</button>
                  <button mat-menu-item type="button"><mat-icon>archive</mat-icon> Archive</button>
                </mat-menu>
              </div>
              <app-usage-guide
                useWhen="Menu attached to a visible labeled button for page/section-level actions; the ⋮ row kebab menu for per-row actions in a dense table or list where a labeled button would take too much space."
                insteadUse="A single, primary action for the whole page — keep that as a visible button, not tucked inside a menu."
                tip="Order menu items by frequency of use, and put destructive actions (delete/archive) at the bottom, visually separated."
                pitfall="Don't hide the one thing most users came to do behind a kebab menu — if it's the primary action, make it a visible button."
                [snippet]="snippetMenu"
              ></app-usage-guide>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [
    `
      .cl {
        max-width: 1040px;
      }
      .cl__switcher {
        display: flex;
        gap: var(--space-5);
        margin-bottom: var(--space-5);
      }
      .cl__switcher a {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--text-secondary);
        text-decoration: none;
        padding-bottom: var(--space-2);
        border-bottom: 2px solid transparent;
      }
      .cl__switcher a:hover {
        color: var(--color-blue-600);
      }
      .cl__switcher-item--active {
        color: var(--color-blue-600) !important;
        border-bottom-color: var(--color-blue-600) !important;
      }
      .cl__header {
        margin-bottom: var(--space-6);
      }
      .cl__eyebrow {
        font-size: var(--text-xs);
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-blue-600);
        margin-bottom: var(--space-2);
      }
      h1 {
        font-size: var(--text-2xl);
        margin-bottom: var(--space-2);
      }
      .cl__desc {
        color: var(--text-secondary);
        line-height: 1.6;
        max-width: 720px;
      }
      .cl__hint {
        font-size: var(--text-xs);
        color: var(--text-tertiary);
      }

      .cl__panel {
        padding: var(--space-6) var(--space-1);
      }

      .ds__group-label {
        font-size: var(--text-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-secondary);
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: var(--space-2);
        margin: 0 0 var(--space-3);
      }
      .component-block {
        margin-bottom: var(--space-8);
      }
      .demo-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-3);
      }
      .demo-row--wrap {
        align-items: flex-start;
      }
      .cl__field-wide {
        width: 100%;
        max-width: 420px;
        display: block;
      }

      .split-btn {
        display: inline-flex;
      }
      .split-btn__main {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
      .split-btn__caret {
        min-width: 32px !important;
        padding: 0 !important;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border-left: 1px solid rgba(255, 255, 255, 0.25) !important;
      }

      .demo-card {
        max-width: 240px;
      }
      .demo-card__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-sm);
        background: var(--color-info-bg);
        color: var(--color-blue-600);
        margin-bottom: var(--space-3);
      }
      .demo-card__label {
        font-size: var(--text-sm);
        color: var(--text-secondary);
      }
      .demo-card__value {
        font-size: var(--text-2xl);
        font-weight: 700;
        color: var(--text-primary);
      }
      .demo-card__meta {
        font-size: var(--text-xs);
        color: var(--text-tertiary);
        margin-top: var(--space-1);
      }
      .cl__card-copy {
        font-size: var(--text-sm);
        color: var(--text-secondary);
        line-height: 1.6;
      }

      .cl__table {
        width: 100%;
        max-width: 560px;
        background: transparent;
      }

      .cl__block-desc {
        font-size: var(--text-sm);
        color: var(--text-secondary);
        margin: 0 0 var(--space-4);
        max-width: 560px;
      }
      .cl__dt-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: var(--space-3);
        margin-bottom: var(--space-3);
      }
      .cl__dt-search {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        max-width: 320px;
        width: 100%;
        padding: var(--space-2) var(--space-3);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-sm);
        background: var(--surface-raised);
      }
      .cl__dt-search mat-icon {
        color: var(--text-tertiary);
        font-size: 18px;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }
      .cl__dt-search input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font: inherit;
        font-size: var(--text-sm);
        color: var(--text-primary);
      }
      .cl__dt-search input::placeholder {
        color: var(--text-tertiary);
      }
      .cl__dt-bulk {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--color-blue-600);
      }
      .cl__dt-table-wrap {
        max-width: 760px;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .cl__dt-table {
        width: 100%;
        background: transparent;
      }
      .cl__dt-num {
        text-align: right;
      }
      .cl__dt-table-wrap mat-paginator,
      .cl__dt-table-wrap + mat-paginator {
        background: transparent;
      }

      .cl__list-demo,
      .cl__grid-demo {
        max-width: 420px;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        overflow: hidden;
      }

      .cl__avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: var(--radius-full);
        background: var(--color-blue-500);
        color: var(--color-navy-900);
        font-family: var(--font-mono);
        font-weight: 700;
        font-size: 13px;
        flex-shrink: 0;
      }
      .cl__avatar--sm {
        width: 28px;
        height: 28px;
        font-size: 11px;
      }
      .cl__avatar--purple {
        background: var(--color-purple-300);
        color: var(--color-navy-900);
      }
      .cl__avatar--icon {
        background: var(--color-info-bg);
        color: var(--color-blue-600);
      }

      .cl__stat-wrap {
        max-width: 260px;
        display: block;
      }

      .cl__timeline {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }
      .cl__timeline li {
        display: flex;
        gap: var(--space-3);
        align-items: flex-start;
        font-size: var(--text-sm);
        color: var(--text-primary);
      }
      .cl__timeline-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--border-default);
        margin-top: 4px;
        flex-shrink: 0;
      }
      .cl__timeline-dot--active {
        background: var(--color-blue-600);
      }

      .cl__nested-tabs {
        max-width: 480px;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .cl__tab-pad {
        padding: var(--space-4);
      }
      .cl__stepper {
        max-width: 560px;
      }
      .cl__toolbar-demo {
        max-width: 560px;
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .cl__spacer {
        flex: 1 1 auto;
      }
      .cl__breadcrumb {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: var(--text-sm);
        color: var(--text-secondary);
      }
      .cl__breadcrumb a {
        color: var(--color-blue-600);
        text-decoration: none;
      }
      .cl__breadcrumb mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        color: var(--text-tertiary);
      }
      .cl__breadcrumb span[aria-current] {
        color: var(--text-primary);
        font-weight: 600;
      }

      .cl__mini-sort-table {
        width: 100%;
        max-width: 420px;
        border-collapse: collapse;
        font-size: var(--text-sm);
      }
      .cl__mini-sort-table th {
        text-align: left;
        color: var(--text-secondary);
        font-size: var(--text-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        padding: var(--space-2) var(--space-3);
        border-bottom: 1px solid var(--border-subtle);
        display: table-cell;
      }
      .cl__mini-sort-table th mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        margin-left: 2px;
      }
      .cl__mini-sort-table td {
        padding: var(--space-2) var(--space-3);
        border-bottom: 1px solid var(--border-subtle);
        color: var(--text-primary);
      }

      .cl__sidenav-demo {
        max-width: 480px;
      }
      .cl__sidenav-container {
        height: 200px;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .cl__sidenav-panel {
        width: 160px;
        background: var(--color-navy-800);
        color: var(--text-on-navy);
      }
      .cl__sidenav-panel ::ng-deep .mat-mdc-list-item {
        color: rgba(238, 244, 250, 0.85);
      }
      .cl__sidenav-content {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-tertiary);
        font-size: var(--text-sm);
      }

      .cl__progress-gap {
        margin-top: var(--space-4);
      }

      .banner-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        max-width: 560px;
      }
      .banner {
        display: flex;
        gap: var(--space-3);
        align-items: flex-start;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-md);
        font-size: var(--text-sm);
        line-height: 1.6;
      }
      .banner mat-icon {
        flex-shrink: 0;
        margin-top: 1px;
      }
      .banner--info { background: var(--color-info-bg); color: var(--color-info); }
      .banner--success { background: var(--color-success-bg); color: var(--color-success); }
      .banner--warning { background: var(--color-warning-bg); color: var(--color-warning); }
      .banner--danger { background: var(--color-danger-bg); color: var(--color-danger); }

      .cl__skeleton {
        background: linear-gradient(90deg, var(--surface-sunken) 25%, var(--border-subtle) 50%, var(--surface-sunken) 75%);
        background-size: 200% 100%;
        animation: skeletonShimmer 1.4s ease-in-out infinite;
        border-radius: var(--radius-xs);
      }
      .cl__skeleton--text {
        width: 220px;
        height: 14px;
      }
      .cl__skeleton--short {
        width: 120px;
      }
      .cl__skeleton--avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      @keyframes skeletonShimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .cl__inline-msg {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-sm);
        margin: 0;
      }
      .cl__inline-msg mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .cl__inline-msg--danger { color: var(--color-danger); }
      .cl__inline-msg--warning { color: var(--color-warning); }

      .cl__kebab-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 360px;
        padding: var(--space-3) var(--space-4);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        font-size: var(--text-sm);
        color: var(--text-primary);
      }

      .cl__slider {
        width: 200px;
      }
    `,
  ],
})
export class ComponentsLibraryComponent implements AfterViewInit {
  private readonly dialog = inject(MatDialog);
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild('dtSort') private dtSort!: MatSort;
  @ViewChild('dtPaginator') private dtPaginator!: MatPaginator;

  readonly categories = CATEGORIES;

  readonly passwordHidden = signal(true);
  readonly favorited = signal(false);
  readonly demoChips = signal(['Design', 'Engineering', 'Sales']);

  readonly tableColumns = ['name', 'status', 'mrr'];
  readonly tableRows: DemoRow[] = [
    { name: 'Blue Harbor Museum Trust', status: 'active', mrr: '$2,400' },
    { name: 'Northgate Health Alliance', status: 'active', mrr: '$1,850' },
  ];

  // -------------------- Complex data table (#53) --------------------
  readonly dtColumns = ['select', 'name', 'status', 'owner', 'mrr', 'actions'];
  readonly dtSelection = new SelectionModel<ComplexRow>(true, []);
  readonly dtDataSource = new MatTableDataSource<ComplexRow>([
    { name: 'Blue Harbor Museum Trust', status: 'active', owner: 'Priya Shah', mrr: 2400 },
    { name: 'Northgate Health Alliance', status: 'active', owner: 'Daniel Cho', mrr: 1850 },
    { name: 'Riverside Youth Foundation', status: 'at-risk', owner: 'Maria Alvarez', mrr: 980 },
    { name: 'Cedar Grove Library Fund', status: 'onboarding', owner: 'Priya Shah', mrr: 640 },
    { name: 'Summit Arts Collective', status: 'active', owner: 'Daniel Cho', mrr: 3200 },
    { name: 'Harborview Animal Rescue', status: 'churned', owner: 'Maria Alvarez', mrr: 0 },
    { name: 'Pinecrest Community Center', status: 'active', owner: 'Priya Shah', mrr: 1420 },
    { name: 'Lakeside Senior Services', status: 'at-risk', owner: 'Daniel Cho', mrr: 760 },
    { name: 'Willow Creek Food Bank', status: 'onboarding', owner: 'Maria Alvarez', mrr: 520 },
    { name: 'Granite Peak Veterans Fund', status: 'active', owner: 'Priya Shah', mrr: 2100 },
  ]);

  ngAfterViewInit(): void {
    this.dtDataSource.sort = this.dtSort;
    this.dtDataSource.paginator = this.dtPaginator;
  }

  applyDtFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dtDataSource.filter = value.trim().toLowerCase();
    this.dtDataSource.paginator?.firstPage();
  }

  statusTone(status: string) {
    return statusToTone(status);
  }

  isAllDtSelected() {
    return this.dtSelection.selected.length === this.dtDataSource.data.length;
  }

  toggleAllDtRows() {
    if (this.isAllDtSelected()) {
      this.dtSelection.clear();
    } else {
      this.dtSelection.select(...this.dtDataSource.data);
    }
  }

  archiveRow(row: ComplexRow) {
    this.snackBar.open(`Archived ${row.name}`, 'Undo', { duration: 3000 });
  }

  bulkArchive() {
    const count = this.dtSelection.selected.length;
    this.dtSelection.clear();
    this.snackBar.open(`Archived ${count} account${count === 1 ? '' : 's'}`, 'Undo', { duration: 3000 });
  }

  readonly sampleKpi: KpiSummary = {
    label: 'Open deals',
    value: '24',
    delta: 12,
    trend: 'up',
    icon: 'trending_up',
  };

  // ------------------------------------------------------------------
  // Usage guide code snippets — kept as line-array joins so indentation
  // in the rendered <pre> block doesn't inherit this file's own nesting.
  // ------------------------------------------------------------------
  readonly snippetButtons = [
    `import { MatButtonModule } from '@angular/material/button';`,
    ``,
    `@Component({ standalone: true, imports: [MatButtonModule], template: \``,
    `  <button mat-flat-button color="primary" type="button">`,
    `    Save changes`,
    `  </button>`,
    `  <button mat-stroked-button type="button">Cancel</button>`,
    `\` })`,
  ].join('\n');

  readonly snippetChips = [
    `import { MatChipsModule } from '@angular/material/chips';`,
    ``,
    `@Component({ standalone: true, imports: [MatChipsModule], template: \``,
    `  <mat-chip-listbox aria-label="Filter by status">`,
    `    <mat-chip-option selected>Active</mat-chip-option>`,
    `    <mat-chip-option>At risk</mat-chip-option>`,
    `  </mat-chip-listbox>`,
    `\` })`,
  ].join('\n');

  readonly snippetBadges = [
    `import { MatBadgeModule } from '@angular/material/badge';`,
    `import { BadgeComponent } from '../../shared/badge/badge.component';`,
    ``,
    `@Component({ standalone: true, imports: [MatBadgeModule, BadgeComponent], template: \``,
    `  <app-badge tone="success">active</app-badge>`,
    ``,
    `  <button mat-icon-button matBadge="4" matBadgeColor="warn">`,
    `    <mat-icon>notifications</mat-icon>`,
    `  </button>`,
    `\` })`,
  ].join('\n');

  readonly snippetSelectionControls = [
    `import { MatCheckboxModule } from '@angular/material/checkbox';`,
    `import { MatRadioModule } from '@angular/material/radio';`,
    `import { MatSlideToggleModule } from '@angular/material/slide-toggle';`,
    ``,
    `@Component({ standalone: true, imports: [MatCheckboxModule, MatRadioModule, MatSlideToggleModule], template: \``,
    `  <mat-checkbox [checked]="true">Email alerts</mat-checkbox>`,
    ``,
    `  <mat-radio-group aria-label="Contact preference">`,
    `    <mat-radio-button name="pref" [checked]="true">Email</mat-radio-button>`,
    `    <mat-radio-button name="pref">Phone</mat-radio-button>`,
    `  </mat-radio-group>`,
    ``,
    `  <mat-slide-toggle [checked]="true">Auto-sync</mat-slide-toggle>`,
    `\` })`,
  ].join('\n');

  readonly snippetAutocomplete = [
    `import { MatAutocompleteModule } from '@angular/material/autocomplete';`,
    `import { MatFormFieldModule } from '@angular/material/form-field';`,
    `import { MatInputModule } from '@angular/material/input';`,
    ``,
    `@Component({ standalone: true, imports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule], template: \``,
    `  <mat-form-field appearance="outline">`,
    `    <mat-label>Owner</mat-label>`,
    `    <input matInput [matAutocomplete]="auto" />`,
    `    <mat-autocomplete #auto="matAutocomplete">`,
    `      <mat-option value="Priya Shah">Priya Shah</mat-option>`,
    `    </mat-autocomplete>`,
    `  </mat-form-field>`,
    `\` })`,
  ].join('\n');

  readonly snippetCardList = [
    `import { MatListModule } from '@angular/material/list';`,
    ``,
    `@Component({ standalone: true, imports: [MatListModule], template: \``,
    `  <mat-nav-list>`,
    `    <a mat-list-item>`,
    `      <span matListItemTitle>Priya Shah</span>`,
    `    </a>`,
    `  </mat-nav-list>`,
    `\` })`,
  ].join('\n');

  readonly snippetTable = [
    `import { MatTableModule } from '@angular/material/table';`,
    ``,
    `@Component({ standalone: true, imports: [MatTableModule], template: \``,
    `  <table mat-table [dataSource]="rows">`,
    `    <ng-container matColumnDef="name">`,
    `      <th mat-header-cell *matHeaderCellDef>Account</th>`,
    `      <td mat-cell *matCellDef="let row">{{ row.name }}</td>`,
    `    </ng-container>`,
    `    <tr mat-header-row *matHeaderRowDef="columns"></tr>`,
    `    <tr mat-row *matRowDef="let row; columns: columns"></tr>`,
    `  </table>`,
    `\` })`,
  ].join('\n');

  readonly snippetNavigation = [
    `import { MatTabsModule } from '@angular/material/tabs';`,
    ``,
    `@Component({ standalone: true, imports: [MatTabsModule], template: \``,
    `  <mat-tab-group>`,
    `    <mat-tab label="Overview">...</mat-tab>`,
    `    <mat-tab label="Activity">...</mat-tab>`,
    `  </mat-tab-group>`,
    `\` })`,
  ].join('\n');

  readonly snippetProgress = [
    `import { MatProgressBarModule } from '@angular/material/progress-bar';`,
    `import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';`,
    ``,
    `@Component({ standalone: true, imports: [MatProgressBarModule, MatProgressSpinnerModule], template: \``,
    `  <mat-progress-bar mode="determinate" [value]="62"></mat-progress-bar>`,
    ``,
    `  <mat-progress-spinner mode="indeterminate" diameter="40">`,
    `  </mat-progress-spinner>`,
    `\` })`,
  ].join('\n');

  readonly snippetTooltip = [
    `import { MatTooltipModule } from '@angular/material/tooltip';`,
    ``,
    `@Component({ standalone: true, imports: [MatTooltipModule], template: \``,
    `  <button mat-icon-button matTooltip="Syncs every 15 minutes">`,
    `    <mat-icon>sync</mat-icon>`,
    `  </button>`,
    `\` })`,
  ].join('\n');

  readonly snippetFeedback = [
    `import { MatSnackBar } from '@angular/material/snack-bar';`,
    ``,
    `private snackBar = inject(MatSnackBar);`,
    ``,
    `this.snackBar.open('Customer record updated', 'Undo', {`,
    `  duration: 3000,`,
    `});`,
  ].join('\n');

  readonly snippetOverlay = [
    `import { MatDialog } from '@angular/material/dialog';`,
    `import { MatBottomSheet } from '@angular/material/bottom-sheet';`,
    ``,
    `private dialog = inject(MatDialog);`,
    `private bottomSheet = inject(MatBottomSheet);`,
    ``,
    `this.dialog.open(ConfirmDialogComponent, { data: { ... } });`,
    `this.bottomSheet.open(MyBottomSheetContentComponent);`,
  ].join('\n');

  readonly snippetMenu = [
    `import { MatMenuModule } from '@angular/material/menu';`,
    ``,
    `@Component({ standalone: true, imports: [MatMenuModule], template: \``,
    `  <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Row actions">`,
    `    <mat-icon>more_vert</mat-icon>`,
    `  </button>`,
    `  <mat-menu #menu="matMenu">`,
    `    <button mat-menu-item>Edit</button>`,
    `    <button mat-menu-item>Archive</button>`,
    `  </mat-menu>`,
    `\` })`,
  ].join('\n');

  readonly snippetDataTable = [
    `import { MatTableModule } from '@angular/material/table';`,
    `import { MatSortModule, MatSort } from '@angular/material/sort';`,
    `import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';`,
    `import { SelectionModel } from '@angular/cdk/collections';`,
    ``,
    `@ViewChild(MatSort) sort!: MatSort;`,
    `@ViewChild(MatPaginator) paginator!: MatPaginator;`,
    `selection = new SelectionModel<Row>(true, []);`,
    `dataSource = new MatTableDataSource<Row>(rows);`,
    ``,
    `ngAfterViewInit() {`,
    `  this.dataSource.sort = this.sort;`,
    `  this.dataSource.paginator = this.paginator;`,
    `}`,
    ``,
    `applyFilter(value: string) {`,
    `  this.dataSource.filter = value.trim().toLowerCase();`,
    `  this.dataSource.paginator?.firstPage();`,
    `}`,
    ``,
    `// template: <table mat-table matSort [dataSource]="dataSource">`,
    `//   <th mat-header-cell *matHeaderCellDef mat-sort-header>Account</th>`,
  ].join('\n');

  removeChip(chip: string) {
    this.demoChips.update((chips) => chips.filter((c) => c !== chip));
  }

  noop() {
    // Demo-only click target — no behavior needed.
  }

  openExampleDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        icon: 'palette',
        title: 'This is the shared dialog component',
        description:
          'Same ConfirmDialogComponent used for New customer, Log activity, etc. — 28px radius, shadow-4, and the design system tokens throughout.',
        highlights: ['Icon chip + headline', 'Optional highlight callout', 'Optional warning banner'],
        confirmLabel: 'Got it',
      },
    });
  }

  openBottomSheet() {
    this.bottomSheet.open(DsBottomSheetDemoComponent);
  }

  openSnack() {
    this.snackBar.open('Customer record updated', 'Undo', { duration: 3000 });
  }
}
