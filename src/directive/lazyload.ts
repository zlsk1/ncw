import { useIntersectionObserver } from '@vueuse/core'
export const lazy = {
  mounted (el, binding) {
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
