<template>
  <div class="playBar-wrap">
    <div class="bg" />
    <div class="w980 content">
      <div class="btns fl-sb">
        <i class="prev" />
        <i class="play" />
        <i class="suspend" />
        <i class="next" />
        <i class="from" />
        <i class="pip" />
        <i class="addlist" />
        <i class="share" />
        <i class="volume" />
        <i class="playType" />
        <i class="playlist" />
        <i class="lock" />
        <i class="unlock" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playBar-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  .bg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 53px;
    margin-right: 67px;
    background: url('@/assets/icons/playbar.png') 0 0 repeat-x;
  }
  .content {
    position: absolute;
    left: 0;
    top: -53px;
    height: 53px;
    zoom: 1;
    .btns {
      i {
        display: block;
        background: url('@/assets/icons/playbar.png') no-repeat;
        cursor: pointer;
      }
      .prev {
        width: 28px;
        height: 28px;
        background-position: 0 -130px;
        &:hover {
          background-position: -30px -130px;
        }
      }
      .play {
        width: 36px;
        height: 36px;
        background-position: 0 -204px;
        &:hover {
          background-position: -40px -204px;
        }
      }
      .suspend {
        width: 36px;
        height: 36px;
        background-position: 0 -165px;
        &:hover {
          background-position: -40px -165px;
        }
      }
      .next {
        width: 28px;
        height: 28px;
        background-position: -80px -130px;
        &:hover {
          background-position: -110px -130px;
        }
      }
      .from {
        width: 14px;
        height: 15px;
        background-position: -110px -103px;
        &:hover {
          background-position: -130px -103px;
        }
      }
      .pip {
        width: 25px;
        height: 25px;
        background: url('@/assets/icons/pip.png') no-repeat;
        &:hover {
          background-position: 0 -25px;
        }
      }
      .addlist {
        width: 25px;
        height: 25px;
        background-position: -88px -163px;
        &:hover {
          background-position: -88px -189px;
        }
      }
      .share {
        width: 25px;
        height: 25px;
        background-position: -114px -163px;
        &:hover {
          background-position: -114px -189px;
        }
      }
      .volume {
        width: 25px;
        height: 25px;
        background-position: -2px -248px;
        &:hover {
          background-position: -31px -248px;
        }
      }
      .playType {
        width: 25px;
        height: 25px;
        background-position: -3px -344px;
        &:hover {
          background-position: -33px -344px;
        }
      }
      .playlist {
        width: 60px;
        height: 25px;
        background-position: -42px -68px;
        &:hover {
          background-position: -42px -98px;
        }
      }
      .lock {
        width: 18px;
        height: 18px;
        background-position: -100px -380px;
        &:hover {
          background-position: -100px -400px;
        }
      }
      .unlock {
        width: 18px;
        height: 18px;
        background-position: -80px -380px;
        &:hover {
          background-position: -80px -400px;
        }
      }
    }
  }
}
</style>
