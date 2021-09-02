<template>
	<view class="free-and-apply">
		<view v-if="cacheCode==0 || cacheCode==2 || cacheCode==3 || cacheCode==4|| cacheCode==6" class="top">
			<image v-if="cacheCode!==4" class="bg" :src="`${filePath}/payed.png`"></image>
			<image v-if="cacheCode==4" class="bg" :src="`${filePath}/vehicleManage/error.png`"></image>
			<view class="card">
				<view class="card-content">
					<view v-if="cacheCode==2" class="caption">已全额免押</view>
					<view v-if="cacheCode==3" class="caption">已免押</view>
					<view v-if="cacheCode==4" class="caption">免押失败</view>
					<view v-if="cacheCode==6" class="caption">已收取</view>
					<view class="show-bar">
						<text class="info">违章押金</text>
						<text class="price">￥<text class="price-nums">{{info.illegalDeposit}}</text></text>
					</view>
					<view v-if="cacheCode==0" class="show-bar">
						<text class="info">违章押金</text>
						<text class="why">租押转违押</text>
					</view>
				</view>
			</view>
		</view>

		<view v-if="cacheCode==1 || cacheCode==7" class="center">
			<!-- <image class="qr-code" v-if="cacheCode==1" src="https://img1.baidu.com/it/u=2877499757,3239316825&fm=224&fmt=auto&gp=0.jpg"
				mode="aspectFill"></image> -->
			<image class="qr-code" v-if="cacheCode==7" :src="orderStatus.qrCode" mode="aspectFill"></image>
			<view v-if="cacheCode==1" class="price">￥{{info.illegalDeposit}}</view>
			<view v-if="cacheCode==7" class="price">￥{{info.makeUpAnIllegalDeposit}}</view>
			<view v-if="cacheCode==1" class="btn">违章押金免押</view>
			<view v-if="cacheCode==7" class="btn">违章押金</view>
		</view>
		<view v-if="cacheCode==5" class="result">
			<image class="bg" :src="`${filePath}/payed.png`"></image>
			<view class="caption">收车成功！</view>
			<view class="sub-caption">请告知客户立即付款</view>
		</view>

		<view v-if="cacheCode==0" class="bottom-btn" @click="sure()">退还租押，收取违押</view>
		<view v-if="cacheCode==1" class="bottom-btn" @click="depositType">查看是否免押</view>
		<view v-if="cacheCode==2" class="bottom-btn" @click="close">关闭</view>
		<view v-if="cacheCode==3" class="bottom-btn">收取剩余押金</view>
		<view v-if="cacheCode==4" class="bottom-btn" @click="getyajing">收取押金</view>
		<view v-if="cacheCode==5" class="bottom-btn" @click="getViolation">收取违章押金</view>
		<view v-if="cacheCode==6" class="bottom-btn" @click="close">关闭</view>
		<view v-if="cacheCode==7" class="bottom-btn" @click="lookMoney">查看是否到账</view>
	</view>
</template>

<script>
	import config from '@/common/js/config'
	import {
		refund,precreate,payStatus
	} from '@/apis/pay'
	import {
		depositType
	} from '@/apis/rentalOrder'
	export default {
		data() {
			return {
				filePath: config.filePath, // oss图片路径
				cacheCode: "", // 状态 0收车成功，1违章押金，2全额免押，3以免押，4免押失败，5收车成功，6已收取，7租车押金
				info: '',
				payInfo:'',
				orderStatus:''
			}
		},
		onLoad(e) {
			console.log(e)
			this.cacheCode = e.id
			this.payInfo=JSON.parse(e.pay)
			this.info = JSON.parse(e.obj)
		},
		methods: {
			async sure() {
					const [err, res] = await refund(this.info.orderId)
					if (err) return
					setTimeout(() => {
						uni.reLaunch({
							url: '../home/home'
						})
					}, 800)
				
			},
			getViolation() {
				this.cacheCode = 1
			},
			async depositType() {
				const [err, res] = await depositType(this.info.orderId)
				if (err) return
				console.log(res)
				if(res.data==false){
					this.cacheCode=4
				}else{
					this.cacheCode=2
				}
			},
			close(){
				uni.reLaunch({
					url:'../home/home'
				})
			},
		async	getyajing(){
				// this.cacheCode=7
				
				let data={
					reflect:this.payInfo,
					orderId:this.info.orderId,
					subject: '收款',
					payway: 3,
					subPayway: 2,
					totalAmount:this.info.makeUpAnIllegalDeposit,
					// totalAmount: 0.01,
				}
				const [err,res] = await precreate(data)
				if(err) return
				this.cacheCode=7
				this.orderStatus=res.data
				console.log(res)
			},
		async	lookMoney(){
			
				const [err,res] = await payStatus(this.orderStatus.rentalOrderId)
				if(err) return
				
				if(res.data==true){
					this.cacheCode=6
				}else{
					this.$toast("暂没到账")
				}
				console.log(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/_mixin.scss';

	.free-and-apply {
		.top {
			@include flex-col(flex-start);

			.bg {
				@include box-b(400rpx, 252rpx);
				margin-top: 60rpx;
			}

			.card {
				position: relative;
				@include box(608rpx, 218rpx, #5A7EFF);
				border-radius: 20rpx;
				margin-top: 60rpx;

				.card-content {
					position: absolute;
					left: 0;
					top: 16rpx;
					@include box(608rpx, 218rpx, #fff);
					border-radius: 20rpx;
					box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25), 0 -12rpx 0 0 #5a7eff;
					padding: 0 40rpx;
					@include flex-col(center, flex-start);

					.caption {
						@include font-set(32rpx, #000000, 700);
						line-height: 44rpx;
						margin-bottom: 20rpx;
					}

					.show-bar {
						@include box(528rpx, 74rpx, #EFF0F3);
						border-radius: 10rpx;
						@include flex-row(space-between);
						padding: 0 20rpx;

						&~.show-bar {
							margin-top: 20rpx;
						}

						.info {
							@include box-w(280rpx);
							@include font-set(24rpx, #000);
							@include text-one;
						}

						.price {
							@include font-set(20rpx, #FC3736, 700);

							.price-nums {
								@include font-set(46rpx, #FC3736, 500);
							}
						}

						.why {
							@include font-set(24rpx, #999999);
						}
					}
				}
			}
		}

		.center {
			position: fixed;
			left: 50%;
			top: 40%;
			transform: translateX(-50%) translateY(-50%);
			@include flex-col();

			.qr-code {
				@include square(220rpx);
			}

			.price {
				@include font-set(44rpx, #000, 700);
				line-height: 62rpx;
				margin-top: 56rpx;
			}

			.btn {
				@include box(252rpx, 74rpx, #EFF0F3);
				border-radius: 10rpx;
				@include flex-center;
				@include font-set(24rpx, #999999, 500) margin-top: 20rpx;
			}
		}

		.result {
			position: fixed;
			left: 50%;
			top: 40%;
			transform: translateX(-50%) translateY(-50%);
			@include flex-col();

			.bg {
				@include box-b(400rpx, 252rpx);
			}

			.caption {
				@include font-set(32rpx, #000, 700);
				line-height: 44rpx;
				margin-top: 20rpx;
			}

			.sub-caption {
				@include font-set(24rpx, #000);
				line-height: 34rpx;
				margin-top: 30rpx;
			}
		}

		.bottom-btn {
			position: fixed;
			left: 50%;
			bottom: 60rpx;
			transform: translateX(-50%) translateY(-50%);
			@include box(670rpx, 96rpx, #5A7EFF);
			border-radius: 52rpx;
			@include font-set(32rpx, #fff, 700);
			@include flex-center;
		}
	}
</style>
