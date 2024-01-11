import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTop } from '@/apis/home'

export const useTopStore = defineStore('top', () => {
  const topId = ref([])
  const topList = ref([])

  const actionTopId = async () => {
    const res = await getTop()
    topId.value = res.data.list.map(v => {
      return { id: v.id, name: v.name, imgUrl: v.coverImgUrl }
    })
  }

  return {
    topId,
    topList,
    actionTopId
  }
})
