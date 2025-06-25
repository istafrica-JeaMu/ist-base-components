# IST Base Components - Installation Test Guide

## 🧪 Library Installation Testing

This guide provides step-by-step instructions for testing the IST Base Components library installation in different environments.

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager
- Vue.js 3.4+ project

### **Test 1: Local Package Installation**

#### **1.1: Build and Pack Library**
```bash
# In the library root directory
npm run build:lib
npm pack
```

#### **1.2: Create Test Project**
```bash
# Create a new Vue project for testing
npm create vue@latest test-installation
cd test-installation
npm install
```

#### **1.3: Install Local Package**
```bash
# Install the packed library
npm install ../ist-base-components-1.0.0.tgz
```

#### **1.4: Test Basic Import**
Create `src/components/TestComponent.vue`:
```vue
<template>
  <div class="p-4">
    <h2>IST Base Components Test</h2>
    
    <!-- Test BaseButton -->
    <BaseButton 
      label="Test Button" 
      variant="primary" 
      @click="handleClick"
    />
    
    <!-- Test BaseCard -->
    <BaseCard title="Test Card" class="mt-4">
      <p>This is a test card content.</p>
    </BaseCard>
    
    <!-- Test BaseInput -->
    <BaseInput 
      v-model="inputValue"
      label="Test Input"
      placeholder="Enter text..."
      class="mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseButton, BaseCard, BaseInput } from 'ist-base-components'
import 'ist-base-components/style.css'

const inputValue = ref('')

const handleClick = () => {
  alert('Button clicked!')
}
</script>
```

#### **1.5: Update main.ts**
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import ISTBaseComponents from 'ist-base-components'
import 'ist-base-components/style.css'

const app = createApp(App)
app.use(ISTBaseComponents)
app.mount('#app')
```

### **Test 2: TypeScript Integration Test**

#### **2.1: Test Type Imports**
Create `src/types/test-types.ts`:
```typescript
import type { 
  BaseButtonProps,
  BaseCardProps,
  BaseInputProps,
  MenuItem,
  TableColumn 
} from 'ist-base-components'

// Test interface usage
const buttonProps: BaseButtonProps = {
  label: 'Test',
  variant: 'primary',
  size: 'normal'
}

const cardProps: BaseCardProps = {
  title: 'Test Card',
  padding: 'normal'
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    label: 'Home',
    icon: 'pi pi-home',
    path: '/home'
  }
]

export { buttonProps, cardProps, menuItems }
```

#### **2.2: Test Component Props Validation**
```vue
<script setup lang="ts">
import { BaseButton, type BaseButtonProps } from 'ist-base-components'

// This should show TypeScript intellisense and validation
const props: BaseButtonProps = {
  label: 'Typed Button',
  variant: 'primary', // Should autocomplete variants
  size: 'large',      // Should autocomplete sizes
  disabled: false,
  loading: false
}
</script>
```

### **Test 3: Build Integration Test**

#### **3.1: Test Production Build**
```bash
npm run build
```

#### **3.2: Test Bundle Analysis**
```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Analyze bundle size
npm run build -- --analyze
```

### **Test 4: Accessibility Testing**

#### **4.1: Install Testing Tools**
```bash
npm install --save-dev @axe-core/cli
```

#### **4.2: Test Accessibility**
```bash
# Start dev server
npm run dev

# In another terminal, test accessibility
npx axe http://localhost:5173
```

### **Test 5: Component Functionality Test**

#### **5.1: Interactive Components Test**
Create comprehensive test component:
```vue
<template>
  <div class="p-6 space-y-6">
    <!-- Form Components -->
    <section>
      <h3>Form Components</h3>
      <BaseInput v-model="testInput" label="Test Input" />
      <BaseTextarea v-model="testTextarea" label="Test Textarea" />
      <BaseSelect v-model="testSelect" :options="selectOptions" label="Test Select" />
      <BaseCheckbox v-model="testCheckbox" label="Test Checkbox" />
    </section>
    
    <!-- Interactive Components -->
    <section>
      <h3>Interactive Components</h3>
      <BaseButton label="Primary" variant="primary" @click="showMessage" />
      <BaseIconButton icon="pi pi-star" @click="showMessage" />
      <BaseTabs :tabs="tabItems" />
    </section>
    
    <!-- Display Components -->
    <section>
      <h3>Display Components</h3>
      <BaseBadge value="New" severity="success" />
      <BaseTag value="Important" severity="warning" />
      <BaseMessage severity="info" title="Test Message">
        This is a test message.
      </BaseMessage>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Test all component imports
import {
  BaseInput,
  BaseTextarea, 
  BaseSelect,
  BaseCheckbox,
  BaseButton,
  BaseIconButton,
  BaseTabs,
  BaseBadge,
  BaseTag,
  BaseMessage
} from 'ist-base-components'

const testInput = ref('')
const testTextarea = ref('')
const testSelect = ref('')
const testCheckbox = ref(false)

const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' }
]

const tabItems = [
  { title: 'Tab 1' },
  { title: 'Tab 2' }
]

const showMessage = () => {
  alert('Component interaction successful!')
}
</script>
```

### **Expected Results**

#### **✅ Successful Installation Indicators:**
- [ ] Library builds without errors
- [ ] All components import successfully
- [ ] TypeScript types are available and working
- [ ] CSS styles are applied correctly
- [ ] Components render without console errors
- [ ] Interactive components respond to events
- [ ] Accessibility attributes are present
- [ ] Bundle size is reasonable (< 1MB)

#### **🚨 Common Issues and Solutions:**

**Issue: Module not found**
```bash
# Solution: Ensure proper installation
npm install ist-base-components --save
```

**Issue: CSS not loading**
```javascript
// Solution: Import CSS in main.ts
import 'ist-base-components/style.css'
```

**Issue: TypeScript errors**
```typescript
// Solution: Ensure types are imported
import type { BaseButtonProps } from 'ist-base-components'
```

### **Performance Benchmarks**

#### **Expected Bundle Sizes:**
- ESM Bundle: ~630KB (gzipped: ~127KB)
- UMD Bundle: ~500KB (gzipped: ~113KB)
- CSS Bundle: ~2.8KB (gzipped: ~0.85KB)

#### **Load Time Targets:**
- Initial load: < 500ms
- Component rendering: < 100ms
- Interactive response: < 50ms

### **Compatibility Matrix**

| Vue Version | Node Version | Status |
|-------------|--------------|--------|
| 3.4.x       | 18.x         | ✅ Tested |
| 3.3.x       | 18.x         | ⚠️ Compatible |
| 3.2.x       | 16.x         | ❌ Not supported |

### **Next Steps**

After successful installation testing:
1. Integration testing in real projects
2. Performance monitoring in production
3. User acceptance testing
4. Documentation updates based on feedback

---

**📞 Support:** For installation issues, please check the main README.md or create an issue in the repository. 