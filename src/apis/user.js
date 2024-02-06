import http from '@/utils/http'
import { getTimestamp } from '@/utils/time'

export const getUserDetail = uid => {
  return http({
    url: `/user/detail?${getTimestamp()}`,
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
 * @param {*} imgSize 图片尺寸,默认为 300
 * @param {*} imgX 水平裁剪偏移,方形图片可不传,默认为 0
 * @param {*} imgY 垂直裁剪偏移,方形图片可不传,默认为 0
 * @returns
 */
export const updateUserAvatar = ({ imgSize, imgX, imgY }) => {
  return http({
    url: '/avatar/upload',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      imgSize,
      imgX,
      imgY
    }
  })
}
