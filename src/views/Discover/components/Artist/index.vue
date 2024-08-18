<template>
  <div class="w980 discover-artist-wrap">
    <el-menu
      class="menu"
      :default-active="currentPath"
      :default-openeds="['推荐', '华语', '欧美', '日本', '韩国', '其他']"
      router
    >
      <el-sub-menu
        v-for="cate in catelist"
        :key="cate.area"
        :index="cate.area"
      >
        <template #title>
          <span>{{ cate.area }}</span>
        </template>
        <el-menu-item
          v-for="(type, index) in cate.type"
          :key="index"
          :index="cate.path[index]"
          @click="select(
            type,
            cate.area,
          )"
        >
          {{ cate.area === '推荐' ? type : cate.area + '' + type }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="main">
      <h2 class="header">
        {{ currentCate }}
      </h2>
      <ul v-if="currentPath!=='/discover/artist'" class="filter">
        <li
          v-for="(item, index) in filterlist"
          :key="index"
          :class="initial === item as any ? 'active' : ''"
          @click="handleFilter(item)"
        >
          <template v-if="item === '-1'">
            热门
          </template>
          <template v-else-if="item === '0'">
            其他
          </template>
          <template v-else>
            {{ item }}
          </template>
        </li>
      </ul>
      <ul class="hot">
        <li
          v-for="item in artistlist?.artists.slice(0, 10)"
          :key="item.id"
          class="hot-items"
        >
          <Card>
            <router-link :to="`/artist/${item.id}`" :title="item.name">
              <Pic :src="item.picUrl + '?param=130y130'"></Pic>
            </router-link>
            <template #footer>
              <div class="fl-sb">
                <router-link :to="`/artist/${item.id}`" :title="item.name">
                  <p class="ellipsis-1 hot-name">
                    {{ item.name }}
                  </p>
                </router-link>
                <router-link
                  v-if="item.accountId"
                  :to="`/user/home/${item.accountId}`"
                  :title="item.name + '的主页'"
                >
                  <i class="icon-home"></i>
                </router-link>
              </div>
            </template>
          </Card>
        </li>
      </ul>
      <ul class="all">
        <li
          v-for="item in artistlist?.artists.slice(10, 100)"
          :key="item.id"
          class="all-items"
        >
          <router-link :to="`/artist/${item.id}`" :title="item.name">
            <p class="ellipsis-1 all-items-name">
              {{ item.name }}
            </p>
          </router-link>
          <router-link
            v-if="item.accountId"
            :to="`/user/home/${item.accountId}`"
            :title="item.name + '的主页'"
          >
            <i class="icon-home"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getArtistlistAPI, getHotSinger } from '@/apis/singer'
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { catelist, areaObj, typeObj, filterlist } from './data'
import type {
  getArtistlistType,
  ArtistlistInitialType,
  ArtistlistTypeType,
  ArtistlistAreaType,
  topSingerType
} from '@/types'

const route = useRoute()
const router = useRouter()

const limit = 100
const offset = 0
let initial: ArtistlistInitialType = route.query.initial as any || '-1'

const artistlist = ref<topSingerType>()
const currentCate = ref(
  route.fullPath !== '/discover/artist'
    ? route.query.area + '' + route.query.type
    : '推荐歌手'
)

const currentPath = computed(() => {
  return route.path !== '/discover/artist'
    ? `${route.path}?area=${route.query.area}&type=${route.query.type}`
    : '/discover/artist'
})

onMounted(() => {
  getArtistlist({
    limit,
    offset,
    initial,
    type: typeObj[route.query.type as keyof typeof typeObj] as ArtistlistTypeType,
    area: areaObj[route.query.area as keyof typeof areaObj] as ArtistlistAreaType
  })
})

const getArtistlist = async({ limit, offset, initial, type, area }: getArtistlistType) => {
  let res
  if (route.fullPath === '/discover/artist') {
    res = await getHotSinger(100)
  }
  else {
    res = await getArtistlistAPI({ limit, offset, initial, type, area })
  }
  artistlist.value = res.data
}

const select = (type: string, area: string) => {
  currentCate.value = area + '' + type
  getArtistlist({
    limit,
    offset,
    initial,
    type: typeObj[type as keyof typeof typeObj] as ArtistlistTypeType,
    area: areaObj[area as keyof typeof areaObj] as ArtistlistAreaType
  })
}

const handleFilter = (cate: any) => {
  if (cate === '#') initial = 0
  else initial = cate
  getArtistlist({
    limit,
    offset,
    initial,
    type: typeObj[route.query.type as keyof typeof typeObj] as ArtistlistTypeType,
    area: areaObj[route.query.area as keyof typeof areaObj] as ArtistlistAreaType
  })
  router.push({ path: route.path, query: { area: route.query.area, type: route.query.type, initial }})
}
</script>

<style scoped lang="scss">
.discover-artist-wrap {
  display: flex;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .menu {
    flex: 1;
    padding: 30px 0;
    :deep(.el-sub-menu__title) {
      height: 35px;
    }
    :deep(.el-sub-menu .el-menu-item) {
      height: 35px;
    }
  }
  .main {
    flex: 4;
    padding: 40px 30px;
    .header {
      margin-bottom: 15px;
      padding-bottom: 10px;
      font-weight: normal;
      border-bottom: 2px solid $themeColor;
    }
    .filter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 15px;
      li {
        padding: 3px 5px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .active {
        color: #fff;
        background-color: $themeColor;
        border-radius: 2px;
      }
    }
    .icon-home {
      display: block;
      width: 17px;
      height: 18px;
      background: url('@/assets/icons/icon.png') 0 -740px no-repeat;
      cursor: pointer;
    }
    .hot {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .hot-items {
        width: 130px;
        margin-bottom: 20px;
        font-size: 12px;
        p {
          &:hover {
            text-decoration: underline;
          }
        }
        .pic-wrap {
          width: 130px;
          height: 130px;
        }
        .hot-name {
          width: 110px;
        }
      }
    }
    .all {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-top: 20px;
      .all-items {
        display: flex;
        align-items: center;
        width: 18%;
        margin-bottom: 10px;
        padding-left: 10px;
        font-size: 12px;
        .all-items-name {
          max-width: 90px;
        }
        a {
          p {
            margin-right: 6px;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
