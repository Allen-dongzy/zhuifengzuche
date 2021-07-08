<template>
	<view class="">
		<view v-for="(item,index) in list" :key='index' class="box"
			@click="$open('/pages/mine/invoiceInfo', {obj: JSON.stringify(item)})">
			<view class="flex">
				<view class="flex" style="width: 96%;">
					<view class="title">{{item.title}}</view>
					<view class="tips">普票</view>
				</view>
				<image style="height: 32rpx;width: 20rpx;" :src="`${ossUrl}/mine/huiyou.png`" mode=""></image>
			</view>
			<view class="num">{{item.taxNum}}</view>
		</view>
		<button style=" color: white;
		width: 90%;
				margin: auto;
				margin-top: 5vh;
			    background-color: #5A7EFF;
			    border-radius: 50px;
			    font-size: 32rpx;
			    height: 96rpx;line-height: 96rpx; " type="default" @click="$open('/pages/mine/invoiceInfo')">添加新抬头</button>
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
				list: []
			}
		},
		onLoad() {
			this.invoiceQueryByUser()
		},
		methods: {
			async invoiceQueryByUser() {
				let data = {

				}
				const [err, res] = await invoiceQueryByUser()
				if (err) return
				console.log(res)
				this.list = res.data
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
</style>
