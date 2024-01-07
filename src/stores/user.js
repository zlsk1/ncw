import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginByPassword } from '@/apis/login'
import { getToken } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const userInfo = ref(null)

  const login = async data => {
    const { data: { code }, data: { token: _token }, data: { profile }} = await loginByPassword(data)
    if (code === 200) {
      localStorage.setItem('token', JSON.stringify(_token))
      localStorage.setItem('userInfo', JSON.stringify(profile))
      token.value = _token
      userInfo.value = profile
    }
  }
  return {
    token,
    userInfo,
    login
  }
})
