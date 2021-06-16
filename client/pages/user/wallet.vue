<template>
	<view>
		<view class="topNav">
			<view class="tips">当前余额</view>
			<view class="flexBox">
				<view class="num">¥1234.55</view>
				<view class="lookOther" @tap="lookBill">查看账单</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="addCard">
			<image style="height: 36rpx;width: 36rpx;margin-left: 40rpx;" :src="$util.fileUrl('/addCard.png')" mode="">
			</image>
			<view style="margin-left: 10rpx;" @click="setCard(0)">添加银行卡</view>
		</view>

		<view
			style="border: 2rpx solid rgba(114,141,244,0.25);border-radius: 20rpx;width: 90%;margin: auto;padding: 20rpx 0rpx;">
			<view class="title" @click="setCard(1)">管理银行卡</view>
			<view class="cardline"></view>
			<view class="bank">中国工商银行 (张全蛋 尾号8888)</view>
		</view>

	</view>
</template>

<script>
	import {
		open
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				obj: {
					id: 1,
					kaihu: '重庆支行',
					name: '梨花',
					num: '1234 1234 1234 1234',
					phone: '13333333333'
				}
			}
		},
		methods: {
			lookBill() {
				open('/pages/user/bill')
			},
			setCard(e) {
				if (e == 0) {
					uni.navigateTo({
						url: './addCard?type=1',
						animationDuration: 200,
						animationType: 'pop-in'
					})
				} else {
					uni.navigateTo({
						url: './addCard?obj=' + JSON.stringify(this.obj) + '&type=1',
						animationDuration: 200,
						animationType: 'pop-in'
					})
				}
			}
		}
	}
</script>

<style>
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
		color: #999999;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 40rpx;
	}
</style>
