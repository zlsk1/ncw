export interface lyricType {
  sgc: boolean,
  sfy: boolean,
  qfy: boolean,
  transUser: lyricUserType,
  lyricUser: lyricUserType,
  lrc: lyricType,
  klyric: lyricType,
  tlyric: lyricType,
  romalrc: lyricType,
  yrc: lyricType,
  ytlrc: lyricType,
  yromalrc: lyricType,
}

export interface lyricUserType {
  id: number,
  status: number,
  demand: number,
  userid: number,
  nickname: string,
  uptime: number,
}

export interface lyricType {
  version: number,
  lyric: string
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