<template>
	<view class="load-more">
		<view v-if="status === 'noData'" class="empty">
			<image class="bg" :src="`${ossUrl}/common/res-empty.png`" mode="aspectFill"></image>
			<view class="text">{{ info }}</view>
		</view>
		<uni-load-more v-else :status="status" />
	</view>
</template>

<script>
export default {
	name: 'load-more',
	props: {
		// 数据状态
		status: {
			type: String,
			required: true
		},
		// 空提示
		info: {
			type: String,
			default: '暂无数据'
		}
	},
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

.load-more {
	.empty {
		@include flex-col();
		margin-top: 200rpx;

		.bg {
			@include box(400rpx, 252rpx);
		}

		.text {
			@include font-set(28rpx, #999);
			line-height: 40rpx;
			margin-top: 20rpx;
		}
	}
}
</style>
