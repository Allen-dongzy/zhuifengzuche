<template>
	<view class="">
		<view class="topNav">
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" src="../../static/img/1.png" mode=""></image>
			</view>
			<view style="font-size: 32rpx;">基本信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" src="../../static/img/next1.png" mode=""></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" src="../../static/img/2-2.png" mode=""></image>
			</view>
			<view style="font-size: 32rpx;color: #5A7EFF;">证件信息</view>

		</view>

		<view class="title">身份证照片</view>
		<view class="idCard">
			<image class="imgBox" :src="$util.fileUrl('/idCard1.png')" mode=""></image>
			<image class="imgBox" :src="$util.fileUrl('/idCard2.png')" mode=""></image>
		</view>
		<view class="lineBox"></view>
		<view class="title">营业执照照片</view>
		<view class="idCard">
			<image class="imgBox" :src="$util.fileUrl('/driver1.png')" mode=""></image>
			<image class="imgBox" :src="$util.fileUrl('/driver2.png')" mode=""></image>
		</view>
		<view class="title">车牌号码</view>
		<view class="idCard">
			<input class="nameBox" placeholder="请输入车牌号码" type="text" value="" />
		</view>
		<view class="title">品牌型号</view>
		<view class="idCard">
			<input class="nameBox" placeholder="请输入品牌型号" type="text" value="" />
		</view>
		<view class="title">发动机号码</view>
		<view class="idCard">
			<input class="nameBox" placeholder="请输入发动机号码" type="text" value="" />
		</view>

		<view class="title">发证日期</view>
		<picker mode="date" style="height: 74rpx;" class="pickerBox" @change="pickerStar" :value="indexStar">
			<view v-show="indexStar==-1" class="uni-input" style="height: 74rpx;line-height: 73rpx;">请选择开始时间</view>
			<view v-show="indexStar!=-1" class="uni-input" style="height: 74rpx;line-height: 73rpx;">{{indexStar}}
			</view>
		</picker>
		
		<view class="title">注册日期</view>
		<picker mode="date" style="height: 74rpx;" class="pickerBox" @change="pickerCreat" :value="indexCreat">
			<view v-show="indexCreat==-1" class="uni-input" style="height: 74rpx;line-height: 73rpx;">请选择开始时间</view>
			<view v-show="indexCreat!=-1" class="uni-input" style="height: 74rpx;line-height: 73rpx;">{{indexCreat}}
			</view>
		</picker>




		<u-button type="primary" :custom-style="customStyle" @click="next">完成</u-button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					margin: 'auto',
					marginTop: '60px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginBottom: '20px',
					color: 'white',
					width: '90%',
					borderRadius: '50rpx',
					backgroundColor: '#5A7EFF'
				}, //提交按钮样式

				selectorObj: [{
					cateName: '1',
					id: 1
				}, {
					cateName: '2',
					id: 2
				}], //城市列表
				index: -1, //选择城市角标
				indexStar: -1,
				indexCreat: -1
			}
		},
		onLoad() {

		},
		methods: {
			next() {
				uni.navigateTo({
					url: './businessStore',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			pickerStar: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexStar = e.target.value
			},
			pickerCreat: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexCreat = e.target.value
			},
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

	.lineBox {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin: 40rpx 0px;
	}


	.pickerBox {
		width: 88%;
		height: 74rpx;
		margin: auto;
		margin-top: 20rpx;
		background: #EFF0F3;
		border-radius: 10rpx;
		padding-left: 20rpx;
		color: #999999
	}
</style>
