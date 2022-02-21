<template>
	<view class="charge">
		<view class="section">
			<view class="title">扣款金额</view>
			<view class="content">
				<view class="input">
					<input type="text" v-model="price" placeholder="请输入扣款金额" placeholder-class="placeholder" />
					<view class="btn-text">全部扣款</view>
				</view>
			</view>
		</view>
		<view class="section">
			<view class="title">支付项目</view>
			<view class="content">
				<view :class="['btn', { ac: acIndex === 0 }]" @click="tapPayMethod(0)">租金</view>
				<view :class="['btn', { ac: acIndex === 1 }]" @click="tapPayMethod(1)">违章扣款</view>
			</view>
		</view>
		<view class="section">
			<view class="title">
				附件上传
				<text>(请上传相关举证图片)</text>
			</view>
			<view class="content">
				<view class="pic-box" @click="addPic">
					<view v-show="!pic" class="mask"><image :src="$util.fileUrl('/camera.png')" mode="aspectFill"></image></view>
					<image v-show="pic" class="pic" :src="pic" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="confirm">确认扣款</view>
	</view>
</template>

<script>
import { chooseImgs } from '@/utils/uni-tools'
import { throttle } from '@/utils/tools'
import { uploadFiles } from '@/apis/oss'

export default {
	data() {
		return {
			acIndex: 0,
			price: '',
			pic: ''
		}
	},
	methods: {
		// 切换支付方式
		tapPayMethod(index) {
			this.acIndex = index
		},
		// 添加图片
		addPic: throttle(async function(mode) {
			const [err, res] = await chooseImgs()
			if (err) return
			const [uploadErr, uploadRes] = await uploadFiles(res)
			if (uploadErr) return
			this.pic = uploadRes[0]
		})
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';
.charge {
	padding: 0 32rpx;
	.section {
		@include box-w(100%, #fff);
		padding-top: 60rpx;
		.title {
			@include font-set(32rpx, #000);
		}
		.content {
			@include flex-row();
			margin-top: 20rpx;
			.input {
				@include box(686rpx, 74rpx, #eff0f3);
				@include flex-row(space-between);
				border-radius: 10rpx;
				padding-left: 20rpx;
				input {
					@include box(520rpx, 100%);
					@include font-set(24rpx, #666);
				}
				.placeholder {
					@include font-set(24rpx, #999);
				}
				.btn-text {
					@include box(140rpx, 100%);
					@include flex-center;
					@include font-set(24rpx, #5a7eff);
				}
			}
			.btn {
				@include box(148rpx, 60rpx);
				@include flex-center;
				font-size: 24rpx;
				border-radius: 10rpx;
				border: 1px solid #999;
				color: #999;
				& ~ .btn {
					margin-left: 30rpx;
				}
				&.ac {
					border: 0;
					background-color: #5a7eff;
					color: #fff;
				}
			}
			.pic-box {
				@include square(160rpx, #eff0f3);
				border-radius: 10rpx;
				border: 1px solid #999;
				.mask {
					@include square();
					@include flex-center;
					& > image {
						@include square(60rpx);
					}
				}
				.pic {
					@include square();
				}
			}
		}
	}
	.confirm {
		position: fixed;
		bottom: 80rpx;
		left: 50%;
		transform: translateX(-50%);
		@include box(670rpx, 96rpx, #5a7eff);
		border-radius: 50rpx;
		@include flex-center;
		@include font-set(32rpx, #fff);
	}
}
</style>
