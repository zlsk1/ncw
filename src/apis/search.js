import http from '@/utils/http'

export const getSearchSuggest = (keywords, type) => {
  return http({
    url: '/search/suggest',
    params: {
      keywords,
      type
    }
  })
}
