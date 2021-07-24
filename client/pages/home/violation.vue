<template>
	<view class="">
		<view class="box" v-for="(item,index) in list" @click="info(item.id)">
			<view class="flexBox">
				<view class="grayText">违法</view>
				<view class="blackText">{{item.rulesName}}</view>
			</view>
			<view class="flexBox">
				<view class="grayText">地点</view>
				<view class="blackText">{{item.rulesAddress}}</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx dashed #999999;padding-bottom: 40rpx;">
				<view class="grayText">时间</view>
				<view class="blackText">{{item.rulesTime}}</view>
			</view>
			<view class="flexBox">
				<view class="blackText" style="width: 13%;text-align: left;">罚款：</view>
				<view class="redText">¥{{item.rulesMoney}}</view>
				<view class="blackText" style="width: 15%;text-align: center;">记分:</view>
				<view class="redText">{{item.rulesScore}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {breakRulesPageNewQuery}from '@/apis/breakRules'

	export default {
		data() {
			return {
				page:1,
				size:10,
				list:[]
			}
		},
		onLoad(e) {
			console.log(e)
			this.breakRulesPageNewQuery(JSON.parse(e.obj).id)
		},
		methods: {
		async	breakRulesPageNewQuery(e){
			let data={
				orderId:e,
				page:this.page,
				size:this.size
			}
				const [err,res] = await breakRulesPageNewQuery(data)
				if(err) return
				
				if (res.data.list.length == 0) {
				
				} else {
					for (let i = 0; i < res.data.list.length; i++) {
						this.list.push(res.data.list[i])
					}
				}
				console.log(res)
			},
			info(e){
				uni.navigateTo({
					url:'./violationInfo?id='+e
				})
				
			}
		}
	}
</script>

<style>
	.box {
		width: 90%;
		border: 2rpx solid rgba(114, 141, 244, 0.25);
		margin: auto;
		margin-top: 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
		padding: 20rpx 0rpx;
	}

	.grayText {
		color: #999999;
		width: 30%;
		font-size: 28rpx;
		text-align: left;
	}

	.blackText {
		width: 70%;
		font-size: 24rpx;
		color: #000000;
		font-weight: 400;
		text-align: right;
	}

	.redText {
		font-size: 24rpx;
		color: #FC3736;
		font-weight: 400;
	}
</style>
