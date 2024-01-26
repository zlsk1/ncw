<template>
  <div class="songAside-wrap">
    <div class="simi">
      <div class="header">
        相似歌曲
      </div>
      <ul>
        <li v-for="item in props.similarSongs" :key="item.id" class="simi-items fl-sb">
          <div class="left">
            <div>
              <router-link :to="`/song/${item.id}`" class="name">
                <p class="ellipsis-1" :title="item.name">
                  {{ item.name }}
                </p>
              </router-link>
            </div>
            <div>
              <router-link to="/" class="singer">
                <p class="ellipsis-1" :title="item.artists.length === 1 ? item.artists.map(v => { return v.name }).join('/') : item.artists[0].name">
                  {{ item.artists.length === 1 ? item.artists.map(v => { return v.name }).join('/') : item.artists[0].name }}
                </p>
              </router-link>
            </div>
          </div>
          <div class="right">
            <i class="icon-play" />
            <i class="icon-add" />
          </div>
        </li>
      </ul>
    </div>
    <div class="download">
      <div class="header">
        网易云音乐多端下载
      </div>
      <ul class="download-bg fl-sb">
        <li>
          <a class="apple" href="https://itunes.apple.com/cn/app/id590338362" target="_blank" />
        </li>
        <li>
          <a href="" class="window" />
        </li>
        <li>
          <a href="" class="android" />
        </li>
      </ul>
      <p class="desc f12">
        同步歌单，随时畅听好音乐
      </p>
    </div>
    <div class="wiki">
      <div class="header">
        用户wiki
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  similarSongs: { type: Array, default: () => [] }
})
</script>

<style lang="scss" scoped>
  .songAside-wrap {
    padding: 20px 40px 0 20px;
    border-right: 1px solid #d3d3d3;
    .header {
      margin-bottom: 20px;
      padding-bottom: 10px;
      font-weight: 700;
      font-size: 12px;
      border-bottom: 1px solid #ccc;
    }
    .simi {
      padding-bottom: 30px;
      .simi-items {
        margin-bottom: 10px;
        .left {
          width: 160px;
          a {
            font-size: 12px;
            &:hover {
              text-decoration: underline;
            }
          }
          .name {
            color: #333;
          }
          .singer {
            color: #999
          }
        }
        .right {
          i {
            display: inline-block;
            width: 10px;
            height: 11px;
            background: url('@/assets/icons/icon2.png') no-repeat;
            cursor: pointer;
          }
          .icon-play {
            margin-right: 20px;
            background-position: -69px -455px;
            opacity: .8;
            &:hover {
              opacity: 1;
            }
          }
          .icon-add {
            background-position: -87px -454px;
            opacity: .8;
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
    .download {
      padding-bottom: 30px;
      .download-bg {
        margin-bottom: 30px;
        a {
          display: block;
          height: 48px;
          background: url('@/assets/icons/sprite.png') no-repeat;
        }
        .apple {
          width: 42px;
          background-position: 0 -392px;
          &:hover {
            background-position: 0 -472px;
          }
        }
        .window {
          width: 100px;
          background-position: -50px -392px;
          &:hover {
            background-position: -50px -472px;
          }
        }
        .android {
          width: 42px;
          background-position: -160px -392px;
          &:hover {
            background-position: -160px -472px;
          }
        }
      }
      .desc {
        color: #999;
      }
    }
  }
</style>
