<template>
  <div class="login-wrap">
    <el-dialog
      :model-value="isShow"
      style="width: 460px"
      @close="closeDialog"
    >
      <template #header>
        <span class="header">手机号登录</span>
      </template>
      <el-form
        ref="loginForm"
        :model="loginFormData"
        :rules="loginFormRules"
        style="margin-bottom: 20px"
      >
        <el-form-item prop="phone">
          <el-input v-model="loginFormData.phone" placeholder="请输入手机号" style="width: 100%" />
        </el-form-item>
        <el-form-item :prop="!isLoginByPassword ? 'captcha' : 'password'">
          <el-input
            v-if="!isLoginByPassword"
            v-model="loginFormData.captcha"
            style="width: 65%;margin-right: 10px"
            placeholder="请输入短信验证码"
          />
          <el-input
            v-else
            v-model="loginFormData.password"
            style="width: 100%"
            placeholder="请输入密码"
            type="password"
          />
          <template v-if="!isLoginByPassword">
            <el-button
              v-if="!isSentCaptcha"
              ref="getcaptcha"
              class="btn-getcaptcha"
              style="width: calc(35% - 10px);"
              :disabled="!isPhone"
              @click="getCaptcha"
            >
              获取验证码
            </el-button>
            <el-button v-else disabled>
              {{ captchaCountdown }}秒后重发
            </el-button>
          </template>
        </el-form-item>
        <template v-if="isRegister && !isLoginByPassword">
          <el-form-item prop="nickname">
            <el-input
              v-model="loginFormData.nickname"
              style="width: 100%"
              placeholder="请输入昵称"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFormData.password"
              style="width: 100%"
              placeholder="请输入密码"
              type="password"
            />
          </el-form-item>
          <el-form-item prop="passwordConfirm">
            <el-input
              v-model="loginFormData.passwordConfirm"
              style="width: 100%"
              placeholder="确认密码"
              type="password"
            />
          </el-form-item>
        </template>
        <el-form-item class="btn-login">
          <el-button
            v-if="isRegister"
            class="btn"
            style="width: 100%"
            @click="handleLogin(loginForm)"
          >
            注册
          </el-button>
          <el-button
            v-else
            class="btn"
            style="width: 100%"
            @click="handleLogin(loginForm)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="switchTpye">
        <span v-if="!isLoginByPassword" class="f12 thumb" @click="switchLoginWay">密码登陆</span>
        <span v-else class="f12 thumb" @click="switchLoginWay">验证码登陆</span>
      </div>
      <!-- <template #footer>
        &lt; <span class="thumb">注册</span>
      </template> -->
    </el-dialog>
  </div>
</template>

<script setup>
import { loginByCaptcha, schemaCaptcha, testPhone, testNickname, register } from '@/apis/login'
import { onUnmounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { getTimestamp } from '@/utils/time'
const store = useUserStore()

defineProps({
  isShow: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])

const loginForm = ref('')
const isSentCaptcha = ref(false)
const isPhone = ref(false)
const isLoginByPassword = ref(false)
const isRegister = ref(false)
const captchaCountdown = ref(30)
const reg = new RegExp(/^(?:(?:\+|00)86)?1\d{10}$/)

const loginFormData = ref({
  phone: '',
  password: '',
  passwordConfirm: '',
  captcha: '',
  isIptPhone: '',
  nickname: ''
})
// 自定义检验验证码
const validCaptcha = async (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  if (value.trim().length === 4) {
    const res = await schemaCaptcha(loginFormData.value)
    if (res.data.code !== 200) return callback(new Error('验证码错误'))
  }
}
const validPasswordConfirm = async (rule, value, callback) => {
  if (!value) { return callback(new Error('请确认密码')) }
  if (value !== loginFormData.value.password) return callback(new Error('两次输入的密码不一致'))
}
const validNickname = async (rule, value, callback) => {
  if (!value) return callback(new Error('请输入昵称'))
  const res = await testNickname(value.trim())
  if (res.data.duplicated) return callback(new Error(`昵称已存在 推荐昵称：${res.data.candidateNicknames[Math.ceil(Math.random() * 10)]}`))
}
const loginFormRules = ref({
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'change' },
    { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入合规的电话号码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/, message: '密码必须包含大写字母、小写字母和数字', trigger: 'blur' }
  ],
  nick: { validator: validNickname, trigger: 'blur' },
  passwordConfirm: { validator: validPasswordConfirm, trigger: 'change' },
  captcha: { validator: validCaptcha, trigger: 'blur' }
})

watch(
  () => loginFormData.value.phone, async val => {
    if (reg.test(val)) {
      isPhone.value = true
      const res = await testPhone(val)
      if (res.data.exist < 1) isRegister.value = true
      else isRegister.value = false
    } else {
      isPhone.value = false
    }
  }
)

let handleLogin = async formName => {
  await loginForm.value.validate(async (valid, fields) => {
    if (valid) {
      if (isRegister.value) {
        const res = await register()
        console.log(res)
      }
      if (isLoginByPassword.value) {
        store.loginAction(loginFormData.value)
        loginForm.value.resetFields()
      }
      emit('close', false)
    }
  })
}

let getCaptcha = async () => {
  const res = await loginByCaptcha(loginFormData.value.phone)
  if (res.data.code === 200) {
    isSentCaptcha.value = true
    let i = getTimestamp()
    i = setInterval(() => {
      if (captchaCountdown.value > 0) {
        captchaCountdown.value--
      } else {
        isSentCaptcha.value = false
        clearInterval(i)
      }
    }, 1000)
  }
}

let switchLoginWay = () => {
  loginForm.value.resetFields()
  isLoginByPassword.value = !isLoginByPassword.value
  isRegister.value = false
}

let closeDialog = () => {
  emit('close', false)
  loginForm.value.resetFields()
  isLoginByPassword.value = false
}

onUnmounted(() => {
  handleLogin = null; getCaptcha = null; switchLoginWay = null; closeDialog = null
})
</script>

<style lang="scss" scoped>
.login-wrap{
  .header {
    padding: 60px 0 0 0 ;
    .phone {
      width: 100%;
    }
    .btn-login {
      width: 100%;
    }
  }
  .btn-getcaptcha {
    color: #fff;
    background-color: #ff3a3a;
    border-radius: 20px;
  }
  .btn-login {
    margin-bottom: 40px;
    .btn {
      color: #fff;
      background-color: #ff3a3a;
      border-radius: 20px;
    }
  }
  .switchTpye {
    margin-bottom: 20px;
    line-height: 0;
  }
}
:deep(.el-button.is-disabled) {
  color: #a8abb2;
  background-color: #f3f3f3 !important;
}
:deep(.el-dialog__header) {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 0 0 20px;
  color: #fff;
  background-color: #2d2d2d;
}
:deep(.el-dialog__body) {
  padding: 60px 70px 20px;
}
:deep(.el-dialog__headerbtn) {
  top: 0;
  height: 40px;
}
:deep(.el-dialog__headerbtn:hover svg) {
  color: #909399;
}
:deep(.el-input__wrapper) {
  border-radius: 20px;
  box-shadow: none;
  border: 1px solid #e5e5e5;
}
:deep(.el-input) {
  width: 158px;
  font-size: 12px;
  color: #333;
}
:deep(.el-input__inner::-webkit-input-placeholder) {
  color: #9b9b9b;
}
:deep(.el-button) {
  border: none;
}
</style>
