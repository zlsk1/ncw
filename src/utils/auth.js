export const getToken = () => {
  return JSON.parse(localStorage.getItem('token'))
}

export const clearToken = () => {
  return localStorage.removeItem('token')
}

export const getAvator = () => {
  return JSON.parse(localStorage.getItem('userInfo'))?.avatarUrl
}

export const getNickname = () => {
  return JSON.parse(localStorage.getItem('userInfo'))?.nickname
}
