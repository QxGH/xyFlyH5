import Store from '../store'
import {http} from './http.js'

function GetRequest(urlStr) {
    if (typeof (urlStr) == "undefined") {
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

export function login(callback) {
    // #ifdef MP-WEIXIN
    console.log('小程序登录')
    uni.login({
        provider: 'weixin',
        success: function (res) {
            if (res.code) {
                http({
                    url: '/users/auth/channel/miniProgram/login',
                    data: {
                        mtoken: Store.state.extConfig.mtoken,
                        code: res.code
                    },
                    method: "POST"
                }, res => {
                    if (res.authorize.token) {
                        Store.state.utoken = res.utoken
                        if ('development' === process.env.NODE_ENV || 'test' === process.env.RUNNING_MODE) {
                            uni.setStorageSync('c_token', res)
                        } else {
                            uni.setStorageSync('z_token', res)
                        }
                        if (callback) {
                            if (typeof (callback) === "function") {
                                callback()
                            } else {
                                http(callback.data, callback.resolve, callback.reject)
                            }
                        }
                    }
                }, err => {
                    console.log(err)
                })
            }
        }
    });
    // #endif

    // #ifdef H5
    console.log('h5登录')
    let data = GetRequest();
    http({
        url: '/users/auth/channel/officialAccount/loginJump',
        data: {
            jump: '',
            alias: Store.state.extConfig.mtoken,
            scopes: '',
            attach: data._attach ? data._attach : '',
        },
        method: "POST"
    }, res => {
        location.href = res.jumpUrl
    }, err => {
        console.log(err)
    })
    // #endif
};
