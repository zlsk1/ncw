import { createRouter, createWebHistory } from 'vue-router'
import { hasProfile } from '@/utils/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/Layout/index.vue'),
      meta: { hasCate: true },
      children: [
        {
          path: '',
          component: () => import('@/views/Home/index.vue'),
          meta: { hasCate: true }
        },
        {
          path: 'song/:id',
          component: () => import('@/views/Song/index.vue'),
          meta: { hasCate: true }
        },
        {
          path: 'artist',
          component: () => import('@/views/Artist/index.vue'),
          meta: { hasCate: true },
          children: [
            {
              path: ':id',
              component: () => import('@/views/Artist/index.vue'),
              meta: { hasCate: true }
            },
            {
              path: 'album/:id',
              component: () => import('@/views/Artist/components/ArtistAlbum.vue')
            },
            {
              path: 'mv/:id',
              component: () => import('@/views/Artist/components/RelativeMV.vue')
            },
            {
              path: 'desc/:id',
              component: () => import('@/views/Artist/components/ArtistProduce.vue')
            }
          ]
        },
        {
          path: 'user',
          component: () => import('@/views/User/index.vue'),
          meta: { hasCate: false },
          children: [
            {
              path: 'home/:id',
              component: () => import('@/views/User/components/UserHome.vue')
            },
            {
              path: 'update/:id?',
              component: () => import('@/views/User/components/UserUpdate.vue'),
              meta: { requireLogin: true }
            },
            {
              path: 'binding/:id?',
              component: () => import('@/views/User/components/UserBinding.vue')
            },
            {
              path: 'level',
              component: () => import('@/views/User/components/UserLevel.vue'),
              meta: { requireLogin: true }
            }
          ]
        },
        {
          path: 'msg',
          component: () => import('@/views/Msg/index.vue'),
          meta: { hasCate: false, requireLogin: true },
          children: [
            {
              path: 'at',
              component: () => import('@/views/Msg/components/MsgAt.vue'),
              meta: { requireLogin: true }
            },
            {
              path: 'private',
              component: () => import('@/views/Msg/components/MsgPrivate.vue'),
              meta: { requireLogin: true }
            },
            {
              path: 'comment',
              component: () => import('@/views/Msg/components/MsgComment.vue'),
              meta: { requireLogin: true }
            },
            {
              path: 'notify',
              component: () => import('@/views/Msg/components/MsgNotify.vue'),
              meta: { requireLogin: true }
            },
            {
              path: 'private_detail',
              component: () => import('@/views/Msg/components/PrivateDetail.vue'),
              meta: { requireLogin: true }
            }
          ]
        },
        {
          path: 'playlist/:id',
          component: () => import('@/views/Playlist/index.vue'),
          meta: { hasCate: true }
        },
        {
          path: 'search/:k/:type',
          component: () => import('@/views/Search/index.vue'),
          meta: { hasCate: false }
        },
        {
          path: 'album/:id',
          component: () => import('@/views/Album/index.vue'),
          meta: { hasCate: true }
        },
        {
          path: 'login',
          component: () => import('@/views/Login/LoginQrcode.vue'),
          meta: { hasCate: false }
        },
        {
          path: 'myMusic',
          component: () => import('@/views/MyMusic/index.vue'),
          meta: { hasCate: false, requireLogin: true }
        },
        {
          path: 'discover',
          component: () => import('@/views/Discover/index.vue'),
          meta: { hasCate: true },
          children: [
            {
              path: 'toplist/:id?',
              component: () => import('@/views/Discover/components/Toplist/index.vue'),
              meta: { hasCate: true }
            },
            {
              path: 'artist',
              component: () => import('@/views/Discover/components/Artist/index.vue'),
              meta: { hasCate: true },
              children: [
                {
                  path: 'signed',
                  component: () => import('@/views/Discover/components/Artist/index.vue'),
                  meta: { hasCate: true }
                },
                {
                  path: 'cate',
                  component: () => import('@/views/Discover/components/Artist/index.vue'),
                  meta: { hasCate: true }
                }
              ]
            },
            {
              path: 'playlist',
              component: () => import('@/views/Discover/components/Playlist/index.vue'),
              meta: { hasCate: true }
            }
          ]
        }
      ]
    }
  ],
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    if (hasProfile()) {
      next()
    }
    else {
      next({
        path: '/login'
      })
    }
  }
  else {
    next()
  }
})

export default router
