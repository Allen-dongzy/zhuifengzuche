<template>
	<view class="">
		<view style="width: 90%;margin: auto;">
			<view style="color: #5A7EFF;padding: 30rpx 0rpx;">{{carInfo.brandName}}{{carInfo.vehicleModelName}}（{{carInfo.carNumber}}）租金费用</view>
			<view class="flexbox">
				<view style="width: 90%;">租金</view>
				<view class="grayText">{{info.inUseVehiclePriceInfo.total}}</view>
			</view>
			<view class="flexbox" v-for="(item,index) in info.inUseVehiclePriceInfo.orderPriceList">
				<view style="width: 90%;">{{item.name}}</view>
				<view class="grayText">{{item.price}}</view>
			</view>
			<view style="color: #5A7EFF;padding: 30rpx 0rpx;">{{othercarInfo.brandName}}{{othercarInfo.vehicleModelName}}（{{othercarInfo.carNumber}}）租金费用</view>
			<view class="flexbox">
				<view style="width: 90%;">租金</view>
				<view class="grayText">{{info.transferVehicleOrderPriceInfo.total}}</view>
			</view>
			
			<view class="flexbox" v-for="(item,index) in info.transferVehicleOrderPriceInfo.orderPriceList">
				<view style="width: 90%;">{{item.name}}</view>
				<view class="grayText">{{item.price}}</view>
			</view>
			
			<view class="flexbox" style="align-items: center;">
				<view class="blueline"></view>
				<view style="width: 89%;">总计</view>
				<view class="grayText">{{info.total}}</view>
			</view>
			<view class="flexbox" style="align-items: center; margin-top: 20rpx;">
				<view class="blueline"></view>
				<view style="width: 89%;">已收取</view>
				<view class="grayText">{{info.paidExpenses}}</view>
			</view>
			<view class="flexbox" style="align-items: center;margin-top: 40rpx;">
				<view class="blueline"></view>
				<view style="width: 89%;">差价</view>
				<view class="grayText">{{info.differenceOfPrices}}</view>
			</view>
			<view style="color: #5A7EFF;padding: 30rpx 0rpx;">{{carInfo.brandName}}{{carInfo.vehicleModelName}}（{{carInfo.carNumber}}）租金费用</view>
				<view class="flexbox" >
					<view style="width: 90%;">租金押金退还</view>
					<view class="grayText">-{{info.inUseVehiclePriceInfo.rentalMoney}}</view>
				</view>
			<view style="color: #5A7EFF;padding: 30rpx 0rpx;">{{othercarInfo.brandName}}{{othercarInfo.vehicleModelName}}（{{othercarInfo.carNumber}}）租金费用</view>
				<view class="flexbox" >
					<view style="width: 90%;">租金押金</view>
					<view class="grayText">{{info.transferVehicleOrderPriceInfo.rentalMoney}}</view>
				</view>
			<view class="flexbox" style="align-items: center;">
				<view class="blueline"></view>
				<view style="width: 89%;">取车时支付押金</view>
				<view class="grayText">{{info.transferVehicleOrderPriceInfo.rentalMoney-info.inUseVehiclePriceInfo.rentalMoney}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {

		data() {
			return {
				info:'',
				carInfo:'',
				othercarInfo:''
			}
		},
		computed: {
	
		},
		onLoad(e) {
			console.log(JSON.parse(e.obj))
			console.log(JSON.parse(e.carInfo))
			console.log(JSON.parse(e.othercarInfo))
			this.info=JSON.parse(e.obj)
			this.carInfo=JSON.parse(e.carInfo)
			this.othercarInfo=JSON.parse(e.othercarInfo)
			
		},
		methods: {
		
		}
	}
</script>
<style>
	page{
		background-color: #EFF0F3;
	}
	.flexbox{
		display: flex;
		justify-content: center;
		
	}
	.grayText{
		color: #999999;
		font-size: 24rpx;
		width: 10%;
		text-align: center;
	}
	.blueline{
		width: 7rpx;
		height:30rpx; 
		background-color:#5A7EFF;
	}
</style>
