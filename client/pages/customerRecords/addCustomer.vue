<template>
	<view>
		<view class="box">
			<view class="flexBox">
				<view class="title">品牌型号</view>
				<view class="item">
					<input class="inpBox" type="text" v-model="brand" placeholder="请输入品牌型号" />
				</view>
			</view>
			<view class="flexBox">
				<view class="title">客户身份证</view>
				<view class="item">
					<input class="inpBox" type="text" v-model="idCard" placeholder="请输入客户身份证" />
				</view>
			</view>
			<view class="flexBox">
				<view class="title">客户手机号</view>
				<view class="item">
					<input class="inpBox" type="text" v-model="phone" placeholder="请输入客户手机号" />
				</view>
			</view>
			<view class="flexBoxContent">
				<view class="title">选择车辆</view>
				<view class="selectBox" @click="$open('/pages/customerRecords/selectCart')">
					<view style="width: 85%;">
						<view class="pickerBox">
							<label v-if="true" class="pickerText">请选择</label>
							<label v-else class="pickerText"></label>
						</view>
					</view>
					<view style="width:15%;">
						<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')"></image>
					</view>
				</view>
			</view>
			<view class="flexBox">
				<view class="title">租期</view>
				<view class="timeBox" @click="goTime">{{takeCarTime || '取车时间'}}</view>
				<view class="timeBox" style="margin-left: 30rpx;" @click="goTime">{{carAlsoTime || '还车时间'}}</view>
			</view>
			<view class="flexBox">
				<view class="title">金额</view>
				<view class="item">
					<input class="inpBox" type="text" v-model="price" placeholder="请填写金额" />
				</view>
			</view>
			<view style="display: flex;margin-top: 30rpx;">
				<view class="title">备注</view>
				<view class="item">
					<textarea
						style="padding: 20rpx;background-color:#EFF0F3;height:144rpx;width: 100%;border-radius: 10rpx;"
						type="text" v-model="remark" placeholder="请填写金额" />
				</view>
			</view>
			<view class="flexBox" style="margin-top: 40rpx;">
				<view class="title">添加照片</view>
				<view style="position: relative;width: 22%;display: inline-block;">
					<image style="width:160rpx;height: 160rpx;" :src="$util.fileUrl('/icon5.png')"></image>
					<image style="width:36rpx;height: 36rpx;position:absolute;top: -10rpx;right: -10rpx;"
						:src="$util.fileUrl('/lancha.png')"></image>
				</view>
			</view>
		</view>
		<view class="btn" type="default" @click="next()">完成</view>
	</view>
</template>

<script>
	import {
		recordsAdd
	} from '@/apis/customer'
	import validator from 'crazy-validator'

	export default {
		data() {
			return {
				brand: '', // 品牌
				idCard: '', // 身份证
				phone: '', // 手机号
				price: '', // 金额
				remark: '', // 备注
				takeCarTime: '', // 取车时间
				carAlsoTime: '' // 还车时间
			}
		},
		onLoad() {
			// this.recordsAdd()
			this.eventListener()
		},
		methods: {
			// 前往选择时间
			goTime() {
				this.$open('/pages/customerRecords/leaseTimeSelection')
			},
			// 添加记录
			async recordsAdd() {
				const params = {

				}
				const [err, res] = await recordsAdd(params)
				console.log(res)
				console.log(err)
				if (err) return

			},
			// 监听
			eventListener() {
				// 获取租车时间
				uni.$on('getCarRentalTime', (e) => {
					this.takeCarTime = e.takeCarTime
					this.carAlsoTime = e.carAlsoTime
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.box {
		width: 90%;
		margin: auto;
	}

	.flexBox {
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}

	.inpBox {
		background-color: #EFF0F3;
		width: 100%;
		border-radius: 10rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 20rpx;
	}

	.title {
		color: black;
		font-size: 28rpx;
		width: 25%;
	}

	.item {
		width: 75%;
		margin: auto;
	}

	.selectBox {
		background-color: #EFF0F3;
		width: 75%;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		color: #999999;
		font-size: 24rpx;
	}

	.flexBoxContent {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
	}

	.pickerBox {
		background-color: #EFF0F3;
		color: #999999;
		font-size: 24rpx;
		height: 74rpx;
		border-radius: 10rpx;
	}

	.pickerText {
		height: 74rpx;
		line-height: 74rpx;
		padding-left: 20rpx;
		color: #999999;
	}

	.timeBox {
		background-color: #EFF0F3;
		width: 35%;
		border-radius: 10rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 16rpx;
	}

	.btn {
		color: white;
		width: 90%;
		margin: 10vh auto 0rpx auto;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		letter-spacing: 10rpx;
		text-align: center;
	}
</style>
