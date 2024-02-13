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
    url: `/nickname/check?${getTimestamp()}`,
    method: 'POST',
    data: {
      nickname
    }
  })
}

// 刷新登录状态
export const loginRefreshAPI = () => {
  return http({
    url: '/login/refresh'
  })
}

// 获取登录状态
export const getLoginStatusAPI = () => {
  return http({
    url: `/login/status?${getTimestamp()}`
  })
}
