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

		</view>

		<view class="flexbox">
			<view class="title" style="text-align: left;margin-left: 0rpx;">身份证照片</view>
			<view class="title" style="text-align: right;color: #5A7EFF;" @click="open1">查看示例图</view>
		</view>


		<view class="idCard">
			<image class="imgBox" :src="$util.fileUrl('/idCard1.png')" mode=""></image>
			<image class="imgBox" :src="$util.fileUrl('/idCard2.png')" mode=""></image>
		</view>
		<view class="lineBox"></view>
		<view class="flexbox">
			<view class="title" style="text-align: left;margin-left: 0rpx;">行驶证照片</view>
			<view class="title" style="text-align: right;color: #5A7EFF;" @click="open2">查看示例图</view>
		</view>
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



		<button style=" color: white;
			width: 80%;
					margin: 20rpx auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;" type="default" @click="next()">完成</button>


		<uni-popup ref="popup" type="center" style="text-align: center;">
			<view class="popTitle">拍照示例：身份证正面</view>
			<image class="popImg" :src="$util.fileUrl('/idzheng.png')" mode=""></image>
			<view class="popTitle">拍照示例：身份证反面</view>
			<image class="popImg" :src="$util.fileUrl('/idfan.png')" mode=""></image>
			<view class="">
				<image class="popclose" @click="close1" :src="$util.fileUrl('/shilica.png')" mode=""></image>
			</view>
		</uni-popup>

		<uni-popup ref="popup2" type="center" style="text-align: center;">
			<view class="popTitle">拍照示例：行驶证正页</view>
			<image class="popImg" :src="$util.fileUrl('/xszz.png')" mode=""></image>
			<view class="popTitle">拍照示例：行驶证副页</view>
			<image class="popImg" :src="$util.fileUrl('/xszf.png')" mode=""></image>
			<view class="">
				<image class="popclose" @click="close2" :src="$util.fileUrl('/shilica.png')" mode=""></image>
			</view>
		</uni-popup>



	</view>
</template>

<script>
	import {
		open
	} from '@/utils/uni-tools'

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
				open('/pages/home/home', 3)
			},
			pickerStar: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexStar = e.target.value
			},
			pickerCreat: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexCreat = e.target.value
			},
			// 身份证开
			open1() {
				this.$refs.popup.open()
			},
			// 身份证关
			close1() {
				this.$refs.popup.close()
			},

			// 营业执照开
			open2() {
				this.$refs.popup2.open()
			},
			// 营业执照关
			close2() {
				this.$refs.popup2.close()
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
		margin-left: 41rpx;
		width: 50%;
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


	.popTitle {
		margin: auto;
		width: 80%;
		color: white;
		text-align: center;
		font-size: 28rpx;
	}

	.popImg {
		width: 446rpx;
		height: 280rpx;
		margin: auto;
		margin-top: 20rpx;
	}

	.popclose {
		width: 80rpx;
		height: 80rpx;
		margin: auto;
		margin-top: 20rpx;
	}

	.flexbox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		margin: auto;
	}
</style>
