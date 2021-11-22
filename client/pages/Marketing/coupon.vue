<template>
	<view class="">
		<view class="add" @click="add">新增+</view>
		<view class="box">
			<view class="flexbox">
				<view class="name">优惠券名称</view>
				<view class="statusbox">通用</view>
			</view> 
			<view class="name" style="color: #FFA05B;margin: 20rpx 0px;">
				满100减50元
			</view>
			<view class="flexbox"> 
				<view class="name" style="color:#B2B2B2;font-size: 22rpx;">2021/09/15 - 2021/09/30</view>
				<view class="icon">已过期</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import {
		vehicleOTAOpen
	} from '@/apis/vehicle'
	export default { 
		data() {
			return {
				
			}
		},
		onLoad(e) {
			
		},
		methods: {
			add(){
			uni.navigateTo({
				url:'./addCoupon',
				animationType:'pop-in',
				animationDuration:200
			})
			}
		}
	}
</script>

<style>
	.add{
		color:#5A7EFF;
		font-size: 26rpx;
		margin-left: 5%;
	}
	.box{
		border:2rpx solid rgba(114,141,244,0.25);
		width: 90%;
		margin: auto;
		border-radius: 30rpx;
		text-align: center;
		color: #000000;
		margin-top: 40rpx;
		padding: 40rpx;
	}
	.flexbox{
		display: flex;
		align-items: center;
	}
	.name{
		font-size: 30rpx;
		font-weight: 500;
		width: 80%;
		text-align: left;
	}
	.statusbox{
		font-size: 26rpx;
		font-weight: 500;
		width: 20%;
		color:#5A7EFF;
		text-align: right;
	}
	.icon{
		background-color: #D3D3D3;
		color: white;
		height: 35rpx;
	    line-height: 35rpx;
		width: 16%;
		font-size: 20rpx;
		text-align: center;
		border-radius: 10rpx;
	}
	
</style>
