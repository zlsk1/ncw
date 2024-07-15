import http from '@/utils/http'
import type { djPopType } from '@/types'

/**
 *
 * @param {*} limit 长度
 * @returns 热门dj
 */
export const getHotDj = (limit: number) => {
  return http.get<djPopType>(
    '/dj/toplist/popular',
    {
      params: {
        limit
      }
    }
  )
}
