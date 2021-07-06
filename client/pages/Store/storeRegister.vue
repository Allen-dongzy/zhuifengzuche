<template>
	<view class="store-register">
		<view class="head">
			<view class="toast">*长按文本可复制</view>
			<view class="item">门店名称: <text @click="copy('这里是门店名称')">{{info.name}}</text></view>
			<view class="item">注册手机号: <text @click="copy('15823659632')">{{info.phone}}</text></view>
			<view class="item">联系人: <text @click="copy('15823659632')">{{info.principal}}</text></view>
			<view class="item">联系人身份证号: <text @click="copy('15823659632')">{{info.idCard}}</text></view>
			<view class="item">联系人电话: <text @click="copy('15823659632')">{{info.principalPhone}}</text></view>
		</view>
		<view class="pic-panel">
			<view class="item">
				<view class="caption">营业执照</view>
				<view class="pic-box">
					<image class="pic-big"
						:src="info.businessLicense"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">法人身份证照片</view>
				<view class="pic-box">
					<image class="pic-big"
						:src="info.idCardFront"
						mode="aspectFill"></image>
					<image class="pic-big"
						:src="info.idCardBack"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">门店图片-门头照片</view>
				<view class="pic-box">
					<image class="pic"
						:src="info.doorHeadPicture"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">门店图片-店内照片</view>
				<view class="pic-box">
					<image class="pic"
						:src="info.inStorePicture"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">门店图片-店铺室外照片</view>
				<view class="pic-box">
					<image class="pic"
						:src="info.outdoorPictures"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="caption">对公账户开户许可证</view>
				<view class="pic-box">
					<image class="pic"
						:src="info.accountOpeningPermit"
						mode="aspectFill"></image>
				</view>
			</view>
			<view class="bottom">
				<view class="caption">收钱吧注册</view>
				<view class="register-info" @click="showModal">{{ showText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		showModal
	} from '@/utils/uni-tools'
	import {
		merchantRegistrationInformation,
		changeRegistrationStatus
	} from '@/apis/memberShop.js'
	export default {
		data() {
			return {
				showText: '',
				info:{},
				id:''
			}
		},
		onLoad(e) {
			this.id=e.id
			this.getInfo(e.id)
			
			console.log(e)
		},
		methods: {
		 async	getInfo(e){
				const [err,res] = await merchantRegistrationInformation(e)
				if (err) return
				console.log(res)
				this.info=res.data
				if(this.info.registrationStatus==0){
					this.showText="未注册"
				}else{
					this.showText="已注册"
				}
			},
			// 显示模态框
			async showModal() {
				if(this.showText=='已注册'){
					
				}else{
					const [err, res] = await showModal({
						content: '是否将状态改为已注册？',
						confirmText: '是', 
						cancelText: '否'
					}) 
					if (err || res !== 'confirm') return
					const [error,data] = await changeRegistrationStatus(this.id)
					if(error) return  
					console.log(data)
					this.showText = '已注册'
				}
			},
			copy(e){
				uni.setClipboardData({
				    data: e,
				    success: function () {
				        this.$toast("复制成功")
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
		background-color: #EFF0F3;
	}

	.store-register {
		.head {
			@include box-w(100%, #fff);
			padding: 40rpx 32rpx;

			.toast {
				@include font-set(20rpx, #FFA05B, 700);
				line-height: 28rpx;
			}

			.item {
				@include flex-row();
				@include font-set(28rpx, #000, 700);
				line-height: 40rpx;
				margin-top: 40rpx;

				text {
					font-weight: 400;
					margin-left: 10rpx;
				}
			}
		}

		.pic-panel {
			@include box-w(100%, #fff);
			padding: 1rpx 34rpx 40rpx;
			margin-top: 20rpx;

			.item {
				margin-top: 39rpx;

				.caption {
					@include font-set(28rpx, #000, 700);
					line-height: 40rpx;
				}

				.pic-box {
					@include flex-row();
					margin-top: 20rpx;

					.pic {
						@include square(160rpx);
						border: 1px solid #ddd;
						border-radius: 10rpx;
					}

					.pic-big {
						@include box(330rpx, 186rpx);
						border-radius: 10rpx;
						border: 1px solid #ddd;

						&~.pic-big {
							margin-left: 26rpx;
						}
					}
				}
			}

			.bottom {
				@include flex-row(space-between);

				.caption {
					@include font-set(28rpx, #000, 700);
					line-height: 40rpx;
				}

				.register-info {
					@include font-set(28rpx, #5A7EFF, 700);
					line-height: 40rpx;
				}

				margin-top: 40rpx;
			}
		}
	}
</style>
