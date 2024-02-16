import http from '@/utils/http'

export const getAlbumAPI = id => {
  return http({
    url: '/album',
    params: {
      id
    }
  })
}
