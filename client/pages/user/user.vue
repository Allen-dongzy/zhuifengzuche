<template>
	<view class="box" :style="{backgroundImage: 'url('+$util.fileUrl('/userimg.png')+')'}">
		<view class="nameBox">
			<view @click="$open()">
				<image style="height: 100rpx;width: 100rpx;border-radius: 50%;" :src="$util.fileUrl('/icon1.png')"
					mode=""></image>
			</view>
			<view v-show="$storage.get('token')" style="font-size: 40rpx;color: white;margin-left: 20rpx;">{{username}}
			</view>
			<view v-show="!$storage.get('token')" style="font-size: 40rpx;color: white;margin-left: 20rpx;"
				@click="$open('/pages/login/home', 2)">请登录</view>
		</view>
		<view class="allBox">
			<view class="flexBox" style="width: 40%;height:128rpx;border-radius: 10rpx;" @click="wallet">
				<image style="height: 36rpx;width: 36rpx;" :src="$util.fileUrl('/user1.png')" mode=""></image>
				<view style="margin-left: 15rpx;">钱包</view>
			</view>
			<view class="line"></view>
			<view class="flexBox" style="width: 40%;height:128rpx;border-radius: 10rpx;" @click="bill">
				<image style="height: 36rpx;width: 36rpx;" :src="$util.fileUrl('/user2.png')" mode=""></image>
				<view style="margin-left: 15rpx;">账单</view>
			</view>
		</view>
		<view class="flexBoxLeft" @click="lookinfo">
			<image :src="$util.fileUrl('/xiaoxi.png')" style="height: 36rpx;width: 36rpx;" mode=""></image>
			<view style="font-size: 28rpx;color: black;width: 75%;margin-left: 20rpx;">消息通知</view>
			<view v-show="true" class="label">99</view>
			<view class="arrow"></view>
		</view>
		<view v-show="$storage.get('token')" class="goout" @click="adminLogout">退出登陆</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapMutations,
		mapState
	} from 'vuex'
	import {
		adminLogout
	} from '@/apis/admin'

	export default {
		data() {
			return {

			};
		},
		onLoad() {
			this.getInfo()
		},
		computed: {
			// user模块 用户名
			...mapState('user', ['username'])
		},
		methods: {
			// user模块 获取用户信息
			...mapActions('user', ['getInfo']),
			// user模块 清除用户信息
			...mapMutations('user', ['clearInfo']),
			lookinfo() {
				uni.navigateTo({
					url: './news',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			wallet() {
				uni.navigateTo({
					url: './wallet',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			bill() {
				uni.navigateTo({
					url: './bill',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			// 退出
			async adminLogout() {
				const [err, res] = await adminLogout()
				if (err) return
				setTimeout(() => {
					this.$storage.remove('token')
					this.clearInfo()
					uni.hideLoading()
				}, 500)
			}
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
		margin: auto;
		margin-top: 80rpx;
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
