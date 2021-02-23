const jweixin = require('jweixin-module')
import {http} from './http.js'

export default {
    // 请求接口获取签名
    sdk_init(cb) {
        http({
            url: '/mall/channel/officialAccount/buildConfig',
            method: 'POST'
        }, res => {
            cb(res)
        }, err => {
            console.log(err)
        })
    },

    /**
     * 判断是否在微信中
     * @returns {boolean}
     */
    isWechat: function () {
        let ua = window.navigator.userAgent.toLowerCase();
        if ('micromessenger' == ua.match(/micromessenger/i)) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 初始化jssdk
     * @param callback
     * @param params
     */
    initJssdk: function (callback, params = {}) {
        http({
            url: '/mall/channel/officialAccount/buildConfig',
            method: 'POST',
            data: params,
        }, res => {
            jweixin.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
              jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'uploadImage', 'openLocation', 'getLocation', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'scanQRCode', 'addCard', 'openCard', 'chooseWXPay', 'openAddress', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'uploadVoice'],
                openTagList: ['wx-open-launch-weapp']
            });
            jweixin.ready(function () {
              jweixin.hideMenuItems({
                menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:editTag', 'menuItem:delete', 'menuItem:copyUrl', 'menuItem:originPage', 'menuItem:readMode', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand'] //要隐藏的菜单项
              });
            });
            if (callback) callback(res)
        }, err => {
            console.log(err)
        })
    },

    /**
     * 分享（在需要自定义分享的页面中调用）
     * @param data
     * @param url
     */
    share: function (data, url, callback) {
        url = url ? url : window.location.href;
        console.log('分享 - 当前页面URL：', url);
        if (!this.isWechat()) return;
        //每次都需要重新初始化配置，才可以进行分享
        this.initJssdk(function (signData) {
            jweixin.ready(function () {
                let shareData = {
                    title: data && data.title ? data.title : '',
                    desc: data && data.desc ? data.desc : '',
                    link: data && data.link ? data.link : url,
                    imgUrl: data && data.img ? data.img : '',
                    success: function (res) {
                        if (callback) callback()
                        if (data && data.statisticsShare && typeof (data.statisticsShare) === "function"){
                          data.statisticsShare()
                        }
                        console.log('分享成功', res)
                    },
                    cancel: function (res) {
                        console.log('分享取消', res)
                    }
                };
                //分享给朋友
                jweixin.onMenuShareAppMessage(shareData);
                //分享到朋友圈
                jweixin.onMenuShareTimeline(shareData);
            })
        }, {'url': url});
    },

    /**
     * 定位（在需要定位页面调用）
     * @param callback
     */
    location: function (callback) {
        if (!this.isWechat()) return;
        this.initJssdk(function (res) {
            jweixin.ready(function () {
                jweixin.getLocation({
                    type: 'gcj02',
                    success: function (res) {
                        callback(res)
                    },
                    fail: function (res) {
                        console.log(res)
                    },
                    // complete:function(res){
                    //     console.log(res)
                    // }
                });
            });
        });
    },

    /**
     * 隐藏菜单
     * @param array list
     */
    hideMenu: function (list) {
        if (!this.isWechat()) return;
        if (!Array.isArray(list)) return;
        this.initJssdk(function (res) {
            jweixin.ready(function () {
                jweixin.hideMenuItems({
                    menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:editTag', 'menuItem:delete', 'menuItem:copyUrl', 'menuItem:originPage', 'menuItem:readMode', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand'].concat(list) //要隐藏的菜单项
                });
            });
        });
    },

    /**
     * 显示菜单
     * @param array list
     */
    showMenu: function (list) {
        if (!this.isWechat()) return;
        if (!Array.isArray(list)) return;
        this.initJssdk(function (res) {
            jweixin.ready(function () {
                jweixin.showMenuItems({
                    menuList: list //要显示的菜单项
                });
            });
        });
    },

    /**
     * 获取微信地址
     * @param callback
     */
    chooseAddress: function (callback) {
        let url = window.location.href;
        if (!this.isWechat()) return;
        this.initJssdk(function (signData) {
            jweixin.ready(function () {
                jweixin.openAddress({
                    success: function (res) {
                        callback(res)
                    },
                    fail: function (err) {
                        callback(err)
                    }
                });
            }, {'url': url});
        });
    },


    /**
     * 获取录音权限
     * @param callback
     */
    voiceAuth: function (callback) {
        let that = this
        if (!this.isWechat()) return;
        this.initJssdk(function (signData) {
            jweixin.ready(function () {
                jweixin.startRecord({
                    success: (res) => {
                      setTimeout(() => {
                        jweixin.stopRecord()
                      }, 200);
                    },
                    fail: (fail) => {
                      console.log('wwww',fail)
                      if (fail.errMsg=='startRecord:invalid signature'){
                        that.voiceAuth()
                      }
                    },
                    cancel: (cancel) => {
                      console.log(cancel)
                      that.voiceAuth()
                    }
                });
            });
        });
    },
}
