import http from '@/utils/http'

export const getHotSinger = (limit, offset) => {
  return http({
    url: '/top/artists',
    params: {
      limit,
      offset
    }
  })
}

export const getSignerDesc = id => {
  return http({
    url: '/artist/desc',
    params: {
      id
    }
  })
}
