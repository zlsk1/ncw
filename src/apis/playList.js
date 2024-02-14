import http from '@/utils/http'

/**
 *
 * @param {*} id 歌单id
 * @param {*} s 歌单最近的s个收藏者
 * @returns 歌单详情 al.name为专辑名称 ar为歌手信息
 */
export const getPlayListDetail = (id, s) => {
  return http({
    url: '/playlist/detail',
    params: {
      id,
      s
    }
  })
}

/**
 * 获取对应歌单的所有歌曲
 * @param {*} id
 * @param {*} limit
 * @param {*} offset
 * @returns
 */
export const getPlayListAllAPI = ({ id, limit, offset }) => {
  return http({
    url: '/playlist/track/all',
    params: {
      id,
      limit,
      offset
    }
  })
}

/**
 * 获取歌单动态信息 如评论数,是否收藏,播放数
 * @param {*} id
 * @returns
 */
export const getPlaylistDynamicAPI = id => {
  return http({
    url: '/playlist/detail/dynamic',
    params: {
      id
    }
  })
}

/**
 * 获取相关歌单
 * @param {*} id
 * @returns
 */
export const getRelatedPlaylistAPI = id => {
  return http({
    url: '/related/playlist'
  })
}
