import { test, expect } from '@playwright/test'

test.describe('BaseButton Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the component gallery
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should match visual snapshot for all variants', async ({ page }) => {
    // Create a test page with all button variants
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/src/utilities.css">
          <style>
            body { font-family: Inter, sans-serif; padding: 20px; background: white; }
            .test-container { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
          </style>
        </head>
        <body>
          <div class="test-container">
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-white text-text border-border border hover:bg-light/50 h-input px-3 text-sm rounded-lg">Default</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border hover:bg-primary-dark h-input px-3 text-sm rounded-lg">Primary</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-secondary text-white border-secondary border hover:brightness-95 h-input px-3 text-sm rounded-lg">Secondary</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-success text-white border-success border hover:brightness-95 h-input px-3 text-sm rounded-lg">Success</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-warning text-dark border-warning border hover:brightness-95 h-input px-3 text-sm rounded-lg">Warning</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-danger text-white border-danger border hover:brightness-95 h-input px-3 text-sm rounded-lg">Danger</button>
          </div>
        </body>
      </html>
    `)

    // Take screenshot of all variants
    await expect(page.locator('.test-container')).toHaveScreenshot('button-variants.png')
  })

  test('should match visual snapshot for all sizes', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/src/utilities.css">
          <style>
            body { font-family: Inter, sans-serif; padding: 20px; background: white; }
            .test-container { display: flex; gap: 16px; align-items: center; }
          </style>
        </head>
        <body>
          <div class="test-container">
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border hover:bg-primary-dark h-8 px-3 text-sm rounded-md">Small</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border hover:bg-primary-dark h-input px-3 text-sm rounded-lg">Normal</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border hover:bg-primary-dark h-12 px-5 text-lg rounded-lg">Large</button>
          </div>
        </body>
      </html>
    `)

    await expect(page.locator('.test-container')).toHaveScreenshot('button-sizes.png')
  })

  test('should match visual snapshot for loading states', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/src/utilities.css">
          <style>
            body { font-family: Inter, sans-serif; padding: 20px; background: white; }
            .test-container { display: flex; gap: 16px; align-items: center; }
            @keyframes spin { to { transform: rotate(360deg); } }
            .animate-spin { animation: spin 1s linear infinite; }
          </style>
        </head>
        <body>
          <div class="test-container">
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg">
              Normal
            </button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg" disabled>
              <i class="absolute pi pi-spinner animate-spin text-lg"></i>
              <span class="opacity-0">Loading</span>
            </button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary/50 text-white border-primary border h-input px-3 text-sm rounded-lg cursor-not-allowed" disabled>
              Disabled
            </button>
          </div>
        </body>
      </html>
    `)

    await expect(page.locator('.test-container')).toHaveScreenshot('button-states.png')
  })

  test('should match visual snapshot on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/src/utilities.css">
          <style>
            body { font-family: Inter, sans-serif; padding: 20px; background: white; }
            .test-container { display: flex; flex-direction: column; gap: 16px; }
          </style>
        </head>
        <body>
          <div class="test-container">
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-12 px-5 text-lg rounded-lg w-full">Full Width Button</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-secondary text-white border-secondary border h-input px-3 text-sm rounded-lg">
              <i class="pi pi-home text-base mr-2"></i>
              With Icon
            </button>
          </div>
        </body>
      </html>
    `)

    await expect(page.locator('.test-container')).toHaveScreenshot('button-mobile.png')
  })

  test('should handle focus states correctly', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/src/utilities.css">
          <style>
            body { font-family: Inter, sans-serif; padding: 20px; background: white; }
            .test-container { display: flex; gap: 16px; }
          </style>
        </head>
        <body>
          <div class="test-container">
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-primary text-white border-primary border h-input px-3 text-sm rounded-lg">First</button>
            <button class="relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 bg-secondary text-white border-secondary border h-input px-3 text-sm rounded-lg">Second</button>
          </div>
        </body>
      </html>
    `)

    // Focus the first button and take screenshot
    await page.keyboard.press('Tab')
    await expect(page.locator('.test-container')).toHaveScreenshot('button-focus.png')
  })
}) 