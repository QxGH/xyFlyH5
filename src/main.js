import Vue from 'vue'
import App from './App'
import store from './store'

// #ifdef H5
import {AesDecrypt} from './util/crypto.js';
import wechat from './util/wechat.js';
Vue.prototype.$wechat = wechat;
// #endif


import scrollTo from './util/scrollTo.js';
import {http} from './util/http.js';
Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$http = http;
Vue.prototype.$scrollTo = scrollTo;

Vue.filter('minNum', (num) => {
    num = num / 100; //所有价格以分为单位 需除100
    if (num >= 1000000) {
        num = num / 1000000;
        return num.toFixed(2) + '百万'
    }else if (num >= 10000) {
        num = num / 10000;
        return num.toFixed(2)+ '万'
    }
    return num.toFixed(2);
})

Vue.filter('minPoint', (num) => {
  num = num / 100; //所有价格以分为单位 需除100
  if (num >= 1000000) {
    num = num / 1000000;
    return formatDecimal(num,2) + '百万'
  } else if (num >= 10000) {
    num = num / 10000;
    return formatDecimal(num, 2) + '万'
  }
  return num;
})

function formatDecimal(num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}
import x_not_network from '@/components/not_network_module/x_not_network.vue';
import x_loading from '@/components/common_module/loading.vue';
import support from '@/components/common_module/support.vue'
import CustomAsyncError from "@/components/custom-async-error/index";
import no_content from '@/components/common_module/no_content.vue'
import popout from '@/components/common_module/popout.vue'

import openSetting from '@/components/common_module/openSetting.vue'
import guide from '@/components/common_module/guide.vue'

Vue.component('x-not-network', x_not_network)
Vue.component('x-loading', x_loading)
Vue.component('support', support)
Vue.component("x-popout", popout)
Vue.component("x-opensetting", openSetting)
Vue.component("guide", guide)
/**
 * 自定义页面按需加载失败时显示的组件注册
 */
Vue.component('CustomAsyncError', CustomAsyncError)
Vue.component('no-content', no_content)
App.mpType = 'app'

function GetRequest(urlStr) {
    if (typeof(urlStr) == "undefined") {
        var url = decodeURI(location.search); //获取url中"?"符后的字符串
    } else {
        var url = "?" + urlStr.split("?")[1];
    }
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

const app = new Vue({
    store,
    ...App,
    created() {
        // #ifdef H5
        // 授权成功
        if (window.location.search) {
            var data = GetRequest();
            if (data.authFinish && data.encryptData) {
                // 登录
                if ('development' === process.env.NODE_ENV || 'test' === process.env.RUNNING_MODE) {
                  uni.setStorageSync('c_token', JSON.parse(AesDecrypt(decodeURIComponent(data.encryptData))))
                } else {
                  uni.setStorageSync('z_token', JSON.parse(AesDecrypt(decodeURIComponent(data.encryptData))))
                }
                delete data.authFinish;
                delete data.encryptData;
                var data_string = '';
                var arr = Object.keys(data);
                for (let key in data) {
                    if (key == arr[0]) {
                        data_string += '?' + key + "=" + data[key]
                    } else {
                        data_string += '&' + key + "=" + data[key]
                    }
                }
                location.href = location.protocol + '//' + location.host + location.pathname + data_string
            } else {
              if (data.preview) {
                // 预览模板
                var preview = data.preview;
                sessionStorage.setItem('preview', preview)
              }
            }
        }
        // #endif
    }
})
app.$mount()
