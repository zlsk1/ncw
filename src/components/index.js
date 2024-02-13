import Pic from './Pic'
import Card from './Card'

const components = [
  Pic,
  Card
]

export default {
  install: app => {
    components.forEach(component => {
      // 在app上进行扩展，app提供 component directive 函数
      // 如果要挂载原型 app.config.globalProperties 方式
      app.component(component.name, component)
    })
  }
}
