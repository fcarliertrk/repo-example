# Contributing Guidelines

Thank you for your interest in contributing to the Example Web Application! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 8 or higher
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/example-web-app.git
   cd example-web-app
   ```

3. Run the setup script:
   ```bash
   ./scripts/setup.sh
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development Process

### Branch Naming

Use descriptive branch names following this pattern:
- `feature/PROJ-123-add-user-authentication`
- `bugfix/PROJ-456-fix-login-validation`
- `hotfix/PROJ-789-security-patch`

### Commit Messages

Follow conventional commit format:
```
type(scope): description

Body (optional)

Footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add two-factor authentication

fix(login): resolve validation error on empty email

docs(api): update authentication endpoints

test(auth): add unit tests for login service
```

### JIRA Integration

- Link commits to JIRA tickets: `feat(auth): add login form (PROJ-123)`
- Reference tickets in PR descriptions
- Update ticket status when work is completed

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Use proper type annotations
- Avoid `any` type unless absolutely necessary

### React

- Use functional components with hooks
- Follow React naming conventions
- Use descriptive prop names
- Implement proper error boundaries

### Styling

- Use CSS modules or styled-components
- Follow BEM methodology for CSS classes
- Use semantic HTML elements
- Ensure accessibility compliance

### File Organization

```
src/
├── components/
│   ├── common/          # Reusable components
│   └── feature/         # Feature-specific components
├── services/            # API and business logic
├── utils/              # Helper functions
├── types/              # TypeScript definitions
└── hooks/              # Custom React hooks
```

### Code Quality

- Run linter before committing: `npm run lint`
- Fix linting errors: `npm run lint:fix`
- Run type checking: `npm run type-check`
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Testing

### Test Types

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user workflows

### Testing Requirements

- Write tests for all new features
- Maintain test coverage above 80%
- Update tests when modifying existing code
- Use descriptive test names

### Running Tests

```bash
# Run all tests
npm test

# Run specific test types
npm run test:unit
npm run test:integration
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

### Test Structure

```javascript
describe('Component/Function Name', () => {
  beforeEach(() => {
    // Setup
  });

  test('should do something when condition is met', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Pull Request Process

### Before Submitting

1. Create a feature branch from `develop`
2. Make your changes
3. Write/update tests
4. Run the full test suite
5. Update documentation if needed
6. Ensure all CI checks pass

### PR Requirements

- [ ] Code follows project standards
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] No linting errors
- [ ] PR description includes JIRA ticket link
- [ ] Changes are backwards compatible

### Review Process

1. Create PR against `develop` branch
2. Request review from code owners
3. Address reviewer feedback
4. Ensure all CI checks pass
5. PR will be merged by maintainers

### PR Template

Use the provided PR template to ensure all necessary information is included:

- Summary of changes
- JIRA ticket link
- Type of change
- Testing performed
- Checklist completion

## Issue Reporting

### Bug Reports

Use the bug report template and include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment information
- Screenshots if applicable

### Feature Requests

Use the feature request template and include:
- Problem statement
- Proposed solution
- Acceptance criteria
- Business justification

### Security Issues

For security-related issues:
- Do not create public issues
- Email security@example.com
- Include detailed description
- Provide proof of concept if applicable

## Communication

- Use GitHub issues for bug reports and feature requests
- Join team Slack channel for discussions
- Attend weekly team meetings
- Follow up on PR reviews promptly

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow company policies

## Questions?

If you have questions about contributing:
- Check existing documentation
- Ask in the team Slack channel
- Create a discussion on GitHub
- Contact the maintainers

Thank you for contributing to the Example Web Application!