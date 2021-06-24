<template>
	<view class="">
		<view class="box">
			<view class="flexBox" style="margin-top: 30rpx;">
				<view style="width:80%">
					<view style="font-size: 36rpx;">追风1号店</view>
					<view class="flexBox" style="margin-top: 20rpx;">
						<image  style="width: 32rpx;height:34rpx;" :src="`${ossUrl}/common/icon-home-black.png`"></image>
						<view style="font-size: 28rpx;color:#000000;">门店地址：郑家院子东路8号</view>
					</view>
				</view>
				<view style="width:20%">
					<image  style="width: 44rpx;height:44rpx;" :src="`${ossUrl}/common/location-big.png`"></image>
					<image  style="width: 44rpx;height:44rpx;margin-left: 30rpx;" :src="`${ossUrl}/common/phone-big.png`"></image>
				</view>
			</view>
			<view class="flexBox">
				<view class="look">车况概览</view>
				<view class="look" style="margin-left: 20rpx;">查看合同</view>
			</view>
		</view>
		<view class="grayLine"></view>
		<view class="box" style="margin-top: 100rpx;">
			<view class="wait">等待追风小子验车</view>
			<view class="wait">验车后将根据油量、综合车况等补缴或退还金额</view>
		</view>
		
		
		<view class="box" style="margin-top: 100rpx;">
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">超时费</view>
				<view class="rightBox">-¥60</view>
			</view>
		</view>
		<view class="grayLine"></view>
		<view class="flexBox" style="width: 90%;margin: auto;margin-top: 30rpx;">
			<view class="leftBox">预收冻结</view>
			<view class="leftBox" style="width: 47%;text-align: right;font-size: 36rpx;">1000 </view>
			<view class="leftBox" style="width: 3%;margin-left: 10rpx;"> ></view>
<!-- 			<image  style="width: 10rpx;height:18rpx;margin-left: 10rpx;" :src="`${ossUrl}/common/phone-big.png`"></image> -->
		</view>
		
		
		<view class="bottomFlex">
			<view style="width: 64%;">
				 <view style="font-size: 24rpx;color:#999999;"> 逾期不支付将按 <text style="color:#FFA05B;">《逾期违章协议》</text>处理</view>
				 <view style="font-size: 36rpx;width: 70%;">结算情况<text style="color: #FC3736;margin-left: 10rpx;">-<text style="font-size: 16rpx;margin-left: 10rpx;">¥</text>188.0</text></view>
			</view>
			
			
			<view class="pay">带结算</view>
		</view>
		
		
<!-- 		
	<view class="bottomFlex">
		<view style="font-size: 28rpx;">总计</view>
		<view style="font-size: 36rpx;color: #FC3736;width: 55%;margin-left: 10rpx;"><text style="font-size: 16rpx;">¥</text>188.00</view>
		<view class="pay">带结算</view>
	</view>
	 -->
	
	
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
}
.look{
	border: 2rpx solid #5A7EFF;
	color: #5A7EFF;
	padding: 10rpx 20rpx;
	border-radius: 10rpx;
	font-size: 24rpx;
	margin-top: 40rpx;
}
.grayLine{
	height: 20rpx;
	background-color: #EFF0F3;
	width: 100%;
	margin-top: 40rpx;
}
.wait{
	font-size: 24rpx;
	color: #999999;
	width: 90%;
	text-align: center;
}
.bottomnav{
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	box-shadow:0rpx 0rpx 0rpx 0rpx #728DF4;
	height: 180rpx;
	width: 100%;
	position: fixed;
}

	.bottomFlex{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height:180rpx;
		border-radius: 40rpx 40rpx 0rpx 0rpx ; 
		box-shadow: 0rpx 0rpx 0rpx 5rpx rgba(114,141,244,0.25);
	}
	.pay{
		width: 200rpx;
		height: 96rpx;
		opacity: 1;
		background: #5a7eff;
		border-radius: 26px;color: white;line-height: 96rpx;text-align: center;
	}
	.leftBox{
		font-size: 28rpx;
		color: #000000;
		width: 50%;
		text-align: left;
	}
	.rightBox{
		font-size: 28rpx;
		color: #999999;
		width: 50%;
		text-align: right;
	}
</style>
