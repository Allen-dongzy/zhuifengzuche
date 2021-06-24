<template>
	<view class="">
		<view class="box">
			<view class="flex">
				<view style="width: 90%;">中国银行</view>  
				<image style="height: 44rpx;width: 44rpx;" :src="`${ossUrl}/mine/edit.png`"  @click="$open('/pages/mine/addCard')"></image>
			</view>
			<view class="flex" style="margin: 30rpx 0px;">
				<view class="num">****</view>
				<view class="num">****</view>
				<view class="num">****</view>
				<view class="num">8888</view>
			</view>
			<view class="name">张全蛋</view>
		</view>
		
		<button style=" color: white;
			width: 90%;
					margin: auto;
					margin-top: 10vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx; " type="default" @click="next">添加银行卡</button>
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
			next(){
				uni.navigateTo({
					url:'./addCard'
				})
			}
		}
	}
</script>

<style>
	.box{
		box-shadow: 0px 0px 0px 5rpx rgba(114,141,244,0.25);
		width: 80%;
		margin: auto;
		border-radius: 20rpx;
		margin-top: 20rpx;
		padding: 30rpx;
	}
	.flex{
		display: flex;
		align-items: center;
	}
	.num{
		font-size: 48rpx;
		margin-right: 20rpx;
	}
	.name{
		color: #999999; 
		font-size: 28rpx;
	}
</style>
