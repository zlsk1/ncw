import http from '@/utils/http'
import type {
  topType,
  bannerType,
  albumNewType,
  personalizedAlbumType
} from '@/types'
/**
 *
 * @param {*} type 0:pc, 1:Android, 2:iphone, 3:ipad
 * @returns 轮播图
 */
export const getBanner = (type?: 'pc' | 'Android' | 'iphone' | 'ipad') => {
  type = !type ? 'pc' : type
  return http.get<bannerType>(
    '/banner',
    {
      params: {
        type
      }
    }
  )
}

/**
 *
 * @param {*} limit 长度
 * @returns 推荐歌单
 */
export const getPersonalized = (limit: number = 30) => {
  return http.get<personalizedAlbumType>(
    '/personalized',
    {
      params: {
        limit
      }
    }
  )
}

// 新专辑
export const getNewAlbum = () => {
  return http.get<albumNewType>('/album/newest')
}

// 榜单
export const getTop = () => {
  return http.get<topType>('/toplist')
}
