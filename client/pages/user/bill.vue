<template>
	<view>

		<view class="topBox" v-if="search==false">
	
			<image style="width: 48rpx;height: 48rpx;" :src="$util.fileUrl('/time.png')" mode="aspectFill"></image>
			<view style="margin-left: 2%;">
				<picker mode="date" :value="stardate" :start="startDate" :end="endDate" @change="starTime">
					<view class="uni-input">{{stardate}}</view>
				</picker>
			</view>
			<view style="margin-left: 2%;">
				<picker mode="date" :value="enddate" :start="startDate" :end="endDate" @change="endTime">
					<view class="uni-input">{{enddate}}</view>
				</picker>
			</view>
			<view class="statusBox" style="margin-left: 22%;" @click="showSearch">
				<view class="">搜索</view>
				<image style="width:28rpx;height:28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode="aspectFill"></image>
			</view>
		</view>
		
		<view class="topNav" style="color: #8E8E93;font-size: 30rpx" v-if="search==true">
			<input @input="onInput" v-model="searchVal"  placeholder="请输入车牌或者姓名" type="text" style="background-color:#EFF0F3;height: 70rpx;width: 500rpx;border-radius: 50rpx;padding-left: 20rpx;" value="" />
			<view style="margin-left: 20rpx;" @click="showSearch">取消</view>
		</view>
		
		



		<!-- <view v-for="(item,index) in carList" :key="index" class="">
			<view v-if="item.type==0" style="width: 100%;border-bottom:20rpx solid #EFF0F3;padding: 20rpx 5%;">
				<view class="statusBox" style="margin: 20rpx 0rpx;">
					<view class="orderNum">订单号：5665979465659</view>
					<view style="color:#FC3736;font-size: 28rpx;width: 30%;text-align: right;">金额 +￥300</view>
				</view>
				<view class="orderNum">渝A·5231B 租金费用</view>
				<view class="orderNum">时间：2021-06-03 13:43</view>
				<view class="orderNum">租客：张全蛋</view>
			</view>
			<view  v-else style="width: 100%;border-bottom:20rpx solid #EFF0F3;padding: 20rpx 5%;">
				<view class="statusBox" style="margin: 20rpx 0rpx;">
					<view class="orderNum">风控查询次数购买</view>
					<view style="color:#FC3736;font-size: 28rpx;width: 30%;text-align: right;">金额 +￥300</view>
				</view>
				<view class="orderNum">时间：2021-06-03 13:43</view>
			</view>

		</view> -->



	</view>
</template>

<script>
	import {
		debounce
	} from '@/utils/tools';
	
	export default {
		data() {
			return {
				index: 0,
				carList: [{type:0}, {type:1}],
				list: [{
					name: 19,
					price: 219,
					stuse: 1
				}, {
					name: 19,
					price: 219,
					stuse: 2
				}, {
					name: 19,
					price: 219,
					stuse: 3
				}, {
					name: 19,
					price: 219,
					stuse: 4
				}, {
					name: 19,
					price: 219,
					stuse: 5
				}, {
					name: 19,
					price: 219,
					stuse: 6
				}],
				stuseList: [{
					name: '预定',
					stuse: 1
				}, {
					name: '租赁中',
					stuse: 2
				}, {
					name: '预留中',
					stuse: 1
				}, {
					name: '可用',
					stuse: 1
				}],
				stardate: '开始时间',
				enddate: '结束时间',
				showStuse: false,
				search:false,
				searchVal:""
			}
		},
		onLoad() {

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
			onInput: debounce(async function() {
				let data = {
					page: this.page,
					size: this.size,
					name: this.searchVal
				}
				const [err, res] = await vehicleModelPageQuery(data)
				if (err) return
				console.log(res)
				this.list = res.data.list

			}),
			starTime: function(e) {
				this.stardate = e.target.value
			},
			endTime: function(e) {
				this.enddate = e.target.value
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
			changeStuse() {
				if (this.showStuse) {
					this.showStuse = false
				} else {
					this.showStuse = true
				}
			},
			changeType(e){
				for(let i=0;i<this.stuseList.length;i++){
					this.stuseList[i].stuse=1
				}
				this.stuseList[e].stuse=2
			},
			showSearch(){
				if(this.search){
					this.search=false
					
				}else{
					this.search=true
					this.showStuse=false
				}
			}
		}
	}
</script>

<style>
	page {
	  background-color: #FFFFFF;
	  height: 100vh;
	}
	.statusBox {
		display: flex;
		align-items: center;
		
	}

	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 48rpx;
	}
	
	.topBox{
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		padding-top: 48rpx;

	}

	.uni-input {
		border: 1px solid #5A7EFF;
		height: 48rpx;
		width: 172rpx;
		text-align: center;
		line-height: 48rpx;
		color: #5A7EFF;
		font-size: 24rpx;
		border-radius: 10rpx;
	}
	.orderNum{
		
		font-size: 28rpx;color: #000000;width: 70%;padding: 15rpx 0rpx;
	}


	



</style>
