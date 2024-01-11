import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginByPassword, logout } from '@/apis/login'
import { getUserDetail } from '@/apis/user'
import { getToken, clearToken, getAvator, getNickname } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const avator = ref(getAvator())
  const nickname = ref(getNickname())

  const loginAction = async data => {
    const { data: { code }, data: { token: _token }} = await loginByPassword(data)
    if (code === 200) {
      localStorage.setItem('token', JSON.stringify(_token))
      token.value = _token
      await actiongetUserDetail()
    }
  }
  const logoutAction = () => {
    logout()
    clearToken()
    localStorage.removeItem('userInfo')
    nickname.value = ''
    avator.value = ''
    token.value = ''
  }
  const actiongetUserDetail = async uid => {
    const res = await getUserDetail(uid)
    localStorage.setItem('userInfo', JSON.stringify(res.data))
    avator.value = res.data.profile.avatarUrl
    nickname.value = res.data.profile.nickname
  }
  return {
    token,
    avator,
    nickname,
    loginAction,
    logoutAction,
    actiongetUserDetail
  }
})
