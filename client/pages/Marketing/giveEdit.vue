<template>
	<view>

		<view class="title">租用天数</view>
		<view class="idCard">
			<input class="inpBox" v-model="plateNumber" type="number" value="" placeholder="请填写租用天数" />
		</view>

		<view class="title">赠送天数</view>
		<view class="idCard">
			<input class="inpBox" v-model="plateNumber" type="number" value="" placeholder="请填写赠送天数" />
		</view>
		
		<view class="title">赠送天数</view>
		<view class="flexBoxContent">
			<view style="width: 40%;">
				<picker mode="date" @change="selectTime()" :value="startTime" :start="startDate"
					:end="currentdate" class="pickerBox">
				
					<view class="pickerText">{{startTime==""?'请选择':startTime}}</view>
				</picker>
			</view>

			<view style="width: 40%;margin-left: 10%;">
				<picker mode="date" @change="selectendTime()" :value="endTime" :start="startDate"
					:end="currentdate" class="pickerBox">
			
					<view  class="pickerText">{{endTime==""?'请选择':endTime}}</view>
				</picker>
			</view>
		</view>
		
		<view style="display: flex;justify-content:center;align-items: center;margin: 180rpx 0rpx;">
			<view
				style="border: 2rpx solid #5A7EFF;color: #5A7EFF;font-size: 28rpx;text-align: center;height: 90rpx;line-height:70rpx;padding: 10rpx 20rpx;width: 40%;border-radius: 50rpx;"
				@click="close(2)">取消</view>
			<view 
				style="background-color: #5A7EFF;color: white;font-size: 28rpx;text-align: center;height: 90rpx;line-height: 70rpx;padding: 10rpx 20rpx;width:40%;border-radius:50rpx;margin-left: 5%;"
				@click="close(1)">确定</view>
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





	export default {
		data() {
			return {

				startTime: '', //开始时间
				endTime: '', //结束时间
				plateNumber: '', //号牌号码

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


		},
		mounted() {
			let inputEle = document.querySelector('.input input')
			inputEle.addEventListener('blur', function() {
				document.body.scrollIntoView()
			})
		},
		methods: {
			//获取时间
			getNowFormatDate() {
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
</style>
