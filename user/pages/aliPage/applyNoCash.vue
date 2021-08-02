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
		<view class="btn" @click="apply">申请租金免押</view>
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
				accessToken: '',
				name: '',
				phone: '',
				identity: ''
			}
		},
		onLoad(e) {
			if (e && e.accessToken) this.accessToken = e.accessToken
		},
		methods: {
			// 申请
			apply: throttle(function() {
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
				this.ssoVerification()
			}),
			// 申请免押
			async ssoVerification() {
				const params = {
					accessToken: this.accessToken,
					idCard: this.identity,
					phone: this.phone,
					realName: this.name
				}
				const [err, res] = await ssoVerification(params)
				console.log(err)
				console.log(res)
				if (err) return
				// setTimeout(() => {
				// 	this.$open('/pages/aliPage/result')
				// }, 500)
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
