import { AfterViewInit, Component, ViewChild, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

const HANDSET_QUERY = '(max-width: 900px)';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, SidebarComponent, TopbarComponent],
  template: `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <mat-sidenav-container class="shell" [hasBackdrop]="isHandset()">
      <mat-sidenav
        [mode]="isHandset() ? 'over' : 'side'"
        [opened]="isHandset() ? mobileNavOpen() : true"
        [disableClose]="!isHandset()"
        (closed)="mobileNavOpen.set(false)"
        (transitionend)="syncContentMargins()"
        class="shell__sidenav"
        [class.shell__sidenav--collapsed]="!isHandset() && sidebarCollapsed()"
      >
        <app-sidebar
          [collapsed]="!isHandset() && sidebarCollapsed()"
          [showCollapseToggle]="!isHandset()"
          (toggleCollapsed)="onToggleCollapsed()"
          (navigate)="isHandset() && mobileNavOpen.set(false)"
        />
      </mat-sidenav>
      <mat-sidenav-content class="shell__main">
        <app-topbar
          [breadcrumb]="breadcrumb()"
          [isDark]="isDark()"
          [isHandset]="isHandset()"
          (toggleTheme)="toggleTheme()"
          (menuClick)="mobileNavOpen.set(!mobileNavOpen())"
        />
        <main class="shell__content route-fade" id="main-content" tabindex="-1">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .skip-link {
        position: absolute;
        top: -48px;
        left: var(--space-3);
        z-index: 1000;
        padding: var(--space-2) var(--space-4);
        background: var(--color-navy-700);
        color: var(--text-on-navy);
        border-radius: var(--radius-sm);
        font-size: var(--text-sm);
        font-weight: 600;
        text-decoration: none;
        transition: top var(--duration-fast) var(--ease-standard);
      }
      .skip-link:focus {
        top: var(--space-3);
      }
      .shell {
        height: 100vh;
        width: 100%;
        background: var(--surface-app);
      }
      .shell__sidenav {
        width: var(--sidebar-width);
        background: var(--color-navy-800);
        border-right: none;
        transition: width var(--duration-base) var(--ease-standard);
        overflow: hidden;
      }
      .shell__sidenav--collapsed {
        width: var(--sidebar-width-collapsed);
      }
      .shell__content {
        padding: var(--space-6);
        background: var(--surface-app);
        min-height: calc(100vh - var(--topbar-height));
      }

      @media (max-width: 900px) {
        .shell__content {
          padding: var(--space-4);
        }
      }
    `,
  ],
})
export class ShellComponent implements AfterViewInit {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly breakpointObserver = inject(BreakpointObserver);

  // Angular Material only recalculates mat-sidenav-content's margin on
  // open/close, mode change, direction change, or viewport resize — NOT when
  // an already-open 'side' mode drawer's width changes via plain CSS (our
  // collapse/expand toggle). Left unfixed, the content margin freezes at
  // whatever width was measured on first render, so toggling collapse either
  // overlaps the content or leaves a stale gap. `syncContentMargins()` forces
  // Material to re-measure the drawer's actual rendered width.
  @ViewChild(MatSidenavContainer) private sidenavContainer?: MatSidenavContainer;

  readonly sidebarCollapsed = signal(false);
  readonly isDark = signal(false);
  readonly mobileNavOpen = signal(false);

  readonly isHandset = toSignal(
    this.breakpointObserver.observe(HANDSET_QUERY).pipe(map((result) => result.matches)),
    { initialValue: this.breakpointObserver.isMatched(HANDSET_QUERY) }
  );

  constructor() {
    // Belt-and-suspenders: re-sync whenever the handset/desktop mode flips,
    // in addition to Material's own built-in mode-change handling.
    effect(() => {
      this.isHandset();
      this.syncContentMargins();
    });
  }

  ngAfterViewInit(): void {
    // Guards against the drawer's width not being fully settled the instant
    // Material first measures it (e.g. fonts/CSS custom properties resolving
    // a tick late), which would otherwise freeze an incorrect margin forever.
    setTimeout(() => this.syncContentMargins());
  }

  readonly breadcrumb = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.deepestBreadcrumb(this.route)),
      startWith(this.deepestBreadcrumb(this.route))
    ),
    { initialValue: 'Dashboard' }
  );

  toggleTheme() {
    this.isDark.set(!this.isDark());
    this.document.documentElement.setAttribute(
      'data-theme',
      this.isDark() ? 'dark' : 'light'
    );
  }

  onToggleCollapsed() {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
    // Correct immediately (avoids a visible stale-margin flash) and again once
    // the width transition finishes, in case layout settles slightly later.
    this.syncContentMargins();
    setTimeout(() => this.syncContentMargins(), 250);
  }

  syncContentMargins() {
    this.sidenavContainer?.updateContentMargins();
  }

  private deepestBreadcrumb(route: ActivatedRoute): string {
    let current = route;
    let label = 'Dashboard';
    while (current.firstChild) {
      current = current.firstChild;
      const data = current.snapshot.data;
      if (data['breadcrumb']) label = data['breadcrumb'];
    }
    return label;
  }
}
