// Base Components Library
// Export all base components that extend PrimeVue

// Library installation function
import type { App } from 'vue'
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
  BaseMultiSelect,
  BaseSelect,
  BaseSideMenu,
  BaseTag,
  BaseTabs,
  BaseTextarea
}

// Export types
export type {
  AccordionItem,
  BaseAccordionProps
} from './components/BaseAccordion.vue'

export type {
  HierarchicalOption,
  HierarchicalOptions,
  SelectedHierarchicalValue,
  BaseHierarchicalSelectProps
} from './components/BaseHierarchicalSelect.vue'

export type {
  BreadcrumbItem,
  BaseBreadcrumbsProps
} from './components/BaseBreadcrumbs.vue'

export type {
  MenuItem,
  BaseSideMenuProps
} from './components/BaseSideMenu.vue'

export type {
  BaseMultiSelectProps,
  BaseMultiSelectEmits,
  BaseMultiSelectSlots
} from './components/BaseMultiSelect.vue'

export type {
  BaseCheckboxProps,
  BaseCheckboxEmits,
  BaseCheckboxSlots
} from './components/BaseCheckbox.vue'