<template>
	<view class="">
		<view class="flexBox">
			<view class="" v-for="(item,index) in list" :key="index" @click="select(index)" class="box">
				<view class="acSelect" v-if="selectIndex==index">
						{{item.name}}
					<view class="blueLine"></view>
				</view>
				<view class="Select" v-else>{{item.name}}</view>
			</view>
		</view>
		
		
		<view class="coupon-center">
			<view class="list">
				<view class="coupon" v-for="(item, index) in 10" :key="index">
					<image class="bg" v-show="type==0"  :src="`${ossUrl}/home/is-get-bg.png`"></image>
					<image class="bg" v-show="type!=0" :src="`${ossUrl}/home/no-get-bg.png`"></image>
					<view class="mask">
						<view :class="['info', {'is-get': type===0}, {'no-get': type!==0}]">
							<view class="price">￥<text>50</text></view>
							<view class="description">
								<view class="text">新用户专享</view>
								<view class="time">到期时间：2021/05/27</view>
							</view>
						</view>
						<view class="btn">
							<image class="btn-bg" v-show="type===0" :src="`${ossUrl}/home/is-get-btn.png`"></image>
							<image class="btn-bg" v-show="type!==0" :src="`${ossUrl}/home/no-get-btn.png`"></image>
							<view class="text" v-show="type==0">可使用</view>
							<view class="text" v-show="type==1"> 已使用</view>
							<view class="text" v-show="type==2"> 已过期</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				selectIndex:0,
				list:[{name:'可使用',status:0},{name:'已使用',status:1},{name:'已过期',status:2}],
				type:''
			}
		},
		onLoad() {
	
		},
		methods: {
			select(e){
				this.selectIndex=e
				this.type= this.list[e].status
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #EFF0F3;
	}
	.box{
		width: 33%;
		text-align: center;
		padding: 30rpx 0rpx;
	}
	.acSelect{
		color: #5A7EFF;
		
		font-size: 28rpx;
	}
	.Select{
		color: #999999;
		font-size: 28rpx;
	}
	.blueLine{
		height: 8rpx;
		width: 40rpx;
		background-color: #5A7EFF;
		margin: auto;
	}
	.flexBox{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	
	@import '@/static/scss/_mixin.scss';
	
	.coupon-center {
		.list {
			padding: 40rpx;
	
			.coupon {
				position: relative;
				@include box(668rpx, 196rpx);
	
				.bg {
					@include square();
				}
	
				.mask {
					position: absolute;
					left: 0;
					top: 0;
					z-index: 1;
					@include square();
					@include flex-row();
					padding-left: 50rpx;
	
					.info {
						@include box(537rpx, 100%);
						@include flex-row();
	
						&.is-get {
							@include font-gradient(180deg, #FFD26E, #FFF1C0);
						}
	
						&.no-get {
							color: #DEDEDE;
						}
	
						.price {
							font-size: 32rpx;
							font-weight: 500;
	
							text {
								font-size: 92rpx;
								line-height: 128rpx;
							}
						}
					}
	
					.description {
						margin-left: 30rpx;
	
						.text {
							font-size: 44rpx;
							line-height: 62rpx;
							font-weight: 700;
						}
	
						.time {
							font-size: 20rpx;
							font-weight: 700;
							line-height: 28rpx;
							margin-top: 6rpx;
						}
					}
	
					.btn {
						position: absolute;
						right: 32rpx;
						top: 50%;
						transform: translateY(-50%);
						@include box(72rpx, 132rpx);
	
						.btn-bg {
							@include square();
						}
	
						.text {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translateX(-50%) translateY(-50%) scaleY(0.9);
							z-index: 1;
							@include box-w(24rpx);
							@include font-set(24rpx, #fff, 500);
						}
					}
				}
	
				&~.coupon {
					margin-top: 40rpx;
				}
			}
		}
	}
</style>
