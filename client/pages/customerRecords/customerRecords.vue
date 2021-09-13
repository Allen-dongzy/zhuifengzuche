<template>
	<view class="">
		<view class="box">
			<view class="home-bar" v-if="!searchMode">
				<view class="add-label" @click="$open('/pages/customerRecords/addCustomer')">
					新增+
				</view>
				<view class="function-box">
					<view class="search-box" @click="tapHeader">
						<text>搜索</text>
						<image :src="`${filePath}/vehicleManage/search.png`"></image>
					</view>
				</view>
			</view>
			<view class="search-bar" v-if="searchMode">
				<view class="serach-box">
					<image class="search-icon" :src="`${filePath}/vehicleManage/search-big.png`"></image>
					<input type="text" placeholder="请输入车牌号" placeholder-class="input" v-model="keyword" style="background-color:#E6E6EA ;"
						@input="inputSearch">
					<image class="clear" :src="`${filePath}/vehicleManage/clear.png`" @click="clearSearch"></image>
				</view>
				<view class="cancel" @click="tapHeader">取消</view>
			</view>
			<view class="header-mat"></view>
			<view class="list">
				<view class="box-item" v-for="(item, index) in list" :key="index">
					<view class="flexBox">
						<view class="blackText">{{item.carNumber}}</view>
						<view class="redText">¥{{item.amount}}</view>
					</view>
					<view class="flexBox">
						<view class="grayText">{{item.vehicleModelName}}</view>
					</view>
					<view class="flexBox">
						<view class="name">{{item.name}}</view>
						<view class="time">{{item.collectionTime}} - {{item.giveBackTime}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="dataStatus" />
		</view>
	</view>
</template>

<script>
	import config from '@/common/js/config'
	import {
		recordsPageQuery
	} from '@/apis/customer'
	import {
		mapState
	} from 'vuex'
	import {
		listManager
	} from '@/utils/uni-tools'
	import {
		debounce
	} from '@/utils/tools'

	export default {
		data() {
			return {
				filePath: config.filePath,
				searchMode: false, // 是否为搜索模式
				modalName: '', // 模态框名称
				keyword: '', // 关键字
				list: [], // 列表
				dataStatus: 'noData', // more loading noMore noData
				requestKey: true,
				page: 1,
				size: 10
			}
		},
		computed: {
			//  user模式 门店id
			...mapState('user', ['shopId'])
		},
		onLoad() {
			this.recordsPageQuery()
			this.eventListener()
		},
		onReachBottom() {
			if (!this.requestKey) return
			this.page++
			this.recordsPageQuery()
		},
		methods: {
			// 切换头部
			tapHeader() {
				this.searchMode = !this.searchMode
			},
			// 搜索
			inputSearch: debounce(function() {
				this.init()
				this.recordsPageQuery()
			}),
			// 初始化
			init() {
				this.page = 1
				this.requestKey = true
				this.list = []
			},
			// 清空关键字
			clearSearch() {
				this.keyword = ''
				this.init()
				this.recordsPageQuery()
			},
			// 查询记录
			async recordsPageQuery() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size,
					shopId: this.shopId,
					search: this.keyword
				}
				const [err, res] = await recordsPageQuery(params)
				if (err) return
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.dataStatus = dataStatus
				this.requestKey = requestKey
				if (!isRender) return
				this.list = [...this.list, ...res.data.list]
			},
			// 监听
			eventListener() {
				uni.$on('refreshEvaluation', () => {
					this.init()
					this.recordsPageQuery()
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.box {
		width: 100%;

		.home-bar,
		.search-bar {
			position: fixed;
			@include box(100%, 90rpx);
			@include flex-row(space-between);
			padding: 0 32rpx;

			.add-label {
				@include box(172rpx, 48rpx);
				border-radius: 12rpx;
				border: 1px solid #5a7eff;
				@include flex-center;
				@include font-set(24rpx, #5A7EFF);
			}

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

		.flexBox {
			display: flex;
			align-items: center;
			margin-top: 12rpx;

			&:last-of-type {
				margin-top: 30rpx;
			}

			.name {
				margin-right: 20rpx;
				font-size: 24rpx;
			}

			.time {
				font-size: 24rpx;
			}
		}


		.list {
			padding: 0 30rpx;

			.box-item {
				border-radius: 20rpx;
				box-shadow: 0 2rpx 12rpx 0 rgba(114, 141, 244, 0.25);
				padding: 30rpx;
				margin-top: 30rpx;

				&~.box-item {
					margin-top: 30rpx;
				}
			}
		}
	}

	.blackText {
		color: #000000;
		font-weight: bold;
		font-size: 28rpx;
	}

	.redText {
		color: #FC3736;
		font-weight: bold;
		font-size: 28rpx;
		width: 73%;
		text-align: right;
	}

	.grayText {
		color: #999999;
		font-size: 24rpx;
		margin-right: 20rpx;
	}
</style>
