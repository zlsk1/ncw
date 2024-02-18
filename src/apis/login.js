import http from '@/utils/http'
import { getTimestamp } from '@/utils/time'

export const loginByPassword = ({ phone, password }) => {
  return http({
    url: '/login/cellphone',
    method: 'POST',
    params: {
      phone,
      password
    }
  })
}

export const loginByCaptcha = phone => {
  return http({
    url: '/captcha/sent',
    method: 'POST',
    params: {
      phone
    }
  })
}

export const schemaCaptcha = ({ phone, captcha }) => {
  return http({
    url: '/captcha/verify',
    method: 'POST',
    params: {
      phone,
      captcha
    }
  })
}

export const logout = () => {
  return http({
    url: '/logout'
  })
}

export const testPhone = (phone) => {
  return http({
    url: `/cellphone/existence/check?timeStamp=${getTimestamp()}`,
    method: 'POST',
    data: {
      phone
    }
  })
}

export const register = ({ phone, captcha, password, nickname }) => {
  return http({
    url: '/register/cellphone',
    method: 'POST',
    data: {
      phone,
      captcha,
      password,
      nickname
    }
  })
}

export const createNickname = () => {
  return http({
    url: '/nickname/check'
  })
}

export const testNickname = (nickname) => {
  return http({
    url: `/nickname/check?stamp=${getTimestamp()}`,
    method: 'POST',
    data: {
      nickname
    }
  })
}

/**
 * 刷新登录状态
 * @returns
 */
export const loginRefreshAPI = () => {
  return http({
    url: '/login/refresh'
  })
}

/**
 * 获取登录状态
 * @returns
 */
export const getLoginStatusAPI = () => {
  return http({
    url: `/login/status?stamp=${getTimestamp()}`
  })
}

/**
 * 调用此接口可生成一个二维码key
 * @returns
 */
export const getQrKeyAPI = () => {
  return http({
    url: `/login/qr/key?stamp=${getTimestamp()}`
  })
}

/**
 * 生成二维码
 * @param {*} key
 * @param {*} qrimg
 * @returns
 */
export const createQrCodeAPI = ({ key, qrimg = 1 }) => {
  return http({
    url: `/login/qr/create?stamp=${getTimestamp()}`,
    params: {
      key,
      qrimg
    }
  })
}

/**
 * 生成二维码状态检测
 * @param {*} key
 * @param {*} qrimg
 * @returns
 */
export const checkQrCodeAPI = (key) => {
  return http({
    url: `/login/qr/check?stamp=${getTimestamp()}`,
    params: {
      key
    }
  })
}
