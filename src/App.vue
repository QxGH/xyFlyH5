<script>
import checkVersion from './util/checkVersion';
import Store from './store';
// #ifdef MP-WEIXIN
import {
  getSetting
} from "./util/tool.js";
// #endif
// #ifdef H5
import vconsole from 'vconsole'
import Vue from "vue";
import { getLocation } from "./util/tool";
// #endif

export default {
  globalData: {
    addressData: {},
    bottom: '',
    scene: '',
    bind_customer: false,
    distributor: '',
    shopImg: '',
    pointsName: '',
    ponitsShareImg: '',
    pointsShareTitle: '',
    ponitsShareDec: '',
    pagePosterImg: '',
    // #ifdef MP-WEIXIN
    platform_config: {}
    // #endif
  },
  onLaunch: function (options) {
    console.log("App Launch", options);
    /**
     * 默认商户及店铺标识，仅在开发模式生效
     */
    let defaultBtoken = 'b678a140b1bf905de690575fc20c796e', defaultMtoken = '2df93b45ab42b59b6a02acb48c69cda5';

    if (uni.getStorageSync("vuex_state")) {
      Store.replaceState(uni.getStorageSync("vuex_state"));
      Store.state.tabbar_hide = true
      Store.state.activeIndex = 0
    }

    /* 判断机型 */
    // #ifdef H5
    var deviceType = navigator.userAgent;//获取userAgent信息  
    var md = new MobileDetect(deviceType);//初始化mobile-detect  
    var os = md.os();//获取系统
    //系统的版本号
    var version = "";
    if (os == "iOS") {//ios系统的处理  
      version = md.version("iPhone");
      if (version > 11.2) {
        Store.commit('set_compatible', true)
      }
    }
    // #endif

    // #ifdef MP-WEIXIN
    const res = uni.getSystemInfoSync();
    if (res.brand == "iPhone") {
      var version = res.system.split('iOS ')[1]
      if (parseInt(version) > 11.2) {
        Store.commit('set_compatible', true)
      }
    }
    // #endif

    let token
    if ('development' === process.env.NODE_ENV || 'test' === process.env.RUNNING_MODE) {
      token = uni.getStorageSync("c_token");
    } else {
      token = uni.getStorageSync("z_token");
    }
    if (token) {
      Store.state.utoken = token.utoken
    }


    // #ifdef  H5
    Store.state.extConfig.mtoken = token.mtoken || defaultMtoken
    // #endif

    // #ifdef  MP-WEIXIN
    Store.state.source = "wechatMp";
    // #endif
    // #ifdef  H5
    Store.state.source = "mobile";
    // #endif
    //获取手机型号
    let that = this;
    uni.getSystemInfo({
      success(res) {
        //当前所在环境
        // #ifdef MP-WEIXIN
        Store.state.env = res.platform || '';
        // #endif
        const model = res.model;
        console.log("model", model);
        const modelInclude = [
          "iPhone X",
          "iPhone XR",
          "iPhone XS",
          "iPhone XS MAX",
          "iPhone 11",
        ];
        var flag = false; //是否X以上机型
        for (let i = 0; i < modelInclude.length; i++) {
          //模糊判断是否是modelInclude 中的机型,因为真机上测试显示的model机型信息比较长无法一一精确匹配
          if (model.indexOf(modelInclude[i]) != -1) {
            flag = true;
          }
        }
        //iponeX以及iphonex以上的机型
        if (flag) {
          that.globalData.bottom = 50;
        } else {
          that.globalData.bottom = 0;
        }
      },
    });
    // #ifdef MP-WEIXIN
    //检测版本更新
    checkVersion();
    let extConfig = this.$store.state.extConfig;
    let extArr = Object.keys(extConfig);
    if (extArr.length === 0) {
      extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
      console.log("extConfig", extConfig);
      this.$store.state.version = extConfig.version || '0.0.0'
      this.$store.state.extConfig = {
        /** @var string 商户标识 */
        btoken: extConfig.btoken || defaultBtoken,
        /** @var string 店铺标识 */
        mtoken: extConfig.mtoken || defaultMtoken,
        /** @var object 插件状态 */
        pluginStatus: extConfig.pluginStatus || {}
      };
      //获取设备信息
      uni.getSystemInfo({
        success: (res) => {
          this.$store.state.clientHeight = res.windowHeight + 10;
        },
      });
    }
    // #endif

    // #ifdef  H5
    // vconsole
    if (process.env.NODE_ENV === 'development' || process.env.RUNNING_MODE === 'test') {
      Vue.prototype.$vconsole = new vconsole();
    }
    // #endif

    // #ifdef MP-WEIXIN
    getSetting((res) => {
      if (res["scope.userInfo"]) {
        Store.state.auth_user_info = true;
      } else {
        Store.state.auth_user_info = false;
      }
    });
    // #endif
  },
  methods: {
    /**
     * 获取用户位置
     */
    getUserLocation() {
      // #ifdef MP-WEIXIN
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          this.$store.state.location.auth = 1;
          this.$store.state.location.latitude = res.latitude;
          this.$store.state.location.longitude = res.longitude;
        },
        fail: () => {
          console.log("拒绝授权");
          this.$store.state.location.auth = 0;
        },
        complete: () => {
          setTimeout(this.getUserLocation, 30000);
        },
      });
      // #endif

      // #ifdef  H5
      this.$wechat.location((res) => {
        this.$store.state.location.auth = 1;
        this.$store.state.location.latitude = res.latitude;
        this.$store.state.location.longitude = res.longitude;
      });
      // #endif
    },
  },
  onShow: function (event) {

    /**
     * 获取用户地理位置（每次从后台进入前台均获取）
     */
    this.getUserLocation();
  },
  onHide: function () {
    console.log("App Hide");
  },
  // #ifdef MP-WEIXIN
  onError: function (err) {
  },
  // #endif
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./assets/css/base.css";
@import url("static/iconFont/iconfont.css");
</style>
