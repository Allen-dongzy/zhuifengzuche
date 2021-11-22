<template>
	<view>

		<view class="title">租用天数</view>
		<view class="idCard">
			<picker class="pickerBox" @change="selectName" :value="nameIndex" :range="nameList" range-key="name">

				<view class="pickerText">{{nameIndex==""?'请选择':nameIndex}}</view>
			</picker>
		</view>


		<view class="title">赠送天数</view>
		<view class="flexBoxContent">
			<view style="width: 40%;">
				<picker mode="date" @change="selectTime()" :value="startTime" :start="startDate" :end="currentdate"
					class="pickerBox">

					<view class="pickerText">{{startTime==""?'请选择':startTime}}</view>
				</picker>
			</view>

			<view style="width: 40%;margin-left: 10%;">
				<picker mode="date" @change="selectendTime()" :value="endTime" :start="startDate" :end="currentdate"
					class="pickerBox">

					<view class="pickerText">{{endTime==""?'请选择':endTime}}</view>
				</picker>
			</view>
		</view>

		<view class="title">金额</view>

		<view class="flexBoxContent" style="width: 100%;">
			<view style="display: flex;align-items: center;margin-left: 5%;">
				<view style="margin: 0rpx 20rpx;">满</view>
				<view class="flexBoxContent"
					style="width: 45%;background-color:#EFF0F3;margin-top: 0rpx;height: 74rpx;border-radius: 10rpx;padding: 0rpx 10rpx;">
					<input type="text" value="" />
					<view style="color: #999999;">元</view>
				</view>
			</view>

			<view style="display: flex;align-items: center;">
				<view style="margin: 0rpx 20rpx;">减</view>
				<view class="flexBoxContent"
					style="width: 45%;background-color:#EFF0F3;margin-top: 0rpx;height: 74rpx;border-radius: 10rpx;padding: 0rpx 10rpx;">
					<input type="text" value="" />
					<view style="color: #999999;">元</view>
				</view>
			</view>
		</view>

		<view class="title">使用对象</view>
		<view class="idCard">
			<picker class="pickerBox" @change="selectName" :value="nameIndex" :range="nameList" range-key="name">

				<view class="pickerText">{{nameIndex==""?'请选择':nameIndex}}</view>
			</picker>
		</view>

		<view class="title">赠送节点</view>
		<view class="idCard">
			<picker class="pickerBox" @change="selectName" :value="nameIndex" :range="nameList" range-key="name">

				<view class="pickerText">{{nameIndex==""?'请选择':nameIndex}}</view>
			</picker>
		</view>

		<view class="flexBoxContent">
			<view style="margin-right: 70%;">状态</view>
			<switch class="switch" :checked="list[index].status===1" @change="deliveryOnOrOffButton($event, index)" />
		</view>
		
		<view class="delText">删除优惠券</view>




		<view class="sure" @click="close(1)">确定</view>


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
				nameList: [{
					name: '新人优惠',
					id: 0
				}, {
					name: '评价优惠',
					id: 1
				}, {
					name: '节日优惠',
					id: 2
				}],
				nameIndex: '',
				startTime: '',
				endTime: ''

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

			selectName(e) {
				console.log(e.target.value)
				this.nameIndex = this.nameList[e.target.value].name

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
			selectendTime(e) {
				console.log(e.target.value)
				if (e.target.value.indexOf("/") != -1) {
					e.target.value = e.target.value.replace(/\//g, '-');
					this.endTime = e.target.value
				} else {
					this.endTime = e.target.value
				}
			},
			// 开启/关闭送车点
			async deliveryOnOrOffButton(event, index) {

			}
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
