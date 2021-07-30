<template>
	<view>
		<view class="flexBox">
			<view class="title">姓名</view>
			<view class="value">
				<input v-model="localRealName" :maxlength="10" type="text" placeholder-class="input"
					placeholder="填写姓名" />
			</view>
		</view>
		<view class="flexBox">
			<view class="title">身份证号</view>
			<view class="value">
				<input v-model="localIdCard" :maxlength="18" type="text" placeholder-class="input"
					placeholder="填写身份证号" />
			</view>
		</view>
		<view class="flexBox">
			<view class="title">紧急联系人</view>
			<view class="value">
				<input v-model="localEmergencyContactName" :maxlength="10" type="text" placeholder-class="input"
					placeholder="填写紧急联系人" />
			</view>
		</view>
		<view class="flexBox">
			<view class="title">紧急联系人方式</view>
			<view class="value">
				<input v-model="localEmergencyContactPhone" :maxlength="11" type="number" placeholder-class="input"
					placeholder="填写紧急联系人方式" />
			</view>
		</view>
		<button class="btn" @click="perfectInformation">完成</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		perfectInformation
	} from '@/apis/sso'
	import {
		throttle
	} from '@/utils/tools'
	import {
		isIdentity,
		isPhone
	} from 'crazy-validator'

	export default {
		data() {
			return {
				localRealName: '', // 真实姓名
				localIdCard: '', // 身份证
				localEmergencyContactName: '', // 紧急联系人
				localEmergencyContactPhone: '' // 紧急联系人电话
			}
		},
		computed: {
			// user 真实姓名，身份证，紧急联系人，紧急联系人电话
			...mapState('user', ['realName', 'idCard', 'emergencyContactName', 'emergencyContactPhone'])
		},
		onLoad() {
			if (this.realName) this.localRealName = this.realName
			if (this.idCard) this.localIdCard = this.idCard
			if (this.emergencyContactName) this.localEmergencyContactName = this.emergencyContactName
			if (this.emergencyContactPhone) this.localEmergencyContactPhone = this.emergencyContactPhone
		},
		methods: {
			// user 设置用户信息
			...mapMutations('user', ['setUserInfo']),
			// 完善信息
			perfectInformation: throttle(async function() {
				if (this.localIdCard && !isIdentity(this.localIdCard, this.$toast('请输入正确的身份证号'))) return
				if (this.localEmergencyContactPhone && !isPhone(this.localEmergencyContactPhone, this.$toast(
						'请输入正确的手机号'))) return
				const params = {
					realName: this.localRealName,
					idCard: this.localIdCard,
					emergencyContactName: this.localEmergencyContactName,
					emergencyContactPhone: this.localEmergencyContactPhone
				}
				const [err, res] = await perfectInformation(params)
				if (err) return
				this.$toast('提交成功')
				this.setUserInfo(params)
				setTimeout(() => {
					this.$close()
				}, 500)
			})
		}
	}
</script>

<style lang="scss">
	.flexBox {
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		border-bottom: 2rpx solid #EFF0F3;
		padding: 30rpx 0rpx;
	}

	.title {
		width: 60%;
		font-size: 28rpx;
		font-weight: 400;
	}

	.value {
		width: 40%;
		margin: auto;
		text-align: right;

		&>input {
			height: 100%;
			width: 100%;
			font-size: 24rpx;
		}

		.input {}
	}

	.uni-input {
		text-align: right;
		color: #999999;
		font-size: 28rpx;
	}

	.delBox {
		width: 20%;
		text-align: center;
		margin: auto;
		color: #FE3636;
		font-size: 24rpx;
		margin-top: 30rpx;
	}

	.btn {
		color: white;
		width: 90%;
		margin: auto;
		margin-top: 25vh;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
	}
</style>
