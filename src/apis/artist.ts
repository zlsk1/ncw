import http from '@/utils/http'

export const getArtistDetailAPI = (id: number) => {
  return http({
    url: '/artist/detail',
    params: {
      id
    }
  })
}

/**
 * 获取歌手专辑
 * @param {*} id 歌手 id
 * @param {*} limit 取出数量 , 默认为 30
 * @param {*} offset 偏移数量 默认 为 0
 * @returns
 */
export const getArtistAlbumAPI = (id: number, limit: number, offset?: number) => {
  return http({
    url: '/artist/album',
    params: {
      id,
      limit,
      offset
    }
  })
}

export const getArtistAPI = (id: number) => {
  return http({
    url: '/artist/mv',
    params: {
      id
    }
  })
}

export const getArtistTopSongAPI = (id: number) => {
  return http({
    url: '/artist/top/song',
    params: {
      id
    }
  })
}

export const getArtistProduceAPI = (id: number) => {
  return http({
    url: '/artist/desc',
    params: {
      id
    }
  })
}

export const getArtistMVAPI = (id: number) => {
  return http({
    url: '/artist/mv',
    params: {
      id
    }
  })
}
