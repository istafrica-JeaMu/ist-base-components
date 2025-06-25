import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import App from './App.vue'

// 1. PrimeVue Theme (Lowest Precedence)
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// 2. Our Tailwind Styles (Highest Precedence)
import './assets/tailwind.css'

// Create Vue app
const app = createApp(App)

// Use PrimeVue
app.use(PrimeVue, {
  ripple: true,
  inputStyle: 'outlined'
})

// Register PrimeVue directives
app.directive('tooltip', Tooltip)

// Mount the app
app.mount('#app') 