<template>
	<view class="perfect-information">
		<image class="bg" :src="`${ossUrl}/common/res-success.png`"></image>
		<view class="info">为了您的用车安全，请先完善信息<view class="line"></view>
		</view>
		<view class="list">
			<view class="item">
				<view class="name">姓名</view>
				<input v-model="localRealName" type="text" placeholder="填写姓名" placeholder-class="place-input" />
			</view>
			<view class="item">
				<view class="name">身份证号</view>
				<input v-model="localIdCard" type="text" placeholder="填写身份证号" placeholder-class="place-input" />
			</view>
			<view class="item">
				<view class="name">紧急联系人</view>
				<input v-model="localEmergencyContactName" type="text" placeholder="填写紧急联系人"
					placeholder-class="place-input" />
			</view>
			<view class="item">
				<view class="name">紧急联系人联系方式</view>
				<input v-model="localEmergencyContactPhone" type="text" placeholder="填写紧急联系人联系方式"
					placeholder-class="place-input" />
			</view>
		</view>
		<view class="btn" @click="perfectInformation">确&#32;定</view>
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
				ossUrl: this.$ossUrl, // oss
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
				uni.$emit('detailRefresh')
				setTimeout(() => {
					this.$close()
				}, 500)
			})
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.perfect-information {
		padding: 40rpx;
		@include flex-col(flex-start);

		.bg {
			@include box(400rpx, 252rpx);
			margin-top: 30rpx;
		}

		.info {
			position: relative;
			@include font-set(32rpx, #000);
			line-height: 44rpx;
			margin-top: 40rpx;

			.line {
				position: absolute;
				right: 0;
				bottom: 0;
				@include box(124rpx, 8rpx, #5A7EFF);
			}
		}

		.list {
			margin-top: 60rpx;

			.item {
				@include box(670rpx, 118rpx);
				@include flex-row(space-between);

				border-bottom: 1px solid #EFF0F3;

				.name {
					@include font-set(28rpx, #000, 500);
				}

				input {
					@include box(320rpx, 40rpx);
					@include font-set(28rpx, #999);
					text-align: right;

					&.place-input {
						@include font-set(28rpx, #666);
						text-align: right;
					}
				}
			}
		}

		.btn {
			position: absolute;
			bottom: 60rpx;
			left: 50%;
			transform: translateX(-50%);
			@include box(670rpx, 96rpx, #5A7EFF);
			@include flex-center;
			@include font-set(32rpx, #fff, 700);
			border-radius: 52rpx;
		}
	}
</style>
