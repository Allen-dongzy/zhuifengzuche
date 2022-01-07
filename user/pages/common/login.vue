<template>
	<view :class="['login', { platform: !isPhoneLogin }, { phone: isPhoneLogin }]">
		<image class="logo" :src="`${ossUrl}/common/logo.png`" mode="aspectFill"></image>
		<image :class="['bg', { platform: !isPhoneLogin }, { phone: isPhoneLogin }]" :src="`${ossUrl}/common/login-bg.png`" mode="aspectFill"></image>
		<view class="touch-box">
			<view class="empty-box" v-if="!cacheCode">加载中...</view>
			<view v-if="cacheCode" :class="['platform-box', { 'phone-login': isPhoneLogin }, { ac: !isPhoneLogin }]">
				<view class="tip-text right" @click="isPhoneLogin = !isPhoneLogin">
					使用手机号注册登录
					<view class="arrow right"></view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="logo-box">
					<view class="icon icon-bg"><image :src="`${ossUrl}/order/logo-label.png`" mode="aspectFill"></image></view>
					<image class="small" :src="`${ossUrl}/common/associated.png`" mode="aspectFill"></image>
					<image class="icon" :src="`${ossUrl}/common/wechat.png`" mode="aspectFill"></image>
				</view>
				<button class="platform-login-btn green" open-type="getPhoneNumber" @getphonenumber="wechatLogin">微信一键登录/注册</button>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<view class="logo-box">
					<view class="icon icon-bg"><image :src="`${ossUrl}/order/logo-label.png`" mode="aspectFill"></image></view>
					<image class="small" :src="`${ossUrl}/common/associated.png`" mode="aspectFill"></image>
					<image class="icon" :src="`${ossUrl}/common/alipay.png`" mode="aspectFill"></image>
				</view>
				<button class="platform-login-btn blue" open-type="getPhoneNumber" @getphonenumber="alipayLogin">支付宝一键登录/注册</button>
				<!-- #endif -->
			</view>
			<view v-if="cacheCode" :class="['phone-box', { ac: isPhoneLogin }]">
				<view class="tip-text left" @click="isPhoneLogin = !isPhoneLogin">
					<view class="arrow left"></view>
					<!-- #ifdef MP-WEIXIN -->
					使用微信注册登录
					<!-- #endif -->
					<!-- #ifdef MP-ALIPAY -->
					使用支付宝注册登录
					<!-- #endif -->
				</view>
				<view class="input-box"><input type="number" maxlength="11" class="input" v-model="phone" placeholder="请填写手机号" /></view>
				<view class="input-box">
					<input style="width: 338rpx" type="text" maxlength="6" class="input" v-model="code" placeholder="请填写验证码" />
					<view class="btn" @click="sendLoginCode">{{ !codeKey ? `${countDown}s` : '获取验证码' }}</view>
				</view>
				<button class="login-btn" @click="phoneLogin">登&nbsp;录</button>
				<view class="select-bar">
					<image v-if="agreementType" class="select-btn" :src="`${ossUrl}/mine/quanxian1.png`" mode="aspectFill" @click="lookAgreement"></image>
					<image v-else class="select-btn" :src="`${ossUrl}/mine/quanxian2.png`" mode="aspectFill" @click="lookAgreement"></image>
					<view>
						已阅读并同意追风租车的
						<text style="color: #5A7EFF;" @click="$open('/pages/common/userAgreement')">《用户协议》</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { sendLoginCode, login, wxLogin, aliLogin } from '@/apis/sso'
import { throttle } from '@/utils/tools'
import { mapActions } from 'vuex'
import validator from 'crazy-validator'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			from: '', // 来源
			agreementType: false, //协议切换
			phone: '', // 手机号
			code: '', // 验证码
			codeKey: true, // 请求验证码开关
			countDown: 60, // 倒计时
			t: null, // 计时器占位
			isPhoneLogin: false, // 是否为手机登录
			cacheCode: '' // 微信或支付宝的临时code
		}
	},
	onLoad(e) {
		if (e && e.from) this.from = e.from
		// #ifdef MP-WEIXIN
		this.getCacheCode()
		setInterval(() => {
			this.getCacheCode()
		}, 180000)
		// #endif
		// #ifdef MP-ALIPAY
		this.cacheCode = 1
		// #endif
	},
	mounted() {
		this.setSystemInfo()
	},
	methods: {
		// app 设置系统信息
		...mapActions('app', ['setSystemInfo']),
		// user 获取用户信息
		...mapActions('user', ['getUserInfo']),
		// 获取微信临时code
		async getCacheCode() {
			const [err, res] = await uni.login({
				provider: 'weixin'
			})
			if (err) return
			this.cacheCode = res.code
		},
		// 阅读协议
		lookAgreement() {
			this.agreementType = !this.agreementType
		},
		// 发送验证码
		sendLoginCode: throttle(async function() {
			if (!this.codeKey) return
			const checkItem = {
				value: this.phone,
				rules: [
					{
						type: 'required',
						msg: '请输入手机号'
					},
					{
						type: 'phone',
						msg: '请输入正确的手机号'
					}
				]
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
		// 微信登录
		wechatLogin: throttle(async function(e) {
			const params = {
				encryptedData: e.detail.encryptedData,
				iv: e.detail.iv,
				code: this.cacheCode
			}
			const [err, res] = await wxLogin(params)
			if (err) return
			this.loginAfter(res.data.token)
		}),
		// 支付宝登录
		alipayLogin: throttle(async function(e) {
			const [phoneErr, phoneRes] = await uni.getPhoneNumber()
			if (phoneErr) return this.$toast(phoneErr)
			const params = {
				encryptedData: phoneRes.response
			}
			const [err, res] = await aliLogin(params)
			this.loginAfter(res.data.token)
		}),
		// 手机号登录
		phoneLogin: throttle(async function(key) {
			if (!this.agreementType) {
				this.$toast('请阅读并同意用户协议')
				return
			}
			const checkList = [
				{
					value: this.phone,
					rules: [
						{
							type: 'required',
							msg: '请输入手机号'
						},
						{
							type: 'phone',
							msg: '请输入正确的手机号'
						}
					]
				},
				{
					value: this.code,
					rules: [
						{
							type: 'required',
							msg: '请输入验证码'
						},
						{
							type: 'length',
							min: 4,
							max: 6,
							msg: '验证码范围错误'
						}
					]
				}
			]
			const checkRes = validator(checkList, this.$toast)
			if (checkRes.status !== 1000) return
			const params = {
				code: this.code,
				username: this.phone
			}
			const [err, res] = await login(params)
			if (err) return
			this.loginAfter(res.data.token)
		}),
		// 登陆后的处理逻辑
		loginAfter(token) {
			this.$storage.set('token', token)
			this.$toast('登录成功')
			this.getUserInfo()
			uni.$emit('appRefresh')
			setTimeout(() => {
				if (this.from === 'mine') this.$open('/pages/mine/mine', 3)
				else this.$open('/pages/home/home', 3)
			}, 500)
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

.login {
	position: relative;
	@include box(100%, 100vh);
	background: linear-gradient(135deg, #5a7eff, #7a7eff, #9a7eff);
	padding-top: 496rpx;
	transition: all 0.4s;

	&.platform {
		background: linear-gradient(135deg, #5a7eff, #7a7eff, #9a7eff);
	}

	&.phone {
		background: linear-gradient(135deg, #9a7eff, #7a7eff, #5a7eff);
	}

	.logo {
		position: absolute;
		top: 0;
		left: 32rpx;
		z-index: 2;
		@include box(224rpx, 96rpx);
	}

	.bg {
		position: absolute;
		top: 0;
		left: 50%;
		z-index: 1;
		transform: translateX(-50%) translateY(0rpx);
		@include square(544rpx);
		transition: all 0.4s;

		&.platform {
			transform: translateX(-50%) translateY(0rpx);
		}

		&.phone {
			transform: translateX(-46%) translateY(-50rpx);
		}
	}

	.touch-box {
		@include box(670rpx, 602rpx, #fff);
		@include flex-row();
		margin: 0 auto;
		border-radius: 20rpx;
		box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25);
		overflow: hidden;

		.empty-box {
			@include square();
			@include flex-col(center, center);
			@include font-set(36rpx, #ddd, 700);
		}

		.platform-box,
		.phone-box {
			position: relative;
			@include box(670rpx, 602rpx);
			padding: 100rpx 60rpx 60rpx;
			transition: all 0.3s;

			&.phone-login {
				margin-left: -670rpx;
			}

			&.ac {
				.tip-text {
					&.left,
					&.right {
						transform: translateX(0);
					}
				}

				.logo-box,
				.input-box,
				.login-btn,
				.platform-login-btn,
				.select-bar {
					transform: translateY(0);
					opacity: 1;
				}
			}

			.tip-text {
				@include box-w(280rpx, 100rpx);
				@include flex-row();
				position: absolute;
				top: 0;

				&.left {
					left: 30rpx;
					transform: translateX(370rpx);
					transition: all 0.4s;
					justify-content: flex-start;
				}

				&.right {
					right: 30rpx;
					transform: translateX(-350rpx);
					transition: all 0.4s;
					justify-content: flex-end;
				}

				@include font-set(26rpx, #5a7eff);
				line-height: 100rpx;
				text-decoration: underline;

				.arrow {
					@include square(17rpx);
					border: 2px solid #5a7eff;
					&.left {
						transform: rotate(225deg);
						margin-right: 4rpx;
					}
					&.right {
						transform: rotate(45deg);
						margin-left: 4rpx;
					}
					border-bottom: 0;
					border-left: 0;
				}
			}

			.logo-box {
				@include flex-center;
				margin: 80rpx auto;
				transform: translateY(20rpx);
				opacity: 0;
				transition: all 0.9s;

				.icon {
					@include circle(160rpx);
					display: block;

					&.icon-bg {
						border: 2px solid #ddd;
						padding: 25rpx;

						& > image {
							@include circle(110rpx);
						}
					}
				}

				.small {
					@include square(60rpx);
					display: block;
					margin: 0 60rpx;
				}
			}

			.input-box {
				@include box(550rpx, 96rpx, #eff0f3);
				@include flex-row(space-between);
				border-radius: 10rpx;
				transform: translateY(-20rpx);
				opacity: 0;
				transition: all 0.9s;

				& ~ .input-box {
					margin-top: 40rpx;
				}

				.input {
					@include square();
					background-color: #eff0f3;
					border-radius: 10rpx;
					@include font-set(24rpx, #999);
					padding-left: 30rpx;
				}

				.btn {
					flex-grow: 1;
					@include box-h(96rpx);
					@include font-set(24rpx, #5a7eff, 500);
					padding-right: 30rpx;
					line-height: 96rpx;
					text-align: right;
				}
			}

			.login-btn {
				transform: translateY(-20rpx);
			}

			.platform-login-btn {
				transform: translateY(20rpx);
			}

			.login-btn,
			.platform-login-btn {
				@include box(550rpx, 96rpx, #fff);
				@include flex-center;
				border: 1px solid #5a7eff;
				border-radius: 10px;
				@include font-set(32rpx, #5a7eff, 700);

				margin-top: 40rpx;
				opacity: 0;
				transition: all 0.9s;

				&.blue {
					background-color: #06b4fd;
					color: #fff;
				}

				&.green {
					border: 1px solid #28c445;
					background-color: #28c445;
					color: #fff;
				}
			}

			.select-bar {
				@include box-w();
				@include flex-row();
				font-size: 26rpx;
				margin-top: 40rpx;
				transform: translateY(-20rpx);
				opacity: 0;
				transition: all 0.9s;

				.select-btn {
					@include circle(32rpx);
					margin-right: 20rpx;
				}
			}
		}
	}
}
</style>
