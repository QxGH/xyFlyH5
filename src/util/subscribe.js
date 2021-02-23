import {http} from './http.js'
import Store from '../store/index.js'
import {arrayDiff} from './tool.js'

/**
 *
 * @param
 * PAYMENT_SUCCESS    面向买家    付款成功
 * ORDER_DELIVER    面向买家    订单发货
 * ORDER_SOON_EXPIRE    面向买家    订单即将到期
 * DISTRIBUTOR_APPLY_AUDIT    面向买家    分销员申请审核
 * DISTRIBUTOR_WITHDRAW_AUDIT    面向买家    分销员提现审核
 * INTERACTION_SIGN_NOTICE    面向买家    签到提醒
 */

export default function subscribe(scene, callback = () => {}) {

    Store.commit('change_subscribe_result', {
        subscribeGuide: false,
        subscribeNotice: false,
        subscribeSetting: false
    })

    uni.getSetting({
        withSubscriptions: true, //withSubscriptions 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息
        success(settingResult) {
            console.log('subscriptionsSetting', settingResult.subscriptionsSetting);

            let acceptTemplates = []; //允许模板列表
            let rejectTemplates = []; //拒绝模板列表

            if (settingResult.subscriptionsSetting.itemSettings && Object.keys(settingResult.subscriptionsSetting.itemSettings).length) {
                console.log('用户点击了“总是保持以上，不再询问');

                let subscriptionsSetting = settingResult.subscriptionsSetting;
                for (let key in subscriptionsSetting) {
                    switch (subscriptionsSetting[key]) {
                        case 'accept':
                            acceptTemplates.push(key);
                            break;
                        case 'reject':
                            rejectTemplates.push(key);
                            break;
                        default:
                    }
                }

                console.log('------------------ acceptTemplates ------------------', acceptTemplates);
                console.log('------------------ rejectTemplates ------------------', rejectTemplates);
            }
            http({
                url: '/message/template/channel/wechat/miniProgramSubscribe',
                data: {
                    scene: scene
                },
                method: "POST"
            }, res => {
                if (res && res.templates.length) {
                    let tmplIds = res.templates;

                    /**
                     * 判断是否该场景之下是否存在相应模板
                     */
                    if (arrayDiff(tmplIds, acceptTemplates).length < 1) {
                        uni.requestSubscribeMessage({
                            tmplIds: acceptTemplates,
                            success(result) {
                                callback('accept')
                            },
                            fail: (err) => {
                                Store.commit('change_subscribe_result', {
                                    subscribeGuide: false,
                                    subscribeNotice: false,
                                    subscribeSetting: true
                                })
                                callback()
                            }
                        })
                        return;
                    }
                    tmplIds = arrayDiff(tmplIds, rejectTemplates);
                    if (tmplIds.length < 1) {
                        Store.commit('change_subscribe_result', {
                            subscribeGuide: false,
                            subscribeNotice: false,
                            subscribeSetting: true
                        })
                        callback('reject')
                        return;
                    }

                    let requestSubscribeMessageFail = false;

                    setTimeout(function () {
                        if (false === requestSubscribeMessageFail) {
                            Store.commit('change_subscribe_result', {
                                subscribeGuide: true,
                                subscribeNotice: false,
                                subscribeSetting: false
                            })
                        }
                    }, 100);

                    uni.requestSubscribeMessage({
                        tmplIds: tmplIds,
                        success(result) {
                            let obj = {
                                subscribeGuide: false,
                                subscribeNotice: false,
                                subscribeSetting: false
                            }
                            let status;
                            for (let key in result) {
                                if (result[key] === 'reject') {
                                    status = 'reject'
                                    obj.subscribeNotice = true
                                    break;
                                } else if (result[key] === 'accept') {
                                    status = 'accept'
                                    break;
                                }
                            }
                            // Store.state.subscribeGuide = false;
                            Store.commit('change_subscribe_result', obj)
                            callback(status)
                        },
                        fail: (err) => {
                            requestSubscribeMessageFail = true;
                            console.log('requestSubscribeMessage-fail', err)
                            // Store.state.subscribeSetting = true;
                            // Store.state.subscribeGuide = false;
                            Store.commit('change_subscribe_result', {
                                subscribeGuide: false,
                                subscribeNotice: false,
                                subscribeSetting: true
                            })
                            callback()
                        }
                    })
                } else {
                    Store.commit('change_subscribe_result', {
                        subscribeGuide: false,
                        subscribeNotice: false,
                        subscribeSetting: false
                    })
                    callback()
                }
            }, err => {
                console.log(err)
                Store.commit('change_subscribe_result', {
                    subscribeGuide: false,
                    subscribeNotice: false,
                    subscribeSetting: false
                })
                callback()
            });
        },
        fail(err) {
            Store.commit('change_subscribe_result', {
                subscribeGuide: false,
                subscribeNotice: false,
                subscribeSetting: false
            })
            callback()
        }
    })
}
