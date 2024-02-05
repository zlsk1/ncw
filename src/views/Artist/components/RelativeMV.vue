<template>
  <div class="mv-wrap">
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
    <!-- <el-button type="primary" :loading="loading">
      查看更多
    </el-button> -->
  </div>
</template>

<script setup>
import { getArtistMVAPI } from '@/apis/artist'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Card from '@/components/Card'

const route = useRoute()

const MVlist = ref([])
// const loading = ref(false)

const getMV = async id => {
  const res = await getArtistMVAPI(id)
  MVlist.value = res.data.mvs
}

onMounted(() => {
  getMV(route.params.id)
})
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
