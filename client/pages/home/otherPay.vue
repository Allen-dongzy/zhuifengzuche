<template>
	<view class="">
		<view v-for="(item,index) in list" class="flexBox1">
			<view class="blackText">{{item.name}}</view>
			<view class="garyText">¥{{item.price}}</view>
		</view>
		<view class="flexBox" style="margin-top: 30rpx;">
			<image style="width:40rpx;height: 40rpx;" :src="$util.fileUrl('/othermoney.png')" mode="aspectFill"></image>
			<view style="margin-left: 2%;color: #5A7EFF;font-size: 28rpx;" @click="priceShow=true">添加收款</view>
		</view>
		<!-- 收费弹窗 -->

		<view class="Mask" v-show="priceShow==true"></view>
		<view class="box1" v-show="priceShow==true">
			<view class="blackText" style="padding: 20rpx 0rpx;">款项选择</view>
			<picker @change="cityPicker" :value="cityIndex" :range="cityList" :range-key="'name'" class="pickerBox">
				<view v-if="!log1" class="pickerText">请选择</view>
				<view v-else class="pickerText">{{cityList[cityIndex].name}}</view>
			</picker>
			<view class="blackText" style="padding: 20rpx 0rpx;">金额</view>
			<input type="text"  v-model="selectPrice" placeholder="请输入金额"
				style="background-color: #EFF0F3;height:74rpx;width: 100%;border-radius: 10rpx;padding-left: 20rpx;margin-bottom: 30rpx;" />
			<view class="flexBox" style="width: 100%;">
				<view class="lanbox" @click="priceShow=false">取消</view>
				<view class="lanbox1" style="margin-left: 57%;" @click="sure()">确定</view>
			</view>
		</view>
		
		<!-- <button type="default" @click="getMoney()">发起收款</button> -->
					
					
					<view  style=" color: white;
					width: 80%;
					margin: 20rpx auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
					z-index: -1;
				    font-size: 32rpx;
					text-align: center;
				    height: 96rpx;line-height: 96rpx;" @click="getMoney()">
					发起收款
					</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				priceShow: false,
				log1: false,

				cityList: [{
					name: '车辆租金'
				}, {
					name: '驾无忧代收'
				}, {
					name: '夜间服务费'
				}, {
					name: '其他'
				}],
				cityIndex: '',
				selectName:'',
				selectPrice:'',
				orderId:'',
			}
		},
		onLoad(e) {
			console.log(e.orderId)
			this.orderId=e.orderId
		},
		methods: {
			cityPicker: function(e) {
				this.log1 = true
				this.cityIndex = e.target.value //取其下标
				this.selectName=this.cityList[this.cityIndex].name
			},
			sure(){
				this.list.push({name:this.selectName,price:this.selectPrice})
				this.priceShow=false
			},
			getMoney(){
				console.log('ppp')
				var allprice=Number()
				for(let i=0;i<this.list.length;i++){
					allprice+=Number(this.list[i].price)
				}
				if(allprice!=0){
				     uni.navigateTo({
				      url:'./payCode?orderId='+this.orderId+'&price='+allprice+'&type='+1
				     })
				    }
			
			}
		}
	}
</script>

<style>
	.flexBox1 {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		margin: auto;
		border-bottom: 2rpx solid #EFF0F3;
		height: 120rpx;
		line-height: 120rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.blackText {
		width: 50%;
		color: #000000;
		font-size: 28rpx;
		text-align: left;
	}

	.garyText {
		width: 50%;
		color: #999999;
		font-size: 28rpx;
		text-align: right;
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
		padding: 20rpx 40rpx;
		background-color: white;
		top: 30vh;
		left: 10%;
		border-radius: 20rpx;
		z-index: 99;
	}

	.lanbox {
		border: 2rpx solid #5A7EFF;
		font-size: 24rpx;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		color: #5A7EFF;
	}

	.lanbox1 {
		font-size: 24rpx;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		color: white;
		background-color: #5A7EFF;
	}

	.pickerBox {
		background-color: #EFF0F3;
		color: #999999;
		font-size: 24rpx;
		height: 74rpx;
		border-radius: 10rpx;
	}


	.pickerText {
		height: 74rpx;
		line-height: 74rpx;
		padding-left: 20rpx;
	}
</style>
