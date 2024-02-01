import http from '@/utils/http'

/**
 *
 * @param {*} id 歌曲id
 * @param {*} limit 获取长度
 * @param {*} offset 偏移
 * @param {*} before
 * * @returns 歌曲评论
 */
export const getSongComment = ({ id, limit, offset, before }) => {
  return http({
    url: '/comment/music',
    params: {
      id,
      limit,
      offset,
      before
    }
  })
}

/**
 *
 * @param {*} parentCommentId 楼层id
 * @param {*} id 资源id
 * @param {*} type 0 => 歌曲 1 => mv 2 => 歌单 3 => 专辑 4 => 电台节目 5 => 视频 6 => 动态 7 => 电台
 * @returns 歌曲楼层评论
 */
export const getCommentFloor = ({ parentCommentId, id, type }) => {
  return http({
    url: '/comment/floor',
    params: {
      parentCommentId,
      id,
      type
    }
  })
}

/**
 * 给对应评论点赞
 * @param {*} id 资源 id, 如歌曲 id,mv id
 * @param {*} cid 评论 id
 * @param {*} t 是否点赞 , 1 为点赞 ,0 为取消点赞
 * @param {*} type 0 => 歌曲 1 => mv 2 => 歌单 3 => 专辑 4 => 电台节目 5 => 视频 6 => 动态 7 => 电台
 * @returns
 */
export const likeComment = ({ id, cid, t, type = 0 }) => {
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
export const sendCommentAPI = ({ t, type, id, content, commentId }) => {
  return http({
    url: '/comment',
    method: 'POST',
    data: {
      t,
      type,
      id,
      content,
      commentId
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
export const delCommentAPI = ({ t, type, id, commentId }) => {
  return http({
    url: '/comment',
    method: 'POST',
    data: {
      t,
      type,
      id,
      commentId
    }
  })
}

export const getCommentPlaylistAPI = ({ id, limit, offset, before }) => {
  return http({
    url: '/comment/playlist',
    params: {
      id,
      limit,
      offset,
      before
    }
  })
}
