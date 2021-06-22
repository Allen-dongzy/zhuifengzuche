<template>
	<view class="">
		<view v-for="(item,index) in 5" class="box">
			<view class="flexBox">
				<view class="title">报销审核通过</view>
				<view class="time">2021-06-003</view>
			</view> 
			<view class="content">您提交的订单 5896231545 的报销已通过审核</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #EFF0F3;
	}
	.box{
	width: 80%;
	    margin: auto;
	    background-color: white;
	    padding: 30rpx 5%;
	    border-radius: 20rpx;
	    margin-top: 30rpx;
	}
	
	.flexBox{
		display: flex;
		align-items: center;

	}
.title{
	color: #000000;
	font-size: 28rpx;
	width: 70%;
	
}
.time{
	color: #999999;
	font-size: 24rpx;
	width: 30%;
	text-align: center;
}
.content{
	color: #999999; 
	font-size: 24rpx;
	margin-top: 20rpx;
}
</style>
