<template>
  <div
    class="carousel-wrap"
    :style="{ height: height }"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
  >
    <div class="prev" @click="prev">
      <ArrowLeft color="#fff" style="width:2em;height:2em;vertical-align:middle;" />
    </div>
    <div class="next" @click="next">
      <ArrowRight color="#fff " style="width:2em;height:2em;vertical-align:middle;" />
    </div>
    <div ref="content" class="carousel-content">
      <slot />
    </div>
    <ul class="indicator" :style="{ left: `calc(37.5% - (${items} * 8px))` }">
      <li
        v-for="(item, index) in items"
        :key="index"
        @click="indicator(index)"
      >
        <i :class="index === _i ? 'active-indicator' : ''" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { ref, computed, watch, onUpdated, onBeforeUnmount } from 'vue'
import { debounce } from '@/utils/index'

const props = defineProps({
  height: { type: String, default: '120px' },
  autoplay: { type: Boolean, default: true },
  interval: { type: String, default: '6000' }
})

const items = ref(null)
const content = ref(null)
const i = ref(0)
const isRender = ref(false)
let timer = null

const _i = computed(() => {
  return i.value === items.value ? 0 : i.value
})

watch(isRender, (newVal, oldVal) => {
  if (!oldVal) {
    items.value = content.value.children.length
    const first = content.value.children[0].cloneNode(true)
    content.value.append(first)
    props.autoplay ? handleAutoplay() : ''
  }
})

onBeforeUnmount(() => {
  next = null; prev = null; indicator = null; mouseover = null; mouseleave = null
  clearInterval(timer)
})

onUpdated(() => {
  content.value.children.length ? isRender.value = true : ''
})

const goto = () => {
  content.value ? content.value.style.transition = 'all .3s linear' : ''
  content.value ? content.value.style.transform = `translateX(calc(-100% * ${i.value}))` : ''
}

const _next = () => {
  if (i.value < items.value) {
    i.value++
    goto()
  } else {
    content.value ? content.value.style.transition = 'none' : ''
    content.value ? content.value.style.transform = 'none' : 'translateX(0)'
    setTimeout(() => { i.value = 1; goto() }, 0)
  }
}

const _prev = () => {
  if (i.value > 0) {
    i.value--
    goto()
  } else {
    content.value.style.transition = 'none'
    content.value.style.transform = `translateX(calc(-100% * ${items.value}))`
    setTimeout(() => { i.value = items.value - 1; goto() }, 0)
  }
}

const _indicator = index => {
  index > i.value ? content.value.style.transform = `translateX(calc(-100% * ${index}))` : content.value.style.transform = `translateX(calc(-100% * ${index}))`
  i.value = index
}

let indicator = debounce(_indicator, 300)
let prev = debounce(_prev, 300)
let next = debounce(_next, 300)

const handleAutoplay = () => {
  timer = setInterval(() => { next() }, props.interval)
}

let mouseover = () => { clearInterval(timer); timer = null }

let mouseleave = () => { handleAutoplay() }
</script>

<style lang="scss" scoped>
  .carousel-wrap {
    position: relative;
    width: 100%;
    overflow: hidden;
    .carousel-content {
      display: flex;
    }
    .carousel-content {
      display: flex;
      width: 100%;
      height: 100%;
      transition: all .6s linear;
    }
    .prev {
      position: absolute;
      left: 20px;
      top: calc(50% - 17.5px);
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 50%;
      background-color: rgba(31, 45, 61, .11);
      cursor: pointer;
      transition: .15s;
      z-index: 9999;
      &:hover {
        background-color: rgba(31, 45, 61, .31);
      }
    }
    .next {
      position: absolute;
      right: 20px;
      top: calc(50% - 17.5px);
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 50%;
      background-color: rgba(31, 45, 61, .11);
      cursor: pointer;
      transition: .15s;
      z-index: 999;
      &:hover {
        background-color: rgba(31, 45, 61, .51);
      }
    }
    .indicator {
      position: absolute;
      bottom: 10px;
      display: flex;
      li {
        padding: 5px;
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
  }
  .active-indicator {
    background-color: #c60b11 !important;
  }
</style>
