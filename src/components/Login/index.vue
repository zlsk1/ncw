<template>
  <div class="login-wrap">
    <el-dialog
      :model-value="isShow"
      width="25%"
      @close="$emit('close', false)"
    >
      <template #header>
        <span class="header">手机号登录</span>
      </template>
      <el-form
        ref="loginForm"
        :model="loginFormData"
        :rules="loginFormRules"
        style="margin-bottom: 50px"
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
        <el-form-item class="btn-login">
          <el-button style="width: 100%" @click="handleLogin(loginForm)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <span v-if="!isLoginByPassword" class="f12 thumb" @click="switchLoginWay">密码登陆</span>
      <span v-else class="f12 thumb" @click="switchLoginWay">验证码登陆</span>
      <template #footer>
        &lt; <span class="thumb">其他登录方式</span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { loginByCaptcha, schemaCaptcha } from '@/apis/login'
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
const store = useUserStore()

defineProps({
  isShow: { type: Boolean, default: false }
})

const loginForm = ref('')
const isSentCaptcha = ref(false)
const isPhone = ref(false)
const isLoginByPassword = ref(false)
const captchaCountdown = ref(30)
const reg = new RegExp(/^(?:(?:\+|00)86)?1\d{10}$/)

const loginFormData = ref({
  phone: '',
  password: '',
  captcha: '',
  isIptPhone: ''
})
// 自定义验证规则
const validCaptcha = async (rule, value, callback) => {
  const res = await schemaCaptcha(loginFormData)
  if (!value) {
    return callback(new Error('请输入验证码'))
  } else if (res.data.code !== 200) return callback(new Error('验证码错误'))
}
const loginFormRules = ref({
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'change' },
    { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入合规的电话号码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' }
    // { pattern: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/, message: '密码必须由大写字母、小写字母和数字组成', trigger: 'blur' }
  ],
  captcha: { validator: validCaptcha, trigger: 'blur' }
})

watch(
  () => loginFormData.value.phone, (val) => {
    reg.test(val) ? isPhone.value = true : isPhone.value = false
  }

)

onMounted(() => {
})

const handleLogin = async formName => {
  await loginForm.value.validate(async (valid, fields) => {
    if (valid) {
      if (isLoginByPassword.value) {
        store.login(loginFormData.value)
      }
    }
  })
}
const getCaptcha = async () => {
  const res = await loginByCaptcha(loginFormData.value.phone)
  if (res.data.code === 200) {
    isSentCaptcha.value = true
    const i = setInterval(() => {
      if (captchaCountdown.value > 0) {
        captchaCountdown.value--
      } else {
        isSentCaptcha.value = false
        clearInterval(i)
      }
    }, 1000)
  }
}
const switchLoginWay = () => {
  loginForm.value.resetFields()
  isLoginByPassword.value = !isLoginByPassword.value
}
</script>

<style lang="scss" scoped>
  .header {
    padding: 60px 0 0 0 ;
    .phone {
      width: 100%;
    }
    .btn-login {
      width: 100%;
    }
  }
</style>

<style>
  .login-wrap .el-dialog__header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 0 0 20px;
    color: #fff;
    background-color: #2d2d2d;
  }
  .login-wrap .el-dialog__body {
    padding: 60px 70px 20px;
  }
  .login-wrap .el-dialog__footer {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 0 0 20px;
    text-align: left;
    font-size: 12px;
    color: #0c72c3;
    background-color: #f7f7f7;
    border-top: 1px solid #ccc;
  }
  .login-wrap .el-dialog__headerbtn {
    top: 0;
    height: 40px;
  }
  .login-wrap .el-dialog__headerbtn:hover svg {
    color: #909399;
  }

  .login-wrap .el-input__wrapper {
    border-radius: 20px;
  }
  .login-wrap .el-input__wrapper {
    box-shadow: none;
    border: 1px solid #e5e5e5;
  }
  .login-wrap .el-input__wrapper:hover {
    box-shadow: none;
  }
  .login-wrap .el-input {
    width: 158px;
    font-size: 12px;
    color: #333;
  }
  .login-wrap .el-input__inner::-webkit-input-placeholder {
    color: #9b9b9b;
  }
</style>
