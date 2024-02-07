import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/Layout/index'),
      meta: { hasCate: true },
      children: [
        {
          path: '',
          component: () => import('@/views/Home'),
          meta: { hasCate: true }
        },
        {
          path: 'song/:id',
          component: () => import('@/views/Song'),
          meta: { hasCate: true }
        },
        {
          path: 'toplist/:id',
          component: () => import('@/views/Toplist'),
          meta: { hasCate: true }
        },
        {
          path: 'artist/:id',
          component: () => import('@/views/Artist'),
          meta: { hasCate: true }
        },
        {
          path: 'user',
          component: () => import('@/views/User'),
          meta: { hasCate: false },
          children: [
            {
              path: 'home/:id',
              component: () => import('@/views/User/components/UserHome')
            },
            {
              path: 'update/:id?',
              component: () => import('@/views/User/components/UserUpdate')
            },
            {
              path: 'binding/:id?',
              component: () => import('@/views/User/components/UserBinding')
            }
          ]
        }
      ]
    }
  ]
})

export default router
