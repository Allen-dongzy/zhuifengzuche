<template>
	<view class="">
		<view style="text-align: center;margin-top: 7vh;">
			<image class="logo" :src="`${ossUrl}/common/cache-logo.png`"></image>
		</view>
		<view class="title">郑家院子1号店</view>
		<view class="flexBox">
			<view v-for="(item,index) in num" style="margin: 40rpx 10rpx;" @click="select(index)">
				<image  style="width: 52rpx;height: 52rpx;" :src="`${ossUrl}/common/icon-star.png`"></image>
			</view>	
			<view v-for="(item,index) in 0" style="margin: 40rpx 10rpx;" @click="select(index)">
				<image style="width: 52rpx;height: 52rpx;"  :src="`${ossUrl}/common/grayStar.png`"></image>
			</view>	
		</view>
		<view class="grayLine"></view>
		<view class="">
			<textarea class="content" value="" placeholder="说说哪里好，其他顾客想知道" />
		</view>
	<button style=" color: white;
		width: 88%;
				margin: auto;
				margin-top: 5vh;
			    background-color: #5A7EFF;
			    border-radius: 50px;
			    font-size: 32rpx;
			    height: 96rpx;line-height: 96rpx; " type="default" @click="next">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					ossUrl: this.$ossUrl, // oss
					num:5,
				
			}
		},
		methods: {
			next(){
				uni.navigateTo({
					url:'/evaluateEd'
				})
			}
		}
	}
</script>

<style>
	.logo{
		height: 120rpx;
		width: 120rpx;
	}
	.title{
		font-size: 32rpx;
		color: #000000;
		font-weight: 500;
		letter-spacing: 5rpx;
		margin: auto;
		margin-top: 40rpx;
		width: 40%;
		text-align: center;
	}
	.flexBox{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.grayLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 60rpx;
	}
	.content{
		background-color:#EFF0F3;
		padding: 30rpx;
		width: 84%;
		margin: auto;
		margin-top: 60rpx;
		font-size: 24rpx;
		border-radius: 20rpx;
	}
</style>
