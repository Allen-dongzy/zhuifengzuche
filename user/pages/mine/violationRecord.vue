<template>
	<view class="">
		<view class="box" v-for="(item, index) in list" :key='index' @click="$open('./violationInfo', {id: item.id})">
			<view class="flexBox">
				<view class="bigblackText" style="width: 28%;">{{item.carNumber}}</view>
				<view class="blackText" style="width:72%;color: #5A7EFF;">{{item.payStatus | statuFilter}}</view>
			</view>
			<view class="flexBox">
				<view class="grayText">违法：</view>
				<view class="blackText">{{item.remarks}}</view>
			</view>
			<view class="flexBox">
				<view class="grayText">地点：</view>
				<view class="blackText">{{item.rulesAddress}}</view>
			</view>
			<view class="flexBox" style="padding-bottom: 40rpx;border-bottom: 2rpx dashed #999999;">
				<view class="grayText">时间：</view>
				<view class="blackText">{{item.rulesTime}}</view>
			</view>
			<view class="flexBox" style="margin-top: 40rpx;">
				<view class="bigblackText">罚款：</view>
				<view class="bigblackText" style="color:#FC3736;">¥{{item.rulesMoney}}</view>
				<view class="bigblackText" style="margin-left: 40rpx;">记分：</view>
				<view class="bigblackText" style="color:#FC3736;">{{item.rulesScore}}</view>
			</view>
		</view>
		<load-more :status="dataStatus" info="暂无违章记录"/>
	</view>
</template>

<script>
	import LoadMore from '@/components/load-more/load-more'
	import {
		breakRulesPageNewQuery
	} from '@/apis/breakRules'
	import {
		listManager
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				page: 1,
				size: 10,
				dataStatus: '',
				requestKey: true,
				list: []
			}
		},
		components: {
			LoadMore
		},
		onLoad() {
			this.breakRulesPageNewQuery()
		},
		onReachBottom() {
			if (!this.requestKey) return
			this.page++
			this.breakRulesPageNewQuery()
		},
		filters: {
			statuFilter(payStatus) {
				const statusBox = ['未支付', '已支付']
				return statusBox[payStatus]
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.size = 10
			this.list = []
			this.breakRulesPageNewQuery()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(e) {
			this.page++
			this.breakRulesPageNewQuery()
		},
		methods: {
			// 违章记录分页
			async breakRulesPageNewQuery() {
				let data = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await breakRulesPageNewQuery(data)
				if (err) return
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
	.box {
		box-shadow: 0px 0px 0px 5rpx rgba(114, 141, 244, 0.25);
		width: 80%;
		margin: auto;
		border-radius: 20rpx;
		margin-top: 10rpx 20rpx;
		padding: 30rpx;
		margin-top: 30rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
		margin: 20rpx 0rpx;
	}

	.grayText {
		color: #999999;
		font-size: 28rpx;
		width: 14%;
	}

	.blackText {
		width: 86%;
		text-align: right;
		color: #000000;
		font-size: 24rpx;
	}

	.bigblackText {
		font-size: 28rpx;
		color: #000000;

	}
</style>
