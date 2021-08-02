<template>
	<view class="authorization">
		<!-- #ifdef MP-ALIPAY -->
		<button class="btn" type="primary" size="default" open-type="getAuthorize" scope="userInfo"
			@getAuthorize="onGetAuthorize" @error="onAuthError">
			支付宝一键登录
		</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getCodeByWxCode
	} from '@/apis/sso'
	import {
		throttle
	} from '@/utils/tools'

	export default {
		methods: {
			// 获取code信息
			getInfo() {
				return new Promise((resolve, reject) => {
					my.getAuthCode({
						scopes: 'auth_user', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
						success: res => {
							resolve(res)
						},
						fail: err => {
							reject(err)
						}
					})
				}).then(res => [null, res]).catch(err => [err])
			},
			// 授权失败回调
			onAuthError() {
				this.$toast('授权失败回调')
			},
			// 授权成功回调
			onGetAuthorize: throttle(async function() {
				const [loginErr, loginRes] = await this.getInfo()
				if (loginErr) return
				const params = {
					code: loginRes.authCode,
					loginType: 2
				}
				const [err, res] = await getCodeByWxCode(params)
				if (err) return
				this.$open('/pages/aliPage/applyNoCash', {
					accessToken: res.data.access_token
				})
			})
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.authorization {
		.btn {
			position: fixed;
			top: 45%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			padding: 0 50rpx;
		}
	}
</style>
