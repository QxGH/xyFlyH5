import {http} from './http.js'
import {login} from './login.js'
import Store from '../store'

// webview登录
export function web_login(attach, url) {
    http({
        url: '/users/auth/channel/officialAccount/loginJump',
        data: {
            jump: url,
            alias: Store.state.extConfig.mtoken,
            scopes: '',
            attach: attach || '',
        },
        method: "POST"
    }, res => {
        console.log(res)
        uni.navigateTo({
            url: `/pages/webview/webview?url=${encodeURIComponent(res.jumpUrl)}`
        })
    }, err => {
        console.log(err)
    })
}

var reLogin = true;
export default function get_User_Info_auth(e, cb, x, y, flag) {
    if (e.detail.errMsg == "getUserInfo:ok") {
        Store.state.auth_user_info = true;
        uni.getUserInfo({
            lang: "zh_CN",
            success: (response) => {
                http({
                    url: '/users/auth/channel/miniProgram/decryptData',
                    data: {
                        iv: response.iv,
                        encryptedData: response.encryptedData
                    },
                    method: "POST"
                }, res => {
                    if (res.toAuth) {
                        let attach = res.attach
                        http({
                            url: '/mall/basic/info/mobileUrl',
                            data: {
                                path: '/pages/blank/blank'
                            },
                            method: "POST"
                        }, res => {
                            web_login(attach, res.url)
                        }, err => {
                            console.log(err)
                        })
                    } else {
                        if (x || y) {
                            cb(x, y)
                        } else {
                            cb()
                        }

                    }
                }, err => {
                    console.log(err)
                    if (err.data && err.data.code == 25021 && reLogin == true) {
                        reLogin = false
                        login(function () {
                            get_User_Info_auth(e, cb, x, y, flag)
                        })
                        return
                    }
                })
            },
        })
    } else {
        if (flag == true) {
            if (x || y) {
                cb(x, y)
            } else {
                cb()
            }
        } else {
            return;
        }

    }
}