<template>
	<view class="">
		<view class="topNav">
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/1.png')" mode=""></image>
			</view>
			<view style="font-size: 32rpx;">
				<view class="">基本信息</view>
			</view>
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

		<view class="flexbox">
			<view class="title" style="text-align: left;">身份证照片</view>
			<view class="title" style="text-align: right;color: #5A7EFF;" @click="open1">查看示例图</view>
		</view>

		<view class="idCard">
			<image class="imgBox" :src="idCard1 || $util.fileUrl('/idCard1.png')" mode="" @click="getImg(1)"></image>
			<image class="imgBox" :src="idCard2 || $util.fileUrl('/idCard2.png')" mode="" @click="getImg(2)"></image>
		</view>

		<view class="flexbox">
			<view class="title" style="text-align: left;">营业执照照片</view>
			<view class="title" style="text-align: right;color: #5A7EFF;" @click="open2">查看示例图</view>
		</view>
		<view class="idCard">
			<image class="imgBox" :src="idCard3 || $util.fileUrl('/yinye.png')" mode="" @click="getImg(3)"></image>
		</view>
		<view class="title" style="margin-left: 36rpx;">公司名称</view>
		<view class="idCard">
			<input class="nameBox" v-model="companyName" placeholder="请输入公司名字" type="text" value="" />
		</view>

		<button style=" color: white;
				width: 80%;
				margin: 20rpx auto;
			    background-color: #5A7EFF;
			    border-radius: 50px;
			    font-size: 32rpx;
			    height: 96rpx;line-height: 96rpx;" type="default" @click="next()">下一步</button>

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
			<view class="popTitle">拍照示例：营业执照</view>
			<image class="popImg" :src="$util.fileUrl('/yyzz.png')" mode=""></image>

			<view class="">
				<image class="popclose" @click="close2" :src="$util.fileUrl('/shilica.png')" mode=""></image>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		uploadFiles
	} from '@/apis/oss';
	export default {
		data() {
			return {
				idCard1: '',
				idCard2: '',
				idCard3: '',
				companyName: '追风',
				obj: {}
			}
		},
		onLoad(e) {
			this.obj = JSON.parse(e.obj)
			console.log(this.obj)
		},
		methods: {
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

			next() {
				this.obj.idCardBack = this.idCard1
				this.obj.idCardFront = this.idCard2
				this.obj.businessLicense = this.idCard3
				this.obj.companyName = this.companyName
				console.log(this.obj)
				uni.navigateTo({
					url: './businessStore?obj',

				})
				setTimeout(() => {
					uni.$emit('businessParams', this.obj)
				}, 200)
			},
			getImg(e) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //camera 拍照 album 相册
					success: async (res) => {
						console.log(res)
						const [err, rese] = await uploadFiles([res.tempFilePaths[0]]);
						if (err) return

						console.log(rese[0].url[0])
						if (e == 1) {
							this.idCard1 = rese[0].url[0]
						} else if (e == 2) {
							this.idCard2 = rese[0].url[0]
						} else {
							this.idCard3 = rese[0].url[0]
						}

					},
					fail() {
						uni.showToast({
							title: "拍照或引用相册失败",
							duration: 2000
						})
					}
				})
			},
			getYinye() {

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
		margin-left: 21rpx;
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

	.flexbox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		margin: auto;
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
</style>
