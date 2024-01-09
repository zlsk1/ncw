import http from '@/utils/http'

// 0:pc, 1:Android, 2:iphone, 3:ipad
export const getBanner = type => {
  return http({
    url: '/banner',
    query: {
      type
    }
  })
}

export const getPersonalized = (limit = 30) => {
  return http({
    url: '/personalized',
    params: {
      limit
    }
  })
}
