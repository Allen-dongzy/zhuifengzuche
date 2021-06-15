<template>
	<view class="">
		<view class="box">
			<view class="flexBox">
				<view class="grayText">违法</view>
				<view class="blackText">不按规定停车</view>
			</view>
			<view class="flexBox">
				<view class="grayText">违法</view>
				<view class="blackText">不按规定停车</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx dashed #999999;padding-bottom: 40rpx;">
				<view class="grayText">违法</view>
				<view class="blackText">不按规定停车</view>
			</view>
			<view class="flexBox">
				<view class="blackText" style="width: 13%;text-align: left;">罚款：</view>
				<view class="redText">¥188.00</view>
				<view class="blackText" style="width: 15%;text-align: center;">记分:</view>
				<view class="redText">0</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.box {
		width: 90%;
		border: 2rpx solid rgba(114, 141, 244, 0.25);
		margin: auto;
		margin-top: 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
		padding: 20rpx 0rpx;
	}

	.grayText {
		color: #999999;
		width: 30%;
		font-size: 28rpx;
		text-align: left;
	}

	.blackText {
		width: 70%;
		font-size: 24rpx;
		color: #000000;
		font-weight: 400;
		text-align: right;
	}

	.redText {
		font-size: 24rpx;
		color: #FC3736;
		font-weight: 400;
	}
</style>
