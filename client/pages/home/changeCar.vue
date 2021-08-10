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
		<view class="garyText" style="width: 90%;margin: auto;text-align: left;margin-top: 30rpx;">这里是未通过原因。。。。。。。。。。
		</view>


		<view class="title">当前车辆</view>
		<view class="box">
			<view class="titleText">{{carInfo.carNumber}}</view>
			<view class="garyText" style="margin-top: 10rpx;text-align: left;">{{carInfo.brandName}}
				{{carInfo.brandName}}丨{{carInfo.gears}} {{carInfo.capacity}}座 {{carInfo.outputVolumeName}}
			</view>
			<view class="flexBox">
				<view class="blackText">车身颜色</view>
				<view class="garyText">{{carInfo.colour}}</view>
			</view>
			<view class="flexBox">
				<view class="blackText">燃油型号</view>
				<view class="garyText">{{carInfo.model}}</view>
			</view>
		</view>

		<view class="box">
			<view class="flexBox" style="margin-top: 0rpx;">
				<view class="buleLine"></view>
				<view class="blackText" style="margin-left: 20rpx;width: 40%;">还车时间</view>
				<view class="width100" @click="dateOpen('hopeBeginTime', hopeBeginTime)">
					<text class="text1" v-if="hopeBeginTime">{{ hopeBeginTime }}</text>
					<text class="text1 color3" v-else>请选择</text>
				</view>
				<my-datetime ref="dateTimePop" @ok="timeOk"></my-datetime>
			</view>
		</view>





		<view class="title">更换车辆</view>
		<view v-if="othercarInfo==''" class="box" style="text-align: center;color: #5A7EFF;" @click="changeCar()">请选择车辆
		</view>
		<view v-else class="box" @click="changeCar()">
			<view class="titleText">{{othercarInfo.carNumber}}</view>
			<view class="garyText" style="margin-top: 10rpx;text-align: left;">{{othercarInfo.brandName}}
				{{carInfo.brandName}}丨{{carInfo.gears}} {{carInfo.capacity}}座 {{carInfo.outputVolumeName}}
			</view>
			<view class="flexBox">
				<view class="blackText">车身颜色</view>
				<view class="garyText">{{othercarInfo.colour}}</view>
			</view>
			<view class="flexBox">
				<view class="blackText">燃油型号</view>
				<view class="garyText">{{othercarInfo.model}}</view>
			</view>
		</view>




		<view class="box">
			<view class="flexBox" @click="differenceDetails">
				<view class="blackText" style="width: 70%;">差价</view>
				<view class="garyText" style="width: 10%;">收款</view>
				<view class="garyText" style="width: 15%;" v-if="priceDifferenceinfo==''"></view>
				<view class="garyText" style="width: 15%;" v-else="priceDifferenceinfo!=''">
					¥{{priceDifferenceinfo.differenceOfPrices}}</view>
				<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode="aspectFill"></image>
			</view>
			<view style="height: 2rpx;width: 100%;background-color: #EFF0F3;margin: 20rpx 0rpx ;"></view>
			<view class="flexBox" @click="priceShow=true">
				<view class="blackText" style="width: 70%;">其他扣费</view>
				<view class="garyText" style="width: 10%;"><text v-show="log2">{{list[index].name}}</text></view>
				<view class="garyText" style="width: 15%;">{{setMoney}}</view>
				<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode="aspectFill"></image>
			</view>
		</view>

		<button v-if="setMoney==''" class="surebox" type="default" @click="Submit">提交</button>

		<button v-else class="setbox" type="default" @click="setbox">提交审核</button>


		<!-- 弹窗 -->
		<view class="Mask" v-show="priceShow==true"></view>
		<view class="box1" v-show="priceShow==true">
			<view class="blackText" style="margin-left: 5%;">扣费价格</view>
			<view class="flexBox">

				<view class="flexBoxContent">
					<view class="selectBox">
						<view style="width: 80%;">
							<picker @change="bindPickerChange1" :value="index" :range="list" :range-key="'name'"
								class="pickerBox">
								<view v-if="!log2" class="pickerText">请选择</view>
								<view v-else class="pickerText">{{list[index].name}}</view>
							</picker>

						</view>
						<view style="width:15%;">
							<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill">
							</image>
						</view>
					</view>
				</view>
				<input class="setMoney" v-model="setMoney" type="text" placeholder="请输入金额" value="" />
			</view>

			<view class="blackText" style="margin:20rpx 0rpx 20rpx 5%;">备注</view>
			<textarea v-model="reason" placeholder="请输入" class="reason"></textarea>
			<view class="flexBox" style="width: 90%;margin: auto;margin-top: 30rpx;">
				<view class="lanbox" @click="priceShow=false">取消</view>
				<view style="margin-left: 55%;" class="lanbox1" @click="priceShow=false">确定</view>
			</view>
		</view>

	</view>
</template>

<script>
	import myDatetime from '@/components/my-datetime/my-datetime.vue'
	import {
		vehicleSelectOne,
	} from '@/apis/vehicle'
	import {
		differenceOfPrices,
		transferCommit,
		transferInfo
	} from '@/apis/transfer'
	export default {
		components: {
			'my-datetime': myDatetime
		},
		data() {
			return {
				stardate: '请选择时间',
				enddate: '请选择时间',
				index: 0,
				log2: false,
				list: [{
					name: '收取',
					id: 1
				}, {
					name: '退还',
					id: 2
				}],
				priceShow: false,
				carInfo: '', //车辆信息
				othercarInfo: '', //回调车辆信息
				setMoney: '', //设置钱,
				reason: '', //备注
				info: '',
				hopeBeginTime: '',
				dateKey: '',
				priceDifferenceinfo: ''
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
			console.log(e)
			this.info = JSON.parse(e.obj)
			this.vehicleSelectOne(JSON.parse(e.obj).adminOrderVehicleInfoVoList[0].vehicleId)
			this.eventListener()
			
		},
		onUnload() {
			// 移除监听事件  
			uni.$off('selectCart');
		},
		methods: {
		async	transferInfo(){
			
				const [err, res] = await transferInfo()
				if (err) return
				console.log(res)
				this.carInfo = res.data
			},
			
			differenceDetails() {
				uni.navigateTo({
					url: './differenceDetails?obj=' + JSON.stringify(this.priceDifferenceinfo) + '&carInfo=' + JSON
						.stringify(this.carInfo) + '&othercarInfo=' + JSON.stringify(this.othercarInfo)
				})
			},
			// 开启弹窗
			dateOpen(key, date) {
				this.dateKey = key
				this.$refs.dateTimePop.open(date || '');
			},
			// 关闭弹窗
			timeOk(str, obj) {
				console.log(str, obj)
				this[this.dateKey] = str || ''
			},

			// 监听
			eventListener() {
				// 获取选中的车辆
				uni.$on('selectCart', (e) => {
					this.vehicleSelectOther(e.cartId)

				})
			},
			starTime: function(e) {
				this.stardate = e.target.value
			},
			//车辆信息
			async vehicleSelectOne(e) {
				const [err, res] = await vehicleSelectOne(e)
				if (err) return
				console.log(res)
				this.carInfo = res.data
			},
			//回掉获取车辆信息
			async vehicleSelectOther(e) {
				const [err, res] = await vehicleSelectOne(e)
				if (err) return
				console.log(res)
				this.othercarInfo = res.data
				this.priceDifference()
			},
			//获取差价
			async priceDifference() {
				let data = {
					endTime: this.hopeBeginTime,
					deliveryId: this.info.startDeliveryId,
					rentalOrderId: this.info.id,
					transferVehicleId: this.othercarInfo.id
				}
				const [erre, rese] = await differenceOfPrices(data)
				if (erre) return
				console.log(rese)
				this.priceDifferenceinfo = rese.data
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
			changeCar() {
				if (this.hopeBeginTime == "") {
					this.$toast('请选择还车时间')
					return false
				} else {
					uni.navigateTo({
						url: '../customerRecords/selectCart?type=1&shopid=' + this.info.memberShopId + '&time=' +
							this.hopeBeginTime,
					})
				}
			},
			setbox() {
				var that = this;
				if (that.hopeBeginTime == "") {
					that.$toast('请选择还车时间')
					return false
				} else if (that.othercarInfo == "") {
					that.$toast('请选择更换的车辆')
					return false
				}

				uni.showModal({
					title: '提示',
					content: '是否继续换车？',
					success: function(res) {
						if (res.confirm) {
							that.transferCommit()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async transferCommit() {
				if (this.list[this.index].name == "退还") {
					var x = {
						money: '-' + this.setMoney,
						remarks: this.reason
					}
					var data = {
						endTime: this.hopeBeginTime,
						deliveryId: this.info.startDeliveryId,
						rentalOrderId: this.info.id,
						transferVehicleId: this.othercarInfo.id,
						receivePaymentVo: x
					}
				} else {

					var x = {
						money: this.setMoney,
						remarks: this.reason
					}
					var data = {
						endTime: this.hopeBeginTime,
						deliveryId: this.info.startDeliveryId,
						rentalOrderId: this.info.id,
						transferVehicleId: this.othercarInfo.id,
						receivePaymentVo: x
					}
				}

				const [erre, rese] = await transferCommit(data)
				if (erre) return
				console.log(rese)
				uni.navigateBack({
					delta: 1
				})
			},
			async Submit() {
				if (this.hopeBeginTime == "") {
					this.$toast('请选择还车时间')
					return false
				} else if (this.othercarInfo == "") {
					this.$toast('请选择更换的车辆')
					return false
				}
				let data = {
					endTime: this.hopeBeginTime,
					deliveryId: this.info.startDeliveryId,
					rentalOrderId: this.info.id,
					transferVehicleId: this.othercarInfo.id,
				}
				const [erre, rese] = await transferCommit(data)
				if (erre) return
				console.log(rese)
				this.$toast('提交成功')
			}
		}
	}
</script>

<style>
	page {
		background-color: #EFF0F3;
	}

	.title {
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

	.titleText {
		font-size: 28rpx;
		color: #000000;
	}

	.garyText {
		font-size: 24rpx;
		color: #999999;
		width: 50%;
		text-align: right;
	}

	.blackText {
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
		position: fixed;
		padding: 20rpx 0px;
		background-color: white;
		top: 30vh;
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

	.reason {
		width: 80%;
		height: 174rpx;
		line-height: 74rpx;
		background-color: #EFF0F3;
		border-radius: 10rpx;
		margin-left: 10%;
		padding-left: 10rpx;
		font-size: 24rpx;
		padding: 20rpx;
	}

	.setMoney {
		width: 40%;
		height: 74rpx;
		line-height: 74rpx;
		background-color: #EFF0F3;
		border-radius: 10rpx;
		margin-left: 10%;
		padding-left: 10rpx;
		font-size: 24rpx;
	}

	.surebox {
		color: white !important;
		width: 80%;
		margin: 60rpx auto;
		background-color: #5A7EFF !important;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;

	}

	.setbox {
		color: white !important;
		width: 80%;
		margin: 60rpx auto;
		background-color: #5A7EFF !important;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
	}
</style>
