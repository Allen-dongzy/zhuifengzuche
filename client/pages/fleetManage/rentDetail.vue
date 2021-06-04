<template>
	<view class="rentDetail">
		<view class="flex sticky header">
			<i class="line-blue"></i>
			<p>租赁计划</p>
		</view>
		<view class="content">
			<view class="flex list">
				<p class="status">租赁中</p>
				<p class="text">6月3日 12:00 - 6月4日 16:00</p>
			</view>
			<view class="flex list">
				<p class="status">已预订</p>
				<p class="text">6月3日 12:00 - 6月4日 16:00</p>
			</view>
			<view class="flex list">
				<p class="status">预留</p>
				<p class="text">6月3日 12:00 - 6月4日 16:00</p>
			</view>
			<view v-for="(item, index) in 30" class="flex list">
				<p class="status">客户使用</p>
				<p class="text">6月3日 12:00 - 6月4日 16:00</p>
			</view>
			<view class="loadmore">
				<tui-loadmore v-if="false" :index="2"></tui-loadmore>
				<tui-nomore v-else text="没有更多了"></tui-nomore>
			</view>
		</view>
		<view class="flex-center fixed btn">
			<button type="default" class="flex-center submit" @click="">预留</button>
		</view>
		
		<tui-calendar :type="2"></tui-calendar>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.rentDetail {
	position: relative;

	.header {
		padding: 20rpx;
		background-color: #FFFFFF;
		
		.line-blue {
			width: 8rpx;
			height: 24rpx;
			background: #5a7eff;
			border-radius: 20rpx;
		}

		p {
			font-size: 32rpx;
			font-weight: 700;
			color: #000000;
			margin-left: 12rpx;
		}
	}
	
	.content {
		
		.list {
			padding-left: 40rpx;
			padding-right: 40rpx;
			justify-content: space-between;
			position: relative;
			height: 100rpx;
			border-top: 2rpx solid rgba(0,0,0,.04);
			
			.status {
				font-size: 35rpx;
				font-weight: 400;
				color: #000000;
			}
			
			.text {
				font-size: 30rpx;
				font-weight: 400;
				color: #b2b2b2;
			}
		}
	}
	
	.btn {
		width: 100%;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		background-color: #FFFFFF;
		position: sticky;
		bottom: 0;
		z-index: 99;
		border-top: 2rpx solid rgba(0,0,0,.04);
		
		.submit {
			width: 651rpx;
			height: 118rpx;
			background: #5a7eff;
			border-radius: 64rpx;
			font-size: 39rpx;
			font-weight: 700;
			color: #ffffff;
			letter-spacing: 10rpx;
		}
	}
}
</style>
