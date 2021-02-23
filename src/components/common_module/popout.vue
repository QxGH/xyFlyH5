<template>
	<view class="mask d-center" v-show="mask" @touchmove.stop.prevent="moveHandle">
    <!-- #ifdef  H5 -->
      <view class="w560 h520 d-bg-white bar8" v-if="id">
        <view class="wfull ar pt24">
            <image class="w32 h32 pr24" src="../../static/img/close.png" mode="widthFix" @tap.stop="close"></image>
        </view>
        <view class="wfull d-flex-center">
            <image class="w280 h280" :src="url+'/marketing/livePlayer/room/wxacode?token='+token+'&id='+id" mode="aspectFit"></image>
        </view>
        <view class="wfull d-flex-center mt30 d-flex-wr">
            <view class="f26 d-text-6gray ac wfull lh36 ">此功能仅支持小程序</view>
            <view class="f26 d-text-6gray ac wfull lh36">长按识别小程序码查看</view>
        </view>
      </view>
    <!-- #endif -->
  </view>
		
</template>

<script>
import {baseURL} from '@/api/config'
import { getSetting } from '../../util/tool'
import {mapState,mapMutations} from 'vuex'
  export default {
    name: 'popout',
    props: ['mask','id'],
    data() {
      return {
        url: baseURL.kernel,
        token:'',
        }
    },
    computed: {
			...mapState(['topicStyle']),
		},
    created(){
      let storageToken
      if ('development' === process.env.NODE_ENV || 'test' === process.env.RUNNING_MODE){
        storageToken = uni.getStorageSync("c_token");
      } else {
         storageToken = uni.getStorageSync("z_token");
      }
        // console.log('.......',storageToken)
      this.token = storageToken.token ? storageToken.token : storageToken.authorize.token;
    },
    methods: {
      moveHandle(){
        
      },
      close() {
				this.$emit("closeMask");
			},
    },

  }
</script>

<style>
.block{
  display:block;
}
.none{
  display:none;
}

uni-checkbox-group uni-label{ width: 33% !important; display: inline-flex; margin-bottom: 20rpx; }
/*checkbox 选项框大小  */
uni-checkbox .uni-checkbox-input{
border: 1px solid #9a9a9a;
border-radius: 50% !important;
width: 30rpx !important;
height: 40rpx !important;  
box-sizing:border-box;
}

</style>
