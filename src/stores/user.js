import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginByPassword } from '@/apis/login'
import { getToken, clearToken, getAvator } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const avator = ref(getAvator())
  const nickname = ref('')

  const login = async data => {
    const { data: { code }, data: { token: _token }, data: { profile }} = await loginByPassword(data)
    if (code === 200) {
      localStorage.setItem('token', JSON.stringify(_token))
      localStorage.setItem('userInfo', JSON.stringify(profile))
      token.value = _token
      avator.value = profile.avatarUrl
      nickname.value = profile.nickname
    }
  }
  const logout = () => {
    clearToken()
    localStorage.removeItem('userInfo')
    nickname.value = ''
    avator.value = ''
    token.value = ''
  }
  return {
    token,
    avator,
    nickname,
    login,
    logout
  }
})
