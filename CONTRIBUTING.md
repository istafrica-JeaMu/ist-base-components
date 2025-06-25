# Contributing to IST Base Components

Thank you for your interest in contributing to IST Base Components! This guide will help you understand our development process and standards.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Development Standards](#component-development-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## 🤝 Code of Conduct

This project adheres to a professional code of conduct. By participating, you are expected to uphold high standards of collaboration and respect.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 8+
- Vue 3.4+ knowledge
- TypeScript experience
- Tailwind CSS familiarity
- Git and GitHub workflow understanding

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/ist-base-components.git
cd ist-base-components

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build library
npm run build:lib
```

### Development Scripts

```bash
# Development
npm run dev                    # Start dev server with hot reload
npm run build                  # Build demo application
npm run build:lib             # Build library for distribution

# Testing
npm run test                   # Run unit tests with Vitest
npm run test:ui               # Run tests with UI interface
npm run test:coverage         # Generate coverage report
npm run test:e2e              # Run end-to-end tests
npm run test:visual           # Run visual regression tests
npm run test:accessibility    # Run accessibility tests

# Code Quality
npm run lint                  # Fix linting issues
npm run lint:check           # Check linting without fixing
npm run type-check           # TypeScript type checking

# Documentation
npm run storybook            # Start Storybook dev server
npm run build-storybook      # Build Storybook for deployment
```

## 🔄 Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features and enhancements
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Commit Standards
We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(button): add loading state animation
fix(input): resolve validation error display
docs(readme): update installation instructions
test(checkbox): add accessibility tests
chore(deps): update dependencies
```

**Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `test` - Test additions/modifications
- `refactor` - Code refactoring
- `style` - Code style changes
- `chore` - Build process, dependency updates
- `perf` - Performance improvements

## 🧩 Component Development Standards

### Component Architecture
All components must follow these standards:

1. **File Structure**
```vue
<!-- Component description and rationale -->
<template>
  <!-- Semantic HTML with Tailwind classes -->
</template>

<script setup lang="ts">
// Vue 3 Composition API with TypeScript
</script>

<style scoped>
/* Minimal custom styles - prefer Tailwind */
</style>
```

2. **Required Elements**
- TypeScript interfaces for props, emits, and slots
- Comprehensive prop validation
- Accessibility attributes (ARIA, roles, labels)
- Testing attributes (data-testid)
- Error handling and validation
- Responsive design considerations

3. **Naming Conventions**
- Component files: `Base[ComponentName].vue`
- Props: camelCase
- Events: kebab-case
- CSS classes: Tailwind utilities preferred

### Component Checklist
Before submitting a component:

- [ ] TypeScript interfaces defined
- [ ] Props have proper validation and defaults
- [ ] Accessibility attributes implemented
- [ ] Responsive design tested
- [ ] Unit tests written (80%+ coverage)
- [ ] Storybook stories created
- [ ] Documentation updated
- [ ] Visual regression tests pass
- [ ] Cross-browser compatibility verified

## 🧪 Testing Requirements

### Unit Testing (Required)
- **Tool**: Vitest with Vue Test Utils
- **Coverage**: Minimum 80% for all metrics
- **Location**: `tests/components/`

```typescript
// Example test structure
describe('ComponentName', () => {
  describe('Rendering', () => {
    // Rendering tests
  })
  
  describe('Props', () => {
    // Props validation tests
  })
  
  describe('Events', () => {
    // Event emission tests
  })
  
  describe('Accessibility', () => {
    // A11y tests
  })
})
```

### End-to-End Testing (Required for Interactive Components)
- **Tool**: Playwright
- **Location**: `tests/e2e/`
- **Coverage**: Critical user flows

### Visual Regression Testing (Required for UI Changes)
- **Tool**: Playwright with screenshots
- **Location**: `tests/visual/`
- **Coverage**: All component variants

### Accessibility Testing (Required)
- **Tool**: axe-playwright
- **Standards**: WCAG 2.1 AA compliance
- **Coverage**: All interactive states

## 📚 Documentation Standards

### Component Documentation
Each component must include:

1. **Inline Documentation**
```vue
<!--
@component ComponentName
@description Brief description of the component's purpose
@rationale Explanation of design decisions and PrimeVue integration approach
@props List of all props with descriptions
@events List of emitted events
@slots List of available slots
@usage Basic usage example
-->
```

2. **Storybook Stories**
```typescript
// ComponentName.stories.ts
export default {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Detailed component description'
      }
    }
  }
}

export const Default = {}
export const AllVariants = {}
export const Interactive = {}
export const Accessibility = {}
```

3. **README Updates**
- Add component to main README
- Include usage examples
- Document all props and events
- Add migration notes if applicable

## 🔄 Pull Request Process

### Before Submitting
1. Run all tests: `npm run test:run`
2. Check linting: `npm run lint:check`
3. Verify types: `npm run type-check`
4. Build successfully: `npm run build:lib`
5. Update documentation
6. Add changelog entry

### PR Requirements
- **Title**: Follow conventional commit format
- **Description**: Explain changes and reasoning
- **Tests**: Include relevant test updates
- **Documentation**: Update docs if needed
- **Screenshots**: For UI changes
- **Breaking Changes**: Clearly marked and explained

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Testing in multiple browsers
4. Accessibility review
5. Performance impact assessment

## 🚀 Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared
- [ ] Bundle size analyzed
- [ ] Browser compatibility tested

## 🎯 Quality Gates

### Automated Checks
- TypeScript compilation
- ESLint rules compliance
- Unit test coverage (80%+)
- E2E test success
- Bundle size limits
- Accessibility standards
- Visual regression tests

### Manual Reviews
- Code quality and architecture
- Design system compliance
- Performance implications
- Security considerations
- Documentation completeness

## 💡 Best Practices

### Performance
- Use `v-memo` for expensive computations
- Implement lazy loading where appropriate
- Optimize bundle size with tree-shaking
- Monitor runtime performance

### Accessibility
- Include proper ARIA attributes
- Ensure keyboard navigation
- Maintain color contrast ratios
- Test with screen readers

### Maintainability
- Write self-documenting code
- Use TypeScript strictly
- Follow established patterns
- Keep components focused and small

## 🆘 Getting Help

- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check existing docs and Storybook
- **Code Review**: Request specific feedback in PRs

## 📞 Contact

For questions about contributing:
- Email: [team@ist-components.com](mailto:team@ist-components.com)
- GitHub Discussions: [Link to discussions](https://github.com/your-org/ist-base-components/discussions)

Thank you for contributing to IST Base Components! 🎉 