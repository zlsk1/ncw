import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import directive from './directive'
import 'element-plus/theme-chalk/el-message.css' // 解决自动导入后的样式丢失问题

import '@/styles/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(directive)

app.mount('#app')
