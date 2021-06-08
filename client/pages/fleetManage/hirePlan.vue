<template>
	<view>

		<view class="topNav" v-if="search==false">
			<image style="width: 48rpx;height: 48rpx;" :src="$util.fileUrl('/time.png')" mode=""></image>
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
			<view class="statusBox" @click="changeStuse">
				<view class="">状态</view>
				<view class="">
					<image style="width:32rpx;height: 16rpx;" :src="$util.fileUrl('/xiangxia.png')" mode=""></image>
				</view>
			</view>
			<view class="statusBox" @click="showSearch">
				<view class="">搜索</view>
				<image style="width:28rpx;height:28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode=""></image>
			</view>
		</view>
		
		<view class="topNav" style="color: #8E8E93;font-size: 30rpx" v-if="search==true">
			<input type="text" style="background-color:#EFF0F3;height: 70rpx;width: 500rpx;border-radius: 50rpx;padding-left: 20rpx;" value="" />
			<view style="margin-left: 20rpx;" @click="showSearch">取消</view>
		</view>
		
		

		<view style="margin-top: 60rpx;">
			<view class="colorTitle">
				<view class="colorBox" style="background-color: #FFA05B;"></view>
				<view class="colorText">已预定</view>
				<view class="colorBox" style="background-color: #5A7EFF;"></view>
				<view class="colorText">租凭中</view>
				<view class="colorBox" style="background-color: #EC80E1;"></view>
				<view class="colorText">预留</view>
				<view class="colorBox" style="background-color: #C4C4C4;"></view>
				<view class="colorText">客户使用</view>
				<view class="colorLine"></view>
				<view class="colorText">证件过期</view>
			</view>
		</view>
		<view class="lineBox"></view>
		<view v-for="(item,index) in carList" :key="index" class="">
			<view class="carName" style="margin: 40rpx 16rpx;">
				<view class="buleLine"> </view>
				<view class="">
					<view style="color: #000000;font-size: 28rpx;font-weight: bold;">渝A·5213B</view>
					<view class="carName">
						<view class="">豪华</view>
						<view class="garyLine"></view>
						<view class="">大众</view>
					</view>
				</view>
			</view>
			<view class="dayBox">
				<view v-for="(item,index) in list" :key="index">
					<view v-if="item.stuse==1" class="timecolorBox" style="background-color: #FFA05B;">
						<view>{{item.name}}</view>
						<view style="font-size: 20rpx;">¥{{item.price}}</view>
					</view>
					<view v-if="item.stuse==2" class="timecolorBox" style="background-color: #5A7EFF;">
						<view>{{item.name}}</view>
						<view style="font-size: 20rpx;">¥{{item.price}}</view>
					</view>
					<view v-if="item.stuse==3" class="timecolorBox" style="background-color: #EC80E1;">
						<view>{{item.name}}</view>
						<view style="font-size: 20rpx;">¥{{item.price}}</view>
					</view>
					<view v-if="item.stuse==4" class="timecolorBox" style="background-color: #C4C4C4;">
						<view>{{item.name}}</view>
						<view style="font-size: 20rpx;">¥{{item.price}}</view>
					</view>
					<view v-if="item.stuse==5" class="timecolorBox">
						<view>{{item.name}}</view>
						<view style="font-size: 20rpx;">¥{{item.price}}</view>
						<view class="redLine"></view>
					</view>
					<view v-if="item.stuse==6" class="timecolorBox">
						<view>{{item.name}}</view>
						<view style="font-size: 20rpx;">¥{{item.price}}</view>
					</view>
				</view>
			</view>
		</view>


		<view v-if="showStuse==true" class="Mask">

		</view>
		<view class="box1" v-if="showStuse==true">
			<view class="topNav" style="margin-bottom: 20rpx;">
				<image style="width: 48rpx;height: 48rpx;" :src="$util.fileUrl('/time.png')" mode=""></image>
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
				<view class="statusBox" @click="changeStuse">
					<view style="color:#5A7EFF">状态</view>
					<view class="">
						<image style="width:32rpx;height: 16rpx;" :src="$util.fileUrl('/xiangshang.png')" mode="">
						</image>
					</view>
				</view>
				<view class="statusBox" @click="showSearch">
					<view class="">搜索</view>
					<image style="width:28rpx;height:28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode=""></image>
				</view>
			</view>
			<view class="colorTitle"
				style="padding: 30rpx 0px;border-bottom: 1px solid #EFF0F3;border-top: 1px solid #EFF0F3;">
				<view style="margin-right: :;;">全部</view>
				<view v-for="(item,index) in stuseList" :key="index" @click="changeType(index)">
					<view v-if="item.stuse==1" class="noSelect">{{item.name}}</view>
					<view v-else  class="yesSelect">{{item.name}}</view>
				</view>
			</view>
			<view class="colorTitle" style="margin-top: 20rpx ;">
				<view class="setnull">清空</view>
				<view class="sure">确定</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {

			return {
	
		
				index: 0,
				carList: [1, 1, 1, 1],
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
					name: '租凭中',
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
				search:false
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
	.statusBox {
		display: flex;

		align-items: center;
		margin-left: 4%;
	}

	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 28rpx;

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

	.colorTitle {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.colorBox {
		height: 24rpx;
		width: 24rpx;
		border-radius: 5rpx;
		margin-right: 5rpx;

	}

	.colorText {
		font-size: 24rpx;
		color: black;
		margin-right: 3%;
	}

	.colorLine {
		height: 4rpx;
		width: 24rpx;
		background-color: #FC3736;
		margin-right: 5rpx;
	}

	.lineBox {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 34rpx;
	}

	.buleLine {
		width: 8rpx;
		height: 60rpx;
		background-color: #5A7EFF;
		border-radius: 30rpx;
		margin-right: 16rpx;
	}

	.carName {
		display: flex;
		align-items: center;
		color: #B2B2B2;
		font-size: 24rpx;


	}

	.garyLine {
		width: 2rpx;
		height: 24rpx;
		background-color: #B2B2B2;
		margin: 0rpx 10rpx;
	}

	.dayBox {
		width: 100%;
		overflow-x: scroll;
		background-color: #EFF0F3;
		display: flex;
		align-items: center;
		padding: 43rpx 0px;
	}

	.timecolorBox {
		height: 80rpx;
		width: 80rpx;
		border-radius: 10rpx;
		margin: 0rpx 10rpx;
		text-align: center;
		font-size: 28rpx;
	}

	.redLine {
		height: 4rpx;
		width: 24rpx;
		background-color: #FC3736;
		margin: auto;
		margin-top: 10rpx;
	}

	.noSelect {
		width: 140rpx;
		height: 64rpx;
		background-color: #EFF0F3;
		font-size: 28rpx;
		color: #B2B2B2;
		border-radius: 50rpx;
		text-align: center;
		line-height: 64rpx;
		margin: 0rpx 10rpx;
	}

	.yesSelect {
		width: 140rpx;
		height: 64rpx;
		background-color: #5A7EFF;
		font-size: 28rpx;
		color: #FFFFFF;
		border-radius: 50rpx;
		text-align: center;
		line-height: 64rpx;
	}

	.box1 {
		width: 100%;
		position: absolute;
		padding: 20rpx 0px;
		border-top: 1px solid #FFFFFF;
		border-bottom: 1px solid #FFFFFF;
		background-color: white;
		top: 0px;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
	}

	.Mask {
		position: fixed;
		background-color: #000000;
		opacity: 0.6;
		height: 100vh;
		width: 100%;
		top: 0px;
	}

	.setnull {
		height: 96rpx;
		width: 300rpx;
		border: 1px solid #B2B2B2;
		color: #B2B2B2;
		text-align: center;
		line-height: 96rpx;
		margin: 0px 20rpx;
		border-radius: 50rpx;
	}

	.sure {
		height: 96rpx;
		width: 300rpx;
		color: white;
		background-color: #5A7EFF;
		text-align: center;
		line-height: 96rpx;
		margin: 0px 20rpx;
		border-radius: 50rpx;
	}

</style>
