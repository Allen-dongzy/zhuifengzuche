<template>
	<view class="">
		<view class="titelBlack">选择续租还车时间（续租<text style="color: #5A7EFF;">1</text>天<text style="color: #5A7EFF;">2</text>小时）</view>
		<view class="flexBox">
			<image class="day" :src="`${ossUrl}/common/daytime.png`"></image>
			<view class="dayTime" @click="openProcessPopup">06月09日</view>
			<image class="day" style="margin-left: 20%" :src="`${ossUrl}/common/icon-time.png`"></image>
			<view class="dayTime">
				<picker mode="time" @change="Time"  :start="startDate" :end="endDate"
					class="pickerBox">
					
					<label  class="pickerText">{{day}}</label>
				</picker> 
			</view>
		</view>
		<view style="font-size: 24rpx;color:#FFA05B;width: 90%;margin: 20px auto;">* 驾无忧无法继续为您提供保障</view>
		<view style="height: 20rpx;width: 100%;background-color: #EFF0F3;"></view>
		<view class="flexConeten">
			<view class="blackText">夜间还车费</view>
			<view class="garyText">¥60</view>
		</view>
		<view class="bottomFlex">
			<view style="font-size: 28rpx;">总计</view>
			<view style="font-size: 36rpx;color: #FC3736;width: 55%;margin-left: 10rpx;"><text style="font-size: 16rpx;">¥</text>188.00</view>
			<view class="pay">立即支付</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="popbox">
				<view class="flexBox" >
					<view style="width:50%;text-align: left;color: #979797;" @click="closeProcessPopup()">取消</view> 
					<view style="width:50%;text-align: right;" @click="closeProcessPopup()">确定</view>
				</view>
				<view style="margin: 40rpx 0rpx;">选择续租换车时间</view>
				<view class="flexBox" style="width: 100%;margin-bottom: 10rpx;">
					<view class="flexBox1" >
						<view class="colorBox"></view>
						<view class="poptitle">不可续租</view>
					</view>
					<view class="flexBox1" style="justify-content: center;">
						<view class="colorBox" style="background-color: #FFA05B;"></view>
						<view class="poptitle">已租</view>
					</view>
					<view class="flexBox1" style="justify-content: flex-end;">
						<view class="colorBox" style="background-color: #07C160;"></view>
						<view class="poptitle">可续租</view>
					</view>
				</view>
				<view v-for="(item,index) in 30" style="display: inline-block;">
					<view  v-if="index==0" class="colorDay" style="background-color: white;">21</view>
					<view   v-else-if="index==1" class="colorDay" style="background-color: #C4C4C4;">21</view>
					<view   v-else-if="index==2" class="colorDay" style="background-color: #FFA05B;">21</view>
					<view  v-else class="colorDay" style="background-color:#07C160;">21</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
		
				day:'10时30分'
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			// 打开流程弹窗
			openProcessPopup() {
				this.$refs.popup.open()
			},
			// 关闭流程弹窗
			closeProcessPopup() {
				this.$refs.popup.close()
			},
			Day: function(e) {
			
				this.log1 = true
				this.day = e.target.value
			},
			Time: function(e) {
			
				this.log1 = true
				this.day = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
		}
	}
</script>

<style>
	.flexBox{
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
	}
	.flexBox1{
		display: flex;
		align-items: center;
		width: 33%;
	}
	.titelBlack{
		color: #000000;
		color: 32rpx;
		width: 90%;
		margin:40rpx  auto;
		
	}
	.day{
		width: 46rpx;
		height:46rpx;
	}
	.blackText{
		width: 90%;
	}
	.garyText{
		width: 10%;
		color: #999999;
	}
	.flexConeten{
		display: flex;
		align-items: center;
		padding: 40rpx 0rpx;
		border-bottom: 2rpx solid #EFF0F3;
		width: 90%;
		margin: auto;
	}
	.bottomFlex{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height:180rpx;
		border-radius: 40rpx 40rpx 0rpx 0rpx ; 
		box-shadow: 0rpx 0rpx 0rpx 5rpx rgba(114,141,244,0.25);
	}
	.dayTime{
		width: 23%;text-align: center;color: #5A7EFF;border-bottom: 2rpx solid #5A7EFF;margin-left: 20rpx;
	}
	.pay{
		width: 200rpx;
		height: 96rpx;
		opacity: 1;
		background: #5a7eff;
		border-radius: 26px;color: white;line-height: 96rpx;text-align: center;
	}
	.popbox{
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: white;
		width: 90%;
		padding: 50rpx 5%;
	}
	.colorBox{
		background-color: #C4C4C4;
		height: 24rpx;
		width: 24rpx;
		border-radius: 5rpx;
	}
	.colorDay{
		height: 80rpx;width: 80rpx;background-color: #C4C4C4;border-radius: 10rpx;text-align: center;line-height: 80rpx;margin: 20rpx 9rpx;
	}
	.poptitle{
		font-size: 24rpx;margin-left: 10rpx;
	}
</style>
