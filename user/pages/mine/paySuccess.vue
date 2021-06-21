<template>
	<view class="">
		<view style="width:400rpx; margin: auto;margin-top: 25vh;">
			<image  style="height:250rpx;width: 100%;" :src="`${ossUrl}/mine/payed.png`"></image>
		</view>
		<view class="title">提交成功！</view>
		<view class="title1">工作人员正在处理中，请耐心等待</view>
		
		<button style=" color: white;
			width: 90%;
					margin: auto;
					margin-top: 25vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx; " type="default">确定</button>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.title{
		color: #000000;
		font-size: 32rpx;
		width: 25%;
		text-align: center;
		
		margin: auto;
		margin-top: 20rpx;
	}
	.title1{
		color: #000000;
		font-size: 24rpx;
		width: 50%;
		text-align: center;
		margin: auto;
		margin-top: 20rpx;
	}
</style>
