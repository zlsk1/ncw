import http from '@/utils/http'

/**
 *
 * @param {*} limit 长度
 * @param {*} offset 偏移数量 , 用于分页
 * @returns 热门歌手
 */
export const getHotSinger = (limit, offset = 0) => {
  return http({
    url: '/top/artists',
    params: {
      limit,
      offset
    }
  })
}

export const getSignerDesc = id => {
  return http({
    url: '/artist/desc',
    params: {
      id
    }
  })
}
