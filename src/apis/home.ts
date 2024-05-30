import http from '@/utils/http'
/**
 *
 * @param {*} type 0:pc, 1:Android, 2:iphone, 3:ipad
 * @returns 轮播图
 */
export const getBanner = type => {
  return http({
    url: '/banner',
    query: {
      type
    }
  })
}

/**
 *
 * @param {*} limit 长度
 * @returns 推荐歌单
 */
export const getPersonalized = (limit = 30) => {
  return http({
    url: '/personalized',
    params: {
      limit
    }
  })
}

// 新专辑
export const getNewAlbum = () => {
  return http({
    url: '/album/newest'
  })
}

// 榜单
export const getTop = () => {
  return http({
    url: '/toplist'
  })
}
