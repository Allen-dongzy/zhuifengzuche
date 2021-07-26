<template>
	<view class="inspection-collect">
		<view class="group">
			<view class="item">
				<view class="content">
					<view class="caption">租车押金</view>
					<view class="info">￥{{info.carRentalDeposit}}</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">支付方式</view>
					<view class="info">{{info.paymentMethod==0?'全额免押':"未免押"}}
						<text v-show="info.paymentMethod==0">{{info.preAcceptanceFreeze}}</text>
						<text v-show="info.paymentMethod==1">{{info.carRentalDeposit}}</text>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">预收冻结</view>
					<view class="info">￥{{info.preAcceptanceFreeze}}</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">违章押金</view>
					<view class="info">{{info.illegalDeposit}}</view>
				</view>
			</view>
		</view>
		<view class="group">
			<view class="item">
				<view class="content">
					<view class="caption">超时费</view>
					<view class="info">{{info.overtimeFee}}</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">提前还车</view>
					<view class="info">{{info.returnTheCarEarly}}</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">违约金</view>
					<view class="info">{{info.liquidatedDamages}}</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">滞纳金</view>
					<view class="info">{{info.penalty}}</view>
				</view>
			</view>
			<view class="item">
				<view class="content">
					<view class="caption">其他费用</view>
					<view class="info">{{info.otherFee}}</view>
				</view>
			</view>

		</view>

		<view class="footer-mat"></view>
		<view class="footer">
			<view class="info">
				总计 <text class="price">￥<text class="price-big">{{allprice}}</text></text>
			</view>
			<view  class="look">查看记录</view>
		</view>



	</view>
</template>

<script>
	import config from '@/common/js/config'

	import {
		dataEcho
	} from '@/apis/vehicle.js'
	export default {
		data() {
			return {
				info:'',
				allprice:''
			}
		},
	computed: {
		all() {
			this.allprice = parseFloat(this.info.overtimeFee) + parseFloat(this.returnTheCarEarly) + parseFloat(
			this.breachContract) + parseFloat(this.delayingPayment) + parseFloat(this.otherFees)
		}
	},
		onLoad(e) {
		console.log(e.obj)
			this.id = JSON.parse(e.obj).order
			this.dataEcho()
		},
		methods: {
			async dataEcho() {

				const [err, res] = await dataEcho(this.id)
				if (err) return
				console.log(res)
				this.info = res.data
				this.breachContract = this.info.liquidatedDamages
				this.delayingPayment = this.info.penalty
				this.otherFees = this.info.otherFee
				this.returnTheCarEarly= this.info.returnTheCarEarly
			},




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
