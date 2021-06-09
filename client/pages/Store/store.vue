<template>
	<view class="">
		<view class="flexBox" v-if="search==false" @click="getSearch">
			<view class="search">搜索</view>
			<image style="width:28rpx;height:28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode=""></image>
		</view>

		<view class="topNav" style="color: #8E8E93;font-size: 30rpx" v-if="search==true">
			<input type="text" placeholder="请输入门店名字" class="searchInp" value="" />
			<view style="margin-left: 20rpx;" @click="getSearch">取消</view>
		</view>

		<view v-for="(item,index) in list" :key="index" class="allFlex"
			style="border-bottom: 2rpx solid #EFF0F3;width: 90%;margin: auto;padding:20rpx 0rpx;" @click="lookinfo">
			<image style="height:120rpx;width:120rpx" src="../../static/img/logo2.png" mode=""></image>
			<view style="margin-left: 30rpx;">
				<view class="name">门店名称</view>
				<view class="addres">这是门店地址</view>
				<view class="allFlex">
					<image style="height: 36rpx;width: 36rpx;margin-left: 5rpx;" :src="$util.fileUrl('/xing.png')"
						mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [1, 1, 1],
				search: false
			}
		},
		methods: {
			getSearch() { 
				if (this.search) {
					this.search = false

				} else {
					this.search = true
					this.showStuse = false
				}
			},
			lookinfo(){
				uni.navigateTo({
					url:'./storeInfo',
					animationDuration:200,
					animationType:'pop-in'
				})
			}
		}
	}
</script>

<style>
	.allFlex {
		display: flex;
		align-items: center;
	}

	.flexBox {
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		margin-top: 20rpx;

	}

	.search {
		font-size: 28rpx;
		color: #000000;
		margin-left: 80%;
		margin-right: 10rpx;

	}

	.name {
		color: black;
		font-size: 28rpx;
	}

	.addres {
		font-size: 24rpx;
		color: #B2B2B2;
	}

	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 28rpx;

	}

	.searchInp {
		background-color: #EFF0F3; 
		height: 70rpx;
		width: 500rpx;
		border-radius: 50rpx;
		padding-left: 20rpx;
	}
</style>
