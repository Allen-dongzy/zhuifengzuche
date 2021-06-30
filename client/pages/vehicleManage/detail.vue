<template>
	<view class="detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in obj.vehicleModelFiles" :key="index">
				<image
					:src="item"
					mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info">
			<view class="caption">{{obj.brandName}}{{obj.categoryName}}</view>
			<view class="description">{{obj.brandName}}/{{obj.gears}}/{{obj.capacity}}/{{obj.outputVolumeName}}/{{obj.model}}</view>
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
				<view class="nums">
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
					<view class="caption">押金</view>
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
				<view class="nums mini">
					<text>修改</text>
				</view>
			</view>
			<uni-calendar class="aaa" :insert="true" :lunar="true" :start-date="'2019-3-2'" :end-date="'2019-5-20'"
				@change="change"></uni-calendar>
			<view class="btn" @click="eidt" >编辑</view>
		</view>
	</view>
</template>

<script>
	import config from '@/common/js/config'
	
	import {
		searchCarid
	} from '@/apis/vehicleModel'

	export default {
		data() {
			return {
				filePath: config.filePath,
				obj:{},
				id:''
			}
		},
		onLoad(e) {
			console.log(e)
			this.id=e.id
			this.searchCarid(e.id)
		},
		methods: {
			async  searchCarid(e){
				const [err,res] = await searchCarid(e)
				if(err) true
				res.data.vehicleModelFiles = JSON.parse(res.data.vehicleModelFiles)
				res.data.labels = JSON.parse(res.data.labels)
				this.obj=res.data
			},
			eidt(){
				uni.navigateTo({
					url:"./add?id="+this.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
				margin: 60rpx auto;
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
</style>
