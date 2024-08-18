import type { App } from 'vue'
import { lazy } from './lazyload'

const directives = {
  lazy
}

export default {
  install(app: App) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key as keyof typeof directives])
    })
  }
}
