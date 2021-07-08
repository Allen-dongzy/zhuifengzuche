<template>
	<view class="box" :style="{backgroundImage: 'url('+`${ossUrl}/mine/userbg.png`+')'}">
		<view class="name-box">
			<image class="avatar" :src="icon || `${ossUrl}/mine/touxiang.png`" mode="aspectFill"></image>
			<view class="nickname" @click="$open('/pages/common/login')">{{nickname || username || '点击登陆'}}
				<view class="arrow"></view>
			</view>
		</view>
		<view class="all-box">
			<view>
				<view class="flex-box item" @click="wallet">
					<image class="icon" :src="`${ossUrl}/mine/yue.png`"></image>
					<view class="text">余额</view>
				</view>
				<view class="price">0.00<text>元</text></view>
			</view>
			<view class="line"></view>
			<view>
				<view class="flex-box item" @click="coupon">
					<image class="icon" :src="`${ossUrl}/mine/youhui.png`"></image>
					<view class="text">优惠券</view>
				</view>
				<view class="price">0<text>张</text></view>
			</view>
		</view>
		<view class="flex-box function">
			<view class="flex-box-one" @click="lookinfo">
				<image class="icon" :src="`${ossUrl}/mine/news.png`"></image>
				<view class="gray-text">消息通知</view>
			</view>
			<view class="flex-box-one" @click="violation">
				<image class="icon" :src="`${ossUrl}/mine/weizhang.png`"></image>
				<view class="gray-text">违章记录</view>
			</view>
			<view class="flex-box-one" @click="$open('/pages/mine/pay')">
				<image class="icon" :src="`${ossUrl}/mine/fukuan.png`"></image>
				<view class="gray-text">付款</view>
			</view>
			<view class="flex-box-one" @click="$open('/pages/mine/pay')">
				<image class="icon" :src="`${ossUrl}/mine/shoukuan.png`"></image>
				<view class="gray-text">收款</view>
			</view>
		</view>
		<view class="gray-line"></view>
		<view class="flex-box-left" @click="selectOne(item.path)" v-for="(item,index) in list " :key="index">
			<image class="icon" :src="`${ossUrl}`+item.img+``" mode="widthFix"></image>
			<view class="text">{{item.name}}</view>
			<image class="arrow" :src="`${ossUrl}/mine/huiyou.png`"></image>
		</view>
	</view>
</template>

<script>
	import {
		open
	} from '@/utils/uni-tools'
	import {
		mapState
	} from 'vuex'
	
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				list: [{
					name: '发票抬头',
					img: '/mine/fapiao.png',
					path: '/pages/mine/invoice'
				}, {
					name: '银行卡',
					img: '/mine/yhk.png',
					path: './bankCard'
				}, {
					name: '风控查询',
					img: '/mine/fengkong.png',
					path: './risk'
				}, {
					name: '联系我们',
					img: '/mine/lianxi.png',
					path: '/pages/mine/contactUs'
				}, {
					name: '关于追风',
					img: '/mine/about.png',
					path: '/pages/mine/aboutMe'
				}, {
					name: '退出登录',
					img: '/mine/out.png',
					path: ''
				}]
			};
		},
		computed: {
			// user 用户昵称
			...mapState('user', ['icon', 'nickname', 'username'])
		},
		methods: {
			lookinfo() {
				uni.navigateTo({
					url: './news',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			wallet() {
				uni.navigateTo({
					url: './balance',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			coupon() {
				uni.navigateTo({
					url: './coupon',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			selectOne(e) {
				console.log(e)
				uni.navigateTo({
					url: e,
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			violation() {
				uni.navigateTo({
					url: './violationRecord',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			quit() {
				// todo
				open('/pages/home/home')
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.box {
		height: 220rpx;
		width: 100%;
		background-position: center;
		background-size: 100% 100%;
		padding-top: 200rpx;
	}

	.name-box {
		display: flex;
		align-items: center;
		margin-left: 40rpx;

		.avatar {
			height: 100rpx;
			width: 100rpx;
			border-radius: 50%;
		}

		.nickname {
			@include flex-row();
			font-size: 40rpx;
			line-height: 56rpx;
			color: #fff;
			margin-left: 30rpx;

			.arrow {
				@include square(16rpx);
				border: 1px solid #fff;
				border-left: 0;
				border-bottom: 0;
				transform: rotate(45deg) translateY(4rpx);
				margin-left: 10rpx;
			}
		}
	}

	.flex-box {
		display: flex;
		justify-content: center;
		align-items: center;

		.item {
			width: 100%;
			height: 48rpx;
			border-radius: 10rpx;
		}

		.icon {
			height: 36rpx;
			width: 36rpx;
		}

		.text {
			margin-left: 15rpx;
			@include font-set(28rpx, #000);
			line-height: 40rpx;
		}

		&.function {
			padding: 0 48rpx;
			@include flex-row(space-between);
		}
	}

	.price {
		@include font-set(60rpx, #000, 500);
		line-height: 84rpx;

		text {
			@include font-set(24rpx, #000, 700);
			line-height: 34rpx;
			margin-left: 4rpx;
		}
	}

	.all-box {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		width: 90%;
		margin: auto;
		border-radius: 20rpx;
		margin-top: 30rpx;
		padding: 25rpx 0px;
		box-shadow: 5rpx 5rpx 2rpx rgba(114, 141, 244, 0.25);

		&>view {
			@include flex-col();
		}
	}

	.flex-box-left {
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		margin-top: 20rpx;
		border-bottom: 2rpx solid #eff0f3;
		padding: 30rpx 0rpx;

		.text {
			font-size: 28rpx;
			color: black;
			width: 90%;
			margin-left: 20rpx;
		}

		.icon {
			width: 45rpx;
		}

		.arrow {
			height: 38rpx;
			width: 22rpx;
		}
	}

	.line {
		height: 40rpx;
		width: 4rpx;
		background-color: #5A7EFF;
		margin: 0px 70rpx;
	}

	.label {
		color: #fff;
		border-radius: 30rpx;
		padding: 5rpx 25rpx;
		background-color: #FC3736;
	}

	.goout {
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		background-color: #EFF0F3;
		color: #999999;
		font-size: 28rpx;
		width: 70%;
		margin: auto;
		border-radius: 50rpx;
		margin-top: 48vh;
	}

	.gray-text {
		font-size: 24rpx;
		color: #999999;
		text-align: center;
		margin-top: 10rpx;
	}

	.gray-line {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
	}

	.flex-box-one {
		@include flex-col();
		margin: 30rpx 0;

		.icon {
			height: 80rpx;
			width: 80rpx;
			display: block;
		}
	}
</style>
