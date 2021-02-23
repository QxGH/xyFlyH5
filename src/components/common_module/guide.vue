<template>
  <view class="masks" @click="hide">
    <view class="w520 ptb20 bar8 d-relative incenter">
      <view class="d-bg-white wfull ptb20 bar8">
        <view class="ac lh50 pb20">温馨提示</view>
        <view class="d-flex-deuce pb20 plr40">
          <view class="d-text-white h60 w200 d-center bar8 f28 d-bg-efef " style="color:green;">
            取消
          </view>
          <view class="d-text-white h60 w200 d-center bar8 f28 d-bg-green">
            允许
          </view>
        </view>
        <view class="d-flex-center plr24 pb30">
          <view class="w25 h25 d-circle mr10 d-relative d-bg-green">
            <view class="w25 h25 iconfont icon-gou_ico d-absolute d-text-white" style="top:-2rpx"></view>
          </view>总是保持以上选择，不再询问
        </view>
      </view>
      <image class="d-absolute w60 h60 moves" src="../../static/shou.png" mode="widthFix"></image>
    </view>
  </view>
</template>

<script>
import { baseURL } from '@/api/config'
import { getSetting } from '../../util/tool'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'openSetting',
  data() {
    return {
      url: baseURL.kernel,
      token: '',
    }
  },
  computed: {
    //监听属性 类似于data概念
    ...mapState(['subscribeResult']),
  },
  methods: {
    ...mapMutations(['change_subscribe_result']),
    hide() {
      this.change_subscribe_result({
        ...this.subscribeResult,
        subscribeGuide: false
      })
    }
  }

}
</script>

<style>
.w520 {
  width: 520rpx;
}
.moves {
  animation: move 2s infinite linear;
  bottom: 15%;
  left: 16%;
}

@keyframes move {
  0% {
    bottom: 15%;
    left: 16%;
  }
  100% {
    bottom: 40%;
    left: 78%;
  }
}
.masks {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0);
  z-index: 90;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.incenter {
  margin: 100rpx auto;
}
</style>
