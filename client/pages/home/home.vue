<template>
	<view class="home">
		<view class="flex-center tabList">
			<swiper class="swiperIcon" indicator-dots :indicator-color="indicatorColor"
				:indicator-active-color="indicatorActiveColor">
				<swiper-item class="flex flex-wrap swiperItem">
					<view v-for="(item,index) in swiperIcon" :key="index" class="flex-center flex-direction iconPanel"
						@click="toHomeLevel">
						<image :src="$util.fileUrl(item.path)" lazy-load></image>
						<p>{{ item.text }}</p>
					</view>
				</swiper-item>
				<swiper-item class="flex flex-wrap swiperItem">
					<view v-for="(item,index) in swiperIcon" :key="index" class="flex-center flex-direction iconPanel">
						<image :src="$util.fileUrl(item.path)" lazy-load></image>
						<p>{{ item.text }}</p>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorColor: '#cccccc',
				indicatorActiveColor: '#5A7EFF',
				swiperIcon: [{
					path: '/vehicle_management@2x.png',
					text: '车辆管理'
				}, {
					path: '/model_set@2x.png',
					text: '车型设置'
				}, {
					path: '/delivery_point_management@2x.png',
					text: '送车点管理'
				}, {
					path: '/store_management@2x.png',
					text: '门店管理'
				}, {
					path: '/collection_payment_management@2x.png',
					text: '收付款管理'
				}, {
					path: '/marketing_management@2x.png',
					text: '营销管理'
				}, {
					path: '/customer_records@2x.png',
					text: '客户记录'
				}, {
					path: '/risk_control_query@2x.png',
					text: '风控查询'
				}]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		position: relative;
		
		/deep/ .wx-swiper-dot {
			width: 8rpx;
			height: 8rpx;
		}
		
		/deep/ .wx-swiper-dot-active {
			width: 22rpx;
			height: 8rpx;
			border-radius: 6rpx;
		}
		
		/deep/ .swiperIconPanel .wx-swiper-dots {
			position: absolute;
			bottom: -50rpx;
		}
		
		.tabList {
			position: relative;
			width: 100%;
			margin-top: 20rpx;
			
			.swiperIcon {
				width: 100%;
				height: 340rpx;
			
				.swiperItem {
					padding-bottom: 20rpx;
					box-sizing: border-box;
			
					.iconPanel {
						width: calc(100% / 4);
						height: 50%;
						overflow: hidden;
			
						image {
							width: 100rpx;
							height: 100rpx;
						}
			
						p {
							width: 100%;
							height: 34rpx;
							line-height: 34rpx;
							font-size: 24rpx;
							font-weight: 400;
							text-align: center;
							color: #999999;
						}
					}
				}
			}
		}
	}
</style>
