<template>
	<view class="">
		<view class="flexBox" v-if="selectType==false">
			<image style="height: 28rpx;width: 28rpx;" :src="$util.fileUrl('/loudou.png')" mode=""></image>
			<view class="select" @click="select">筛选</view>
			<image style="height: 18rpx;width: 38rpx;" :src="$util.fileUrl('/xiangxia.png')" mode=""></image>
		</view>


		<view v-if="selectType==true" class="Mask">

		</view>
		<view v-if="selectType==true" class="popSelect">
			<view class="flexBox" style="height:120rpx;border-bottom: 2rpx solid #EFF0F3;">
				<image style="height: 28rpx;width: 28rpx;" :src="$util.fileUrl('/lanloudou.png')" mode=""></image>
				<view class="select" style="color:#597DFD;" @click="select">筛选</view>
				<image style="height: 18rpx;width: 38rpx;" :src="$util.fileUrl('/xiangshang.png')" mode=""></image>
			</view>
			<view class="flexBox" style="height:120rpx;border-bottom: 2rpx solid #EFF0F3;">
				<view style="width: 90%;">江北区</view>
				<view style="width: 10%;text-align: center;">5</view>
			</view>
		</view>




		<view style="margin-top: 20rpx;">
			<view v-for="(item,index) in 5" :key="ind" class="flexBox"
				style="padding: 20rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">
				<view style="width: 80%;">
					<view style="font-size: 28rpx;color:#000000;font-weight: bold;">滨江路皇冠大道送车点</view>
					<view style="color: #B2B2B2;font-size: 24rpx;margin-top: 10rpx;">这里是送车点地址</view>
				</view>
				<switch class="switch" @change="switch1Change" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectType: false,
			}
		},
		methods: {
			select() {
				if (this.selectType) {
					this.selectType = false
				} else {
					this.selectType = true
				}
			}
		}
	}
</script>

<style>
	.flexBox {
		width: 90%;
		margin: auto;
		display: flex;
		align-items: center;
	}

	.select {
		color: #000000;
		font-size: 28rpx;
		margin: 0rpx 15rpx;
	}

	/deep/ switch[checked] .wx-switch-input {
		background-color: #5A7EFF !important;

	}

	switch {
		z-index: -1 !important;
	}

	.Mask {
		position: fixed;
		background-color: #000000;
		opacity: 0.6;
		height: 100vh;
		width: 100%;
		top: 0px;
	}

	.popSelect {
		position: fixed;
		top: 0rpx;
		width: 100%;
		background-color: white;
		border-bottom-right-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
	}
</style>
