<template>
	<view class="">
		<view v-if="search==false" class="flexBox" style="margin-top: 20rpx;">
			<view class="point"  @click="addStaff">新增员工+</view>
			<view class="search" @click="showSearch">搜索</view>
			<image style="width:28rpx;height:28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode="aspectFill" @click="showSearch"></image>
		</view>
		 
		<view class="topNav" style="color: #8E8E93;font-size: 30rpx" v-if="search==true">
			<input@input="setSearch" v-model="searchVal" type="text" style="background-color:#EFF0F3;height: 60rpx;width: 500rpx;border-radius: 50rpx;padding-left: 20rpx;" value="" />
			<view style="margin-left: 20rpx;" @click="showSearch">取消</view>
		</view>
		<view class="flexBox" v-for="(item,index) in list"  style="height: 120rpx;border-bottom: 2rpx solid #EFF0F3;" @click="lookinfo(item)"> 
			<view style="font-size: 28rpx;color: #000000;width: 96%;">{{item.realName}}</view>
			<image style="width:16rpx;height:32rpx;" :src="$util.fileUrl('/heiyou.png')" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	
	
	import {
		debounce
	} from '@/utils/tools';
	import {
		employeelist
	} from '@/apis/admin'
	export default {
		data() {
			return {
				search:false,
				list:[],
				page:1,
				size:10,
				id:"",
				searchVal:''
			}
		},
		onLoad(e) {
			this.id= e.id
			this.employeelist()
		},
		methods: {
		 async	employeelist(){
			 let data={
				 shopId:this.id,
				 page:this.page,
				 size:this.size
			 }
			 const [err,res] = await employeelist(data)
			 if(err) return 
			 this.list=res.data.list
		 },
			showSearch(){
				if(this.search){
					this.search=false
					
				}else{
					this.search=true
					this.showStuse=false
				}
			},
			addStaff(){
				uni.navigateTo({
					url:'./addstaff?id='+this.id,
					animationDuration:200,
					animationType:'pop-in'
				}) 
			},
			lookinfo(e){
				uni.navigateTo({
					url:'./addstaffInfo?obj='+JSON.stringify(e)+'&id='+this.id,
					animationDuration:200,
					animationType:'pop-in'
				})
			},
			setSearch: debounce(async function() {
				let data = {
					page: this.page,
					shopId:this.id,
					size: this.size,
					realName: this.searchVal
				}
				const [err, res] = await employeelist(data)
				if (err) return
				console.log(res)
				 this.list=res.data.list
			
			}),
		}
	}
</script>

<style>
	.flexBox{
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
	}
	.point{
		border:2rpx solid #5A7EFF;
		height: 60rpx;
		width: 162rpx;
		font-size: 24rpx;
		line-height:60rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #5A7EFF;
	}
	.search {
		font-size: 28rpx;
		color: #000000;
		margin-left: 58%;
		margin-right: 10rpx;
	
	}
	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 28rpx;
	
	}
</style>
