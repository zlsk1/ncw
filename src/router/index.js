import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/Layout/index'),
      children: [
        {
          path: '',
          component: () => import('@/views/Home')
        },
        {
          path: 'song/:id',
          component: () => import('@/views/Song')
        },
        {
          path: 'toplist/:id?',
          component: () => import('@/views/Toplist')
        }
      ]
    }
  ]
})

export default router
