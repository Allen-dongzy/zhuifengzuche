<template>
	<view class="">
		<view class="box" v-for="(item, index) in list" :key="index" @click="selectCard(index)">
			<view class="flex">
				<view style="width: 90%;">{{item.bankName}}</view>
				<image style="height: 44rpx;width: 44rpx;" :src="`${ossUrl}/mine/edit.png`" @click="edit(index)">
				</image>
			</view>
			<view class="flex" style="margin: 30rpx 0px;">
				<view class="num">{{item.cardNumber}}</view>
			</view>
			<view class="name">{{item.name}}</view>
		</view>
		<view v-show="dataStatus === 'noData'" class="empty">
			<image class="bg" :src="`${ossUrl}/common/res-empty.png`"></image>
			<view class="text">暂无银行卡</view>
		</view>
		<view class="btn" @click="$open('/pages/mine/addCard')">添加银行卡</view>
	</view>
</template>

<script>
	import {
		receiptPaymentBankList
	} from '@/apis/receiptPayment'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				mode: '',
				dataStatus: '',
				list: []
			}
		},
		onLoad(e) {
			if (e && e.mode) this.mode = e.mode
			this.receiptPaymentBankList()
			this.eventListener()
		},
		methods: {
			// 银行卡列表
			async receiptPaymentBankList() {
				this.list = []
				const [err, res] = await receiptPaymentBankList()
				if (err) {
					if (this.list.length > 0) this.dataStatus = 'noMore'
					else this.dataStatus = 'noData'
					return
				}
				this.list = res.data
				this.dataStatus = 'noMore'
			},
			// 编辑银行卡
			edit(index) {
				if (this.mode === 'select') return
				this.$open('/pages/mine/addCard', {
					type: 1,
					info: JSON.stringify(this.list[index])
				})
			},
			// 选择银行卡
			selectCard(index) {
				if (this.mode !== 'select') return
				uni.$emit('selectCard', {
					info: JSON.stringify(this.list[index])
				})
				this.$close()
			},
			// 监听事件
			eventListener() {
				uni.$on('bandCardRefresh', () => {
					this.receiptPaymentBankList()
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.box {
		box-shadow: 0px 0px 0px 5rpx rgba(114, 141, 244, 0.25);
		width: 80%;
		margin: auto;
		border-radius: 20rpx;
		margin-top: 20rpx;
		padding: 30rpx;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.num {
		font-size: 48rpx;
		margin-right: 20rpx;
	}

	.name {
		color: #999999;
		font-size: 28rpx;
	}

	.btn {
		position: fixed;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		width: 90%;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
	}

	.empty {
		@include flex-col();
		margin-top: 200rpx;

		.bg {
			@include box(400rpx, 252rpx);
		}

		.text {
			@include font-set(28rpx, #999);
			line-height: 40rpx;
			margin-top: 20rpx;
		}
	}
</style>
