<template>
	<view class="inspection-collect">
		<view class="group">
			<view class="item">
				<view class="content">
					<view class="caption">租车押金</view>
					<view class="info">￥6000</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">支付方式</view>
					<view class="info">免押￥2000，取车时支付￥2000</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">预收冻结</view>
					<view class="info">￥2000</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">违章押金</view>
					<view class="info">租押转违押</view>
				</view>
			</view>
		</view>
		<view class="group">
			<view class="item">
				<view class="content">
					<view class="caption">超时费</view>
					<view class="info">0</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">提前还车</view>
					<view class="info">0</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">违约金</view>
					<input v-show="mode===1" class="input" type="text" v-model="breachContract" placeholder="请填写违约金金额"
						placeholder-style="font-size:28rpx;color:#b2b2b2;font-weight:100;" />
					<view v-show="mode===0" class="input readonly">{{ breachContract || 'xxxxx' }}</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">滞纳金</view>
					<input v-show="mode===1" class="input" type="text" v-model="delayingPayment" placeholder="请填写滞纳金金额"
						placeholder-style="font-size:28rpx;color:#b2b2b2;font-weight:100;" />
					<view v-show="mode===0" class="input readonly">{{ delayingPayment || 'xxxxx' }}</view>
				</view>
			</view>
			<view :class="['item', {'other': otherFees}]">
				<view class="content">
					<view class="caption">其他费用</view>
					<view v-show="mode===1" class="input" @click="openOtherFeesModal">
						{{ otherFees ? '￥'+otherFees : '请填写其他费用'}} >
					</view>
					<view v-show="mode===0" class="input readonly">{{ '￥'+ (otherFees || 'xxxxx') }}</view>
				</view>
				<view class="note">{{ note }}</view>
			</view>
		</view>
		<view v-show="mode===1" class="group">
			<view class="add-record" @click="openSelModal">
				<image class="icon" :src="`${filePath}/vehicleManage/add.png`"></image>
				<text>添加记录</text>
			</view>
		</view>
		<view class="footer-mat"></view>
		<view class="footer">
			<view class="info">
				总计 <text class="price">￥<text class="price-big">188.00</text></text>
			</view>
			<view v-show="mode===0" class="look">查看记录</view>
			<view v-show="mode===1" class="btn">确认结算</view>
		</view>
		<uni-popup ref="otherFeesPopup" type="center">
			<view class="other-fees-modal">
				<view class="block">
					<view class="caption">其他费用</view>
					<input v-model="cacheOtherFees" type="text" placeholder="请输入金额"
						placeholder-style="font-size:24rpx;color:#999;font-weight:100;">
				</view>
				<view class="block">
					<view class="caption">备注</view>
					<textarea v-model="cacheNote" placeholder="请输入备注"
						placeholder-style="font-size:24rpx;color:#999;font-weight:100;" />
				</view>
				<view class="bottom">
					<view class="cancel" @click="closeOtherFeesModal">取消</view>
					<view class="confirm" @click="otherFeesModalConfirm">确定</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="selPopup" type="center">
			<view class="sel-modal">
				<view class="item" @click="selModalConfirm(index)" v-for="(item, index) in selList" :key="index">
					{{ item.text }}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import config from '@/common/js/config'
	import UniPopup from '@/components/uni-popup/uni-popup'

	export default {
		data() {
			return {
				mode: 1, // 0 不可操作 1 可操作
				filePath: config.filePath, // oss路径
				breachContract: '', // 违约金
				delayingPayment: '', // 滞纳金
				cacheOtherFees: '', // 临时其他费用
				otherFees: '', // 其他费用
				cacheNote: '', // 临时备注
				note: '', // 备注
				selList: [{
					text: '其他记录'
				}, {
					text: '事故记录'
				}]
			}
		},
		components: {
			UniPopup
		},
		methods: {
			// 打开其他费用模态框
			openOtherFeesModal() {
				this.$refs.otherFeesPopup.open()
			},
			// 关闭其他费用模态框
			closeOtherFeesModal() {
				this.$refs.otherFeesPopup.close()
			},
			// 打开选择模态框
			openSelModal() {
				this.$refs.selPopup.open()
			},
			// 关闭选择模态框
			closeSelModal() {
				this.$refs.selPopup.close()
			},
			// 选择模态框确认
			selModalConfirm(index) {
				console.log(index)
				this.closeSelModal()
			},
			// 其他费用模态框确认
			otherFeesModalConfirm() {
				this.otherFees = this.cacheOtherFees
				this.note = this.cacheNote
				this.closeOtherFeesModal()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/_mixin.scss';

	.inspection-collect {
		background-color: #EFF0F3;

		.group {
			padding: 0 32rpx;
			background-color: #fff;

			&~.group {
				margin-top: 20rpx;
			}

			.add-record {
				@include box(100%, 140rpx);
				@include flex-center;

				.icon {
					@include circle(40rpx);
					margin-right: 10rpx;
				}

				text {
					@include font-set(28rpx, #5A7EFF, 500);
				}
			}

			.item {
				@include box(100%, 120rpx);
				@include flex-col(flex-start, space-between);

				.content {
					@include square();
					@include flex-row(space-between);
				}

				&~.item {
					border-top: 1px solid #EFF0F3;
				}

				&.other {
					height: auto;
					padding: 40rpx 0;

					.input {
						justify-content: flex-end;
						background-color: #fff;
					}
				}

				.caption {
					@include font-set(28rpx, #000, 700);
				}

				.info {
					@include font-set(28rpx, #999);
				}

				.input {
					@include box(268rpx, 74rpx, #EFF0F3);
					@include flex-row();
					border-radius: 10rpx;
					@include font-set(28rpx, #B2B2B2);
					padding-left: 20rpx;

					&.readonly {
						background-color: #fff;
						justify-content: flex-end;
					}
				}

				.note {
					@include font-set(28rpx, #B2B2B2);
					word-wrap: break-word;
					line-height: 40rpx;
					margin-top: 20rpx;
				}
			}
		}

		.footer-mat {
			height: 180rpx;
			background-color: #fff;
		}

		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 9;
			@include box(100%, 180rpx, #fff);
			padding: 0 32rpx;
			@include flex-row(space-between);
			border-radius: 40rpx 40rpx 0 0;
			box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25);

			.info {
				@include font-set(28rpx, #000, 500);

				.price {
					@include font-set(16rpx, #FC3736, 700);
					margin-left: 20rpx;

					.price-big {
						@include font-set(42rpx, #FC3736, 700);
					}
				}
			}
			
			.look {
				@include box(200rpx, 96rpx);
				@include flex-row(flex-end);
				@include font-set(28rpx, #5A7EFF, 500);
			}

			.btn {
				@include box(200rpx, 96rpx, #5A7EFF);
				@include flex-center;
				@include font-set(28rpx, #fff, 500);
				border-radius: 52rpx;
			}
		}

		.other-fees-modal {
			@include box(608rpx, 562rpx, #fff);
			padding: 40rpx;

			.block {
				&~.block {
					margin-top: 40rpx;
				}

				.caption {
					@include font-set(32rpx, #000, 700);
					line-height: 44rpx;
				}

				input,
				textarea {
					margin-top: 20rpx;
					padding: 0 20rpx;
					@include font-set(24rpx, #999, 100);
					border-radius: 10rpx;
				}

				input {
					@include box(100%, 74rpx, #EFF0F3);
				}

				textarea {
					@include box(100%, 140rpx, #EFF0F3);
					padding: 20rpx;
				}
			}

			.bottom {
				@include flex-row(space-between);
				margin-top: 40rpx;

				.cancel {
					@include box(136rpx, 60rpx);
					border: 1px solid #5A7EFF;
					border-radius: 12rpx;
					@include flex-center;
					@include font-set(24rpx, #5A7EFF, 500);
				}

				.confirm {
					@include box(136rpx, 60rpx, #5A7EFF);
					border-radius: 12rpx;
					@include flex-center;
					@include font-set(24rpx, #fff, 500);
				}
			}
		}

		.sel-modal {
			@include box-w(608rpx, #fff);

			.item {
				@include box(100%, 120rpx);
				@include flex-center;
				@include font-set(28rpx, #000, 700);

				&~.item {
					border-top: 1px solid #EFF0F3;
				}
			}
		}
	}
</style>
