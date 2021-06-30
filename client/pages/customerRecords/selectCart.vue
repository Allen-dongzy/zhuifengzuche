<template>
	<view class="select-cart">
		<view class="header">
			<view class="filter">
				<image class="icon" :src="`${filePath}/loudou.png`"></image>
				筛选
			</view>
			<view class="search-box">
				<image class="icon" :src="`${filePath}/fangdajing.png`"></image>
				<input type="text" v-model="keyword" placeholder="搜索" />
			</view>
		</view>
		<view class="header-mat"></view>
		<view class="list">
			<view class="card" v-for="(item, index) in 10" :key="index">
				<view class="caption">大众迈腾(渝A·5213B)</view>
				<view class="description value">自动1.4T/三厢/5座</view>
				<view class="oil-bar bar">
					<view class="title">油量</view>
					<view class="value">62%</view>
				</view>
				<view class="cart-year-bar bar">
					<view class="title">车龄</view>
					<view class="value">3年20天</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/common/js/config'

	export default {
		data() {
			return {
				filePath: config.filePath, // 文件路径
				keyword: '', // 搜索关键字
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
		background-color: #EFF0F3;
	}

	.select-cart {
		.header {
			position: fixed;
			z-index: 9;
			@include box-w(100%, #EFF0F3);
			@include flex-row(space-between);
			padding: 40rpx;

			.filter {
				@include flex-row();
				@include font-set(28rpx, #000);
				line-height: 40rpx;

				.icon {
					@include square(28rpx);
					margin-right: 10rpx;
				}
			}

			.search-box {
				@include box(536rpx, 64rpx, #fff);
				@include flex-row();
				padding: 18rpx 20rpx;
				border-radius: 8rpx;
				box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25);

				.icon {
					@include square(28rpx);
				}

				input {
					flex-grow: 1;
					margin-left: 10rpx;
				}
			}
		}

		.header-mat {
			height: 144rpx;
		}

		.list {
			padding: 0 40rpx 40rpx;

			.card {
				@include box(100%, 272rpx, #fff);
				border-radius: 20rpx;
				box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25);
				padding: 40rpx;

				&~.card {
					margin-top: 40rpx;
				}

				.value {
					@include font-set(24rpx, #999);
					line-height: 34rpx;
				}

				.caption {
					@include font-set(28rpx, #000, 500);
					@include text-one;
					line-height: 40rpx;
				}

				.description {
					margin-top: 10rpx;
					@include text-one;
					margin-bottom: 30rpx;
				}

				.bar {
					@include flex-row(space-between);

					.title {
						@include font-set(24rpx, #000);
						line-height: 34rpx;
					}
				}
			}
		}
	}
</style>
