<template>
	<view class="">
		<view class="title">身份证照片</view>
		<view class="flexBox" style="margin-top: 30rpx;">
			<image style="width:48%;height: 186rpx;" :src="idCard1|| $util.fileUrl('/idCard1.png')"
				@click="updataImg(1)"></image>
			<image style="width:48%;height: 186rpx;margin-left: 4%;" :src="idCard2 || $util.fileUrl('/idCard1.png')"
				@click="updataImg(2)"></image>
		</view>

		<view class="title">驾照图片</view>
		<view class="flexBox" style="margin-top: 30rpx;">
			<image style="width:48%;height: 186rpx;" :src="driver1 || $util.fileUrl('/driver1.png')"
				@click="updataImg(3)"></image>
			<image style="width:48%;height: 186rpx;margin-left: 4%;" :src="driver2 ||  $util.fileUrl('/driver2.png')"
				@click="updataImg(4)"></image>
		</view>
		<view class="grayLine"></view>
		<view class="title" style="padding: 60rpx 0rpx 20rpx 0rpx;">租车押金￥{{payinfo.rentalDeposit}}</view>
		<view class="flexBox">
			<!-- 其他收款 -->

			<image v-show="payinfo.otherFeesPickCarPrice==0" style="width:48%;height: 186rpx;"
				:src="$util.fileUrl('/shoukuan.png')" @click="$open('/pages/home/otherPay',{orderId:info.order})"
				mode=""></image>

			<view class="pricebox" v-show="payinfo.otherFeesPickCarPrice!=0">
				<view class="flexBox">
					<view class="priceText">其他收款</view>
					<view class="priceText1">已收取</view>
					<image style="width:20rpx;height: 30rpx;margin-left: 2%;" :src=" $util.fileUrl('/heiyou.png')"
						mode=""></image>
				</view>
				<view style="font-size: 20rpx;margin-top: 20rpx;">¥<text
						style="font-size: 48rpx;">{{payinfo.otherFeesPickCarPrice}}</text></view>
			</view>

			<!-- 押金 -->
			<image v-show="payinfo.retreatRentalDeposit==0" style="width:48%;height: 186rpx;margin-left: 4%;"
				:src="$util.fileUrl('/shoukuan1.png')"
				@click="$open('/pages/home/payCode',{price:payinfo.rentalDeposit,orderId:info.order,type:2})"></image>
			<view class="pricebox" style="margin-left: 4%;" v-show="payinfo.retreatRentalDeposit!=0">
				<view class="flexBox">
					<view class="priceText">预收冻结</view>
					<view class="priceText1">已收取</view>
					<image style="width:20rpx;height: 30rpx;margin-left: 2%;" :src="$util.fileUrl('/heiyou.png')"
						mode=""></image>
				</view>
				<view style="font-size: 20rpx;margin-top: 20rpx;">¥<text
						style="font-size: 48rpx;">{{payinfo.retreatRentalDeposit}}</text></view>
			</view>
		</view>

		<view class="title">备注</view>
		<textarea value="" placeholder="填写备注" v-model="mark"
			style="padding: 30rpx;background-color: #EFF0F3;border-radius: 20rpx;height:220rpx;width: 90%;margin: 20rpx auto;" />


		<button v-show="type==1" style=" color: white;
				width: 90%;
						margin: 20rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" @click="sure()">完成</button>
	</view>
</template>

<script>
	import {
		uploadFiles
	} from '@/apis/oss';
	import {
		throttle
	} from '@/utils/tools';

	import {
		deliveryVehicleGet,
		payStatus,
		getCertificates,
		deliveryVehicleSave
	} from "../../apis/rentalOrder"
	export default {
		data() {
			return {
				idCard1: '',
				idCard2: '',
				driver1: '',
				driver2: '',
				info: '',
				payinfo: '',
				mark: '',
				type: '',
			}
		},
		onLoad(e) {
			console.log(e)
			if (e.type == 1) {
				this.type = 1
				this.info = JSON.parse(e.obj)
				this.deliveryVehicleGet(JSON.parse(e.obj).order)
			} else {
				this.type = 2
				this.info = JSON.parse(e.obj)
				this.getCertificates(JSON.parse(e.obj).order)
			}
		},
		methods: {

			sure: throttle(async function() {
				if (this.payinfo.depositType == 1) {
					var data = {
						idCardBack: this.idCard2,
						idCardPositive: this.idCard1,
						drivingBack: this.driver2,
						drivingPositive: this.driver1,
						retreatRentalDeposit: this.payinfo.rentalDeposit,
						remarks: this.mark,
						otherFeesPickCarPrice: this.payinfo.otherFeesPickCarPrice,
						orderId: this.info.order,
						depositType: this.payinfo.depositType
					}
				} else {
					var data = {
						idCardBack: this.idCard2,
						idCardPositive: this.idCard1,
						drivingBack: this.driver2,
						drivingPositive: this.driver1,
						retreatRentalDeposit: this.payinfo.rentalDeposit,
						remarks: this.mark,
						orderId: this.info.order,
						depositType: this.payinfo.depositType
					}
				}
				const [err, res] = await deliveryVehicleSave(data)
				if (err) return
				console.log(res)
				this.$toast("操作成功")
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 800)
			}),
			updataImg(e) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //camera 拍照 album 相册
					success: async (res) => {
						console.log(res)
						const [err, rese] = await uploadFiles([res.tempFilePaths[0]]);
						if (err) return
						console.log(rese)
						if (e == 1) {
							this.idCard1 = rese[0]
						} else if (e == 2) {
							this.idCard2 = rese[0]
						} else if (e == 3) {
							this.driver1 = rese[0]
						} else {
							this.driver2 = rese[0]
						}
					},
					fail() {

					}
				})
			},

			async deliveryVehicleGet(e) {
				let data = {
					orderId: e
				}
				const [err, res] = await deliveryVehicleGet(data)
				if (err) return
				console.log(res)
				this.payinfo = res.data
			},

			async getCertificates(e) {
				console.log(e)
				const [err, res] = await getCertificates(e)
				if (err) return
				console.log(res)
				this.payinfo = res.data
				this.idCard1 = this.payinfo.idCardPositive
				this.idCard2 = this.payinfo.idCardBack
				this.driver1 = this.payinfo.drivingPositive
				this.driver2 = this.payinfo.drivingBack
				this.mark = this.payinfo.remarks
			},
			async getmoney(e) {

				const [err, res] = await getCertificates(this.info.order)
				if (err) return
				console.log(res)
				this.payinfo = res.data
				this.mark = this.payinfo.remarks
			},

		}
	}
</script>

<style>
	.title {
		width: 90%;
		margin-left: 5%;
		font-size: 28rpx;
		color: #000000;
		padding-top: 30rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
	}

	.grayLine {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 30rpx;
	}

	.pricebox {
		width: 48%;
		height: 186rpx;
		border: 2rpx solid rgba(114, 141, 244, 0.25);
		border-radius: 20rpx;
		padding: 40rpx 20rpx;
	}

	.priceText {
		color: #999999;
		font-size: 24rpx;
	}

	.priceText1 {
		color: #5A7EFF;
		margin-left: 22%;
		font-size: 24rpx;
	}
</style>
