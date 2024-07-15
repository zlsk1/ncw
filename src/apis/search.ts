import http from '@/utils/http'
import type { searchType } from '@/types'

/**
 *
 * @param {*} keywords
 * @param {*} type 如果传 'mobile' 则返回移动端数据
 * @returns
 */
export const getSearchSuggest = (keywords: string, type?: string) => {
  return http.get<searchType>(
    '/search/suggest',
    {
      params: {
        keywords,
        type
      }
    }
  )
}

/**
 *
 * @param {*} keywords 关键词
 * @param {*} limit 返回数量 , 默认为30
 * @param {*} offset 偏移数量
 * @param {*} type默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * @returns
 */
export const handleSearchAPI = ({ keywords, limit, offset, type }) => {
  return http({
    url: '/cloudsearch',
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}
