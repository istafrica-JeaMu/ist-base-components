# 🎯 CURSOR PROMPT: Analyze IST Component Library CSS for BEM Conversion

## Task
Using @.cursorrules, scan the entire project and identify all custom CSS classes that need IST- prefixes and BEM methodology to prevent conflicts when this library is imported into other projects.

## What to Find

### 1. Scan These Locations:
- `src/components/*.vue` (all `<style>` blocks)
- `src/assets/*.css`
- `src/utilities.css`
- Any `:deep()` selectors
- Custom scrollbar styles
- Animation/transition classes

### 2. Identify Problematic Classes:
- Generic names: `.active`, `.disabled`, `.container`, `.dropdown`
- Component states: `.open`, `.closed`, `.expanded`, `.loading`
- Custom utilities: `.custom-scrollbar`, `.fade-in`, `.rotate-180`
- PrimeVue overrides: `:deep(.p-button)`, `:deep(.p-dropdown)`

## Expected Output Format:

```markdown
# IST Component Library CSS Analysis Results

## High Priority (Generic Names - High Conflict Risk)
| Current Class | File | Line | Proposed IST-BEM | Usage Context |
|---------------|------|------|------------------|---------------|
| `.active` | BaseButton.vue | 45 | `.ist-button--active` | Button state |
| `.disabled` | BaseInput.vue | 23 | `.ist-input--disabled` | Input state |

## Medium Priority (Descriptive Names - Medium Conflict Risk)
| Current Class | File | Line | Proposed IST-BEM | Usage Context |
|---------------|------|------|------------------|---------------|
| `.dropdown-menu` | BaseSelect.vue | 67 | `.ist-select__dropdown` | Dropdown container |

## Low Priority (Specific Names - Low Conflict Risk)
| Current Class | File | Line | Proposed IST-BEM | Usage Context |
|---------------|------|------|------------------|---------------|

## Custom Scrollbar Styles Found:
- File: [filename]
- Current: `.overflow-y-auto::-webkit-scrollbar`
- Proposed: `.ist-scrollbar` utility class

## PrimeVue Overrides Found:
- File: [filename]
- Current: `:deep(.p-button) { ... }`
- Proposed: `:deep(.p-button.ist-button) { ... }`

## Implementation Plan:
1. Create `src/assets/ist-bem-utilities.css`
2. Convert high-priority classes first
3. Update component templates
4. Update documentation
5. Add migration guide
```

## BEM Naming Convention:
```css
/* Block */
.ist-button { }
.ist-input { }
.ist-dropdown { }

/* Element */
.ist-button__icon { }
.ist-dropdown__item { }
.ist-input__label { }

/* Modifier */
.ist-button--primary { }
.ist-button--disabled { }
.ist-dropdown--open { }
```

## Start Analysis Now
Scan the project and provide the analysis in the exact format above. Focus on classes that will definitely conflict with Tailwind CSS or common CSS frameworks when this library is imported.

---

**Use this prompt by copying it and asking Cursor to execute this analysis using @.cursorrules** 