<template> 
	<view class="content">
		<view class="box">
			<view class="regBox"><image style="height:92rpx;width: 316rpx;" src="../../static/img/reglogo.png" mode=""></image> </view>
			<view class="">
				<view class="typeBox" @click="next(1)">我是车主</view>
				<view class="typeBox" @click="next(2)">我是商家</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			next(e){
				if(e==1){
			uni.navigateTo({
				url:'./Owner',
				animationType: 'pop-in',
				animationDuration: 200
				
			})
				}else{
					uni.navigateTo({
						url:'./business',
						animationType: 'pop-in',
						animationDuration: 200
						
					})	
				}
			}
		}
	}
</script>

<style>
	.content {
		background-color: #5A7EFF;
		height: 100vh;
		width: 100%;
		padding-top:40vh;
	}

	.regBox{
		width: 316rpx;
		margin: auto;
		margin-bottom: 150rpx;
		
	}
	.typeBox{
		background-color: white;
			height: 96rpx;
			width: 500rpx;
			text-align: center;
			line-height: 96rpx;
			color: #5A7EFF;
			border-radius: 50rpx;
			margin: auto;
			font-size: 32rpx;
			margin-top: 60rpx;
			
	}
</style>
