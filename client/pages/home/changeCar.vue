<template>
	<view class="">
		<view class="flexBox" style="width: 90%;margin: auto;padding-top: 30rpx;">
			<view class="buleLine"></view>
			<view class="title" style="padding-top: 0rpx;color: #5A7EFF;">审核通过</view>
		</view>
		<view class="flexBox" style="width: 90%;margin: auto;padding-top: 30rpx;">
			<view class="buleLine"></view>
			<view class="title" style="padding-top: 0rpx;color: #5A7EFF;">审核中</view>
		</view>
		<view class="flexBox" style="width: 90%;margin: auto;padding-top: 30rpx;">
			<view class="buleLine"></view>
			<view class="title" style="padding-top: 0rpx;color: #5A7EFF;">审核未通过</view>
		</view>
		<view class="garyText" style="width: 90%;margin: auto;text-align: left;margin-top: 30rpx;">这里是未通过原因。。。。。。。。。。</view>
		
		
		<view class="title">当前车辆</view>
		<view class="box">
			<view class="titleText">渝A·5213B</view>
			<view class="garyText" style="margin-top: 10rpx;text-align: left;">大众 捷达丨自动 5座 2.0L</view>
			<view class="flexBox">
				 <view class="blackText">车身颜色</view>
				 <view class="garyText">白色</view>
			</view>
			<view class="flexBox">
				 <view class="blackText">当前里程</view>
				 <view class="garyText">5269km</view>
			</view>
			<view class="flexBox">
				 <view class="blackText">燃油型号</view>
				 <view class="garyText">92号</view>
			</view>
			<view class="flexBox">
				 <view class="blackText">当前油量</view>
				 <view class="garyText">10%</view>
			</view>
		</view>
		
		<view class="box">
			<view class="flexBox" style="margin-top: 0rpx;">
				<view class="buleLine"></view>
				<view class="blackText" style="margin-left: 20rpx;width: 40%;">还车时间</view>
				<view class="">
					<picker mode="date" :value="stardate" :start="startDate" :end="endDate" @change="starTime">
						<view class="uni-input">{{stardate}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="title">更换车辆</view>
		<view class="box" style="text-align: center;color: #5A7EFF;">请选择车辆</view>
		<view class="box">
			<view class="blackText">渝A·5213B</view>
			<view class="garyText" style="text-align: left;">大众 捷达丨自动 5座 2.0L</view>
			<view class="flexBox">
				<view class="blackText" >车身颜色</view>
				<view class="garyText" >白色</view>
			</view>
			<view class="flexBox">
				<view class="blackText" >当前里程</view>
				<view class="garyText" >5269km</view>
			</view>
			<view class="flexBox">
				<view class="blackText" >燃油型号</view>
				<view class="garyText" >92号</view>
			</view>
			<view class="flexBox">
				<view class="blackText" >当前油量</view>
				<view class="garyText" >10%</view>
			</view>
		</view>
		<view class="box">
			<view class="flexBox" >
				<view class="blackText" style="width: 70%;">差价</view>
				<view class="garyText" style="width: 10%;">收款</view>
				<view class="garyText" style="width: 15%;">¥60</view>
				<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode=""></image>
			</view>
			<view style="height: 2rpx;width: 100%;background-color: #EFF0F3;margin: 20rpx 0rpx ;"></view>
			<view class="flexBox">
				<view class="blackText" style="width: 70%;">差价</view>
				<view class="garyText" style="width: 10%;">收款</view>
				<view class="garyText" style="width: 15%;">¥60</view>
				<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode=""></image>
			</view>
		</view>
		
		<button  style=" color: white;
			width: 80%;
					margin: auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;margin-top: 60rpx;" type="default" @click="next">确认</button>
		
		<button  style=" color: white;
						width: 80%;
								margin: auto;
							    background-color: #5A7EFF;
							    border-radius: 50px;
							    font-size: 32rpx;
							    height: 96rpx;line-height: 96rpx;margin-top: 60rpx;" type="default" @click="next">重新提交</button>
					
					
				<!-- 弹窗 -->
		<view class="Mask" v-show="price==true"></view>
		<view class="box1" v-show="price==true">
			<view class="blackText" style="margin-left: 5%;">扣费价格</view>
			<view class="flexBox">
				
				<view class="flexBoxContent">
					<view class="selectBox">
						<view style="width: 80%;">
							<picker @change="bindPickerChange1" :value="index" :range="list" :range-key="'name'"
								class="pickerBox">
								<label v-if="!log2" class="pickerText">请选择</label>
								<label v-else class="pickerText">{{list[index].name}}</label>
							</picker>
				
						</view>
						<view style="width:15%;">
							<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
						</view>
					</view>
				</view>
				<input style="width: 40%;height: 74rpx;line-height: 74rpx;background-color: #EFF0F3;border-radius: 10rpx;margin-left: 10%;padding-left: 10rpx;font-size: 24rpx;" type="text" placeholder="请输入金额" value="" />
			</view>
			
			<view class="blackText" style="margin:20rpx 0rpx 20rpx 5%;">备注</view>
			<textarea placeholder="请输入" style="width: 80%;height: 174rpx;line-height: 74rpx;background-color: #EFF0F3;border-radius: 10rpx;margin-left: 10%;padding-left: 10rpx;font-size: 24rpx;" ></textarea>
			<view class="flexBox" style="width: 90%;margin: auto;margin-top: 30rpx;">
				<view class="lanbox">取消</view>
				<view style="margin-left: 55%;" class="lanbox1">确定</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stardate: '请选择时间',
				endDate:'请选择时间',
				index: 0,
				log2: false,
				list: [{
					name: '收取',
					id:1
				}, {
					name: '退还',
					id:2
				}],
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
		methods: {
			starTime: function(e) {
				this.stardate = e.target.value
			},
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindPickerChange1: function(e) {
				console.log('pp1')
				this.log2 = true
				this.index = e.target.value //取其下标
			
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #EFF0F3;
	}
	.title{
		width: 90%;
		margin: auto;
		font-size: 28rpx;
		color: #000000;
		padding-top: 30rpx;
	}
	.box {
		width: 90%;
		margin: auto;
		border: 2rpx solid rgba(114, 141, 244, 0.25);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-top: 30rpx;
		background-color: white;
	}
	.titleText{
		font-size: 28rpx;
		color: #000000;
	}
	.garyText{
		font-size: 24rpx;
		color: #999999;
		width: 50%;
		text-align: right;
	}
	.blackText{
		font-size: 28rpx;
		color: #000000;
		width: 50%;
	}
	.flexBox {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
	.buleLine {
		background-color: #5A7EFF;
		width: 8rpx;
		height: 24rpx;
	}
	.Mask {
		position: fixed;
		background-color: #000000;
		opacity: 0.6;
		height: 100vh;
		width: 100%;
		top: 0px;
	}
	.box1 {
		width: 80%;
		position: absolute;
		padding: 20rpx 0px;
		background-color: white;
		top: 0px;
		left: 10%;
	}
	.flexBoxContent {
		display: flex;
		align-items: center;
	width: 40%;
	margin-left: 5%;
		
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
		width: 100%;
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
	.lanbox{
		border:2rpx solid #5A7EFF;
		font-size:24rpx;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		color: #5A7EFF;
	}
	.lanbox1{
		font-size:24rpx;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		color: white;
		background-color: #5A7EFF;
	}
</style>
