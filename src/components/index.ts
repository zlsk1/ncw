import Pic from './Pic.vue'
import Card from './Card.vue'
import type { App } from 'vue'

const components = [
  Pic,
  Card
]

export default {
  install: (app: App) => {
    components.forEach(component => {
      // 在app上进行扩展，app提供 component directive 函数
      // 如果要挂载原型 app.config.globalProperties 方式
      app.component(component.name as string, component)
    })
  }
}
