import {login} from './login.js';
import Store from '../store/index.js'
import {AesEncrypt, AesDecrypt} from './crypto.js';
import {baseURL} from '@/api/config';

let pass = false;

/* 获取主题色 */
function get_topicStyle(callback) {
    http({
        url: '/design/template/template/basicPayload',
        // #ifdef H5
        data: {
            id: sessionStorage.getItem('preview') || ''
        },
        // #endif
        method: "POST"
    }, res => {
        pass = false;
        Store.commit('set_topicStyle', res.style)
        if (res.floatbox != null && res.floatbox) {
            Store.commit('set_floatbox', res.floatbox)
        }
        http(callback.data, callback.resolve, callback.reject)
        console.log('主题色')
    }, err => {
        console.log(err)
    })
}

/* 获取用户信息 */
function userInfoDetail(callback) {
    http({
        url: '/users/user/info/details',
        method: 'POST'
    }, res => {
        uni.setStorageSync('userInfo', res)
        http(callback.data, callback.resolve, callback.reject)
    }, err => {
        console.log(err)
    })
}

/* 获取平台配置 */
function getSetting(callback) {
    http({
        url: '/mall/basic/setting/get',
        method: 'POST'
    }, res => {
        // #ifdef H5
        sessionStorage.setItem('platform_config', JSON.stringify(res))
        // #endif
        // #ifdef MP-WEIXIN
        getApp().globalData.platform_config = res
        // #endif
        http(callback.data, callback.resolve, callback.reject)
    }, err => {
        console.log(err)
    })
}

export function http(option, resolve, reject) {
    option.data = option.data || {};
    option.data.env = Store.state.env;
    option.data.version = Store.state.version;
    option.data.source = Store.state.source;

    /**
     * 所有POST请求携带用户经纬度参数
     */
    if (option.method && 'post' === option.method.toLowerCase()) option.data.location = option.data.location ? option.data.location : Store.state.location;

    /**
     * 获取请求地址
     */
    let url = baseURL[option.service || 'kernel'] + ('/' === option.url.charAt(0) ? option.url.substr(1) : option.url);


    uni.showNavigationBarLoading()

    /**
     * 令牌获取 测试环境开发环境用c_token  正式环境用z_token
     */
    let token;
    if ('development' === process.env.NODE_ENV || 'test' === process.env.RUNNING_MODE) {
        if (!option.url.includes('login') && !uni.getStorageSync('c_token')) {
            login({
                data: option,
                resolve: resolve,
                reject: reject
            })
            return
        }
        // #ifdef H5
        token = uni.getStorageSync('c_token') ? uni.getStorageSync('c_token').token : '';
        // #endif
        // #ifdef MP-WEIXIN
        token = uni.getStorageSync('c_token') ? uni.getStorageSync('c_token').authorize.token : '';
        // #endif
    } else {
        if (!option.url.includes('login') && !uni.getStorageSync('z_token')) {
            login({
                data: option,
                resolve: resolve,
                reject: reject
            })
            return
        }
        // #ifdef H5
        token = uni.getStorageSync('z_token') ? uni.getStorageSync('z_token').token : '';
        // #endif
        // #ifdef MP-WEIXIN
        token = uni.getStorageSync('z_token') ? uni.getStorageSync('z_token').authorize.token : '';
        // #endif
    }

    /* 获取tabbar，主题色，系统页面悬浮 */
    if ((!Store.state.floatbox || Object.keys(Store.state.topicStyle).length == 0) && !option.url.includes('basicPayload') && !option.url.includes('login') && !option.url.includes('channel/officialAccount/buildConfig')) {
        pass = true
        get_topicStyle({
            data: option,
            resolve: resolve,
            reject: reject
        })
        return
    }

    /* 获取用户信息 */
    if (!uni.getStorageSync('userInfo') && !option.url.includes('login') && !pass && !option.url.includes('user/info/details') && !option.url.includes('channel/officialAccount/buildConfig')) {
        userInfoDetail({
            data: option,
            resolve: resolve,
            reject: reject
        })
        return
    }

    /* 获取平台配置 */
    if (
        // #ifdef MP-WEIXIN
        Object.keys(getApp().globalData.platform_config).length == 0 &&
        // #endif
        // #ifdef H5
        !sessionStorage.getItem('platform_config') &&
        // #endif
        !option.url.includes('distributor/customer/bind') &&
        !option.url.includes('login') &&
        !pass &&
        !option.url.includes('user/info/details') &&
        !option.url.includes('mall/basic/setting/get') &&
        !option.url.includes('channel/officialAccount/buildConfig')
    ) {
        getSetting({
            data: option,
            resolve: resolve,
            reject: reject
        })
        return
    }

    uni.request({
        url: url,
        data: false !== option.encrypted ? {encrypt: AesEncrypt(JSON.stringify(option.data))} : option.data,
        header: {
            'content-type': 'application/json',
            'token': token
        },
        method: option.method,
        success: (res) => {
            console.log('----------------------请求参数', option)
            if (res.data.code == 0) {
                if (res.data.data && res.data.data.encrypt) {
                    let data = JSON.parse(AesDecrypt(res.data.data.encrypt));
                    console.log('----------------------正常回调', data)
                } else {
                    console.log('----------------------正常回调', res.data)
                }
            } else {
                console.log('----------------------不正常回调', res)
            }
            if (res.data.code == 0) {
                if (res.data.data && res.data.data.encrypt) {
                    let data = JSON.parse(AesDecrypt(res.data.data.encrypt));
                    resolve(data)
                } else {
                    resolve(res.data)
                }
            } else if (res.data.code == 10001 || res.data.code == 10002 || res.data.code == 10003 || res.data.code == 10004 || res.data.code == 10007) {
                if (option.url.includes('login')) return
                login({
                    data: option,
                    resolve: resolve,
                    reject: reject
                })
            } else if (res.data.code == -2) {
                uni.reLaunch({
                    url: '/pages/zero/zero'
                })
            } else if (res.data.code == -3) {
                reject(res)
            } else {
                if (typeof (reject) === "function") reject(res)
                uni.showModal({
                    content: res.data.message || '哎呀，操作太频繁啦',
                    showCancel: false,
                })
            }
        },
        fail: (err) => {
            console.log(err)
        },
        complete: () => {
            uni.hideNavigationBarLoading()
            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 1000);
        }
    });
}
