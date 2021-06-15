<template>
	<view class="manage">
		<view class="home-bar" v-show="!searchMode">
			<view class="add-label" @tap="goAdd">
				新增+
			</view>
			<view class="function-box">
				<view class="sel-box" @tap="showModal" data-target="DrawerModalR">
					<text>筛选</text>
					<image :src="`${filePath}/vehicleManage/down.png`"></image>
				</view>
				<view class="search-box" @tap="tapHeader">
					<text>搜索</text>
					<image :src="`${filePath}/vehicleManage/search.png`"></image>
				</view>
			</view>
		</view>
		<view class="search-bar" v-show="searchMode">
			<view class="serach-box">
				<image class="search-icon" :src="`${filePath}/vehicleManage/search-big.png`"></image>
				<input type="text" placeholder="请输入车型" placeholder-class="input">
				<image class="clear" :src="`${filePath}/vehicleManage/clear.png`"></image>
			</view>
			<view class="cancel" @tap="tapHeader">取消</view>
		</view>
		<view class="header-mat"></view>
		<view class="manage-list">
			<view class="manage-item" v-for="(item, index) in 10" :key="index" @tap="goDetail(index)">奥迪A4L 2021年型
			</view>
		</view>
		<view class="cu-modal drawer-modal justify-end" catchtouchmove='true'
			:class="(modalName=='DrawerModalR'?'show':'')" @click="hideModal">
			<view class="cu-dialog basis-lg" @click.stop="">
				<view class="flex status">
					<i></i>
					<p>状态</p>
				</view>
				<view class="flex flex-wrap statusList">
					<i class="flex-center">全部</i>
					<i class="flex-center blue-i">正常</i>
					<i class="flex-center">异常</i>
					<i class="flex-center">租赁中</i>
					<i class="flex-center">预留中</i>
				</view>
				<view class="flex status">
					<i></i>
					<p>类别</p>
				</view>
				<view class="flex flex-wrap statusList">
					<i class="flex-center">全部</i>
					<i class="flex-center blue-i">豪华</i>
					<i class="flex-center">奢华</i>
					<i class="flex-center">中等</i>
				</view>
				<view class="flex status">
					<i></i>
					<p>品牌</p>
				</view>
				<view class="flex flex-wrap statusList">
					<i class="flex-center blue-i">玛莎拉蒂-总裁</i>
					<i v-for="(item, index) in 50" :key="index" class="flex-center">宝马</i>
				</view>
				<view class="flex btn">
					<button type="default" class="flex-center reset">清空</button>
					<button type="default" class="flex-center submit">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		open
	} from '@/utils/uni-tools.js'
	import config from '@/common/js/config'

	export default {
		data() {
			return {
				filePath: config.filePath,
				searchMode: false, // 是否为搜索模式
				modalName: '', // 模态框名称
			}
		},
		methods: {
			// 切换头部
			tapHeader() {
				this.searchMode = !this.searchMode
			},
			// 去添加
			goAdd() {
				open('/pages/vehicleManage/add')
			},
			// 前往详情
			goDetail(index) {
				open('/pages/vehicleManage/detail')
			},
			// 显示筛选框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 隐藏筛选框
			hideModal(e) {
				this.modalName = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/_mixin.scss';

	.manage {

		.home-bar,
		.search-bar {
			position: fixed;
			@include box(100%, 90rpx);
			@include flex-row(space-between);
			padding: 0 32rpx;

			.add-label {
				@include box(172rpx, 48rpx);
				border-radius: 12rpx;
				border: 1px solid #5a7eff;
				@include flex-center;
				@include font-set(24rpx, #5A7EFF);
			}

			.function-box {
				@include flex-row(flex-end);
				@include box-h();

				&>view {
					margin-left: 30rpx;
					@include flex-row();
					@include box-h();
				}

				text {
					@include font-set(28rpx, #000);
				}

				image {
					@include square(28rpx);
					margin-left: 10rpx;
				}
			}

			.serach-box {
				@include box(602rpx, 64rpx, #E6E6EA);
				border-radius: 126rpx;
				@include flex-row(space-between);
				padding: 0 22rpx;

				.search-icon {
					@include square(40rpx);
				}

				input {
					flex-grow: 1;
					padding-left: 10rpx;
					padding-right: 10rpx;
					@include font-set(28rpx, #b2b2b2);
				}

				/deep/ .input {
					@include font-set(28rpx, #b2b2b2);
				}

				.clear {
					@include square(32rpx);
				}
			}

			.cancel {
				@include font-set(30rpx, #8E8E93, 500);
			}
		}

		.header-mat {
			height: 90rpx;
		}

		.manage-list {
			@include box-w(100%);
			padding: 0 32rpx;

			.manage-item {
				@include box-h(118rpx);
				@include font-set(28rpx, #000);
				@include flex-row();

				&~.manage-item {
					border-top: 1px solid #EFF0F3;
				}
			}
		}

		/**
		 * 解决抽屉样式冲突
		 */
		/deep/ .cu-modal,
		.drawer-modal {
			display: flex !important;
		}

		/**
		 * 设置抽屉背景颜色
		 */
		/deep/ .cu-dialog {
			background-color: #FFFFFF;
			overflow: auto;
		}

		.cu-modal {

			.status {
				margin-top: 40rpx;
				padding-left: 40rpx;
				padding-right: 40rpx;

				i {
					width: 8rpx;
					height: 24rpx;
					background: #5a7eff;
					border-radius: 20rpx;
				}

				p {
					font-size: 32rpx;
					font-weight: 700;
					color: #000000;
					letter-spacing: 0rpx;
					margin-left: 10rpx;
				}
			}

			.statusList {
				padding-left: 40rpx;
				margin-top: 40rpx;
				justify-content: flex-start;

				i {
					min-width: 112rpx;
					height: 52rpx;
					background: #eff0f3;
					border-radius: 128rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #b2b2b2;
					letter-spacing: 0rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					padding-left: 20rpx;
					padding-right: 20rpx;
				}

				i:first-child {
					margin-left: 0;
				}

				.blue-i {
					background: #5A7EFF;
					color: #FFFFFF;
				}
			}

			.btn {
				justify-content: space-between;
				padding-left: 40rpx;
				padding-right: 40rpx;
				width: 100%;
				height: 150rpx;
				position: sticky;
				bottom: 0;
				background-color: #FFFFFF;
				border-top: 1rpx solid rgba(0, 0, 0, .2);

				.reset {
					width: 160rpx;
					height: 80rpx;
					background: none;
					border: 2rpx solid #b2b2b2;
					border-radius: 52rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #b2b2b2;
				}

				.submit {
					width: 160rpx;
					height: 80rpx;
					background: #5a7eff;
					border-radius: 52rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #ffffff;
				}
			}
		}
	}
</style>
