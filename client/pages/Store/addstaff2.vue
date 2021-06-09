<template>
	<view class="">
		<view style="width: 100%;border-bottom:20rpx solid #EFF0F3 ;">
			<view class="flexBox">
				<image style="width: 20rpx;height:20rpx;" src="../../static/img/1.png" mode=""></image>
				<view style="color: #999999;font-size: 32rpx;margin: 0rpx 20rpx;">基本信息</view>
				<image style="width: 12rpx;height:12rpx;" src="../../static/img/next2.png" mode=""></image>
				<image style="width: 20rpx;height:20rpx; margin: 0rpx 20rpx;" src="../../static/img/2-2.png" mode="">
				</image>
				<view style="font-size: 32rpx;color:#5A7EFF;">权限管理</view>
			</view>
		</view>

		<view v-for="(item,index) in list"
			style="border-bottom: 2rpx solid #EFF0F3;width: 90%;margin: auto;margin-top: 40rpx;">
			<view class="contentFlex">
				<view class="blueLine"></view>
				<view class="title" style="width: 72%;">车辆管理</view>
				<image style="height: 32rpx;width: 32rpx;" v-if="item.stuse==1" :src="$util.fileUrl('/quanxian1.png')"
					@click="setlook1" mode=""></image>
				<image style="height: 32rpx;width: 32rpx;" v-else :src="$util.fileUrl('/quanxian2.png')"
					@click="setlook1" mode=""></image>
				<view class="title">查看</view>
			</view>
			<view style="width: 100%;padding: 30rpx 0rpx">
				<view v-for="(itemy,index) in item.item" :key="index"
					style="display: inline-block;width: 30%;text-align: center;padding: 5rpx 0rpx;">
					<view style="display: flex;align-items: center;">
						<image style="height: 32rpx;width: 32rpx;" v-if="itemy.type==1"
							:src="$util.fileUrl('/quanxian1.png')" @click="setlook1" mode=""></image>
						<image style="height: 32rpx;width: 32rpx;" v-else :src="$util.fileUrl('/quanxian2.png')"
							@click="setlook1" mode=""></image>
						<view class="title">查看</view>
					</view>
				</view>
			</view>
		</view>

		<button style=" color: white;
		width: 80%;
		margin: 20rpx auto;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx; 
		height: 96rpx;line-height: 96rpx;" type="default" @click="next">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				//stuse:0是没有选中 1是选中
				list: [{
					stuse: 0,
					item: [{
						type: 1
					}, {
						type: 0
					}, {
						type: 0
					}, {
						type: 0
					}]
				}, {
					stuse: 0,
					item: [{
						type: 1
					}, {
						type: 0
					}, {
						type: 0
					}, {
						type: 0
					}]
				}, {
					stuse: 0,
					item: [{
						type: 1
					}, {
						type: 0
					}, {
						type: 0
					}, {
						type: 0
					}]
				}, {
					stuse: 0,
					item: [{
						type: 1
					}, {
						type: 0
					}, {
						type: 0
					}, {
						type: 0
					}]
				}, {
					stuse: 0,
					item: [{
						type: 1
					}, {
						type: 0
					}, {
						type: 0
					}, {
						type: 0
					}]
				}, {
					stuse: 0,
					item: [{
						type: 1
					}, {
						type: 0
					}, {
						type: 0
					}, {
						type: 0
					}]
				}, ]
			}
		},
		methods: {

		}
	}
</script>

<style>
	.flexBox {
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		height: 120rpx;
	}

	.blueLine {
		background-color: #5A7EFF;
		width: 8rpx;
		height: 24rpx;
	}

	.contentFlex {
		display: flex;
		align-items: center;
		width: 100%;

	}

	.title {
		font-size: 28rpx;
		color: #000000;
		margin-left: 20rpx;

	}
</style>
