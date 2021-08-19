<template>
	<view class="">
		<view class="flexBox">
			<image style="height: 92rpx;width: 92rpx;" :src="`${ossUrl}/common/cache-logo.png`" mode="aspectFill"></image>
			<view class="contnetBox">
					<view class="name">[追风] · 官方客服电话</view>
					<view class="phone">4006200005</view>
			</view>
			<image style="height: 44rpx;width: 44rpx;" :src="`${ossUrl}/common/phone-big.png`" mode="aspectFill" @click="call"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
			}
		},
		methods: {
			call(){
				uni.makePhoneCall({
					// 手机号
					phoneNumber: '4006200005',
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
						this.call_phone(); //重复调用一次
					}
				});
			}
		}
	}
</script>

<style>
	.flexBox{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.name{
		font-size: 28rpx;
		color: black;
		margin: 20rpx;
	}
	.phone{
	color: #5A7EFF;	
	font-size: 28rpx;
	margin: 20rpx;
	}
	.contnetBox{
		width: 70%;
	}
</style>
