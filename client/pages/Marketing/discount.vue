<template>
	<view class="manage">
		<view class="home-bar" v-if="!searchMode">
			<view class="function-box" style="width: 100%;">
				<view class="sel-box" style="width: 75%;" @tap="showModal" data-target="DrawerModalR">
					<text>筛选</text>
					<image :src="`${filePath}/vehicleManage/down.png`"></image>
				</view>
				<view class="search-box" @tap="tapHeader">
					<text>搜索</text>
					<image :src="`${filePath}/vehicleManage/search.png`"></image>
				</view>
			</view>
		</view>
		<view class="search-bar" v-if="searchMode">
			<view class="serach-box">
				<image class="search-icon" :src="`${filePath}/vehicleManage/search-big.png`"></image>
				<input @input="onInput" v-model="searchVal" type="text" placeholder="请输入车型" placeholder-class="input" style="background-color:#E6E6EA ;">
				<image class="clear" :src="`${filePath}/vehicleManage/clear.png`"></image>
			</view>
			<view class="cancel" @tap="tapHeader">取消</view>
		</view>
		<view class="header-mat"></view>
		
		<view class="manage-list">
			<view class="manage-item" v-for="(item, index) in list" :key="index" @tap="goDetail(item.id)">
				<view style="display: flex;margin:30rpx 0rpx 15rpx;">
					<view class="">{{item.brandName}}  {{item.name}}  {{item.categoryName}}</view>
					<view style="background-color: #FFA05B;margin-left: 20rpx;" class="iconBox">租7送2</view>
					<!-- <view style="background-color: #FFA05B;" class=iconBox>暂未设置</view> -->
				</view>
				
				
				<view style="margin:30rpx 0rpx 15rpx">郑家院子追风1店</view>
			</view>
			
		</view>
		
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
					<p>优惠价</p>
				</view>
				<view class="flex flex-wrap statusList">
					<view v-for="(item,index) in giveList" @click="selectGive(index)">
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
		
		
	</view>
</template>

<script>
	import {
		open,
	} from '@/utils/uni-tools.js'
	import config from '@/common/js/config'

	import {
		vehicleModelPageQuery
	} from '@/apis/vehicleModel'

	import {
		vehicleBrandQueryAll
	} from '@/apis/vehicleBrand'

	import {
		debounce
	} from '@/utils/tools';


	export default {
		data() {
			return {
				filePath: config.filePath,
				searchMode: false, // 是否为搜索模式
				modalName: '', // 模态框名称
				list: [], //数据列表
				page: 1, //页码
				size: 10, //数量
				brandId: '', //品牌Id
				seatId: '', //座位Id
				stallId: '', //排挡Id
				brandList: [], //品牌数组
				giveList:[{text:'全部',status:false},{text:'已设置',status:false},{text:'未设置',status:false}],//优惠价数组
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
				searchVal: '', //搜索关键词
			}
		},
		onLoad() {

		},
		onShow() {
			this.list=[]
			this.getlist()
			this.getBrand()
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


			//获取 车型列表
			async getlist() {
				let data = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await vehicleModelPageQuery(data)
				if (err) return
				console.log(res)
				// this.list = res.data.list
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

			// 切换头部
			tapHeader() {
				this.searchMode = !this.searchMode
			},
	
			// 前往详情
			goDetail(index) {
				console.log(index)
				open('/pages/vehicleManage/detail?id=' + index)
			},
			// 显示筛选框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 隐藏筛选框
			hideModal(e) {
				this.modalName = ''
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
			//选择优惠价
			selectGive(e) {
				console.log(e)
				for (let i = 0; i < this.giveList.length; i++) {
					this.giveList[i].status = false
				}
				// this.stallId = this.giveList[e].text
				this.giveList[e].status = true
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
				const [err, res] = await vehicleModelPageQuery(data)
				if (err) return
				console.log(res)
				this.$toast('查询成功')
				this.list = res.data.list
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/_mixin.scss';

	.manage {
		.home-bar,
		.search-bar {
			position: fixed;
			@include box(100%, 90rpx);
			@include flex-row(space-between);
			padding: 0 32rpx;



			.function-box {
				@include flex-row(flex-end);
				@include box-h();

				&>view {
					margin-left: 30rpx;
					@include flex-row();
					@include box-h();
				}

				text {
					@include font-set(28rpx, #000);
				}

				image {
					@include square(28rpx);
					margin-left: 10rpx;
				}
			}

			.serach-box {
				@include box(602rpx, 64rpx, #E6E6EA);
				border-radius: 126rpx;
				@include flex-row(space-between);
				padding: 0 22rpx;

				.search-icon {
					@include square(40rpx);
				}

				input {
					flex-grow: 1;
					padding-left: 10rpx;
					padding-right: 10rpx;
					@include font-set(28rpx, #b2b2b2);
				}

				/deep/ .input {
					@include font-set(28rpx, #b2b2b2);
				}

				.clear {
					@include square(32rpx);
				}
			}

			.cancel {
				@include font-set(30rpx, #8E8E93, 500);
			}
		}

		.header-mat {
			height: 90rpx;
		}

		.manage-list {
			@include box-w(100%);
			padding: 0 32rpx;

			.manage-item {
				// @include box-h(118rpx);
				@include font-set(28rpx, #000);
				// @include flex-row();

				&~.manage-item {
					border-top: 1px solid #EFF0F3;
				}
			}
		}

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
	.iconBox{
		width: 100rpx;
		height:40rpx;
		line-height: 40rpx;
		border-radius: 10rpx;
		text-align: center;
		color: white;
		font-size: 22rpx;
	}
</style>
