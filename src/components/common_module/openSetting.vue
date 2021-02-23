<template>
	<view class="mask d-flex-center">
      <view class="w600 ptb20 bar8 ">
        <view class="d-bg-white wfull ptb20 bar8">
            <view class="ac lh50">温馨提示</view>
            <view class="ac lh50 f24 ptb60"> 未开启订阅消息通知，请在设置中开启接收订阅消息。</view>
            <view class="d-flex-deuce pb60">
              <view class="d-text-white h80 w240 d-center bar8 f28 d-bg-efef" :style="{color:topicStyle.color}" @tap.stop="close">
                不用通知我
              </view>    
              <view >
                <button open-type="openSetting" class="d-text-white h80 w240 d-center bar8 f28" :style="{backgroundColor:topicStyle.color}">去开启通知</button>
              </view>    
            </view>
        </view>
      </view>
  </view>
		
</template>

<script>
import {baseURL} from '@/api/config'
import { getSetting } from '../../util/tool'
import {mapState,mapMutations} from 'vuex'
  export default {
    name: 'openSetting',
    data() {
      return {
        url: baseURL.kernel,
        token:'',
        }
    },
    created(){

    },
    computed: {
			...mapState(['topicStyle']),
    },
    methods: {
      openSetting(){
        uni.openSetting()
        this.close()
      },
      moveHandle(){
        
      },
      close() {
				this.$emit('closed', true)
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
