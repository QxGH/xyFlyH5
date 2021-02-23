const ADDNUM = 'ADDNUM'; //测试store

// 商品相关
const GOODSDETAILS = 'GOODSDETAILS'; //商品详情
const PRODUCTSPEC = 'PRODUCTSPEC'; //规格
const GODDSDIFFERENCE = 'GODDSDIFFERENCE'; //规格

//订单相关



//个人信息相关
function setStorageSync(data) {
  uni.setStorageSync('vuex_state', data);
}

const mutations = {
  [GOODSDETAILS](state, payload) {
    state.goodsDetails = payload;
    setStorageSync(state);
  },
  [PRODUCTSPEC](state, payload) {
    state.productSpec = payload;
    setStorageSync(state);
  },
  [GODDSDIFFERENCE](state, payload) {
    state.difference = payload;
    setStorageSync(state);
  },
  [ADDNUM](state, payload) {
    console.log(state, payload)
    state.num = payload + 1;
    setStorageSync(state);
  },
  set_activeIndex(state, payload) {
    state.activeIndex = payload;
    setStorageSync(state);
  },
  set_tab_data(state, payload) {
    state.tab_data = payload;
    setStorageSync(state);
  },
  set_topicStyle(state, payload) {
    state.topicStyle = payload
    setStorageSync(state);
  },
  set_tabbar_hide(state, payload){
    state.tabbar_hide = payload
    setStorageSync(state);
  },
  set_orderInfo(state, payload){
    state.orderInfo[payload[0]] = payload[1]
    setStorageSync(state);
  },
  set_hotWord(state, payload) {
    state.hotWord = payload;
    setStorageSync(state);
  },
  change_subscribe_result(state, val) {
    state.subscribeResult = val;
    setStorageSync(state);
  },
  set_index_first(state, payload) {
    state.indexFirst = payload
    setStorageSync(state);
  },
  set_compatible(state, payload) {
    state.compatible = payload
    setStorageSync(state);
  },
  set_shareCover(state, payload) {
    state.shareCover = payload
    setStorageSync(state);
  },
  set_refreshTask(state, payload) {
    state.refreshTask = payload
    setStorageSync(state);
  },
  set_floatbox(state, payload) {
    state.floatbox = payload
    setStorageSync(state);
  }
}


export default mutations
