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
          path: 'toplist/:id',
          component: () => import('@/views/Toplist')
        },
        {
          path: 'artist/:id',
          component: () => import('@/views/Artist')
        },
        {
          path: 'user',
          component: () => import('@/views/User'),
          children: [
            {
              path: 'home/:id',
              component: () => import('@/views/User/components/UserHome')
            }
          ]
        }
      ]
    }
  ]
})

export default router
