import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    compatible: false,
		/**
		 * 是否需要强制登录
		 */
    floatbox:{},
    auth_user_info:false,
    forcedLogin: false,
    hasLogin: false,
    num: 10,
    buyCount:1,
    goodsDetails: {},
    productSpec: {}, //sku
    difference: '',
    env: '',
    version: '',
    source: '',
    // 选中的tab
    activeIndex: 0,
    tab_data: {},
    tabbar_hide: false,
    // 用户信息
      utoken: '',
    checkTime: {},
    userInfo: {

    },
    //收藏信息
    collect_info: '',
    // 第三方信息
    extConfig: {
    },
    // 订单信息
    orderInfo: {
      user:'',
      phone:'',
      country:'',
      province:'',
      province_id:'',
      city:'',
      city_id:"",
      area:'', //收货地址归属地区
      area_id:'',
      street:'',
      street_id:'',
      address:'', //	收货地址详情
      orderFrom: 1,
      activityId:0,
      products: [],
      remarks:'',
      shipping: '', //0 物流模式 1 自提模式
      workOption: "settle",
      btoken: '',
      mtoken: '',
      utoken: ''
    },
    // 地址信息
    addressInfo: {},
    //购物列表
    buyList: [],
    // 购物车信息
    cartList: [],
    // 是否新用户
    isNewUser: true,
    // 是否有tabbar
    hasTabBar: false,
    //主题色
    topicStyle: {

    },
    shopId: '',
    // 页面数组
    rules: '',
    //授权信息
    authInfo: {},
    pagesData: [],
    homePage: {},
    routers: [], // 系统维护的路由规则
    requestHeader: null,
    suit_unique_id: null,
    sceneArray: {},
    accessStore: {}, //当前访问店铺信息
    sysTabBarDetail: null, // 平台底部菜单栏配置
    //是否第一次砍价
    first_emit_cut: false,
    //经纬度
    location: {
      auth: -1,
      latitude: '',
      longitude: ''
    },
    //权益信息
    qualificationInfo: null,
    storeShareInfo: {
      title: '',
      imgUrl: '',
      isRequest: false
    },
    //分销员id
    p_id: '',
    //技术支持内容
    supportInfo: {
      system_logo: '',
      custom_logo: '',
      title: '',
      jump_type: '',
      jump_data: '',
      is_hidden_system_logo: false,
      is_hidden: false
    },
    //设备信息
    clientHeight: 0,
    //商品信息
    _productInfo: {},
    //自提点信息
    pickInfo: {
      id: 0
    },
    shareType: '',
    community_product: [],
    //分销员绑定
    distributorInfo: {
      isRequest: false
    },
    //判断用户是否绑定手机号
    bindMobileStatus: true,
    hotWord:[],
    subscribeResult: {
      subscribeGuide: false,
      subscribeNotice: false,
      subscribeSetting: false
    },
    indexFirst:0, //首页index
    shareCover: false,
    refreshTask: false
  },
  mutations
})

export default store
