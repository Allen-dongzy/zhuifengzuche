<template>
	<view class="">
		<view class="box">
			<view class="title">发票抬头</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" value="" placeholder="请输入发票抬头" />
			</view>
		</view>
		<view class="box">
			<view class="title">税号</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" value="" placeholder="请输入税号" />
			</view>
		</view>
		<view class="box">
			<view class="title">银行账号</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" value="" placeholder="请输入银行账号" />
			</view>
		</view>
		<view class="box">
			<view class="title">开户行</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" value="" placeholder="请输入开户行" />
			</view>
		</view>
		<view class="box">
			<view class="title">注册地址</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" value="" placeholder="请输入注册地址" />
			</view>
		</view>
		<view class="box">
			<view class="title">电话</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" value="" placeholder="请输入电话" />
			</view>
		</view>
		<view class="box" style="border: none;">
			<view class="title">发票类型</view>
			<image v-show="showother==1" style="height: 32rpx;width: 32rpx;" :src="`${ossUrl}`+showimg+``" mode="" @click="select()"></image>
			<image v-show="showother==2" style="height: 32rpx;width: 32rpx;" :src="`${ossUrl}`+showimg+``" mode="" @click="select()"></image>
			<view style="margin-left: 20rpx;color: #000000;font-size:28rpx;">普票</view>
		</view>
		<view v-show="showother==1" class="box" style="border: none;padding-bottom: 10rpx;">一般人纳税证明</view> 
		<view v-show="showother==1" class="">
				<image style="height: 160rpx;width: 160rpx;" :src="`${ossUrl}/mine/beizhu.png`" mode=""></image>
		</view>
		
		<button style=" color: white;
			width: 90%;
					margin: auto;
					margin-top: 5vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx; " type="default" @click="sure">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				showimg:'/mine/quanxian2.png',
				showother:2
			}
		},
		methods: {
			select(){
				if(this.showother==2){
					this.showimg='/mine/quanxian1.png'
					this.showother=1
				}else{
					this.showother=2
					this.showimg='/mine/quanxian2.png'
				}
				
			}
		}
	}
</script>

<style>
	.box{
		width: 90%;
		margin: auto;
		padding: 20rpx 0rpx;
		border-bottom: 2rpx solid #EFF0F3;
		display: flex;
		align-items: center;
	}
	.title{
		color: #000000;
		font-size: 24rpx;
		width: 20%;
	}
	.titleInp{
		color: #000000;
		font-size: 24rpx;
		width: 20%;
	}
</style>
