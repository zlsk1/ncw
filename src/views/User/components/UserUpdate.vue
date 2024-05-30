<template>
  <div class="w980 update-wrap">
    <div v-show="!updateImg">
      <UserHeader />
      <div class="content">
        <el-form
          ref="form"
          class="form"
          :model="formData"
          :rules="formRules"
        >
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="formData.nickname">
              {{ profile.nickname }}
            </el-input>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input
              v-model="formData.signature"
              type="textarea"
              maxlength="300"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="formData.gender">
              <el-radio :label="1">
                男
              </el-radio>
              <el-radio :label="0">
                女
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="formData.birthday"
              type="date"
              :default-value="!formData.birthday ? new Date(1990, 0, 1) : formData.birthday"
              :placeholder="!formData.birthday ? '请选择生日' : ''"
            />
          </el-form-item>
          <el-form-item label="地区">
            <el-cascader
              v-model="formData.area"
              :props="CascaderProps"
              :options="provinceAndCityData"
            />
          </el-form-item>
          <el-form-item label-width="40px">
            <el-button type="primary" class="button" @click="submit">
              保存
            </el-button>
          </el-form-item>
        </el-form>
        <div class="avator">
          <img :src="userStore.avator + '?param=140y140'" alt="">
          <span @click="switchUpdate">更换头像</span>
        </div>
      </div>
    </div>
    <div v-show="updateImg">
      <div class="breadcrumb f16">
        <span @click="switchUpdate">
          个人设置
        </span>
        &gt;
        <span>更换头像</span>
      </div>
      <div class="upload-btn">
        <el-button type="primary" :disabled="file ? true : false" @click="clickUpload">
          上传头像
        </el-button> <span>支持jpg、png、bmp格式的图片，且文件小于5M</span>
      </div>
      <div class="fl">
        <div :class="['upload', file ? '' : 'hover-upload']" @click="clickUpload">
          <input
            v-if="!file"
            type="file"
            accept="image/png, image/jpg, image/bmp"
            @change="changeFile"
          >
          <img
            v-else
            src=""
            class="controlImg"
          >
          <div class="choose">
            <div class="expand" />
          </div>
          <UploadFilled style="width: 6em;height: 6em" />
        </div>
        <div class="preview">
          <p>头像预览</p>
          <div class="big">
            <img
              :src="userStore.avator + '?param=180y180'"
              alt=""
              class="full"
            >
          </div>
          <p>大尺寸头像（180×180像素）</p>
          <div class="small">
            <img
              :src="userStore.avator + '?param=180y180'"
              alt=""
              class="full"
            >
          </div>
          <p>小尺寸头像（40×40像素）</p>
        </div>
      </div>
      <el-button :disabled="!file" @click="updateAvatar">
        保存
      </el-button>
      <el-button @click="cancelImg">
        取消
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { onMounted, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import {
  provinceAndCityData
  // pcTextArr,
  // regionData,
  // pcaTextArr,
  // codeToText
} from 'element-china-area-data'
import { testNickname } from '@/apis/login'
import { updateUserInfoAPI, getUserDetail, updateUserAvatarAPI } from '@/apis/user'
import { ElMessage, ElLoading } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import UserHeader from './UserHeader'

const userStore = useUserStore()

const route = useRoute()

const CascaderProps = {
  value: 'label'
}

const validNickname = async (rule, value, callback) => {
  if (!value) return callback(new Error('请输入昵称'))
  if (value.trim() !== profile.value.nickname) {
    const res = await testNickname(value.trim())
    if (res.data.duplicated) return callback(new Error(`昵称已存在 推荐昵称：${res.data.candidateNicknames[Math.ceil(Math.random() * 10)]}`))
  }
}

const formData = ref({
  nickname: '',
  signature: '',
  gender: '',
  birthday: '',
  area: ''
})
const form = ref(null)
const formRules = ref({
  nickname: { validator: validNickname, trigger: 'blur' }
})
const profile = ref(null)
const updateImg = ref(false)
const file = ref(null)

onMounted(() => {
  getDetail()
})

const submit = async () => {
  await form.value.validate(async (valid, fields) => {
    if (valid) {
      const { value: province, children } = provinceAndCityData.find(v => v.label === formData.value.area[0])
      const { value: city } = children.find(v => v.label === formData.value.area[1])
      const o = {
        province: Number(province.padEnd(6, '0')),
        city: Number(city.padEnd(6, '0')),
        gender: formData.value.gender,
        birthday: formData.value.birthday,
        nickname: formData.value.nickname,
        signature: formData.value.signature
      }
      const res = await updateUserInfoAPI(o)
      if (res.data.code === 200) ElMessage.success('更改成功')
      const loadingInstance = ElLoading.service({
        target: '.update-wrap .content',
        text: '加载中'
      })
      await getDetail()
      nextTick(() => { loadingInstance.close() })
    }
  })
}

const getDetail = async () => {
  const res = await getUserDetail(route.params.id)
  profile.value = res.data.profile
  formData.value = {
    nickname: profile.value.nickname,
    signature: profile.value.signature,
    gender: profile.value.gender,
    birthday: profile.value.birthday < 0 ? '' : profile.value?.birthday,
    area: [
      getArea().province,
      getArea().city
    ]
  }
}

const getArea = () => {
  for (let i = 0; i < provinceAndCityData.length; i++) {
    if (profile.value.province.toString().slice(0, 2) === provinceAndCityData[i].value) {
      const province = provinceAndCityData[i].label
      const { label } = provinceAndCityData[i].children.find(v => v.value === profile.value.city || v.value === profile.value.city.toString().slice(0, 4))
      return {
        province,
        city: label,
        index: i
      }
    }
  }
}

const switchUpdate = () => { updateImg.value = !updateImg.value }

const changeFile = e => {
  file.value = e.target.files[0]
  const reader = new FileReader()
  reader.onload = e => {
    setImg(e.target.result)
  }
  reader.readAsDataURL(file.value)
}

const clickUpload = () => {
  document.querySelector('.upload input').click()
}

const cancelImg = () => {
  if (!file.value) updateImg.value = !updateImg.value
  else setImg(userStore.avator)
  file.value = null
}

const setImg = url => {
  document.querySelector('.small img').src = url
  document.querySelector('.big img').src = url
  document.querySelector('.upload .controlImg').src = url
}

const updateAvatar = async () => {
  const formData = new FormData()
  formData.append('imgFile', file.value)
  try {
    await updateUserAvatarAPI(formData)
    userStore.actiongetUserDetail(profile.value.userId)
  } catch (err) {
    ElMessage.warning(err.response.data.message)
  }
}
</script>

<style lang="scss" scoped>
.update-wrap {
  padding: 40px 30px;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  .content {
    .form {
      float: left;
      width: 400px;
      margin-right: 20px;
      .button {
        width: 80px;
      }
    }
    &::after {
      content: '';
      display: block;
      clear: both;
      visibility: hidden;
    }
    :deep(.el-textarea__inner) {
      height: 120px !important;
      resize: none;
    }
    .avator {
      float: left;
      position: relative;
      width: 140px;
      height: 140px;
      img {
        width: 140px;
        height: 140px;
      }
      span {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 140px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background-color: #8e8e8e;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .breadcrumb {
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebebeb;
    >span:first-child {
      color: #409eff;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .upload-btn {
    margin-bottom: 30px;
    button {
      margin-right: 10px;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
  .upload {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    margin-right: 35px;
    border: 1px dashed #d3d3d3;
    input[type="file"] {
      display: none;
    }
    .controlImg {
      position: absolute;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .opacity {
      width: 100%;
      height: 100%;
      opacity: .5;
    }
  }
  .hover-upload {
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      border: 1px dashed #409eff
    };
  }
  .preview {
    position: relative;
    padding-left: 35px;
    font-size: 12px;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 1px;
      height: 300px;
      background-color: #ccc;
    }
    .full {
      width: 100%;
      height: 100%;
    }
    .big {
      width: 180px;
      height: 180px;
      margin: 10px 0 20px 0;
    }
    .small {
      width: 40px;
      height: 40px;
      margin: 10px 0 20px 0;
    }
    p:nth-child(n+2) {
      color: #999;
    }
    .choose {
      width: 180px;
      height: 180px;
      border: 1px solid #fff;
    }
  }
}

</style>
