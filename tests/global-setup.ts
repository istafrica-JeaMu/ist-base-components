import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  // Set up global configuration for accessibility testing
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  // Inject axe-core for accessibility testing
  await page.addInitScript(() => {
    // Configure axe-core for comprehensive accessibility testing
    if (typeof window !== 'undefined' && (window as any).axe) {
      (window as any).axe.configure({
        rules: {
          // Enable all WCAG 2.1 AA rules
          'color-contrast': { enabled: true },
          'keyboard-navigation': { enabled: true },
          'focus-management': { enabled: true },
          'aria-labels': { enabled: true },
          'semantic-markup': { enabled: true },
        },
        tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      })
    }
  })
  
  await browser.close()
}

export default globalSetup 