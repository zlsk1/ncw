<template>
  <div v-loading="isLoad" class="mv-wrap" :style="{justifyContent: MVlist!.length ? '' : 'center'}">
    <template v-if="MVlist!.length">
      <Card v-for="item in MVlist" :key="item.id">
        <router-link to="/">
          <Pic :src="item.imgurl + '?param=120y100'" play mask4 />
        </router-link>
        <template #footer>
          <router-link to="/" :title="item.name">
            <p class="ellipsis-1">
              {{ item.name }}
            </p>
          </router-link>
        </template>
      </Card>
    </template>
    <template v-else>
      <el-empty description="暂无数据" />
    </template>
    <!-- <el-button type="primary" :loading="loading">
      查看更多
    </el-button> -->
  </div>
</template>

<script lang="ts" setup>
import { getArtistMVAPI } from '@/apis/artist'
import { onMounted, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import Card from '@/components/Card/index.vue'
import type { artistMVItemsType } from '@/types'

const route = useRoute()

const MVlist = ref<artistMVItemsType[]>()
const isLoad = ref(true)

onMounted(() => {
  getMV(route.params.id)
})

onBeforeRouteUpdate((to) => {
  if (to) {
    getMV(to.params.id)
  }
})

const getMV = async (id: any) => {
  const res = await getArtistMVAPI(id)
  MVlist.value = res.data.mvs
  isLoad.value = false
}
</script>

<style lang="scss" scoped>
.mv-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .card-wrap {
    width: 120px;
    margin-right: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    &:nth-child(5n) {
      margin-right: 0;
    }
    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
