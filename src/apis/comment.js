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
