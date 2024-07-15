import http from '@/utils/http'
import type {
  lyricType,
  songUrlType,
}  from '@/types' 

/**
 * @param {String} id 音乐id 可传多个id 用逗号分隔
 * @param {*} level standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
 * @returns 获取音乐的url
 */
export const getSongUrl = (id: number, level:string = 'standard') => {
  return http.get<songUrlType>(
    '/song/url/v1',
    {
      params: {
        id,
        level
      }
    }
  )
}

/**
 *
 * @param {*} id 音乐id
 * @returns 歌词
 */
export const getLyric = (id: number) => {
  return http.get<lyricType>(
    '/lyric/new',
    {
      params: {
        id
      }
    }
  )
}

/**
 *
 * @param {*} ids 音乐id 可传入多个由逗号分隔的字符串ids
 * @returns 歌曲详情
 */
export const getSongDetail = (ids: string) => {
  return http({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

/**
 *
 * @param {*} id 音乐id
 * @returns 相似歌曲
 */
export const getSongSimilar = (id: number) => {
  return http({
    url: '/simi/song',
    params: {
      id
    }
  })
}
