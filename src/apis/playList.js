import http from '@/utils/http'

/**
 *
 * @param {*} id 歌单id
 * @param {*} s 歌单最近的s个收藏者
 * @returns 歌单详情
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
