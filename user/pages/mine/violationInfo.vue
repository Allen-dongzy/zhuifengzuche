<template>
	<view class="">
		<view class="box" v-show="show==1">
			<view class="flexBox">
				<view class="bigblackText" style="width: 28%;">渝A·5231B</view>
				<view class="blackText" style="width:72%;color: #999999;">查看订单 > </view>
			</view>
			<view class="flexBox">
				<view class="grayText">违法：</view>
				<view class="blackText">不按规定停车</view>
			</view>
			<view class="flexBox">
				<view class="grayText">地点：</view>
				<view class="blackText">重庆市渝北区民安大道五四路</view>
			</view>
			<view class="flexBox" style="padding-bottom: 40rpx;border-bottom: 2rpx dashed #999999;">
				<view class="grayText">时间：</view>
				<view class="blackText">2021-06-01 14:18</view>
			</view>
			<view class="flexBox" style="margin-top: 40rpx;">
				<view class="bigblackText">罚款：</view>
				<view class="bigblackText" style="color:#FC3736;">¥188.00</view>
				<view class="bigblackText" style="margin-left: 40rpx;">记分：</view>
				<view class="bigblackText" style="color:#FC3736;">0</view> 
				<image style="width:80rpx;height:40rpx;margin-left: 10%;" :src="`${ossUrl}/mine/yizhifu.png`" mode=""></image>
			</view>
		</view>
		<view class="grayLine" v-show="show==1"></view>
		<view class="box" v-show="show==2">
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="">单据单号</view>
				<view class="grayText" style="width: 80%;text-align: right;">5556986997645634</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="">单据照片</view>
				<view class="grayText" style="width: 80%;text-align: right;">
					<image style="width:200rpx;height:120rpx;" :src="`${ossUrl}/mine/yizhifu.png`" mode=""></image>
				</view>
			</view>
			<view class="flexBox" style="padding: 20rpx 0rpx;">单据单号</view>
			<view class="flexBox" style="color: #999999;font-size: 24rpx;">这里是备注信息这里是备注信息这里是备注信息这里是备注信息这里是备注信息</view>
		</view>
		
		
		
		
		<button v-show="show==1" style=" color: white;
			width: 90%;
					margin: auto;
					margin-top: 10vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx; " type="default">去支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				show:1
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.box{
		
		width: 90%;
		margin: auto;
		margin-top: 30rpx;
	}
	.flexBox{
		display: flex;
		align-items: center;
		margin: 20rpx 0rpx;
	}
	.grayText{
		color: #999999;
		font-size: 28rpx;
		width: 14%;
	}
	.blackText{
		width: 86%;
		text-align: right;
		color: #000000;
		font-size: 24rpx;
	}
	.bigblackText{
		font-size: 28rpx;
		color: #000000;
	}
	.grayLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top:30rpx;
	}
	
</style>
