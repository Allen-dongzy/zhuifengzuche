<template>
	<view class="content">
		<view class="topimg">
			<image class="loginBox" :src="$util.fileUrl('/logo.png')"></image>
		</view>
		<view class="topimg2">
			<image style="height:544rpx;width: 544rpx;" :src="$util.fileUrl('/loginbg.png')" mode=""></image>
		</view>
		<view class="setbox">

			<input style="    background-color: #EFF0F3;
			width: 86%;
			margin: auto;
			height: 96rpx;
			padding-left: 20rpx;
			border-radius: 10rpx;" v-model="phone" type="text" value="" placeholder="请输入手机号" />


			<view class="textTitle">{{accountText}}</view>

			<view class="moreInpbox">
				<view style="width: 90%;" v-show="showpass==true">
					<input v-model="password" type="password" class="inpBox" style="width: 95%;" placeholder="请填写密码" />
				</view>
				<view style="width: 90%;" v-show="showpass==false">
					<input v-model="password" type="number" class="inpBox" style="width: 95%;" placeholder="请填写密码" />
				</view>
				<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/guan.png')"
					mode="" @click="look"></image>
				<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/kai.png')"
					mode="" @click="look"></image>
				<!-- </view> -->
			</view>

			<view class="textTitle">{{passwordText}}</view>
			<view class="textTitle" style="color: #007AFF;" @click="forget">忘记密码？</view>
			<view style="width: 86%;margin: auto;height: 96rpx;">
				<button style="color: #007AFF;background-color: white;border: 2rpx solid #007AFF;"
					@click="login()">登陆</button>
			</view>
			<view class="selectBox">
				<view style="width: 32rpx;height: 32rpx;" @click="selectbox">
					<image v-show="selectType==false" style="height: 100%;width: 100%;"
						:src="$util.fileUrl('/quanxian2.png')" mode=""></image>
					<image v-show="selectType==true" style="height: 100%;width: 100%;"
						:src="$util.fileUrl('/quanxian1.png')" mode=""></image>
				</view>
				<view style="color: #262743;">已阅读并同意追风租车的<text style="color: #5A7EFF;">《用户协议》</text> </view>
			</view>
		</view>

	</view>

</template>

<script>
	import {
		login
	} from '@/apis/admin';
	import {
		throttle
	} from '@/utils/tools';
	import {
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {
				accountText: '手机号未注册！', //手机号码校验提示语句
				passwordText: '密码错误！', //密码校验提示语句
				selectType: false, //协议切换
				showpass: true, //密码眼睛切换 false 关闭  true开启
				password: '', //密码
				phone: '', //手机号
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
					animationDuration: 200,
				})
			},


			login: throttle(async function() {
				var that = this;
				if (that.selectType == false) {
					uni.showToast({
						title: "请勾选用户协议",
						icon: 'none'
					})
				} else {
					const params = {
						username: that.phone,
						loginType: 1,
						password: that.password,

					}
					const [err, res] = await login(params)
					if (err) return
					this.$storage.set('token', res.data.token)
					this.$toast('登录成功')
					this.getInfo()
					uni.reLaunch({
						url: '../home/home',
						animationType: 'pop-in',
						animationDuration: 200,
					})
				}

			}),
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

	.textTitle {
		color: #FE3636;
		height: 40rpx;
		width: 86%;
		margin: 16rpx auto;
	}

	.selectBox {
		display: flex;
		align-items: center;
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
</style>
