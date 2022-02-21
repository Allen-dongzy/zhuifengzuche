<template>
	<view class="offline-order">
		<view class="title">
			<view class="label"></view>
			<text>信息</text>
		</view>
		<view class="form">
			<view class="form-item">
				<view class="caption">车牌号</view>
				<view class="input" :class="{ ac: carNumber }" @click="openCarNumber">
					{{ carNumber || '请选择车牌号' }}
					<image class="arrow" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill"></image>
				</view>
			</view>
			<view class="form-item">
				<view class="caption">时间</view>
				<view class="input" :class="{ ac: carNumber }" @click="openStartTime">
					{{ startTime || '请选择出发时间' }}
					<image class="arrow" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill"></image>
				</view>
			</view>
			<view class="form-item">
				<view class="caption"></view>
				<view class="input" :class="{ ac: carNumber }" @click="openEndTime">
					{{ endTime || '请选择结束时间' }}
					<image class="arrow" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill"></image>
				</view>
			</view>
			<view class="form-item">
				<view class="caption">客户姓名</view>
				<view class="input"><input type="text" v-model="name" :disabled="!isEdit" placeholder="请输入客户姓名" placeholder-class="placeholder" /></view>
			</view>
			<view class="form-item">
				<view class="caption">身份证号码</view>
				<view class="input"><input type="text" v-model="identity" :disabled="!isEdit" placeholder="请输入身份证号码" placeholder-class="placeholder" /></view>
			</view>
			<view class="form-item">
				<view class="caption">联系电话</view>
				<view class="input"><input type="text" v-model="phone" :disabled="!isEdit" placeholder="请输入联系电话" placeholder-class="placeholder" /></view>
			</view>
			<view class="form-item">
				<view class="caption">租金</view>
				<view class="input"><input type="text" v-model="rental" :disabled="!isEdit" placeholder="请输入租金金额" placeholder-class="placeholder" /></view>
			</view>
			<view class="form-item">
				<view class="caption">押金</view>
				<view class="input"><input type="text" v-model="deposit" :disabled="!isEdit" placeholder="请输入押金金额" placeholder-class="placeholder" /></view>
			</view>
			<view v-show="!isEdit" class="form-item">
				<view class="caption"></view>
				<view class="input"><input type="text" v-model="deposit" :disabled="!isEdit" /></view>
			</view>
			<view v-show="!isEdit" class="form-item">
				<view class="caption"></view>
				<view class="manage" @click="goFreeManage">免押管理</view>
			</view>
			<view v-show="false" class="tip">*&nbsp;信息不匹配</view>
		</view>
		<view class="line"></view>
		<view class="title-bar">
			其他信息
			<view class="arrow-box" @click="toggleKeyBox"><image class="arrow" :class="{ ac: boxKey }" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill"></image></view>
		</view>
		<view class="key-box" v-show="boxKey">
			<view class="second-form">
				<view class="form-item">
					<view class="caption">行驶证照片</view>
					<view class="card-box">
						<view class="card" @click="addListencePic('driverFront')">
							<image v-show="driverFront" class="pic" :src="driverFront" mode="aspectFill"></image>
							<view v-show="!driverFront" class="mask">
								<image :src="$util.fileUrl('/camera.png')" mode="aspectFill"></image>
								<text>点击上传行驶证正页</text>
							</view>
						</view>
						<view class="card" @click="addListencePic('driverReverse')">
							<image v-show="driverReverse" class="pic" :src="driverReverse" mode="aspectFill"></image>
							<view v-show="!driverReverse" class="mask">
								<image :src="$util.fileUrl('/camera.png')" mode="aspectFill"></image>
								<text>点击上传行驶证副页</text>
							</view>
						</view>
					</view>
				</view>
				<view class="form-item">
					<view class="caption">身份证照片</view>
					<view class="card-box">
						<view class="card" @click="addListencePic('identityFront')">
							<image v-show="identityFront" class="pic" :src="identityFront" mode="aspectFill"></image>
							<view v-show="!identityFront" class="mask">
								<image :src="$util.fileUrl('/camera.png')" mode="aspectFill"></image>
								<text>点击上传身份证正页</text>
							</view>
						</view>
						<view class="card" @click="addListencePic('identityReverse')">
							<image v-show="identityReverse" class="pic" :src="identityReverse" mode="aspectFill"></image>
							<view v-show="!identityReverse" class="mask">
								<image :src="$util.fileUrl('/camera.png')" mode="aspectFill"></image>
								<text>点击上传身份证副页</text>
							</view>
						</view>
					</view>
				</view>
				<view class="form-item">
					<view class="caption">驾驶证照片</view>
					<view class="card-box">
						<view class="card" @click="addListencePic('driversFront')">
							<image v-show="driversFront" class="pic" :src="driversFront" mode="aspectFill"></image>
							<view v-show="!driversFront" class="mask">
								<image :src="$util.fileUrl('/camera.png')" mode="aspectFill"></image>
								<text>点击上传驾驶证正页</text>
							</view>
						</view>
						<view class="card" @click="addListencePic('driversReverse')">
							<image v-show="driversFront" class="pic" :src="driversFront" mode="aspectFill"></image>
							<view v-show="!driversFront" class="mask">
								<image :src="$util.fileUrl('/camera.png')" mode="aspectFill"></image>
								<text>点击上传驾驶证副页</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="title">
				<view class="label"></view>
				<text>其他照片</text>
			</view>
			<view class="add-box">
				<view class="img-box" :class="{ bottom: !isEdit }">
					<view v-for="(item, index) in otherPics" :key="index" class="img-item">
						<image class="pic" :src="item" mode="aspectFill" @click="previewPics(otherPics, index)"></image>
						<image class="btn" :src="$util.fileUrl('/lancha.png')" mode="aspectFill" @click="deletePic(index)"></image>
					</view>
					<view v-if="otherPics.length < 3" class="img-item" @click="addOtherPics">
						<image class="add" :src="$util.fileUrl('/camera.png')" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view v-show="isEdit" class="add-btn-box"><view class="add-btn">新&nbsp;增</view></view>
		<lb-picker ref="car" v-model="carNumber" :list="list" />
		<lb-picker ref="startTime" mode="dateSelector" v-model="startTime" />
		<lb-picker ref="endTime" mode="dateSelector" v-model="endTime" />
	</view>
</template>

<script>
import LbPicker from '@/components/lb-picker'
import { chooseImgs, previewImgs } from '@/utils/uni-tools'
import { throttle } from '@/utils/tools'
import { uploadFiles } from '@/apis/oss'

export default {
	components: {
		LbPicker
	},
	data() {
		return {
			isEdit: false,
			boxKey: false,
			name: '',
			carNumber: '',
			startTime: '',
			endTime: '',
			name: '',
			identity: '',
			phone: '',
			rental: '',
			deposit: '',
			list: [
				{
					label: '选项1',
					value: '1'
				},
				{
					label: '选项2',
					value: '2'
				}
			],
			driverFront: '',
			driverReverse: '',
			identityFront: '',
			identityReverse: '',
			driversFront: '',
			driversReverse: '',
			otherPics: []
		}
	},
	onLoad(e) {
		let title = '添加车辆'
		if (e && e.title) {
			title = e.title
		}
		uni.setNavigationBarTitle({
			title
		})
	},
	methods: {
		// 打开车牌号选取
		openCarNumber() {
			if (!this.isEdit) return
			this.$refs.car.show()
		},
		// 关闭车牌号选取
		closeCarNumber() {
			this.$refs.car.close()
		},
		// 打开开始时间选取
		openStartTime() {
			if (!this.isEdit) return
			this.$refs.startTime.show()
		},
		// 关闭开始时间选取
		closeStartTime() {
			this.$refs.startTime.close()
		},
		// 打开结束时间选取
		openEndTime() {
			if (!this.isEdit) return
			this.$refs.endTime.show()
		},
		// 关闭结束时间选取
		closeEndTime() {
			this.$refs.endTime.close()
		},
		// 切换显示状态
		toggleKeyBox() {
			this.boxKey = !this.boxKey
		},
		// 添加证件
		addListencePic: throttle(async function(mode) {
			if (!this.isEdit) return
			const [err, res] = await this.addPic()
			if (err) return
			this[`${mode}`] = res[0]
		}),
		// 添加其他图片
		addOtherPics: throttle(async function(mode) {
			if (!this.isEdit) return
			const [err, res] = await this.addPic()
			if (err) return
			this.otherPics = [...this.otherPics, ...res]
		}),
		// 添加图片
		async addPic() {
			const [err, res] = await chooseImgs()
			if (err) return [err]
			const [uploadErr, uploadRes] = await uploadFiles(res)
			if (uploadErr) return [uploadErr]
			return [null, uploadRes]
		},
		// 删除图片
		deletePic(index) {
			this.otherPics.splice(index, 1)
		},
		// 预览
		previewPics(urls, index) {
			previewImgs(urls, index)
		},
		// 前往免押管理
		goFreeManage() {
			this.$open('/pages/home/freeManage')
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';
page {
	background-color: #eff0f3;
}
.offline-order {
	.title {
		@include box-h(140rpx, #eff0f3);
		@include flex-row();
		padding: 0 40rpx;
		.label {
			@include box(8rpx, 24rpx, #5a7eff);
			border-radius: 20rpx;
			margin-right: 12rpx;
		}
		@include font-set(32rpx, #000, 500);
		& > text {
			transform: translateY(-2rpx);
		}
	}
	.form {
		background-color: #fff;
		padding: 40rpx 32rpx;
		.form-item {
			@include flex-row(space-between);
			& ~ .form-item {
				margin-top: 40rpx;
			}
			.caption {
				@include font-set(28rpx, #000, 500);
			}
			.input {
				position: relative;
				@include box(520rpx, 74rpx, #eff0f3);
				@include flex-row();
				border-radius: 10rpx;
				padding: 18rpx 20rpx;
				@include font-set(24rpx, #999);
				&.ac {
					@include font-set(24rpx, #666);
				}
				.arrow {
					position: absolute;
					right: 20rpx;
					top: 50%;
					transform: translateY(-50%);
					@include box(32rpx, 16rpx);
					display: block;
				}
				.placeholder {
					@include font-set(24rpx, #999);
				}
				& > input {
					@include font-set(24rpx, #666);
					@include flex-row();
				}
			}
			.manage {
				@include box(520rpx, 60rpx, #5a7eff);
				@include font-set(24rpx, #fff);
				@include flex-center;
				border-radius: 10rpx;
			}
		}
		.tip {
			@include font-set(28rpx, #fa5151);
			margin-top: 40rpx;
			text-align: right;
		}
	}
	.line {
		@include box-h(20rpx, #eff0f3);
	}
	.title-bar {
		@include box(100%, 124rpx, #fff);
		@include flex-row(space-between);
		@include font-set(32rpx, #000);
		padding-left: 32rpx;
		.arrow-box {
			@include box(100rpx, 100%);
			@include flex-center;
			.arrow {
				@include box(36rpx, 18rpx);
				&.ac {
					transform: rotate(180deg);
				}
			}
		}
	}
	.key-box {
		background-color: #fff;
	}
	.second-form {
		padding: 0 32rpx 40rpx;

		.form-item {
			& ~ .form-item {
				margin-top: 40rpx;
			}
			.caption {
				@include font-set(28rpx, #000);
			}
			.card-box {
				margin-top: 20rpx;
				@include flex-row(space-between);
				.card {
					@include box(330rpx, 186rpx, #eff0f3);
					.pic {
						@include square();
					}
					.mask {
						@include square();
						@include flex-col();
						& > image {
							@include square(45rpx);
							display: block;
						}
						& > text {
							@include font-set(24rpx, #aaa);
							margin-top: 16rpx;
						}
					}
				}
			}
		}
	}
	.img-box {
		@include flex-row();
		padding: 60rpx 30rpx 0;
		&.bottom {
			padding-bottom: 60rpx;
		}
		.img-item {
			position: relative;
			@include square(160rpx, #eff0f3);
			@include flex-center;
			border-radius: 10rpx;
			.pic {
				@include square();
				border-radius: 10rpx;
			}
			.btn {
				position: absolute;
				right: -10rpx;
				top: -10rpx;
				@include circle(36rpx);
				display: block;
			}
			.add {
				@include square(60rpx);
			}
			& ~ .img-item {
				margin-left: 16rpx;
			}
		}
	}
}
.add-btn-box {
	padding: 60rpx 0 96rpx;
	background-color: #fff;
	.add-btn {
		@include box(670rpx, 96rpx, #5a7eff);
		border-radius: 50rpx;
		@include flex-center;
		@include font-set(32rpx, #fff);
		margin: 0 auto;
	}
}
</style>
