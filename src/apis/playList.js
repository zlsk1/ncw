import http from '@/utils/http'

export const getPlayListDetail = (id, s) => {
  return http({
    url: '/playlist/detail',
    params: {
      id,
      s
    }
  })
}
