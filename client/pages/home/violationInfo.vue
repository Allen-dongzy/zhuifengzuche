<template>
	<view class="">
		<view class="box">
			<view class="flexBox">
				<view class="blackText">违法：</view>
				<view class="grayText">{{info.rulesName}}</view>
			</view>
			<view class="flexBox">
				<view class="blackText">地点：</view>
				<view class="grayText">{{info.rulesName}}</view>
			</view>
			<view class="flexBox">
				<view class="blackText">时间：</view>
				<view class="grayText">{{info.rulesTime}}</view>
			</view>
			<view class="flexBox">
				<view class="blackText">采集机关：</view>
				<view class="grayText">{{info.gatherOffice}}</view>
			</view>
			</view>
		    <view class="grayLine"></view>
			<view class="box">
				<view class="flexBox" style="margi:0rpx;padding:40rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">
					<view class="blackText">单据单号</view>
					<view class="grayText">{{info.rulesNo}}</view>
				</view>
				<view class="flexBox" style="margi:0rpx;padding:40rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">
					<view class="blackText">单据照片</view>
					<image style="width:200rpx;height: 120rpx;margin-left: 43%;" :src="info.rulesUrls" mode=""></image>
				</view>
				<view  style="margi:0rpx;padding:40rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">
					<view class="blackText">备注信息</view>
					<view class="grayText" style="text-align: left;">{{info.remarks}}</view>
				</view>
			</view>
			<view class="flexBox" style="width: 90%;margin: auto;margin-top: 20vh;">
				<view class="blackText" style="width: 13%;text-align: left;margin-left: 50%;">罚款：</view>
				<view class="redText">¥{{info.rulesMoney}}</view>
				<view class="blackText" style="width: 15%;text-align: center;">记分:</view>
				<view class="redText">{{info.rulesScore}}</view>
			</view>
			
		<button  style=" color: white;
				width: 90%;
						margin: 20rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" @click="next()">编辑</button>
	</view>
</template>

<script>
	import {breakRulesFindOneById}from '@/apis/breakRules'
	export default {
		data() {
			return {
				info:'',
				id:''
			}
		},
		onLoad(e) {
			this.id=e.id
		},
		onShow() {
			this.breakRulesFindOneById(this.id)
		},
		methods: {
			async breakRulesFindOneById(e){
				const [err,res]= await breakRulesFindOneById(e)
				if(err) return
				console.log(res)
				this.info=res.data
				this.info.rulesUrls=JSON.parse(res.data.rulesUrls)
			},
			next(){
				uni.navigateTo({
					url:'./violationAdd?type=2&obj='+JSON.stringify(this.info)
				})
			}
		}
	}
</script>

<style>
	.box{
		width: 90%;
		margin: auto;
	}
	.flexBox{
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
	.grayText {
		color: #999999;
		width: 70%;
		font-size: 24rpx;
		text-align: right;
	}

	.blackText {
		width: 30%;
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
		text-align: left;
	}
	.grayLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 30rpx;
	}
	.redText {
		font-size: 24rpx;
		color: #FC3736;
		font-weight: 400;
	}
</style>
