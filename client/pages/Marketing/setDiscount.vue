<template>
	<view>

		<view class="title">优惠价</view>
		<view class="idCard">
			<input class="inpBox" v-model="price" type="number" value="" placeholder="请填写优惠价" />
			<view style="width: 8%;text-align: center;	height: 74rpx;line-height: 74rpx;">元</view>
		</view>

		
		<view class="title">优惠时间</view>
		<view class="flexBoxContent">
			<view style="width: 40%;">
				<picker mode="date" @change="selectTime" :value="startTime" :start="startDate"
					:end="currentdate" class="pickerBox">
				
					<view class="pickerText">{{startTime==""?'请选择':startTime}}</view>
				</picker>
			</view>

			<view style="width: 40%;margin-left: 10%;">
				<picker mode="date" @change="selectendTime" :value="endTime" :start="startDate"
					:end="currentdate" class="pickerBox">
			
					<view  class="pickerText">{{endTime==""?'请选择':endTime}}</view>
				</picker>
			</view>
		</view>
		<view class="youhuibox">
			<view class="title" style="margin-top: 0px;">状态:</view>
			<switch style="margin-left: 10%;"  :checked="status" @change="switch1Change" /> 
		</view>
		<view style="display: flex;justify-content:center;align-items: center;margin: 180rpx 0rpx;">
			<view
				style="background-color: #5A7EFF;color: white;font-size: 28rpx;text-align: center;height: 90rpx;line-height: 70rpx;padding: 10rpx 20rpx;width:40%;border-radius:50rpx;margin-left: 5%;"
				@click="sure()">确定</view>

		</view>
		
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
	listOfLimitedTimeOffers
	} from '@/apis/marketing'



	export default {
		data() {
			return {

				startTime: '', //开始时间
				endTime: '', //结束时间
				price: '', //价格
				vid:'',//车型id
				id:'',//
				status:''
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
	onLoad(e) {
		console.log(JSON.parse(e.obj).isLimited)
		this.vid = JSON.parse(e.obj).id
		if (JSON.parse(e.obj).limitedTimeOfferActivity != null) {
			this.price = JSON.parse(e.obj).limitedTimeOfferActivity.amount
			this.status = JSON.parse(e.obj).isLimited
			if (this.status == 0) {
				this.status = false
			} else {
				this.status = true
			}
			this.endTime = JSON.parse(e.obj).limitedTimeOfferActivity.endTime.substring(0,10)
			
			this.startTime = JSON.parse(e.obj).limitedTimeOfferActivity.beginTime.substring(0,10)
			
	
		} else {
	
			this.price = ''
			this.status = false
			this.endTime = ""
			this.startTime = ""
	
		}
	
	},

		methods: {
			async sure() {
				// if (this.dayNum == "") {
				// 	this.$toast("请填写租用天数")
				// 	return false;
				// } else if (this.songNum == "") {
				// 	this.$toast("请填写赠送天数")
				// 	return false;
				// } else if (this.endTime == "") {
				// 	this.$toast("请填写结束时间")
				// 	return false;
				// } else if (this.startTime == "") {
				// 	this.$toast("请填写开始时间")
				// 	return false;
				// }
				if (this.status == true) {
					this.status = 1
				} else {
					this.status = 0
				}
				let data = {
			
					isLimited:this.status,
					amount:this.price,
					beginTime:this.startTime+ ' 00:00:00',
					endTime:this.endTime+ ' 00:00:00',
					vehicleModelId:this.vid
					
				}
				const [err, res] = await listOfLimitedTimeOffers(data)
				if (err) return
				console.log(res)
				this.$toast('设置成功')
			},
			//获取时间
			getDate() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (day >= 0 && day <= 9) {
					day = "0" + day;
				}
				this.currentdate = year + seperator1 + month + seperator1 + day;
				return this.currentdate;
			},

			selectTime(e) {
				console.log(e.target.value)
				if (e.target.value.indexOf("/") != -1) {
					e.target.value = e.target.value.replace(/\//g, '-');
					this.startTime = e.target.value
				} else {
					this.startTime = e.target.value
				}
			},
			selectendTime(e){
				console.log(e.target.value)
				if (e.target.value.indexOf("/") != -1) {
					e.target.value = e.target.value.replace(/\//g, '-');
					this.endTime = e.target.value
				} else {
					this.endTime = e.target.value
				}
			},
			//状态
			switch1Change: function(e) {
			
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				if (e.target.value) {
					this.status = 1
				} else {
					this.status = 0
				}
			},

		}
	}
</script>

<style>
	.flexBoxContent {
		display: flex;
		align-items: center;
		justify-content: center;
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
		background-color: #EFF0F3;
	}

	.inpBox {
		width: 92%;
		border-radius: 10rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 20rpx;
		background-color: #EFF0F3;
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
		background-color: #EFF0F3;
		display: flex;
	}
	.youhuibox{
		height: auto;display: flex;align-items: center;margin: 40rpx 0rpx;
	}
</style>
