import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    provideNativeDateAdapter(), // required by mat-datepicker (used in the design system component library)
    // mat-icon renders icon names as font ligatures. The GiveSmart design
    // system specifies "Material Icons Outlined" (index.html loads that
    // font); 'material-icons' is mat-icon's default font-set class name, so
    // this is mostly self-documenting, but kept explicit since styles.scss
    // defines the matching .material-icons { font-family: ... } rule.
    { provide: MAT_ICON_DEFAULT_OPTIONS, useValue: { fontSet: 'material-icons' } },
  ],
};
