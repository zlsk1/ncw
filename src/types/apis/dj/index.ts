export interface djPopType {
  code: number,
  data: {
    list: djPoplistType[],
    total: number,
    udpateTime: number
  },
  msg: any
}

export type djPoplistType = {
  avatarDetail: {
    identityIconUrl: string,
    identityLevel: number,
    userType: number,
  },
  avatarUrl: string,
  id: number,
  lastRank: number,
  liveId: number,
  liveStatus: number,
  liveType: number,
  mainAuthDesc: string,
  nickName: number,
  rank: number,
  roomNo: number,
  score: number,
  userFollowedCount: number,
  userType: number,
}
