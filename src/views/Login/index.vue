<template>
  <div class="login-wrap">
    <el-dialog
      :model-value="isShow"
      style="width: 460px"
      @close="closeDialog"
    >
      <template v-if="isQrCode" #header>
        <span class="header">登录</span>
      </template>
      <template v-else #header>
        <span class="header">手机号登录</span>
      </template>
      <template v-if="isShow && isQrCode">
        <div v-loading="isLoad" class="fl-sb code-wrap ">
          <img
            class="desc"
            src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png"
            alt=""
          >
          <div class="f12">
            <p class="title f20 ">
              扫码登陆
            </p>
            <img
              v-if="qrCodeUrl"
              :src="qrCodeUrl"
              alt=""
              class="qrcode"
            >
            <div v-else class="error">
              <el-image class="qrcode">
                <template #error>
                  <div class="image-slot">
                    <Picture></Picture>
                  </div>
                </template>
              </el-image>
              <p>二维码已过期</p>
              <el-button size="small" @click="createQrCode">
                点击刷新
              </el-button>
            </div>
            <p>
              使用<a
                href="https://music.163.com/#/download"
                target="_blank"
                class="tar"
              >网易云音乐app</a>扫码登录
            </p>
          </div>
        </div>
        <button class="switchButton" @click="chooseOtherWay">
          选择其他方式登录
        </button>
      </template>
      <template v-else>
        <div
          class="fl"
          style="align-items:center; cursor:pointer"
          @click="backtoQrLogin"
        >
          <ArrowLeft style="width: 1em; height: 1em"></ArrowLeft>
          <p class="f12">
            返回二维码登录
          </p>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginFormData"
          :rules="loginFormRules"
          style="margin: 20px 0"
        >
          <el-form-item prop="phone">
            <el-input
              v-model="loginFormData.phone"
              placeholder="请输入手机号"
              style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item :prop="!isLoginByPassword ? 'captcha' : 'password'">
            <el-input
              v-if="!isLoginByPassword"
              v-model="loginFormData.captcha"
              style="width: 65%;margin-right: 10px"
              placeholder="请输入短信验证码"
            ></el-input>
            <el-input
              v-else
              v-model="loginFormData.password"
              style="width: 100%"
              placeholder="请输入密码"
              type="password"
            ></el-input>
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
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginFormData.password"
                style="width: 100%"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passwordConfirm">
              <el-input
                v-model="loginFormData.passwordConfirm"
                style="width: 100%"
                placeholder="确认密码"
                type="password"
              ></el-input>
            </el-form-item>
          </template>
          <el-form-item class="btn-login">
            <el-button
              v-if="isRegister"
              class="btn"
              style="width: 100%"
              @click="handleLogin(loginFormRef)"
            >
              注册
            </el-button>
            <el-button
              v-else
              class="btn"
              style="width: 100%"
              @click="handleLogin(loginFormRef)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="switchTpye">
          <span
            v-if="!isLoginByPassword"
            class="f12 thumb"
            @click="switchLoginWay"
          >密码登陆</span>
          <span
            v-else
            class="f12 thumb"
            @click="switchLoginWay"
          >验证码登陆</span>
        </div>
      </template>
      <!-- <template #footer>
        &lt; <span class="thumb">注册</span>
      </template> -->
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  loginByCaptcha,
  schemaCaptcha,
  testPhone,
  testNickname,
  register,
  getQrKeyAPI,
  createQrCodeAPI,
  checkQrCodeAPI
} from '@/apis/login'
import { getUserAccountAPI } from '@/apis/user'
import { onUnmounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { getTimestamp } from '@/utils/time'
import { ElMessage } from 'element-plus'
import { ArrowLeft, Picture } from '@element-plus/icons-vue'

const userStore = useUserStore()

const props = defineProps({
  isShow: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const loginFormRef = ref()
const isSentCaptcha = ref(false)
const isPhone = ref(false)
const isLoginByPassword = ref(false)
const isRegister = ref(false)
const isQrCode = ref(true)
const isLoad = ref(true)
const qrCodeUrl = ref('')
const captchaCountdown = ref(30)
const reg = new RegExp(/^(?:(?:\+|00)86)?1\d{10}$/)
let timer: any = null

const loginFormData = ref({
  phone: '',
  password: '',
  passwordConfirm: '',
  captcha: '',
  isIptPhone: '',
  nickname: ''
})

onUnmounted(() => {
  timer = null
})

watch(
  () => loginFormData.value.phone, async val => {
    if (reg.test(val)) {
      isPhone.value = true
      const res = await testPhone(val)
      if (res.data.exist < 1) isRegister.value = true
      else isRegister.value = false
    }
    else {
      isPhone.value = false
    }
  }
)

watch(
  () => props.isShow, val => {
    if (val) {
      createQrCode()
    }
    else {
      clearInterval(timer)
      timer = null
    }
  }
)

watch(
  isQrCode, async val => {
    if (val) {
      createQrCode()
    }
  }
)

// 自定义检验验证码
const validCaptcha = async(rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  if (value.trim().length === 4) {
    const res = await schemaCaptcha(loginFormData.value.phone, loginFormData.value.captcha)
    if (res.data.code !== 200) return callback(new Error('验证码错误'))
  }
}

const validPasswordConfirm = async(rule: any, value: any, callback: any) => {
  if (!value) { return callback(new Error('请确认密码')) }
  if (value !== loginFormData.value.password) return callback(new Error('两次输入的密码不一致'))
}

const validNickname = async(rule: any, value: any, callback: any) => {
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

const handleLogin = async(formName: any) => {
  await formName.validate(async(valid: boolean) => {
    if (valid) {
      if (isRegister.value) {
        const res = await register()
        console.log(res)
      }
      if (isLoginByPassword.value) {
        userStore.loginAction(loginFormData.value)
        formName.resetFields()
      }
      emit('close', false)
    }
  })
}

const getCaptcha = async() => {
  const res = await loginByCaptcha(loginFormData.value.phone)
  if (res.data.code === 200) {
    isSentCaptcha.value = true
    let i = getTimestamp()
    i = setInterval(() => {
      if (captchaCountdown.value > 0) {
        captchaCountdown.value--
      }
      else {
        isSentCaptcha.value = false
        clearInterval(i)
      }
    }, 1000)
  }
}

const switchLoginWay = () => {
  loginFormRef.value?.resetFields()
  isLoginByPassword.value = !isLoginByPassword.value
  isRegister.value = false
}

const closeDialog = () => {
  emit('close', false)
  !isQrCode.value ? loginFormRef.value?.resetFields() : ''
  isLoginByPassword.value = false
}

const chooseOtherWay = () => {
  isQrCode.value = false
  clearInterval(timer)
  timer = null
}

const backtoQrLogin = () => {
  isQrCode.value = true
}

const createQrCode = async() => {
  isLoad.value = true
  const res = await getQrKeyAPI()
  const qr = await createQrCodeAPI(res.data.data.unikey)
  qrCodeUrl.value = qr.data.data.qrimg
  isLoad.value = false
  timer = setInterval(async() => {
    const status = await checkQrCodeAPI(res.data.data.unikey)
    if (status.data.code === 803) {
      clearInterval(timer)
      const { data } = await getUserAccountAPI()
      localStorage.setItem('userInfo', JSON.stringify(data))
      userStore.nickname = data.profile.nickname
      userStore.avator = data.profile.avatarUrl
      emit('close', false)
      ElMessage.success('登录成功！')
    }
    else if (status.data.code === 800 && status.data.message === '二维码不存在或已过期') {
      qrCodeUrl.value = ''
      clearInterval(timer)
      timer = null
    }
  }, 3000)
}
</script>

<style lang="scss" scoped>
@import './qrcode.scss';
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
  .switchButton {
    display: block;
    width: 120px;
    margin: 20px auto 0 auto;
    padding: 4px 10px;
    text-align: center;
    font-size: 12px;
    background: none;
    border-radius: 20px;
    border: 1px solid #979797;
    cursor: pointer;
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
  padding: 40px 70px 20px;
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
