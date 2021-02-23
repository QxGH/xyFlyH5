<template>
    <view >
        <image class="mcenter d-block no-order-image" src="../../static/zero.png"></image>
		<view class="ac f40 pt50 no-order-hint">暂时还没有相关内容哦!</view>
    </view>
</template>

<script>
    export default {
        name: 'noContent'
    }
</script>

<style scoped>
.no-order-image {
    padding-top: 40%;
    width: 240rpx;
    height: 190rpx;
    margin-bottom: 40rpx;
}
.no-order-hint{
    font-size: 32rpx;
    line-height: 40rpx;
    color: rgba(153, 153, 153, 1);
}
</style>
