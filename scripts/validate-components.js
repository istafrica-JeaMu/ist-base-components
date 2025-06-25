#!/usr/bin/env node

/**
 * Component Validation Script
 * Validates that all components follow the cursorrules architecture standards
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_DIR = path.join(__dirname, '../src/components')
const REQUIRED_PATTERNS = {
  naming: /^Base[A-Z][a-zA-Z]*\.vue$/,
  propsInterface: /export interface.*Props \{/,
  emitsInterface: /export interface.*Emits \{/,
  slotsInterface: /export interface.*Slots \{/,
  scriptSetup: /<script setup lang="ts">/,
  defineProps: /defineProps</,
  defineEmits: /defineEmits</,
  withDefaults: /withDefaults/,
  componentDoc: /<!-- Component description -->/,
  ariaLabel: /aria-label/,
  dataTestid: /data-testid/,
  tailwindClasses: /class="[^"]*\b(bg-|text-|border-|p-|m-|h-|w-|flex|grid|rounded)/
}

const REQUIRED_PROPS = ['variant', 'size', 'disabled']
const REQUIRED_VARIANTS = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
const REQUIRED_SIZES = ['small', 'normal', 'large']

function validateComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const fileName = path.basename(filePath)
  const errors = []
  const warnings = []

  // Check naming convention
  if (!REQUIRED_PATTERNS.naming.test(fileName)) {
    errors.push(`❌ Component name "${fileName}" doesn't follow Base* naming convention`)
  }

  // Check required patterns
  Object.entries(REQUIRED_PATTERNS).forEach(([name, pattern]) => {
    if (!pattern.test(content)) {
      if (name === 'componentDoc' || name === 'ariaLabel') {
        warnings.push(`⚠️  Missing ${name} pattern`)
      } else {
        errors.push(`❌ Missing required ${name} pattern`)
      }
    }
  })

  // Check required props
  REQUIRED_PROPS.forEach(prop => {
    if (!content.includes(`${prop}?:`)) {
      errors.push(`❌ Missing required prop: ${prop}`)
    }
  })

  // Check variant values
  REQUIRED_VARIANTS.forEach(variant => {
    if (!content.includes(`'${variant}'`)) {
      warnings.push(`⚠️  Missing variant: ${variant}`)
    }
  })

  // Check size values
  REQUIRED_SIZES.forEach(size => {
    if (!content.includes(`'${size}'`)) {
      warnings.push(`⚠️  Missing size: ${size}`)
    }
  })

  // Check TypeScript interfaces
  if (!content.includes('export interface') || !content.includes('Props {')) {
    errors.push('❌ Missing TypeScript Props interface')
  }

  // Check accessibility
  if (!content.includes('aria-') && !content.includes('role=')) {
    warnings.push('⚠️  No accessibility attributes found')
  }

  // Check testing attributes
  if (!content.includes('data-testid')) {
    warnings.push('⚠️  No testing attributes found')
  }

  // Check Tailwind usage
  if (!REQUIRED_PATTERNS.tailwindClasses.test(content)) {
    errors.push('❌ No Tailwind CSS classes detected')
  }

  return { errors, warnings }
}

function validateAllComponents() {
  console.log('🔍 Validating component architecture...\n')
  
  const files = fs.readdirSync(COMPONENTS_DIR)
    .filter(file => file.endsWith('.vue'))
    .filter(file => file.startsWith('Base'))

  if (files.length === 0) {
    console.log('❌ No Base components found!')
    process.exit(1)
  }

  let totalErrors = 0
  let totalWarnings = 0

  files.forEach(file => {
    const filePath = path.join(COMPONENTS_DIR, file)
    const { errors, warnings } = validateComponent(filePath)
    
    console.log(`📄 ${file}`)
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('  ✅ All checks passed')
    } else {
      errors.forEach(error => console.log(`  ${error}`))
      warnings.forEach(warning => console.log(`  ${warning}`))
      totalErrors += errors.length
      totalWarnings += warnings.length
    }
    
    console.log('')
  })

  // Summary
  console.log('📊 Validation Summary:')
  console.log(`  Components checked: ${files.length}`)
  console.log(`  Total errors: ${totalErrors}`)
  console.log(`  Total warnings: ${totalWarnings}`)

  if (totalErrors > 0) {
    console.log('\n❌ Validation failed! Please fix the errors above.')
    process.exit(1)
  } else if (totalWarnings > 0) {
    console.log('\n⚠️  Validation passed with warnings. Consider addressing them.')
  } else {
    console.log('\n✅ All components pass validation!')
  }
}

// Run validation
validateAllComponents() 