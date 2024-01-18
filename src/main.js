import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import directive from './directive'

import '@/styles/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(directive)

app.mount('#app')
