<template>
	<view>
		<view v-for="(item, index) in list" :key="index" class="box">
			<view class="flexBox">
				<view class="title">{{item.title}}</view>
				<view class="time">{{item.createTime}}</view>
			</view>
			<view class="content">{{item.content}}</view>
		</view>
		<uni-load-more :status="dataStatus" />
	</view>
</template>

<script>
	import {
		messagePageQuery
	} from '@/apis/message'
	import {
		listManager
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				list: [],
				page: 1,
				size: 10,
				requestKey: true,
				dataStatus: '' // more loading noMore noData
			}
		},
		onLoad() {
			this.messagePageQuery()
		},
		onReachBottom() {
			if (!this.requestKey) return
			this.page++
			this.messagePageQuery()
		},
		methods: {
			// 获取消息列表
			async messagePageQuery() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size,
					userSource: 0
				}
				const [err, res] = await messagePageQuery(params)
				if (err) return
				const {
					dataStatus,
					requestKey,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.dataStatus = dataStatus
				this.requestKey = requestKey
				if (!isRender) return
				this.list = [...this.list, ...res.data.list]
			}
		}
	}
</script>

<style>
page {
  background-color: #FFFFFF;
  height: 100vh;
}
	.box {
		width: 90%;
		margin: auto;
		background-color: white;
		padding: 30rpx;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;

	}

	.title {
		color: #000000;
		font-size: 28rpx;
		width: 45%;

	}

	.time {
		color: #999999;
		font-size: 24rpx;
		width: 55%;
		text-align: center;
	}

	.content {
		color: #999999;
		font-size: 24rpx;
		margin-top: 20rpx;
	}
</style>
