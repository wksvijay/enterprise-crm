# Enterprise CRM - Setup Guide

## Overview
This is an Angular 18-based Enterprise Customer Relationship Management (CRM) application with Angular Material design components.

## Prerequisites
- Node.js (v18+ recommended)
- npm (v10+)

## Installation Steps

### 1. Clone the Repository
```bash
gh repo clone wksvijay/enterprise-crm
cd enterprise-crm
```

### 2. Install Dependencies
```bash
npm install
```

This installs 854 packages required by the project, including:
- Angular 18 framework and related packages
- Angular Material 18
- RxJS and other utilities

**Note:** There may be security warnings about deprecated packages. You can run `npm audit fix` to address non-breaking issues.

### 3. Configure Angular Workspace (if not already present)
The project requires Angular configuration files. If missing, the following files need to be created:

#### `angular.json`
- Defines the Angular workspace and build configuration
- Specifies source and output paths
- Contains dev-server and build configurations

#### `tsconfig.json`
- TypeScript compiler configuration for the entire workspace
- Sets compilation options (strict mode, ES2022 target, etc.)

#### `tsconfig.app.json`
- Application-specific TypeScript configuration
- Extends the base `tsconfig.json`
- Specifies entry point (`src/main.ts`)

### 4. Start Development Server
```bash
npm start
```

This runs the Angular development server with hot-reload enabled.

**Output:**
```
✔ Angular Live Development Server is listening on localhost:4200
✔ Compiled successfully.
```

Initial bundle includes:
- `vendor.js` - 4.11 MB (Angular, Material, dependencies)
- `styles.css` - 244 KB
- `polyfills.js` - 239 KB
- `main.js` - 64 KB
- **Total: 4.67 MB**

### 5. Access the Application
Open your browser and navigate to: **http://localhost:4200**

## Project Structure

```
enterprise-crm/
├── src/
│   ├── app/                    # Angular application root
│   ├── assets/                 # Static assets
│   ├── index.html              # HTML entry point
│   ├── main.ts                 # Application bootstrap
│   └── styles.scss             # Global styles
├── dist/                        # Build output
├── node_modules/               # Dependencies
├── angular.json                # Angular CLI configuration
├── tsconfig.json               # TypeScript base config
├── tsconfig.app.json           # TypeScript app config
└── package.json                # NPM configuration
```

## Available Scripts

- **`npm start`** - Start development server (ng serve)
- **`npm run build`** - Build for production
- **`npm test`** - Run unit tests
- **`npm run lint`** - Run linter

## Features

The application includes:
- **Dashboard** - Main overview and analytics
- **Customers** - Customer management and details
- **Design System** - Component library and UI showcase
- **Material Design** - Angular Material components and theming

## Development

The development server supports:
- Hot Module Reloading (HMR)
- Source maps for debugging
- Lazy-loaded route bundles
- SCSS compilation

### Known Issues

- **Style Duplication Warning**: Multiple Material theming styles are generated. This is not breaking but can be optimized by following the [Material Theming Guide](https://github.com/angular/components/blob/main/guides/duplicate-theming-styles.md).

## Troubleshooting

### "ng: command not found"
- Ensure `npm install` completed successfully
- Run `npm install` again with `--legacy-peer-deps` if needed

### Build errors
- Clear `node_modules` and `package-lock.json`, then reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Port 4200 already in use
- Run the dev server on a different port:
  ```bash
  ng serve --port 4300
  ```

## Security

The project has some security vulnerabilities (mostly in older dependencies):
- 7 low severity
- 15 moderate severity  
- 30 high severity

Run `npm audit fix` to address non-breaking issues.

## License
See LICENSE file for details.
