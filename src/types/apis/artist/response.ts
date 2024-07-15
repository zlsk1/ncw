import type {
  artistType,
  vipRightsType,
  userType,
  albumMainType,
  songsItem,
} from "../../index";

export interface artistAlbumType {
  artist: artistType | artistType[],
  hotAlbums: albumMainType[],
  more: boolean,
  code: number
}

export interface artistDetailType {
  artist: artistType,
    blacklist: number,
    eventCount: number,
    identify: {
      actionUrl: string,
      imageDesc: string,
      imageUrl: string
    },
    preferShow: number,
    secondaryExpertIdentiy: {
      expertIdentiyCount: number,
      expertIdentiyId: number,
      expertIdentiyName: string
    }[],
    showPriMsg: boolean,
    user: userType
    videoCount: number,
    vipRights: vipRightsType
}

export interface topSingerType {
  artists: artistType[],
  more: boolean
}

export interface artistProduceType {
  briefDesc: string,
  code: number,
  count: number,
  introduction: any,
  topicData: any
}

export interface artistHotWorkType {
  songs: songsItem[],
  code: number,
  more:  boolean
}

export interface artistMVType {
  hasMore: boolean,
  mvs: artistMVItemsType[],
  time:  number  
}

export interface artistMVItemsType {
  artist: artistType,
  artistName: string,
  duration: number,
  id: number,
  imgurl: string,
  imgurl16v9: string,
  name: string,
  playCount: number,
  publishTime: string,
  status: number,
  subed: number
}