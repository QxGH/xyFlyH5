import Store from '@/store';

// 微信授权登录
export default class auth {

    static isLiting = false;


    static async appCheckAuth() {

        return new Promise(function (resolve) {

            if (auth.isLiting) {
                resolve(false);
                return;
            }
            if (auth.checkAuth()) {
                auth.isLiting = false;
                Store.state.authInfo = uni.getStorageSync('authInfo');
                resolve(true);
                return;
            }
            auth.isLiting = true;
            uni.showLoading({
                title: '加载中...',
                mask: true
            });

            // 无效
            uni.login({
                success: res => {
                    let code = res.code;
                    uni.hideLoading();
                    console.log(res.authResult);
                },
                fail: res => {
                    auth.isLiting = false;
                    resolve(false);
                }
            });

        });
    }

    // 检查令牌是否有效 true--> 有效  false--> 无效

    static checkAuth() {
        let authInfo = uni.getStorageSync('authInfo') || {},
            expiryTime = 0,
            nowTime = ~~(Date.now() / 1000);

        if (authInfo.exp) {
            expiryTime = authInfo.exp;
        }

        return expiryTime - nowTime > 300;
    }

    //获取token
    static getToken() {
        let authInfo = uni.getStorageSync('authInfo');
        return authInfo.token;
    }

    //获取token
    static saveToken(type, token) {
        let res = uni.getStorageInfoSync();
        let keys = res.keys;
        if (keys.length > 30) {
            for (let i = 0, len = keys.length; i < len; i++) {
                if (keys[i].indexOf('storeToken_') >= 0) {
                    uni.removeStorageSync(keys[i]);
                }
            }
        }
        let key = 'storeToken_' + type;
        uni.setStorageSync(key, token);
    }

}
