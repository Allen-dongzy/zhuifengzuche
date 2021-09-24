<template>
	<view class="vip">
		<view class="head-bg">
			<view class="bg">
				<view class="header" :style="{ paddingTop: `${statusBarHeight}px` }">
					<view class="back" @click="back"><view class="arrow"></view></view>
					<view class="title">会员说明</view>
					<view class="empty"></view>
				</view>
				<view class="header-mat" :style="{ paddingTop: `${statusBarHeight}px` }"></view>
				<view class="level-box">
					<image :src="`${ossUrl}/mine/v${level + 1}-big.png`" mode="aspectFill"></image>
					下一等级
					<image :src="`${ossUrl}/mine/v${level + 2}-big.png`" mode="aspectFill"></image>
				</view>
				<view class="level-text">
					<view class="level">{{ level | levelFormat }}</view>
					<view class="level">{{ (level + 1) | levelFormat }}</view>
				</view>
				<view class="level-num-box">
					<view class="level-bar"><view class="current" :style="{ width: `${percent}%` }"></view></view>
					<view class="current-text">
						<view class="current">
							当前成长值
							<view class="num">{{ current }}</view>
						</view>
						<view class="next">
							升级
							<view class="num">{{ next }}</view>
						</view>
					</view>
					<view class="hint">
						<view class="arrow"></view>
						您还差965升级，充值￥299立享9.8折优惠
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-menu" :style="{ height: `${bottomMenuHeight}px` }">
			<view class="title">
				<view class="line"></view>
				充值
			</view>
			<input type="text" v-model="price" placeholder="请填写充值金额" placeholder-class="placeholder-class" />
			<view class="title">
				<view class="line"></view>
				推荐人手机号
			</view>
			<input type="text" v-model="price" placeholder="请填写推荐人（没有可不填）" placeholder-class="placeholder-class" />
			<view class="pay">立即充值</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			level: 1, // 等级
			current: 0, // 当前值
			next: 0, // 下一等级得值
			headBgHeight: 0, // 头部背景高度
			price: null
		}
	},
	computed: {
		// app 页面高度, 屏幕高度, 手机状态高度, 页面导航栏高度
		...mapState('app', ['windowHeight', 'screenHeight', 'statusBarHeight', 'titleBarHeight']),
		// 进度条百分比
		percent() {
			return Number(this.current / this.next) * 100
		},
		// 底部面板高度
		bottomMenuHeight() {
			let height = null
			/**
			 * 微信：页面高度为导航栏以下，所以滑动区域高度为 -> 页面高度 - 搜索栏高度
			 * 支付宝：页面高度为手机状态栏以下，所以滑动区域高度为 -> 屏幕高度 - 手机状态高度 - 页面导航栏高度 - 搜索栏高度
			 */
			// #ifdef MP-WEIXIN
			height = this.windowHeight - this.headBgHeight
			// #endif
			// #ifdef MP-ALIPAY
			height = this.screenHeight - this.statusBarHeight - this.titleBarHeight - this.headBgHeight
			// #endif
			return height
		}
	},
	filters: {
		levelFormat(level) {
			const levels = ['青铜', '白银', '黄金', '铂金', '钻石']
			return levels[level]
		}
	},
	onLoad() {
		this.next = 965
		this.current = 230
		this.setSystemInfo()
	},
	mounted() {
		this.getHeadBgHeight()
	},
	methods: {
		// app 获取并设置系统信息
		...mapActions('app', ['setSystemInfo']),
		// 返回
		back() {
			this.$close()
		},
		// 获取头部背景高度
		getHeadBgHeight() {
			const query = uni.createSelectorQuery()
			query
				.select('.head-bg')
				.boundingClientRect(data => {
					this.headBgHeight = data.height
				})
				.exec()
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

page {
	background-color: #5a7eff;
}

.vip {
	.head-bg {
		@include box-w(100%, #fff);

		.bg {
			@include square(100%, linear-gradient(180deg, rgba(90, 126, 255, 0.63), #5a7eff 100%));
			padding-bottom: 38rpx;

			.header {
				position: fixed;
				left: 0;
				top: 0;
				z-index: 9;
				@include box(100%, 82rpx);
				box-sizing: content-box;
				@include flex-row(space-between);
				.back,
				.empty {
					@include square(82rpx);
					@include flex-center;
					.arrow {
						@include square(28rpx);
						border: 2px solid #fff;
						border-bottom: 0;
						border-right: 0;
						transform: rotate(-45deg);
					}
				}
				.title {
					@include box(340rpx, 100%);
					@include font-set(36rpx, #fff, 700);
					@include flex-center;
				}
			}

			.header-mat {
				@include box(100%, 82rpx);
				box-sizing: content-box;
			}

			.level-box {
				@include box-w();
				margin-top: 60rpx;
				padding: 0 40rpx;
				@include flex-row(space-between);
				& > image {
					@include square(240rpx);
					display: block;
				}
				@include font-set(28rpx, #fff, 700);
			}

			.level-text {
				@include box-w();
				padding: 0 40rpx;
				@include flex-row(space-between);
				@include font-set(48rpx, #fff, 700);
				line-height: 68rpx;

				.level {
					@include box-w(240rpx);
					@include flex-center;
				}
			}

			.level-num-box {
				@include box-w(608rpx);
				margin: 30rpx auto 0;
				.level-bar {
					@include box(100%, 24rpx, rgba(0, 0, 0, 0.14));
					border-radius: 42rpx;
					.current {
						width: 0;
						height: 100%;
						background-color: #fff;
						border-radius: 42rpx;
						transition: all 1s;
					}
				}
				.current-text {
					@include box-w();
					@include flex-row(space-between);
					@include font-set(28rpx, #fff);
					line-height: 62rpx;
					margin-top: 6rpx;

					& > view {
						@include flex-row(flex-start, baseline);
						.num {
							@include font-set(48rpx, #fff);
							line-height: 62rpx;
							margin-left: 8rpx;
						}
					}
				}

				.hint {
					position: relative;
					@include box-h(72rpx, #ffffff);
					border-radius: 16rpx;
					margin-top: 30rpx;
					padding: 0 30rpx;
					@include flex-row();
					@include font-set(28rpx, #ffa05b);
					line-height: 40rpx;

					.arrow {
						position: absolute;
						right: 24rpx;
						top: -30rpx;
						width: 0;
						height: 0;
						border-bottom: 40rpx solid #fff;
						border-left: 20rpx solid transparent;
						border-right: 20rpx solid transparent;
					}
				}
			}
		}
	}

	.bottom-menu {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
		@include box-w(100%, #fff);
		border-radius: 40rpx 40rpx 0 0;
		padding: 0 70rpx;
		.title {
			@include flex-row();
			@include font-set(32rpx, #000, 700);
			line-height: 44rpx;
			margin-top: 40rpx;
			margin-bottom: 30rpx;

			.line {
				@include box(8rpx, 24rpx, #5a7eff);
				border-radius: 20rpx;
				margin-right: 20rpx;
			}
		}
		input {
			@include box(608rpx, 74rpx, #eff0f3);
			padding: 0 20rpx;
			border-radius: 10rpx;
			@include font-set(24rpx, #333);
		}
		.placeholder-class {
			@include box(100%, 74rpx, #eff0f3);
			border-radius: 10rpx;
			@include font-set(24rpx, #999);
		}
		.pay {
			position: absolute;
			left: 50%;
			bottom: 60rpx;
			transform: translateX(-50%);
			@include box(670rpx, 96rpx, #5a7eff);
			@include flex-center;
			border-radius: 50rpx;
			@include font-set(32rpx, #fff, 700);
		}
	}
}
</style>
