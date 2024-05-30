<template>
  <div class="w980 userLevel-wrap">
    <h2 class="title">
      当前等级：
      <span class="lv"><i class="icon-lv icon-lv-30" />9</span>
    </h2>
    <Progress
      :percentage="percentage"
      :section="10"
      width="100%"
      color="#f75757"
    />
    <p class="tips f12">
      等级数据每天下午2点更新
    </p>
    <dl class="privilege">
      <dt>当前等级特权：</dt>
      <dd v-for="(item, index) in levelInfo?.info.split('$')" :key="index">
        {{ item }}
      </dd>
    </dl>
    <div class="other">
      <span>距离下一个等级：<span class="lv-max"><i class="icon-lv icon-lv-20" />10</span></span>
      <el-popover
        :width="300"
        placement="bottom-start"
        :popper-options="{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [-10, 10]
              }
            }
          ]
        }"
      >
        <p class="f12">
          听歌量是指累计播放的歌曲数量而非播放次数，并且实际播放时间过短的歌曲将不纳入计算，每天最多计算300首。
        </p>
        <p class="f12">
          登录天数是指使用云音乐的天数，在多端同时使用不会被重复计算。
        </p>
        <template #reference>
          <InfoFilled style="width:1.5em;height:1.5em;color: #666" class="desc" />
        </template>
      </el-popover>
    </div>
    <div class="progress">
      听歌：<Progress :percentage="percentPlay" height="5px" color="#f75757" /><span class="last">还需听歌{{ lastPLayCount }}首</span>
    </div>
    <div class="progress">
      登录：<Progress :percentage="percentLogin" height="5px" color="#f75757" /><span class="last">还需登录{{ lastLoginDay }}天</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getUserLevelInfoAPI } from '@/apis/user'
import { onMounted, ref, computed } from 'vue'
import Progress from '@/components/Progress'
import { InfoFilled } from '@element-plus/icons-vue'

const levelInfo = ref(null)

const percentage = computed(() => {
  return (levelInfo.value?.level + levelInfo.value?.progress) / 10
})

const percentPlay = computed(() => {
  return (levelInfo.value?.nowPlayCount / levelInfo.value?.nextPlayCount)
})

const lastPLayCount = computed(() => {
  return (levelInfo.value?.nextPlayCount - levelInfo.value?.nowPlayCount)
})

const percentLogin = computed(() => {
  return (levelInfo.value?.nowLoginCount / levelInfo.value?.nextLoginCount)
})

const lastLoginDay = computed(() => {
  return (levelInfo.value?.nextLoginCount - levelInfo.value?.nowLoginCount)
})

onMounted(() => {
  getLevelInfo()
})

const getLevelInfo = async () => {
  const res = await getUserLevelInfoAPI()
  levelInfo.value = res.data.data
}
</script>

<style lang="scss" scoped>
.userLevel-wrap {
  padding: 40px;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  .title {
    height: 32px;
    margin-bottom: 40px;
    line-height: 32px;
    font-weight: normal;
    .lv {
      position: relative;
      margin-left: 30px;
      line-height: 32px;
      font-size: 24px;
      font-weight: 700;
      font-style: italic;
      color: #e03a24;
      .icon-lv-30 {
        position: absolute;
        left: -30px;
        top: 0;
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url('@/assets/icons/mylevel.png') left 5px no-repeat;
      }
    }
  }
  .tips {
    margin-top: 10px;
    color: #999;
  }
  .privilege {
    margin-top: 30px;
    padding-bottom: 40px;
    border-bottom: 1px solid #ccc;
    dt {
      font-size: 22px;
    }
    dd {
      height: 30px;
      padding-left: 12px;
      line-height: 30px;
      color: #555;
      background: url('@/assets/icons/mylevel.png') -17px -82px no-repeat;
    }
  }
  .other {
    margin-top: 40px;
    .lv-max {
      position: relative;
      margin-left: 25px;
      color: #e03a24;
      font-size: 18px;
      font-weight: 700;
      font-style: italic;
      .icon-lv-20 {
        position: absolute;
        left: -25px;
        top: 0;
        width: 25px;
        height: 22px;
        background: url('@/assets/icons/mylevel.png') 0 -25px no-repeat;
      }
    }
    .desc {
      margin-top: -1px;
      margin-left: 10px;
      vertical-align: top;
      cursor: pointer;
    }
  }
  .progress {
    display: flex;
    align-items: center ;
    padding: 10px 0;
    font-size: 12px;
    color: #666;
    .last {
      margin-left: 4px;
      color: #999;
    }
  }
}
</style>
