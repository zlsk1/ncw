<template>
  <div class="emj-wrap">
    <el-popover
      trigger="click"
      :teleported="false"
      placement="bottom-start"
      :hide-after="0"
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
      @hide="hide"
    >
      <template #reference>
        <slot />
      </template>
      <div class="emj-content">
        <span
          v-for="item in emjArr.slice(page.pageSize * (page.currentPage - 1), page.pageSize * page.currentPage)"
          :key="item.url"
          class="items"
          :title="item.txt"
          @click="choose"
        >
          <img :src="item.url" alt="" :data-txt="item.txt">
        </span>
      </div>
      <div class="pagination f12 fl-sb">
        <i class="switch" @click="prev" />
        {{ page.currentPage }}/{{ total }}
        <i class="next switch" @click="next" />
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue'
const emit = defineEmits(['choose'])

const emjArr = [
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_86.png',
    txt: '大笑'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_85.png',
    txt: '可爱'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_359.png',
    txt: '憨笑'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_95.png',
    txt: '色'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_363.png',
    txt: '亲亲'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_96.png',
    txt: '惊恐'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_356.png',
    txt: '流泪'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_362.png',
    txt: '亲'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_352.png',
    txt: '呆'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_342.png',
    txt: '哀伤'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_343.png',
    txt: '呲牙'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_348.png',
    txt: '吐舌'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_353.png',
    txt: '撇嘴'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_361.png',
    txt: '怒'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_341.png',
    txt: '奸笑'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_97.png',
    txt: '汗'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_346.png',
    txt: '痛苦'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_354.png',
    txt: '惶恐'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_350.png',
    txt: '生病'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_351.png',
    txt: '口罩'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_357.png',
    txt: '大哭'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_355.png',
    txt: '晕'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_115.png',
    txt: '发怒'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_360.png',
    txt: '开心'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_94.png',
    txt: '鬼脸'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_87.png',
    txt: '皱眉'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_358.png',
    txt: '流感'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_33.png',
    txt: '爱心'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_34.png',
    txt: '心碎'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_303.png',
    txt: '钟情'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_309.png',
    txt: '星星'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_314.png',
    txt: '生气'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_89.png',
    txt: '便便'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_13.png',
    txt: '强'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_372.png',
    txt: '弱'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_14.png',
    txt: '拜'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_379.png',
    txt: '牵手'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_380.png',
    txt: '跳舞'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_374.png',
    txt: '禁止'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_262.png',
    txt: '这边'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_106.png',
    txt: '爱意'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_376.png',
    txt: '示爱'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_367.png',
    txt: '嘴唇'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_81.png',
    txt: '狗'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_78.png',
    txt: '猫'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_100.png',
    txt: '猪'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_459.png',
    txt: '兔子'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_450.png',
    txt: '小鸡'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_461.png',
    txt: '公鸡'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_116.png',
    txt: '幽灵'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_411.png',
    txt: '圣诞'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_101.png',
    txt: '外星'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_52.png',
    txt: '钻石'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_107.png',
    txt: '礼物'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_0.png',
    txt: '男孩'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_1.png',
    txt: '女孩'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_337.png',
    txt: '蛋糕'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_186.png',
    txt: '18'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_312.png',
    txt: '圈'
  },
  {
    url: 'http://s1.music.126.net/style/web2/emt/emoji_313.png',
    txt: '叉'
  }
]

const page = ref({
  pageSize: 50,
  currentPage: 1
})

const total = computed(() => {
  return Math.ceil(emjArr.length / page.value.pageSize)
})

let next = () => {
  if (page.value.currentPage === total.value) return
  else page.value.currentPage += 1
}

let prev = () => {
  if (page.value.currentPage === 1) return
  else page.value.currentPage -= 1
}

let choose = e => {
  emit('choose', e.target.dataset.txt)
}

let hide = () => {
  if (page.value.currentPage === 1) return
  page.value.currentPage = 1
}

onUnmounted(() => {
  next = null; prev = null; choose = null; hide = null
})
</script>

<style lang="scss" scoped>
  :deep(.el-popper.is-light .el-popper__arrow::before) {
    border: 1px solid #a6a6a6;
  }
  :deep(.el-popover.el-popper) {
    position: relative;
    width: 290px !important;
    height: 165px;
    padding: 8px;
    background-color: #fff;
    border: 1px solid #a6a6a6;
    border-radius: 4px;
  }

  .emj-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .items {
      padding: 1px;
      border: 1px solid transparent;
      cursor: pointer;
      img {
        width: 21px;
        height: 21px;
      }
      &:hover {
        border: 1px solid #3d91ec;
      }
    }
  }
  .pagination {
    position: absolute;
    right: calc(50% - 50px);
    bottom: 10px;
    width: 100px;
    padding-top: 6px;
    .switch {
      display: block;
      width: 9px;
      height: 9px;
      background: url('@/assets/icons/button.png') -110px 0 no-repeat;
      cursor: pointer;
      &:hover {
        background-position: -110px -20px;
      }
    }
    .next {
      transform: rotate(180deg);
    }
  }
</style>
