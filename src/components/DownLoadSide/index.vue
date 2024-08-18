<template>
  <div>
    <div class="download">
      <div class="header">
        网易云音乐多端下载
      </div>
      <ul class="download-bg fl-sb">
        <li>
          <a
            class="apple"
            href="https://itunes.apple.com/cn/app/id590338362"
            target="_blank"
          ></a>
        </li>
        <li>
          <a href="" class="window"></a>
        </li>
        <li>
          <a href="" class="android"></a>
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

<script lang="ts" setup></script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-weight: 700;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
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
</style>
