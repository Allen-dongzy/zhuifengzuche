<template>
	<view class="select-address">
		<view class="search-bar">
			<view v-show="!searchKey" class="input" @click="searchKey = true">
				<image class="icon-search" :src="`${ossUrl}/common/search.png`"></image>
				<text>景点、地址寻找附件送车点</text>
			</view>
			<view v-show="searchKey" class="search-box">
				<view class="search-content">
					<image class="icon-search" :src="`${ossUrl}/common/search.png`"></image>
					<input type="text" placeholder="景点、地址寻找附件送车点" v-model="keyword">
					<image v-show="keyword" class="icon-delete" :src="`${ossUrl}/common/delete.png`"></image>
				</view>
				<view class="btn" @click="searchKey = false">取消</view>
			</view>
		</view>
		<view class="search-bar-mat"></view>
		<view v-show="!searchKey" class="classify" :style="{height: `${windowHeight - searchHeight - 5}px`}">
			<scroll-view class="class" :scroll-y="true">
				<view :class="['item', {'ac': index === acIndex}]" v-for="(item, index) in 20" :key="index"
					@click="tapClass(index)">常用送车点</view>
			</scroll-view>
			<scroll-view class="list" :scroll-y="true">
				<view class="address-item" v-for="(item, index) in 20" :key="index">
					<view class="caption">滨江路皇冠大道送车点</view>
					<view class="description">滨江路皇冠大道送车点 <view class="arrow"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="address-list">
			<view class="address-item" v-for="(item, index) in 20" :key="index">
				<view class="caption">滨江路皇冠大道送车点</view>
				<view class="description">滨江路皇冠大道送车点 <view class="arrow"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl,
				acIndex: 0, // 活动项
				searchKey: false, // 搜索开关
				searchHeight: 0, // 搜索框高度
				keyword: '' // 关键字
			}
		},
		computed: {
			// 窗口高度
			...mapState('app', ['windowHeight'])
		},
		mounted() {
			this.getSearchHeight()
		},
		methods: {
			// 获取搜索框高度
			getSearchHeight() {
				const query = uni.createSelectorQuery().in(this)
				query.select('.search-bar').boundingClientRect(data => {
					this.searchHeight = data.height
				}).exec();
			},
			// 切换分类
			tapClass(index) {
				console.log(index)
				this.acIndex = index
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.select-address {
		.search-bar {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9;
			@include box(100%, 104rpx, #fff);
			padding: 20rpx 32rpx;

			.input {
				@include box-h(64rpx, #f4f5f9);
				@include flex-center;
				border-radius: 50rpx;
				@include font-set(28rpx, rgba(0, 0, 0, .5));

				.icon-search {
					@include box(34rpx, 36rpx);
					margin-right: 10rpx;
				}
			}

			.search-box {
				@include flex-row();

				.search-content {
					@include box(602rpx, 64rpx, #EFF0F3);
					@include flex-row();
					border-radius: 126rpx;
					padding: 0 21rpx;

					.icon-search {
						@include box(34rpx, 36rpx);
					}

					input {
						@include box(500rpx, 100%);
						@include font-set(28rpx, rgba(0, 0, 0, .5));
						padding: 0 15rpx;
					}

					.icon-delete {
						@include square(28rpx);
					}
				}

				.btn {
					@include font-set(30rpx, #8E8E93, 500);
					margin-left: 24rpx;
				}
			}
		}

		.search-bar-mat {
			height: 104rpx;
		}

		.classify {
			@include box-w();
			@include flex-row(space-between);
			margin-top: 10rpx;
			padding: 0 32rpx;

			.class {
				@include box(170rpx, 100%);
				border-right: 1px solid #EFF0F3;

				.item {
					@include font-set(28rpx, #000, 700);
					line-height: 40rpx;
					margin-bottom: 50rpx;

					&.ac {
						border-right: 8rpx solid #5A7EFF;
					}
				}

				// 滚动条轨道样式
				& ::-webkit-scrollbar {
					width: 0;
					height: 0;
					background-color: transparent;
				}
			}

			.list {
				@include box(514rpx, 100%);
				padding-left: 10rpx;
				transform: translateY(-24rpx);

				// 滚动条轨道样式
				& ::-webkit-scrollbar {
					width: 0;
					height: 0;
					background-color: transparent;
				}
			}
		}
		
		.address-list {
			@include box-w();
			padding: 0 32rpx;
		}

		.address-item {
			@include box(100%, 142rpx);
			@include flex-col(center, flex-start);

			.caption {
				@include font-set(28rpx, #000, 500);
			}

			.description {
				@include flex-row();
				@include font-set(24rpx, #b2b2b2);
				line-height: 40rpx;
				margin-top: 10rpx;

				.arrow {
					@include square(14rpx);
					border: 1px solid rgba(0, 0, 0, 0.30);
					transform: rotate(45deg);
					border-bottom: 0;
					border-left: 0;
					margin-left: 10rpx;
				}
			}

			&~.address-item {
				border-top: 1px solid #EFF0F3;
				line-height: 34rpx;
			}
		}
	}
</style>
