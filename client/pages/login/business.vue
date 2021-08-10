<template>
	<view class="">
		<view class="topNav">
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/1-1.png')" mode="aspectFill"></image>
			</view>
			<view style="font-size: 32rpx;color: #5A7EFF;">基本信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" :src="$util.fileUrl('/next2.png')" mode="aspectFill"></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/2.png')" mode="aspectFill"></image>
			</view>
			<view style="font-size: 32rpx;">证件信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" :src="$util.fileUrl('/next2.png')" mode="aspectFill"></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/3.png')" mode="aspectFill"></image>
			</view>
			<view style="font-size: 32rpx;">门店信息</view>
		</view>

		<view class="">


			<view class="fromTitel">姓名</view>
			<input class="inpBox" v-model="name" maxlength="10" type="text" placeholder="请填写姓名" />



			<view class="fromTitel">身份证号码 </view>
			<input class="inpBox" v-model="idCard" maxlength="18" type="text" placeholder="请填写身份证号码" />


			<view class="fromTitel">手机号</view>
			<input class="inpBox" v-model="phone" maxlength="11" type="text" placeholder="请填写手机号码" />



			<view class="fromTitel">验证码</view>
			<view class="moreInpbox" style="margin-top: 20rpx;">
				<view style="width: 78%;"><input class="inpBox" maxlength="6" v-model="code" style="width: 100%;margin-top: 0rpx;"
						type="text" placeholder="请填写验证码" />
				</view>
				<view style="width: 20%;background-color: #EFF0F3;color: #5A7EFF;font-size: 24rpx;"
					@click="sendRegisterCode">{{time}}</view>
			</view>



			<view class="fromTitel">邮箱</view>
			<input class="inpBox" v-model="email" maxlength="50" type="text" placeholder="请填写邮箱" />



			<view class="fromTitel">密码</view>
			<view class="moreInpbox" style="margin-top: 20rpx;">
				<view style="width: 90%;"><input v-model="password" maxlength="20" :type="inpType" class="inpBox"
						style="width: 95%;margin-top: 0rpx;" placeholder="请填写密码" /></view>
				<!-- <view style="width: 20%;background-color: #EFF0F3;color: #5A7EFF;font-size: 24rpx;"> -->
				<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/kai.png')"
					mode="aspectFill" @click="look"></image>
				<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/guan.png')"
					mode="aspectFill" @click="look"></image>
				<!-- </view> -->
			</view>



			<button style=" color: white;
			width: 80%;
					margin: 60rpx auto 20rpx;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;" type="default" @click="adminCheckRegister">下一步</button>


		</view>
	</view>
</template>

<script>
	import {
		adminCheckRegister
	} from '@/apis/admin';
	import { 
		sendRegisterCode
	} from '@/apis/sms';
	import {
		throttle
	} from '@/utils/tools';
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: '',
					sex: ''
				}, //表单列表
				show: false, //底部边框线
				showpass: false, //密码眼睛切换 false 关闭  true开启
				inpType: 'password', //切换密码框type
				name: '', //姓名
				idCard:'', //身份证号码
				phone: '', //手机号码
				code: '', //验证码
				email: '', //邮箱
				password: '', //密码
				time: '获取验证码', //倒计时
				get_code_time: 60,
				get_code_status: false
			}
		},
		onLoad() {

		},
		methods: {
			look() {

				if (this.showpass) {
					this.showpass = false
					this.inpType = 'password'
				} else {
					this.showpass = true
					this.inpType = 'number'
				}
			},

			adminCheckRegister: throttle(async function() {
				if(this.name==""){
					this.$toast('请填写姓名号码')
					return false;
				}else if(this.idCard==""){
					this.$toast('请填写身份证号码')
					return false;
				}else if(this.phone==""){
					this.$toast('请填写手机号')
					return false;
				}else if(this.code==""){
					this.$toast('请填写验证码')
					return false;
				}else if(this.email==""){
					this.$toast('请填写邮箱')
					return false;
				}else if(this.password==""){
					this.$toast('请填写密码')
					return false;
				}
				const params = {
					code: this.code,
					email: this.email,
					idCard: this.idCard,
					password: this.password,
					phone: this.phone,
					realName: this.name,
				}
				const [err, res] = await adminCheckRegister(params)
				if (err || res.code !== 200) return
				uni.navigateTo({
					url: './businessCard?obj=' + JSON.stringify(params),
				})
			}),
			sendRegisterCode: throttle(async function() {
				var that = this;

				if (that.get_code_status == false) {
					const params = {
						phone: that.phone
					}
					const [err, res] = await sendRegisterCode(params)
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
		}
	}
</script>

<style>
	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 122rpx;
		width: 100%;
		border-bottom: 20rpx solid #EFF0F3;
	}

	.inpBox {
		background-color: #EFF0F3;
		border-radius: 10rpx;
		height: 74rpx;
		width: 90%;
		margin: auto;
		font-size: 24rpx;
		color: #999999;
		padding-left: 20rpx;
		margin-top: 20rpx;
	}

	.fromTitel {
		width: 90%;
		margin: auto;
		margin-top: 40rpx;
	}

	.moreInpbox {
		display: flex;
		align-items: center;
		background-color: #EFF0F3;
		width: 90%;
		margin: auto;
		border-radius: 10rpx;
	}
</style>
