<template>
	<view class="content">
		<view class="topimg">
			<image class="loginBox" :src="$util.fileUrl('/logo.png')" mode="aspectFill"></image>
		</view>
		<view class="topimg2">
			<image style="height:544rpx;width: 544rpx;" :src="$util.fileUrl('/loginbg.png')" mode="aspectFill"></image>
		</view>
		<view class="setbox">

			<input style="background-color: #EFF0F3;
    width: 90%;
	margin-left: 5%;
	font-size: 24rpx;
    height: 96rpx;
    border-radius: 10rpx;padding-left: 20rpx;" type="text" v-model="phone" placeholder="请输入手机号" />


			<view class="textTitle">{{account}}</view>
			<view style="display: flex;justify-content: center;align-items: center;">
				<view style="height: 96rpx;line-height: 96rpx;width: 66%;">
					<input placeholder="请输入验证码" v-model="code" class="codeInp" type="text" value="" />
				</view>
				<view class="codeText" @click="sendForgotCode">{{time}}</view>
			</view>

			<view class="textTitle">{{codeText}}</view>

			<view class="moreInpbox">
				<view style="width: 90%;">
					<input :type="inpType" v-model="password1" placeholder="请输入密码" class="inpBox" style="width: 95%;" />
				</view>

				<image v-if="showpass==true" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/guan.png')"
					mode="aspectFill" @click="look"></image>
				<image v-if="showpass==false" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/kai.png')"
					mode="aspectFill" @click="look"></image>

			</view>

			<view class="textTitle">{{password}}</view>

			<view class="moreInpbox">
				<view style="width: 90%;">
					<input v-model="password2" :type="inpType1" placeholder="请确认密码" class="inpBox" style="width: 95%;">
				</view>
				<image v-if="showpass1==true" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/guan.png')"
					mode="aspectFill" @click="look1"></image>
				<image v-if="showpass1==false" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/kai.png')"
					mode="aspectFill" @click="look1"></image>

			</view>




			<button style=" color: white;
			width: 80%;
					margin: 20rpx auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;" type="default" @tap="updatePassword">完成</button>
		</view>

	</view>

</template>

<script>
	import {
		throttle
	} from '@/utils/tools';

	import {
		sendForgotCode
	} from '@/apis/sms';
	import {
		updatePassword
	} from '@/apis/admin';


	export default {
		data() {
			return {
				account: '', //手机号校验提示语句
				codeText: '', //验证码校验提示语句
				password: '', //密码校验提示语句
				showpass: true, //密码眼睛切换 false 关闭  true开启
				inpType: '',
				showpass1: true, //密码眼睛切换 false 关闭  true开启
				inpType1: '',
				phone: '', //账号
				code: '', //验证码
				password1: '', //密码1
				password2: '', //密码2
				time: '获取验证码', //倒计时
				get_code_time: 60,
				get_code_status: false
			}
		},
		methods: {

			updatePassword: throttle(async function() {
				if (this.code == "") {
					this.$toast('请输入验证码')
					return false;
				} else if (this.phone == "") {
					this.$toast('请输入手机号')
					return false;
				} else if (this.password1 == "") {
					this.$toast('请输入密码')
					return false;
				} else if (this.password2 == "") {
					this.$toast('请输入确认密码')
					return false;
				}
				const params = {
					code: this.code,
					username: this.phone,
					newPassword: this.password1,
				}
				if (this.password1 == this.password2) {
					const [err, res] = await updatePassword(params)
					if (err || res.code !== 200) return
					console.log(res)
					uni.navigateBack({
						delta: 1
					})
				} else {

				}
			}),


			sendForgotCode: throttle(async function() {
				var that = this;

				if (that.get_code_status == false) {
					const params = {
						phone: that.phone
					}
					const [err, res] = await sendForgotCode(params)
					if (err) return
					var timer = setInterval(function() {
						if (that.get_code_time > 1) {
							that.get_code_time = that.get_code_time - 1
							that.time = '剩余' + that.get_code_time + '秒'
							that.get_code_status = true
						} else {
							clearInterval(timer);
							that.get_code_time = 60
							that.time = '获取验证码'
							that.get_code_status = false
						}

					}, 1000);
				}

			}),
			look() {
				console.log('ppp')
				if (this.showpass) {
					this.showpass = false
					this.inpType = 'password'
				} else {
					this.showpass = true
					this.inpType = 'number'
				}
			},
			look1() {
				console.log('ppp')
				if (this.showpass1) {
					this.showpass1 = false
					this.inpType1 = 'password'
				} else {
					this.showpass1 = true
					this.inpType1 = 'number'
				}
			},
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
		margin-top: 430rpx;
		border-radius: 20rpx;
		padding: 60rpx 0px;

	}


	.textTitle {
		color: #FE3636;
		height: 40rpx;
		width: 86%;
		margin: 16rpx auto;
	}


	.codeInp {

		height: 100%;
		width: 100%;
		background-color: #EFF0F3;
		font-size: 24rpx;
		border-bottom-left-radius: 10rpx;
		border-top-left-radius: 10rpx;
		padding-left: 20rpx;
	}

	.codeText {
		height: 96rpx;
		line-height: 96rpx;
		color: #5A7EFF;
		font-size: 24rpx;
		background-color: #EFF0F3;
		padding: 0px 20rpx;
		border-bottom-right-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}


	.moreInpbox {
		display: flex;
		align-items: center;
		background-color: #EFF0F3;
		width: 90%;
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
