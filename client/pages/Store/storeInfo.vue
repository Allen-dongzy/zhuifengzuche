<template>
	<view class="">
		<view class="head" style="width: 100%;padding:30rpx 0rpx;border-bottom: 20rpx #EFF0F3 solid;">
			<view style="width: 90%;margin: auto;">
				<view class="allFlex">
					<image style="height:120rpx;width:120rpx"
						:src="info.shopImages || $util.fileUrl('/cache-logo.png')"></image>
					<view style="margin-left: 30rpx; width: 540rpx;">
						<view class="name">{{info.name}}</view>
						<view class="addres">{{info.memberAddress}}</view>
						<view class="allFlex">
							<image class="star" :src="$util.fileUrl('/xing.png')"></image>
						</view>
					</view>
				</view>
				<view class="allFlex head-bottom">
					<view class="title">门店状态: <text
							:style="{'color': info.status===0 ? '#999' : '#597DFE'}">{{info.status===0?'关闭':'开启'}}</text>
					</view>
					<view v-show="info.status===0" class="conten" style="color: #597DFE;" @click="openStore('开启')">开启门店
					</view>
					<view v-show="info.status===1" class="conten" style="color: #999;" @click="openStore('关闭')">关闭门店
					</view>
				</view>
			</view>
			<view class="show-status" @click="$open('/pages/Store/storeRegister?id='+info.id)">
				<text v-show="info.registrationStatus==0">未注册</text>
				<text v-show="info.registrationStatus==1">已注册</text>
				<view class="arrow"></view>
			</view>
		</view>

		<view style="padding-bottom: 40rpx;border-bottom: 20rpx solid #EFF0F3;margin-top: 40rpx;width: 100%;">
			<view style="width: 90%;margin: auto;">
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title" style="font-weight: bold;">门店信息</view>
					<view class="conten" :style="{'color': info.businessStatus ? '#597DFE' : '#999'}">
						{{info.businessStatus ? '正在营业': '未在营业'}}
					</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">联系电话：</view>
					<view class="conten" @click="callPhone(info.memberPhone)">{{info.memberPhone}}</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">营业时间：</view>
					<view class="conten">{{info.beginTime || '00:00'}} - {{info.endTime || '00:00'}}</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;" @click="openMap">
					<view class="title">门店地址：</view>
					<view class="conten">{{info.memberAddress}}</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">负责人：</view>
					<view class="conten">{{info.principal}}</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">负责人电话：</view>
					<view class="conten" @click="callPhone(info.principalPhone)">{{info.principalPhone}}</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">推荐码：</view>
					<view class="conten">{{info.note || '暂无'}}</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">车辆整备费：</view>
					<view class="conten">{{info.serviceFee || '暂无'}}</view>
				</view>
				<view class="allFlex" style="margin-top: 40rpx;">
					<view class="point" style="margin-left: 30%;" @click="$open('/pages/Store/editStore?id='+info.id)">
						编辑门店</view>
					<view class="point" style="margin-left: 20rpx;"
						@click="$open('/pages/Store/storePoint', {shopId: info.id})">送车点管理</view>
					<view class="point" style="margin-left: 20rpx;" @click="$open('/pages/Store/staff?id='+info.id)">
						员工管理</view>
				</view>
			</view>
		</view>
		<view style="font-size: 32rpx;color: #000000;width: 90%;margin: auto;margin-top: 40rpx;">评价（<text
				style="font-size: 32rpx;color: #5A7EFF;">{{info.evaluationNumber || 0}}</text>）条</view>
		<view style="width: 90%;margin: auto;border-bottom: 2rpx solid #EFF0F3;padding: 20rpx 0rpx;"
			v-for="(item, index) in list" :key="index">
			<view class="allFlex">
				<image style="height: 64rpx;width: 64rpx;" :src="item.evaluationUrl || $util.fileUrl('/cache-logo.png')"
					mode="aspectFill"></image>
				<view style="width: 450rpx;margin-left:20rpx;">
					<view style="font-size: 28rpx;color: #000000;">{{item.customInfoName}}</view>
					<view>
						<image v-for="(item,index) in starCode" :key="index" class="star"
							:src="$util.fileUrl('/xing.png')"></image>
					</view>
				</view>
				<view style="color: #B2B2B2;font-size: 24rpx;">{{item.createTime}}</view>
			</view>
			<view style="color: #000000;font-size: 28rpx;margin-left: 80rpx;margin-top: 20rpx;">
				{{item.evaluationDetails}}
			</view>
			<view style="color:#FC3736;font-size: 28rpx;width: 100%;text-align: right;" @click="evaluateDel">删除</view>
		</view>
		<uni-load-more :status="dataStatus" customNoMore="没有更多评论了" customNoData="暂无评论" />
	</view>
</template>

<script>
	import {
		memberShopFindInfoById,
		memberShopChangeStatus
	} from '@/apis/memberShop'
	import {
		evaluatePageQuery,
	} from '@/apis/shop'
	import {
		listManager
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				id: '',
				info: {}, // 店铺信息
				list: [],
				page: 1,
				size: 10,
				requestKey: true,
				dataStatus: '', // more loading noMore noData
			}
		},
		computed: {
			// 营业时间
			businessStatus() {
				// 当前时间 开始时间 结束时间
				const currentTime = new Date()
				const startTime = this.info.beginTime ? this.info.beginTime.split(':') : []
				const endTime = this.info.endTime ? this.info.endTime.split(':') : []
				// 当前小时和分钟
				const currentHours = currentTime.getHours()
				const currentMinutes = currentTime.getMinutes()
				// 开始小时和分钟
				const startHours = startTime[0]
				const startMinutes = startTime[1]
				// 结束小时和分钟
				const endHours = endTime[0]
				const endMinutes = endTime[1]
				// 若没有开始或结束时间则为非营业时间
				if (!startHours || !startMinutes || !endHours || !endMinutes) return false
				if (currentHours < startHours || currentHours > endHours) {
					// 若当前小时小于开始小时或大于结束小时则为非营业时间
					return false
				} else if ((currentHours == startHours && currentMinutes < startMinutes) || (currentHours == endHours &&
						currentMinutes > endMinutes)) {
					// 若(当前小时等于开始小时但当前分钟小于开始分钟)或(当前小时等于结束小时但当前分钟大于结束分钟)则为非营业时间
					return false
				} else {
					// 排除以上情况则为营业时间
					return true
				}
			}
		},
		onLoad(e) {
			if (e && e.id) this.id = e.id
		
			this.evaluatePageQuery()
		},
		onShow() {
				this.memberShopFindInfoById()
		},
		onReachBottom() {
			if (!this.requestKey) return
			this.page++
			this.evaluatePageQuery()
		},
		methods: {
			// 获取详情
			async memberShopFindInfoById() {
				const [err, res] = await memberShopFindInfoById(this.id)
				if (err) return
				this.info = res.data
			},
			// 打电话
			callPhone(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber
				})
			},
			// 打开地图
			async openMap() {
				// 获取位置
				const latitude = this.info.lat
				const longitude = this.info.lon
				// 打开位置
				uni.openLocation({
					latitude,
					longitude
				})
			},
			// 打开/关闭店铺模态框
			openStore(e) {
				uni.showModal({
					title: '门店状态',
					content: '要' + e + '门店吗？',
					success: async res => {
						if (res.confirm) {
							const [err, res] = await memberShopChangeStatus(this.id)
							if (err) return
							if (this.info.status) {
								this.info.status = e === '开启' ? 1 : 0
							} else {
								this.info.status = e === '关闭' ? 0 : 1
							}
								this.memberShopFindInfoById()
						}
					}
				})
			},
			// 获取评论列表
			async evaluatePageQuery() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await evaluatePageQuery(params)
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
			// 删除评论
			evaluateDel(index) {
				uni.showModal({
					title: '提示',
					content: '要删除该评价吗？',
					success: async btnRes => {
						if (!btnRes.confirm) return
						const params = {
							id: this.list[index].id
						}
						const [err, res] = await evaluateDel(params)
						console.log(res)
						console.log(err)
						if (err) return
						// todo
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.head {
		position: relative;

		.show-status {
			@include right-top(40rpx, 26rpx);
			@include flex-row();
			@include font-set(28rpx, #5A7EFF, 700);
			line-height: 40rpx;

			.arrow {
				@include square(16rpx);
				border: 1px solid #999;
				border-left: 0;
				border-top: 0;
				transform: rotate(-45deg);
				margin-left: 6rpx;
			}
		}
	}

	.allFlex {
		display: flex;
	}

	.star {
		height: 36rpx;
		width: 36rpx;
		margin-top: 6px;

		&~.star {
			margin-left: 5rpx;
		}
	}

	.head-bottom {
		margin-top: 40rpx;
	}

	.name {
		color: black;
		font-size: 28rpx;
	}

	.addres {
		width: 100%;
		font-size: 24rpx;
		color: #B2B2B2;
		margin-top: 6rpx;
		@include text-one;
	}

	.title {
		width: 30%;
		font-size: 28rpx;
		color: #000000
	}

	.conten {
		width: 70%;
		text-align: right;
		font-size: 28rpx;
		color: #999999;
	}

	.point {
		border: 2rpx solid #5A7EFF;
		height: 60rpx;
		width: 162rpx;
		font-size: 24rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #5A7EFF;
	}
</style>
