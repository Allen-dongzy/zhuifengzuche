<template>
	<view class="">
		<view class="imgbox">
				<image style="width: 100%;height: 100%;"  :src="$util.fileUrl('/payed.png')" mode=""></image>
		</view>
		<view style="position: relative;">
			<view class="bluebg"></view>
			 <view class="whitebg">
				 <view style="width: 90%;margin: auto;padding: 30rpx 0rpx;">已收取</view>
				 <view class="inpbox">
				 	<view style="width: 50%;text-align: left;font-size: 28rpx;">收取金额</view>
					<view style="width: 50%;text-align: right;font-size: 40rpx;color:#FC3736 ;">¥{{price}}</view>
				 </view>
			 </view>
		</view>
		
		<button  style=" color: white;
				width: 90%;
						margin: 30vh auto 20rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" @click="close">关闭</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:'',
				type:''
			}
		},
		onLoad(e) {
			this.price=e.price
			this.type=e.type
		},
		methods: {
			close(){
				if(this.type==1){
					uni.navigateBack({
						delta:3
					})
					const pages = getCurrentPages(); //获取页面栈
						const beforePage = pages[pages.length - 4]; //前一个页面
						beforePage.$vm.getmoney();   //前一个页面方法
				}else{
					uni.navigateBack({
						delta:2
					})
					const pages = getCurrentPages(); //获取页面栈
						const beforePage = pages[pages.length - 3]; //前一个页面
						beforePage.$vm.getmoney();   //前一个页面方法
				}
			}
		}
	}
</script>

<style>
	.imgbox{
		margin: auto;width: 400rpx;height: 252rpx;margin-top: 10vh;
	}
	.bluebg{
		height: 40rpx;width: 90%;border-radius: 50rpx;background-color: #5A7EFF;margin: auto;
	}
	.whitebg{
		width: 90%;border-radius: 20rpx;background-color: white;position: absolute;top: 15rpx;left: 5%;border: 2rpx solid rgba(114,141,244,0.25);
	}
	.inpbox{
		display: flex;align-items: center;background-color: #EFF0F3;padding: 0rpx 20rpx;width: 90%;margin: auto;height: 74rpx;border-radius: 15rpx;margin-bottom: 30rpx;
	}
</style>
