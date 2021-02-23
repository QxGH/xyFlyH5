<template>
  <view class="container" ref="container" id="container">
    123
    <button @click="createPoster">click</button>

    <block v-if="active == 1"> </block>
    <block v-else-if="active == 2"> </block>
    <block v-else-if="active == 3"> </block>
    <!-- <h3 class="user-nickname">{{ user.nickname }}</h3>
    <p class="user-avatar-box"><img :src="user.avatar" alt=""/></p> -->
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      title: "咸阳机场",
      user: {
        nickname: "",
        avatar: "",
      },
      active: 1,
    };
  },
  onShow() {},
  activated() {
    this.set_refreshTask(true);
  },
  onLoad(option) {
    this.setNav();

    this.$wechat.initJssdk();

    // #ifdef H5
    this.officialAccount();
    // #endif

    let userInfo = uni.getStorageSync("userInfo");
    console.log("getUserInfo", userInfo);
    this.user = userInfo;
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onPageScroll(e) {
    // var t = 200,
    // m = Math.min(e.scrollTop, t) / t;
  },
  computed: {
    ...mapState(["topicStyle", "tab_data", "activeIndex", "tabbar_hide"]),
  },
  methods: {
    ...mapMutations([
      "set_tab_data",
      "set_topicStyle",
      "set_activeIndex",
      "set_tabbar_hide",
      "set_index_first",
      "set_shareCover",
      "set_refreshTask",
      "set_floatbox",
    ]),
    /* 关闭预览框 */
    // #ifdef H5
    close_prompt() {
      this.preview_prompt = false;
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
        this.$wechat.share(
          {
            title: "",
            desc: "",
            img: "",
          },
          location.protocol +
            "//" +
            location.host +
            location.pathname +
            "?activeIndex=" +
            that.activeIndex +
            "&utoken=" +
            this.$store.state.utoken
        );
      }
    },
    createPoster() {
      let refsCont = document.getElementById('container');
      console.log("🚀 ~ file: index.vue ~ line 104 ~ createPoster ~ refsCont", refsCont)
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let scale = 4;

      canvas.width = refsCont.offsetWidth * scale;
      canvas.height = refsCont.offsetHeight * scale;
      canvas.getContext("2d").scale(scale, scale);

      let opts = {
        dpi: window.devicePixelRatio * 10,
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: refsCont.offsetWidth, //dom 原始宽度
        height: refsCont.offsetHeight,
        useCORS: true, // 【重要】开启跨域配置
        allowTaint: false,
      };

      setTimeout(() => {
        html2canvas(refsCont, opts)
          .then((canvas) => {
            let img = new Image();
            img.src = canvas.toDataURL("image/png");
            img.style = "width:100%;";
            img.id = "canvasFillImg";
            img.onload = () => {
              refsCont.appendChild(img);
              console.log("canvas 海报 创建成功");
            };
          })
          .catch((err) => {
            console.log("canvas 海报 创建失败");
            console.log(err);
          });
      }, 300);
    },

    createPoster2() {
      let node = document.getElementById('container');
      domtoimage.toPng(node)
      .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          node.appendChild(img);
      });
    },

    // #ifdef H5
    // 店铺授权
    loginJump() {
      this.$http(
        {
          url: "/users/auth/channel/officialAccount/loginJump",
          data: {
            jump: "",
            alias: this.$store.state.extConfig.mtoken,
            scopes: "snsapi_userinfo",
            attach: "",
            channelAuth: true,
          },
          method: "POST",
        },
        (res) => {
          location.href = res.jumpUrl;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    officialAccount() {
      if (
        sessionStorage.getItem("officialAccountAuthStatus") &&
        sessionStorage.getItem("userChannelAuthStatus")
      ) {
      } else {
        this.$http(
          {
            url: "/users/auth/channel/officialAccount/status",
            method: "POST",
          },
          (res) => {
            if (res.officialAccountAuthStatus) {
              if (
                res.officialAccountAuthStatus &&
                res.userChannelAuthStatus == false
              ) {
                // 需要店铺授权
                this.loginJump();
              } else if (
                res.officialAccountAuthStatus &&
                res.userChannelAuthStatus
              ) {
                sessionStorage.setItem("officialAccountAuthStatus", true);
                sessionStorage.setItem("userChannelAuthStatus", true);
              }
            } else {
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    // #endif
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
