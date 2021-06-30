<template>
	<view class="wallet">
		<view v-show="bankCardStatus === 1" class="addCard" @click="setCard(1)">
			<image style="height: 36rpx;width: 36rpx;margin-left: 40rpx;" :src="$util.fileUrl('/addCard.png')" mode="">
			</image>
			<view style="margin-left: 10rpx;">添加银行卡</view>
		</view>
		<view v-show="bankCardStatus === 2"
			style="border: 2rpx solid rgba(114,141,244,0.25);border-radius: 20rpx;width: 90%;margin: auto;padding: 20rpx 0rpx;"
			@click="setCard(2)">
			<view class="title">管理银行卡</view>
			<view class="cardline"></view>
			<view v-if="wallet && wallet.cardNumber" class="bank">{{ wallet.bankName }} ({{ wallet.name }}
				尾号{{ wallet.cardNumber.slice(wallet.cardNumber.length-4) }})
				<view class="arrow"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		walletQuery
	} from '@/apis/wallet'

	export default {
		data() {
			return {
				wallet: null, // 钱包
				walletId: '', // 钱包id
			}
		},
		onLoad() {
			this.walletQuery()
			this.eventListener()
		},
		computed: {
			// 银行卡状态
			bankCardStatus() {
				if (this.wallet && Object.keys(this.wallet).length === 0) return 1
				else if (this.wallet && Object.keys(this.wallet).length > 0) return 2
				else if (!this.wallet) return 0
			}
		},
		methods: {
			// 查询钱包
			async walletQuery() {
				const params = {
					userSource: 0
				}
				const [err, res] = await walletQuery(params)
				if (err) return
				this.walletId = res.data.id
				this.wallet = res.data.bankCardVOs[0] || {}
			},
			// 新增银行卡/跳转银行卡详情
			setCard(e) {
				this.$open('/pages/user/addCard', {
					type: e,
					walletId: this.walletId,
					bankCardId: this.wallet && this.wallet.id ? this.wallet.id : ''
				})
			},
			// 监听事件
			eventListener() {
				uni.$on('refreshWallet', () => {
					this.walletQuery()
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.wallet {
		padding-top: 30rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.addCard {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		height: 120rpx;
		border-radius: 20rpx;
		width: 90%;
		margin: auto;
		border: 2rpx solid rgba(114, 141, 244, 0.25);
		box-shadow: 3rpx 3rpx 1rpx rgba(114, 141, 244, 0.25);
		margin-top: 30rpx;
	}

	.topNav {
		width: 90%;
		margin: auto;
		margin-top: 20rpx;
		padding-bottom: 30rpx;
	}

	.tips {
		color: #999999;
		font-size: 24rpx;
	}

	.num {
		color: #000000;
		font-size: 56rpx;
		width: 75%;
	}

	.lookOther {
		color: #5A7EFF;
		font-size: 36rpx;
		width: 25%;
		text-align: center;
	}

	.line {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;

	}

	.title {
		height: 60rpx;
		color: #000000;
		padding-left: 40rpx;
	}

	.cardline {
		height: 2rpx;
		background-color: #EFF0F3;
		width: 100%;
	}

	.bank {
		width: 88%;
		color: #999999;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.arrow {
			width: 16rpx;
			height: 16rpx;
			border: 1px solid #999;
			border-left: 0;
			border-bottom: 0;
			transform: rotate(45deg);
		}
	}
</style>
