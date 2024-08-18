import type {
  artistType,
  songsItem
} from '../../common'

export interface albumType {
  resourceState: boolean,
  songs: songsItem[],
  code: number,
  album: albumMainType & { info: albumInfoType }
}

export interface albumMainType {
  songs: any,
  paid: boolean,
  onSale: boolean,
  mark: number,
  awardTags: any,
  artists: artistType[],
  copyrightId: number,
  picId: number,
  artist: artistType,
  publishTime: number,
  company: string,
  briefDesc: string,
  picUrl: string,
  commentThreadId: string,
  blurPicUrl: string,
  companyId: number,
  pic: number,
  status: number,
  subType: string,
  alias: number[],
  description: string,
  tags: string,
  name: string,
  id: number,
  type: string,
  size: number,
  picId_str: string,
}

export interface albumInfoType {
  commentThread: {
    id: string,
    resourceInfo: {
      id: number,
      userId: number,
      name: string,
      imgUrl: string,
      creator: any,
      encodedId: any,
      subTitle: any,
      webUrl: any,
    }
  },
  latestLikedUsers: any,
  liked: boolean,
  comments: any,
  resourceType: number,
  resourceId: number,
  commentCount: number,
  likedCount: number,
  shareCount: number,
  threadId: string
}
