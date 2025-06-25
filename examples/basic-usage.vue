<template>
  <div class="example-container">
    <h1>IST Childcare - Basic Usage Example</h1>
    
    <!-- Button Examples -->
    <section class="example-section">
      <h2>Button Components</h2>
      
      <div class="example-group">
        <h3>Base Buttons</h3>
        <BaseButton label="Primary" variant="primary" />
        <BaseButton label="Secondary" variant="secondary" />
        <BaseButton label="Success" variant="success" />
        <BaseButton label="Warning" variant="warning" />
        <BaseButton label="Danger" variant="danger" />
      </div>
      
      <div class="example-group">
        <h3>Icon Buttons</h3>
        <IconButton icon="pi pi-home" variant="primary" />
        <IconButton icon="pi pi-user" variant="secondary" />
        <IconButton icon="pi pi-check" variant="success" />
        <IconButton icon="pi pi-exclamation-triangle" variant="warning" />
        <IconButton icon="pi pi-times" variant="danger" />
      </div>
    </section>
    
    <!-- Input Examples -->
    <section class="example-section">
      <h2>Input Components</h2>
      
      <div class="example-group">
        <h3>Base Input</h3>
        <BaseInput
          v-model="formData.name"
          label="Name"
          placeholder="Enter your name"
          required
        />
        
        <BaseInput
          v-model="formData.email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          :errorMessage="emailError"
        />
      </div>
      
      <div class="example-group">
        <h3>Base Textarea</h3>
        <BaseTextarea
          v-model="formData.description"
          label="Description"
          placeholder="Enter a description..."
          :maxlength="200"
          :showCharCount="true"
          rows="4"
        />
      </div>
    </section>
    
    <!-- Card Examples -->
    <section class="example-section">
      <h2>Card Components</h2>
      
      <div class="example-group">
        <BaseCard
          title="Sample Card"
          subtitle="This is a sample card with content"
          variant="primary"
          elevated
        >
          <template #content>
            <p>This is the content of the card. You can put any content here.</p>
            <p>The card supports different variants and can be elevated for more emphasis.</p>
          </template>
          <template #footer>
            <BaseButton label="Action" variant="primary" />
            <BaseButton label="Cancel" variant="secondary" />
          </template>
        </BaseCard>
      </div>
    </section>
    
    <!-- Data Table Example -->
    <section class="example-section">
      <h2>Data Table Component</h2>
      
      <div class="example-group">
        <BaseDataTable
          :value="tableData"
          :columns="tableColumns"
          title="User List"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 25]"
          variant="striped"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  BaseButton,
  IconButton,
  BaseInput,
  BaseTextarea,
  BaseCard,
  BaseDataTable
} from '../src/index'

// Form data
const formData = ref({
  name: '',
  email: '',
  description: ''
})

// Email validation
const emailError = computed(() => {
  if (!formData.value.email) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email) ? '' : 'Please enter a valid email address'
})

// Table data
const tableData = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'User' },
  { id: 7, name: 'Eve Adams', email: 'eve@example.com', role: 'Editor' },
])

const tableColumns = ref([
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
  { field: 'role', header: 'Role' },
])
</script>

<style scoped>
.example-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.example-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.example-section h2 {
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.example-group {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  background-color: #f8f9fa;
}

.example-group h3 {
  color: #495057;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.example-group > * {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
}
</style> 