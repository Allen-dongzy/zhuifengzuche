<template>
	<view class="">
		<view v-for="(item, index) in list" :key="index" class="box">
			<view class="flexBox">
				<view class="title">{{item.title}}</view>
				<view class="time">{{item.createTime ? item.createTime.split(' ')[0] : ''}}</view>
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
				page: 1,
				size: 10,
				requestKey: true,
				dataStatus: '',
				list: []
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
			// 消息分页
			async messagePageQuery() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await messagePageQuery(params)
				if (err) {
					if (this.page > 1) this.dataStatus = 'noMore'
					else this.dataStatus = 'noData'
					this.requestKey = false
					return
				}
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.requestKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.list = [...this.list, ...res.data.list]
			}
		}
	}
</script>

<style>
	page {
		background-color: #EFF0F3;
	}

	.box {
		width: 80%;
		margin: auto;
		background-color: white;
		padding: 30rpx 5%;
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
		width: 70%;

	}

	.time {
		color: #999999;
		font-size: 24rpx;
		width: 30%;
		text-align: center;
	}

	.content {
		color: #999999;
		font-size: 24rpx;
		margin-top: 20rpx;
	}
</style>
