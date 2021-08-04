<template>
	<view class="userinfo">
		<view class="bar">
			<view class="title">姓名:</view>
			<input type="text" maxlength="10" placeholder="请输入姓名" v-model="name">
		</view>
		<view class="bar">
			<view class="title">手机号:</view>
			<input type="number" maxlength="11" placeholder="请输入手机号" v-model="phone">
		</view>
		<view class="bar">
			<view class="title">身份证号:</view>
			<input type="text" maxlength="18" placeholder="请输入身份证号" v-model="identity">
		</view>
		<view class="btn" @click="rentalOrderAliPageQuery">查询订单</view>
	</view>
</template>

<script>
	import {
		rentalOrderAliPageQuery
	} from '@/apis/aliApis'
	import {
		throttle
	} from '@/utils/tools'
	import validator from 'crazy-validator'

	export default {
		data() {
			return {
				name: '董正阳',
				phone: '17623178041',
				identity: '654001199702212916'
			}
		},
		methods: {
			// 查询订单
			rentalOrderAliPageQuery: throttle(async function() {
				const checkList = [{
					value: this.name,
					rules: [{
						type: 'required',
						msg: '请输入姓名'
					}]
				}, {
					value: this.phone,
					rules: [{
						type: 'required',
						msg: '请输入手机号'
					}, {
						type: 'phone',
						msg: '手机号格式错误'
					}]
				}, {
					value: this.identity,
					rules: [{
						type: 'required',
						msg: '请输入身份证号'
					}, {
						type: 'identity',
						msg: '身份证号格式错误'
					}]
				}]
				const checkRes = validator(checkList, this.$toast)
				if (checkRes.status !== 1000) return
				const params = {
					idCard: this.identity,
					phone: this.phone,
					realName: this.name
				}
				const [err, res] = await rentalOrderAliPageQuery(params)
				if (err || !res.data[0].id) return
				this.$toast('查询成功，正在跳转...')
				setTimeout(() => {
					this.$open('/pages/aliPage/orderDetail', {
						id: res.data[0].id
					})
				}, 800)
			})
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.userinfo {
		@include flex-col(flex-start);
		padding-top: 100rpx;

		.bar {
			&~.bar {
				margin-top: 60rpx;
			}

			.title {
				@include font-set(32rpx, #333, bold);
				line-height: 40rpx;
			}

			input {
				@include box(500rpx, 80rpx);
				border-radius: 10rpx;
				border: 1px solid #ddd;
				margin-top: 20rpx;
				outline: 0;
				padding: 1px;
				padding-left: 20rpx;
				font-size: 30rpx;
				color: #333;
			}
		}

		.btn {
			position: fixed;
			bottom: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			@include box(500rpx, 100rpx);
			border-radius: 10rpx;
			border: 1px solid #ddd;
			@include flex-center;
			@include font-set(34rpx, #333);
		}
	}
</style>
