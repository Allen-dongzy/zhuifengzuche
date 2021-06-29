<template>
	<view class="">
		<view class="head" style="width: 100%;padding:30rpx 0rpx;border-bottom: 20rpx #EFF0F3 solid;">
			<view style="width: 90%;margin: auto;">
				<view class="allFlex">
					<image style="height:120rpx;width:120rpx" :src="$util.fileUrl('/logo2.png')" mode=""></image>
					<view style="margin-left: 30rpx;">
						<view class="name">门店名称</view>
						<view class="addres">这是门店地址</view>
						<view class="allFlex">
							<image style="height: 36rpx;width: 36rpx;margin-left: 5rpx;"
								:src="$util.fileUrl('/xing.png')" mode=""></image>
						</view>
					</view>
				</view>
				<view class="allFlex">
					<view class="title">门店状态</view>
					<view v-if="storeType==false" class="conten" style="color: #597DFE;" @click="openStore('开启')">开启
					</view>
					<view v-else class="conten" style="color: #597DFE;" @click="openStore('关闭')">关闭</view>
				</view>
			</view>
			<view class="show-status" @click="$open('/pages/Store/storeRegister')">
				<text>已注册</text>
				<view class="arrow"></view>
			</view>
		</view>

		<view style="padding-bottom: 40rpx;border-bottom: 20rpx solid #EFF0F3;margin-top: 40rpx;width: 100%;">
			<view style="width: 90%;margin: auto;">
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title" style="font-weight: bold;">门店信息</view>
					<view class="conten" style="color: #597DFE;">正在营业</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">联系电话：</view>
					<view class="conten">18888888888</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">营业时间：</view>
					<view class="conten">08:00 - 22:00</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">门店地址：</view>
					<view class="conten">这里是门店地址</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">负责人：</view>
					<view class="conten">张全蛋</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">负责人电话：</view>
					<view class="conten">18888888888</view>
				</view>
				<view class="allFlex" style="margin-top: 20rpx;">
					<view class="title">推荐码：</view>
					<view class="conten">ABCD12</view>
				</view>
				<view class="allFlex" style="margin-top: 40rpx;">
					<view class="point" style="margin-left: 50%;" @click="point">送车点管理</view>
					<view class="point" style="margin-left: 20rpx;" @click="staff">员工管理</view>
				</view>

			</view>
		</view>
		<view style="font-size: 32rpx;color: #000000;width: 90%;margin: auto;margin-top: 40rpx;">评价（<text
				style="font-size: 32rpx;color: #5A7EFF;">123</text>）条</view>
		<view style="width: 90%;margin: auto;border-bottom: 2rpx solid #EFF0F3;padding: 20rpx 0rpx;">
			<view class="allFlex">
				<image style="height: 64rpx;width: 64rpx;" src="../../static/img/home@2x.png" mode=""></image>
				<view style="width: 60%;margin-left:12rpx;">
					<view style="font-size: 28rpx;color: #000000;">隔壁老*</view>
					<view class="">
						<image style="height: 36rpx;width: 36rpx;margin-left: 5rpx;" :src="$util.fileUrl('/xing.png')"
							mode=""></image>
					</view>
				</view>
				<view style="color: #B2B2B2;font-size: 24rpx;">2021-05-18</view>
			</view>
			<view style="color: #000000;font-size: 28rpx;margin-left: 70rpx;margin-top: 20rpx;">服务特别好，牛逼plus!</view>
			<view style="color:#FC3736;font-size: 28rpx;width: 100%;text-align: right;">删除</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeType: false,
			}
		},
		methods: {
			openStore(e) {
				var that = this;
				uni.showModal({
					title: '门店状态',
					content: '要' + e + '门店吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							if (that.storeType) {
								that.storeType = false
							} else {
								that.storeType = true
							}

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			point() {
				uni.navigateTo({
					url: './storePoint',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			staff() {
				uni.navigateTo({
					url: './staff',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.head {
		position: relative;
		.show-status {
			@include right-top(40rpx, 40rpx);
			@include flex-row();
			@include font-set(28rpx, #5A7EFF, 700);
			line-height: 40rpx;
			.arrow {
				@include square(16rpx);
				border: 1px solid #999;
				border-left: 0;
				border-top: 0;
				transform: rotate(-45deg);
				margin-left: 6rpx;
			}
		}
	}

	.allFlex {
		display: flex;
		align-items: center;
	}

	.name {
		color: black;
		font-size: 28rpx;
	}

	.addres {
		font-size: 24rpx;
		color: #B2B2B2;
	}

	.title {
		width: 25%;
		font-size: 28rpx;
		color: #000000
	}

	.conten {
		width: 75%;
		text-align: right;
		font-size: 28rpx;
		color: #999999;
	}

	.point {
		border: 2rpx solid #5A7EFF;
		height: 60rpx;
		width: 162rpx;
		font-size: 24rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #5A7EFF;
	}
</style>
