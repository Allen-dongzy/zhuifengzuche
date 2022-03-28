<template>
	<view class="start">
		<image class="bg" :src="$util.fileUrl('/loginbg.png')" mode="aspectFill"></image>
		<view class="container">
			<view class="fun-bar">
				<view class="contact" @click="phoneCall">
					<image class="icon" :src="$util.fileUrl('/phone@2x.png')" mode="aspectFill"></image>
					联系电话：{{ phone || '00000000000' }}
				</view>
				<view v-show="!skipKey" class="tip">{{ time }}秒后可跳过</view>
				<view v-show="skipKey" class="skip" @click="skip">跳过</view>
			</view>
			<view class="section">
				<view class="title margin-bottom">功能新增</view>
				<view class="content">{{ info }}</view>
			</view>
			<view class="section">
				<view class="title">推荐车辆</view>
				<scroll-view class="content height" scroll-y="true">
					<view class="card" v-for="(item, index) in list" :key="index">
						<image class="pic" :src="JSON.parse(item.vehicleModelFiles)[0]" mode="aspectFill"></image>
						<view class="name-box">
							<view class="name">{{ item.brandName || '' }}</view>
							<view v-if="item.monthPrice" class="price">{{ item.monthPrice || 0 }}元/月</view>
							<view v-else-if="item.price" class="price">{{ item.price || 0 }}元/天</view>
							<view v-else class="price">0元/天</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import { getAdvertise, getVehicles } from '@/apis/ad'

export default {
	data() {
		return {
			info: '',
			phone: '',
			time: 5,
			skipKey: false,
			page: 1,
			size: 10,
			list: []
		}
	},
	mounted() {
		this.getAdvertise()
	},
	methods: {
		async getAdvertise() {
			const [err, res] = await getAdvertise()
			if (err || !res?.data) return
			this.phone = res.data.tel || ''
			this.info = res.data.desc || ''
			this.getVehicles()
		},
		async getVehicles() {
			const params = {
				page: this.page,
				size: this.size
			}
			const [err, res] = await getVehicles(params)
			if (err || !res?.data?.list) return
			this.list = res.data.list
			this.countdown()
		},
		countdown() {
			const t = setInterval(() => {
				this.time--
				if (this.time === 0) {
					clearInterval(t)
					this.skipKey = true
				}
			}, 1000)
		},
		skip() {
			this.$open('/pages/home/home', 3)
		},
		phoneCall() {
			uni.makePhoneCall({
				phoneNumber: this.phone
			})
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

page {
	background-color: #5a7eff;
}

.start {
	position: relative;
	@include flex-col(flex-start);
	.bg {
		@include square(544rpx);
		display: block;
	}
	.container {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		@include box(100vw, 100vh);
		padding-top: 60rpx;
		@include flex-col(flex-start);
		.fun-bar {
			@include box-w();
			@include flex-row(space-between);
			padding: 0 50rpx;
			.contact {
				@include box(408rpx, 64rpx, #fff);
				border-radius: 50rpx;
				padding: 0 20rpx;
				@include flex-row();
				@include font-set(28rpx, #ffa05b);
				.icon {
					@include square(32rpx);
					margin-right: 20rpx;
				}
			}
			.tip {
				@include font-set(28rpx, #fff);
			}
			.skip {
				@include box(120rpx, 64rpx, transparent);
				border-radius: 50rpx;
				@include flex-row(flex-end);
				@include font-set(28rpx, #fff);
			}
		}
		.section {
			@include box-w(670rpx, #fff);
			@include flex-col(flex-start);
			padding: 40rpx 0;
			margin-top: 60rpx;
			border-radius: 20rpx;
			.title {
				&.margin-bottom {
					margin-bottom: 40rpx;
				}
				@include box(166rpx, 58rpx, #5a7eff);
				border-radius: 84rpx;
				@include flex-center;
				@include font-set(28rpx, #fff);
			}
			.content {
				@include box-w();
				@include font-set(28rpx, #000);
				@include text-both;
				line-height: 40rpx;
				padding: 0 50rpx;
				&.height {
					height: 720rpx;
				}
				.card {
					@include box-w(248rpx);
					display: inline-block;
					margin-top: 40rpx;
					&:nth-of-type(2n) {
						margin-left: 74rpx;
					}
					.pic {
						@include box(248rpx, 160rpx);
						border-radius: 4rpx;
						box-shadow: 0 0 5rpx #ddd;
						display: block;
					}
					.name-box {
						@include flex-row(space-between);
						font-size: 24rpx;
						margin-top: 6rpx;
						.name {
							color: #333;
						}
						.price {
							color: #6e8bf2;
						}
					}
				}
			}
		}
	}
}
</style>
