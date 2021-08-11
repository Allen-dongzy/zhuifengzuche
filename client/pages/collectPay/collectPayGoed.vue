<template>
	<view class="">
		<view class="flexbox" v-show="info.platform==1">
			<view class="titleLeft">日期</view>
			<view class="titleRight">{{info.localDate}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">平台</view>
			<view v-show="info.platform==0" class="titleRight">追风租车</view>
			<view v-show="info.platform==1" class="titleRight">其他租车OTA</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">项目</view>
			<view class="titleRight">{{info.projectName}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">车牌号</view>
			<view class="titleRight">{{info.carNumber}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">店员</view>
			<view class="titleRight">{{info.staffName}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">金额(元)</view>
			<view class="titleRight">¥{{info.money}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">付款人</view>
			<view class="titleRight">{{info.payer}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">银行卡</view>
			<view class="titleRight"> {{info.bankCardVO.cardNumber}}</view>
		</view>
		<view class="flexbox" style="border-bottom: 0rpx;">
			<view class="titleLeft">备注</view>
			<view class="titleRight">{{info.remarks}}</view>
		</view>
		 <view style="width: 90%;margin: auto;border-bottom: 2rpx solid #EFF0F3;">
		 	<image v-for="(item,index) in info.image" style="width: 160rpx;height: 160rpx;display: inline-block;margin: 10rpx;" :src="item" mode="aspectFill"></image> 
		 </view>
		<view class="garyLine"></view>
		<view class="flexbox">
			<view class="titleLeft">提交时间</view>
			<view class="titleRight">{{info.createTime}}</view>
		</view>
		<view style="width: 90%;margin: auto;border-bottom: 2rpx solid #EFF0F3;">
			<view class="otherBox">
				<view class="titleLeft">确认时间</view>
				<view class="titleRight">{{info.confirmTime}}</view>
			</view>
			<image v-for="(item,index) in info.examineImage" style="width: 160rpx;height: 160rpx;display: inline-block;margin: 10rpx;" :src="item" mode="aspectFill"></image> 
		</view>
		
		<view class="flexbox" style="border: 0rpx;">
			<view class="titleLeft">审核时间</view>
			<view class="titleRight">{{info.examineTime}}</view>
		</view>


		
	</view>
</template>

<script>
	import {
		findOneById
	} from '@/apis/receiptPayment'
	export default {
		data() {
			return {
				info:''
			}
		},
		onLoad(e) {
			console.log(e)
			console.log(JSON.parse(e.obj))
			this.id = JSON.parse(e.obj).id
			this.findOneById()
		},
		methods: {
		async findOneById() {
				const [err, res] = await findOneById(this.id)
				if (err) return
				this.info = res.data
				this.info.image = JSON.parse(res.data.image)
				this.info.examineImage=JSON.parse(res.data.examineImage)
				if(this.info.examineStatus==0){
					
				}else{ 
						this.list=this.info.examineImage
				}
			
			},
		}
	}
</script>

<style>
	.flexbox {
		display: flex;
		align-items: center;
		width: 90%;
		height: 120rpx;
		margin: auto;
		border-bottom: 2rpx solid #EFF0F3;
	}
	.otherBox{
		display: flex;
		align-items: center;
		width: 100%;
		height: 120rpx;
	
	}
	.titleLeft {
		width: 50%;
		text-align: left;
		font-size: 28rpx;
		color: #000000;
	}

	.titleRight {
		width: 50%;
		text-align: right;
		font-size: 28rpx;
		color: #999999;
	}

	.garyLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
	}
</style>
