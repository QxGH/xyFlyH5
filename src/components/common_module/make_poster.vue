<template>
    <!-- 生成海报 @touchmove.stop.prevent-->
    <view class="mask d-center" v-if="showObj.poster" @touchmove.stop.prevent="moveHandle" @tap="hideShare">
        <view class="d-center">
            <view class="todaySign" v-if="type=='sign'">今日签到成功，+{{todayIntegral}}积分</view>
            <view class="mcenter p20" :class="[type!='sign'&&type!='passwordPackage'&&type!='wheel'&&type!='sudoku'?'h940':'']">
                <image @load="img_load" v-if="type=='distribution'" :src="url+'marketing/distribution/distributor/info/share?token='+token+'&source='+source" mode="widthFix"></image>
                <image @load="img_load" v-else-if="type=='player'" :src="url+'marketing/livePlayer/room/share?id='+unique_id+'&token='+token+'&source='+source" mode="widthFix" class="w540"></image>
                <image @load="img_load" v-else-if="type=='pages'" :src="url+'design/page/share/poster?picture='+pagePosterImg+'&source='+source+'&alias='+alias+'&token='+token" mode="widthFix" class="w540"></image>
                <image @load="img_load" v-else-if="type=='sign'" :src="imgUrl" mode="widthFix" class="w540"></image>
                <image @load="img_load" v-else-if="type=='passwordPackage'" :src="imgUrl" mode="widthFix" style="width:590rpx"></image>
                <image @load="img_load" v-else-if="type=='wheel'" :src="imgUrl" mode="widthFix" style="width:590rpx"></image>
                <image @load="img_load" v-else-if="type=='sudoku'" :src="imgUrl" mode="widthFix" style="width:590rpx"></image>
                <image @load="img_load" v-else-if="type=='goldenEgg'" :src="imgUrl" mode="widthFix" style="width:590rpx"></image>
                <image @load="img_load" v-else-if="type=='capsuleToy'" :src="imgUrl" mode="widthFix" style="width:590rpx"></image>
                <image @load="img_load" v-else-if="type=='openBox'" :src="imgUrl" mode="widthFix" style="width:590rpx"></image>
                <image @load="img_load" v-else-if="type=='openGiftBox'" :src="imgUrl" mode="widthFix" style="width:590rpx"></image>
                <image @load="img_load" v-else :src="url+'products/product/share?token='+token+'&source='+source+'&productUuid='+productUuid+'&activityId='+activityId+'&activityType='+activityType" mode="widthFix"></image>
            </view>
            <!-- #ifdef  MP-WEIXIN -->
            <view v-if="auth_writePhotosAlbum" class="d-center f32 d-text-white h96 w700 bar48 mt30" :style="{backgroundColor:themeColor}" @tap.stop="downloadImg">保存到相册</view>
            <view v-else class="d-center f32 d-text-white h96 w700 bar48 mt30" :style="{backgroundColor:themeColor}" @tap.stop="open_setting">保存到相册</view>
            <!-- #endif -->
            <!-- #ifdef  H5 -->
            <view class="d-center f32 d-text-white h96 w700 bar48 mt30" :style="{backgroundColor:themeColor}">长按图片保存到相册</view>
            <!-- #endif -->
        </view>
    </view>
</template>

<script>
    import {baseURL} from '@/api/config'

    export default {
        name: 'makePoster',
        props: ['showObj', 'themeColor', 'productUuid','activityId','activityType','type','imgUrl','todayIntegral','unique_id','alias','pagePosterImg'],
        data() {
            return {
                url: baseURL.kernel,
                token: '',
                source: this.$store.state.source,
                auth_writePhotosAlbum: false,
            }
        },
        watch:{
          showObj:{
            handler(n,o){
              if(n.poster){
                uni.showLoading({
                  title:'加载中',
                  mask:true
                })
                let storageToken
                if ('development' === process.env.NODE_ENV || 'test' === process.env.RUNNING_MODE){
                    storageToken = uni.getStorageSync("c_token");
                } else {
                    storageToken = uni.getStorageSync("z_token");
                }
                this.token = storageToken.token ? storageToken.token : storageToken.authorize?storageToken.authorize.token:'';
              }
            },
            // immediate: true,  //刷新加载 立马触发一次handler
            deep: true  // 可以深度检测到 person 对象的属性值的变化
          },
          unique_id:{
            handler(n,o){
            },
            immediate: true,  //刷新加载 立马触发一次handler
            deep: true  // 可以深度检测到 person 对象的属性值的变化
          }
        },
        created() {
          // this.pagePosterImg = getApp().globalData.pagePosterImg;
          console.log('this.pagePosterImg-------',this.pagePosterImg)
            // #ifdef MP-WEIXIN
            let that = this
            wx.getSetting({
              success(res) {
                if(res.authSetting['scope.writePhotosAlbum']==false){
                  that.auth_writePhotosAlbum = false
                }else{
                  that.auth_writePhotosAlbum = true
                }
              }
            })
            // #endif
        },
        methods: {
          img_load(){
            uni.hideLoading()
          },
            open_setting(){
              let that = this
              uni.openSetting({
                success(res){
                  if(res.authSetting['scope.writePhotosAlbum']==true){
                    that.auth_auth_writePhotosAlbum = true
                    that.downloadImg()
                  }else{
                    that.auth_auth_writePhotosAlbum = false
                  }
                }
              })
            },
            moveHandle(){

            },
            hideShare() {
                this.$emit('hideShareOrPoster')
            },
            //#ifdef  MP-WEIXIN
            downloadImg() {
                uni.showLoading({
                  title: '正在保存',
                  mask: true
                });
                let url;
                if(this.type=='distribution'){
                  url = this.url+'/marketing/distribution/distributor/info/share?token='+this.token+'&source='+this.source
                }else if(this.type == 'player'){
                  url = this.url+'marketing/livePlayer/room/share?id='+this.unique_id+'&token='+this.token+'&source='+this.source
                }else if(this.type == 'pages'){
                  url = this.url+'design/page/share/poster?picture='+this.pagePosterImg+'&source='+this.source+'&alias='+this.alias+'&token='+this.token
                }else{
                  url = this.url + '/products/product/share?token=' + this.token + '&source=' + this.source + '&productUuid=' + this.productUuid+ '&activityId=' + this.activityId + '&activityType=' + this.activityType
                }
                let that = this
                if(this.type == 'sign'||this.type == 'passwordPackage'||this.type == 'wheel'||this.type=='sudoku'||this.type=='goldenEgg'||this.type=='capsuleToy'||this.type=='openBox'||this.type=='openGiftBox'){
                    uni.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            uni.hideLoading();
                            uni.saveImageToPhotosAlbum({
                                filePath: that.imgUrl,
                                success: function () {
                                    uni.showToast({
                                        title: "保存成功",
                                        icon: "none"
                                    });
                                  that.$emit('hideShareOrPoster')
                                },
                                fail: function () {
                                    uni.showToast({
                                        title: "保存失败，请稍后重试",
                                        icon: "none"
                                    });
                                  that.$emit('hideShareOrPoster')
                                }
                            });
                        },
                        fail(){
                          uni.hideLoading();
                          wx.getSetting({
                            success(res) {
                              if(!res.authSetting['scope.writePhotosAlbum']){
                                that.auth_writePhotosAlbum = false
                              }else{
                                that.auth_writePhotosAlbum = true
                              }
                            }
                          })
                        }
                    })
                    return
                }
                uni.downloadFile({
                    url: url,
                    success: (res) => {
                        console.log(res)
                        if (res.statusCode === 200) {
                            uni.authorize({
                                scope: 'scope.writePhotosAlbum',
                                success() {
                                    uni.hideLoading();
                                    uni.saveImageToPhotosAlbum({
                                        filePath: res.tempFilePath,
                                        success: function () {
                                            uni.showToast({
                                                title: "保存成功",
                                                icon: "none"
                                            });
                                          that.$emit('hideShareOrPoster')
                                        },
                                        fail: function () {
                                            uni.showToast({
                                                title: "保存失败，请稍后重试",
                                                icon: "none"
                                            });
                                          that.$emit('hideShareOrPoster')
                                        }
                                    });
                                },
                                fail(){
                                  uni.hideLoading();
                                  wx.getSetting({
                                    success(res) {
                                      if(!res.authSetting['scope.writePhotosAlbum']){
                                        that.auth_writePhotosAlbum = false
                                      }else{
                                        that.auth_writePhotosAlbum = true
                                      }
                                    }
                                  })
                                }
                            })
                        }
                    }
                })
            }
            //#endif
        }
    }
</script>

<style scoped>
.w540{
  width:540rpx;
}
.todaySign{
  font-size:30rpx;
  font-family:PingFang SC;
  font-weight:400;
  line-height:30rpx;
  color:rgba(255,255,255,1);
  text-align: center;
}
</style>
