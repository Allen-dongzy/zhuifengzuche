<template>
	<view class="">
		<view class="box">
			<view class="content">
				<view style="font-size: 28rpx;margin-top: 40rpx;">{{info.carNumber}}</view>
				<view style="margin-top: 12rpx;color: #999999;">{{info.brandName}} {{info.modelName}}</view>
			</view>
		</view>
		<view class="flexBox"  v-for="(item,index) in info.platformVoList" :key="index">
			<view class="title">{{item.thirdName}}</view>
			<view class="on-off"><switch :checked="item.thirdStatus==1" @change="setOpen(index)" /> </view>
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
				info:''
			}
		},
		onLoad(e) {
			this.info=JSON.parse(e.obj)
		},
		methods: {
		async	setOpen(e){
				console.log(e)
				if(this.info.platformVoList[e].thirdStatus==0){
					this.info.platformVoList[e].thirdStatus=1
				}else{
						this.info.platformVoList[e].thirdStatus=0
				}
				const [err,res] = await vehicleOTAOpen(this.info.id,this.info.platformVoList[e].id,this.info.platformVoList[e].thirdStatus)
				if(err) return
				this.$toast('修改成功') 
			}
		}
	}
</script>

<style>
	.box {
		border: 2rpx solid rgba(114, 141, 244, 0.25);
		width: 90%;
		margin: auto;
		border-radius: 30rpx;
		color: #000000;
		margin-top: 40rpx;
		padding-bottom: 30rpx;
	}

	.content {
		width: 90%;
		margin: auto;
	}

	.flexBox {
		display: flex;
		align-items: center;
		width: 86%;margin: auto;
		margin-top: 60rpx;
	}

	.iconBox {
		margin-right: 20rpx;
		border-radius: 5rpx;
		background-color: rgba(90, 126, 255, 0.1);
		height: 34rpx;
		width: 62rpx;
		line-height: 34rpx;
		text-align: center;
		font-size: 16rpx;
		color: #5A7EFF;
	}
	
	/**
	 * 去掉开关选择器图标
	 */
	/deep/ switch::after, switch::before  {
		content: ''
	}
	
	/**
	 * 开关选择器高度
	 */
	/deep/ switch .wx-switch-input, switch .uni-switch-input {
		height: 36rpx !important;
	}
	
	/**
	 * 开关选择器未选中按钮样式
	 */
	/deep/ switch .wx-switch-input::after, switch .uni-switch-input::after {
		left: -4rpx;
		box-shadow: 0rpx 0rpx 10rpx rgba(0,0,0,.6);
	}
	
	/**
	 * 开关选择器选中按钮样式
	 */
	/deep/ switch .wx-switch-input.wx-switch-input-checked::after, switch .uni-switch-input.uni-switch-input-checked::after {
		left: 48rpx;
		box-shadow: 0rpx 0rpx 10rpx rgba(0,0,0,.6);
	}
	
	/**
	 * 开关选择器选中颜色
	 */
	/deep/ switch[checked] .wx-switch-input {
		background-color: #5A7EFF !important;
	}
	.title{
		font-size: 28rpx;
		width: 90%;
	}
	.on-off{
		width: 10%;
	}
</style>
