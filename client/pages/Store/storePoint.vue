<template>
	<view class="">
		<view class="flexBox" v-if="selectType==false" @click="select">
			<image style="height: 28rpx;width: 28rpx;" :src="$util.fileUrl('/loudou.png')"></image>
			<view class="select">{{areaName || '筛选'}}</view>
			<image style="height: 18rpx;width: 38rpx;" :src="$util.fileUrl('/xiangxia.png')"></image>
		</view>
		<view v-if="selectType==true" class="Mask" @click="selectType=false"></view>
		<view v-if="selectType==true" class="popSelect">
			<view class="flexBox" style="height:120rpx;border-bottom: 2rpx solid #EFF0F3;" @click="select">
				<image style="height: 28rpx;width: 28rpx;" :src="$util.fileUrl('/lanloudou.png')"></image>
				<view class="select" style="color:#597DFD;">{{areaName || '筛选'}}</view>
				<image style="height: 18rpx;width: 38rpx;" :src="$util.fileUrl('/xiangshang.png')"></image>
			</view>
			<view class="flexBox" style="height:120rpx;border-bottom: 2rpx solid #EFF0F3;"
				v-for="(item, index) in areas" :key="index" @click="selectArea(index)">
				<view style="width: 90%;">{{item.areaName}}</view>
				<view style="width: 10%;text-align: center;">{{item.count}}</view>
			</view>
		</view>
		<view style="margin-top: 20rpx;">
			<view v-for="(item,index) in list" :key="index" class="flexBox"
				style="padding: 20rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">
				<view style="width: 86%">
					<view style="font-size: 28rpx;color:#000000;font-weight: bold;">{{ item.name }}</view>
					<view style="color: #B2B2B2;font-size: 24rpx;margin-top: 10rpx;">{{ item.address }}</view>
				</view>
				<switch class="switch" :checked="list[index].status===1"
					@change="deliveryOnOrOffButton($event, index)" />
			</view>
			<uni-load-more :status="dataStatus" />
		</view>
	</view>
</template>

<script>
	import {
		deliveryPageQuery,
		deliveryFindByShopId,
		deliveryOnOrOffButton
	} from '@/apis/delivery'
	import {
		listManager
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				selectType: false,
				areas: [],
				areaName: '', // 地区名
				areaCode: '', // 地区编码
				shopId: '', // 店铺id
				list: [],
				page: 1,
				size: 10,
				requestKey: true,
				dataStatus: '', // more loading noMore noData
			}
		},
		onLoad(e) {
			if (e && e.shopId) this.shopId = e.shopId
			this.deliveryPageQuery()
			this.deliveryFindByShopId()
		},
		onReachBottom() {
			if (!this.requestKey) return
			this.page++
			this.deliveryPageQuery()
		},
		methods: {
			select() {
				if (this.selectType) {
					this.selectType = false
				} else {
					this.selectType = true
				}
			},
			// 选择地区
			selectArea(index) {
				this.areaCode = this.areas[index].areaCode
				this.areaName = this.areas[index].areaName
				this.selectType = false
				this.init()
				this.deliveryPageQuery()
			},
			// 根据门店ID查询区域与总数
			async deliveryFindByShopId() {
				const params = {
					shopId: this.shopId
				}
				const [err, res] = await deliveryFindByShopId(params)
				if (err) return
				this.areas = res.data
			},
			// 初始化
			init() {
				this.requestKey = true
				this.page = 1
				this.list = []
			},
			// 查询送车点
			async deliveryPageQuery() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size,
					areaCode: this.areaCode
				}
				const [err, res] = await deliveryPageQuery(params)
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
			},
			// 开启/关闭送车点
			async deliveryOnOrOffButton(event, index) {
				const params = {
					id: this.list[index].id
				}
				const [err, res] = await deliveryOnOrOffButton(params)
				if (err) return
				this.list[index].isCheck = event.detail.value ? 1 : 0
			}
		}
	}
</script>

<style>
	.flexBox {
		width: 90%;
		margin: auto;
		display: flex;
		align-items: center;
	}

	.select {
		color: #000000;
		font-size: 28rpx;
		margin: 0rpx 15rpx;
	}

	/deep/ switch[checked] .wx-switch-input {
		background-color: #5A7EFF !important;
	}

	.Mask {
		position: fixed;
		background-color: #000000;
		opacity: 0.6;
		height: 100vh;
		width: 100%;
		top: 0px;
	}

	.popSelect {
		position: fixed;
		top: 0rpx;
		z-index: 9;
		width: 100%;
		background-color: white;
		border-bottom-right-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
	}
</style>
