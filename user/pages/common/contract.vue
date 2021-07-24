<template>
	<view class="">
		<view class="title">租车合同</view>
		<view class="title" style="font-size:28rpx;">1.概念</view>
		<view class="title" style="font-size:28rpx;">1.1功能介绍</view>
		<view class="title" style="font-size: 28rpx;color:#666;margin: 40rpx auto;">
			这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍
		</view>
		<view class="title" style="font-size:28rpx;">1.2功能介绍</view>
		<view class="title" style="font-size: 28rpx;color:#666;margin: 40rpx auto;">
			这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍
		</view>
		<view v-if="img==''" class="sign">
			<view class="sign-box" @click="$open('/pages/common/signIng')">点击签名</view>
		</view>
		<view v-else class="sign" style="display: flex;align-items: center;justify-content: flex-end;">
			<view class="">签名</view>
			<image style="width: 188rpx;height: 256rpx;transform: rotate(270deg);" :src="img" @click="goSign"></image>
		</view>

		<button v-show="img && mode==='edit'" style="color: white;
			width: 88%;
			margin: auto;
			margin-top: 5vh;
			background-color: #5A7EFF;
			border-radius: 50px;
			font-size: 32rpx;
			height: 96rpx;line-height: 96rpx; " type="default" @click="vehicleUpdateVehicleCertificates">提交</button>
		<view v-show="!img && mode==='edit'" style="border:0 !important;
			width: 670rpx !important;
			margin: auto;
			margin-top: 5vh;
			background-color: #ddd;
			border-radius: 50px;
			font-size: 32rpx;
			height: 96rpx;line-height: 96rpx;color:#fff !important;text-align:center;">提交</view>
	</view>
</template>

<script>
	import {
		vehicleGetVehicleCertificatess,
		vehicleUpdateVehicleCertificates
	} from '@/apis/vehicle'
	import {
		throttle
	} from '@/utils/tools'
	import {
		previewImgs
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				mode: '', // 模式 edit:编辑模式 readonly:只读模式
				img: '', // 合同
				id: '', // 合同id
				orderId: '', // 订单id
				vehicleId: '' // 车辆id
			}
		},
		onLoad(e) {
			if (e && e.orderId) this.orderId = e.orderId
			if (e && e.vehicleId) this.vehicleId = e.vehicleId
			if (e && e.mode) this.mode = e.mode
			this.vehicleGetVehicleCertificatess()
			this.eventListenter()
		},
		methods: {
			// 查看合同
			async vehicleGetVehicleCertificatess() {
				const params = {
					orderId: this.orderId,
					vehicleId: this.vehicleId
				}
				const [err, res] = await vehicleGetVehicleCertificatess(params)
				if (err) return
				if (res.code === 500) {
					setTimeout(() => {
						this.$close()
					}, 500)
					return
				}
				if (res.data.contract) this.img = res.data.contract
				this.id = res.data.id
			},
			// 去签名
			goSign() {
				if (this.mode === 'edit') {
					this.$open('/pages/common/signIng')
				} else if (this.mode === 'readonly') {
					// this.previewPics([this.img])
				}
			},
			// 预览图片
			previewPics(urls, index = 0) {
				previewImgs(urls, index)
			},
			// 上传合同
			vehicleUpdateVehicleCertificates: throttle(async function() {
				const params = {
					id: this.id,
					orderId: this.orderId,
					vehicleId: this.vehicleId,
					contract: this.img
				}
				const [err, res] = await vehicleUpdateVehicleCertificates(params)
				if (err) return
				this.$toast('提交成功')
				setTimeout(() => {
					this.$open('/pages/order/useCarSuccess')
				}, 500)
			}),
			// 监听函数
			eventListenter() {
				// 监听合同
				uni.$on('refreshSign', e => {
					this.img = e.sign
				})
			}
		}
	}
</script>

<style>
	.title {
		width: 90%;
		font-size: 35rpx;
		color: #000000;
		margin: 20rpx auto;
	}

	.sign {
		width: 90%;
		margin: auto;
		text-align: right;
	}

	.sign-box {
		color: #5A7EFF;
		border-bottom: 2rpx solid #5A7EFF;
		width: 20%;
		margin-left: 80%;
	}
</style>
