<template>
	<view class="">
		<view v-if="search==false" class="flexBox" style="margin-top: 20rpx;">
			<view class="point"  @click="addStaff">新增员工+</view>
			<view class="search" @click="showSearch">搜索</view>
			<image style="width:28rpx;height:28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode="" @click="showSearch"></image>
		</view>
		 
		<view class="topNav" style="color: #8E8E93;font-size: 30rpx" v-if="search==true">
			<input type="text" style="background-color:#EFF0F3;height: 60rpx;width: 500rpx;border-radius: 50rpx;padding-left: 20rpx;" value="" />
			<view style="margin-left: 20rpx;" @click="showSearch">取消</view>
		</view>
		<view class="flexBox" v-for="(item,index) in 5"  style="height: 120rpx;border-bottom: 2rpx solid #EFF0F3;" @click="lookinfo"> 
			<view style="font-size: 28rpx;color: #000000;width: 96%;">张全蛋</view>
			<image style="width:16rpx;height:32rpx;" :src="$util.fileUrl('/heiyou.png')" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:false
			}
		},
		methods: {
			showSearch(){
				if(this.search){
					this.search=false
					
				}else{
					this.search=true
					this.showStuse=false
				}
			},
			addStaff(){
				uni.navigateTo({
					url:'./addstaff',
					animationDuration:200,
					animationType:'pop-in'
				})
			},
			lookinfo(){
				uni.navigateTo({
					url:'./addstaffInfo',
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
	}
	.point{
		border:2rpx solid #5A7EFF;
		height: 60rpx;
		width: 162rpx;
		font-size: 24rpx;
		line-height:60rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #5A7EFF;
	}
	.search {
		font-size: 28rpx;
		color: #000000;
		margin-left: 58%;
		margin-right: 10rpx;
	
	}
	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 28rpx;
	
	}
</style>
