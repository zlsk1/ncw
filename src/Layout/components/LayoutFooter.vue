<template>
  <footer class="footer-wrap">
    <div class="w980">
      <ul class="fl-sb help">
        <li>
          <a href="" target="_blank" />
          <span>音乐开放平台</span>
        </li>
        <li>
          <a href="" target="_blank" />
          <span>云村交易所</span>
        </li>
        <li>
          <a href="" target="_blank" />
          <span>Amped Studio</span>
        </li>
        <li>
          <a href="" target="_blank" />
          <span>X Studio虚拟歌手</span>
        </li>
        <li>
          <a href="" target="_blank" />
          <span>用户认证</span>
        </li>
        <li>
          <a href="" target="_blank" />
          <span>音乐交易平台</span>
        </li>
        <li>
          <a href="" target="_blank" />
          <span>云推歌</span>
        </li>
        <li>
          <a href="" target="_blank" />
          <span>赞赏</span>
        </li>
      </ul>
      <ul class="link">
        <li>
          <a href="">服务条款</a>
        </li>
        <li>
          <a href="">隐私政策</a>
        </li>
        <li>
          <a href="">儿童隐私政策</a>
        </li>
        <li>
          <a href="">版权投诉</a>
        </li>
        <li>
          <a href="">投资者关系</a>
        </li>
        <li>
          <a href="">广告合作</a>
        </li>
        <li>
          <a href="">联系我们</a>
        </li>
      </ul>
      <div class="report">
        <a href="">廉政举报</a>
        <span class="email">不良信息举报邮箱：51jubao@service.netease.com</span>
        <span>客服热线：95163298</span>
      </div>
      <div class="copyright">
        <div>
          互联网宗教信息服务许可证：浙（2022）0000120 增值电信业务经营许可证：浙B2-20150198
          <a href="">粤B2-20090191-18  工业和信息化部备案管理系统网站</a>
        </div>
        <div>
          网易公司版权所有©1997-2024杭州乐读科技有限公司运营：
          <a href="">浙网文[2021] 1186-054号</a>
          <img class="police" src="@/assets/icons/police.png" alt="">
          <a href="">浙公网安备 33010802013307号</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer-wrap {
    padding: 20px 0 70px 0;
    text-align: center;
    font-size: 12px;
    color: #666;
    background-color: #f2f2f2;
    .help {
      li a {
        display: block;
        width: 45px;
        height: 45px;
        margin: 0 auto 10px;
      }
      li:nth-child(1) a {
        background: url('@/assets/icons/foot_enter_new2.png') -170px -5px no-repeat;
        background-size: 220px 220px;
        &:hover {
          background: url('@/assets/icons/foot_enter_new2.png') -5px -115px no-repeat;
          background-size: 220px 220px;
        }
      }
      li:nth-child(2) a {
        background: url('@/assets/icons/foot_enter_new2.png') -5px -170px no-repeat;
        background-size: 220px 220px;
        &:hover {
          background: url('@/assets/icons/foot_enter_new2.png') -60px -170px no-repeat;
          background-size: 220px 220px;
        }
      }
      li:nth-child(3) a {
        background: url('@/assets/icons/foot_enter_new2.png') -5px -60px no-repeat;
        background-size: 220px 220px;
        &:hover {
          background: url('@/assets/icons/foot_enter_new2.png') -60px -5px no-repeat;
          background-size: 220px 220px;
        }
      }
      li:nth-child(4) a {
        background: url('@/assets/icons/xStudio.png') no-repeat;
        background-size: 45px;
        &:hover {
          background: url('@/assets/icons/xStudioHover.png') no-repeat;
          background-size: 45px;
        }
      }
      li:nth-child(5) a {
        background: url('@/assets/icons/foot_enter_new2.png') -60px -60px no-repeat;
        background-size: 220px 220px;
        &:hover {
          background: url('@/assets/icons/foot_enter_new2.png') -115px -5px no-repeat;
          background-size: 220px 220px;
        }
      }
      li:nth-child(6) a {
        background: url('@/assets/icons/foot_enter_new2.png')  -115px -115px no-repeat;
        background-size: 220px 220px;
        &:hover {
          background: url('@/assets/icons/foot_enter_new2.png') -5px -5px no-repeat;
          background-size: 220px 220px;
        }
      }
      li:nth-child(7) a {
        background: url('@/assets/icons/cloudSong.png') no-repeat;
        background-size: 45px;
        &:hover {
          background: url('@/assets/icons/cloudSongHover.png') no-repeat;
          background-size: 45px;
        }
      }
      li:nth-child(8) a {
        background: url('@/assets/icons/foot_enter_new2.png') -170px -115px no-repeat;
        background-size: 220px 220px;
        &:hover {
          background: url('@/assets/icons/foot_enter_new2.png') -60px -115px no-repeat;
          background-size: 220px 220px;
        }
      }
    }
    .link {
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        position: relative;
        margin: 50px 0 10px 0;
        padding: 0 15px;
        &:nth-child(even):after {
          content: '';
          position: absolute;
          left: 0;
          top: calc(50% - 5px);
          width: 1px;
          height: 10px;
          background-color: #ccc;
        }
        &:nth-child(even)::before {
          content: '';
          position: absolute;
          right: 0;
          top: calc(50% - 5px);
          width: 1px;
          height: 10px;
          background-color: #ccc;
        }
      }
    }
    .copyright {
      .police {
        width: 16px;
        height: 16px;
        margin-top: -2px;
      }
    }
    .report {
      .email {
        margin: 0 15px;
      }
    }
    .copyright {
      div:nth-child(1) {
        margin: 10px 0;
      }
    }
    a {
    color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>

