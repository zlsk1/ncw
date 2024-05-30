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

/**
 * 调用此接口,可获取歌手分类列表
 * @param {*} limit
 * @param {*} offset
 * @param {*} initial 按首字母索引查找参数 热门传-1，#传0
 * @param {*} type -1:全部 1:男歌手 2:女歌手 3:乐队
 * @param {*} area -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 * @returns
 */
export const getArtistlistAPI = ({ limit, offset, initial, type, area }) => {
  return http({
    url: '/artist/list',
    params: {
      limit,
      offset,
      initial,
      type,
      area
    }
  })
}
