export interface lyricType {
  sgc: boolean,
  sfy: boolean,
  qfy: boolean,
  transUser: lyricUserType,
  lyricUser: lyricUserType,
  lrc: lyricDetail,
  klyric: lyricDetail,
  tlyric: lyricDetail,
  romalrc: lyricDetail,
  yrc: lyricDetail,
  ytlrc: lyricDetail,
  yromalrc: lyricDetail,
}

export interface lyricDetail {
  version: number,
  lyric: string
}

export interface lyricUserType {
  id: number,
  status: number,
  demand: number,
  userid: number,
  nickname: string,
  uptime: number,
}

export interface songUrlType {
  data: songUrlDataType[],
  code: number,
  message: string
}

export interface songUrlDataType {
  id: number,
  url: string,
  time: number
}
