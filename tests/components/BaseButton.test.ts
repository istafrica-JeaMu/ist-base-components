import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'

// Mock BaseBadge component
vi.mock('@/components/BaseBadge.vue', () => ({
  default: {
    name: 'BaseBadge',
    template: '<span class="badge" :data-value="value">{{ value }}</span>',
    props: ['value', 'size', 'severity']
  }
}))

describe('BaseButton', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.find('[data-testid="base-button"]').exists()).toBe(true)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('renders label prop correctly', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Test Button' }
      })
      expect(wrapper.text()).toContain('Test Button')
    })

    it('renders slot content over label prop', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Prop Label' },
        slots: { default: 'Slot Content' }
      })
      expect(wrapper.text()).toContain('Slot Content')
      expect(wrapper.text()).not.toContain('Prop Label')
    })

    it('renders left icon when provided', () => {
      const wrapper = mount(BaseButton, {
        props: { leftIcon: 'pi pi-home', label: 'Home' }
      })
      const icon = wrapper.find('.pi-home')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mr-2')
    })

    it('renders right icon when provided', () => {
      const wrapper = mount(BaseButton, {
        props: { rightIcon: 'pi pi-arrow-right', label: 'Next' }
      })
      const icon = wrapper.find('.pi-arrow-right')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('ml-2')
    })

    it('renders badge when provided', () => {
      const wrapper = mount(BaseButton, {
        props: { badge: 5, label: 'Messages' }
      })
      const badge = wrapper.findComponent({ name: 'BaseBadge' })
      expect(badge.exists()).toBe(true)
      expect(badge.props('value')).toBe(5)
    })
  })

  describe('Variants', () => {
    const variants = ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'hero'] as const

    variants.forEach(variant => {
      it(`applies ${variant} variant classes correctly`, () => {
        const wrapper = mount(BaseButton, {
          props: { variant, label: 'Test' }
        })
        expect(wrapper.classes()).toContain(`bg-${variant === 'default' ? 'white' : variant}`)
      })
    })
  })

  describe('Sizes', () => {
    const sizes = ['small', 'normal', 'large'] as const

    sizes.forEach(size => {
      it(`applies ${size} size classes correctly`, () => {
        const wrapper = mount(BaseButton, {
          props: { size, label: 'Test' }
        })
        const expectedHeight = {
          small: 'h-8',
          normal: 'h-input',
          large: 'h-12'
        }[size]
        expect(wrapper.classes()).toContain(expectedHeight)
      })
    })
  })

  describe('States', () => {
    it('disables button when disabled prop is true', () => {
      const wrapper = mount(BaseButton, {
        props: { disabled: true, label: 'Disabled' }
      })
      expect(wrapper.element).toBeDisabled()
      expect(wrapper.classes()).toContain('disabled:cursor-not-allowed')
    })

    it('shows loading state correctly', () => {
      const wrapper = mount(BaseButton, {
        props: { loading: true, label: 'Loading' }
      })
      expect(wrapper.element).toBeDisabled()
      expect(wrapper.find('.pi-spinner').exists()).toBe(true)
      expect(wrapper.find('.animate-spin').exists()).toBe(true)
      expect(wrapper.find('.opacity-0').exists()).toBe(true)
    })

    it('shows loading spinner with correct aria-busy attribute', () => {
      const wrapper = mount(BaseButton, {
        props: { loading: true, label: 'Loading' }
      })
      expect(wrapper.element.getAttribute('aria-busy')).toBe('true')
    })
  })

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Click me' }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
      expect(wrapper.emitted('click')?.[0][0]).toBeInstanceOf(MouseEvent)
    })

    it('does not emit click when disabled', async () => {
      const wrapper = mount(BaseButton, {
        props: { disabled: true, label: 'Disabled' }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click when loading', async () => {
      const wrapper = mount(BaseButton, {
        props: { loading: true, label: 'Loading' }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Accessibility', () => {
    it('has proper aria-label when provided', () => {
      const wrapper = mount(BaseButton, {
        props: { ariaLabel: 'Custom aria label' }
      })
      expect(wrapper.element.getAttribute('aria-label')).toBe('Custom aria label')
    })

    it('falls back to label for aria-label', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Button Label' }
      })
      expect(wrapper.element.getAttribute('aria-label')).toBe('Button Label')
    })

    it('has default aria-label when no label provided', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.element.getAttribute('aria-label')).toBe('Button')
    })

    it('has proper data-testid for testing', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.find('[data-testid="base-button"]').exists()).toBe(true)
    })
  })

  describe('Integration', () => {
    it('works with all props combined', () => {
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Complex Button',
          variant: 'primary',
          size: 'large',
          leftIcon: 'pi pi-home',
          rightIcon: 'pi pi-arrow-right',
          badge: 3,
          ariaLabel: 'Complex button with badge'
        }
      })

      expect(wrapper.text()).toContain('Complex Button')
      expect(wrapper.classes()).toContain('bg-primary')
      expect(wrapper.classes()).toContain('h-12')
      expect(wrapper.find('.pi-home').exists()).toBe(true)
      expect(wrapper.find('.pi-arrow-right').exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'BaseBadge' }).exists()).toBe(true)
      expect(wrapper.element.getAttribute('aria-label')).toBe('Complex button with badge')
    })
  })
}) 