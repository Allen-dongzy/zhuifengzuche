<template>
	<view class="thaw">
		<input type="text" v-model="amount" placeholder="请输入冻结金额" />
		<br />
		<input type="text" v-model="orderSn" placeholder="请输入订单编号" />
		<br />
		<view class="btn" @click="paymentAliPayThawMoney">解冻</view>
	</view>
</template>

<script>
import { paymentAliPayThawMoney } from '@/apis/payment'
import { throttle } from '@/utils/tools'

export default {
	data() {
		return {
			amount: '',
			orderSn: ''
		}
	},
	methods: {
		//  支付宝-免押资金解冻
		paymentAliPayThawMoney: throttle(async function() {
			if (!this.amount) {
				this.$toast('请输入冻结金额')
				return
			}
			if (!this.orderSn) {
				this.$toast('请输入订单编号')
				return
			}
			this.$showLoading('解冻中')
			const params = {
				amount: Number(this.amount),
				orderSn: this.orderSn
			}
			const [err, res] = await paymentAliPayThawMoney(params)
			uni.hideLoading()
			console.log(res)
			console.log(err)
			if (err) return
			this.$toast('解冻成功')
		})
	}
}
</script>

<style lang="scss">
	.thaw {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40rpx;
		
		input {
			width: 100%;
			height: 80rpx;
			border: 1px solid #ddd;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 20rpx;
			background-color: #fff;
			& ~ input {
				margin-top: 40rpx;
			}
		}
		.btn {
			width: 200rpx;
			height: 80rpx;
			display: flex; 
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			color: #fff;
			background-color: #007AFF;
			border-radius: 30rpx;
			margin-top: 100rpx;
		}
	}
</style>
