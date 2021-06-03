<template>
	<view class="fleetManage">
		<view class="flex sticky header">
			<view class="flex">
				<button type="default" class="flex-center btn">新增+</button>
				<button type="default" class="flex-center btn rentBtn">租赁计划</button>
			</view>
			<view class="flex">
				<view class="flex screen" @click="showModal" data-target="DrawerModalR">
					<p>筛选</p>
					<text class="cuIcon-unfold"></text>
				</view>
				<view class="flex search">
					<p>搜索</p>
					<text class="cuIcon-search"></text>
				</view>
			</view>
		</view>
		<view class="flex-center flex-wrap content">
			<view v-for="(item, index) in 10" :key="index" class="panel">
				<view class="flex titlePanel">
					<p class="title">渝A·5231B</p>
					<p class="type">租赁中</p>
				</view>
				<p class="text">大众 捷达丨自动 5座 2.0L</p>
				<view class="flex detail">
					<p class="oil">油量：62%</p>
					<p class="car">车辆：3年20天</p>
				</view>
				<view class="flex-center line">
					<i></i>
				</view>
				<p class="name">使用人：张全蛋</p>
				<view class="flex timeText">
					<text class="cuIcon-countdown"></text>
					<p>05-25 14:48 至 05-30 14:48</p>
				</view>
			</view>
			<view class="loadmore">
				<tui-loadmore v-if="false" :index="2"></tui-loadmore>
				<tui-nomore v-else text="没有更多了"></tui-nomore>
			</view>
		</view>
		
		<view class="cu-modal drawer-modal justify-end" catchtouchmove='true' :class="(modalName=='DrawerModalR'?'show':'')" @click="hideModal">
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
					<i v-for="(item, index) in 50" class="flex-center">宝马</i>
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
	export default {
		data() {
			return {
				modalName: ''
			}
		},
		methods: {
			/**
			 * 显示筛选框
			 * @param {Object} e
			 */
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			/**
			 * 隐藏筛选框
			 * @param {Object} e
			 */
			hideModal(e) {
				this.modalName = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fleetManage {
		position: relative;
		
		/**
		 * 解决抽屉样式冲突
		 */
		/deep/ .cu-modal, .drawer-modal {
			display: flex !important;
		}
		
		/**
		 * 设置抽屉背景颜色
		 */
		/deep/ .cu-dialog {
			background-color: #FFFFFF;
			overflow: auto;
		}
		
		.header {
			padding-top: 22rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
			padding-bottom: 40rpx;
			justify-content: space-between;
			background-color: #FFFFFF;
			
			.btn {
				width: 172rpx;
				height: 48rpx;
				border: 2rpx solid #5a7eff;
				border-radius: 12rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #5a7eff;
				background: none;
			}
			
			.rentBtn {
				margin-left: 10rpx;
			}
			
			.screen, .search {
				
				p {
					font-size: 28rpx;
					font-weight: 400;
					color: #000000;
				}
				
				text {
					font-size: 28rpx;
					margin-left: 10rpx;
					margin-top: 6rpx;
				}
			}
			
			.search {
				margin-left: 32rpx;
			}
		}
		
		.content {
			
			.panel {
				width: 670rpx;
				min-height: 220rpx;
				border-radius: 20rpx;
				box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(114,141,244,0.25);
				padding: 40rpx;
				margin-bottom: 30rpx;
				
				.titlePanel {
					justify-content: space-between;
					
					.title {
						font-size: 28rpx;
						font-weight: 700;
						color: #000000;
					}
					
					.type {
						font-size: 28rpx;
						font-weight: 700;
						color: #5a7eff;
						letter-spacing: 0rpx;
					}
				}
				
				.text {
					margin-top: 12rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
				}
				
				.detail {
					margin-top: 20rpx;
					
					.oil {
						font-size: 24rpx;
						font-weight: 400;
						color: #000000;
						letter-spacing: 0rpx;
					}
					
					.car {
						font-size: 24rpx;
						font-weight: 400;
						color: #000000;
						letter-spacing: 0rpx;
						margin-left: 60rpx;
					}
				}
				
				.line {
					width: 100%;
					margin-top: 30rpx;
					
					i {
						width: 590rpx;
						border-bottom: 1rpx dashed #999999;
					}
				}
				
				.name {
					margin-top: 30rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #000000;
					letter-spacing: 0rpx;
				}
				
				.timeText {
					margin-top: 10rpx;
					
					.cuIcon-countdown {
						font-size: 30rpx;
					}
					
					p {
						margin-left: 10rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #000000;
						letter-spacing: 0rpx;
					}
				}
			}
			
			.panel:first-child {
				margin-top: 10rpx;
			}
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
				border-top: 1rpx solid rgba(0,0,0,.2);
				
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
