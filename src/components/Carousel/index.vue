<template>
  <div class="carousel-wrap">
    <div class="prev" @click="prev">
      <ArrowLeft color="#fff" />
    </div>
    <div class="next" @click="next">
      <ArrowRight color="#fff" />
    </div>
    <div ref="content" class="content">
      <!-- <ul v-for="(item, index) in arr" :key="index" class="per">
        <li v-for="(item1, index1) in item" :key="index1">
          <img :src="item1" alt="">
        </li>
      </ul> -->
      <slot />
    </div>
    <ul class="indicator" :style="{ left: `calc('50%' - (${indicatorCount} * '6px'))` }">
      <li
        v-for="(item, index) in content?.children.length"
        :key="index"
        @click="indicator(index)"
      >
        <i :class="index === i ? 'active-indicator' : ''" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { onMounted, ref, nextTick } from 'vue'
// const props = defineProps({
//   imgArr: { type: Array, default: () => { return [] } },
//   perNum: { type: Number, default: 5 }
// })
// const arr = ref([])
const i = ref(0)
const content = ref(null)
const indicatorCount = ref(0)

const next = () => {
  i.value < indicatorCount.value - 1 ? i.value++ : i.value = 0
  content.value.style.transform = `translateX(calc(-50% * ${i.value}))`
}
const prev = () => {
  i.value > 0 ? i.value-- : i.value = 0
  content.value.style.transform = `translateX(calc(50% * ${i.value}))`
}
const indicator = index => {
  index > i.value ? content.value.style.transform = `translateX(calc(-50% * ${index}))` : content.value.style.transform = `translateX(calc(50% * ${index}))`
  i.value = index
}
onMounted(async () => {
  await nextTick()
  // console.log(Array.from(content.value.children))
  indicatorCount.value = content.value.children.length
})
// onMounted(() => {
//   for (let i = 0; i < Math.ceil(props.imgArr.length / props.perNum); i++) {
//     arr.value.push(props.imgArr.slice(props.perNum * i, props.perNum * (i + 1)))
//   }
// })
</script>

<style lang="scss" scoped>
.carousel-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  .prev {
    position: absolute;
    left: 20px;
    top: calc(50% - 10px);
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    background-color: #ccc;
    cursor: pointer;
    z-index: 999;
  }
  .next {
    position: absolute;
    right: 20px;
    top: calc(50% - 10px);
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    background-color: #ccc;
    cursor: pointer;
    z-index: 999;
  }
  .indicator {
    position: absolute;
    bottom: 10px;
    left: calc(50% - 12px);
    display: flex;
    li {
      padding: 3px;
      cursor: pointer;
      i {
        display: block;
        width: 6px;
        height: 6px;
        background-color: #ccc;
        border-radius: 50%;
        transition: .3s cubic-bezier(.9, .9, .3, .2);
      }
      &:hover i {
        background-color: #c60b11;
      }
    }
  }
  .content {
    display: flex;
    width: 200%;
    transition: all .6s linear;
  }
  .active-indicator {
    background-color: #c60b11 !important;
  }
}
</style>
