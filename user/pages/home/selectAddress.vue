<template>
	<view class="select-address">
		<view class="search-bar">
			<view v-show="!searchKey" class="input" @click="toggleSearchBox">
				<image class="icon-search" :src="`${ossUrl}/common/search.png`"></image>
				<text>{{keyword || '景点、地址寻找附件送车点'}}</text>
			</view>
			<view v-show="searchKey" class="search-box">
				<view class="search-content">
					<image class="icon-search" :src="`${ossUrl}/common/search.png`"></image>
					<input type="text" placeholder="景点、地址寻找附件送车点" v-model="keyword" @input="keywordChange">
					<image v-show="keyword" class="icon-delete" :src="`${ossUrl}/common/delete.png`"
						@click="clearKeyword"></image>
				</view>
				<view class="btn" @click="toggleSearchBox">取消</view>
			</view>
		</view>
		<view class="search-bar-mat"></view>
		<!-- 筛选列表 -->
		<view v-show="!searchKey" class="classify" :style="{height: `${windowHeight - searchHeight - 5}px`}">
			<scroll-view class="class" :scroll-y="true">
				<view :class="['item', {'ac': index === acIndex}]" v-for="(item, index) in areaList" :key="index"
					@click="tapClass(index)">{{item.name}}</view>
			</scroll-view>
			<scroll-view class="list" :scroll-y="true" @scrolltolower="scrollToBottom">
				<view class="address-item" v-for="(item, index) in carAddressList" :key="index"
					@click="selectAddress(index)">
					<view class="caption">{{item.name}}</view>
					<view class="description">{{item.address}}
						<view class="arrow"></view>
					</view>
				</view>
				<uni-load-more :status="dataStatus" />
			</scroll-view>
		</view>
		<!-- 搜索列表 -->
		<view v-show="searchKey" class="address-list">
			<view class="address-item" v-for="(item, index) in carAddressList" :key="index"
				@click="selectAddress(index)">
				<view class="caption">{{item.name}}</view>
				<view class="description">{{item.address}}
					<view class="arrow"></view>
				</view>
			</view>
		</view>
		<uni-load-more v-show="searchKey" :status="dataStatus" />
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		regionCityFindDeliveryArea
	} from '@/apis/regionCity'
	import {
		deliveryFindDeliveryPage
	} from '@/apis/delivery'
	import {
		listManager
	} from '@/utils/uni-tools'
	import {
		debounce
	} from '@/utils/tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl,
				city: {}, // 当前城市
				areaList: [], // 区域列表
				carAddressList: [], // 送/还车点列表
				page: 1,
				size: 10,
				requestKey: true,
				dataStatus: '', // more loading noMore noData
				addressMode: '', // 地址模式
				acIndex: 0, // 活动项
				searchKey: false, // 搜索开关
				searchHeight: 0, // 搜索框高度
				keyword: '' // 关键字
			}
		},
		computed: {
			// 窗口高度
			...mapState('app', ['windowHeight']),
			// city 当前城市
			...mapState('city', ['currentCity']),
		},
		onLoad(e) {
			this.addressMode = e.addressMode
			this.city = JSON.parse(e.city)
			this.regionCityFindDeliveryArea()
			if (!this.$storage.get('token')) this.acIndex = 1
		},
		mounted() {
			this.setSystemInfo()
			this.getSearchHeight()
		},
		methods: {
			// app 设置用户信息
			...mapActions('app', ['setSystemInfo']),
			// 根据城市获取送车点区域
			async regionCityFindDeliveryArea() {
				const params = {
					cityCode: this.city.code
				}
				const [err, res] = await regionCityFindDeliveryArea(params)
				if (err) return
				this.areaList = res.data
				this.deliveryFindDeliveryPage()
			},
			// 触底加载
			scrollToBottom() {
				if (!this.requestKey) return
				this.page++
				this.deliveryFindDeliveryPage()
			},
			// 切换搜索容器
			toggleSearchBox() {
				this.searchKey = !this.searchKey
				this.init()
				this.deliveryFindDeliveryPage()
			},
			// 关键词触发
			keywordChange: debounce(function() {
				this.init()
				this.deliveryFindDeliveryPage()
			}),
			// 清除关键字
			clearKeyword() {
				this.keyword = ''
				this.deliveryFindDeliveryPage()
			},
			// 初始化
			init() {
				this.page = 1
				this.requestKey = true
				this.carAddressList = []
			},
			// 获取详细送车点列表
			async deliveryFindDeliveryPage() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size,
					cityCode: this.city.code,
					areaCode: this.areaList[this.acIndex].areaCode,
					name: this.keyword,
					lat: this.areaList[this.acIndex].lat,
					lon: this.areaList[this.acIndex].lng
				}
				const [err, res] = await deliveryFindDeliveryPage(params)
				if (err) return
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.requestKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.carAddressList = [...this.carAddressList, ...res.data.list]
			},
			// 获取搜索框高度
			getSearchHeight() {
				const query = uni.createSelectorQuery().in(this)
				query.select('.search-bar').boundingClientRect(data => {
					this.searchHeight = data.height
				}).exec();
			},
			// 切换分类
			tapClass(index) {
				this.acIndex = index
				this.init()
				this.deliveryFindDeliveryPage()
			},
			// 选择地址
			selectAddress(index) {
				this.$open('/pages/home/store', {
					deliveryId: this.carAddressList[index].id,
					name: this.carAddressList[index].name,
					address: this.carAddressList[index].address,
					lat: this.carAddressList[index].lat,
					lon: this.carAddressList[index].lon,
					cacheAddressMode: this.addressMode,
					cacheAddress: JSON.stringify(this.carAddressList[index])
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.select-address {
		.search-bar {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9;
			@include box(100%, 104rpx, #fff);
			padding: 20rpx 32rpx;

			.input {
				@include box-h(64rpx, #f4f5f9);
				@include flex-center;
				border-radius: 50rpx;
				@include font-set(28rpx, rgba(0, 0, 0, .5));

				.icon-search {
					@include box(34rpx, 36rpx);
					margin-right: 10rpx;
				}
			}

			.search-box {
				@include flex-row();

				.search-content {
					@include box(602rpx, 64rpx, #EFF0F3);
					@include flex-row();
					border-radius: 126rpx;
					padding: 0 21rpx;

					.icon-search {
						@include box(34rpx, 36rpx);
					}

					input {
						@include box(500rpx, 100%);
						@include font-set(28rpx, rgba(0, 0, 0, .5));
						padding: 0 15rpx;
					}

					.icon-delete {
						@include square(28rpx);
					}
				}

				.btn {
					@include font-set(30rpx, #8E8E93, 500);
					margin-left: 24rpx;
				}
			}
		}

		.search-bar-mat {
			height: 104rpx;
		}

		.classify {
			@include box-w();
			@include flex-row(space-between, flex-start);
			margin-top: 10rpx;
			padding: 0 32rpx;

			.class {
				@include box(170rpx, 100%);
				border-right: 1px solid #EFF0F3;

				.item {
					@include font-set(28rpx, #000, 700);
					@include text-one;
					line-height: 40rpx;
					margin-bottom: 50rpx;

					&.ac {
						border-right: 8rpx solid #5A7EFF;
					}
				}

				// 滚动条轨道样式
				& ::-webkit-scrollbar {
					width: 0;
					height: 0;
					background-color: transparent;
				}
			}

			.list {
				@include box(514rpx, 100%);
				padding-left: 10rpx;
				transform: translateY(-24rpx);

				// 滚动条轨道样式
				& ::-webkit-scrollbar {
					width: 0;
					height: 0;
					background-color: transparent;
				}
			}
		}

		.address-list {
			@include box-w();
			padding: 0 32rpx;
		}

		.address-item {
			@include box(100%, 142rpx);
			@include flex-col(center, flex-start);

			.caption {
				@include font-set(28rpx, #000, 500);
			}

			.description {
				@include flex-row();
				@include font-set(24rpx, #b2b2b2);
				line-height: 40rpx;
				margin-top: 10rpx;

				.arrow {
					@include square(14rpx);
					border: 1px solid rgba(0, 0, 0, 0.30);
					transform: rotate(45deg);
					border-bottom: 0;
					border-left: 0;
					margin-left: 10rpx;
				}
			}

			&~.address-item {
				border-top: 1px solid #EFF0F3;
				line-height: 34rpx;
			}
		}
	}
</style>
