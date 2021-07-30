<template>
	<view>

		<view class="topNav" v-if="search==false">
			<image style="width: 48rpx;height: 48rpx;" :src="$util.fileUrl('/time.png')" mode=""></image>
			<view style="margin-left: 2%;">
				<picker mode="date" :value="staredate" :start="startDate" :end="endDate" @change="starTime">
					<view class="uni-input" v-if="staredate==''">请选择</view>
					<view class="uni-input" v-else>{{staredate.substring(0,10)}}</view>
				</picker>
			</view>
			<view style="margin-left: 2%;">
				<picker mode="date" :value="enddate" :start="startDate" :end="endDate" @change="endTime">
					<view class="uni-input" v-if="enddate==''">请选择</view>
					<view class="uni-input" v-else>{{enddate.substring(0,10)}}</view>
				</picker>
			</view>
			<view class="statusBox" @click="changestatus">
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
			<input type="text" @input="onInput" v-model="searchField"
				style="background-color:#EFF0F3;height: 70rpx;width: 500rpx;border-radius: 50rpx;padding-left: 20rpx;"
				value="" />
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
					<view style="color: #000000;font-size: 28rpx;font-weight: bold;">{{item.carNumber}}</view>
					<view class="carName">
						<view class="">{{item.categoryName}}</view>
						<view class="garyLine"></view>
						<view class="">{{item.brandName}}</view>
					</view>
				</view>
			</view>
			<view class="dayBox">
				<view v-for="(itemy,indexy) in item.rentalPlans" :key="indexy">
					<view v-if="itemy.planStatus==0" class="timecolorBox">
						<view>{{itemy.planStartTime.slice(8,11)}}</view>
						<view style="font-size: 20rpx;">¥{{itemy.money}}</view>
					</view>
					<view v-if="itemy.planStatus==1" class="timecolorBox" style="background-color: #FFA05B;">
						<view>{{itemy.planStartTime.slice(8,11)}}</view>
						<view style="font-size: 20rpx;">¥{{itemy.money}}</view>
					</view>
					<view v-if="itemy.planStatus==2" class="timecolorBox" style="background-color: #5A7EFF;">
						<view>{{itemy.planStartTime.slice(8,11)}}</view>
						<view style="font-size: 20rpx;">¥{{itemy.money}}</view>
					</view>
					<view v-if="itemy.planStatus==3" class="timecolorBox" style="background-color: #EC80E1;">
						<view>{{itemy.planStartTime.slice(8,11)}}</view>
						<view style="font-size: 20rpx;">¥{{itemy.money}}</view>
					</view>
					<view v-if="itemy.planStatus==4" class="timecolorBox" style="background-color: #C4C4C4;">
						<view>{{itemy.planStartTime.slice(8,11)}}</view>
						<view style="font-size: 20rpx;">¥{{itemy.money}}</view>
					</view>
					<view v-if="itemy.planStatus==5" class="timecolorBox">
						<view>{{itemy.planStartTime.slice(8,11)}}</view>
						<view style="font-size: 20rpx;">¥{{itemy.money}}</view>
						<view class="redLine"></view>
					</view>
					<view v-if="itemy.planStatus==6" class="timecolorBox">
						<view>{{itemy.planStartTime.slice(8,11)}}</view>
						<view style="font-size: 20rpx;">¥{{itemy.money}}</view>
					</view>
				</view>
			</view>
		</view>


		<view v-if="showStatus==true" class="Mask">

		</view>
		<view class="box1" v-if="showStatus==true">
			<view class="topNav" style="margin-bottom: 20rpx;">
				<image style="width: 48rpx;height: 48rpx;" :src="$util.fileUrl('/time.png')" mode=""></image>
				<view style="margin-left: 2%;">
					<picker mode="date" :value="staredate" :start="startDate" :end="endDate" @change="starTime">
						<view class="uni-input" v-if="staredate==''">请选择</view>
						<view class="uni-input" v-else>{{staredate.substring(0,10)}}</view>
					</picker>
				</view>
				<view style="margin-left: 2%;">
					<picker mode="date" :value="enddate" :start="startDate" :end="endDate" @change="endTime">
						<view class="uni-input" v-if="enddate==''">请选择</view>
						<view class="uni-input" v-else>{{enddate.substring(0,10)}}</view>
					</picker>
				</view>
				<view class="statusBox" @click="changestatus">
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
				<view v-for="(item,index) in statusList" :key="index" @click="changeType(index)">
					<view v-if="item.status==false" class="noSelect">{{item.name}}</view>
					<view v-else class="yesSelect">{{item.name}}</view>
				</view>
			</view>
			<view class="colorTitle" style="margin-top: 20rpx ;">
				<view class="setnull">清空</view>
				<view class="sure" @click="sure">确定</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		vehiclePageLeaseQuery
	} from '@/apis/vehicle'

	import {
		debounce
	} from '@/utils/tools';

	export default {
		data() {

			return {
				index: 0,
				carList: [],
				list: [],
				statusList: [{
					name: '正常',
					id: 1,
					status: false
				}, {
					name: '异常',
					id: 2,
					status: false
				}, {
					name: '租赁中',
					id: 3,
					status: false
				}, {
					name: '预留中',
					id: 4,
					status: false
				}], //状态list
				staredate: '',
				enddate: '',
				showStatus: false,
				search: false,
				page: 1,
				size: 10,
				statuseId: '',
				searchField: ''
			}
		},
		onLoad() {
			this.vehiclePageLeaseQuery()
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
	
			//列表

			async vehiclePageLeaseQuery() {
	
				let data = {
					page: this.page,
					size: this.size,
					planStatus: this.statuseId,
					searchField: this.searchField, 
					planBeginTime: this.staredate,
					planEndTime: this.enddate,
				}
				const [err, res] = await vehiclePageLeaseQuery(data)
				if (err) return
				this.carList = res.data.list
				console.log(res.data.list)
			},
			async sure() {
				if(this.staredate!=""){
					this.staredate=this.staredate.substring(0,10)+ ' 00:00:00'
				}
				if(this.enddate!=""){
					this.enddate=this.enddate.substring(0,10)+ ' 00:00:00'
				}
				this.showStatus = false
				let data = {
					page: this.page,
					size: this.size,
					planStatus: this.statuseId,
					searchField: this.searchField, 
					planBeginTime: this.staredate,
					planEndTime: this.enddate,
				}
				const [err, res] = await vehiclePageLeaseQuery(data)
				if (err) return
				this.carList = res.data.list
				console.log(res.data.list)
			},
			async starTime(e) {
				this.staredate = e.target.value
				if (this.enddate == '') {
					this.$toast("请选择结束时间")
					return false;
				} else {
					var data = {
						page: this.page,
						size: this.size,
						planBeginTime: this.staredate + ' 00:00:00',
						planEndTime: this.enddate + ' 00:00:00',
						planStatus: this.statuseId,
						searchField: this.searchField, 
					}
				}
				const [err, res] = await vehiclePageLeaseQuery(data)
				if (err) return
				this.carList = res.data.list
				console.log(res.data.list)


			},
			async endTime(e) {
				this.enddate = e.target.value

				if (this.staredate == '') {
					this.$toast("请选择开始时间")
					return false;
				} else {
					var data = {
						page: this.page,
						size: this.size,
						planBeginTime: this.staredate + ' 00:00:00',
						planEndTime: this.enddate + ' 00:00:00',
						planStatus: this.statuseId,
						searchField: this.searchField, 
					}
				}
				const [err, res] = await vehiclePageLeaseQuery(data)
				if (err) return
				this.carList = res.data.list
				console.log(res.data.list)
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
			changestatus() {
				if (this.showStatus) {
					this.showStatus = false
				} else {
					this.showStatus = true
				}
			},
			changeType(e) {
				for (let i = 0; i < this.statusList.length; i++) {
					this.statusList[i].status = false
				}
				this.statusList[e].status = true
				this.statuseId = this.statusList[e].id
			},
			showSearch() {
				if (this.search) {
					this.search = false

				} else {
					this.search = true
					this.showStatus = false
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
