<template>
  <div class="produce-wrap">
    <template v-if="isEmpyt">
      <div
        v-for="(item, index) in data?.introduction"
        :key="item.ti"
        class="items"
      >
        <template v-if="index === 0">
          <h4 class="bar">
            {{ props.name }}简介
          </h4>
          <p class="indent">
            {{ data?.briefDesc }}
          </p>
        </template>
        <template v-else>
          <h4>{{ item.ti }}</h4>
          <template v-if="item.txt.includes('\n')">
            <p v-for="(item1, index1) in item.txt.split('\n')" :key="index1">
              {{ item1 }}
            </p>
          </template>
          <template v-else>
            {{ item.txt }}
          </template>
        </template>
      </div>
    </template>
    <template v-else>
      <el-empty description="暂无介绍~"></el-empty>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { getArtistProduceAPI } from '@/apis/artist'
import { ref, onMounted, computed } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import type { artistProduceType } from '@/types'

const props = defineProps({
  name: { type: String, default: '' }
})

const route = useRoute()

const data = ref<artistProduceType>()

const isEmpyt = computed(() => {
  return data.value?.briefDesc && data.value?.introduction && data.value?.topicData
})

onMounted(() => {
  getProduce(route.params.id)
})

onBeforeRouteUpdate((to) => {
  if (to) {
    getProduce(to.params.id)
  }
})

const getProduce = async(id: string | string[]) => {
  const res = await getArtistProduceAPI(id as unknown as number)
  data.value = res.data
}
</script>

<style lang="scss" scoped>
.produce-wrap {
  .items {
    margin-bottom: 20px;
  }
  .bar {
    position: relative;
    padding-left: 10px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background-color: $themeColor;
    }
  }
  h4 {
    margin-bottom: 12px;
  }
  p {
    line-height: 26px;
    font-size: 12px;
    color: #666;
  }
  .indent {
    text-indent: 2em;
  }
}
</style>
