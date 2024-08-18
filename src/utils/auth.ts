import { defaultSetting } from '@/config'

export const getToken = () => {
  return JSON.parse(localStorage.getItem('token') as string)
}

export const clearToken = () => {
  localStorage.removeItem('token')
}

export const getAvator = () => {
  return JSON.parse(localStorage.getItem('userInfo') as string)?.profile.avatarUrl
}

export const getNickname = () => {
  return JSON.parse(localStorage.getItem('userInfo') as string)?.profile.nickname
}

export const getSongQueue = () => {
  return localStorage.getItem('song_queue')
    ? JSON.parse(localStorage.getItem('song_queue') as string)
    : []
}

export const getCurrentSong = () => {
  return localStorage.getItem('song_queue')
    ? JSON.parse(localStorage.getItem('song_queue') as string)[JSON.parse(localStorage.getItem('play_setting') as string).index]
    : null
}

export const getSongIndex = () => {
  return localStorage.getItem('play_setting')
    ? JSON.parse(localStorage.getItem('play_setting') as string).index
    : 0
}

export const getSetting = () => {
  if (localStorage.getItem('play_setting')) {
    return JSON.parse(localStorage.getItem('play_setting') as string)
  }
  else {
    JSON.parse(localStorage.setItem('play_setting', JSON.stringify(defaultSetting)) as unknown as string)
    return JSON.parse(localStorage.getItem('play_setting') as string)
  }
}
