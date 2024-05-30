import http from '@/utils/http'

// request type
import type { 
  pagingDataType,
  commentFloorType,
  likeCommentType,
  sendCommentType,
  delCommentType,

  responseType,
  songCommentType,
  floorCommentType
} from '@/types'

/**
 *
 * @param {*} id 歌曲id
 * @param {*} limit 获取长度
 * @param {*} offset 偏移
 * @param {*} before
 * * @returns 歌曲评论
 */
export const getSongComment = (obj: pagingDataType) => {
  return http.get<songCommentType>(
    '/comment/music',
    {
      params: {
        ...obj
      }
    }
  )
}

/**
 *
 * @param {*} parentCommentId 楼层id
 * @param {*} id 资源id
 * @param {*} type 0 => 歌曲 1 => mv 2 => 歌单 3 => 专辑 4 => 电台节目 5 => 视频 6 => 动态 7 => 电台
 * @returns 歌曲楼层评论
 */
export const getCommentFloor = (obj: commentFloorType) => {
  return http.get<responseType<floorCommentType>>(
    '/comment/floor',
    {
      params: {
        ...obj
      }
    }
  )
}

/**
 * 给对应评论点赞
 * @param {*} id 资源 id, 如歌曲 id,mv id
 * @param {*} cid 评论 id
 * @param {*} t 是否点赞 , 1 为点赞 ,0 为取消点赞
 * @param {*} type 0 => 歌曲 1 => mv 2 => 歌单 3 => 专辑 4 => 电台节目 5 => 视频 6 => 动态 7 => 电台
 * @returns
 */
export const likeComment = (obj: likeCommentType) => {
  const { id, cid, t, type = 0 } = obj
  return http({
    url: 'comment/like',
    method: 'POST',
    data: {
      id,
      cid,
      t,
      type
    }
  })
}

/**
 * 发送评论
 * @param {*} t 1 发送, 2 回复
 * @param {*} type 0 => 歌曲 1 => mv 2 => 歌单 3 => 专辑 4 => 电台节目 5 => 视频 6 => 动态 7 => 电台
 * @param {*} id 对应资源 id
 * @param {*} content 要发送的内容
 * @param {*} commentId 回复的评论 id (回复评论时必填)
 * @returns
 */
export const sendCommentAPI = (obj: sendCommentType) => {
  return http({
    url: '/comment',
    method: 'POST',
    data: {
      ...obj
    }
  })
}

/**
 * 删除评论
 * @param {*} t 0 删除
 * @param {*} type 0 => 歌曲 1 => mv 2 => 歌单 3 => 专辑 4 => 电台节目 5 => 视频 6 => 动态 7 => 电台
 * @param {*} id 对应资源 id
 * @param {*} commentId 回复的评论 id
 * @returns
 */
export const delCommentAPI = (obj: delCommentType) => {
  return http({
    url: '/comment',
    method: 'POST',
    data: {
      ...obj
    }
  })
}

export const getCommentPlaylistAPI = (obj: pagingDataType) => {
  return http.get<songCommentType>(
    '/comment/playlist',
    {
      params: {
        ...obj
      }
    }
  )
}

/**
 * 专辑评论
 * @param {*} id 歌曲id
 * @param {*} limit 获取长度
 * @param {*} offset 偏移
 * @param {*} before
 * * @returns
 */
export const getCommentAlbumAPI = (obj: pagingDataType) => {
  return http.get<songCommentType>(
    '/comment/album',
    {
      params: {
        ...obj
      }
    }
  )
}
