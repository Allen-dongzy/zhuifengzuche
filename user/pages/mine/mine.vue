<template>
	<view class="box" :style="{backgroundImage: 'url('+`${ossUrl}/mine/userbg.png`+')'}">
		<view class="nameBox">
			<view class="">
				<image style="height: 100rpx;width: 100rpx;border-radius: 50%;" :src="`${ossUrl}/mine/touxiang.png`"
					mode=""></image>
			</view>
			<view style="font-size: 40rpx;color: white;margin-left: 20rpx;" @click="$open('/pages/common/login')">点击登陆</view>
		</view>
		<view class="allBox">
			<view class="">
				<view class="flexBox" style="width: 100%;height:48rpx;border-radius: 10rpx;" @click="wallet">
					<image style="height: 36rpx;width: 36rpx;" :src="`${ossUrl}/mine/yue.png`" mode=""></image>
					<view style="margin-left: 15rpx;">余额</view>
				</view>
				<view style="font-size: 60rpx;">0.00<label style="font-size:24rpx;">元</label></view>
			</view>

			<view class="line"></view>
			<view class="">
				<view class="flexBox" style="width: 100%;height:48rpx;border-radius: 10rpx;" @click="coupon">
					<image style="height: 36rpx;width: 36rpx;" :src="`${ossUrl}/mine/youhui.png`" mode=""></image>
					<view style="margin-left: 15rpx;">优惠券</view>
				</view>
				<view style="font-size: 60rpx;">0.00<label style="font-size:24rpx;">张</label></view>
			</view>
		</view>
		<view class="flexBox">
			<view class="flexBoxOne" @click="lookinfo">
				<image style="height: 80rpx;width: 80rpx;" :src="`${ossUrl}/mine/news.png`" mode=""></image>
				<view class="grayTetx">消息通知</view>
			</view>
			<view class="flexBoxOne" @click="violation">
				<image style="height: 80rpx;width: 80rpx;" :src="`${ossUrl}/mine/weizhang.png`" mode=""></image>
				<view class="grayTetx">违章记录</view>
			</view>
			<view class="flexBoxOne" @click="$open('/pages/mine/pay')">
				<image style="height: 80rpx;width: 80rpx;" :src="`${ossUrl}/mine/fukuan.png`" mode=""></image>
				<view class="grayTetx">付款</view>
			</view>
			<view class="flexBoxOne" @click="$open('/pages/mine/pay')">
				<image style="height: 80rpx;width: 80rpx;" :src="`${ossUrl}/mine/shoukuan.png`" mode=""></image>
				<view class="grayTetx">收款</view>
			</view>
		</view>
		<view class="grayLine"></view>
		<view class="flexBoxLeft" @click="selectOne(item.path)" v-for="(item,index) in list " :key="index">
			<image :src="`${ossUrl}`+item.img+``" style="height: 42rpx;width: 46rpx;" mode=""></image>
			<view style="font-size: 28rpx;color: black;width: 90%;margin-left: 20rpx;">{{item.name}}</view>
			<image :src="`${ossUrl}/mine/huiyou.png`" style="height: 40rpx;width: 26rpx;" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		open
	} from '@/utils/uni-tools'

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
	.box {
		height: 220rpx;
		width: 100%;
		background-position: center;
		background-size: 100% 100%;
		padding-top: 200rpx;
	}

	.nameBox {
		display: flex;
		align-items: center;
		margin-left: 40rpx;
	}

	.flexBox {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.allBox {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		width: 90%;
		margin: auto;
		border-radius: 20rpx;
		margin-top: 20rpx;
		padding: 25rpx 0px;
		box-shadow: 5rpx 5rpx 2rpx rgba(114, 141, 244, 0.25);
	}

	.flexBoxLeft {
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		margin-top: 20rpx;
		border-bottom: 2rpx solid #eff0f3;
		padding: 30rpx 0rpx;
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

	.grayTetx {
		font-size: 24rpx;
		color: #999999;
		text-align: center;
	}

	.grayLine {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
	}

	.flexBoxOne {
		margin: 40rpx 40rpx;
	}
</style>
