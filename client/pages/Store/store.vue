<template>
	<view class="store">
		<view class="home-bar" v-show="!searchMode">
			<view class="add-label"></view>
			<view class="function-box">
				<view class="search-box" @tap="tapHeader">
					<text>搜索</text>
					<image :src="`${filePath}/vehicleManage/search.png`"></image>
				</view>
			</view>
		</view>
		<view class="search-bar" v-show="searchMode">
			<view class="serach-box">
				<image class="search-icon" :src="`${filePath}/vehicleManage/search-big.png`"></image>
				<input @input="inputChange" v-model="keyword" type="text" placeholder="请输入门店名称" placeholder-class="input">
				<image class="clear" :src="`${filePath}/vehicleManage/clear.png`" @click="clear"></image>
			</view>
			<view class="cancel" @tap="tapHeader">取消</view>
		</view>
		<view class="header-mat"></view>
		<view v-for="(item,index) in list" :key="index" class="allFlex list-item"
			@click="$open('/pages/Store/storeInfo', {id: list[index].id})">
			<image class="pic" :src="item.shopImages || $util.fileUrl('/cache-logo.png')" mode="aspectFill"></image>
			<view class="desc">
				<view class="name">{{item.name}}</view>
				<view class="addres">{{item.memberAddress}}</view>
				<view class="allFlex star-box">
					<image class="star" :src="$util.fileUrl('/xing.png')"></image>
				</view>
			</view>
		</view>
		<uni-load-more :status="dataStatus" />
	</view>
</template>

<script>
	import config from '@/common/js/config'
	import {
		memberShopPageQuery
	} from '@/apis/memberShop'
	import {
		listManager
	} from '@/utils/uni-tools'
	import {
		throttle,
		debounce
	} from '@/utils/tools'

	export default {
		data() {
			return {
				filePath: config.filePath,
				searchMode: false, // 是否为搜索模式
				list: [],
				page: 1,
				size: 10,
				requestKey: true,
				keyword: '', // 关键字
				dataStatus: '' // more loading noMore noData
			}
		},
		onLoad() {
			this.memberShopPageQuery()
		},
		onReachBottom() {
			if (!this.requestKey) return
			this.page++
			this.memberShopPageQuery()
		},
		methods: {
			// 切换头部
			tapHeader() {
				this.searchMode = !this.searchMode
			},
			// input变化
			inputChange: debounce(function() {
				this.init()
				this.memberShopPageQuery()
			}),
			// 初始化
			init() {
				this.requestKey = true
				this.page = 1
				this.list = []
			},
			// 清除关键字
			clear: throttle(function() {
				if (!this.keyword) return
				this.keyword = ''
				this.init()
				this.memberShopPageQuery()
			}),
			// 门店查询
			async memberShopPageQuery() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size,
					search: this.keyword
				}
				const [err, res] = await memberShopPageQuery(params)
				if (err) return
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.requestKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.list = [...this.list, ...res.data.list]
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.store {
		padding-bottom: 30rpx;
	}

	.home-bar,
	.search-bar {
		position: fixed;
		z-index: 9;
		@include box(100%, 90rpx, #fff);
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

	.list-item {
		border-bottom: 2rpx solid #EFF0F3;
		width: 90%;
		margin: auto;
		padding: 20rpx 0rpx;
	}

	.header-mat {
		height: 90rpx;
	}

	.allFlex {
		display: flex;
		align-items: center;
	}

	.flexBox {
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		margin-top: 20rpx;

	}

	.search {
		font-size: 28rpx;
		color: #000000;
		margin-left: 80%;
		margin-right: 10rpx;

	}

	.name {
		color: black;
		font-size: 28rpx;
	}

	.addres {
		max-width: 520rpx;
		font-size: 24rpx;
		color: #B2B2B2;
		margin-top: 6rpx;
		@include text-one;
	}

	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 28rpx;

	}

	.searchInp {
		background-color: #EFF0F3;
		height: 70rpx;
		width: 500rpx;
		border-radius: 50rpx;
		padding-left: 20rpx;
	}

	.pic {
		height: 120rpx;
		width: 120rpx
	}

	.desc {
		margin-left: 30rpx;
	}

	.star-box {
		@include flex-row();
		transform: translateX(-2rpx);
		margin-top: 12rpx;

		.star {
			height: 36rpx;
			width: 36rpx;

			&~.star {
				margin-left: 8rpx;
			}
		}
	}
</style>
