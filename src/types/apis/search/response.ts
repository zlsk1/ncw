export interface searchType {
  result: searchResultType,
  code?: number
}

export interface searchResultType {
  albums: searchAlbumType[],
  artists: searchArtistType[],
  songs: searchSongType[],
  playlists: searchPlaylistsType[],
  order: string[]
}

export interface searchAlbumType {
  id: number,
  name: string,
  artist: searchArtistType,
  alias: [],
  publishTime: number,
  size: number,
  copyrightId: number,
  status: number,
  picId:number,
  mark:number
}

export interface searchArtistType {
  id: number,
  name: string,
  picUrl: string,
  alias: [],
  albumSize: number,
  picId: number,
  fansGroup: any,
  img1v1Url: string,
  tansNames?: string[]
  trans:  any
}

export interface searchSongType {
  id: number,
  name: string,
  artists: searchArtistType[],
  album: searchAlbumType,
  duration: number,
  copyrightId: number,
  status: number,
  alias: [],
  rtype: number,
  ftype: number,
  mvid: number,
  fee: number,
  rUrl: any,
  mark: number,
}

export interface searchPlaylistsType {
  id: number,
  name: string,
}