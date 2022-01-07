<template>
	<view class="">
		<view class="add" @click="add">新增+</view>
		<view class="box" v-for="(item,index) in list" :key='index' @click="lookinfo(item)">
			<view class="flexbox">
				<view class="name">{{item.couponTitle}}</view>
				<view class="statusbox">{{item.memberName}}</view>
			</view>
			<view class="name" style="color: #FFA05B;margin: 20rpx 0px;">
				满{{item.minPoint}}减{{item.discountAmount}}元
			</view>
			<view class="flexbox">
				<view class="name" style="color:#B2B2B2;font-size: 22rpx;">{{item.openTime}} - {{item.closeTime}}</view>
				<view class="icon" v-if="item.isExpired==1">已过期</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		couponList
	} from '@/apis/marketing'

	export default {
		data() {
			return {
				list: [],
				page:1,
				size:20
			}
		},
		onLoad(e) {
			
		},
		onShow() {
			this.getlist()
			 this.page=1
			 this.size=20
			 this.list=[]
		},
		methods: {
			//获取 优惠券列表
			async getlist() {
				let data = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await couponList(data)
				if (err) return
				console.log(res)
				// this.list = res.data.list
				if (res.data.length == 0) {

				} else {
					for (let i = 0; i < res.data.length; i++) {
						this.list.push(res.data[i])

					}
				}

			},
			add() {
				uni.navigateTo({
					url: './addCoupon?type=1',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			lookinfo(e){
				uni.navigateTo({
					url: './couponInfo?id='+e.id,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.size = 10
				this.list = []
				this.getlist()
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			}, 
		}
	}
</script>

<style>
	.add {
		color: #5A7EFF;
		font-size: 26rpx;
		margin-left: 5%;
	}

	.box {
		border: 2rpx solid rgba(114, 141, 244, 0.25);
		width: 90%;
		
		border-radius: 30rpx;
		text-align: center;
		color: #000000;
		margin: 30rpx auto;
		padding: 40rpx;
	}

	.flexbox {
		display: flex;
		align-items: center;
	}

	.name {
		font-size: 30rpx;
		font-weight: 500;
		width: 80%;
		text-align: left;
	}

	.statusbox {
		font-size: 26rpx;
		font-weight: 500;
		width: 20%;
		color: #5A7EFF;
		text-align: right;
	}

	.icon {
		background-color: #D3D3D3;
		color: white;
		height: 35rpx;
		line-height: 35rpx;
		width: 16%;
		font-size: 20rpx;
		text-align: center;
		border-radius: 10rpx;
	}
</style>
