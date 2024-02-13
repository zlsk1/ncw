import { defaultSetting } from '@/cogfig'

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

export const getCurrentSong = () => {
  return localStorage.getItem('song_queue')
    ? JSON.parse(localStorage.getItem('song_queue'))[JSON.parse(localStorage.getItem('play_setting')).index]
    : null
}

export const getSongIndex = () => {
  return localStorage.getItem('play_setting')
    ? JSON.parse(localStorage.getItem('play_setting')).index
    : 0
}

export const getSetting = () => {
  if (localStorage.getItem('play_setting')) {
    return JSON.parse(localStorage.getItem('play_setting'))
  } else {
    JSON.parse(localStorage.setItem('play_setting', JSON.stringify(defaultSetting)))
    return JSON.parse(localStorage.getItem('play_setting'))
  }
}
