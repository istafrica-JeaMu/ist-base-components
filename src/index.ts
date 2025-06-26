// Base Components Library
// Export all base components that extend PrimeVue

// Library installation function
import type { App } from 'vue'

// Import Tailwind CSS with IST-BEM utilities to ensure they are included in the build
import './assets/tailwind.css'

import BaseAccordion from './components/BaseAccordion.vue'
import BaseBadge from './components/BaseBadge.vue'
import BaseBreadcrumbs from './components/BaseBreadcrumbs.vue'
import BaseButton from './components/BaseButton.vue'
import BaseCard from './components/BaseCard.vue'
import BaseCheckbox from './components/BaseCheckbox.vue'
import BaseChip from './components/BaseChip.vue'
import BaseChipCluster from './components/BaseChipCluster.vue'
import BaseDataTable from './components/BaseDataTable.vue'
import BaseDialog from './components/BaseDialog.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseHierarchicalSelect from './components/BaseHierarchicalSelect.vue'
import BaseIconButton from './components/BaseIconButton.vue'
import BaseInput from './components/BaseInput.vue'
import BaseMessage from './components/BaseMessage.vue'
import BaseMultiSelect from './components/BaseMultiSelect.vue'
import BaseSelect from './components/BaseSelect.vue'
import BaseSideMenu from './components/BaseSideMenu.vue'
import BaseTag from './components/BaseTag.vue'
import BaseTabs from './components/BaseTabs.vue'
import BaseTextarea from './components/BaseTextarea.vue'

const components = {
  BaseAccordion,
  BaseBadge,
  BaseBreadcrumbs,
  BaseButton,
  BaseCard,
  BaseCheckbox,
  BaseChip,
  BaseChipCluster,
  BaseDataTable,
  BaseDialog,
  BaseHeader,
  BaseHierarchicalSelect,
  BaseIconButton,
  BaseInput,
  BaseMessage,
  BaseMultiSelect,
  BaseSelect,
  BaseSideMenu,
  BaseTag,
  BaseTabs,
  BaseTextarea
}

export default {
  install: (app: App) => {
    // Register all components globally
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}

// Export individual components
export {
  BaseAccordion,
  BaseBadge,
  BaseBreadcrumbs,
  BaseButton,
  BaseCard,
  BaseCheckbox,
  BaseChip,
  BaseChipCluster,
  BaseDataTable,
  BaseDialog,
  BaseHeader,
  BaseHierarchicalSelect,
  BaseIconButton,
  BaseInput,
  BaseMessage,
  BaseMultiSelect,
  BaseSelect,
  BaseSideMenu,
  BaseTag,
  BaseTabs,
  BaseTextarea
}