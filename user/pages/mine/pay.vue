<template>
	<view class="">
		<view class="box" @click="goDetail(index)" v-for="(item, index) in list" :key="index">
			<view class="flexBox">
				<view class="blackText">{{item.projectName}}</view>
				<view
					:class="['colorText', {'orange': item.examineStatus===0||item.examineStatus===2}, {'blue': item.examineStatus===1}, {'red': item.examineStatus===3}]">
					{{item.examineStatus | statusFilter(type)}}
				</view>
			</view>
			<view class="grayTetx">{{item.carNumber}}丨{{item.createTime ? item.createTime.split(' ')[0] : ''}}</view>
			<view class="redText">¥ {{item.money}}</view>
		</view>
		<uni-load-more :status="dataStatus" />
		<view class="btn-mat"></view>
		<view class="btn" @click="gopay">{{`发起${type===0 ? '收款' : '付款'}`}}</view>
	</view>
</template>

<script>
	import {
		receiptPaymentPageQuery
	} from '@/apis/receiptPayment'
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
				list: [],
				type: null, // 0:收款 1:付款
			}
		},
		filters: {
			statusFilter(status, type) {
				const statusBox = ['待确认', '已收款', '审核中', '未通过']
				if (type === 1) statusBox[1] = '已付款'
				return statusBox[status]
			}
		},
		onLoad(e) {
			if (e && e.type) this.type = parseInt(e.type)
			let title = ''
			if (this.type === 0) {
				title = '收款'
			} else if (this.type === 1) {
				title = '付款'
			}
			uni.setNavigationBarTitle({
				title
			})
			this.receiptPaymentPageQuery()
			this.eventListener()
		},
		onReachBottom() {
			if (!this.requestKey) return
			this.page++
			this.receiptPaymentPageQuery()
		},
		methods: {
			// 初始化
			init() {
				this.requestKey = false
				this.page = 1
				this.list = []
			},
			// 分页
			async receiptPaymentPageQuery() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size,
					transactionType: this.type
				}
				const [err, res] = await receiptPaymentPageQuery(params)
				if (err) {
					this.dataStatus = 'noData'
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
			},
			// 前往详情
			goDetail(index) {
				this.$open('/pages/mine/payInfo', {
					id: this.list[index].id,
					type: this.type
				})
			},
			// 前往付款/收款
			gopay() {
				this.$open('./goPay', {
					type: this.type
				})
			},
			// 监听事件
			eventListener() {
				uni.$on('payRefresh', () => {
					this.init()
					this.receiptPaymentPageQuery()
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		width: 80%;
		margin: auto;
		padding: 30rpx;
		border-radius: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0px 0px 0px 5rpx rgba(114, 141, 244, 0.25);
	}

	.flexBox {
		display: flex;
		align-items: center;
	}

	.blackText {
		color: #000000;
		font-size: 28rpx;
		width: 85%;
		font-weight: 700;
		line-height: 40rpx;
	}

	.colorText {
		width: 15%;
		font-size: 28rpx;
		font-weight: 700;

		&.orange {
			color: #FFA05B !important;
		}

		&.blue {
			color: #5A7EFF !important;
		}

		&.red {
			color: #FC3736 !important;
		}
	}

	.grayTetx {
		font-size: 24rpx;
		color: #999;
		line-height: 34rpx;
		margin-top: 10rpx;
	}

	.redText {
		font-size: 28rpx;
		color: #FC3736;
		line-height: 36rpx;
		margin-top: 20rpx;
	}

	.btn-mat {
		height: 160rpx;
	}

	.btn {
		position: fixed;
		bottom: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		width: 88%;
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
