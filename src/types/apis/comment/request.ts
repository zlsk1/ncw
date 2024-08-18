export type commentFloorType = {
  parentCommentId: number,
  id: number | string,
  type?: number
}

export type likeCommentType = {
  id: number | string,
  cid: number,
  t: number,
  type?: number
}

export interface delCommentType {
  t: number,
  id: number | string,
  type?: number,
  commentId?: number,
}

export interface sendCommentType extends delCommentType {
  content: string
}
