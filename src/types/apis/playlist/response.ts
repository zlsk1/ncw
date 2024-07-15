import type {
  arType,
  alType,
  songQuality
} from '../../common'

export interface playlistDetailType {
  code: number,
  relatedVideos: any,
  playlist: playlistType
}

export interface playlistType {
  id: number,
  name: string,
  coverImgId: number,
  coverImgUrl: string,
  coverImgId_str: string,
  adType: number,
  userId: number,
  createTime: number,
  status: number,
  opRecommend: boolean,
  highQuality: boolean,
  newImported: boolean,
  updateTime: number,
  trackCount: number,
  specialType: number,
  privacy: number,
  trackUpdateTime: number,
  commentThreadId: string,
  playCount: number,
  trackNumberUpdateTime: number,
  subscribedCount: number,
  cloudTrackCount: number,
  ordered: boolean,
  description: string,
  tags: string[],
  updateFrequency: any,
  subscribers: {
    avatarImgId?: number,
    userId?: number,
    avatarUrl?: string,
  }[],
  subscribed: boolean,
  creator?: {
    userId: number,
    nickname: string,
    avatarUrl?: string
  },
  tracks: playlistTracksType[],
  tracksId: playlistTracksIdType[],
  privileges: [],
  shareCount?: number,
  commentCount?: number,
}

export interface playlistTracksType {
  name: string,
  id: number,
  pst: number,
  t: number,
  ar: arType | arType[],
  al: alType,
  h: songQuality | null,
  sq: songQuality | null,
  hr: songQuality | null,
  l: songQuality | null,
  m: songQuality | null,
  videoInfo: {
    moreThanOne: boolean,
    video: {
      vid: string,
      type: number,
      title: string,
      playtime: number,
      coverUrl: string,
      publishTime: number,
      artists: any,
      alias: any
    }
  },
  dt?: number,
  no: number
}

export interface playlistTracksIdType {
  id: number,
  v: number,
  t: number,
  at: number,
  alg: any,
  uid: number,
  rcmdReason: string,
  sc: any,
  f: any,
  sr: any,
  dpr: any,
}

export interface allPlaylistType {
  cat: number,
  code: number,
  more: boolean,
  playlists: playlistType[],
  total: number,
  lasttime: number
}

export interface playlistCatelistType {
  all: playlistCateContent,
  categories: playlistCategoryType,
  sub: playlistCateContent[],
  code: number
}

export type playlistCategoryType = ['语种', '风格', '场景', '情感', '主题']

export type playlistCateContent = {
  activity: boolean,
  category: number,
  hot: boolean,
  imgId: number,
  imgUrl: any,
  name: string,
  resourceCount: number,
  resourceType: number,
  type: number,
}