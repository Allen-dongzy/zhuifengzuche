<template>
	<view class="">
		<view class="box" @click="$open('/pages/mine/payInfo')">
			<view class="flexBox">
				<view class="blackText">项目名称项目名称</view>
				<view class="colorText"style="color: #FFA05B;">待确认</view>
			</view>
			<view class="grayTetx">渝A·5231B丨2021-06-03</view>
			<view class="redText">¥ 188.00</view>
		</view>
		
		<button style=" color: white;
			width: 88%;
					margin: auto;
					margin-top: 5vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx; " type="default" @click="gopay">发起付款</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gopay(){
				uni.navigateTo({
					url:'./goPay'
				})
			}
		}
	}
</script>

<style>

	.box{
	width: 80%;
	    margin: auto;
	    padding: 30rpx;
	    border-radius: 20rpx;
	    margin-top: 30rpx;
		box-shadow: 0px 0px 0px 5rpx rgba(114,141,244,0.25);
	}
	
	.flexBox{
		display: flex;
		align-items: center;
	}
	.blackText{
		color: #000000;
		font-size: 28rpx;
		width: 85%;
		font-weight: 700;
	}
	.colorText{
		width: 15%;
		font-size: 28rpx;
		font-weight: 700;
	}
	.grayTetx{
		font-size: 24rpx;
		color: #999999;
		margin: 30rpx 0rpx;
	}
	.redText{
		font-size: 28rpx;
		color:#FC3736;
		font-weight: 700;
	}
</style>
