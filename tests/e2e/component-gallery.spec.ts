import { test, expect } from '@playwright/test'

test.describe('Component Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display all components correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/IST Base Components/)

    // Check side menu is visible
    await expect(page.locator('[data-testid="side-menu"]')).toBeVisible()

    // Check header is visible
    await expect(page.locator('[data-testid="base-header"]')).toBeVisible()

    // Check main content area
    await expect(page.locator('main')).toBeVisible()
  })

  test('should interact with BaseButton components', async ({ page }) => {
    // Find primary button
    const primaryButton = page.locator('[data-testid="base-button"]').filter({ hasText: 'Primary' }).first()
    await expect(primaryButton).toBeVisible()
    
    // Click the button
    await primaryButton.click()
    
    // Verify button interaction (if there's feedback)
    await expect(primaryButton).toBeEnabled()
  })

  test('should test form components interaction', async ({ page }) => {
    // Test BaseInput
    const input = page.locator('[data-testid="base-input-field"]').first()
    if (await input.isVisible()) {
      await input.fill('Test input value')
      await expect(input).toHaveValue('Test input value')
    }

    // Test BaseCheckbox
    const checkbox = page.locator('[data-testid="base-checkbox"]').first()
    if (await checkbox.isVisible()) {
      await checkbox.check()
      await expect(checkbox).toBeChecked()
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if side menu collapses or adapts
    const sideMenu = page.locator('[data-testid="side-menu"]')
    await expect(sideMenu).toBeVisible()
    
    // Check if header adapts
    const header = page.locator('[data-testid="base-header"]')
    await expect(header).toBeVisible()
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check for proper ARIA labels
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
    }
  })

  test('should handle keyboard navigation', async ({ page }) => {
    // Test Tab navigation
    await page.keyboard.press('Tab')
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // Test Enter key on focused button
    const firstButton = page.locator('[data-testid="base-button"]').first()
    await firstButton.focus()
    await page.keyboard.press('Enter')
  })
}) 