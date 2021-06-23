<template>
	<view class="perfect-information">
		<image class="bg" :src="`${ossUrl}/common/res-success.png`"></image>
		<view class="info">为了您的用车安全，请先完善信息<view class="line"></view>
		</view>
		<view class="list">
			<view class="item">
				<view class="name">姓名</view>
				<input type="text" placeholder="填写姓名" placeholder-class="place-input" />
			</view>
			<view class="item">
				<view class="name">身份证号</view>
				<input type="text" placeholder="填写身份证号" placeholder-class="place-input" />
			</view>
			<view class="item">
				<view class="name">紧急联系人</view>
				<input type="text" placeholder="填写紧急联系人" placeholder-class="place-input" />
			</view>
			<view class="item">
				<view class="name">紧急联系人联系方式</view>
				<input type="text" placeholder="填写紧急联系人联系方式" placeholder-class="place-input" />
			</view>
		</view>
		<view class="btn">确&#32;定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.perfect-information {
		padding: 40rpx;
		@include flex-col(flex-start);

		.bg {
			@include box(400rpx, 252rpx);
			margin-top: 30rpx;
		}

		.info {
			position: relative;
			@include font-set(32rpx, #000);
			line-height: 44rpx;
			margin-top: 40rpx;

			.line {
				position: absolute;
				right: 0;
				bottom: 0;
				@include box(124rpx, 8rpx, #5A7EFF);
			}
		}

		.list {
			margin-top: 60rpx;

			.item {
				@include box(670rpx, 118rpx);
				@include flex-row(space-between);

				border-bottom: 1px solid #EFF0F3;

				.name {
					@include font-set(28rpx, #000, 500);
				}

				input {
					@include box(320rpx, 40rpx);
					@include font-set(28rpx, #999);
					text-align: right;

					&.place-input {
						@include font-set(28rpx, #666);
						text-align: right;
					}
				}
			}
		}

		.btn {
			position: absolute;
			bottom: 60rpx;
			left: 50%;
			transform: translateX(-50%);
			@include box(670rpx, 96rpx, #5A7EFF);
			@include flex-center;
			@include font-set(32rpx, #fff, 700);
			border-radius: 52rpx;
		}
	}
</style>
