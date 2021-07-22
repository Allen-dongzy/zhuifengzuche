<template>
	<view class="">
		<view style="margin: auto;width: 220rpx;height: 220rpx;margin-top: 30vh;">
			<image style="width: 100%;height: 100%;" :src="img" mode=""></image>
		</view>
		<view style="width: 100%;text-align: center;font-size: 44rpx;margin-top: 30rpx;">¥{{setprice}}</view>
		<!-- <view class="title">款项名称</view> -->

		<button style=" color: white;
				width: 90%;
						margin:20vh auto 20rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" @click="look">查看是否到账</button>
	</view>
</template>

<script>
	import {
		deliveryVehicleGet
	} from "../../apis/rentalOrder"
	import {
		precreate,
		payStatus
	} from "../../apis/pay"
	export default {
		data() {
			return {
				price: '',//价格
				info: '',//后端需要的支付信息
				img: '',//二维码
				setprice: '',//显示价格
				name: '',
				status: '',//
				rentalOrderId: '',//返回订单id
				type:'',
			}
		},
		onLoad(e) {
			this.deliveryVehicleGet(e.orderId)
			this.price = e.price
			this.type=e.type
		},
		methods: {
			async deliveryVehicleGet(e) {
				let data = {
					orderId: e
				}
				const [err, res] = await deliveryVehicleGet(data)
				if (err) return
				console.log(res)
				if(this.type==1){
					this.info = res.data.otherFeesPickCarPriceReflect
				}else{
					this.info = res.data.rentalDepositReflect
				}
				this.precreate()
			},
			async precreate(e) {
				let data = {
					orderId: this.info.orderId,
					payway: 3,
					reflect: this.info,
					subPayway: 2,
					subject: '收款',
					totalAmount: this.price,

				}
				const [err, res] = await precreate(data)
				if (err) return
				console.log(res)
				this.img = res.data.qrCode
				this.setprice = res.data.totalAmount
				this.rentalOrderId = res.data.rentalOrderId
			},
			async look() {

				const [err, res] = await payStatus(this.rentalOrderId)
				if (err) return
				if(res.data==false){
					this.$toast('暂未到账')
				}else{
					this.$open('/pages/home/payEd',{price:this.setprice,type:this.type})
				}

		
				
			}
		}
	}
</script>

<style>
	.title {
		background-color: #EFF0F3;
		padding: 20rpx 40rpx;
		color: #999999;
		font-size: 24rpx;
		width: 30%;
		text-align: center;
		border-radius: 10rpx;
		margin: auto;
		margin-top: 30rpx;
	}
</style>
