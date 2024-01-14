import http from '@/utils/http'

/**
 * @param {*} id 音乐id
 * @param {*} level standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
 * @returns 获取音乐的url
 */
export const getSongUrl = (id, level = 'standard') => {
  return http({
    url: '/song/url/v1',
    params: {
      id,
      level
    }
  })
}

export const getLyric = id => {
  return http({
    url: '/lyric/new',
    params: {
      id
    }
  })
}
