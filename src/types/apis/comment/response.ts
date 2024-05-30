import type { 
  userType, 
  ipLocationType 
} from '../../common'

export interface songCommentType {
  isMusician: boolean,
  cum: number,
  userId: number,
  topComments: number[],
  moreHot: boolean,
  hotComments: hotCommentsType[],
  commentBanner: string | null,
  comments: commentsType,
  total: number,
  more: boolean
}

export interface hotCommentsType {
  user: userType,
  beReplied: userType,
  pendantData: any,
  showFloorComment: any,
  status: number,
  commentId: number,
  content: string,
  richContent: any,
  contentResource: any,
  time: string,
  timeStr: string,
  needDisplayTime: boolean,
  likedCount: number,
  expressionUrl: any,
  commentLocationType: number,
  pendanparentCommentIdData: number,
  decoration: any,
  repliedMark: any,
  grade: any,
  userBizLevels: any,
  ipLocation: ipLocationType
  owner: boolean,
  medal: any,
  liked: boolean
}

export interface commentsType {
  user: userType,
  beReplied: beRepliedType[],
  pendantData: any,
  showFloorComment: any,
  status: number,
  commentId: number,
  content: string,
  richContent: any,
  contentResource: any,
  time: string,
  timeStr: string,
  needDisplayTime: boolean,
  likedCount: number,
  expressionUrl: any,
  commentLocationType: number,
  parentCommentId: number,
  decoration: [],
  repliedMark: any,
  grade: any,
  userBizLevels: any,
  ipLocation: ipLocationType,
  owner: boolean,
  medal: any,
  liked: boolean
}

export interface beRepliedType {
  user: userType,
  beReplied: userType,
  beRepliedCommentId: number,
  content: string,
  rightContent: any,
  status: number,
  expressionUrl: any,
  ipLocation: ipLocationType,
}

export interface floorCommentType {
  ownerComment: commentsType,
  currentComment: any,
  comments: commentsType,
  hasMore: boolean,
  totalCount: number,
  time: string,
  bestComments: []
}