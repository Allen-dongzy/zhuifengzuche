<template>
	<view >
		<view style="width: 90%;margin: auto;padding-top: 130rpx;">
			<image style="height: 394rpx;width: 100%;position: relative;" :src="$util.fileUrl('/find.png')" mode="aspectFill"></image>
			<view style="position: absolute;top: 170rpx;left: 40rpx;width: 90%;">
				<view class="name">{{info.name}}</view>
				<!-- <view class="text">性别：{{info.}}</view> -->
				<view class="text">出生日期：{{info.birthday}}</view>
				<view class="text">身份证号：{{info.identityNum}}</view>
	
					<view class="flexBox">
				<!-- 		<view class="unmBox">
							<view style="color:#FFA05B;">{{info}}</view>
							<view class="">综合评估</view>
						</view> -->
						<view class="unmBox">
							<view style="color: #FC3736;">{{info.riskIndicator}}</view>
							<view class="">风险指标</view>
						</view>
						<view class="unmBox">
							<view style="color: #FC3736;">{{info.riskFactor}}</view>
							<view class="">风险系数</view>
						</view>
					</view>
				
			</view>
		</view>
		<view class="shareText">·········您可以分享到·········</view>
		<view style="display: flex;align-items: center;justify-content: center;margin-top: 6vh;">
			<view class="shareBox">
				<image style="height: 96rpx;width: 96rpx;" :src="$util.fileUrl('/wx.png')" mode="aspectFill"></image>
				<view class="">微信好友</view>
			</view>
			<view class="shareBox">
				<image style="height: 96rpx;width: 96rpx;" :src="$util.fileUrl('/pyq.png')" mode="aspectFill"></image>
				<view class="">朋友圈</view>
			</view>
		</view>
		<view class="address">追风（重庆）汽车租赁有限公司</view>

	</view>
</template>

<script>
	export default {
		data() { 
			return {
				info:''
			}
		},  
		onLoad(e) {
			
			this.info=JSON.parse(e.obj)
		},
		methods: {
			
		}
	}
</script>

<style>
.name{
	font-size: 28rpx;
	color: #000000;
	
}
.text{
	font-size: 24rpx;
	color: #999999;
	margin-top: 20rpx;
	
}
.flexBox{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-top: 60rpx;
}
.unmBox{
	width: 33%;
	text-align: center;
}
.shareText{
	width: 70%;margin: auto;text-align: center;margin-top: 20vh;
}
.shareBox{
	width: 30%;text-align: center;
}
.address{
	color: #999999;font-size: 24rpx;margin-top: 15vh;text-align: center;
}
</style>
