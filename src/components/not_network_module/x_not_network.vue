<template>
	<view class="not_network">
		<image src="../../static/not_network.png" mode=""></image>
		网络似乎有点问题，请检查网络设置
		<view class="retry">重试</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style scoped lang="scss">
	.not_network {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: rgba(153, 153, 153, 1);

		image {
			width: 320rpx;
			height: 260rpx;
			margin-bottom: 50rpx;
		}

		.retry {
			width: 326rpx;
			height: 80rpx;
			background: rgba(255, 51, 0, 1);
			box-shadow: 0px 2rpx 10rpx rgba(252, 76, 45, 0.24);
			border-radius: 44rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
			margin-top: 60rpx;
		}
	}
</style>
