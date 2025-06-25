<template>
  <div class="container mx-auto p-8 space-y-12">
    <div class="text-center">
      <img src="/ist-logo.png" alt="IST Logo" class="mx-auto h-24">
      <h1 class="text-4xl font-bold text-dark mt-4">
        IST Base Component Gallery
      </h1>
      <p class="text-lg text-muted mt-2">
        A collection of our beautifully crafted Vue components.
      </p>
    </div>

    <div class="flex-1">
      <!-- BaseBreadcrumbs -->
      <div class="gallery-section">
        <h2 class="gallery-section-title">
          BaseBreadcrumbs
        </h2>
        <div class="space-y-4">
          <BaseBreadcrumbs :items="breadcrumbItems" />
          <BaseBreadcrumbs :items="breadcrumbItems" separator-icon="pi pi-chevron-right">
            <template #item="{ item, active }">
              <a :href="item.path" :class="['flex items-center text-sm gap-2', active ? 'font-bold text-primary' : 'hover:underline']">
                <i v-if="item.icon" :class="item.icon" />
                <span>{{ item.label }}</span>
                <BaseBadge v-if="active" severity="accent" value="Current" size="large" />
              </a>
            </template>
          </BaseBreadcrumbs>
        </div>
      </div>

      <!-- BaseButton -->
      <div class="gallery-section">
        <h2 class="gallery-section-title">
          BaseButton
        </h2>
        <div class="flex flex-wrap items-center gap-4">
          <BaseButton variant="primary">Primary</BaseButton>
          <BaseButton variant="secondary">Secondary</BaseButton>
          <BaseButton variant="success">Success</BaseButton>
          <BaseButton variant="danger">Danger</BaseButton>
          <BaseButton variant="warning">Warning</BaseButton>
          <BaseButton variant="default">Default</BaseButton>
        </div>
        <div class="flex flex-wrap items-center gap-4 mt-4">
          <BaseIconButton icon="pi pi-check" variant="primary" />
          <BaseIconButton icon="pi pi-times" variant="secondary" />
          <BaseIconButton icon="pi pi-search" variant="default" />
          <BaseIconButton icon="pi pi-cog" variant="text" />
          <BaseIconButton icon="pi pi-plus" variant="default" :disabled="true" />
          <BaseIconButton icon="pi pi-spinner" variant="default" :loading="true" />
        </div>

        <!-- Rationale Section -->
        <div class="mt-8 p-4 bg-accent/10 border-l-4 border-accent rounded">
          <h3 class="font-bold text-dark">Why Have Both BaseButton & BaseIconButton?</h3>
          <p class="text-sm text-dark/80 mt-2">
            While they seem similar, `BaseButton` and `BaseIconButton` serve two distinct purposes. Keeping them separate makes our component library cleaner and easier to use.
          </p>
          <ul class="text-sm text-dark/80 mt-2 list-disc list-inside space-y-1">
            <li><strong>Clarity and Intent:</strong> When you use <code>&lt;BaseIconButton /&gt;</code>, you're explicitly creating a button that contains only an icon. This makes the code's purpose immediately clear.</li>
            <li><strong>Specialized API:</strong> `BaseIconButton` is designed for iconic actions. It has a streamlined API and specialized features like the <code>badge</code> prop, which wouldn't make sense on a standard text button.</li>
            <li><strong>Simplicity:</strong> Instead of a single, complex component with many conditional props (`iconOnly`, `rounded`, etc.), we have two simple, focused components that are easy to understand and maintain.</li>
          </ul>
        </div>
      </div>

      <!-- BaseInput, BaseSelect, BaseTextarea -->
      <div class="gallery-section">
        <h2 class="gallery-section-title">
          BaseInput, BaseSelect, BaseTextarea
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <BaseInput
            v-model="inputValue"
            label="Default Input"
            help-text="This is a helpful message."
          />
          <BaseInput
            v-model="inputValue"
            label="With Icon"
            icon="pi pi-user"
            iconPosition="left"
          />
          <BaseInput
            v-model="inputValue"
            label="Invalid Input"
            :invalid="true"
            error-message="This field is required."
          />
          <BaseInput
            v-model="inputValue"
            label="Disabled"
            :disabled="true"
          />
          <BaseSelect
            v-model="selectValue"
            :options="selectOptions"
            label="Select an option"
          />
          <BaseSelect
            v-model="selectValue"
            :options="selectOptions"
            label="Disabled Select"
            :disabled="true"
          />
          <BaseTextarea
            v-model="textareaValue"
            label="Textarea"
            :rows="4"
          />
          <BaseTextarea
            v-model="textareaValue"
            label="Readonly Textarea"
            :rows="4"
            :readonly="true"
          />
        </div>
      </div>

      <!-- BaseBadge -->
      <div class="gallery-section">
        <h2 class="gallery-section-title">
          BaseBadge
        </h2>
        <div class="flex items-center gap-6">
          <BaseBadge value="8" severity="accent" size="large" />
          <BaseBadge value="99+" severity="danger" size="large" />
          <BaseBadge severity="success" size="medium" />
          <BaseBadge severity="warning" size="small" />
        </div>
        <h3 class="gallery-subsection-title">
          Icon Badges
        </h3>
        <div class="flex items-center gap-4">
          <BaseBadge icon="pi pi-check" severity="success" size="large" />
          <BaseBadge icon="pi pi-exclamation-triangle" severity="warning" size="medium" />
          <BaseBadge icon="pi pi-bolt" severity="accent" size="small" />
        </div>
      </div>

      <!-- BaseCard -->
      <div class="gallery-section">
        <h2 class="gallery-section-title">
          BaseCard
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BaseCard title="Default Card" subtitle="This is a standard card.">
            <p>
              This card has default 'normal' padding and demonstrates the basic title and subtitle props.
            </p>
            <template #footer>
              <BaseButton label="Cancel" variant="default" />
              <BaseButton label="Save" variant="primary" />
            </template>
          </BaseCard>
          <BaseCard title="Card with Actions" padding="large">
            <template #actions>
              <BaseIconButton icon="pi pi-cog" />
            </template>
            <p>
              This card has 'large' padding and a settings icon in the header's action slot.
            </p>
          </BaseCard>
          <BaseCard>
            <template #header>
              <div class="flex items-center gap-2">
                <i class="pi pi-image text-xl text-muted" />
                <span class="font-semibold">Card with Image</span>
              </div>
            </template>
            <template #actions>
              <BaseIconButton icon="pi pi-ellipsis-v" />
            </template>
            <div class="bg-cover bg-center h-48" style="background-image: url('https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=2072')"></div>
          </BaseCard>
          <BaseCard title="No Padding" padding="none">
            <div class="bg-gradient-to-br from-primary to-hero h-48 flex items-center justify-center">
              <p class="text-white font-bold text-2xl">
                This content has no padding.
              </p>
            </div>
            <template #footer>
              <div class="text-sm text-muted">A custom footer without buttons.</div>
            </template>
          </BaseCard>
        </div>
      </div>

      <!-- BaseDialog -->
      <div class="gallery-section">
        <h2 class="gallery-section-title">
          BaseDialog
        </h2>
        <div class="flex flex-wrap items-center gap-4">
          <BaseButton variant="primary" @click="showDialog('small')">
            Open Small Dialog
          </BaseButton>
          <BaseButton variant="secondary" @click="showDialog('normal')">
            Open Normal Dialog
          </BaseButton>
          <BaseButton variant="default" @click="showDialog('large')">
            Open Large Dialog
          </BaseButton>
        </div>
      </div>

      <!-- BaseMessage -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4">BaseMessage</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 justify-items-start">
          <BaseMessage severity="success" title="Success">This is a success message.</BaseMessage>
          <BaseMessage severity="info" title="Information" :closable="true">
            This is a closable message.
          </BaseMessage>
          <BaseMessage severity="warn" title="Warning">This is a warning message.</BaseMessage>
          <BaseMessage severity="danger" title="Danger">This is a danger message.</BaseMessage>
        </div>
      </div>

      <!-- BaseDataTable -->
      <div class="gallery-section">
        <h2 class="gallery-section-title">
          BaseDataTable
        </h2>
        <div class="space-y-8">
          <BaseDataTable :value="tableData" paginator :rows="5" title="Users" variant="striped">
            <Column field="id" header="ID" sortable />
            <Column field="name" header="Name" sortable />
            <Column field="age" header="Age" sortable />
            <Column field="city" header="City" sortable />
            <Column field="status" header="Status">
              <template #body="{ data }">
                <BaseTag :severity="data.status" :value="data.status" />
              </template>
            </Column>
          </BaseDataTable>
        </div>
      </div>

      <!-- BaseHierarchicalSelect -->
      <div class="gallery-section">
        <h2 class="gallery-section-title">
          BaseHierarchicalSelect
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Unit Selection (Original Use Case)</h3>
            <BaseHierarchicalSelect
              v-model="selectedUnit"
              :options="unitOptions"
              placeholder="Select a unit"
              search-placeholder="Search units..."
              option-icon="pi pi-building"
            />
            <div class="mt-2 text-sm text-muted">
              Selected: {{ selectedUnit ? `${selectedUnit.parent} - ${selectedUnit.child.name}` : 'None' }}
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Category Selection (Generic Use Case)</h3>
            <BaseHierarchicalSelect
              v-model="selectedCategory"
              :options="categoryOptions"
              placeholder="Select a category"
              search-placeholder="Search categories..."
              option-icon="pi pi-tags"
              :option-label="(option) => option.name"
              :option-value="(option) => option.id"
            />
            <div class="mt-2 text-sm text-muted">
              Selected: {{ selectedCategory ? `${selectedCategory.parent} - ${selectedCategory.child.name}` : 'None' }}
            </div>
          </div>
        </div>
      </div>

      <!-- BaseTextarea -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4">BaseTextarea</h2>
        <div class="space-y-4">
          <BaseTextarea v-model="textareaValue" label="Textarea" :rows="4" />
          <BaseTextarea v-model="textareaValue" label="Invalid Textarea" :rows="4" invalid error-message="This field is required." />
          <BaseTextarea v-model="textareaValue" label="Readonly Textarea" :rows="4" readonly />
          <BaseTextarea v-model="textareaValue" label="Textarea with Help" :rows="4" help-text="This is some helpful text." />
        </div>
      </div>

      <!-- BaseMultiSelect -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4">BaseMultiSelect</h2>
        <div class="space-y-6">
          <!-- String Array Options -->
          <div>
            <h3 class="text-lg font-semibold mb-3">String Array Options</h3>
            <div class="space-y-4 max-w-md">
              <BaseMultiSelect
                v-model="selectedFruits"
                :options="multiSelectOptions"
                label="Basic MultiSelect (String Array)"
                placeholder="Select fruits"
                :filter="true"
                filter-placeholder="Search fruits..."
                help-text="String array - no optionLabel/optionValue needed"
              />
              <BaseMultiSelect
                v-model="selectedFruits"
                :options="multiSelectOptions"
                label="Custom Width (w-80)"
                placeholder="Select fruits"
                width="w-80"
                :filter="true"
                help-text="Custom width using Tailwind classes"
              />
            </div>
          </div>

          <!-- Object Array Options -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Object Array Options</h3>
            <div class="space-y-4 max-w-md">
              <BaseMultiSelect
                v-model="selectedCountries"
                :options="countryOptions"
                option-label="name"
                option-value="code"
                label="Countries (Object Array)"
                placeholder="Select countries"
                :filter="true"
                filter-placeholder="Search countries..."
                help-text="Object array with optionLabel='name' and optionValue='code'"
              />
              <BaseMultiSelect
                v-model="selectedCountries"
                :options="countryOptions"
                option-label="name"
                option-value="code"
                label="Limited Selection (Max 3)"
                placeholder="Select up to 3 countries"
                :filter="true"
                :selection-limit="3"
                :max-selected-labels="2"
                max-width="max-w-sm"
                help-text="Limited to 3 selections with custom max-width"
              />
            </div>
          </div>

          <!-- States -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Component States</h3>
            <div class="space-y-4 max-w-md">
              <BaseMultiSelect
                v-model="selectedFruits"
                :options="multiSelectOptions"
                label="Invalid MultiSelect"
                placeholder="Select fruits"
                :filter="true"
                invalid
                error-message="Please select at least one fruit"
              />
              <BaseMultiSelect
                v-model="selectedFruits"
                :options="multiSelectOptions"
                label="Disabled MultiSelect"
                placeholder="Select fruits"
                disabled
                help-text="This field is currently disabled"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- BaseCheckbox -->
      <div class="gallery-section">
        <h2 class="gallery-section-title">
          BaseCheckbox
        </h2>
        
        <!-- Simple test checkbox -->
        <div class="mb-4 p-4 border border-gray-200 rounded">
          <h3 class="text-sm font-medium mb-2">Debug Test:</h3>
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="testCheckbox" id="native-test">
            <label for="native-test">Native HTML Checkbox: {{ testCheckbox }}</label>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <Checkbox v-model="testPrimeCheckbox" inputId="prime-test" />
            <label for="prime-test">Raw PrimeVue Checkbox: {{ testPrimeCheckbox }}</label>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <BaseCheckbox v-model="testBaseCheckbox" label="Base Checkbox Test" />
            <span class="text-sm text-gray-600">Value: {{ testBaseCheckbox }}</span>
          </div>
        </div>

        <h3 class="gallery-subsection-title">Basic States</h3>
        <div class="space-y-6">
          <!-- Basic Checkboxes -->
          <div>
            <h3 class="gallery-subsection-title">Basic Checkboxes</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseCheckbox v-model="checkboxBasic" label="Basic checkbox" />
              <BaseCheckbox v-model="checkboxChecked" label="Pre-checked checkbox" />
              <BaseCheckbox v-model="checkboxDisabled" label="Disabled checkbox" disabled />
              <BaseCheckbox v-model="checkboxDisabledChecked" label="Disabled checked" disabled />
            </div>
          </div>

          <!-- Checkbox Variants -->
          <div>
            <h3 class="gallery-subsection-title">Variants</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <BaseCheckbox v-model="checkboxDefault" label="Default (Accent)" variant="default" />
              <BaseCheckbox v-model="checkboxPrimary" label="Primary" variant="primary" />
              <BaseCheckbox v-model="checkboxSecondary" label="Secondary" variant="secondary" />
              <BaseCheckbox v-model="checkboxSuccess" label="Success" variant="success" />
              <BaseCheckbox v-model="checkboxWarning" label="Warning" variant="warning" />
              <BaseCheckbox v-model="checkboxDanger" label="Danger" variant="danger" />
            </div>
          </div>

          <!-- Checkbox Sizes -->
          <div>
            <h3 class="gallery-subsection-title">Sizes</h3>
            <div class="flex items-center gap-6">
              <BaseCheckbox v-model="checkboxSmall" label="Small checkbox" size="small" />
              <BaseCheckbox v-model="checkboxNormal" label="Normal checkbox" size="normal" />
              <BaseCheckbox v-model="checkboxLarge" label="Large checkbox" size="large" />
            </div>
          </div>

          <!-- Checkbox Group -->
          <div>
            <h3 class="gallery-subsection-title">Checkbox Group</h3>
            <div class="space-y-2">
              <BaseCheckbox v-model="selectedHobbies" value="reading" label="Reading" />
              <BaseCheckbox v-model="selectedHobbies" value="cooking" label="Cooking" />
              <BaseCheckbox v-model="selectedHobbies" value="traveling" label="Traveling" />
              <BaseCheckbox v-model="selectedHobbies" value="photography" label="Photography" />
            </div>
            <p class="text-sm text-muted mt-2">
              Selected hobbies: {{ selectedHobbies.join(', ') || 'None' }}
            </p>
          </div>

          <!-- Validation States -->
          <div>
            <h3 class="gallery-subsection-title">Validation States</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseCheckbox 
                v-model="checkboxInvalid" 
                label="Terms and conditions" 
                :invalid="true"
                error-message="You must accept the terms and conditions"
              />
              <BaseCheckbox 
                v-model="checkboxWithHelp" 
                label="Subscribe to newsletter" 
                help-text="We'll send you updates about new features"
              />
            </div>
          </div>

          <!-- Indeterminate State -->
          <div>
            <h3 class="gallery-subsection-title">Indeterminate State</h3>
            <div class="space-y-2">
              <BaseCheckbox 
                v-model="selectAll" 
                :indeterminate="isIndeterminate"
                label="Select All Items"
                @change="handleSelectAllChange"
              />
              <div class="ml-6 space-y-2">
                <BaseCheckbox v-model="itemSelections" value="item1" label="Item 1" @change="updateSelectAll" />
                <BaseCheckbox v-model="itemSelections" value="item2" label="Item 2" @change="updateSelectAll" />
                <BaseCheckbox v-model="itemSelections" value="item3" label="Item 3" @change="updateSelectAll" />
              </div>
            </div>
          </div>

          <!-- Custom Label Slot -->
          <div>
            <h3 class="gallery-subsection-title">Custom Label</h3>
            <BaseCheckbox v-model="checkboxCustom">
              <template #label>
                <div class="flex items-center gap-2">
                  <i class="pi pi-star text-warning"></i>
                  <span>I agree to the <a href="#" class="text-primary hover:underline">terms and conditions</a></span>
                </div>
              </template>
            </BaseCheckbox>
          </div>
        </div>
      </div>

      <BaseDialog
        v-model:visible="isDialogVisible"
        :size="dialogSize"
        :loading="isDialogLoading"
        header="Confirm Action"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <p>
          Are you sure you want to proceed with this action? This step cannot be undone.
        </p>
      </BaseDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIconButton from '@/components/BaseIconButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseTextarea from '@/components/BaseTextarea.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseChip from '@/components/BaseChip.vue'
import BaseChipCluster from '@/components/BaseChipCluster.vue'
import BaseTabs, { type Tab } from '../components/BaseTabs.vue'
import BaseTag from '@/components/BaseTag.vue'
import BaseDialog from '@/components/BaseDialog.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseDataTable from '@/components/BaseDataTable.vue'
import Column from 'primevue/column'
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs.vue'
import BaseHierarchicalSelect, { type HierarchicalOptions, type SelectedHierarchicalValue } from '@/components/BaseHierarchicalSelect.vue'
import BaseMessage from '@/components/BaseMessage.vue'
import BaseMultiSelect from '@/components/BaseMultiSelect.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import Checkbox from 'primevue/checkbox'

const inputValue = ref('')
const textareaValue = ref('')
const selectValue = ref(null)
const selectedChips = ref(['figma'])
const selectedMultiChips = ref(['vue', 'tailwind'])
const isDialogVisible = ref(false)
const isDialogLoading = ref(false)
const dialogSize = ref<'small' | 'normal' | 'large'>('small')
const activeTab = ref(0)

const tabs = ref<Tab[]>([
  { title: 'Header 1', icon: 'pi pi-calendar' },
  { title: 'Header 2', icon: 'pi pi-user' },
  { title: 'Header 3', icon: 'pi pi-cog' },
  { title: 'Header 4', icon: 'pi pi-book' },
])

const fruits = ref([
  'Apple', 'Banana', 'Orange', 'Pear',
  'Melon', 'Grape', 'Plum', 'Kiwi', 'Lemon',
  'Coconut', 'Strawberry', 'Blueberry',
  'Raspberry', 'Rhubarb', 'Pineapple',
  'Satsuma', 'Lime', 'Mango', 'Cherry',
])

const selectOptions = ref([
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
])

const breadcrumbItems = ref([
  { label: 'Home', path: '#' },
  { label: 'Components', path: '#' },
  { label: 'Breadcrumbs', path: '#' },
])

// Sample hierarchical data for demonstration
const unitOptions = ref<HierarchicalOptions>({
  'Administrator': [
    { id: 'adm-1', name: 'Ekoxens Grundskola' },
    { id: 'adm-2', name: 'External Admin Element' },
    { id: 'adm-3', name: 'Insektskommunen' },
  ],
  'School Admin': [
    { id: 'sa-1', name: 'Ekoxens Grundskola' },
    { id: 'sa-2', name: 'Getingens Gymnasieskola' },
    { id: 'sa-3', name: 'Katedralskolan' },
  ],
  'Unit Admin': [
    { id: 'ua-1', name: 'Lågstadiesskolan' },
    { id: 'ua-2', name: 'Mellanstadieskolan' },
  ],
})

const categoryOptions = ref<HierarchicalOptions>({
  'Electronics': [
    { id: 'elec-1', name: 'Smartphones', icon: 'pi pi-mobile' },
    { id: 'elec-2', name: 'Laptops', icon: 'pi pi-desktop' },
    { id: 'elec-3', name: 'Tablets', icon: 'pi pi-tablet' },
  ],
  'Clothing': [
    { id: 'cloth-1', name: 'Men\'s Wear', icon: 'pi pi-user' },
    { id: 'cloth-2', name: 'Women\'s Wear', icon: 'pi pi-user' },
    { id: 'cloth-3', name: 'Kids\' Wear', icon: 'pi pi-user' },
  ],
  'Books': [
    { id: 'book-1', name: 'Fiction', icon: 'pi pi-book' },
    { id: 'book-2', name: 'Non-Fiction', icon: 'pi pi-book' },
    { id: 'book-3', name: 'Academic', icon: 'pi pi-book' },
  ],
})

const selectedUnit = ref<SelectedHierarchicalValue | null>({
  parent: 'Administrator',
  child: { id: 'adm-3', name: 'Insektskommunen' }
})

const selectedCategory = ref<SelectedHierarchicalValue | null>(null)

// BaseMultiSelect demo data
const selectedFruits = ref(['Banana', 'Orange'])
const multiSelectOptions = ref([
  'Apple', 'Banana', 'Orange', 'Pear', 'Melon', 'Grape', 'Plum', 'Kiwi', 'Lemon',
  'Coconut', 'Strawberry', 'Blueberry', 'Raspberry', 'Rhubarb', 'Pineapple',
  'Satsuma', 'Lime', 'Mango', 'Cherry'
])

// Additional demo data for object-based options
const selectedCountries = ref([{ code: 'US', name: 'United States' }])
const countryOptions = ref([
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IN', name: 'India' },
  { code: 'CN', name: 'China' }
])

const tableData = ref([
  { id: 1, name: 'John Doe', age: 32, city: 'New York', status: 'success' },
  { id: 2, name: 'Jane Smith', age: 28, city: 'London', status: 'warning' },
  { id: 3, name: 'Sam Green', age: 45, city: 'Paris', status: 'danger' },
  { id: 4, name: 'Julia Brown', age: 23, city: 'Tokyo', status: 'info' },
  { id: 5, name: 'Mike White', age: 55, city: 'Sydney', status: 'secondary' },
])

// BaseCheckbox demo data
const checkboxBasic = ref(false)
const checkboxChecked = ref(true)
const checkboxDisabled = ref(false)
const checkboxDisabledChecked = ref(true)
const checkboxDefault = ref(true)
const checkboxPrimary = ref(true)
const checkboxSecondary = ref(true)
const checkboxSuccess = ref(true)
const checkboxWarning = ref(true)
const checkboxDanger = ref(true)
const checkboxSmall = ref(true)
const checkboxNormal = ref(true)
const checkboxLarge = ref(true)
const selectedHobbies = ref(['reading', 'cooking'])
const checkboxInvalid = ref(false)
const checkboxWithHelp = ref(true)
const checkboxCustom = ref(false)

// Indeterminate checkbox demo
const selectAll = ref(false)
const itemSelections = ref(['item1'])
const isIndeterminate = computed(() => {
  return itemSelections.value.length > 0 && itemSelections.value.length < 3
})

function showDialog(size: 'small' | 'normal' | 'large') {
  dialogSize.value = size
  isDialogVisible.value = true
}

function handleConfirm() {
  isDialogLoading.value = true
  setTimeout(() => {
    isDialogLoading.value = false
    isDialogVisible.value = false
  }, 1500)
}

function handleCancel() {
  isDialogVisible.value = false
}

// BaseCheckbox indeterminate functionality
function handleSelectAllChange() {
  if (selectAll.value) {
    itemSelections.value = ['item1', 'item2', 'item3']
  } else {
    itemSelections.value = []
  }
}

function updateSelectAll() {
  const totalItems = 3
  const selectedCount = itemSelections.value.length
  
  if (selectedCount === 0) {
    selectAll.value = false
  } else if (selectedCount === totalItems) {
    selectAll.value = true
  } else {
    selectAll.value = false
  }
}

const testCheckbox = ref(false)
const testPrimeCheckbox = ref(false)
const testBaseCheckbox = ref(false)

</script>

<style scoped>
/* Use IST-BEM gallery utilities for conflict-free styling */
.gallery-section {
  @apply ist-gallery__section;
}

.gallery-section-title {
  @apply ist-gallery__title;
}

.gallery-subsection-title {
  @apply ist-gallery__subtitle;
}
</style> 