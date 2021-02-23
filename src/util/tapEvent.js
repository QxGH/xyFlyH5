
import makePhoneCall from './makePhoneCall.js'
import navigateTo from './navigation.js'
import scrollToTop from './scrollTo.js'

export default function tapEvent(link, curRoute, activeIndex){
  if(!link) return;
  if(link.type == 'other'){
    if(link.source.alias == 'tellphone'){
      makePhoneCall(link.source.phone)
    }else if(link.source.alias == 'jumpApplet'){
      // #ifdef  MP-WEIXIN
      let appid = link.source.appid.toString();
      uni.navigateToMiniProgram({
        appId: appid,
        path: link.source.path,
        success(res) {
          // 打开成功
          console.log('打开成功')
        },
        fail(){
          console.log('打开失败了，或者appId错误')
        }
      })
      // #endif
      // #ifdef  H5
        uni.showToast({
          title: '很抱歉,H5暂不支持',
          icon:'none',
          duration: 2000
        });
      // #endif
    } else if (link.source.alias == 'toHome'){
      if (curRoute == 'pages/index/index' && activeIndex == 0) return;
      uni.reLaunch({
        url: '/pages/index/index?activeIndex=0'
      })
    } else if (link.source.alias == 'toTop') {
      scrollToTop(0, 300);
    } else if (link.source.alias == 'jumpPublicAccountArticle') {
      let url = link ? link.source.link : null;
      if (url == null) {
        return;
      }else{
        // #ifdef MP-WEIXIN
        uni.navigateTo({
          url: "/pages/webview/webview?url=" + url,
        });
        // #endif
        // #ifdef H5
        window.location.href = url;
          // #endif
      }
      
    } else if (link.source.alias == 'weappCustomerService') {
      // #ifdef  MP-WEIXIN
      return {
        open_type: 'contact',
      }
      // #endif
    } else if (link.source.alias == 'shareCurrentPage') { //分享当前页
      return {
        posterImg: link.source.posterImg,
      }
    }
  }else {
    let url = link ? link.source.router : null;
    if(url == null){
      return;
    }
    if(link&&link.source.alias){
      let alias = link.source.alias;
      if(url.includes('?')){
        navigateTo(`${url}&alias=${alias}`)
      } else {
        //特殊商品二级分类
        if (link.source.ids && link.source.ids.length){
          let ids = encodeURIComponent(JSON.stringify(link.source.ids));
          navigateTo(`${url}?subclassId=${ids}`)
        }else{
          navigateTo(`${url}?alias=${alias}`)
        }

      }
    } else {
      if(url.includes('plugin-private')){
        // #ifdef  MP-WEIXIN
        navigateTo(`${url}`)
        // #endif
        // #ifdef  H5
          return {
            mask : true, 
            id :link.source.id
          }
      // #endif
      
      }else{
        navigateTo(`${url}`)
      }
      
    }
  }
 }