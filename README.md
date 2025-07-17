# repo-example

This is a complete example repository structure implementing the best practices outlined in [MFG Software Modernizaton Proposal document](https://docs.google.com/document/d/135aD_50zRj357p7ZmeNIzXDf3WLb1_agmecFdu6LO2Y/edit?usp=sharing).

**Built with Vite + React + TypeScript** for modern, fast development experience with instant HMR and optimized production builds.

## Repository Structure

```
client/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── config.yml
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── src/
│   ├── components/
│   │   ├── userAuth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── index.ts
│   │   └── common/
│   │       ├── Button.tsx
│   │       └── index.ts
│   ├── services/
│   │   ├── apiClient.ts
│   │   └── authService.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── types/
│   │   ├── user.ts
│   │   └── api.ts
│   ├── assets/
│   │   └── react.svg
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── tests/
│   ├── unit/
│   │   ├── components/
│   │   │   └── Button.test.tsx
│   │   └── services/
│   │       └── authService.test.ts
│   ├── integration/
│   │   └── auth.test.ts
│   └── e2e/
│       └── login.test.ts
├── scripts/
│   ├── build.sh
│   ├── deploy.sh
│   └── setup.sh
├── config/
│   ├── database.yml
│   ├── app.development.yml
│   └── app.production.yml
├── docs/
│   ├── API.md
│   ├── CONTRIBUTING.md
│   └── DEPLOYMENT.md
├── public/
│   └── vite.svg
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── index.html
├── CLAUDE.md
└── CHANGELOG.md
```

## File Contents

### `.github/CODEOWNERS`
```
# Global owners
* @team-lead @senior-dev

# Frontend components
/src/components/ @frontend-team @ui-designer

# Backend services
/src/services/ @backend-team

# Configuration files
/config/ @devops-team @team-lead

# CI/CD workflows
/.github/workflows/ @devops-team

# Documentation
/docs/ @tech-writer @team-lead

# Tests
/tests/ @qa-team @backend-team @frontend-team

# Scripts
/scripts/ @devops-team
```

### `.github/workflows/ci.yml`
```yaml
name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run type check
      run: npm run type-check
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Build application with Vite
      run: npm run build
    
    - name: Run security audit
      run: npm audit --audit-level high
```

### `.github/workflows/deploy.yml`
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build for production with Vite
      run: npm run build:prod
    
    - name: Deploy to staging
      run: npm run deploy:staging
      env:
        DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
    
    - name: Run smoke tests
      run: npm run test:smoke
    
    - name: Deploy to production
      run: npm run deploy:prod
      env:
        DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

### `.github/ISSUE_TEMPLATE/bug_report.md`
```markdown
---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ''
---

## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear and concise description of what you expected to happen.

## Actual Behavior
A clear and concise description of what actually happened.

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 1.2.3]
- Node.js version: [if applicable]

## JIRA Ticket
Link to related JIRA ticket: [PROJ-XXX]
```

### `.github/ISSUE_TEMPLATE/feature_request.md`
```markdown
---
name: Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: ['enhancement', 'needs-review']
assignees: ''
---

## Feature Summary
A clear and concise description of what you want to happen.

## Problem Statement
What problem does this feature solve? Why is it needed?

## Proposed Solution
Describe the solution you'd like to see implemented.

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

## JIRA Ticket
Link to related JIRA ticket: [PROJ-XXX]
```

### `.github/ISSUE_TEMPLATE/config.yml`
```yaml
blank_issues_enabled: false
contact_links:
  - name: 🤔 Questions & Help
    url: https://your-team.slack.com/channels/engineering
    about: Ask questions and get help from the team
  - name: 💬 Discussions
    url: https://github.com/your-org/your-repo/discussions
    about: General discussions about the project
```

### `.github/pull_request_template.md`
```markdown
## Summary
Brief description of what this PR does.

## JIRA Ticket
Link to JIRA ticket: [PROJ-XXX]

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All existing tests pass

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] New and existing unit tests pass locally with my changes
```

### `client/README.md`
```markdown
# Example Web Application

A modern web application built with **Vite + React + TypeScript**, demonstrating best practices for GitHub repository management and modern development workflow.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 8 or higher

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/your-org/example-web-app.git
   cd example-web-app/client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Copy environment variables
   ```bash
   cp .env.example .env
   ```

4. Start the development server (powered by Vite)
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## 🏗️ Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── userAuth/   # Authentication components
│   │   └── common/     # Common UI components
│   ├── services/       # API clients and business logic
│   ├── utils/          # Helper functions and utilities
│   ├── types/          # TypeScript type definitions
│   ├── assets/         # Static assets
│   └── vite-env.d.ts   # Vite environment types
├── tests/              # Test files
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── e2e/            # End-to-end tests
├── scripts/            # Build and deployment scripts
├── config/             # Configuration files
├── docs/               # Documentation
└── public/             # Static public assets
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Run smoke tests
npm run test:smoke
```

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run type checking
npm run type-check
```

## 🚀 Deployment

The application is automatically deployed when changes are pushed to the `main` branch.

### Manual deployment
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to staging/production
npm run deploy:staging
npm run deploy:prod
```

## 🤝 Contributing

1. Create a feature branch from `develop`
   ```bash
   git checkout -b feature/PROJ-123-add-user-auth
   ```

2. Make your changes and commit
   ```bash
   git commit -m "feat: add user authentication (PROJ-123)"
   ```

3. Push to your branch and create a Pull Request
   ```bash
   git push origin feature/PROJ-123-add-user-auth
   ```

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

## 📚 Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)
- [Claude Configuration](CLAUDE.md)

## ⚡ Vite Features

This project leverages Vite's modern build tooling for optimal developer experience:

- **Lightning Fast HMR**: Instant hot module replacement for React components
- **Native TypeScript**: Built-in TypeScript support without additional configuration
- **Optimized Builds**: Automatic code splitting and tree shaking
- **Modern ES Modules**: Native ESM support for faster development
- **Plugin Ecosystem**: Extensible with Vite plugins
- **Development Preview**: Use `npm run preview` to test production builds locally

## 🏗️ Architecture

### Components
- **LoginForm**: User authentication form with validation
- **Button**: Reusable button component with variants
- **App**: Main application component with routing logic

### Services
- **apiClient**: Centralized HTTP client with error handling
- **authService**: Authentication service with JWT token management

### Utils
- **formatters**: Date, currency, and text formatting utilities
- **validators**: Input validation functions

### Types
- **user**: User-related TypeScript interfaces
- **api**: API response and error type definitions

## 📄 License

This project is licensed under the MIT License.
```

### `client/.env.example`
```env
# Application Configuration
NODE_ENV=development
PORT=3000
VITE_API_BASE_URL=http://localhost:3000/api

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/example_db

# Authentication
JWT_SECRET=your-jwt-secret-here
SESSION_SECRET=your-session-secret-here

# External Services
STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
SENDGRID_API_KEY=your_sendgrid_api_key

# Feature Flags
VITE_ENABLE_FEATURE_X=true
VITE_ENABLE_ANALYTICS=false
```

### `.gitignore`
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production build
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Temporary folders
tmp/
temp/
```

### `client/package.json`
```json
{
  "name": "example-web-app",
  "version": "1.0.0",
  "description": "Example web application demonstrating GitHub best practices",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:prod": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "playwright test",
    "test:smoke": "jest --testPathPattern=smoke",
    "lint": "eslint src/**/*.{ts,tsx}",
    "lint:fix": "eslint src/**/*.{ts,tsx} --fix",
    "type-check": "tsc --noEmit",
    "deploy:staging": "echo 'Deploying to staging...'",
    "deploy:prod": "echo 'Deploying to production...'"
  },
  "keywords": ["react", "typescript", "web-app", "vite"],
  "author": "Your Team",
  "license": "MIT",
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.30.1",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.6.0",
    "eslint": "^9.30.1",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "prettier": "^2.0.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.35.1",
    "vite": "^7.0.4"
  }
}
```

### `client/CHANGELOG.md`
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with Vite + React + TypeScript
- User authentication system with login form
- Comprehensive test suite (unit, integration, e2e)
- CI/CD pipeline with GitHub Actions
- Development and deployment scripts
- Documentation and contributing guidelines

### Changed
- Updated project structure to follow best practices
- Improved build configuration for production optimization

### Fixed
- Initial implementation - no fixes yet

## [1.0.0] - 2025-07-17

### Added
- **Initial Release**: Complete web application structure
- **Authentication System**: Login form with validation, JWT token management
- **Component Library**: Reusable Button component, Login form, User dashboard
- **API Client**: Centralized HTTP client with error handling
- **Testing Framework**: Unit, integration, and E2E tests
- **Development Tools**: ESLint, TypeScript, Vite configuration
- **GitHub Integration**: Issue templates, workflows, code owners
- **Documentation**: API docs, contributing guide, deployment guide
- **Scripts**: Build, deployment, and setup automation
- **Configuration**: Environment variables, database, app config
```

## Branch Protection Rules Configuration

When setting up this repository, configure branch protection rules for `main`:

1. **Require pull request reviews before merging**
   - Required approving reviews: 2
   - Require review from code owners: ✓

2. **Require status checks to pass before merging**
   - Require branches to be up to date: ✓
   - Status checks: CI Pipeline, Security Audit

3. **Restrict pushes that create files**
   - Restrict pushes to matching branches: ✓
   - Allow force pushes: ✗
   - Allow deletions: ✗

## Standard Branch Naming Examples

```bash
# Feature branches
feature/PROJ-123-user-authentication
feature/PROJ-124-payment-integration

# Bug fix branches
bugfix/PROJ-456-login-timeout
bugfix/PROJ-457-memory-leak

# Hotfix branches
hotfix/PROJ-789-security-patch
hotfix/PROJ-790-critical-bug

# Release branches
release/v1.2.0
release/v1.2.1
```
