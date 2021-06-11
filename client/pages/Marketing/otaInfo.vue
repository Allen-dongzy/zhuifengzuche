<template>
	<view class="">
		<view class="box">
			<view class="content">
				<view style="font-size: 28rpx;margin-top: 40rpx;">渝A·5231B</view>
				<view style="margin-top: 12rpx;color: #999999;">大众 捷达</view>
			</view>
		</view>
		<view class="flexBox"  v-for="(item,index) in list" :key="index">
			<view class="title">{{item.name}}</view>
			<view class="on-off"><switch :checked="item.status" @change="" /> </view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{name:'携程',status:true},{name:'飞猪',status:false},{name:'去哪儿',status:false}]
			}
		},
		methods: {

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
