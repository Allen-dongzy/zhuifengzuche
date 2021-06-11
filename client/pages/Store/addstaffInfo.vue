<template>
	<view class="">
		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;">
			<view class="buleLine"></view>
			<view class="navText" style="margin-top: 0rpx;">基本信息</view>
		</view>
		
		
		<view class="">
			<view class="title">姓名</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input class="getBox" placeholder="请输入姓名" type="text"  /> </view>
		</view>
		<view class="">
			<view  class="title">手机号</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input class="getBox" placeholder="请输入手机号" type="text"  /> </view>
		</view>
		<view class="">
			<view  class="title">密码</view>
			<view class="moreInpbox">
				<view style="width: 90%;"><input :type="inpType" class="inpBox" style="width: 95%;"
						placeholder="请填写密码" /></view>
				<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;"
					:src="$util.fileUrl('/guan.png')" mode="" @click="look"></image>
				<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;"
					:src="$util.fileUrl('/kai.png')" mode="" @click="look"></image>
					
			</view> 
		</view>
		
		<view class="garyLine"></view>



		<view v-for="(item,index) in list"
			style="border-bottom: 2rpx solid #EFF0F3;width: 90%;margin: auto;margin-top: 40rpx;">
			<view class="contentFlex">
				<view class="blueLine"></view>
				<view class="look" style="width: 72%;">车辆管理</view>
				<image style="height: 32rpx;width: 32rpx;" v-if="item.stuse==1" :src="$util.fileUrl('/quanxian1.png')"
					@click="setlook1" mode=""></image>
				<image style="height: 32rpx;width: 32rpx;" v-else :src="$util.fileUrl('/quanxian2.png')"
					@click="setlook1" mode=""></image>
				<view class="look">查看</view>
			</view>
			<view style="width: 100%;padding: 30rpx 0rpx">
				<view v-for="(itemy,index) in item.item" :key="index"
					style="display: inline-block;width: 30%;text-align: center;padding: 5rpx 0rpx;">
					<view style="display: flex;align-items: center;">
						<image style="height: 32rpx;width: 32rpx;" v-if="itemy.type==1"
							:src="$util.fileUrl('/quanxian1.png')" @click="setlook1" mode=""></image>
						<image style="height: 32rpx;width: 32rpx;" v-else :src="$util.fileUrl('/quanxian2.png')"
							@click="setlook1" mode=""></image>
						<view class="look">查看</view>
					</view>
				</view>
			</view>
		</view>
		
 
			<view class="buttonBox" >  
				<view class="setnull">清空</view>
				<view class="sure">确定</view>   
			</view>
			
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showpass: true, //密码眼睛切换 false 关闭  true开启
				inpType:'',//input 类型
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
		}
	}
</script>

<style>
	.flexBox {
		display: flex;
		align-items: center;

	}

	.buleLine {
		background-color: #5A7EFF;
		width: 6rpx;
		height: 24rpx;
		margin-left: 20rpx;
	}

	.navText {
		color: #000000;
		font-weight: bold;
		font-size: 32rpx;
		margin-left: 20rpx;
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
	.title{
	font-size: 28rpx;color: #000000;width: 90%;margin: 20rpx auto;	
	}
	.getBox{
		background-color: #EFF0F3;width: 100%;height: 100%;border-radius: 10rpx;padding-left: 20rpx;font-size: 24rpx;
	}
	.garyLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 40rpx;
	}
	.look {
		font-size: 28rpx;
		color: #000000;
		margin-left: 20rpx;
	
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
	.setnull {
		height: 96rpx;
		width: 300rpx;
		border: 1px solid #B2B2B2;
		color: #B2B2B2;
		text-align: center;
		line-height: 96rpx;
		margin: 0px 20rpx;
		border-radius: 50rpx;
	}
	
	.sure {
		height: 96rpx;
		width: 300rpx;
		color: white;
		background-color: #5A7EFF;
		text-align: center;
		line-height: 96rpx;
		margin: 0px 20rpx;
		border-radius: 50rpx;
	}
	
	.buttonBox{
		display: flex;
		justify-content: center;
		align-items: center; 
		padding: 20rpx 0rpx;   
	}
</style>
