export interface responseType<T> {
  code: number,
  message: string,
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
  alia: string[]
}

export type alType = {
  id: number,
  name: string,
  pic_str: string,
  pic: number,
  picUrl: string
}

export interface songQuality {
  br: number,
  fid: number,
  size: number,
  vd: number,
  sr: number,
}

export interface artistType {
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
  img1v1Id_str: string
}