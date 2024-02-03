import http from '@/utils/http'

export const getArtistDetailAPI = id => {
  return http({
    url: '/artist/detail',
    params: {
      id
    }
  })
}

export const getArtistAlbumAPI = (id, limit, offset) => {
  return http({
    url: '/artist/album',
    params: {
      id,
      limit,
      offset
    }
  })
}

export const getArtistAPI = id => {
  return http({
    url: '/artist/mv',
    params: {
      id
    }
  })
}

export const getArtistTopSongAPI = id => {
  return http({
    url: '/artist/top/song',
    params: {
      id
    }
  })
}
