import http from '@/utils/http'

export const getUserDetail = uid => {
  return http({
    url: '/user/detail',
    params: {
      uid
    }
  })
}
