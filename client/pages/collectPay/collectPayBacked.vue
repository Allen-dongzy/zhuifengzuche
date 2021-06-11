<template>
	<view class="">
		<view class="flexbox">
			<view class="titleLeft">日期</view>
			<view class="titleRight">2021-06-02</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">项目</view>
			<view class="titleRight">大方租车</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">车牌号</view>
			<view class="titleRight">渝A·533333</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">店员</view>
			<view class="titleRight">张全蛋</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">金额(元)</view>
			<view class="titleRight">¥800</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">付款人</view>
			<view class="titleRight">张全蛋</view>
		</view>
		<view class="flexbox" style="border-bottom: 0rpx;">
			<view class="titleLeft">备注</view>
			<view class="titleRight">这是上次欠的800</view>
		</view>
		<view class="garyLine"></view>
		<view class="flexbox">
			<view class="titleLeft">提交时间</view>
			<view class="titleRight">2021-07-01 18:00:0</view>
		</view>
		<view class="flexbox" style="border-bottom: 0rpx;">
			<view class="titleLeft">确认时间</view> 
			<view class="titleRight">2021-07-01 18:00:00</view>
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
	.flexbox {
		display: flex;
		align-items: center;
		width: 90%;
		height: 120rpx;
		margin: auto;
		border-bottom: 2rpx solid #EFF0F3;
	}

	.titleLeft {
		width: 50%;
		text-align: left;
		font-size: 28rpx;
		color: #000000;
	}

	.titleRight {
		width: 50%;
		text-align: right;
		font-size: 28rpx;
		color: #999999;
	}

	.garyLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
	}
</style>
