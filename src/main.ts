import './assets/main.css'

import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { registerLayouts } from './utils/autoImport'

const app = createApp(App)

import SvgIcon from './components/SvgIcon.vue'

app.component('SvgIcon', SvgIcon)

app.use(createPinia())
app.use(router)

// Auto register layouts for folder layouts
registerLayouts(app)

app.mount('#app')
