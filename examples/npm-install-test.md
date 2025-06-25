# Testing IST Base Components Installation

This guide shows how to test the npm installation of IST Base Components.

## Create a new Vue project

```bash
# Create new Vue project
npm create vue@latest test-ist-components
cd test-ist-components

# Install dependencies
npm install

# Install IST Base Components from GitHub
npm install git+https://github.com/your-username/ist-base-components.git

# Install required peer dependencies
npm install primevue@^3.53.1 primeicons@^6.0.1
```

## Setup the project

### 1. Update main.js

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// PrimeVue
import PrimeVue from 'primevue/config'

// IST Base Components
import ISTBaseComponents from 'ist-base-components'
import 'ist-base-components/style.css'

// PrimeVue Styles
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ISTBaseComponents)

app.mount('#app')
```

### 2. Create a test component

```vue
<!-- src/components/TestComponents.vue -->
<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">IST Base Components Test</h1>
    
    <!-- Test BaseButton -->
    <section>
      <h2 class="text-lg font-semibold mb-2">BaseButton</h2>
      <div class="space-x-2">
        <BaseButton label="Default" />
        <BaseButton label="Primary" variant="primary" />
        <BaseButton label="Success" variant="success" />
        <BaseButton label="Loading" :loading="true" />
      </div>
    </section>
    
    <!-- Test BaseInput -->
    <section>
      <h2 class="text-lg font-semibold mb-2">BaseInput</h2>
      <div class="max-w-md space-y-2">
        <BaseInput 
          v-model="inputValue" 
          label="Test Input" 
          placeholder="Type something..."
        />
        <BaseInput 
          v-model="emailValue" 
          label="Email" 
          icon="pi-envelope"
          type="email"
        />
      </div>
    </section>
    
    <!-- Test BaseCheckbox -->
    <section>
      <h2 class="text-lg font-semibold mb-2">BaseCheckbox</h2>
      <div class="space-y-2">
        <BaseCheckbox v-model="checkbox1" label="Basic checkbox" />
        <BaseCheckbox v-model="checkbox2" label="Primary variant" variant="primary" />
        <BaseCheckbox v-model="checkbox3" label="Success variant" variant="success" />
      </div>
    </section>
    
    <!-- Test BaseCard -->
    <section>
      <h2 class="text-lg font-semibold mb-2">BaseCard</h2>
      <BaseCard title="Test Card" subtitle="This is a test card">
        <p>This is the card content. All components are working correctly!</p>
        
        <template #footer>
          <div class="flex justify-end">
            <BaseButton label="Action" variant="primary" size="small" />
          </div>
        </template>
      </BaseCard>
    </section>
    
    <!-- Display values -->
    <section>
      <h2 class="text-lg font-semibold mb-2">Current Values</h2>
      <pre class="bg-gray-100 p-3 rounded text-sm">{{ JSON.stringify({
        inputValue,
        emailValue,
        checkbox1,
        checkbox2,
        checkbox3
      }, null, 2) }}</pre>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const emailValue = ref('')
const checkbox1 = ref(false)
const checkbox2 = ref(true)
const checkbox3 = ref(false)
</script>
```

### 3. Update App.vue

```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <TestComponents />
  </div>
</template>

<script setup>
import TestComponents from './components/TestComponents.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
```

## Run the test

```bash
npm run dev
```

If everything is working correctly, you should see:
- Various buttons with different variants
- Input fields that accept text
- Checkboxes that can be toggled
- A card component with content
- Real-time display of form values

## Troubleshooting

### Missing styles
If components appear unstyled, ensure you've imported all required CSS files in main.js.

### Component not found
If you get "Component not found" errors, check that:
1. The component is properly exported from ist-base-components
2. You've installed the library correctly
3. You've registered the components (either globally or locally)

### TypeScript errors
If using TypeScript, you may need to add type declarations or use `// @ts-ignore` for the library import until proper types are available. 