<template>
	<view class="">
		<view class="topNav">
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/1.png')" mode=""></image>
			</view>
			<view style="font-size: 32rpx;">基本信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" :src="$util.fileUrl('/next1.png')" mode=""></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/2-2.png')" mode=""></image>
			</view>
			<view style="font-size: 32rpx;color: #5A7EFF;">证件信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" :src="$util.fileUrl('/next2.png')" mode=""></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/3.png')" mode=""></image>
			</view>
			<view style="font-size: 32rpx;">门店信息</view>
		</view>

		<view class="title">身份证照片</view> 
		<view class="idCard">
			<image class="imgBox" :src="$util.fileUrl('/idCard1.png')" mode="" @click="getImg(1)"></image>
			<image class="imgBox" :src="$util.fileUrl('/idCard2.png')" mode="" @click="getImg(2)"></image>
		</view>
		<view class="title">营业执照照片</view>
		<view class="idCard">
			<image class="imgBox" :src="$util.fileUrl('/yinye.png')" mode="" @click="getImg(3)"></image>	
		</view>
		<view class="title">公司名称</view>
		<view class="idCard">
			<input class="nameBox" placeholder="请输入公司名字" type="text" value="" />
		</view>
		
	<button  style=" color: white;
		width: 80%;
				margin: 20rpx auto;
			    background-color: #5A7EFF;
			    border-radius: 50px;
			    font-size: 32rpx;
			    height: 96rpx;line-height: 96rpx;" type="default" @click="next()">下一步</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					margin: 'auto',
					marginTop: '120px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginBottom: '20px',
					color: 'white',
					width: '90%',
					borderRadius: '50rpx',
					backgroundColor: '#5A7EFF'
				} //提交按钮样式
			}
		},
		onLoad() {

		},
		methods: {
			next() {
				console.log('ppp')
				uni.navigateTo({
					url:'./businessStore'
				})
			},
			getImg(e){
				uni.chooseImage({
									count:1,
									sizeType:['original','compressed'],
									sourceType:['camera','album'],//camera 拍照 album 相册
									success:(res)=> {
										console.log(res)
										uni.showToast({
											title:"成功拍照或引用相册",
											duration:2000
										})
									},
									fail() {
										uni.showToast({
											title:"拍照或引用相册失败",
											duration:2000
										})
									}
								})
			},
			getYinye(){
				
			}
		}
	}
</script>

<style>
	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 122rpx;
		width: 100%;
		border-bottom: 20rpx solid #EFF0F3;
	}

	.title {
		color: black;
		font-size: 28rpx;
		margin-top: 40rpx;
		margin-left: 32rpx;
	}

	.idCard {
		width: 90%;
		margin: auto;
		padding-top: 20rpx;
	}

	.imgBox {
		height: 186rpx;
		width: 44%;
		margin: 0px 3%;
	}

	.nameBox {
		background-color: #EFF0F3;
		height: 74rpx;
		border-radius: 10rpx;
		padding-left: 20rpx;
		font-size: 24rpx;
		color: #999999;
	}
</style>
