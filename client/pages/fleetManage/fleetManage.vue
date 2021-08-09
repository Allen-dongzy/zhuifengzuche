<template>
	<view class="fleetManage">
		<view class="flex sticky header">
			<view class="flex">
				<button type="default" class="flex-center btn" @click="add">新增+</button>
				<button type="default" class="flex-center btn rentBtn" @click="plan">租赁计划</button>
			</view>
			<view class="flex">
				<view class="flex screen" @click="showModal" data-target="DrawerModalR">
					<p>筛选</p>
					<text class="cuIcon-unfold"></text>
				</view>
				<view class="flex search" @click="search">
					<p>搜索</p>
					<text class="cuIcon-search"></text>
				</view>
			</view>
		</view>
		<view class="flex-center flex-wrap content">
			<view v-for="(item, index) in list" :key="index" class="panel" @click="carInfo(item.id)">
				<view class="flex titlePanel">
					<p class="title">{{item.carNumber}}</p>
					<p v-show="item.vehicleStatus==1" class="type">正常</p>
					<p v-show="item.vehicleStatus==2" class="type">异常</p>
					<p v-show="item.vehicleStatus==3" class="type">租赁中</p>
					<p v-show="item.vehicleStatus==4" class="type">预留中</p>
				</view>
				<p class="text">{{item.brandName}}丨{{item.gears}} {{item.capacity}}座 {{item.outputVolumeName}}</p>
				<view class="flex detail">
					<p class="oil" v-show="item.oil!=null">油量：62%</p>
					<p class="car">车龄：{{item.carAge}}</p>
				</view>
				<view v-show="item.vehicleStatus==3" class="flex-center line">
					<i></i>
				</view>
				<p class="name" v-show="item.vehicleStatus==3">使用人：张全蛋</p>
				<view class="flex timeText" v-show="item.vehicleStatus>2">
					<text class="cuIcon-countdown"></text>
					<p>05-25 14:48 至 05-30 14:48</p>
				</view>
			</view>
			<view class="loadmore">
				<tui-loadmore v-if="false" :index="2"></tui-loadmore>
				<tui-nomore v-else text="没有更多了"></tui-nomore>
			</view>
		</view>

		<view class="cu-modal drawer-modal justify-end" bindtouchmove='true'
			:class="(modalName=='DrawerModalR'?'show':'')" @click="hideModal">
			<view class="cu-dialog basis-lg" @click.stop="">
				<view class="flex status">
					<i></i>
					<p>状态</p>
				</view>

				<view class="flex flex-wrap statusList">
					<view v-for="(item,index) in carStatus" :key="index" @click="selectStatus(index)">
						<i v-if="item.status==false" class="flex-center">{{item.name}}</i>
						<i v-else class="flex-center blue-i">{{item.name}}</i>
					</view>
				</view>
				<view class="flex status">
					<i></i>
					<p>类别</p>
				</view>
				<view class="flex flex-wrap statusList">
					<view v-for="(item,index) in classesList" :key="index" @click="selectClasss(index)">
						<i v-if="item.status==false" class="flex-center">{{item.name}}</i>
						<i v-else class="flex-center blue-i">{{item.name}}</i>
					</view>
				</view>
				<view class="flex status">
					<i></i>
					<p>品牌</p>
				</view>
				<view class="flex flex-wrap statusList">
					<view v-for="(item,index) in brandList" :key="index" @click="selectBrand(index)">
						<i v-if="item.status==false" class="flex-center">{{item.name}}</i>
						<i v-else class="flex-center blue-i">{{item.name}}</i>
					</view>
				</view>
				<view class="flex btn">
					<button type="default" class="flex-center reset" @click="clear()">清空</button>
					<button type="default" class="flex-center submit" @click="sure()">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		vehiclePageQuery
	} from '@/apis/vehicle'
	import {
		vehicleBrandQueryAll
	} from '@/apis/vehicleBrand'
	import {
		vehicleCategoryQueryAll
	} from '@/apis/vehicleCategory'
	export default {
		data() {
			return {
				modalName: '',
				page: 1, //页码
				size: 10, //数量
				list: [], //数据组
				classesList: [], //类别数组
				carStatus: [{
					name: '全部',
					id: "",
					status: false,
				}, {
					name: '正常',
					id: 1,
					status: false,
				}, {
					name: '异常',
					id: 2,
					status: false,
				}, {
					name: '租赁中',
					id: 3,
					status: false,
				}, {
					name: '预留中',
					id: 4,
					status: false,
				}], //状态list
				brandList: [], //品牌列表
				statusId: '', //选择车辆状态id
				BrandId: '', //选择品牌id
				classId: '', //选择类别id

			}
		},
		onLoad() {
			
			this.getType() //车类型
			this.getBrand() //车品牌
		},
		onShow() {
			this.list=[]
			this.page=1
			this.getlist() //车list
		},
		methods: {
			//选择车状态
			selectStatus(e) {
				for (let i = 0; i < this.carStatus.length; i++) {
					this.carStatus[i].status = false
				}
				this.carStatus[e].status = true
				this.statusId = this.carStatus[e].id
			},
			//选择车类型
			selectClasss(e) {
				for (let i = 0; i < this.classesList.length; i++) {
					this.classesList[i].status = false
				}
				this.classesList[e].status = true
				this.classId = this.classesList[e].id
			},
			//选择车品牌
			selectBrand(e) {
				for (let i = 0; i < this.brandList.length; i++) {
					this.brandList[i].status = false
				}
				this.brandList[e].status = true
				this.BrandId = this.brandList[e].id
			},
			//品牌
			async getBrand() {
				const [err, res] = await vehicleBrandQueryAll()
				if (err) return
				console.log(res)
				for (let i = 0; i < res.data.length; i++) {
					res.data[i].status = false
				}
				this.brandList = res.data
			},

			//类别
			async getType() {
				const [err, res] = await vehicleCategoryQueryAll()
				if (err) return
				console.log(res)
				for (let i = 0; i < res.data.length; i++) {
					res.data[i].status = false
				}
				this.classesList = res.data
			},
			//获取列表
			async getlist() {
				let data = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await vehiclePageQuery(data)
				if (err) return
				console.log(res)
				if (res.data.list.length == 0) {
				
				} else {
					for (let i = 0; i < res.data.list.length; i++) {
						this.list.push(res.data.list[i])
					}
				}

			},
			//下拉刷新
			// onPullDownRefresh() {
			// 	this.page = 1
			// 	this.size = 10
			// 	this.list = []
			// 	this.getlist()
			// 	setTimeout(function() {
			// 		uni.stopPullDownRefresh();
			// 	}, 1000);
			// }, 
			// 上拉加载
			onReachBottom(e) {
				this.page = this.page + 1;
				this.getlist()
			},
			clear() {
				for (let i = 0; i < this.carStatus.length; i++) {
					this.carStatus[i].status = false
				}
				for (let i = 0; i < this.classesList.length; i++) {
					this.classesList[i].status = false
				}
				for (let i = 0; i < this.brandList.length; i++) {
					this.brandList[i].status = false
				}
			},
			async sure() {
				let data = {
					page: this.page,
					size: this.size,
					vehicleStatus: this.statusId,
					brandId: this.BrandId,
					categoryId: this.classId,
				}
				const [err, res] = await vehiclePageQuery(data)
				if (err) return
				console.log(res)
				this.list = res.data.list
				if (this.list.length == 0) {
					this.$toast("暂无数据")
				}

			},
			/**
			 * 显示筛选框
			 * @param {Object} e
			 */
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			/**
			 * 隐藏筛选框
			 * @param {Object} e
			 */
			hideModal(e) {
				this.modalName = ''
			},
			search() {
				uni.navigateTo({
					url: './fleetManageSearch',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			add() {
				uni.navigateTo({
					url: './addCar',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			plan() {
				uni.navigateTo({
					url: './hirePlan',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			carInfo(e) {
				uni.navigateTo({
					url: './fleetDetail?id=' + e,
					animationDuration: 200,
					animationType: 'pop-in'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fleetManage {
		position: relative;

		/**
		 * 解决抽屉样式冲突
		 */
		/deep/ .cu-modal,
		.drawer-modal {
			display: flex !important;
		}

		/**
		 * 设置抽屉背景颜色
		 */
		/deep/ .cu-dialog {
			background-color: #FFFFFF;
			overflow: auto;
		}

		.header {
			padding-top: 22rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
			padding-bottom: 40rpx;
			justify-content: space-between;
			background-color: #FFFFFF;

			.btn {
				width: 172rpx;
				height: 48rpx;
				border: 2rpx solid #5a7eff;
				border-radius: 12rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #5a7eff;
				background: none;
			}

			.rentBtn {
				margin-left: 10rpx;
			}

			.screen,
			.search {

				p {
					font-size: 28rpx;
					font-weight: 400;
					color: #000000;
				}

				text {
					font-size: 28rpx;
					margin-left: 10rpx;
					margin-top: 6rpx;
				}
			}

			.search {
				margin-left: 32rpx;
			}
		}

		.content {

			.panel {
				width: 670rpx;
				min-height: 220rpx;
				border-radius: 20rpx;
				box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(114, 141, 244, 0.25);
				padding: 40rpx;
				margin-bottom: 30rpx;

				.titlePanel {
					justify-content: space-between;

					.title {
						font-size: 28rpx;
						font-weight: 700;
						color: #000000;
					}

					.type {
						font-size: 28rpx;
						font-weight: 700;
						color: #5a7eff;
						letter-spacing: 0rpx;
					}
				}

				.text {
					margin-top: 12rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
				}

				.detail {
					margin-top: 20rpx;

					.oil {
						font-size: 24rpx;
						font-weight: 400;
						color: #000000;
						letter-spacing: 0rpx;
						margin-right: 60rpx;
					}

					.car {
						font-size: 24rpx;
						font-weight: 400;
						color: #000000;
						letter-spacing: 0rpx;

					}
				}

				.line {
					width: 100%;
					margin-top: 30rpx;

					i {
						width: 590rpx;
						border-bottom: 2rpx dashed #999999;
					}
				}

				.name {
					margin-top: 30rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #000000;
					letter-spacing: 0rpx;
				}

				.timeText {
					margin-top: 10rpx;

					.cuIcon-countdown {
						font-size: 30rpx;
					}

					p {
						margin-left: 10rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #000000;
						letter-spacing: 0rpx;
					}
				}
			}

			.panel:first-child {
				margin-top: 10rpx;
			}
		}

		.cu-modal {

			.status {
				margin-top: 40rpx;
				padding-left: 40rpx;
				padding-right: 40rpx;

				i {
					width: 8rpx;
					height: 24rpx;
					background: #5a7eff;
					border-radius: 20rpx;
				}

				p {
					font-size: 32rpx;
					font-weight: 700;
					color: #000000;
					letter-spacing: 0rpx;
					margin-left: 10rpx;
				}
			}

			.statusList {
				padding-left: 40rpx;
				margin-top: 40rpx;
				justify-content: flex-start;

				i {
					min-width: 112rpx;
					height: 52rpx;
					background: #eff0f3;
					border-radius: 128rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #b2b2b2;
					letter-spacing: 0rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					padding-left: 20rpx;
					padding-right: 20rpx;
				}

				i:first-child {
					margin-left: 0;
				}

				.blue-i {
					background: #5A7EFF;
					color: #FFFFFF;
				}
			}

			.btn {
				justify-content: space-between;
				padding-left: 40rpx;
				padding-right: 40rpx;
				width: 100%;
				height: 150rpx;
				position: sticky;
				bottom: 0;
				background-color: #FFFFFF;
				border-top: 2rpx solid rgba(0, 0, 0, .2);

				.reset {
					width: 160rpx;
					height: 80rpx;
					background: none;
					border: 2rpx solid #b2b2b2;
					border-radius: 52rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #b2b2b2;
				}

				.submit {
					width: 160rpx;
					height: 80rpx;
					background: #5a7eff;
					border-radius: 52rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #ffffff;
				}
			}
		}
	}
</style>
