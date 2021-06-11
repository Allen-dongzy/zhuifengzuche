<template>
	<view class="">
		<view class="flexbox">
			<view class="titleLeft">日期</view>
			<view class="titleRight">2021-06-02</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">项目</view>
			<view class="titleRight">大方租车</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">车牌号</view>
			<view class="titleRight">渝A·533333</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">店员</view>
			<view class="titleRight">张全蛋</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">金额(元)</view>
			<view class="titleRight">¥800 ></view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">付款人</view>
			<view class="titleRight">张全蛋</view>
		</view>
		<view class="flexbox" style="border-bottom: 0rpx;">
			<view class="titleLeft">备注</view>
			<view class="titleRight">这是上次欠的800</view>
		</view>
		<view class="garyLine"></view>
		<view class="flexbox" style="border-bottom: 0rpx;">
			<view class="titleLeft">提交时间</view>
			<view class="titleRight">2021-07-01 18:00:0</view>
		</view>


	<!-- 修改金额弹窗 -->
		<view v-if="money==true" class="Mask">

		</view>
		<view v-if="money==true" class="box1">
			<view style="width: 90%;margin: auto;font-size:32rpx;padding: 20rpx 0rpx;">修改金额</view>
			<view style="width: 90%;margin: auto;">
				<input value="" style="background-color:#EFF0F3;padding-left: 20rpx;height: 74rpx;border-radius: 10rpx;" placeholder="请输入修改金额" />
			</view>
			<view style="width: 90%;margin: auto;" >
				<view style="display: inline-block;width: 50%;">
					<view class="close">取消</view>
				</view>
				<view style="display: inline-block;width: 50%;">
					<view class="yes">确定</view>
				</view>
			</view>
		</view>
		
		<button  style=" color: white;
			width: 80%;
					margin: auto;
					margin-top: 50rpx;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
					line-height: 96rpx;
				    height: 96rpx;" type="default" @click="next">确认收款</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:false
			}
		},
		methods: {

		}
	}
</script>

<style>
	.flexbox {
		display: flex;
		align-items: center;
		width: 90%;
		height: 120rpx;
		margin: auto;
		border-bottom: 2rpx solid #EFF0F3;
	}

	.titleLeft {
		width: 50%;
		text-align: left;
		font-size: 28rpx;
		color: #000000;
	}

	.titleRight {
		width: 50%;
		text-align: right;
		font-size: 28rpx;
		color: #999999;
	}

	.garyLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
	}
	.Mask {
		position: fixed;
		background-color: #000000;
		opacity: 0.6;
		height: 100vh;
		width: 100%;
		top: 0px;
	}
	
	.box1 {
		width: 90%;
		position: absolute;
		padding: 20rpx 0px;
		border-top: 1px solid #FFFFFF;
		border-bottom: 1px solid #FFFFFF;
		background-color: white;
		top: 30vh;
		left: 5%;
		border-radius: 20rpx;
	}
	.close{
		height: 60rpx;
		width: 136rpx;
		border: 1px solid #5A7EFF;
		color: #5A7EFF;
		text-align: center;
		line-height: 60rpx;
		margin: 20px 0rpx;
		border-radius: 10rpx;
	}
	.yes{
		height: 60rpx;
		width: 136rpx;
		color: white;
		background-color: #5A7EFF;
		text-align: center;
		line-height: 60rpx;
		margin: 20px 0rpx;
		border-radius: 10rpx;
		    margin-left: 50%;
	}
</style>
