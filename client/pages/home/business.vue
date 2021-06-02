<template>
	<view class="">
		<view class="topNav">
			<view style="width: 5%;text-align: center;"><image style="width: 20rpx;height: 20rpx;" src="../../static/img/img/1-1.png" mode=""></image></view>
			<view style="font-size: 32rpx;color: #5A7EFF;">基本信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;"><image style="width: 10rpx;height: 10rpx;" src="../../static/img/img/next1.png" mode=""></image></view>
			<view style="width: 5%;text-align: center;"><image style="width: 20rpx;height: 20rpx;" src="../../static/img/img/2.png" mode=""></image></view>
			<view style="font-size: 32rpx;">证件信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;"><image style="width: 10rpx;height: 10rpx;" src="../../static/img/img/next2.png" mode=""></image></view>
			<view style="width: 5%;text-align: center;"><image style="width: 20rpx;height: 20rpx;" src="../../static/img/img/3.png" mode=""></image></view>
			<view style="font-size: 32rpx;">门店信息</view>
		</view>
		
		<view class="">
				<u-form :model="form" ref="uForm" :border-bottom="show">
					<u-form-item :border-bottom="show">
						<view class="fromTitel">姓名</view>
						<input class="inpBox" type="text" placeholder="请填写姓名" />
					</u-form-item>

					<u-form-item :border-bottom="show">
						<view class="fromTitel">身份证号码	</view>
						<input class="inpBox" type="text" placeholder="请填写身份证号码" />
					</u-form-item>
	
					<u-form-item :border-bottom="show">
						<view class="fromTitel">手机号</view>
						<input class="inpBox" type="text" placeholder="请填写手机号码" />
					</u-form-item>

					<u-form-item :border-bottom="show">
						<view class="fromTitel">验证码</view>
						<view class="moreInpbox">
							<view style="width: 78%;"><input class="inpBox" style="width: 100%;" type="text" placeholder="请填写验证码" /></view>
							<view style="width: 20%;background-color: #EFF0F3;color: #5A7EFF;font-size: 24rpx;">获取验证码</view>
						</view>
					</u-form-item>
			
					<u-form-item :border-bottom="show">
						<view class="fromTitel">邮箱</view>
						<input class="inpBox" type="text" placeholder="请填写邮箱" />
					</u-form-item>
			
					<u-form-item :border-bottom="show">
						<view class="fromTitel">密码</view>
						<view class="moreInpbox">
							<view style="width: 90%;"><input :type="inpType" class="inpBox" style="width: 95%;" placeholder="请填写验证码" /></view>
							<!-- <view style="width: 20%;background-color: #EFF0F3;color: #5A7EFF;font-size: 24rpx;"> -->
								<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;" src="../../static/img/img/guan.png" mode="" @click="look"></image>
								<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;" src="../../static/img/img/kai.png" mode="" @click="look"></image>
							<!-- </view> -->
						</view>
					</u-form-item>
				</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
		form: {
						name: '',
						intro: '',
						sex: ''
					},
					show:false,
					showpass:true,
					inpType:'password',
			}
		},
		onLoad() {

		},
		methods: {
		look(){
			console.log('ppp')
			if(this.showpass){
				this.showpass=false
				this.inpType='password'
			}else{
				this.showpass=true
				this.inpType='number'
			}
		}
		}
	}
</script>

<style>
	.topNav{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 122rpx;
		width: 100%;
		border-bottom: 20rpx solid #EFF0F3;
	}
	.inpBox{
		background-color: #EFF0F3;border-radius: 10rpx;height: 74rpx;width: 90%;margin: auto;font-size: 24rpx;color: #999999;padding-left: 20rpx;
	}
	.fromTitel{
		width: 90%;margin: auto;
	}
	.moreInpbox{
		display: flex;align-items: center;background-color: #EFF0F3;width: 90%;margin: auto;border-radius: 10rpx;
	}
</style>
