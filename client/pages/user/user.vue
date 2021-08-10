<template>
	<view class="box" :style="{backgroundImage: 'url('+$util.fileUrl('/userimg.png')+')'}">
		<view class="nameBox">
			<view @click="$open()">
				<image style="height: 100rpx;width: 100rpx;border-radius: 50%;" :src="$util.fileUrl('/icon1.png')"
					mode="aspectFill"></image>
			</view>
			<view v-show="$storage.get('token')" style="font-size: 40rpx;color: white;margin-left: 20rpx;">{{username}}
			</view>
			<view v-show="!$storage.get('token')" style="font-size: 40rpx;color: white;margin-left: 20rpx;"
				@click="$open('/pages/login/home', 2)">请登录</view>
		</view>
		<view class="allBox">
			<view class="flexBox" style="width: 40%;height:128rpx;border-radius: 10rpx;"
				@click="$open('/pages/user/wallet')">
				<image style="height: 36rpx;width: 36rpx;" :src="$util.fileUrl('/user1.png')"></image>
				<view style="margin-left: 15rpx;">钱包</view>
			</view>
			<view class="line"></view>
			<view class="flexBox" style="width: 40%;height:128rpx;border-radius: 10rpx;"
				@click="$open('/pages/user/bill')">
				<image style="height: 36rpx;width: 36rpx;" :src="$util.fileUrl('/user2.png')"></image>
				<view style="margin-left: 15rpx;">账单</view>
			</view>
		</view>
		<view class="flexBoxLeft" @click="$open('/pages/user/news')">
			<image :src="$util.fileUrl('/xiaoxi.png')" style="height: 36rpx;width: 36rpx;"></image>
			<view style="font-size: 28rpx;color: black;width: 75%;margin-left: 20rpx;">消息通知</view>
			<view :class="['label', {'ac': total>0}]">{{ total }}</view>
			<view class="arrow"></view>
		</view>
		<view v-show="$storage.get('token')" class="goout" @click="adminLogout">退出登录</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	import {
		adminLogout
	} from '@/apis/admin'
	import {
		messageCount
	} from '@/apis/message'
	import {
		throttle
	} from '@/utils/tools'

	export default {
		data() {
			return {
				total: 0, // 总数
			}
		},
		onLoad() {
			this.messageCount()
		},
		computed: {
			// user模块 用户名
			...mapState('user', ['username'])
		},
		methods: {
			// user模块 清除用户信息
			...mapMutations('user', ['clearInfo']),
			// 消息总数
			async messageCount() {
				const params = {
					userSource: 0
				}
				const [err, res] = await messageCount(params)
				if (err) return
				this.total = res.data.total
			},
			// 退出
			adminLogout: throttle(async function() {
				const [err, res] = await adminLogout()
				if (err) return
				setTimeout(() => {
					this.$storage.remove('token')
					this.clearInfo()
					uni.hideLoading()
				}, 500)
			})
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.box {
		height: 440rpx;
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
		margin-top: 50rpx;
		box-shadow: 5rpx 5rpx 2rpx rgba(114, 141, 244, 0.25);
	}

	.flexBoxLeft {
		display: flex;
		align-items: center;
		width: 90%;
		margin: 60rpx auto 0;
		padding: 20rpx 10rpx;
		box-sizing: border-box;
	}

	.line {
		height: 40rpx;
		width: 4rpx;
		background-color: #5A7EFF;
	}

	.label {
		color: #fff;
		border-radius: 30rpx;
		padding: 5rpx 25rpx;
		background-color: #FC3736;
		opacity: 0;

		&.ac {
			opacity: 1;
		}
	}

	.arrow {
		@include square(16rpx);
		border: 1px solid #999;
		border-left: 0;
		border-bottom: 0;
		transform: rotate(45deg);
		margin-left: 10rpx;
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
</style>
