<template>
	<view class="free-manage">
		<view class="title-box">
			<view class="title">
				<view class="label"></view>
				张三 17623178041
			</view>
			<view class="tip">租车押金(剩余17天)</view>
		</view>
		<view class="card">
			<view class="content">
				<view class="item">
					<view class="number">5000</view>
					<view class="caption">押金(元)</view>
				</view>
				<view class="item">
					<view class="number">100</view>
					<view class="caption">已扣款(元)</view>
				</view>
			</view>
			<view class="bottom">
				<view class="btn" @click="openTransPopup">转违章押金</view>
				<view class="btn" @click="goPay">扣款</view>
				<view class="btn" @click="openUnfreezePopup">解冻</view>
			</view>
		</view>
		<uni-popup ref="trans" type="center">
			<view class="modal">
				<view class="title">押金转违章</view>
				<view class="content">您将保留2000元押金作为违章押金，其余部分解冻，是否确认转违章？</view>
				<view class="bottom">
					<view class="btn cancel" @click="closeTransPopup">取消</view>
					<view class="btn confirm" @click="confirmTrans">确定</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="unfreeze" type="center">
			<view class="modal">
				<view class="title">解冻提示</view>
				<view class="content">取消订单后，将解冻租车押金5000元，您是否继续？</view>
				<view class="bottom">
					<view class="btn cancel" @click="closeUnfreezePopup">取消</view>
					<view class="btn confirm" @click="confirmUnfreeze">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import UniPopup from '@/components/uni-popup/uni-popup'
import { throttle } from '@/utils/tools'

export default {
	components: {
		UniPopup
	},
	data() {
		return {}
	},
	onLoad() {},
	methods: {
		// 打开转违章押金弹窗
		openTransPopup() {
			this.$refs.trans.open()
		},
		// 关闭转违章押金弹窗
		closeTransPopup() {
			this.$refs.trans.close()
		},
		// 确定转违章押金
		confirmTrans: throttle(function() {
			this.closeTransPopup()
		}),
		// 打开解冻弹窗
		openUnfreezePopup() {
			this.$refs.unfreeze.open()
		},
		// 关闭解冻弹窗
		closeUnfreezePopup() {
			this.$refs.unfreeze.close()
		},
		// 确定解冻
		confirmUnfreeze: throttle(function() {
			this.closeUnfreezePopup()
		}),
		// 去支付
		goPay() {
			this.$open('/pages/home/charge')
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';
.free-manage {
	.title-box {
		@include flex-row(space-between);
		background-color: #eff0f3;
		padding: 0 32rpx;
		.title {
			@include box-h(140rpx);
			@include flex-row();
			.label {
				@include box(8rpx, 24rpx, #5a7eff);
				border-radius: 20rpx;
				margin-right: 12rpx;
			}
			@include font-set(32rpx, #000, 500);
			& > text {
				transform: translateY(-2rpx);
			}
		}
		.tip {
			@include font-set(24rpx, #5a7eff);
		}
	}
	.card {
		background-color: #fff;
		padding-top: 60rpx;
		.content {
			@include flex-row();
			.item {
				@include box-w(50%);
				@include flex-col;
				.number {
					@include font-set(48rpx, #5a7eff);
					line-height: 68rpx;
				}
				.caption {
					@include font-set(24rpx, #000);
					line-height: 34rpx;
				}
			}
		}
		.bottom {
			@include flex-center;
			padding-top: 60rpx;
			.btn {
				min-width: 150rpx;
				padding: 12rpx 14rpx;
				border-radius: 10rpx;
				border: 1px solid #5a7eff;
				@include flex-center;
				@include font-set(24rpx, #5a7eff);
				& ~ .btn {
					margin-left: 30rpx;
				}
			}
		}
	}
	.modal {
		@include box-w(608rpx, #fff);
		border-radius: 20rpx;
		padding: 40rpx;
		.title {
			@include font-set(32rpx, #000);
		}
		.content {
			margin-top: 40rpx;
			@include font-set(24rpx, #999);
			line-height: 34rpx;
		}
		.bottom {
			margin-top: 40rpx;
			@include flex-row(space-between);
			.btn {
				@include box(136rpx, 60rpx);
				border-radius: 10rpx;
				@include flex-center;
				font-size: 24rpx;
				&.cancel {
					border: 1px solid #5a7eff;
					color: #5a7eff;
				}
				&.confirm {
					background-color: #5a7eff;
					color: #fff;
				}
			}
		}
	}
}
</style>
