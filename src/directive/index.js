import { lazy } from './lazyload'

const directives = {
  lazy
}

export default {
  install (app) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  }
}
