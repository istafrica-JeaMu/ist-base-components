# IST Base Components

A comprehensive Vue 3 component library built on top of PrimeVue, featuring professional, reusable components styled with Tailwind CSS.

## Features

- 🎨 **Professional Design**: Pixel-perfect components following modern design principles
- 🔧 **Highly Customizable**: Extensive prop system for different variants and sizes
- ♿ **Accessible**: Built on PrimeVue's solid accessibility foundation
- 🎯 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🎨 **Tailwind CSS**: Styled with Tailwind CSS for consistent design system
- 📱 **Responsive**: Mobile-first responsive design approach

## Installation

### From GitHub (Recommended for testing)

```bash
npm install git+https://github.com/your-username/ist-base-components.git
```

### From npm (when published)

```bash
npm install ist-base-components
```

## Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install vue@^3.4.0 primevue@^3.53.1 primeicons@^6.0.1
```

## Setup

### 1. Import the library and styles

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Import PrimeVue
import PrimeVue from 'primevue/config'

// Import IST Base Components
import ISTBaseComponents from 'ist-base-components'
import 'ist-base-components/style.css'

// Import PrimeVue styles (choose your theme)
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ISTBaseComponents) // Global registration

app.mount('#app')
```

### 2. Individual Component Imports

```javascript
// Import individual components
import { BaseButton, BaseInput, BaseCard } from 'ist-base-components'

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseCard
  }
}
```

## Available Components

### Form Components
- **BaseInput** - Text input with icon support and validation
- **BaseTextarea** - Multi-line text input
- **BaseSelect** - Dropdown select component
- **BaseMultiSelect** - Multi-selection dropdown
- **BaseCheckbox** - Checkbox with variants and sizes
- **BaseHierarchicalSelect** - Two-level hierarchical selection

### UI Components
- **BaseButton** - Button with variants and loading states
- **BaseIconButton** - Icon-only button
- **BaseCard** - Content container with header/footer
- **BaseBadge** - Status indicators and counters
- **BaseChip** - Removable tags and chips
- **BaseChipCluster** - Group of related chips
- **BaseTag** - Simple label tags

### Navigation Components
- **BaseHeader** - Application header with navigation
- **BaseSideMenu** - Collapsible sidebar navigation
- **BaseBreadcrumbs** - Breadcrumb navigation
- **BaseTabs** - Tab navigation component

### Data Display
- **BaseDataTable** - Data table with pagination and sorting
- **BaseAccordion** - Collapsible content sections

### Feedback Components
- **BaseDialog** - Modal dialogs
- **BaseMessage** - Alert and notification messages

## Basic Usage Examples

### BaseButton

```vue
<template>
  <div>
    <!-- Basic button -->
    <BaseButton label="Click me" />
    
    <!-- Primary button with icon -->
    <BaseButton 
      label="Save" 
      variant="primary" 
      icon="pi pi-save" 
      @click="handleSave"
    />
    
    <!-- Loading button -->
    <BaseButton 
      label="Loading..." 
      :loading="isLoading" 
      disabled 
    />
  </div>
</template>

<script setup>
import { BaseButton } from 'ist-base-components'

const isLoading = ref(false)

const handleSave = () => {
  console.log('Save clicked!')
}
</script>
```

### BaseInput

```vue
<template>
  <div>
    <!-- Basic input -->
    <BaseInput 
      v-model="username" 
      label="Username" 
      placeholder="Enter your username"
    />
    
    <!-- Input with icon and validation -->
    <BaseInput 
      v-model="email" 
      label="Email" 
      icon="pi-envelope"
      :invalid="!isValidEmail"
      error-message="Please enter a valid email"
      help-text="We'll never share your email"
    />
  </div>
</template>

<script setup>
import { BaseInput } from 'ist-base-components'

const username = ref('')
const email = ref('')
const isValidEmail = computed(() => email.value.includes('@'))
</script>
```

### BaseCard

```vue
<template>
  <BaseCard title="User Profile" subtitle="Manage your account">
    <template #actions>
      <BaseButton label="Edit" variant="primary" size="small" />
    </template>
    
    <p>Card content goes here...</p>
    
    <template #footer>
      <div class="flex justify-end gap-2">
        <BaseButton label="Cancel" variant="secondary" />
        <BaseButton label="Save" variant="primary" />
      </div>
    </template>
  </BaseCard>
</template>

<script setup>
import { BaseCard, BaseButton } from 'ist-base-components'
</script>
```

### BaseCheckbox

```vue
<template>
  <div>
    <!-- Basic checkbox -->
    <BaseCheckbox v-model="agreed" label="I agree to the terms" />
    
    <!-- Checkbox with variants -->
    <BaseCheckbox 
      v-model="notifications" 
      label="Email notifications" 
      variant="success"
      help-text="Receive updates via email"
    />
    
    <!-- Checkbox group -->
    <div>
      <BaseCheckbox v-model="selectedItems" value="item1" label="Item 1" />
      <BaseCheckbox v-model="selectedItems" value="item2" label="Item 2" />
      <BaseCheckbox v-model="selectedItems" value="item3" label="Item 3" />
    </div>
  </div>
</template>

<script setup>
import { BaseCheckbox } from 'ist-base-components'

const agreed = ref(false)
const notifications = ref(true)
const selectedItems = ref(['item1'])
</script>
```

## Styling and Customization

All components are built with Tailwind CSS and follow a consistent design system:

### Color Variants
- `default` - Standard styling
- `primary` - Primary brand color (#667eea)
- `secondary` - Secondary color (#6c757d)
- `success` - Success state (#28a745)
- `warning` - Warning state (#ffc107)
- `danger` - Error/danger state (#dc3545)

### Size Variants
- `small` - Compact size
- `normal` - Default size
- `large` - Larger size

### Custom Styling

You can override component styles using CSS classes or by customizing the Tailwind configuration:

```vue
<template>
  <BaseButton 
    label="Custom Button" 
    class="my-custom-button"
  />
</template>

<style>
.my-custom-button {
  @apply bg-purple-500 hover:bg-purple-600;
}
</style>
```

## TypeScript Support

All components include comprehensive TypeScript definitions:

```typescript
import type { 
  BaseButtonProps, 
  BaseInputProps,
  BaseCardProps 
} from 'ist-base-components'

// Use the types in your components
const buttonProps: BaseButtonProps = {
  label: 'Click me',
  variant: 'primary',
  size: 'large'
}
```

## Development

### Requirements
- Node.js 18+
- Vue 3.4+
- PrimeVue 3.53+
- Tailwind CSS 3.4+

### Building from Source

```bash
# Clone the repository
git clone https://github.com/your-username/ist-base-components.git
cd ist-base-components

# Install dependencies
npm install

# Build the library
npm run build:lib

# Run development server with examples
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions and support:
- Create an issue on GitHub
- Check the [documentation](https://github.com/your-username/ist-base-components/wiki)
- Review the examples in the `/examples` directory 