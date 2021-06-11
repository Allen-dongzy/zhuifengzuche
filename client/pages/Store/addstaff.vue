<template>
	<view class="">

		<view class="">
			<view class="titleText">姓名</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input style="background-color: #EFF0F3;width: 100%;height: 100%;border-radius: 10rpx;padding-left: 20rpx;font-size: 24rpx;" placeholder="请输入姓名" type="text"  /> </view>
		</view>
		<view class="">
			<view  class="titleText">手机号</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input style="background-color: #EFF0F3;width: 100%;height: 100%;border-radius: 10rpx;padding-left: 20rpx;font-size: 24rpx;" placeholder="请输入手机号" type="text"  /> </view>
		</view>
		<view class="">
			<view  class="titleText">密码</view>
			<view class="moreInpbox">
				<view style="width: 90%;"><input :type="inpType" class="inpBox" style="width: 95%;"
						placeholder="请填写密码" /></view>
				<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;"
					:src="$util.fileUrl('/guan.png')" mode="" @click="look"></image>
				<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;"
					:src="$util.fileUrl('/kai.png')" mode="" @click="look"></image>
					
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
		
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showpass: true, //密码眼睛切换 false 关闭  true开启
				inpType:'',
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
			look() {
				console.log('ppp')
				if (this.showpass) {
					this.showpass = false
					this.inpType = 'password'
				} else {
					this.showpass = true
					this.inpType = 'number'
				}
			},
			next(){
				console.log('000')
				uni.navigateTo({
					url:'addstaff2',
					animationDuration:200,
					animationType:'pop-in'
				})
			}
		}
	}
</script>

<style>
	.flexBox{
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		height: 120rpx;
	}
	.moreInpbox {
		display: flex;
		align-items: center;
		background-color: #EFF0F3;
		width: 90%;
		margin: auto;
		border-radius: 10rpx;
	}
	.inpBox {
		background-color: #EFF0F3;
		border-radius: 10rpx;
		height: 74rpx;
		width: 90%;
		margin: auto;
		font-size: 24rpx;
		color: #999999;
		padding-left: 20rpx;
	}
	.titleText{
	font-size: 28rpx;color: #000000;width: 90%;margin: 20rpx auto;	
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
