import http from '@/utils/http'

export const getUserDetail = uid => {
  return http({
    url: '/user/detail',
    params: {
      uid
    }
  })
}

/**
 * 获取用户歌单
 * @param {*} uid 用户id
 * @param {*} limit 长度 默认30
 * @param {*} offset 偏移数量 默认0
 * @returns
 */
export const getUserPlaylist = (uid, limit, offset) => {
  return http({
    url: '/user/playlist',
    params: {
      uid,
      limit,
      offset
    }
  })
}
