import { useIntersectionObserver } from '@vueuse/core'
import type { DirectiveBinding } from 'vue'

export const lazy = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = binding.value
        }
      }
    )
  }
}
