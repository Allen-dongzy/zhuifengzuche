<template>
	<view>
		<view v-for="(item, index) in list" :key='index' class="box"
			@click="$open('/pages/mine/invoiceInfo', {mode: 'edit', info: JSON.stringify(item)})">
			<view class="flex">
				<view class="flex" style="width: 96%;">
					<view class="title">{{item.title}}</view>
					<view class="tips">普票</view>
				</view>
				<image style="height: 32rpx;width: 20rpx;" :src="`${ossUrl}/mine/huiyou.png`"></image>
			</view>
			<view class="num">{{item.taxNum}}</view>
		</view>
		<view class="btn-mat"></view>
		<view class="btn" @click="$open('/pages/mine/invoiceInfo', {mode: 'add'})">添加新抬头</view>
		<uni-load-more v-show="dataStatus==='noData'" :status="dataStatus" />
	</view>
</template>

<script>
	import {
		invoiceQueryByUser
	} from '@/apis/invoice'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				list: [],
				dataStatus: ''
			}
		},
		onLoad(e) {
			this.invoiceQueryByUser()
			this.eventListener()
		},
		methods: {
			// 获取用户发票抬头
			async invoiceQueryByUser() {
				this.dataStatus = 'loading'
				const [err, res] = await invoiceQueryByUser()
				if (err || !res.data || res.data.length === 0) {
					this.dataStatus = 'noData'
					return
				}
				this.list = res.data
			},
			// 监听事件
			eventListener() {
				// 发票刷新
				uni.$on('invoiceRefresh', () => {
					this.invoiceQueryByUser()
				})
			}
		}
	}
</script>

<style>
	.box {
		width: 90%;
		margin: auto;
		padding: 20rpx 0rpx;
		border-bottom: 2rpx solid #EFF0F3;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.title {
		color: #000000;
		font-size: 28rpx;

	}

	.tips {
		background-color: #5A7EFF;
		width: 62rpx;
		height: 34rpx;
		border-radius: 8rpx;
		color: white;
		font-size: 16rpx;
		text-align: center;
		line-height: 34rpx;
		margin-left: 20rpx;
	}

	.num {
		color: #999999;
		font-size: 28rpx;
		margin-top: 10rpx;
	}

	.btn-mat {
		height: 200rpx;
	}

	.btn {
		position: fixed;
		bottom: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		width: 90%;
		margin: auto;
		margin-top: 5vh;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
	}
</style>
