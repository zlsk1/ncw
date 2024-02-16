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
        },
        {
          path: 'msg',
          component: () => import('@/views/Msg'),
          meta: { hasCate: false },
          children: [
            {
              path: 'at',
              component: () => import('@/views/Msg/components/MsgAt')
            },
            {
              path: 'private',
              component: () => import('@/views/Msg/components/MsgPrivate')
            },
            {
              path: 'comment',
              component: () => import('@/views/Msg/components/MsgComment')
            },
            {
              path: 'notify',
              component: () => import('@/views/Msg/components/MsgNotify')
            },
            {
              path: 'private_detail',
              component: () => import('@/views/Msg/components/PrivateDetail')
            }
          ]
        },
        {
          path: 'playlist/:id',
          component: () => import('@/views/Playlist'),
          meta: { hasCate: true }
        },
        {
          path: 'search/:k/:type',
          component: () => import('@/views/Search'),
          meta: { hasCate: false }
        },
        {
          path: 'album/:id',
          component: () => import('@/views/Album'),
          meta: { hasCate: true }
        }
      ]
    }
  ]
})

export default router
