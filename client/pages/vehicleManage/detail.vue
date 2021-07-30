<template>
	<view class="detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in obj.vehicleModelFiles" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info">
			<view class="caption">{{obj.brandName}}{{obj.categoryName}}</view>
			<view class="description">
				{{obj.brandName}}/{{obj.gears}}/{{obj.capacity}}座/{{obj.outputVolumeName}}/{{obj.model}}</view>
			<view class="label-box">
				<view class="label">{{obj.categoryName}}</view>
				<view class="" v-for="(item,index) in obj.labels" style="margin: 0rpx 10rpx;">
					<view class="label add-label">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="vehicle-nums">
			<view class="header">
				<view class="caption">
					<view class="label"></view>
					<text>车辆数量</text>
				</view>
				<view class="nums" @click="lookMore">
					<text>{{obj.vehicleNumber}}</text>
					<image class="arrow" :src="`${filePath}/vehicleManage/right.png`"></image>
				</view>
			</view>
			<view class="list">
				<view class="item" style="border-bottom: 0rpx;">
					<view class="caption">费用</view>
					<!-- 	<view class="price">￥1000</view> -->
				</view>
				<view class="item">
					<view class="caption">租车押金</view>
					<view class="price">￥{{obj.rentalMoney}}</view>
				</view>
				<view class="item">
					<view class="caption">基本保障费</view>
					<view class="price">￥{{obj.protectionMoney}}</view>
				</view>
				<view class="item">
					<view class="caption">违章押金</view>
					<view class="price">￥{{obj.breakRulesMoney}}</view>
				</view>
			</view>
		</view>
		<view class="rental">
			<view class="header">
				<view class="caption mini">
					<text>租金</text>
				</view>
				<view class="nums mini" @click="openOtherFeesModal">
					<text>修改</text>
				</view>
			</view>
			<uni-calendar :insert="true" :showMonth="false" :customRange="customRange" :start-date="startDate"
				:end-date="endDate" :selected="selectedList" @change="change">
			</uni-calendar>

			<view class="btn" @click="eidt">编辑</view>
		</view>

		<uni-popup ref="otherFeesPopup" type="center">
			<view class="other-fees-modal">
				<view class="block">
					<view class="caption">修改租金</view>
					<input v-model="money" type="text" placeholder="请输入金额"
						placeholder-style="font-size:24rpx;color:#999;font-weight:100;">
				</view>
				<view class="bottom">
					<view class="cancel" @click="closeOtherFeesModal">取消</view>
					<view class="confirm" @click="otherFeesModalConfirm">确定</view>
				</view>
			</view>
		</uni-popup>



	</view>
</template>

<script>
	import config from '@/common/js/config'

	import {
		searchCarid,
		vehicleModelPrice
	} from '@/apis/vehicleModel'

	export default {
		data() {
			return {
				filePath: config.filePath,
				obj: {},
				id: '',//车型id
				startDate: '',
				endDate: '',
				customRange: [],
				selectedList: [],
				money: '',
				selectDay:''
			}
		},
		onLoad(e) {
			console.log(e)
			this.id = e.id

		},
		onShow() {
			this.searchCarid(this.id)
		},
		methods: {
			change(e) {
				console.log(e)
				this.selectDay=e.extraInfo
			},
			// 获取价格日历
			vehicleQueryVehicleModelRentList() {
				this.startDate = this.obj.rentLists[0].rentalTime.split(' ')[0]
				this.endDate = this.obj.rentLists[this.obj.rentLists.length - 1].rentalTime.split(' ')[0]
				console.log(this.obj.rentLists)
				this.obj.rentLists.forEach(item => {
					item.date = item.rentalTime.split(' ')[0]
					item.info = `￥${item.rentalMoney}`
				})
				console.log(this.obj.rentLists)
				this.selectedList = this.obj.rentLists
			},

			// 其他费用模态框确认
			async otherFeesModalConfirm() {
				this.$refs.otherFeesPopup.close()
				let data = {
					id:this.selectDay.id,
					memberShopId:this.obj.memberShopId,
					modelId:this.id,
					rentalMoney:this.money,
					rentalTime:this.selectDay.rentalTime,
				}
				const [err, res] = await vehicleModelPrice(data)
				if (err) return
				this.$toast('修改成功')
				this.searchCarid(this.id)
			},
			// 打开其他费用模态框
			openOtherFeesModal() {
				this.$refs.otherFeesPopup.open()
			},
			// 关闭其他费用模态框
			closeOtherFeesModal() {
				this.$refs.otherFeesPopup.close()
			},
			async searchCarid(e) {
				const [err, res] = await searchCarid(e)
				if (err) true
				res.data.vehicleModelFiles = JSON.parse(res.data.vehicleModelFiles)
				res.data.labels = JSON.parse(res.data.labels)
				this.obj = res.data
				this.vehicleQueryVehicleModelRentList()
			},
			eidt() {
				uni.navigateTo({
					url: "./add?id=" + this.id
				})
			},
			lookMore() {
				uni.navigateTo({
					url: '../fleetManage/fleetManageSearch?id=' + this.obj.id
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.detail {
		background: #EFF0F3;

		swiper {
			@include box(100%, 392rpx);

			swiper-item {
				&>image {
					@include box(100%, 392rpx);
				}
			}
		}

		.goods-info {
			@include box-w(100%, #fff);
			padding: 40rpx 32rpx;

			.caption {
				@include font-set(32rpx, #000, 700);
				@include text-one;
				line-height: 44rpx;
			}

			.description {
				@include font-set(24rpx, #B2B2B2);
				@include text-one;
				line-height: 34rpx;
				margin-top: 10rpx;
			}

			.label-box {
				margin-top: 20rpx;
				@include flex-row();

				.label {
					padding: 6rpx 16rpx;
					background-color: #EFF3FF;
					@include font-set(16rpx, #5A7EFF, 700);

					&.add-label {
						background-color: #EFF3FF;
						color: #999999;
					}

					&:not(:first-of-type) {
						margin-left: 20rpx;
					}
				}
			}
		}

		.vehicle-nums,
		.rental {
			margin-top: 20rpx;
			@include box-w(100%, #fff);
			padding: 40rpx 12rpx 0;

			.header {
				@include flex-row(space-between);

				.caption {
					@include flex-row();

					&.mini {
						text {
							font-size: 28rpx;
						}
					}

					.label {
						@include box(8rpx, 24rpx, #5A7EFF);
						border-radius: 20rpx;
					}

					text {
						@include font-set(32rpx, #000, 700);
						margin-left: 12rpx;
					}
				}

				.nums {
					@include flex-row();

					&.mini {
						text {
							font-size: 28rpx;
							margin-right: 20rpx;
						}
					}

					text {
						@include font-set(32rpx, #5A7EFF, 700);
					}

					.arrow {
						@include box(19rpx, 19rpx);
						margin-left: 12rpx;
						margin-right: 20rpx;
					}
				}
			}

			.aaa {
				width: 100%;
				height: 500rpx;
			}

			.btn {
				@include box(670rpx, 96rpx, #5A7EFF);
				@include font-set(32rpx, #fff, 700);
				@include flex-center;
				border-radius: 52rpx;
				letter-spacing: 20rpx;
				margin: 60rpx auto 120rpx auto;
			}
		}

		.item {
			@include box(100%, 118rpx);
			padding: 0 20rpx;
			@include flex-row(space-between);

			.caption {
				@include font-set(28rpx, #000, 700);
			}

			.price {
				@include font-set(28rpx, #999);
			}

			&:first-of-type {
				margin-top: 20rpx;
			}

			&~.item {
				border-top: 1px solid #eff0f3;
			}
		}
	}

	.other-fees-modal {
		@include box(608rpx, 362rpx, #fff);
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

	.uni-calendar__content {
		background-color: #fff !important;
	}

	.uni-calendar-item--disable {
		background-color: transparent !important;
	}

	.uni-calendar {
		width: 700rpx;
		margin: 0 auto;
		margin-top: 40rpx;
	}

	.uni-calendar__header-btn-box {
		.uni-calendar__header-btn {
			border-left-color: #999;
			border-top-color: #999;
		}
	}

	.uni-calendar__backtoday {
		display: none !important;
	}

	.uni-calendar-item__weeks-box-circle {
		background-color: transparent !important;
	}

	.uni-calendar-item__weeks-lunar-text.uni-calendar-item--extra {
		color: #5A7EFF !important;
		opacity: 1 !important;
	}

	.uni-calendar-item--checked {
		background-color: transparent !important;
		opacity: 1 !important;
	}

	.uni-calendar-item__weeks-box-item {
		.uni-calendar-item--isDay-text {
			color: #333;
		}
	}

	.uni-calendar-item--isDay {
		background-color: transparent !important;
		opacity: 1 !important;

		.uni-calendar-item--isDay-text {
			color: #fff;
		}
	}

	.uni-calendar-item__weeks-box-text.uni-calendar-item--isDay-text.uni-calendar-item--isDay,
	.uni-calendar-item__weeks-box-text.uni-calendar-item--checked {
		padding: 2rpx 16rpx !important;
		border-radius: 33rpx !important;
		background-color: #5A7EFF !important;
		opacity: 1 !important;
	}

	.uni-calendar-item--before-checked,
	.uni-calendar-item--multiple {
		background-color: transparent !important;
		opacity: 1 !important;
	}

	.uni-calendar-item__weeks-box-text.uni-calendar-item--before-checked.uni-calendar-item--multiple,
	.uni-calendar-item__weeks-box-text.uni-calendar-item--multiple {
		padding: 2rpx 16rpx !important;
		border-radius: 33rpx !important;
		background-color: #5A7EFF !important;
		opacity: 1 !important;
	}
</style>
