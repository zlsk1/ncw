import http from '@/utils/http'

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
