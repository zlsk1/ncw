export const getToken = () => {
  return JSON.parse(localStorage.getItem('token'))
}

export const clearToken = () => {
  localStorage.removeItem('token')
}

export const getAvator = () => {
  return JSON.parse(localStorage.getItem('userInfo'))?.profile.avatarUrl
}

export const getNickname = () => {
  return JSON.parse(localStorage.getItem('userInfo'))?.profile.nickname
}

export const getSongQueue = () => {
  return JSON.parse(localStorage.getItem('song_queue'))
}
