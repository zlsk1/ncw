import type { albumMainType } from '../../index'

export interface topType {
  artistToplist: {
    coverUrl: string,
    name: string,
    position: number,
    updateFrequency: string
  },
  list: toplistType[]
}

export interface toplistType {
  coverImgId: number,
  coverImgUrl: string,
  description: string,
  id: number,
  name: string,
  playCount: number,
  updateFrequency: string,
  userId: number,
  updateTime: number
}

export interface bannerType {
  banners: bannerItemType[],
  code: number
}

export type bannerItemType = {
  typeTitle: string,
  targetId: string,
  titleColor: string,
  url: any,
  video: any,
  imageUrl: string,
  encodeId: string
}

export type albumNewType = {
  albums: albumMainType[],
  code: number
}

export interface personalizedAlbumType {
  category: number,
  code: number,
  hasTaste: boolean,
  result: personalizedAlbumResultType[]
}

export type personalizedAlbumResultType = {
  alg: string,
  canDislike: boolean,
  copywriter: string,
  highQuality: boolean,
  id: number,
  name: string,
  picUrl: string,
  playCount: number,
  trackCount: number,
  trackNumberUpdateTime: number,
  type: number,
}
