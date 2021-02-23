<template>
	<view class="content">
		<view class="mask" @tap="close"></view>
		<view class="address">
			<view class="title">请选择所在地区</view>
			<view class="overseas_type">
				<view class="left" @tap="domestic" :style="{'font-weight': active==1?'bold':''}">
					中国大陆
					<view class="active" v-if="active==1"></view>
				</view>
				<view class="right" @tap="overseas" :style="{'font-weight': active==4?'bold':''}">
					港澳台及海外
					<view class="active" v-if="active==4"></view>
				</view>
			</view>
			<view class="select">
				<view class="select_province" @tap="renew_select('province')">{{select_province.name}}</view>
				<view class="select_city" @tap="renew_select('city')">{{select_city.name}}</view>
				<view class="select_area" @tap="renew_select('area')">{{select_area.name}}</view>
				<view class="select_town">{{select_town.name}}</view>
			</view>
			<scroll-view class="scroller" @scroll="scroll" :scroll-top="scrollTop" :scroll-into-view="toView" scroll-y="true"
			 scroll-with-animation="true">
				<view class="sort">
					<block v-for="(item,index) in letter_list" :key="index">
						<view :id="item" class="letter">{{item}}</view>
						<block v-for="(newitem,index) in city_list" :key="index">
							<block v-if="newitem.first_letter==item">
								<view class="city" @tap="click_province(newitem)">
									{{newitem.name}}
								</view>
							</block>
						</block>
					</block>
				</view>
			</scroll-view>
			<view class="anchor">
				<view class="select_letter">
					<view :data-id="item" v-for="(item,index) in letter_list" :key="index" @tap="bindToView">{{item}}</view>
          <span>{{JSON.stringify(letter_list)}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['echo'],
		data() {
			return {
				active: 1,
				letter_list: [],
				city_list: [],
				toView: '',
				parent_id: 0,
				select_province: {},
				select_city: {},
				select_area: {},
				select_town: {},
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			};
		},
		onReady() {

		},
		methods: {
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			close() {
				this.$emit('close')
			},
			domestic() {
				this.active = 1;
				this.parent_id = 0;
				this.pcas_lists()
			},
			overseas() {
				this.active = 4;
				this.parent_id = 0;
				this.pcas_lists()
			},
			bindToView(event) {
				var id = event.currentTarget.dataset.id;
				console.log(id)
				this.toView = id;
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
			},
			renew_select(option) {
				this.scrollTop = this.old.scrollTop
				if (option == "province") {
					this.parent_id = 0;
					this.select_city = {};
					this.select_area = {};
					this.select_town = {};
				} else if (option == "city") {
					this.parent_id = this.select_province.id;
					this.select_area = {};
					this.select_town = {};
				} else if (option == "area") {
					this.parent_id = this.select_city.id;
					this.select_town = {};
				}
				this.$emit('onCancel', option)
				this.pcas_lists()
			},
			click_province(e) {
				this.scrollTop = this.old.scrollTop
				if (e.type == "province") {
					this.select_province = e;
					this.select_city = {};
					this.select_area = {};
					this.select_town = {};
				} else if (e.type == "city") {
					this.select_city = e;
					this.select_area = {};
					this.select_town = {};
				} else if (e.type == "area") {
					this.select_area = e;
					this.select_town = {};
				} else if (e.type == "street") {
					this.select_town = e;
				}
				this.$emit('onConfirm', e)
				this.parent_id = e.id
				this.pcas_lists()
			},
			pcas_lists() {
        uni.showLoading({
          title: '加载中',
          mask: true
        })
				this.$http({
					url: '/basic/address/pcas/lists',
					data: {
						nation_type: this.active,
						parent_id: this.parent_id
					},
					method: 'POST'
				}, res => {
          uni.hideLoading()
					if (res.data) {
						res = res.data
						var letter_list = []
						res.forEach((item, index) => {
							if (letter_list.indexOf(item.first_letter) == -1) {
								letter_list.push(item.first_letter.toUpperCase())
							}
						})
						this.city_list = res
            this.letter_list = letter_list.sort()
            this.$nextTick(function() {
              this.scrollTop = 0
            });
					} else {
						this.close()
					}
				}, err => {
          uni.hideLoading()
					console.log(err)
				})
			}
		},
		mounted() {
			if (this.echo) {
				this.select_province = this.echo.province;
				this.select_city = this.echo.city;
				this.select_area = this.echo.area;
				this.select_town = this.echo.town;
			}
			this.pcas_lists()
		}
	};
</script>

<style scoped lang="scss">
	.select {
		width: 100%;
		min-height: 66rpx;
		line-height: 66rpx;
		display: flex;
		padding-left: 34rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
    color: #333333;

		>view {
			margin-right: 26rpx;
		}
	}

	.anchor {
		position: absolute;
		right: 20rpx;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.select_letter {
			width: 32rpx;
			color: #77787C;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #EEEFF1;
			padding: 20rpx 0;
      border-radius: 16rpx;
      
      span{
        position: absolute;
        left: 100px;
        bottom: 0;
      }

			view {
				width: 60rpx;
				font-size: 24rpx;
				text-align: center;
				margin-bottom: 10rpx;
			}

			>view:nth-last-child(1) {
				margin-bottom: 0;
			}
		}
	}


	.city {
		width: 100%;
		padding: 20rpx 0;
		padding-left: 34rpx;
		box-sizing: border-box;
    color: #333333;
	}

	.letter {
		width: 100%;
		border-bottom: 2rpx solid #F8F8F8;
		padding: 20rpx 0;
		padding-left: 34rpx;
		box-sizing: border-box;
		font-weight: bold;
    color: #333333;
	}

	.popular_city {
		display: flex;
		flex-wrap: wrap;
	}

	.popular_city>view {
		width: 25%;
		text-align: center;
		margin-top: 26rpx;
	}

	.popular_title {
		padding-left: 34rpx;
	}

	scroll-view {
		height: 740rpx;
		overflow-y: scroll;
	}

	.overseas_type>view {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.overseas_type {
		display: flex;
		padding-left: 34rpx;
		margin-top: 64rpx;
		font-size: 32rpx;
    color: #333333;

		.right {
			margin-left: 34rpx;
		}

		.active {
			width: 40rpx;
			height: 8rpx;
      background: red;
      margin-top: 10rpx;
		}
	}

	.title {
		padding-left: 34rpx;
		font-size: 42rpx;
		font-weight: bold;
    color: #333333;
	}

	.address {
		width: 100%;
		background: #ffffff;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 300;
		border-radius: 30rpx 30rpx 0 0;
		padding-top: 36rpx;
		padding-bottom: env(safe-area-inset-bottom);
    overflow-x: hidden;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
	}

	.content {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
    z-index: 1000;
	}
</style>
