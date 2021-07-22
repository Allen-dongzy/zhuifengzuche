<template>
	<view style="padding-top: 40rpx;">
		<view class="box" ><input class="inpBox" type="text" v-model="name" placeholder="请输入您的姓名" /> </view>
		<view class="box"><input class="inpBox" type="text" v-model="phone" placeholder="请输入您的手机号" /> </view>
		<view class="box"><input class="inpBox" type="text" v-model="identityNum" placeholder="请输入您的身份证号" /> </view>
		<view class="find" @click="findOne">查询</view>
	</view>
</template>

<script>
	import {
		search
	} from "@/apis/risk.js"
	
	export default {
		data() {
			return {
				identityNum:'',
				name:'',
				phone:''
			}
		},
		methods: {
		async	findOne(){
			let data={
				name:this.name,
				phone:this.phone,
				identityNum:this.identityNum
				
			}
				const [err,res] = await search(data)
				if(err) return
				console.log(res)
				uni.navigateTo({
					url:'./finded?obj='+JSON.stringify(res.data),
					animationDuration:200,
					animationType:'pop-in'
				})
			}
		}
	}
</script>

<style>
	.box{
		height: 96rpx;
		width: 80%;
		margin: auto;
		margin-bottom: 30rpx;
		
	}
.inpBox{
	width: 100%;
	height:100%;
	background-color: #EFF0F3;
	border-radius: 10rpx;
	padding-left: 20rpx;
}
	.find{
		border: 2rpx solid #5A7EFF;
		color: #5A7EFF;
		letter-spacing: 10rpx;
		font-size: 32rpx;
		width: 80%;
		margin: auto;
		text-align: center;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 10rpx;
		margin-top: 80rpx;
	}
</style>
