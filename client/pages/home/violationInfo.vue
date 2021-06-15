<template>
	<view class="">
		<view class="box">
			<view class="flexBox">
				<view class="blackText">违法：</view>
				<view class="grayText">不按照规定停车</view>
			</view>
			<view class="flexBox">
				<view class="blackText">地点：</view>
				<view class="grayText">重庆市渝北区民安大道五四路</view>
			</view>
			<view class="flexBox">
				<view class="blackText">时间：</view>
				<view class="grayText">2021/05/31 18:51</view>
			</view>
			<view class="flexBox">
				<view class="blackText">采集机关：</view>
				<view class="grayText">重庆市江北区交通公安局</view>
			</view>
			</view>
		    <view class="grayLine"></view>
			<view class="box">
				<view class="flexBox" style="margi:0rpx;padding:40rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">
					<view class="blackText">单据单号</view>
					<view class="grayText">5556986997645634</view>
				</view>
				<view class="flexBox" style="margi:0rpx;padding:40rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">
					<view class="blackText">单据照片</view>
					<image style="width:200rpx;height: 120rpx;margin-left: 43%;" :src="$util.fileUrl('/yinye.png')" mode=""></image>
				</view>
				<view  style="margi:0rpx;padding:40rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">
					<view class="blackText">单据单号</view>
					<view class="grayText" style="text-align: left;">5556986997645634</view>
				</view>
			</view>
			<view class="flexBox" style="width: 90%;margin: auto;margin-top: 20vh;">
				<view class="blackText" style="width: 13%;text-align: left;margin-left: 50%;">罚款：</view>
				<view class="redText">¥188.00</view>
				<view class="blackText" style="width: 15%;text-align: center;">记分:</view>
				<view class="redText">0</view>
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
	.box{
		width: 90%;
		margin: auto;
	}
	.flexBox{
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
	.grayText {
		color: #999999;
		width: 70%;
		font-size: 24rpx;
		text-align: right;
	}

	.blackText {
		width: 30%;
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
		text-align: left;
	}
	.grayLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 30rpx;
	}
	.redText {
		font-size: 24rpx;
		color: #FC3736;
		font-weight: 400;
	}
</style>
