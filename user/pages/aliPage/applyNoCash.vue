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
		<!-- <view class="btn" @click="ssoVerification">查询订单</view> -->
		<view class="btn" @click="aaa">tset</view>
	</view>
</template>

<script>
	import {
		ssoVerification
	} from '@/apis/aliApis'
	import {
		throttle
	} from '@/utils/tools'
	import validator from 'crazy-validator'

	export default {
		data() {
			return {
				name: '',
				phone: '',
				identity: ''
			}
		},
		methods: {
			// 查询订单
			ssoVerification: throttle(async function() {
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
				const [err, res] = await ssoVerification(params)
				console.log(err)
				console.log(res)
				if (err) return
				setTimeout(() => {
					this.$open('/pages/aliPage/orderDetail', {
						id: 1
					})
				}, 500)
			}),
			// 测试
			aaa() {
				my.tradePay({
					orderStr: 'alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021002157693546&biz_content=%7B%22amount%22%3A%220.01%22%2C%22extra_param%22%3A%22%7B%5C%22category%5C%22%3A%5C%22TRAD_RENT_CAR%5C%22%2C%5C%22serviceId%5C%22%3A%5C%222020111100000000000078532800%5C%22%7D%22%2C%22order_title%22%3A%22%E7%A7%9F%E8%BD%A6%E6%8A%BC%E9%87%91%E9%A2%84%E6%8E%88%E6%9D%83%22%2C%22out_order_no%22%3A%2220210719112051924791%22%2C%22out_request_no%22%3A%227864203439068799562834298639%22%2C%22payee_user_id%22%3A%222088931788241283%22%2C%22product_code%22%3A%22PRE_AUTH_ONLINE%22%7D&charset=utf-8&format=JSON&method=alipay.fund.auth.order.app.freeze&notify_url=http%3A%2F%2Ftest.frp.hechieh.com%2Flots-member%2Fpayment%2Fali-pay-callback&sign=TZ3%2BuPdnTIfq2kgM4rOxx2x9gBksQ%2BK606n38T%2BUeUOulN065V%2FMvMClSe9M9Cgiwqi%2B%2BfzD%2FMUmELj4hsjiUU%2F0n%2BI78VZEEqp5sJ4HnaVJdHuIF3vaMyChY3M4NHWH90t8ZDCuO5%2FzS5QRYCIJULmFsIGsYYRq0gME%2FGWgUd3gYNM4GLyn8c7o563Sjjh2UUpik%2Fs4ZLPN3HQxJs5tuLKWYQUH33X3hzLKsK046YVi%2BNW%2FohoAh2Mfo5oSo2Upd2Bd3qmt6WJejhLQKVdmodOEgULaDb1eRJzqVknH1McTVoBWO41q8HP2FdtLfZ1iTS0B16dID8tTzZbYExz4wQ%3D%3D&sign_type=RSA2&timestamp=2021-08-03+17%3A54%3A18&version=1.0',
					success: (res) => {
						console.log(res)
						my.alert({
							content: JSON.stringify(res),
						})
					},
					fail: (res) => {
						console.log(err)
						my.alert({
							content: JSON.stringify(res),
						})
					}
				});
			}
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
