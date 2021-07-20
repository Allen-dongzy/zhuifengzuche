<template>
	<view class="select-cart">
		<view class="header">
			<view class="filter" @click="showModal" data-target="DrawerModalR">
				<image class="icon" :src="`${filePath}/loudou.png`"></image>
				筛选
			</view>
			<view class="search-box">
				<image class="icon" :src="`${filePath}/fangdajing.png`"></image>
				<input type="text" v-model="keyword" placeholder="搜索" @input="keywordChange" />
			</view>
		</view>
		<view class="header-mat"></view>
		<view class="list">
			<view class="card" v-for="(item, index) in list" :key="index" @click="selectCart(index)">
				<view class="caption">{{item.brandName}}({{item.carNumber}})</view>
				<view class="description value">{{item.gears}}/{{item.outputVolumeName}}/{{item.capacity}}</view>
				<view v-show="item.oil" class="oil-bar bar">
					<view class="title">油量</view>
					<view class="value">{{item.oil}}</view>
				</view>
				<view class="cart-year-bar bar">
					<view class="title">车龄</view>
					<view class="value">{{item.carAge}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="dataStatus" />
		<view class="cu-modal drawer-modal justify-end" bindtouchmove='true'
			:class="(modalName=='DrawerModalR'?'show':'')" @click="hideModal">
			<view class="cu-dialog basis-lg" @click.stop="">
				<view class="flex status">
					<view class="label"></view>
					<view class="name">状态</view>
				</view>
				<view class="flex flex-wrap statusList">
					<view v-for="(item,index) in carStatusList" :key="index" @click="selectStatus(index)">
						<text :class="['flex-center', {'blue-i': carStatusIndex === index}]">{{item.name}}</text>
					</view>
				</view>
				<view class="flex status">
					<view class="label"></view>
					<view class="name">类别</view>
				</view>
				<view class="flex flex-wrap statusList">
					<view v-for="(item,index) in classesList" :key="index" @click="selectClasss(index)">
						<text :class="['flex-center', {'blue-i': classesIndex === index}]">{{item.name}}</text>
					</view>
				</view>
				<view class="flex status">
					<view class="label"></view>
					<view class="name">品牌</view>
				</view>
				<view class="flex flex-wrap statusList">
					<view v-for="(item,index) in brandList" :key="index" @click="selectBrand(index)">
						<text :class="['flex-center', {'blue-i': brandIndex === index}]">{{item.name}}</text>
					</view>
				</view>
				<view class="flex btn">
					<button type="default" class="flex-center reset" @click="clear">清空</button>
					<button type="default" class="flex-center submit" @click="confirm">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/common/js/config'
	import {
		debounce
	} from '@/utils/tools'
	import {
		vehicleQueryAll
	} from '@/apis/vehicle'
	import {
		vehicleBrandQueryAll
	} from '@/apis/vehicleBrand'
	import {
		vehicleCategoryQueryAll
	} from '@/apis/vehicleCategory'
	import {
		listManager
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				filePath: config.filePath, // 文件路径
				keyword: '', // 搜索关键字
				modalName: '', // 模态框名字
				page: 1, //页码
				size: 10, //数量
				requesKey: true,
				dataStatus: '',
				list: [], // 列表
				classesList: [], //类别数组
				classesIndex: -1, // 类别
				carStatusList: [{
					name: '全部',
					id: ""
				}, {
					name: '正常',
					id: 1
				}, {
					name: '异常',
					id: 2
				}, {
					name: '租赁中',
					id: 3
				}, {
					name: '预留中',
					id: 4
				}], //状态list
				carStatusIndex: -1, // 状态
				brandList: [], //品牌列表
				brandIndex: -1 // 品牌
			}
		},
		onLoad() {
			this.getlist()
			this.getType()
			this.getBrand()
		},
		onReachBottom() {
			if (!this.requesKey) return
			this.page++
			this.getlist()
		},
		methods: {
			// 显示模态框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 关闭模态框
			hideModal(e) {
				this.modalName = ''
			},
			// 关键字改变
			keywordChange: debounce(function(e) {
				this.init()
				this.getlist()
			}),
			// 条件筛选
			confirm() {
				this.hideModal()
				this.init()
				this.getlist()
			},
			// 条件清空
			clear() {
				this.carStatusIndex = -1
				this.classesIndex = -1
				this.brandIndex = -1
				this.hideModal()
				this.init()
				this.getlist()
			},
			// 选择状态
			selectStatus(e) {
				this.carStatusIndex = e
			},
			// 选择类别
			selectClasss(e) {
				this.classesIndex = e
			},
			// 选择品牌
			selectBrand(e) {
				this.brandIndex = e
			},
			//品牌
			async getBrand() {
				const [err, res] = await vehicleBrandQueryAll()
				if (err) return
				this.brandList = res.data
			},
			//类别
			async getType() {
				const [err, res] = await vehicleCategoryQueryAll()
				if (err) return
				this.classesList = res.data
			},
			//获取列表
			async getlist() {
				this.dataStatus = 'loading'
				const data = {
					pageNum: this.page,
					pageSize: this.size,
					searchField: this.keyword,
					status: this.carStatusIndex >= 0 ? this.carStatusList[this.carStatusIndex].id : '',
					categoryId: this.classesIndex >= 0 ? this.classesList[this.classesIndex].id : '',
					brandId: this.brandIndex >= 0 ? this.brandList[this.brandIndex].id : ''
				}
				const [err, res] = await vehicleQueryAll(data)
				if (err) {
					this.dataStatus = 'noData'
					return
				}
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data, this.page, this.size)
				this.requesKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.list = [...this.list, ...res.data]
			},
			// 选择车辆
			selectCart(index) {
				uni.$emit('selectCart', {
					cartId: this.list[index].id,
					cartName: `${this.list[index].brandName}(${this.list[index].carNumber})`
				})
				this.$close()
			},
			// 初始化
			init() {
				this.page = 1
				this.requesKey = true
				this.list = []
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
		background-color: #EFF0F3;
	}

	.select-cart {

		/**
		 * 解决抽屉样式冲突
		 */
		/deep/ .cu-modal,
		.drawer-modal {
			display: flex !important;
		}

		.cu-modal {

			.status {
				margin-top: 40rpx;
				padding-left: 40rpx;
				padding-right: 40rpx;

				.label {
					width: 8rpx;
					height: 24rpx;
					background: #5a7eff;
					border-radius: 20rpx;
				}

				.name {
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

				text {
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

				text:first-child {
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

		.header {
			position: fixed;
			z-index: 9;
			@include box-w(100%, #EFF0F3);
			@include flex-row(space-between);
			padding: 40rpx;

			.filter {
				@include flex-row();
				@include font-set(28rpx, #000);
				line-height: 40rpx;

				.icon {
					@include square(28rpx);
					margin-right: 10rpx;
				}
			}

			.search-box {
				@include box(536rpx, 64rpx, #fff);
				@include flex-row();
				padding: 18rpx 20rpx;
				border-radius: 8rpx;
				box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25);

				.icon {
					@include square(28rpx);
				}

				input {
					flex-grow: 1;
					margin-left: 10rpx;
				}
			}
		}

		.header-mat {
			height: 144rpx;
		}

		.list {
			padding: 0 40rpx;

			.card {
				@include box-w(100%, #fff);
				border-radius: 20rpx;
				box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25);
				padding: 40rpx;

				&~.card {
					margin-top: 40rpx;
				}

				.value {
					@include font-set(24rpx, #999);
					line-height: 34rpx;
				}

				.caption {
					@include font-set(28rpx, #000, 500);
					@include text-one;
					line-height: 40rpx;
				}

				.description {
					margin-top: 10rpx;
					@include text-one;
					margin-bottom: 30rpx;
				}

				.bar {
					@include flex-row(space-between);

					.title {
						@include font-set(24rpx, #000);
						line-height: 34rpx;
					}
				}
			}
		}
	}
</style>
