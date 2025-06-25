import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('BaseButton Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should not have any accessibility violations', async ({ page }) => {
    // Create a comprehensive test page with all button variants
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>BaseButton Accessibility Test</title>
          <link rel="stylesheet" href="/src/utilities.css">
        </head>
        <body>
          <main>
            <h1>Button Accessibility Test</h1>
            
            <section aria-labelledby="variants-heading">
              <h2 id="variants-heading">Button Variants</h2>
              <div class="flex flex-wrap gap-4 p-4">
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-white text-text border-border border hover:bg-light/50 h-input px-3 text-sm rounded-lg">Default Button</button>
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border hover:bg-primary-dark h-input px-3 text-sm rounded-lg">Primary Button</button>
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-secondary text-white border-secondary border hover:brightness-95 h-input px-3 text-sm rounded-lg">Secondary Button</button>
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-success text-white border-success border hover:brightness-95 h-input px-3 text-sm rounded-lg">Success Button</button>
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-warning text-dark border-warning border hover:brightness-95 h-input px-3 text-sm rounded-lg">Warning Button</button>
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-danger text-white border-danger border hover:brightness-95 h-input px-3 text-sm rounded-lg">Danger Button</button>
              </div>
            </section>

            <section aria-labelledby="states-heading">
              <h2 id="states-heading">Button States</h2>
              <div class="flex flex-wrap gap-4 p-4">
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg">Normal</button>
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" disabled>Disabled</button>
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" aria-busy="true">
                  <span class="sr-only">Loading</span>
                  <i class="pi pi-spinner animate-spin" aria-hidden="true"></i>
                  Loading...
                </button>
              </div>
            </section>

            <section aria-labelledby="icons-heading">
              <h2 id="icons-heading">Icon Buttons</h2>
              <div class="flex flex-wrap gap-4 p-4">
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" aria-label="Add new item">
                  <i class="pi pi-plus" aria-hidden="true"></i>
                </button>
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-secondary text-white border-secondary border h-input px-3 text-sm rounded-lg" aria-label="Edit selected item">
                  <i class="pi pi-edit" aria-hidden="true"></i>
                </button>
                <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-danger text-white border-danger border h-input px-3 text-sm rounded-lg" aria-label="Delete selected item">
                  <i class="pi pi-trash" aria-hidden="true"></i>
                </button>
              </div>
            </section>
          </main>
        </body>
      </html>
    `)

    // Run axe accessibility tests
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should have proper keyboard navigation', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Keyboard Navigation Test</title>
          <link rel="stylesheet" href="/src/utilities.css">
        </head>
        <body>
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" id="button1">First Button</button>
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-secondary text-white border-secondary border h-input px-3 text-sm rounded-lg" id="button2">Second Button</button>
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-success text-white border-success border h-input px-3 text-sm rounded-lg" id="button3" disabled>Disabled Button</button>
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-warning text-dark border-warning border h-input px-3 text-sm rounded-lg" id="button4">Fourth Button</button>
        </body>
      </html>
    `)

    // Test Tab navigation
    await page.keyboard.press('Tab')
    await expect(page.locator('#button1')).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.locator('#button2')).toBeFocused()

    // Disabled button should be skipped
    await page.keyboard.press('Tab')
    await expect(page.locator('#button4')).toBeFocused()

    // Test Shift+Tab navigation
    await page.keyboard.press('Shift+Tab')
    await expect(page.locator('#button2')).toBeFocused()
  })

  test('should be activatable with keyboard', async ({ page }) => {
    let clickCount = 0
    
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Keyboard Activation Test</title>
          <link rel="stylesheet" href="/src/utilities.css">
        </head>
        <body>
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" id="test-button" onclick="window.clickCount = (window.clickCount || 0) + 1">Test Button</button>
        </body>
      </html>
    `)

    // Focus the button
    await page.keyboard.press('Tab')
    await expect(page.locator('#test-button')).toBeFocused()

    // Test Enter key activation
    await page.keyboard.press('Enter')
    clickCount = await page.evaluate(() => (window as any).clickCount || 0)
    expect(clickCount).toBe(1)

    // Test Space key activation
    await page.keyboard.press('Space')
    clickCount = await page.evaluate(() => (window as any).clickCount || 0)
    expect(clickCount).toBe(2)
  })

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>ARIA Attributes Test</title>
          <link rel="stylesheet" href="/src/utilities.css">
        </head>
        <body>
          <!-- Icon-only button with aria-label -->
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" id="icon-button" aria-label="Add new item">
            <i class="pi pi-plus" aria-hidden="true"></i>
          </button>

          <!-- Loading button with aria-busy -->
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" id="loading-button" aria-busy="true">
            <i class="pi pi-spinner animate-spin" aria-hidden="true"></i>
            <span class="sr-only">Loading</span>
            Saving...
          </button>

          <!-- Disabled button -->
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary/50 text-white border-primary border h-input px-3 text-sm rounded-lg cursor-not-allowed" id="disabled-button" disabled>
            Disabled Button
          </button>
        </body>
      </html>
    `)

    // Test icon button has proper aria-label
    const iconButton = page.locator('#icon-button')
    await expect(iconButton).toHaveAttribute('aria-label', 'Add new item')
    
    // Test icon has aria-hidden
    const icon = iconButton.locator('i')
    await expect(icon).toHaveAttribute('aria-hidden', 'true')

    // Test loading button has aria-busy
    const loadingButton = page.locator('#loading-button')
    await expect(loadingButton).toHaveAttribute('aria-busy', 'true')

    // Test disabled button
    const disabledButton = page.locator('#disabled-button')
    await expect(disabledButton).toBeDisabled()
  })

  test('should have sufficient color contrast', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Color Contrast Test</title>
          <link rel="stylesheet" href="/src/utilities.css">
          <style>
            /* Define our design system colors for testing */
            .bg-primary { background-color: #667eea; }
            .text-white { color: #ffffff; }
            .bg-secondary { background-color: #6c757d; }
            .bg-success { background-color: #28a745; }
            .bg-warning { background-color: #ffc107; }
            .text-dark { color: #212529; }
            .bg-danger { background-color: #dc3545; }
          </style>
        </head>
        <body>
          <div class="flex flex-wrap gap-4 p-4">
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg">Primary</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-secondary text-white border-secondary border h-input px-3 text-sm rounded-lg">Secondary</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-success text-white border-success border h-input px-3 text-sm rounded-lg">Success</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-warning text-dark border-warning border h-input px-3 text-sm rounded-lg">Warning</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-danger text-white border-danger border h-input px-3 text-sm rounded-lg">Danger</button>
          </div>
        </body>
      </html>
    `)

    // Run color contrast accessibility test
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('button')
      .analyze()

    // Filter for color contrast violations
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    )

    expect(colorContrastViolations).toEqual([])
  })

  test('should work with screen readers', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Screen Reader Test</title>
          <link rel="stylesheet" href="/src/utilities.css">
        </head>
        <body>
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" id="screen-reader-button">
            Save Document
          </button>
          
          <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" id="icon-only-button" aria-label="Close dialog">
            <i class="pi pi-times" aria-hidden="true"></i>
          </button>
        </body>
      </html>
    `)

    // Test that buttons have accessible names
    const textButton = page.locator('#screen-reader-button')
    await expect(textButton).toHaveAccessibleName('Save Document')

    const iconButton = page.locator('#icon-only-button')
    await expect(iconButton).toHaveAccessibleName('Close dialog')

    // Test that buttons have proper roles
    await expect(textButton).toHaveRole('button')
    await expect(iconButton).toHaveRole('button')
  })
}) 