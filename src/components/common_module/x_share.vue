<template>
  <!-- 分享 @touchmove.stop.prevent-->
  <view class="mask" v-show="showObj.share"  @touchmove.stop.prevent="moveHandle" @tap="hideShare">
    <view class="d-fixed bottom wfull d-text-6gray d-bg-frenchGray f34 barlrtop" :class="showObj.share?'open':'close'" >
      <view class="plr24 d-bg-white barlrtop d-flex-deuce ptb40" :style="{paddingBottom:bottom+'rpx'}" >
				<!-- #ifdef H5 -->
        <button style="outline:none;background:transparent" class="d-flex-shrink" @tap.stop="shareToFriends">
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" style="outline:none;background:transparent" class="d-flex-shrink">
				<!-- #endif -->
          <view class="w100 h100 d-circle d-bg-frenchGray d-center">
            <image :src="imgs.wechat" class="w50 h50 d-block"></image>
          </view>
          <view class="f26 al d-text-6gray ac pt20 d-bg-white bn pb10">分享好友</view>
        </button>
        <view class="d-flex-shrink" @tap.stop="makePoster">
          <view class="w100 h100 d-circle d-bg-frenchGray d-center">
            <image :src="imgs.poster" class=" w50 h50 d-block"></image>
          </view>
          <view class="f26 al d-text-6gray ac pt20 pb10">生成海报</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import wechat from '../../static/img/wechat.png'
  import poster from '../../static/img/poster.png'

	export default {
    name: 'share',
    props:['showObj','source'],
		data() {
			return {
        bottom: getApp().globalData.bottom,
        imgs:{
          wechat:wechat,
					poster:poster
        }
			}
    },
    components: {

		},
		methods: {
      moveHandle (){

      },
      // #ifdef H5
			shareToFriends(){
        this.showObj.share = false;
        if(this.source=='/pagesA/distribution/share_shop'){
          uni.showModal({
            content: '进入商品详情页面点击右上角...转发好友',
            showCancel: false,
          })
        }else{
          uni.showModal({
            content: '请点击右上角 ··· 进行分享~',
            showCancel: false,
          })
        }
      },	
      // #endif
      hideShare(){
        this.$emit('hideShareOrPoster')
      },
			makePoster(){
        this.showObj.share = false;
        this.$emit('makePoster')
			},
		}
	}
</script>

<style scoped>
button::after{
  border:none;
}
.open {
  transition: all 0.5s ease-out;
  transform: translateY(0);
}

.close {
  transition: all 0.5s ease-out;
  transform: translateY(310rpx);
}
</style>
