# Cursor Prompt: IST Component Library CSS Analysis & BEM Conversion

## Context
You are a senior CSS architect and Vue.js component library expert analyzing the IST Base Components library. This library will be consumed by multiple external projects, and we need to ensure our custom CSS classes don't conflict with consuming projects' Tailwind CSS or other styling frameworks.

## Objective
Analyze the entire project using @.cursorrules standards and identify all custom CSS classes that need to be converted to BEM (Block Element Modifier) methodology with IST- prefixes to prevent CSS conflicts in consuming projects.

## Instructions

### 1. Project Analysis Scope
- Scan ALL Vue components in `src/components/`
- Analyze ALL CSS files in `src/assets/`
- Check ALL style blocks in `.vue` files (both `<style>` and `<style scoped>`)
- Review `src/utilities.css` and any other CSS files
- Examine any CSS-in-JS or dynamic class generation

### 2. Identify Custom CSS Classes
Find and categorize:

#### A. Custom CSS Classes (Non-Tailwind)
- Classes defined in `<style>` blocks
- Classes in standalone CSS files
- Classes that are NOT Tailwind utilities
- Classes that could conflict with external projects

#### B. Component-Specific Classes
- Classes that belong to specific components
- Classes that define component behavior/state
- Classes that override PrimeVue components using `:deep()`

#### C. Utility Classes
- Custom utility classes not covered by Tailwind
- Helper classes for common patterns
- Animation/transition classes

### 3. BEM Conversion Strategy
For each identified class, propose BEM structure:

```css
/* Current problematic pattern */
.custom-scrollbar { }
.dropdown-open { }
.menu-item-active { }

/* Convert to IST-BEM pattern */
.ist-scrollbar { }
.ist-scrollbar__thumb { }
.ist-scrollbar--hover { }

.ist-dropdown { }
.ist-dropdown--open { }
.ist-dropdown__content { }

.ist-menu { }
.ist-menu__item { }
.ist-menu__item--active { }
```

### 4. Analysis Output Format

For each file analyzed, provide:

```markdown
## File: [filename]

### Current Custom Classes Found:
- `.class-name` (line X) - [description]
- `.another-class` (line Y) - [description]

### Proposed BEM Conversion:
- `.class-name` → `.ist-[block]__[element]--[modifier]`
- Usage context: [where it's used]
- Conflict risk: [high/medium/low]

### Code Changes Required:
```vue
<!-- BEFORE -->
<div class="custom-class">

<!-- AFTER -->
<div class="ist-component__element">
```

### Priority: [High/Medium/Low]
### Impact: [Breaking/Non-breaking]
```

### 5. Specific Areas to Focus On

#### A. Scrollbar Customizations
```css
/* Find patterns like */
::-webkit-scrollbar { }
.overflow-y-auto::-webkit-scrollbar { }
```

#### B. PrimeVue Overrides
```css
/* Find :deep() patterns */
:deep(.p-button) { }
:deep(.p-dropdown) { }
```

#### C. State Classes
```css
/* Find state-based classes */
.active { }
.disabled { }
.loading { }
.expanded { }
```

#### D. Animation Classes
```css
/* Find animation/transition classes */
.fade-in { }
.slide-up { }
.rotate-180 { }
```

### 6. Conflict Risk Assessment

Rate each class based on conflict probability:
- **HIGH**: Generic names like `.active`, `.disabled`, `.container`
- **MEDIUM**: Descriptive but common names like `.dropdown`, `.menu-item`
- **LOW**: Very specific names like `.ist-specific-component-behavior`

### 7. Implementation Recommendations

Provide:
1. **Migration Strategy**: How to implement changes without breaking existing usage
2. **Backward Compatibility**: How to maintain compatibility during transition
3. **Documentation Updates**: What documentation needs updating
4. **Testing Requirements**: What needs to be tested after changes

### 8. Expected Deliverables

1. **Complete Inventory**: List of all custom CSS classes in the project
2. **BEM Conversion Map**: Old class → New IST-BEM class mapping
3. **Priority Matrix**: Which classes to convert first based on conflict risk
4. **Implementation Plan**: Step-by-step conversion strategy
5. **Code Examples**: Before/after examples for each component

## Success Criteria

The analysis should result in:
- ✅ Zero CSS class conflicts when library is imported
- ✅ Consistent BEM naming convention across all components
- ✅ IST- prefix on all custom classes
- ✅ Maintained component functionality
- ✅ Clear migration path for existing implementations

## Follow @.cursorrules Standards

Ensure the analysis follows our cursorrules for:
- Professional component architecture
- Tailwind CSS integration best practices
- Cross-project compatibility requirements
- Design system compliance

## Start Analysis

Begin by scanning the project systematically and provide the comprehensive analysis following the format above. Focus on actionable recommendations that will make our component library truly conflict-free for consuming projects. 