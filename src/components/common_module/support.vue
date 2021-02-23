<template>
  <view>
    <view :style="styles" v-if="supportData.title != '' && supportData.hidden == false" class="f26 ac h50" style="color:#DEDEDE;width:100%" @tap="go_url(supportData.jump_type, supportData.jump_data)">
      {{ supportData.title }}
    </view>
  </view>
</template>

<script>
  import {
    baseURL
  } from "@/api/config";
  import colorRgba from "@/util/color.js";
  import {
    mapState,
    mapMutations
  } from "vuex";
  export default {
    name: "support",
    props: ['styles'],
    data() {
      return {
        rgbaColor: "rgba(0,0,0,0.2)",
        supportData: {},
      };
    },
    computed: {
      ...mapState(["topicStyle"]),
    },
    created() {
      this._initSupport();
      if (this.topicStyle.color) {
        this.rgbaColor = colorRgba(this.topicStyle.color, 0.1);
      }
    },
    methods: {
      _initSupport() {
        this.$http({
            url: "/mall/basic/setting/customSupport",
            method: "POST",
          },
          (res) => {
            this.supportData = res;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      go_url(e, url) {
        if (e == 1) {
          // #ifdef MP-WEIXIN
          uni.navigateToMiniProgram({
            appId: url,
            success(res) {
              // 打开成功
              console.log("打开成功");
            },
            fail(err) {
              console.log("打开失败");
            },
          });
          // #endif
        } else if (e == 2) {
          // #ifdef MP-WEIXIN
          uni.navigateTo({
            url: "/pages/webview/webview?url=" + url,
          });
          // #endif
          // #ifdef H5
          window.location.href = url;
          // #endif
        } else {
          console.log("当前小程序的一个页面", url);
          uni.navigateTo({
            url: url,
          });
        }
      },
    },
  };
</script>

<style scoped>
</style>