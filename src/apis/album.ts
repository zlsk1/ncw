import http from '@/utils/http'
import type { albumType } from '@/types'

export const getAlbumAPI = (id: number) => {
  return http.get<albumType>(
    '/album',
    {
      params: {
        id
      }
    }
  )
}
