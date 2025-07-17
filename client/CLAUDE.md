# Claude Configuration

This file contains configuration and context information for Claude to better understand and work with this project.

## Project Overview

This is a modern web application built with **Vite + React + TypeScript** that demonstrates best practices for GitHub repository management and development workflows.

## Key Technologies

- **Frontend**: React 19, TypeScript, Vite
- **Testing**: Vitest, React Testing Library, Playwright
- **Linting**: ESLint, TypeScript ESLint
- **Build**: Vite with TypeScript compilation
- **CI/CD**: GitHub Actions

## Important Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Testing
```bash
npm run test         # Run all tests
npm run test:unit    # Run unit tests only
npm run test:integration  # Run integration tests
npm run test:e2e     # Run end-to-end tests
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript type checking
```

### Deployment
```bash
npm run deploy:staging    # Deploy to staging
npm run deploy:prod      # Deploy to production
```

## Project Structure

```
src/
├── components/
│   ├── userAuth/     # Authentication components
│   └── common/       # Reusable UI components
├── services/         # API clients and business logic
├── utils/           # Helper functions and utilities
├── types/           # TypeScript type definitions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point

tests/
├── unit/            # Unit tests
├── integration/     # Integration tests
└── e2e/            # End-to-end tests

scripts/
├── build.sh         # Build script
├── deploy.sh        # Deployment script
└── setup.sh         # Development setup script
```

## Key Files

- **package.json**: Project configuration and dependencies
- **tsconfig.json**: TypeScript configuration
- **vite.config.ts**: Vite build configuration
- **vitest.config.ts**: Vitest test configuration
- **eslint.config.js**: ESLint configuration
- **.env.example**: Environment variables template
- **tests/setup.ts**: Test setup and configuration

## Development Workflow

1. Create feature branch from `develop`
2. Make changes following coding standards
3. Write/update tests
4. Run linting and type checking
5. Create pull request
6. Code review and merge

## Code Standards

- Use TypeScript for all new code
- Follow React functional component patterns
- Write tests for all new features
- Use descriptive variable and function names
- Follow ESLint rules

## Common Issues and Solutions

### Build Issues
- Run `npm run type-check` to identify TypeScript errors
- Run `npm run lint:fix` to fix linting issues
- Check that all dependencies are installed with `npm ci`

### Test Issues
- Ensure test files are in the correct directories
- Mock external dependencies properly with `vi.mock()`
- Use React Testing Library best practices
- Configure jsdom environment properly for React testing

### Environment Issues
- Copy `.env.example` to `.env` and configure variables
- Check that all required environment variables are set
- Verify API endpoints are accessible

## CI/CD Pipeline

The project uses GitHub Actions for CI/CD:

- **On PR**: Runs tests, linting, type checking, and builds
- **On merge to develop**: Deploys to staging environment
- **On merge to main**: Deploys to production environment

## Deployment

The application is deployed as static files and can be served by any web server or CDN. The build process optimizes assets and creates production-ready files in the `dist/` directory.

## Architecture Notes

- **State Management**: Uses React hooks for local state
- **API Client**: Centralized HTTP client with error handling
- **Authentication**: JWT-based authentication with token storage
- **Routing**: Client-side routing with React Router (if added)
- **Styling**: CSS modules or styled-components approach

## Performance Considerations

- Vite provides fast development builds with HMR
- Production builds are optimized with code splitting
- Assets are minified and compressed
- TypeScript compilation ensures type safety

## Security Features

- Input validation on all forms
- API client with proper error handling
- JWT token management
- Environment variable management for secrets
- CORS configuration for API calls

## Testing Strategy

- **Unit Tests**: Individual components and functions
- **Integration Tests**: Component interactions and user flows
- **E2E Tests**: Complete user workflows
- **Smoke Tests**: Basic functionality verification

## Dependencies

### Production Dependencies
- `react`: UI library
- `react-dom`: DOM rendering for React

### Development Dependencies
- `vite`: Build tool and development server
- `typescript`: Type checking and compilation
- `eslint`: Code linting
- `vitest`: Testing framework with native Vite integration
- `@testing-library/react`: React testing utilities
- `playwright`: E2E testing framework
- `jsdom`: DOM environment for testing

## Maintenance

- Regularly update dependencies
- Monitor for security vulnerabilities
- Keep documentation up to date
- Review and update CI/CD pipelines
- Monitor application performance

## Support

For questions or issues:
- Check the documentation in the `docs/` directory
- Review existing GitHub issues
- Contact the development team
- Create a new issue using the provided templates