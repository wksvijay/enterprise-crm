import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface Swatch {
  name: string;
  token: string;
  hex: string;
}

interface SwatchGroup {
  label: string;
  swatches: Swatch[];
}

interface TypeSpec {
  role: string;
  spec: string;
  size: string;
  weight: string;
  sample: string;
}

interface ScaleItem {
  token: string;
  value: string;
  note: string;
}

interface IconItem {
  name: string;
  color?: string;
}

const NAV = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing & radius' },
  { id: 'elevation', label: 'Elevation' },
  { id: 'icons', label: 'Icons' },
];

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <div class="ds">
      <nav class="ds__switcher" aria-label="Design system pages">
        <a routerLink="/design-system" routerLinkActive="ds__switcher-item--active" [routerLinkActiveOptions]="{ exact: true }">Foundations</a>
        <a routerLink="/design-system/components" routerLinkActive="ds__switcher-item--active">Components</a>
      </nav>

      <header class="ds__header">
        <p class="ds__eyebrow">Foundations</p>
        <h1>Design system</h1>
        <p class="ds__desc">
          The GiveSmart "Familiar UI" tokens this app is built on — colors, type, spacing,
          elevation, and icons. Every swatch below renders straight from the same CSS custom
          properties the rest of the app uses
          (<code class="mono">src/app/theme/_tokens.scss</code>), so this page updates
          automatically if those tokens ever change. Looking for buttons, forms, tables, and
          other live controls? Head to the
          <a routerLink="/design-system/components">Components</a> page — 52 of them, with
          variants.
        </p>
      </header>

      <nav class="ds__tabs" aria-label="Design system sections">
        @for (item of nav; track item.id) {
          <a [href]="'#' + item.id">{{ item.label }}</a>
        }
      </nav>

      <section id="colors" class="ds__section">
        <h2>Color tokens</h2>
        @for (group of colorGroups; track group.label) {
          <p class="ds__group-label">{{ group.label }}</p>
          <div class="swatch-grid">
            @for (s of group.swatches; track s.token) {
              <div class="swatch">
                <div class="swatch__color" [style.background]="'var(' + s.token + ')'"></div>
                <div class="swatch__info">
                  <div class="swatch__name">{{ s.name }}</div>
                  <div class="swatch__hex mono">{{ s.hex }}</div>
                  <div class="swatch__token mono">{{ s.token }}</div>
                </div>
              </div>
            }
          </div>
        }
      </section>

      <section id="typography" class="ds__section">
        <h2>Typography</h2>
        <p class="ds__section-desc">Inter (400 / 500 / 600 / 700) for UI text, Inter Mono for data/IDs.</p>
        @for (t of typeSpecs; track t.role) {
          <div class="type-row">
            <div class="type-row__label">
              <div class="type-row__role">{{ t.role }}</div>
              <div class="type-row__spec mono">{{ t.spec }}</div>
            </div>
            <div class="type-row__sample" [style.font-size]="t.size" [style.font-weight]="t.weight">
              {{ t.sample }}
            </div>
          </div>
        }
      </section>

      <section id="spacing" class="ds__section">
        <h2>Spacing scale</h2>
        <p class="ds__section-desc">4px base grid — every gap/padding/margin in the app is a multiple of 4px.</p>
        <div class="space-list">
          @for (s of spacing; track s.token) {
            <div class="space-row">
              <div class="space-row__bar" [style.width]="'var(' + s.token + ')'"></div>
              <div class="space-row__value mono">{{ s.value }}</div>
              <div class="space-row__note">{{ s.note }}</div>
            </div>
          }
        </div>

        <h2 class="ds__subheading">Border radius</h2>
        <div class="radius-grid">
          @for (r of radius; track r.token) {
            <div class="radius-item">
              <div class="radius-item__box" [style.border-radius]="'var(' + r.token + ')'"></div>
              <div class="radius-item__value mono">{{ r.value }}</div>
              <div class="radius-item__note">{{ r.note }}</div>
            </div>
          }
        </div>
      </section>

      <section id="elevation" class="ds__section">
        <h2>Elevation</h2>
        <p class="ds__section-desc">Four shadow levels, layered additively for depth.</p>
        <div class="shadow-grid">
          @for (s of shadows; track s.token) {
            <div class="shadow-item" [style.box-shadow]="'var(' + s.token + ')'">
              <div class="shadow-item__name">{{ s.value }}</div>
              <div class="shadow-item__note">{{ s.note }}</div>
            </div>
          }
        </div>
      </section>

      <section id="icons" class="ds__section">
        <h2>Icons — Material Icons Outlined</h2>
        <p class="ds__section-desc">The icon set actually used across the app, plus a few common extras.</p>
        <div class="icon-grid">
          @for (icon of icons; track icon.name) {
            <div class="icon-item">
              <mat-icon [style.color]="icon.color">{{ icon.name }}</mat-icon>
              <span class="mono">{{ icon.name }}</span>
            </div>
          }
        </div>
      </section>

    </div>
  `,
  styles: [
    `
      .ds {
        max-width: 960px;
      }
      .ds__header {
        margin-bottom: var(--space-6);
      }
      .ds__eyebrow {
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
      .ds__desc {
        color: var(--text-secondary);
        line-height: 1.6;
        max-width: 720px;
      }
      .ds__desc code {
        color: var(--text-primary);
        background: var(--surface-sunken);
        padding: 1px 6px;
        border-radius: var(--radius-xs);
      }
      .ds__desc a {
        color: var(--color-blue-600);
        font-weight: 600;
      }

      .ds__switcher {
        display: flex;
        gap: var(--space-5);
        margin-bottom: var(--space-6);
      }
      .ds__switcher a {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--text-secondary);
        text-decoration: none;
        padding-bottom: var(--space-2);
        border-bottom: 2px solid transparent;
      }
      .ds__switcher a:hover {
        color: var(--color-blue-600);
      }
      .ds__switcher-item--active {
        color: var(--color-blue-600) !important;
        border-bottom-color: var(--color-blue-600) !important;
      }

      .ds__tabs {
        display: flex;
        gap: var(--space-5);
        flex-wrap: wrap;
        border-bottom: 1px solid var(--border-subtle);
        margin-bottom: var(--space-8);
        padding-bottom: var(--space-3);
      }
      .ds__tabs a {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--text-secondary);
        text-decoration: none;
      }
      .ds__tabs a:hover {
        color: var(--color-blue-600);
      }

      .ds__section {
        margin-bottom: var(--space-12);
        scroll-margin-top: var(--space-6);
      }
      .ds__section h2 {
        font-size: var(--text-lg);
        margin-bottom: var(--space-2);
      }
      .ds__subheading {
        font-size: var(--text-lg);
        margin-top: var(--space-8);
        margin-bottom: var(--space-2);
      }
      .ds__section-desc {
        color: var(--text-secondary);
        font-size: var(--text-sm);
        margin-bottom: var(--space-5);
      }
      .ds__group-label {
        font-size: var(--text-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-secondary);
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: var(--space-2);
        margin: var(--space-6) 0 var(--space-3);
      }
      .ds__group-label:first-of-type {
        margin-top: 0;
      }

      .swatch-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: var(--space-3);
        margin-bottom: var(--space-3);
      }
      .swatch {
        border-radius: var(--radius-sm);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
      }
      .swatch__color {
        height: 48px;
        width: 100%;
      }
      .swatch__info {
        padding: var(--space-2) var(--space-3);
        background: var(--surface-raised);
      }
      .swatch__name {
        font-size: var(--text-xs);
        font-weight: 600;
        color: var(--text-primary);
      }
      .swatch__hex, .swatch__token {
        font-size: 10px;
        color: var(--text-tertiary);
        margin-top: 1px;
      }
      .swatch__token {
        color: var(--color-blue-600);
      }

      .type-row {
        display: flex;
        align-items: baseline;
        gap: var(--space-6);
        padding: var(--space-4) 0;
        border-bottom: 1px solid var(--border-subtle);
      }
      .type-row__label {
        width: 150px;
        flex-shrink: 0;
      }
      .type-row__role {
        font-size: var(--text-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-blue-600);
      }
      .type-row__spec {
        font-size: 11px;
        color: var(--text-tertiary);
        margin-top: 2px;
      }
      .type-row__sample {
        color: var(--text-primary);
        min-width: 0;
      }

      .space-list, .radius-grid {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }
      .space-row {
        display: grid;
        grid-template-columns: 280px auto 1fr;
        align-items: center;
        gap: var(--space-4);
      }
      .space-row__bar {
        height: 8px;
        background: var(--color-blue-400);
        border-radius: 2px;
      }
      .space-row__value {
        font-size: var(--text-xs);
        color: var(--color-blue-600);
        width: 40px;
      }
      .space-row__note {
        font-size: var(--text-sm);
        color: var(--text-secondary);
      }

      .radius-grid {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: var(--space-5);
      }
      .radius-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
      }
      .radius-item__box {
        width: 56px;
        height: 56px;
        background: var(--color-blue-200);
        border: 2px solid var(--color-blue-400);
      }
      .radius-item__value {
        font-size: var(--text-xs);
        font-weight: 700;
        color: var(--color-blue-600);
      }
      .radius-item__note {
        font-size: 11px;
        color: var(--text-tertiary);
        text-align: center;
      }

      .shadow-grid {
        display: flex;
        gap: var(--space-5);
        flex-wrap: wrap;
      }
      .shadow-item {
        width: 160px;
        height: 100px;
        background: var(--surface-raised);
        border-radius: var(--radius-md);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-1);
      }
      .shadow-item__name {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--text-primary);
      }
      .shadow-item__note {
        font-size: 11px;
        color: var(--text-tertiary);
      }

      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
        gap: var(--space-3);
      }
      .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-3);
        background: var(--surface-raised);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-sm);
      }
      .icon-item mat-icon {
        color: var(--color-blue-600);
      }
      .icon-item span {
        font-size: 10px;
        color: var(--text-tertiary);
        text-align: center;
        word-break: break-all;
      }

    `,
  ],
})
export class DesignSystemComponent {
  readonly nav = NAV;

  readonly colorGroups: SwatchGroup[] = [
    {
      label: 'Brand navy',
      swatches: [
        { name: 'Navy 900', token: '--color-navy-900', hex: '#0d1b2a' },
        { name: 'Navy 800', token: '--color-navy-800', hex: '#182a43' },
        { name: 'Navy 700 (brand)', token: '--color-navy-700', hex: '#172a43' },
        { name: 'Navy 600', token: '--color-navy-600', hex: '#1e3a5f' },
        { name: 'Navy 500', token: '--color-navy-500', hex: '#2d4e6e' },
        { name: 'Navy 400', token: '--color-navy-400', hex: '#3d6080' },
      ],
    },
    {
      label: 'Blue accent',
      swatches: [
        { name: 'Blue 600', token: '--color-blue-600', hex: '#2480a6' },
        { name: 'Blue 500', token: '--color-blue-500', hex: '#55a8d2' },
        { name: 'Blue 400', token: '--color-blue-400', hex: '#8dc5e1' },
        { name: 'Blue 300', token: '--color-blue-300', hex: '#a9c4e2' },
        { name: 'Blue 200', token: '--color-blue-200', hex: '#c6e2f0' },
        { name: 'Blue 100', token: '--color-blue-100', hex: '#e6f1ff' },
      ],
    },
    {
      label: 'GiveSmart purple',
      swatches: [
        { name: 'Purple 700', token: '--color-purple-700', hex: '#4b35c9' },
        { name: 'Purple 600', token: '--color-purple-600', hex: '#5a42d6' },
        { name: 'Purple 500', token: '--color-purple-500', hex: '#6b4eff' },
        { name: 'Purple 400', token: '--color-purple-400', hex: '#8b74ff' },
        { name: 'Purple 300', token: '--color-purple-300', hex: '#b3a0ff' },
        { name: 'Purple 100', token: '--color-purple-100', hex: '#ede8ff' },
      ],
    },
    {
      label: 'Neutrals',
      swatches: [
        { name: 'Gray 800', token: '--color-gray-800', hex: '#313030' },
        { name: 'Gray 700', token: '--color-gray-700', hex: '#515f72' },
        { name: 'Gray 600', token: '--color-gray-600', hex: '#747474' },
        { name: 'Gray 500', token: '--color-gray-500', hex: '#979797' },
        { name: 'Gray 200', token: '--color-gray-200', hex: '#dcdcdc' },
        { name: 'Gray 50', token: '--color-gray-50', hex: '#f3f3f3' },
      ],
    },
    {
      label: 'Semantic (text tone shown)',
      swatches: [
        { name: 'Success', token: '--color-success', hex: '#1a7a4a' },
        { name: 'Warning', token: '--color-warning', hex: '#7a5700' },
        { name: 'Danger', token: '--color-danger', hex: '#b3261e' },
        { name: 'Info', token: '--color-info', hex: '#1e40af' },
      ],
    },
    {
      label: 'Surfaces & text',
      swatches: [
        { name: 'Surface app', token: '--surface-app', hex: '#e8e5e4' },
        { name: 'Surface raised', token: '--surface-raised', hex: '#ffffff' },
        { name: 'Surface sunken', token: '--surface-sunken', hex: '#f3feff' },
        { name: 'Text primary', token: '--text-primary', hex: '#313030' },
        { name: 'Text secondary', token: '--text-secondary', hex: '#5e5e61' },
        { name: 'Border default', token: '--border-default', hex: '#8b929e' },
      ],
    },
  ];

  readonly typeSpecs: TypeSpec[] = [
    { role: 'Headline LG', spec: '32px · 700', size: 'var(--text-2xl)', weight: '700', sample: 'Enterprise CRM' },
    { role: 'Headline SM', spec: '24px · 700', size: 'var(--text-xl)', weight: '700', sample: 'Customer accounts' },
    { role: 'Title LG', spec: '20px · 600', size: 'var(--text-lg)', weight: '600', sample: 'Blue Harbor Museum Trust' },
    { role: 'Title MD', spec: '16px · 600', size: 'var(--text-md)', weight: '600', sample: 'Sales funnel' },
    { role: 'Body', spec: '14px · 400', size: 'var(--text-sm)', weight: '400', sample: 'Here’s where the book of business stands today.' },
    { role: 'Label / caption', spec: '12px · 600', size: 'var(--text-xs)', weight: '600', sample: 'MRR · OWNER · LAST ACTIVITY' },
    { role: 'Mono', spec: 'Inter Mono · 13px', size: 'var(--text-sm)', weight: '400', sample: '--color-blue-600 · CRM-00821' },
  ];

  readonly spacing: ScaleItem[] = [
    { token: '--space-1', value: '4px', note: 'Tight inline gaps' },
    { token: '--space-2', value: '8px', note: 'Inner padding, small' },
    { token: '--space-3', value: '12px', note: 'Gap between elements' },
    { token: '--space-4', value: '16px', note: 'Card padding, small' },
    { token: '--space-5', value: '20px', note: 'Card padding, medium' },
    { token: '--space-6', value: '24px', note: 'Section gaps' },
    { token: '--space-8', value: '32px', note: 'Section padding' },
    { token: '--space-10', value: '40px', note: 'Large section padding' },
    { token: '--space-12', value: '48px', note: 'Page-level gaps' },
  ];

  readonly radius: ScaleItem[] = [
    { token: '--radius-xs', value: '4px', note: 'Small fields' },
    { token: '--radius-sm', value: '8px', note: 'Inputs, icon chips' },
    { token: '--radius-md', value: '12px', note: 'Cards' },
    { token: '--radius-lg', value: '16px', note: 'Large cards' },
    { token: '--radius-xl', value: '20px', note: 'Pill buttons' },
    { token: '--radius-2xl', value: '28px', note: 'Dialogs' },
    { token: '--radius-full', value: '999px', note: 'Chips, badges' },
  ];

  readonly shadows: ScaleItem[] = [
    { token: '--shadow-sm', value: 'Level 1', note: 'Cards, list items' },
    { token: '--shadow-md', value: 'Level 2', note: 'Dropdowns, tooltips' },
    { token: '--shadow-lg', value: 'Level 3', note: 'Modals, header' },
    { token: '--shadow-xl', value: 'Level 4', note: 'Dialogs, drawers' },
  ];

  readonly icons: IconItem[] = [
    { name: 'dashboard' },
    { name: 'domain' },
    { name: 'person_search' },
    { name: 'trending_up' },
    { name: 'history' },
    { name: 'checklist' },
    { name: 'calendar_month' },
    { name: 'bar_chart' },
    { name: 'settings' },
    { name: 'search' },
    { name: 'add' },
    { name: 'edit' },
    { name: 'delete_outline' },
    { name: 'expand_more' },
    { name: 'arrow_back' },
    { name: 'arrow_upward' },
    { name: 'arrow_downward' },
    { name: 'check' },
    { name: 'check_circle', color: 'var(--color-success)' },
    { name: 'warning', color: 'var(--color-warning)' },
    { name: 'error_outline', color: 'var(--color-danger)' },
    { name: 'info', color: 'var(--color-info)' },
    { name: 'lock' },
    { name: 'notifications' },
    { name: 'person_add' },
    { name: 'handshake' },
    { name: 'palette' },
  ];
}
