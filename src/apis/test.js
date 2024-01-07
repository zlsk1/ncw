import http from '@/utils/http'

export const loginByPassword = ({ phone, password }) => {
  return http({
    url: '/login/cellphone',
    params: {
      phone,
      password
    }
  })
}

export const loginByCaptcha = phone => {
  return http({
    url: '/captcha/sent',
    params: {
      phone
    }
  })
}

export const schemaCaptcha = ({ phone, captcha }) => {
  return http({
    url: '/captcha/verify',
    params: {
      phone,
      captcha
    }
  })
}
