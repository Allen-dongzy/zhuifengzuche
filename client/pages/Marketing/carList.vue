<template>
	<view class="fleetManage">
		<view class="flex sticky header" v-if="search==false">
			<view class="flex" style="width: 100%;">
				<view class="flex screen" style="text-align: left" @click="showModal" data-target="DrawerModalR">
					<image style="height: 28rpx;width: 28rpx;" :src="$util.fileUrl('/loudou.png')" mode=""></image>
					<p style="margin-left: 20rpx;">筛选</p>
					<text class="cuIcon-unfold"></text>
				</view>
				<view class="flex search" style="text-align: right" @click="showSearch">
					<p style="margin-left: 61%;">搜索</p>
					<text class="cuIcon-search"></text>
				</view>
			</view>
		</view>
		
		<!-- 搜索 -->
		<view class="topNav" style="color: #8E8E93;font-size: 30rpx;" v-if="search==true">
			<input type="text"
				style="background-color:#EFF0F3;height: 70rpx;width: 500rpx;border-radius: 50rpx;padding-left: 20rpx;"
				value="" />
			<view style="margin-left: 20rpx;" @click="showSearch">取消</view>
		</view>
		
		<!-- 侧边弹出框 -->
		<view class="cu-modal drawer-modal justify-end" bindtouchmove='true'
			:class="(modalName=='DrawerModalR'?'show':'')" @click="hideModal">
			<view class="cu-dialog basis-lg" @click.stop="">
				<view class="flex status">
					<i></i>
					<p>排挡</p>
				</view>
				<view class="flex flex-wrap statusList">
					<view v-for="(item,index) in stallList" @click="selectStall(index)">
						<i v-if="item.status==false" class="flex-center">{{item.text}}</i>
						<i v-else class="flex-center blue-i">{{item.text}}</i>
					</view>
				</view>
				<view class="flex status">
					<i></i>
					<p>座位</p>
				</view>
				<view class="flex flex-wrap statusList">
					<view v-for="(item,index) in seatList" @click="selectSeat(index)">
						<i v-if="item.status==false" class="flex-center">{{item.text}}座</i>
						<i v-else class="flex-center blue-i">{{item.text}}座</i>
					</view>
				</view>
				<view class="flex status">
					<i></i>
					<p>品牌</p>
				</view>
				<view class="flex flex-wrap statusList">
					<!-- <i class="flex-center blue-i">玛莎拉蒂-总裁</i> -->
					<view v-for="(item, index) in brandList" :key="index" @click="selectBrand(index)">
						<i v-if="item.status==false" class="flex-center">{{item.name}}</i>
						<i v-else class="flex-center blue-i">{{item.name}}</i>
					</view>

				</view>
				<view class="flex btn">
					<button type="default" class="flex-center reset" @click="clearAll">清空</button>
					<button type="default" class="flex-center submit" @click="sureSearch">确定</button>
				</view>
			</view>
		</view>
		<!-- 列表 -->
			<view class="box" v-for="(item,index) in carList">
					<view class="content" @click="lookInfo(item)">
						<view style="font-size: 28rpx;margin-top: 40rpx;">{{item.carNumber}}</view>
						<view style="margin-top: 12rpx;">{{item.brandName}} {{item.modelName}}</view>
						<view class="flexBox">
							<view class="iconBox"  v-for="(itemy,indexy) in item.platformVoList" v-show="itemy.thirdStatus==1" >{{itemy.thirdName}}</view>
						</view>
					</view>
				</view>
	</view>
</template>

<script>
	import {
		vehicleBrandQueryAll
	} from '@/apis/vehicleBrand'
	import {
		otaPageQuery
	} from '@/apis/vehicle'
	
	export default {
		data() {
			return {
				modalName: '',
				search: false,
				page:1,
				size:10,
				brandList: [], //品牌数组
				brandId: '', //品牌Id
				seatId: '', //座位Id
				stallId: '', //排挡Id
				seatList: [{
					text: '2',
					status: false
				},{
					text: '5',
					status: false
				},{
					text: '6',
					status: false
				}, {
					text: '7',
					status: false
				}, {
					text: '9',
					status: false
				}], // 座位数列表
				stallList: [{
					text: '全部',
					status: false
				}, {
					text: '手动',
					status: false
				}, {
					text: '自动',
					status: false
				}], // 排档列表
				carList:[],//车辆列表
			}
		},
		onLoad() {
		
		},
		onShow() {
			this.otaPageQuery()	
			this.getBrand()
		},
		methods: {
		async	otaPageQuery(){
			let data={
				page:this.page,
				size:this.size,
			}
				const [err,res] = await otaPageQuery(data)
				if(err) return
				this.carList=res.data.list
				
			},
			//品牌
			async getBrand() {
				const [err, res] = await vehicleBrandQueryAll()
				if (err) return
				console.log(res)
				this.brandList = res.data
				for (let i = 0; i < this.brandList.length; i++) {
					this.brandList[i].status = false
				}
			},
			//选择排挡
			selectStall(e) {
				console.log(e)
				for (let i = 0; i < this.stallList.length; i++) {
					this.stallList[i].status = false
				}
				this.stallId = this.stallList[e].text
				this.stallList[e].status = true
			},
			//选择座位数
			selectSeat(e) {
				for (let i = 0; i < this.seatList.length; i++) {
					this.seatList[i].status = false
				}
			
				this.seatId = this.seatList[e].text
			
				this.seatList[e].status = true
			},
			//选择品牌
			selectBrand(e) {
				console.log(e)
				for (let i = 0; i < this.brandList.length; i++) {
					this.brandList[i].status = false
				}
				this.brandList[e].status = true
				this.$forceUpdate()
				this.brandId = this.brandList[e].id
			},
			//清空
			clearAll() {
				for (let i = 0; i < this.brandList.length; i++) {
					this.brandList[i].status = false
				}
				for (let i = 0; i < this.seatList.length; i++) {
					this.seatList[i].status = false
				}
				for (let i = 0; i < this.stallList.length; i++) {
					this.stallList[i].status = false
				}
			},
			//确定
			async sureSearch() {
				if (this.stallId === "全部") {
					this.stallId = ""
				}
				let data = {
					page: this.page,
					size: this.size,
					brandId: this.brandId,
					capacity: this.seatId,
					gears: this.stallId,
				}
				const [err, res] = await otaPageQuery(data)
				if (err) return
				console.log(res)
				this.$toast('查询成功')
				this.list = res.data.list
			},
			showSearch() {
				if (this.search) {
					this.search = false

				} else {
					this.search = true
					this.showStuse = false
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
			lookInfo(e) {
				
				uni.navigateTo({
					url: './otaInfo?obj='+JSON.stringify(e),
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			
	
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




			.screen,
			.search {
				width: 50%;

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
				border-top: 1rpx solid rgba(0, 0, 0, .2);
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

	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 48rpx;
	}
	.box {
			border: 2rpx solid rgba(114, 141, 244, 0.25);
			height: 230rpx;
			width: 90%;
			margin: auto;
			border-radius: 30rpx;
			color: #000000;
			margin-top: 40rpx;
		}
	
		.content {
			width: 90%;
			margin: auto;
		}
	
		.flexBox {
			display: flex;
			align-items: center;
			margin-top: 30rpx;
		}
	
		.iconBox {
			margin-right: 20rpx;
			border-radius: 5rpx;
			background-color: rgba(90, 126, 255, 0.1);
			height: 34rpx;
			width: 80rpx;
			line-height: 34rpx;
			text-align: center;
			font-size: 16rpx;
			color: #5A7EFF;
		}
</style>
