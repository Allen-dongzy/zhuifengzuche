<template>
	<view class="">
		<view class="title">身份证照片</view>
		<view class="flexBox" style="margin-top: 30rpx;">
			<image style="width:48%;height: 186rpx;" :src="$util.fileUrl('/idCard1.png')" mode=""></image>
			<image style="width:48%;height: 186rpx;margin-left: 4%;" :src="$util.fileUrl('/idCard1.png')" mode=""></image>
		</view>
		
		<view class="title">驾照图片</view>
		<view class="flexBox" style="margin-top: 30rpx;">
			<image style="width:48%;height: 186rpx;" :src="$util.fileUrl('/driver1.png')" mode=""></image>
			<image style="width:48%;height: 186rpx;margin-left: 4%;" :src="$util.fileUrl('/driver2.png')" mode=""></image>
		</view>
		<view class="grayLine"></view>
		<view class="title" style="padding: 60rpx 0rpx 20rpx 0rpx;">租车押金￥5000，全额免押</view>
		<view class="flexBox" >
			<!-- 没有收款 -->
		<!-- 	<image style="width:48%;height: 186rpx;" :src="$util.fileUrl('/shoukuan.png')" mode=""></image>
			<image style="width:48%;height: 186rpx;margin-left: 4%;" :src="$util.fileUrl('/shoukuan1.png')" mode=""></image>
			 -->
			 <!-- 有收款 -->
			<view class="pricebox">
				<view class="flexBox">
					<view class="priceText">其他收款</view>
					<view class="priceText1">已收取</view>
					<image style="width:20rpx;height: 30rpx;margin-left: 2%;" :src="$util.fileUrl('/heiyou.png')" mode=""></image>
				</view>
				<view style="font-size: 20rpx;margin-top: 20rpx;">¥<text style="font-size: 48rpx;">5000.00</text></view>
			</view> 
			<view class="pricebox" style="margin-left: 4%;">
				<view class="flexBox">
					<view class="priceText">预收冻结</view>
					<view class="priceText1">已收取</view>
					<image style="width:20rpx;height: 30rpx;margin-left: 2%;" :src="$util.fileUrl('/heiyou.png')" mode=""></image>
				</view>
				<view style="font-size: 20rpx;margin-top: 20rpx;">¥<text style="font-size: 48rpx;">5000.00</text></view>
			</view> 
		</view>
		
		<view class="title" >备注</view>
		<textarea value="" placeholder="填写备注" style="padding: 30rpx;background-color: #EFF0F3;border-radius: 20rpx;height:220rpx;width: 90%;margin: 20rpx auto;"  />
		
		
		<button  style=" color: white;
				width: 90%;
						margin: 20rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" >完成</button>
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
.title{
	width: 90%;
	margin-left: 5%;
	font-size: 28rpx;
	color: #000000;
	padding-top: 30rpx;
}
.flexBox{
	display: flex;
	align-items: center;
	width: 90%;
	margin: auto;
}

	.grayLine {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 30rpx;
	}
	.pricebox{
		width: 48%;height: 186rpx;border: 2rpx solid rgba(114,141,244,0.25);border-radius: 20rpx;padding: 40rpx 20rpx;
	}
	.priceText{
		color: #999999;font-size: 24rpx;
	}
	.priceText1{
		color: #5A7EFF;margin-left: 22%;font-size: 24rpx;
	}
</style>
