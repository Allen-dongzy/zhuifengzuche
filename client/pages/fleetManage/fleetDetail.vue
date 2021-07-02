<template>
	<view class="fleetDetail">
		<view class="flex-center swiperList">
			<swiper class="swiper" indicator-dots :indicator-color="indicatorColor"
				:indicator-active-color="indicatorActiveColor">
				<swiper-item class="flex flex-wrap swiperItem" v-for="(item,index) in carInfo.vehicleModelFiles" :key='index'>
					<image :src="item" lazy-load></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="titlePanel">
			<p class="title">{{carInfo.brandName}}{{carInfo.vehicleModelName}}</p>
			<p class="text">
				{{carInfo.brandName}}/{{carInfo.gears}}/{{carInfo.capacity}}/{{carInfo.outputVolumeName}}/{{carInfo.model}}
			</p>
			<view class="flex flex-wrap">
				<p class="flex-center type">{{carInfo.categoryName}}</p>
				<p v-for="(item,index) in carInfo.labels" class="flex-center type addType">{{item}}</p>
			</view>
			<view class="flex statusPanel">
				<p class="status">状态</p>
				<view class="flex statusText">
					<p v-show="carInfo.vehicleStatus==1">正常</p>
					<p v-show="carInfo.vehicleStatus==2">异常</p>
					<p v-show="carInfo.vehicleStatus==3">租赁中</p>
					<p v-show="carInfo.vehicleStatus==4">预留中</p>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="flex rentPanel">
			<view class="flex">
				<i class="line-blue"></i>
				<p class="title">租赁计划</p>
			</view>
			<view class="flex rentDetail" @click="lookinfo">
				<p>详情</p>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="line"></view>
		<view class="carDetail">
			<view class="flex header">
				<i class="line-blue"></i>
				<p>车辆信息</p>
			</view>
			<view class="content">
				<view class="flex carText">
					<p class="title">车身颜色</p>
					<p class="text">{{carInfo.colour}}</p>
				</view>
				<view class="flex carText" v-show="carInfo.mileage!=null">
					<p class="title">当前里程</p>
					<p class="text">{{carInfo.mileage}}km</p>
				</view>
				<view class="flex carText" v-show="carInfo.oil!=null">
					<p class="title">当前油量</p>
					<p class="text">{{carInfo.oil}}%</p>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="carLicense">
			<view class="flex header">
				<i class="line-blue"></i>
				<p>行驶证</p>
			</view>
			<view class="content">
				<view class="flex carText">
					<p class="title">号牌号码</p>
					<p class="text">{{carInfo.plateNumber}}</p>
				</view>
				<view class="flex carText">
					<p class="title">品牌型号</p>
					<p class="text">{{carInfo.brandModel}}</p>
				</view>
				<view class="flex carText">
					<p class="title">车辆识别码</p>
					<p class="text">{{carInfo.discernCode}}</p>
				</view>
				<view class="flex carText">
					<p class="title">发动机号</p>
					<p class="text">{{carInfo.engineNum}}</p>
				</view>
				<view class="flex carText">
					<p class="title">发证日期</p>
					<p class="text">{{carInfo.issueDate}}</p>
				</view>
				<view class="flex carText">
					<p class="title">注册日期</p>
					<p class="text">{{carInfo.registeredDate}}</p>
				</view>
				<view class="flex flex-wrap carImg">
					<view class="fileImg">
						<image :src="carInfo.vehicleDrivingPositiveFiles" lazy-load></image>
					</view>
					<view class="fileImg">
						<image :src="carInfo.vehicleDrivingNegativeFiles" lazy-load></image>
					</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="carJiaoqiang">
			<view class="flex header">
				<i class="line-blue"></i>
				<p>交强险</p>
			</view>
			<view class="content">
				<view class="flex carText">
					<p class="title">单号</p>
					<p class="text">{{carInfo.insuranceSn}}</p>
				</view>
				<view class="flex carText">
					<p class="title">续保日期</p>
					<p class="text">{{carInfo.insuranceTime}}</p>
				</view>
				<view class="flex flex-wrap carImg">
					<view class="fileImg" v-for="(item,index) in carInfo.insuranceFile">
						<image :src="item" lazy-load></image>
					</view>


				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="carTrade">
			<view class="flex header">
				<i class="line-blue"></i>
				<p>商业险</p>
			</view>
			<view class="content">
				<view class="flex carText">
					<p class="title">单号</p>
					<p class="text">{{carInfo.businessSn}}</p>
				</view>
				<view class="flex carText">
					<p class="title">续保日期</p>
					<p class="text">{{carInfo.businessDate}}</p>
				</view>
				<view class="flex flex-wrap carImg">
					<view class="fileImg" v-for="(item,index) in carInfo.businessFile">
						<image :src="item" lazy-load></image>
					</view>
				</view>
			</view>
		</view>

		<button style=" color: white;
			width: 80%;
					margin: auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;margin-top: 40rpx;margin-bottom: 20rpx;" type="default"
			@click="next">编辑</button>

		<!-- 租凭计划弹框 -->
		<view class="mask" v-show="planShow==true" @click="lookinfo()"></view>
		<view class="frame" v-show="planShow==true">
			<view class="carName">
				<view class="buleLine"> </view>
				<view class="">
					<view style="color: #000000;font-size: 28rpx;font-weight: bold;">租赁计划</view>
				</view>
			</view>
			<view class="statusBox">
				<view v-for="(item,index) in list" class="frameBox">
					<view v-show="item.planStatus==1" class="frameTitle">已预定</view>
					<view v-show="item.planStatus==2" class="frameTitle">租赁中</view>
					<view v-show="item.planStatus==3" class="frameTitle">预留</view>
					<view v-show="item.planStatus==4" class="frameTitle">客户使用</view>
					<view v-show="item.planStatus==5" class="frameTitle">证件过期</view>
					<view class="frameTime">{{item.planStartTime}}{{item.planEndTime}}</view>
				</view>
			</view>
			<button class="reserve" type="default" @click="lookopen">预留</button>
		</view>



		<uni-popup ref="popup" type="bottom">
			<view style="background-color: white;width: 100%;margin: auto;">
				<view style="display: flex;align-items: center;padding: 40rpx 40rpx;">
					<view v-for="(item,index) in reserveTitle" style="width: 50%;text-align: center;"
						@click="selectReserve(index)">
						<view v-if="item.status==true" style="color: #5A7EFF;">{{item.name}}</view>
						<view v-else>{{item.name}}</view>
					</view>

				</view>
				<view style="margin-top: 10rpx;">
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
				<view style="display: flex;align-items: center;padding: 40rpx;">
					<view class="day">日</view>
					<view class="day">一</view>
					<view class="day">二</view>
					<view class="day">三</view>
					<view class="day">四</view>
					<view class="day">五</view>
					<view class="day">六</view>
				</view>
				<view style="display: flex;align-items: center;padding: 40rpx;width: 100%;background-color:#EFF0F3;">
					<view class="dayBox">
						<view v-for="(itemy,index) in carInfo.rentalReservedPlans" :key="index"
							style="display: inline-block;width:14.2%;margin-top: 20rpx;"
							@click="selectDay(itemy.planStartTime)">
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
				<view style="width: 90%;margin: auto;margin-top: 30rpx;display: flex;align-items: center;">
					<view style="width: 50%;text-align: left;">请选择预留时间</view>
					<view style="width: 50%;text-align: right;">当前选择日期:{{dayTime}}</view>
				</view>

				<slider style="margin-bottom: 0px;" value="0" activeColor="#5A7EFF" block-size="20" step="2"
					@change="sliderChange" min="0" max="24" show-value />

				<view style="display: flex;justify-content: center; align-items: center;padding: 60rpx 0rpx;">

					<view
						style="border: 2rpx solid #5A7EFF;color: #5A7EFF;font-size: 28rpx;text-align: center;height: 60rpx;line-height: 40rpx;padding: 10rpx 20rpx;width: 150rpx;border-radius: 10rpx;margin-left: 20rpx;margin-right: 20%;"
						@click="close()">取消</view>
					<view
						style="background-color: #5A7EFF;color: white;font-size: 28rpx;text-align: center;height: 60rpx;line-height: 40rpx;padding: 10rpx 20rpx;width: 150rpx;border-radius: 10rpx;margin-right: 20rpx;margin-left: 20%;"
						@click="sure()">确定</view>
				</view>


			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		vehicleSelectOne,
		vehicleSelectRentalPlanList,
		vehiclePlanInsert
	} from '@/apis/vehicle'
	export default {
		data() {
			return {
				indicatorColor: '#DADADA',
				indicatorActiveColor: '#DADADA',
				carInfo: {},
				list: [{
					name: '租凭中',
					time: '6月3日 12:00-6月4日 16:00'
				}, {
					name: '已预订',
					time: '6月3日 12:00-6月4日 16:00'
				}, {
					name: '预留',
					time: '6月3日 12:00-6月4日 16:00'
				}, {
					name: '客户使用',
					time: '6月3日 12:00-6月4日 16:00'
				}],
				reserveTitle: [{
					name: '开始时间',
					status: true
				}, {
					name: '结束时间',
					status: 'false'
				}],
				reserveId: '',
				planShow: false,
				id: '',
				day1: '',
				day2: '',
				dayTime: '',//显示选择时间
				dayTime1: '',//开始时间
				dayTime2: '',//结束时间
				
			}
		},
		onLoad(e) {
			this.id = e.id
			this.vehicleSelectOne(e.id)
			this.vehicleSelectRentalPlanList()
		},
		methods: {
		async	sure(){
			if(this.day1==''){
				this.$toast("请选择开始时间")
				return false
			}else{
				if(this.dayTime1==''){
					this.dayTime1=this.day1+'00:00'
				}
			}
			
			if(this.day2==''){
				this.$toast("请选择结束时间")
				return false
			}else{
				if(this.dayTime2==''){
					this.dayTime2=this.day2+'00:00'
				}
			}
			
			let data= {
				
				planStartTime:this.dayTime1,
				planEndTime:this.dayTime2,
			}
			const [err,res] =await vehiclePlanInsert(data)
			if(err) return
			console.log(res)
			},
			selectReserve(e) {
				this.reserveId = e
				for (let i = 0; i < this.reserveTitle.length; i++) {
					this.reserveTitle[i].status = false
				}
				this.reserveTitle[e].status = true

			},
			selectDay(e) {
				this.dayTime = e.slice(5, 11)
				if(this.reserveId==0){
					this.day1=e.slice(0, 11)
				}else{
					this.day2=e.slice(0, 11)
				}
			},
			sliderChange(e) {
				if(this.reserveId==0){
					if(this.day1==''){
						this.$toast('请选择开始日期')
						return false
					}else{
						if(e.detail.value>9){
							this.dayTime1=this.day1+e.detail.value+':00'
						}else{
							this.dayTime1=this.day1+ '0'+e.detail.value+':00'
						}
						
					}
				}else{
					
					if(this.day2==''){
						this.$toast('请选结束日期')
						return false
					}else{
						if(e.detail.value>9){
							this.dayTime2=this.day2+e.detail.value+':00'
						}else{
							this.dayTime2=this.day2+ '0'+e.detail.value+':00'
						}
						
					}
				}
				
	
				
			},
			lookopen() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			async vehicleSelectRentalPlanList() {
				const [err, res] = await vehicleSelectRentalPlanList(this.id)
				if (err) return
				console.log(res)
				this.list = res.data
			},
			async vehicleSelectOne(e) {
				const [err, res] = await vehicleSelectOne(e)
				if (err) return
				console.log(res)
				this.carInfo = res.data
				this.carInfo.labels = JSON.parse(this.carInfo.labels)
				this.carInfo.insuranceFile = JSON.parse(this.carInfo.insuranceFile)
				this.carInfo.businessFile = JSON.parse(this.carInfo.businessFile)
				this.carInfo.vehicleModelFiles = JSON.parse(this.carInfo.vehicleModelFiles)
				console.log(this.carInfo)
			},
			lookinfo() {
				if (this.planShow) {
					this.planShow = false
				} else {
					this.planShow = true
				}
			},

			next() {
				uni.navigateTo({
					url: './addCar?id=' + this.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fleetDetail {
		position: relative;

		/**
		 * 更改swiper提示点样式
		 */
		/deep/ .wx-swiper-dot {
			width: 16rpx;
			height: 16rpx;
		}

		/**
		 * 更改swiper提示点选中样式
		 */
		/deep/ .wx-swiper-dot-active {
			width: 32rpx;
			height: 16rpx;
			border-radius: 116rpx;
		}

		/**
		 * 更改swiper提示点位置,通过swiper-item的padding-bottom指定位置
		 */
		/deep/ .swiperIconPanel .wx-swiper-dots {
			bottom: 20rpx;
		}

		.swiperList {
			position: relative;
			width: 100%;

			.swiper {
				width: 100%;
				height: 390rpx;
				box-shadow: 0px 2px 0px 0px #eff0f3;

				.swiperItem {
					box-sizing: border-box;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.titlePanel {
			margin-top: 40rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;

			.title {
				font-size: 32rpx;
				font-weight: 700;
				color: #000000;
			}

			.text {
				font-size: 24rpx;
				font-weight: 400;
				color: #b2b2b2;
				margin-top: 10rpx;
			}

			.type {
				height: 34rpx;
				line-height: 34rpx;
				background: rgba(90, 126, 255, 0.10);
				border-radius: 4rpx;
				font-size: 16rpx;
				font-weight: 700;
				color: #5a7eff;
				letter-spacing: 0rpx;
				margin-top: 20rpx;
				margin-right: 20rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
			}

			.addType {
				background: rgba(90, 126, 255, 0.10);
				color: #999999;
			}

			.statusPanel {
				margin-top: 40rpx;
				padding-bottom: 40rpx;
				justify-content: space-between;

				.status {
					font-size: 32rpx;
					font-weight: 700;
					color: #000000;
				}

				.statusText {

					p {
						font-size: 32rpx;
						font-weight: 700;
						color: #5a7eff;
					}

					.cuIcon-right {
						font-size: 28rpx;
						margin-top: 4rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.line {
			width: 100%;
			height: 20rpx;
			background: #eff0f3;
		}

		.line-blue {
			width: 8rpx;
			height: 24rpx;
			background: #5a7eff;
			border-radius: 20rpx;
		}

		.rentPanel {
			height: 124rpx;
			padding-left: 12rpx;
			padding-right: 32rpx;
			justify-content: space-between;

			.title {
				font-size: 32rpx;
				font-weight: 700;
				color: #000000;
				margin-left: 12rpx;
			}

			.rentDetail {

				p {
					font-size: 32rpx;
					font-weight: 700;
					color: #5a7eff;
				}

				.cuIcon-right {
					font-size: 28rpx;
					margin-top: 4rpx;
					margin-left: 10rpx;
				}
			}
		}

		.carDetail,
		.carLicense,
		.carJiaoqiang,
		.carTrade {
			position: relative;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;

			.header {
				margin-left: -20rpx;

				p {
					font-size: 32rpx;
					font-weight: 700;
					color: #000000;
					margin-left: 12rpx;
				}
			}

			.content {
				margin-top: 40rpx;

				.carText {
					margin-top: 30rpx;
					justify-content: space-between;

					.title {
						font-size: 28rpx;
						font-weight: 400;
						color: #000000;
					}

					.text {
						font-size: 24rpx;
						font-weight: 400;
						color: #b2b2b2;
					}
				}

				.carText:first-child {
					margin-top: 0;
				}

				.carImg {
					margin-top: 40rpx;

					.fileImg {
						width: 160rpx;
						height: 160rpx;
						border-radius: 10rpx;
						overflow: hidden;
						margin-right: 16rpx;
						margin-bottom: 16rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
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

	.mask {
		background-color: black;
		opacity: 0.7;
		position: fixed;
		top: 0px;
		height: 100vh;
		width: 100%;

	}

	.frame {
		padding: 20rpx;
		position: fixed;
		top: 20vh;
		left: 10%;
		width: 80%;
		background-color: white;
		border-radius: 20rpx;
	}

	.frameBox {
		display: flex;
		align-items: center;
	}

	.frameTitle {
		width: 30%;
		color: #000000;
		font-weight: bold;
		font-size: 28rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
	}

	.frameTime {
		color: #B2B2B2;
		font-size: 24rpx;
	}

	.statusBox {}

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

	.day {
		width: 14.2%;
		text-align: center;
	}

	.dayBox {
		width: 100%;
		background-color: #EFF0F3;
	}

	.timecolorBox {
		height: 71rpx;
		width: 71rpx;
		border-radius: 10rpx;
		margin: 0rpx 20rpx;
		text-align: center;
		font-size: 28rpx;
	}

	.reserve {
		color: white;
		width: 80%;
		margin: auto;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
	}
</style>
