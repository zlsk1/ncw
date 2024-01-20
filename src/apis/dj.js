import http from '@/utils/http'

/**
 *
 * @param {*} limit 长度
 * @returns 热门dj
 */
export const getHotDj = limit => {
  return http({
    url: '/dj/toplist/popular',
    params: {
      limit
    }
  })
}
