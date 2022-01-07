<template>
	<view>

		<view class="title">使用时间</view>
		<view class="idCard">
			<view class="flexBoxContent"
				style="background-color:#EFF0F3;margin-top: 0rpx;height: 74rpx;border-radius: 10rpx;padding: 0rpx 10rpx;">
				{{info.openTime}}———{{info.closeTime}}
			</view>
		</view>   
		<view class="title">金额</view>
		<view class="idCard">
			<view class="flexBoxContent"
				style="background-color:#EFF0F3;margin-top: 0rpx;height: 74rpx;border-radius: 10rpx;padding: 0rpx 10rpx;">
				满{{info.minPoint}}减{{info.discountAmount}}
			</view>
		</view> 
		<view class="title">已领取</view>
		<view class="idCard">
			<view class="flexBoxContent"
				style="background-color:#EFF0F3;margin-top: 0rpx;height: 74rpx;border-radius: 10rpx;padding: 0rpx 10rpx;">
				{{info.possessNum}}
			</view>
		</view> 
		<view class="title">已使用</view>
		<view class="idCard">
			<view class="flexBoxContent"
				style="background-color:#EFF0F3;margin-top: 0rpx;height: 74rpx;border-radius: 10rpx;padding: 0rpx 10rpx;">
				{{info.useNum}}
			</view>
		</view> 
		
		
		<view class="delText" @click="del()">删除优惠券</view>




		<view class="sure" @click="sure()">编辑</view>


	</view>
</template>

<script>
	import {
		queryAll
	} from '@/apis/vehicleModel'
	import {
		uploadFiles
	} from '@/apis/oss';

	import {
		couponinfo,
		couponDel
	} from '@/apis/marketing'



	export default {
		data() {
			return {
				id:'',
				info:''

			}
		},
	
		onLoad(e) {
			console.log(e)
			this.id=e.id
			this.getInfo(e.id)
		},

		methods: {
			//获取详情
			async getInfo(e) {
				const [err, res] = await couponinfo(e)
				if (err) return
				console.log(res)
				 this.info=res.data
		
			},
			//删除
			async del() {
				
				const [err, res] = await couponDel(this.id)
				if (err) return
				console.log(res)
				this.$toast('删除成功')
				uni.navigateBack({
					delta:1
				})
					
			},
			sure(e){
				uni.navigateTo({
					url: './addCoupon?id='+this.id+'&type='+2,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>
	.flexBoxContent {
		display: flex;
		align-items: center;
		
		margin-top: 30rpx;
	}

	.pickerBox {
		background-color: #EFF0F3;
		color: #999999;
		font-size: 24rpx;
		height: 74rpx;
		border-radius: 10rpx;
	}

	.selectBox {
		background-color: #EFF0F3;
		width: 70%;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		margin-left: 5%;
		color: #999999;
		font-size: 24rpx;
	}

	.pickerText {
		height: 74rpx;
		line-height: 74rpx;
		padding-left: 20rpx;
	}

	.inpBox {
		background-color: #EFF0F3;
		width: 100%;
		border-radius: 10rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 20rpx;
	}




	.title {
		color: black;
		font-size: 28rpx;
		margin-top: 40rpx;
		margin-left: 32rpx;
	}

	.idCard {
		width: 90%;
		margin: auto;
		padding-top: 20rpx;
	}

	.sure {
		background-color: #5A7EFF;
		color: white;
		font-size: 28rpx;
		text-align: center;
		height: 90rpx;
		line-height: 70rpx;
		padding: 10rpx 20rpx;
		width: 90%;
		border-radius: 50rpx;
		margin-left: 5%;
		margin-top: 100rpx;
	}
	.delText{
		text-align: center;
		width: 21%;
		margin: auto;
		margin-top: 20rpx;
		color: #FC3736;
		border-bottom: 1px solid #FC3736;
	}
</style>
