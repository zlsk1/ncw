<template>
  <div class="recomend-wrap">
    <Card
      v-for="item in personalizedList"
      :key="item.id"
      class="card"
      :img-url="item.picUrl"
      :play-count="formatPlayCount(item.playCount)"
    >
      <template #footer>
        {{ item.name }}
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from '@/components/Card'
import { getPersonalized } from '@/apis/home'
import { onMounted, ref } from 'vue'
import { formatPlayCount } from '@/utils/index'

const personalizedList = ref([])

const getPersonalizedList = async () => {
  const res = await getPersonalized(8)
  personalizedList.value = res.data.result
}

onMounted(() => {
  getPersonalizedList()
})
</script>

<style lang="scss" scoped>
.recomend-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .card {
    width: calc((100% - 120px) / 4);
    &:nth-child(-n+4) {
      margin-bottom: 40px;
    }
  }
}
</style>
