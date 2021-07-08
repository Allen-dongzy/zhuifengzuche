<template>
	<view class="">
		<view class="box" v-for="(item,index) in list" :key='index' @click="lookinfo(item.id)">
			<view class="flexBox">
				<view class="bigblackText" style="width: 28%;">渝A·5231B</view>
				<view class="blackText" style="width:72%;color: #5A7EFF;">待支付</view>
			</view>
			<view class="flexBox">
				<view class="grayText">违法：</view>
				<view class="blackText">不按规定停车</view>
			</view>
			<view class="flexBox">
				<view class="grayText">地点：</view>
				<view class="blackText">重庆市渝北区民安大道五四路</view>
			</view>
			<view class="flexBox" style="padding-bottom: 40rpx;border-bottom: 2rpx dashed #999999;">
				<view class="grayText">时间：</view>
				<view class="blackText">2021-06-01 14:18</view>
			</view>
			<view class="flexBox" style="margin-top: 40rpx;">
				<view class="bigblackText">罚款：</view>
				<view class="bigblackText" style="color:#FC3736;">¥188.00</view>
				<view class="bigblackText" style="margin-left: 40rpx;">记分：</view>
				<view class="bigblackText" style="color:#FC3736;">0</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		breakRulesPageNewQuery
	} from '../../apis/breakRules'
	export default {
		data() {
			return {
				page: 1,
				size: 10,
				list: []
			}
		},
		onLoad() {
			this.breakRulesPageNewQuery()
		},
		methods: {
			async breakRulesPageNewQuery() {
				let data = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await breakRulesPageNewQuery(data)
				if (err) return
				if (res.data.list.length == 0) {

				} else {
					this.list.push(res.data.list)
				}
				console.log(res)
			},
			lookinfo(e) {
				uni.navigateTo({
					url: './violationInfo?id=' + e
				})
			},
			//下拉刷新
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
				this.page = this.page + 1;
				//一些事件
				this.breakRulesPageNewQuery()
			},

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
