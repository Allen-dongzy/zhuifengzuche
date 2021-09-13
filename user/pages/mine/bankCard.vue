<template>
	<view class="">
		<view class="box" v-for="(item, index) in list" :key="index" @click="selectCard(index)">
			<view class="flex">
				<view style="width: 90%;">{{item.bankName}}</view>
				<image style="height: 44rpx;width: 44rpx;" :src="`${ossUrl}/mine/edit.png`" mode="aspectFill"
					@click.stop="edit(index)">
				</image>
			</view>
			<view class="flex" style="margin: 30rpx 0px;">
				<view class="num" v-for="(inner, sub) in item.bandSections" :key="sub">
					<text v-if="sub === item.bandSections.length-1">{{ inner }}</text>
					<text class="star" v-if="sub < item.bandSections.length-1">{{ inner | bankFilter }}</text>
				</view>
			</view>
			<view class="bottom">
				<text class="name">{{item.name}}</text>
				<text v-if="item.isDefault === 1" class="default red">默认</text>
				<text v-else class="default" @click.stop="bankCardEdit(index)">设为默认</text>
			</view>
		</view>
		<view v-if="dataStatus === 'noData'" class="empty">
			<image class="bg" :src="`${ossUrl}/common/res-empty.png`" mode="aspectFill"></image>
			<view class="text">暂无银行卡</view>
		</view>
		<view class="btn" @click.stop="$open('/pages/mine/addCard')">添加银行卡</view>
	</view>
</template>

<script>
	import {
		receiptPaymentBankList
	} from '@/apis/receiptPayment'
	import {
		bankCardEdit
	} from '@/apis/bankCard'
	import {
		throttle
	} from '@/utils/tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				mode: '',
				dataStatus: '',
				list: []
			}
		},
		filters: {
			bankFilter(bankSection) {
				let nums = ''
				for (let i = 0; i < bankSection.length; i++) {
					nums += '*'
				}
				return nums
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
				res.data.forEach(item => {
					item.bandSections = this.getSection(item.cardNumber)
				})
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
			// 设置默认银行卡
			bankCardEdit: throttle(async function(index) {
				const params = {
					id: this.list[index].id,
					bankId: this.list[index].bankId,
					bankName: this.list[index].bankName,
					accountOpeningBranch: this.list[index].accountOpeningBranch,
					name: this.list[index].name,
					cardNumber: this.list[index].cardNumber,
					isDefault: 1,
					userSource: 1
				}
				const [err, res] = await bankCardEdit(params)
				if (err) return
				this.$toast('设置成功')
				this.receiptPaymentBankList()
			}),
			// 获取段落
			getSection(cardNumber) {
				const bandSections = []
				cardNumber = cardNumber.toString()
				for (let i = 0; i < cardNumber.length; i += 4) {
					bandSections.push(cardNumber.slice(i, i + 4))
				}
				return bandSections
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

	page {
		background-color: #fff;
	}

	.box {
		box-shadow: 0px 0px 0px 5rpx rgba(114, 141, 244, 0.25);
		width: 80%;
		margin: auto;
		border-radius: 20rpx;
		margin-top: 20rpx;
		padding: 30rpx 30rpx 0;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.num {
		font-size: 48rpx;
		margin-right: 20rpx;

		&~.num {
			margin-left: 20rpx;
		}

		.star {
			position: relative;
			top: 8rpx;
		}
	}

	.bottom {
		width: 100%;
		height: 102rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.name {
		height: 100%;
		line-height: 102rpx;
		color: #999999;
		font-size: 28rpx;
	}

	.default {
		height: 100%;
		line-height: 102rpx;
		color: #5A7EFF;
		font-size: 28rpx;
		
		&.red {
			color: red;
		}
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
