export interface responseType<T> {
  code?: number,
  message?: string,
  data: T
}

export type pagingDataType = {
  id: number,
  limit: number,
  offset?: number,
  before?: number
}

export interface userType {
  locationInfo: any,
  liveInfo: any,
  anonym: number,
  avatarUrl: string,
  userType: number,
  avatarDetail: any,
  followed: boolean,
  mutual: boolean,
  remarkName: string,
  socailUserId: any,
  vipRights: vipRightsType,
  nickname: string,
  authStatus: number,
  expertTags: any,
  experts: any,
  vipType: number,
  commonIdentity: any,
  userId: number,
  target: any
}

export interface vipRightsType {
  associator: associatorType,
  musicPackage: musicPackageType,
  redplus: any,
  redVipAnnualCount: number,
  redVipLevel: number,
  relationType: number
}

export interface associatorType {
  vipCode: number,
  right: boolean,
  iconUrl: string
}

export interface musicPackageType extends associatorType {
}

export interface ipLocationType {
  ip: any,
  location: string,
  userId: any
}

export type arType = {
  id: number,
  name: string,
  alia: string[],
  tns: []
}

export type alType = {
  id: number,
  name: string,
  pic_str: string,
  pic: number,
  picUrl: string,
  tns: []
}

export interface songQuality {
  br?: number,
  fid?: number,
  size?: number,
  vd?: number,
  sr?: number,
}

export interface artistType {
  accountId?: number
  img1v1Id: number,
  topicPerson: number,
  picId: number,
  musicSize: number,
  albumSize: number,
  briefDesc: string,
  picUrl: string,
  img1v1Url: string,
  followed: boolean,
  trans: string,
  alias: number[],
  name: string,
  id: number,
  img1v1Id_str: string,
  identifyTag?: string[],
  identities?: string[],
  cover?: string
}

export interface songsItem {
  rtUrls: [],
  ar: arType[],
  al: alType,
  st: number,
  noCopyrightRcmd: any,
  songJumpInfo: any,
  djId: number,
  no: number,
  fee: number,
  mv: number,
  t: number,
  v: number,
  cd: number,
  rtype: number,
  rurl: any,
  pst: number,
  alia: string[],
  pop: number,
  rt: string,
  mst: number,
  cp: number,
  crbt: any,
  cf: string,
  dt: number,
  h: songQuality | null,
  sq: songQuality | null,
  hr: songQuality | null,
  l: songQuality | null,
  m: songQuality | null,
  rtUrl: any,
  ftype: any,
  a: any,
  name: string,
  id: string,
  videoInfo: {
    moreThanOne: boolean,
    video: any
  },
  privilege?: {
    id: number,
    fee: number,
    payed: number,
    st: number,
    pl: number,
    dl: number,
    sp: number,
    cp: number,
    subp: number,
    cs: boolean,
    maxbr: number,
    fl: number,
    toast: boolean,
    flag: number,
    preSell: boolean,
    playMaxbr: number,
    downloadMaxbr: number,
    maxBrLevel: string,
    playMaxBrLevel: string,
    downloadMaxBrLevel: string,
    plLevel: string,
    dlLevel: string,
    flLevel: string,
    rscl: any,
    freeTrialPrivilege: {
      resConsumable: boolean,
      userConsumable: boolean,
      listenType: number,
      cannotListenReason: number,
      playReason: any,
      rightSource: number,
      chargeInfoList: chargeInfoItemType[]
    }
  }
}

interface chargeInfoItemType {
  rate: number,
  chargeUrl: any,
  chargeMessage: any,
  chargeType: number
}
