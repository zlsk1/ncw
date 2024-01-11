import http from '@/utils/http'

export const getHotDj = limit => {
  return http({
    url: '/dj/toplist/popular',
    params: {
      limit
    }
  })
}
