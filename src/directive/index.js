import { clickOutside } from './clickOutside'
import { lazy } from './lazyload'

const directives = {
  clickOutside,
  lazy
}

export default {
  install (app) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  }
}
