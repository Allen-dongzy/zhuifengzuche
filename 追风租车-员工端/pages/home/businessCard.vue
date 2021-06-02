<template>
	<view class="">
		<view class="topNav">
			<view style="width: 5%;text-align: center;"><image style="width: 20rpx;height: 20rpx;" src="../../static/1.png" mode=""></image></view>
			<view style="font-size: 32rpx;">基本信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;"><image style="width: 10rpx;height: 10rpx;" src="../../static/next2.png" mode=""></image></view>
			<view style="width: 5%;text-align: center;"><image style="width: 20rpx;height: 20rpx;" src="../../static/2-2.png" mode=""></image></view>
			<view style="font-size: 32rpx;color: #5A7EFF;">证件信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;"><image style="width: 10rpx;height: 10rpx;" src="../../static/next1.png" mode=""></image></view>
			<view style="width: 5%;text-align: center;"><image style="width: 20rpx;height: 20rpx;" src="../../static/3.png" mode=""></image></view>
			<view style="font-size: 32rpx;">门店信息</view>
		</view>
	
			<view class="title">身份证照片</view>
			<view class="idCard">
				<image class="imgBox" src="../../static/logo2.png" mode=""></image>
				<image class="imgBox" src="../../static/logo2.png" mode=""></image>
			</view>
			<view class="title">营业执照照片</view>
			<view class="idCard">
				<image class="imgBox" src="../../static/logo2.png" mode=""></image>
				<image class="imgBox" src="../../static/logo2.png" mode=""></image>
			</view>
			<view class="title">公司名称</view>
			<view class="idCard">
				<input class="nameBox" placeholder="请输入公司名字" type="text" value="" />
			</view>
			<u-button type="primary" :custom-style="customStyle" >下一步</u-button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
	customStyle: {
		marginTop: '120px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
		color: 'white',
		width:'90%',
		borderRadius:'50rpx',
		backgroundColor:'#5A7EFF'
	}
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.topNav{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 122rpx;
		width: 100%;
		border-bottom: 20rpx solid #EFF0F3;
	}
	.title{
		color: black;
		font-size: 28rpx;
		margin-top: 40rpx;
		margin-left: 32rpx;
	}
	.idCard{
		width:90%;
		margin: auto;
		padding-top: 20rpx;
	}
	.imgBox{
		height: 186rpx;width: 44%;margin: 0px 3%;
	}
	.nameBox{
		background-color: #EFF0F3;height: 74rpx;border-radius: 10rpx;padding-left: 20rpx;font-size: 24rpx;color: #999999;
	}
</style>
