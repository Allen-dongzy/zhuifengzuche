<template>
	<view class="content">
		<view class="topimg"><image class="loginBox" :src="$util.fileUrl('/logo.png')"></image></view>
		<view class="topimg2"><image style="height:544rpx;width: 544rpx;" :src="$util.fileUrl('/loginbg.png')" mode="aspectFill"></image></view>
		<view class="setbox">
			<view class="moreInpbox"><input class="inpBox" style="width: 100%;border-radius: 10rpx;" v-model="phone" type="text" value="" placeholder="请输入手机号" /></view>

			<view class="textTitle">{{ accountText }}</view>

			<view class="moreInpbox">
				<view style="width: 90%;" v-if="showpass == true"><input v-model="password" password class="inpBox" style="width: 95%;" placeholder="请填写密码" /></view>
				<view style="width: 90%;" v-if="showpass == false"><input v-model="password" class="inpBox" style="width: 95%;" placeholder="请填写密码" /></view>
				<image v-if="showpass == false" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/guan.png')" mode="aspectFill" @click="look"></image>
				<image v-if="showpass == true" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/kai.png')" mode="aspectFill" @click="look"></image>
				<!-- </view> -->
			</view>

			<view class="textTitle">{{ passwordText }}</view>
			<view class="textTitle" style="color: #007AFF;" @click="forget">忘记密码？</view>
			<view style="width: 86%;margin: auto;height: 96rpx;">
				<button style="color: #007AFF;background-color: white;border: 2rpx solid #007AFF;" @click="login()">登录</button>
			</view>
			<view class="selectBox">
				<view style="width: 32rpx;height: 32rpx;" @click="selectbox">
					<image v-if="selectType == false" style="height: 100%;width: 100%;" :src="$util.fileUrl('/quanxian2.png')" mode="aspectFill"></image>
					<image v-if="selectType == true" style="height: 100%;width: 100%;" :src="$util.fileUrl('/quanxian1.png')" mode="aspectFill"></image>
				</view>
				<view style="color: #262743;margin-left: 10rpx;">
					已阅读并同意追风租车的
					<text style="color: #5A7EFF;" @click="agreement">《用户协议》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { login } from '@/apis/admin'
import { throttle } from '@/utils/tools'
import { mapActions } from 'vuex'

export default {
	data() {
		return {
			accountText: '', //手机号码校验提示语句
			passwordText: '', //密码校验提示语句
			selectType: false, //协议切换
			showpass: true, //密码眼睛切换 false 关闭  true开启
			password: '', //密码
			phone: '', //手机号
			inpType: 'password'
		}
	},
	onLoad() {
		if (this.$storage.get('phone') == undefined) {
		} else {
			this.selectType = true
			this.phone = this.$storage.get('phone')
			this.password = this.$storage.get('password')
		}
	},
	methods: {
		// user模块 获取用户信息
		...mapActions('user', ['getInfo']),
		selectbox() {
			if (this.selectType) {
				this.selectType = false
			} else {
				this.selectType = true
			}
		},
		look() {
			if (this.showpass) {
				this.showpass = false
				this.inpType = 'password'
			} else {
				this.showpass = true
				this.inpType = 'number'
			}
		},
		forget() {
			uni.navigateTo({
				url: './forgetPhone',
				animationType: 'pop-in',
				animationDuration: 200
			})
		},
		agreement() {
			uni.navigateTo({
				url: './agreement'
			})
		},

		login: throttle(async function() {
			var that = this
			if (that.selectType == false) {
				uni.showToast({
					title: '请勾选用户协议',
					icon: 'none'
				})
			} else {
				if (this.phone == '') {
					this.$toast('请输入手机号')
					return false
				} else if (this.password == '') {
					this.$toast('请输入密码')
					return false
				}

				const params = {
					username: that.phone,
					loginType: 1,
					password: that.password
				}
				const [err, res] = await login(params)
				if (err) return
				this.$storage.set('token', res.data.token)
				this.$storage.set('phone', that.phone)
				this.$storage.set('password', that.password)
				this.$toast('登录成功')
				this.getInfo()
				setTimeout(() => {
					this.$open('/pages/home/start', 2)
				}, 800)
			}
		})
	}
}
</script>

<style lang="scss">
.loginBox {
	width: 224rpx;
	height: 96rpx;
	margin-left: 32rpx;
}

.content {
	background-color: #5a7eff;
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
	margin-top: 420rpx;
	border-radius: 20rpx;
	padding: 60rpx 0px 0rpx 0rpx;
}

.textTitle {
	color: #fe3636;
	height: 40rpx;
	width: 86%;
	margin: 16rpx auto;
}

.selectBox {
	display: flex;
	align-items: center;
	width: 86%;
	margin: auto;
	margin-top: 22rpx;
	padding-bottom: 20rpx;
}

.moreInpbox {
	display: flex;
	align-items: center;
	background-color: #eff0f3;
	width: 86%;
	margin: auto;
	border-radius: 10rpx;
}

.inpBox {
	background-color: #eff0f3;
	border-radius: 10rpx;
	height: 96rpx;
	width: 90%;
	margin: auto;
	font-size: 24rpx;
	color: #999999;
	padding-left: 20rpx;
}
</style>
