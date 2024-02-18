import { createRouter, createWebHistory } from 'vue-router'
import { hasProfile } from '@/utils/index'

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
          path: 'artist',
          component: () => import('@/views/Artist'),
          meta: { hasCate: true },
          children: [
            {
              path: ':id',
              component: () => import('@/views/Artist'),
              meta: { hasCate: true }
            },
            {
              path: 'album/:id',
              component: () => import('@/views/Artist/components/ArtistAlbum')
            },
            {
              path: 'mv/:id',
              component: () => import('@/views/Artist/components/RelativeMV')
            },
            {
              path: 'desc/:id',
              component: () => import('@/views/Artist/components/ArtistProduce')
            }
          ]
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
              component: () => import('@/views/User/components/UserUpdate'),
              meta: { requireLogin: true }
            },
            {
              path: 'binding/:id?',
              component: () => import('@/views/User/components/UserBinding')
            },
            {
              path: 'level',
              component: () => import('@/views/User/components/UserLevel'),
              meta: { requireLogin: true }
            }
          ]
        },
        {
          path: 'msg',
          component: () => import('@/views/Msg'),
          meta: { hasCate: false, requireLogin: true },
          children: [
            {
              path: 'at',
              component: () => import('@/views/Msg/components/MsgAt'),
              meta: { requireLogin: true }
            },
            {
              path: 'private',
              component: () => import('@/views/Msg/components/MsgPrivate'),
              meta: { requireLogin: true }
            },
            {
              path: 'comment',
              component: () => import('@/views/Msg/components/MsgComment'),
              meta: { requireLogin: true }
            },
            {
              path: 'notify',
              component: () => import('@/views/Msg/components/MsgNotify'),
              meta: { requireLogin: true }
            },
            {
              path: 'private_detail',
              component: () => import('@/views/Msg/components/PrivateDetail'),
              meta: { requireLogin: true }
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
        },
        {
          path: 'login',
          component: () => import('@/views/Login/LoginQrcode.vue'),
          meta: { hasCate: false }
        },
        {
          path: 'myMusic',
          component: () => import('@/views/MyMusic'),
          meta: { hasCate: false, requireLogin: true }
        },
        {
          path: 'discover',
          component: () => import('@/views/Discover'),
          meta: { hasCate: true },
          children: [
            {
              path: 'toplist/:id?',
              component: () => import('@/views/Discover/components/Toplist'),
              meta: { hasCate: true }
            },
            {
              path: 'artist',
              component: () => import('@/views/Discover/components/Artist'),
              meta: { hasCate: true },
              children: [
                {
                  path: 'signed',
                  component: () => import('@/views/Discover/components/Artist'),
                  meta: { hasCate: true }
                },
                {
                  path: 'cate',
                  component: () => import('@/views/Discover/components/Artist'),
                  meta: { hasCate: true }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    if (hasProfile()) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
