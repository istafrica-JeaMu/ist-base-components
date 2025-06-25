import { beforeAll, vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock PrimeVue components for testing
vi.mock('primevue/inputtext', () => ({
  default: {
    name: 'InputText',
    template: '<input v-bind="$attrs" v-on="$listeners" />'
  }
}))

vi.mock('primevue/button', () => ({
  default: {
    name: 'Button',
    template: '<button v-bind="$attrs" v-on="$listeners"><slot /></button>'
  }
}))

vi.mock('primevue/card', () => ({
  default: {
    name: 'Card',
    template: '<div class="p-card"><slot /></div>'
  }
}))

vi.mock('primevue/dialog', () => ({
  default: {
    name: 'Dialog',
    template: '<div v-if="visible" class="p-dialog"><slot /></div>',
    props: ['visible']
  }
}))

vi.mock('primevue/textarea', () => ({
  default: {
    name: 'Textarea',
    template: '<textarea v-bind="$attrs" v-on="$listeners"></textarea>'
  }
}))

vi.mock('primevue/iconfield', () => ({
  default: {
    name: 'IconField',
    template: '<div class="p-iconfield"><slot /></div>'
  }
}))

vi.mock('primevue/inputicon', () => ({
  default: {
    name: 'InputIcon',
    template: '<i v-bind="$attrs" v-on="$listeners"></i>'
  }
}))

// Global test utilities
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
}) 