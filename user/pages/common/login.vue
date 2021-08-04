<template>
	<view class="content">
		<view class="topimg">
			<image class="loginBox" :src="`${ossUrl}/common/logo.png`" mode="aspectFill"></image>
		</view>
		<view class="topimg2">
			<image style="height:544rpx;width: 544rpx;" :src="`${ossUrl}/common/loginbg.png`" mode="aspectFill"></image>
		</view>
		<view class="setbox">
			<view class="moreInpbox">
				<view style="width: 90%;">
					<input type="number" maxlength="11" class="inpBox" style="width: 95%;" v-model="phone"
						placeholder="请填写手机号" />
				</view>
			</view>
			<view class="line"></view>
			<view class="moreInpbox">
				<view style="width: 70%;">
					<input type="text" maxlength="6" class="inpBox" style="width: 95%;" v-model="code"
						placeholder="请填写验证码" />
				</view>
				<view class="btn" @click="sendLoginCode">{{!codeKey?`${countDown}s`:'获取验证码'}}</view>
			</view>
			<view class="line"></view>
			<view style="width: 86%;margin: auto;height: 96rpx;">
				<button style="color: #007AFF;border:1px solid #5A7EFF" @click="login">登录</button>
			</view>
			<view class="selectBox">
				<view style="width: 32rpx;height: 32rpx;padding-top: 6rpx;" @click="lookAgreement">
					<image v-if="agreementType==false" style="height: 100%;width: 100%;"
						:src="`${ossUrl}/mine/quanxian2.png`" mode="aspectFill"></image>
					<image v-if="agreementType==true" style="height: 100%;width: 100%;"
						:src="`${ossUrl}/mine/quanxian1.png`" mode="aspectFill"></image>
				</view>
				<view style="color: #262743;margin-left:10rpx;">已阅读并同意追风租车的<text style="color: #5A7EFF;"
						@click="$open('/pages/common/userAgreement')">《用户协议》</text> </view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		sendLoginCode,
		login
	} from '@/apis/sso'
	import {
		throttle
	} from '@/utils/tools'
	import {
		mapActions
	} from 'vuex'
	import validator from 'crazy-validator'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				agreementType: false, //协议切换
				phone: '', // 手机号
				code: '', // 验证码
				codeKey: true, // 请求验证码开关
				countDown: 60, // 倒计时
				t: null, // 计时器占位
			}
		},
		mounted() {
			this.setSystemInfo()
		},
		methods: {
			// app 设置用户信息
			...mapActions('app', ['setSystemInfo']),
			// user 获取用户信息
			...mapActions('user', ['getUserInfo']),
			// 阅读协议
			lookAgreement() {
				this.agreementType = !this.agreementType
			},
			// 发送验证码
			sendLoginCode: throttle(async function() {
				if (!this.codeKey) return
				const checkItem = {
					value: this.phone,
					rules: [{
						type: 'required',
						msg: '请输入手机号'
					}, {
						type: 'phone',
						msg: '请输入正确的手机号'
					}]
				}
				const checkRes = validator(checkItem, this.$toast)
				if (checkRes.status !== 1000) return
				const params = {
					phone: this.phone
				}
				const [err, res] = await sendLoginCode(params)
				if (err) return
				this.codeKey = false
				this.t = setInterval(() => {
					this.countDown--
					if (this.countDown <= 0) {
						clearInterval(this.t)
						this.codeKey = true
						this.countDown = 60
					}
				}, 1000)
			}),
			// 登录
			login: throttle(async function() {
				if (!this.agreementType) {
					this.$toast('请阅读并同意用户协议')
					return
				}
				const checkList = [{
					value: this.phone,
					rules: [{
						type: 'required',
						msg: '请输入手机号'
					}, {
						type: 'phone',
						msg: '请输入正确的手机号'
					}]
				}, {
					value: this.code,
					rules: [{
						type: 'required',
						msg: '请输入验证码'
					}, {
						type: 'length',
						min: 4,
						max: 6,
						msg: '验证码范围错误'
					}]
				}]
				const checkRes = validator(checkList, this.$toast)
				if (checkRes.status !== 1000) return
				const params = {
					code: this.code,
					username: this.phone
				}
				const [err, res] = await login(params)
				if (err) return
				this.$storage.set('token', res.data.token)
				this.$toast('登录成功')
				this.getUserInfo()
				setTimeout(() => {
					this.$open('/pages/home/home', 3)
				}, 500)
			})
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.loginBox {
		width: 224rpx;
		height: 96rpx;
		margin-left: 32rpx;
	}

	.content {
		background-color: #5A7EFF;
		height: 100vh;
		width: 100%;
	}

	.topimg {
		position: relative;
	}

	.topimg2 {
		position: absolute;
		top: 10rpx;
		left: 110rpx;
	}

	.setbox {

		background-color: white;
		width: 90%;
		margin: auto;
		margin-top: 450rpx;
		border-radius: 20rpx;
		padding: 60rpx 0px;

	}

	.line {
		color: #FE3636;
		height: 40rpx;
		width: 86%;
		margin: 0x auto;
	}

	.selectBox {
		display: flex;
		width: 86%;
		margin: auto;
		margin-top: 42rpx;
	}

	.moreInpbox {
		display: flex;
		align-items: center;
		background-color: #EFF0F3;
		width: 86%;
		margin: auto;
		border-radius: 10rpx;
	}

	.inpBox {
		background-color: #EFF0F3;
		border-radius: 10rpx;
		height: 96rpx;
		width: 90%;
		margin: auto;
		font-size: 24rpx;
		color: #999999;
		padding-left: 20rpx;
	}

	.btn {
		width: 30%;
		height: 96rpx;
		@include flex-center;
		@include font-set(24rpx, #5A7EFF, 500);
	}
</style>
