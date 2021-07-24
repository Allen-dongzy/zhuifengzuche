<template>
	<view class="">
		<view style="text-align: center;margin-top: 7vh;">
			<image class="logo" :src="info.shopImages" mode="aspectFill"></image>
		</view>
		<view class="title">{{info.name}}</view>
		<view class="flexBox">

			<view v-for="(item, index) in stars" :key="index" style="margin: 40rpx 10rpx;" @click="select(index)">
				<image style="width: 52rpx;height: 52rpx;" :src="`${ossUrl}/common/icon-star.png`"></image>
			</view>
			<view v-for="(item, index) in (5-stars)" :key="index" style="margin: 40rpx 10rpx;"
				@click="select(stars+index)">
				<image style="width: 52rpx;height: 52rpx;" :src="`${ossUrl}/common/grayStar.png`"></image>
			</view>
		</view>
		<view class="grayLine"></view>
		<view class="">
			<textarea class="content" v-model="remark" placeholder="说说哪里好，其他顾客想知道" />
		</view>
		<button style=" color: white;
		width: 88%;
				margin: auto;
				margin-top: 5vh;
			    background-color: #5A7EFF;
			    border-radius: 50px;
			    font-size: 32rpx;
			    height: 96rpx;line-height: 96rpx; " type="default" @click="shopEvaluateAdd">确定</button>
	</view>
</template>

<script>
	import {
		memberShop
	} from '@/apis/memberShop'
	import {
		shopEvaluateAdd
	} from '@/apis/shop'
	import {
		throttle
	} from '@/utils/tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				orderId: '', // 订单id
				memberShopId: '', // 门店id
				from: '', // order  orderDetail
				info: {}, // 信息
				stars: 0, // 评分
				remark: '' // 备注
			}
		},
		onLoad(e) {
			if (e && e.orderId) this.orderId = e.orderId
			if (e && e.memberShopId) this.memberShopId = e.memberShopId
			if (e && e.from) this.from = e.from
			this.memberShop()
		},
		methods: {
			// 获取门店信息
			async memberShop() {
				const [err, res] = await memberShop(this.memberShopId)
				if (err) return
				this.info = res.data
			},
			// 选择评分
			select(index) {
				this.stars = index + 1
			},
			// 添加评价
			shopEvaluateAdd: throttle(async function() {
				const params = {
					memberShopId: this.memberShopId,
					orderId: this.orderId,
					starCode: this.stars,
					evaluationDetails: this.remark
				}
				const [err, res] = await shopEvaluateAdd(params)
				if (err) return
				this.$toast('评价成功')
				uni.$emit(`${this.from}Refresh`)
				setTimeout(() => {
					this.$close()
				}, 500)
			})
		}
	}
</script>

<style>
	.logo {
		height: 120rpx;
		width: 120rpx;
	}

	.title {
		font-size: 32rpx;
		color: #000000;
		font-weight: 500;
		letter-spacing: 5rpx;
		margin: auto;
		margin-top: 40rpx;
		width: 40%;
		text-align: center;
	}

	.flexBox {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.grayLine {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 60rpx;
	}

	.content {
		background-color: #EFF0F3;
		padding: 30rpx;
		width: 84%;
		margin: auto;
		margin-top: 60rpx;
		font-size: 24rpx;
		border-radius: 20rpx;
	}
</style>
