import http from '@/utils/http'
import { getTimestamp } from '@/utils/time'

export const getUserDetail = uid => {
  return http({
    url: `/user/detail?stamp=${getTimestamp()}`,
    params: {
      uid
    }
  })
}

/**
 * 获取用户歌单
 * @param {*} uid 用户id
 * @param {*} limit 长度 默认30
 * @param {*} offset 偏移数量 默认0
 * @returns
 */
export const getUserPlaylistAPI = ({ uid, limit, offset }) => {
  return http({
    url: '/user/playlist',
    params: {
      uid,
      limit,
      offset
    }
  })
}

export const getVipLevelAPI = uid => {
  return http({
    url: '/vip/info',
    params: {
      uid
    }
  })
}

/**
 *
 * @param {Number} province 补零到6位
 * @param {Number} city 补零到6位
 * @returns
 */
export const updateUserInfoAPI = ({ gender, birthday, nickname, province, city, signature }) => {
  return http({
    url: '/user/update',
    params: {
      gender,
      birthday,
      nickname,
      province,
      city,
      signature
    }
  })
}

/**
 *
 * @param {*} formData 表单数据名为imgFile
 * @param {*} imgSize 图片尺寸,默认为 300
 * @param {*} imgX 水平裁剪偏移,方形图片可不传,默认为 0
 * @param {*} imgY 垂直裁剪偏移,方形图片可不传,默认为 0
 * @returns
 */
export const updateUserAvatarAPI = (imgFile, imgSize = 300, imgX = 0, imgY = 0) => {
  return http({
    url: `/avatar/upload?stamp=${getTimestamp()}&imgSize=${imgSize}&imgX=${imgX}&imgY=${imgY}`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'POST',
    data: imgFile
  })
}

/**
 *
 * @param {*} id 用户id
 * @param {*} t 1为关注,其他为取消关注
 * @returns
 */
export const followUserAPI = ({ id, t }) => {
  return http({
    url: '/follow',
    method: 'PUT',
    data: {
      id,
      t
    }
  })
}

/**
 * 发送私信
 * @param {*} user_ids 用户 id,多个需用逗号隔开
 * @param {*} msg 要发送的信息
 * @returns
 */
export const sendTextAPI = ({ user_ids, msg }) => {
  return http({
    url: '/send/text',
    method: 'POST',
    params: {
      user_ids,
      msg
    }
  })
}

/**
 * 登录后调用此接口,可获取私信和通知数量信息
 * @returns
 */
export const getPlCountAPI = () => {
  return http({
    url: `/pl/count?stamp=${getTimestamp()}`
  })
}

/**
 * 登录后调用此接口 ,可获取私信
 * @param {*} limit 返回数量 , 默认为 30
 * @param {*} offset 偏移数量
 * @returns
 */
export const getMsgAPI = (limit, offset) => {
  return http({
    url: `/msg/private?stamp=${getTimestamp()}`,
    params: {
      limit,
      offset
    }
  })
}

/**
 * 登录后调用此接口 ,可获取私信内容
 * @param {*} uid 用户id
 * @param {*} limit 返回数量 , 默认为 30
 * @param {*} before 分页参数,取上一页最后一项的 time 获取下一页数据
 * @returns
 */
export const getMsgContentAPI = ({ uid, limit, before }) => {
  return http({
    url: `/msg/private/history?stamp=${getTimestamp()}`,
    params: {
      uid,
      limit,
      before
    }
  })
}

/**
 * 登录后调用此接口 ,可获取通知
 * @param {*} limit 返回数量 , 默认为 30
 * @param {*} lasttime 传入上一次返回结果的 time,将会返回下一页的数据
 * @returns
 */
export const getNoticesAPI = ({ limit, lasttime }) => {
  return http({
    url: `/msg/notices?stamp=${getTimestamp()}`,
    params: {
      limit,
      lasttime
    }
  })
}
