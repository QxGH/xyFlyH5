<template>
  <div class="user-info">
    <h3 class="user-nickname">{{ user.nickname }}</h3>
    <p class="user-avatar-box"><img :src="user.avatar" alt=""/></p>
  </div>
</template>

<script>

import {
  mapState,
  mapMutations
} from "vuex";

export default {
  components: {},
  data() {
    return {
      title: '咸阳机场',
      user: {
        nickname: '',
        avatar: ''
      }
    };
  },
  onShow() {
  },
  activated() {
    this.set_refreshTask(true)
  },
  onLoad(option) {
    this.setNav();

    this.$wechat.initJssdk();

    // #ifdef H5
    this.officialAccount()
    // #endif

    let userInfo = uni.getStorageSync('userInfo');
    console.log('getUserInfo', userInfo)
    this.user = userInfo
  },
  onPullDownRefresh() {
  },
  onReachBottom() {
  },
  onPageScroll(e) {
    // var t = 200,
    // m = Math.min(e.scrollTop, t) / t;
  },
  computed: {
    ...mapState(["topicStyle", "tab_data", "activeIndex", "tabbar_hide"]),
  },
  methods: {
    ...mapMutations(["set_tab_data", "set_topicStyle", "set_activeIndex", "set_tabbar_hide", 'set_index_first', 'set_shareCover', 'set_refreshTask', 'set_floatbox']),
    /* 关闭预览框 */
    // #ifdef H5
    close_prompt() {
      this.preview_prompt = false
    },
    // #endif

    /* 设置导航 */
    setNav() {
      uni.setNavigationBarTitle({
        title: this.title,
      });
    },

    /* H5分享设置 */
    share(type) {
      let that = this;
      if (this.$wechat && this.$wechat.isWechat()) {
        this.$wechat.share({
          'title': '',
          'desc': '',
          'img': ''
        }, location.protocol + '//' + location.host + location.pathname + '?activeIndex=' + that.activeIndex + '&utoken=' + this.$store.state.utoken);
      }
    },

    // #ifdef H5
    // 店铺授权
    loginJump() {
      this.$http({
        url: '/users/auth/channel/officialAccount/loginJump',
        data: {
          jump: '',
          alias: this.$store.state.extConfig.mtoken,
          scopes: 'snsapi_userinfo',
          attach: '',
          channelAuth: true
        },
        method: "POST"
      }, res => {
        location.href = res.jumpUrl
      }, err => {
        console.log(err)
      })
    },
    officialAccount() {
      if (sessionStorage.getItem('officialAccountAuthStatus') && sessionStorage.getItem('userChannelAuthStatus')) {
      } else {
        this.$http({
          url: '/users/auth/channel/officialAccount/status',
          method: 'POST'
        }, res => {
          if (res.officialAccountAuthStatus) {
            if (res.officialAccountAuthStatus && res.userChannelAuthStatus == false) {
              // 需要店铺授权
              this.loginJump()
            } else if (res.officialAccountAuthStatus && res.userChannelAuthStatus) {
              sessionStorage.setItem('officialAccountAuthStatus', true)
              sessionStorage.setItem('userChannelAuthStatus', true)
            }
          } else {
          }
        }, err => {
          console.log(err)
        })
      }
    },
    // #endif

  },
};
</script>

<style scoped>
.user-info {
  margin-top: 20%;
  text-align: center;
}

.user-info .user-nickname {
  font-size: 42rpx;
}

.user-info .user-avatar-box {
  display: inline-block;
  margin-top: 30rpx;
}

.user-info .user-avatar-box img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: #9a9a9a 1px solid;
}

</style>
