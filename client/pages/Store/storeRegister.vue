<template>
	<view class="store-register">
		<view class="head">
			<view class="toast">*长按文本可复制</view>
			<view class="item">门店名称: <text>这里是门店名称</text></view>
			<view class="item">注册手机号: <text>15823659632</text></view>
			<view class="item">联系人: <text>张全蛋</text></view>
			<view class="item">联系人身份证号: <text>500101569842365963</text></view>
			<view class="item">联系人电话: <text>023-63256314</text></view>
		</view>
		<view class="pic-panel">
			<view class="item">
				<view class="caption">营业执照</view>
				<view class="pic-box">
					<image class="pic-big"
						src="https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/cache-upload-image.png"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">法人身份证照片</view>
				<view class="pic-box">
					<image class="pic-big"
						src="https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/cache-upload-image.png"
						mode="aspectFill"></image>
					<image class="pic-big"
						src="https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/cache-upload-image.png"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">门店图片-门头照片</view>
				<view class="pic-box">
					<image class="pic"
						src="https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/cache-upload-image.png"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">门店图片-店内照片</view>
				<view class="pic-box">
					<image class="pic"
						src="https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/cache-upload-image.png"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">门店图片-店铺室外照片</view>
				<view class="pic-box">
					<image class="pic"
						src="https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/cache-upload-image.png"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">对公账户开户许可证</view>
				<view class="pic-box">
					<image class="pic"
						src="https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/cache-upload-image.png"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="bottom">
				<view class="caption">收钱吧注册</view>
				<view class="register-info" @click="showModal">{{ showText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		showModal
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				showText: '未注册'
			}
		},
		methods: {
			// 显示模态框
			async showModal() {
				const [err, res] = await showModal({
					content: '是否将状态改为已注册？',
					confirmText: '是',
					cancelText: '否'
				})
				if (err || res !== 'confirm') return
				this.showText = '已注册'
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
		background-color: #EFF0F3;
	}

	.store-register {
		.head {
			@include box-w(100%, #fff);
			padding: 40rpx 32rpx;

			.toast {
				@include font-set(20rpx, #FFA05B, 700);
				line-height: 28rpx;
			}

			.item {
				@include flex-row();
				@include font-set(28rpx, #000, 700);
				line-height: 40rpx;
				margin-top: 40rpx;

				text {
					font-weight: 400;
					margin-left: 10rpx;
				}
			}
		}

		.pic-panel {
			@include box-w(100%, #fff);
			padding: 1rpx 34rpx 40rpx;
			margin-top: 20rpx;

			.item {
				margin-top: 39rpx;

				.caption {
					@include font-set(28rpx, #000, 700);
					line-height: 40rpx;
				}

				.pic-box {
					@include flex-row();
					margin-top: 20rpx;

					.pic {
						@include square(160rpx);
						border: 1px solid #ddd;
						border-radius: 10rpx;
					}

					.pic-big {
						@include box(330rpx, 186rpx);
						border-radius: 10rpx;
						border: 1px solid #ddd;

						&~.pic-big {
							margin-left: 26rpx;
						}
					}
				}
			}

			.bottom {
				@include flex-row(space-between);

				.caption {
					@include font-set(28rpx, #000, 700);
					line-height: 40rpx;
				}

				.register-info {
					@include font-set(28rpx, #5A7EFF, 700);
					line-height: 40rpx;
				}

				margin-top: 40rpx;
			}
		}
	}
</style>
