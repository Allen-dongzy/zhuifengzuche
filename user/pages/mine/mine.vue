<template>
	<view class="box" :style="{ backgroundImage: 'url(' + `${ossUrl}/mine/userbg.png` + ')' }">
		<view class="name-box">
			<image class="avatar" :src="icon || `${ossUrl}/mine/touxiang.png`" mode="aspectFill" @click="headTap"></image>
			<view class="nickname" @click="headTap">
				{{ nickname || username || '点击登录' }}
				<view v-if="grade && Object.keys(grade).length>0" class="level-label" @click.stop="$open('/pages/mine/vip')">
					<image :src="grade.smallIcon" mode="aspectFill"></image>
					{{ grade.name }}
				</view>
				<view class="arrow"></view>
			</view>
		</view>
		<view class="all-box">
			<view>
				<view class="flex-box item">
					<image class="icon" :src="`${ossUrl}/mine/yue.png`" mode="aspectFill"></image>
					<view class="text">余额</view>
				</view>
				<view class="price">
					0.00
					<text>元</text>
				</view>
			</view>
			<view class="line"></view>
			<view @click="skip('./coupon')">
				<view class="flex-box item">
					<image class="icon" :src="`${ossUrl}/mine/youhui.png`" mode="aspectFill"></image>
					<view class="text">优惠券</view>
				</view>
				<view class="price">
					{{ couponCount }}
					<text>张</text>
				</view>
			</view>
		</view>
		<view class="flex-box function">
			<view class="flex-box-one" @click="skip('./news')">
				<image class="icon" :src="`${ossUrl}/mine/news.png`" mode="aspectFill"></image>
				<view class="gray-text">消息通知</view>
			</view>
			<view class="flex-box-one" @click="skip('./violationRecord')">
				<image class="icon" :src="`${ossUrl}/mine/weizhang.png`" mode="aspectFill"></image>
				<view class="gray-text">违章记录</view>
			</view>
			<view class="flex-box-one" @click="skip('/pages/mine/pay', { type: 1 })">
				<image class="icon" :src="`${ossUrl}/mine/fukuan.png`" mode="aspectFill"></image>
				<view class="gray-text">付款</view>
			</view>
			<view class="flex-box-one" @click="skip('/pages/mine/pay', { type: 0 })">
				<image class="icon" :src="`${ossUrl}/mine/shoukuan.png`" mode="aspectFill"></image>
				<view class="gray-text">收款</view>
			</view>
		</view>
		<view class="gray-line"></view>
		<view class="flex-box-left" @click="item.isLogin ? skip(item.path) : $open(item.path)" v-for="(item, index) in list" :key="index">
			<image class="icon" :src="`${ossUrl}${item.img}`" mode="widthFix"></image>
			<view class="text">{{ item.name }}</view>
			<image class="arrow" :src="`${ossUrl}/mine/huiyou.png`" mode="aspectFill"></image>
		</view>
		<view v-if="$storage.get('token')" class="flex-box-left" @click="logout">
			<image class="icon" :src="`${ossUrl}/mine/out.png`" mode="widthFix"></image>
			<view class="text red">退出登录</view>
		</view>
		<newbee-coupon-modal :type="1"  ref="newbeeCoupon" />
	</view>
</template>

<script>
import NewbeeCouponModal from '@/components/newbee-coupon-modal/newbee-coupon-modal'
import { open } from '@/utils/uni-tools'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			level: 0,
			list: [
				{
					name: '发票抬头',
					img: '/mine/fapiao.png',
					path: '/pages/mine/invoice',
					isLogin: true
				},
				{
					name: '银行卡',
					img: '/mine/yhk.png',
					path: './bankCard',
					isLogin: true
				},
				{
					name: '风控查询',
					img: '/mine/fengkong.png',
					path: './risk',
					isLogin: true
				},
				{
					name: '联系我们',
					img: '/mine/lianxi.png',
					path: '/pages/mine/contactUs',
					isLogin: false
				},
				{
					name: '关于追风',
					img: '/mine/about.png',
					path: '/pages/mine/aboutMe',
					isLogin: false
				}
			]
		}
	},
	components: {
		NewbeeCouponModal
	},
	computed: {
		// user 头像，用户昵称，用户名，优惠券数量 当前会员等级信息
		...mapState('user', ['icon', 'nickname', 'username', 'couponCount', 'grade'])
	},
	onPullDownRefresh() {
		this.init()
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 500)
	},
	onLoad() {
		this.eventListener()
	},
	methods: {
		// user  清空用户信息
		...mapMutations('user', ['clearInfo']),
		// user 获取用户信息
		...mapActions('user', ['getUserInfo']),
		// 初始化
		init() {
			this.getUserInfo('refresh')
		},
		// 公共跳转
		skip(url, params = {}) {
			if (!this.$storage.get('token')) {
				this.$toast('请前往登录！')
				setTimeout(() => {
					this.$open('/pages/common/login')
				}, 500)
				return
			}
			this.$open(url, params)
		},
		// 头部跳转
		headTap() {
			if (this.$storage.get('token')) this.$open('/pages/mine/personalInformation')
			else this.$open('/pages/common/login', { from: 'mine' })
		},
		// 退出登录
		logout() {
			this.$showLoading('退出中')
			this.clearInfo()
			this.$storage.remove('token')
			setTimeout(() => {
				uni.hideLoading()
			}, 500)
		},
		// 监听事件
		eventListener() {
			uni.$on('appRefresh', () => {
				// #ifdef MP-ALIPAY
				this.$refs.newbeeCoupon.findNewCoupon()
				// #endif
			})
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

.box {
	height: 220rpx;
	width: 100%;
	background-position: center;
	background-size: 100% 100%;
	padding-top: 200rpx;
}

.name-box {
	display: flex;
	align-items: center;
	margin-left: 40rpx;

	.avatar {
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
	}

	.nickname {
		@include flex-row();
		font-size: 40rpx;
		line-height: 56rpx;
		color: #fff;
		margin-left: 30rpx;

		.level-label {
			@include box(120rpx, 40rpx, #525252);
			@include flex-center;
			border-radius: 32rpx;
			@include font-set(20rpx, #fff, 700);
			margin-left: 16rpx;

			& > image {
				@include square(26rpx);
				display: block;
				margin-right: 15rpx;
			}
		}

		.arrow {
			@include square(16rpx);
			border: 1px solid #fff;
			border-left: 0;
			border-bottom: 0;
			transform: rotate(45deg);
			margin-left: 8rpx;
		}
	}
}

.flex-box {
	display: flex;
	justify-content: center;
	align-items: center;

	.item {
		width: 100%;
		height: 48rpx;
		border-radius: 10rpx;
	}

	.icon {
		height: 36rpx;
		width: 36rpx;
	}

	.text {
		margin-left: 15rpx;
		@include font-set(28rpx, #000);
		line-height: 40rpx;
	}

	&.function {
		padding: 0 48rpx;
		@include flex-row(space-between);
	}
}

.price {
	@include font-set(60rpx, #000, 500);
	line-height: 84rpx;

	text {
		@include font-set(24rpx, #000, 700);
		line-height: 34rpx;
		margin-left: 4rpx;
	}
}

.all-box {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	width: 90%;
	margin: auto;
	border-radius: 20rpx;
	margin-top: 30rpx;
	padding: 25rpx 0px;
	box-shadow: 5rpx 5rpx 2rpx rgba(114, 141, 244, 0.25);

	& > view {
		@include flex-col();
	}
}

.flex-box-left {
	display: flex;
	align-items: center;
	width: 90%;
	margin: auto;
	padding: 40rpx 0rpx;

	& ~ .flex-box-left {
		border-top: 2rpx solid #eff0f3;
	}

	.text {
		font-size: 28rpx;
		color: black;
		width: 90%;
		margin-left: 20rpx;
		&.red {
			color: #fc3736;
		}
	}

	.icon {
		width: 45rpx;
	}

	.arrow {
		height: 38rpx;
		width: 22rpx;
	}
}

.line {
	height: 40rpx;
	width: 4rpx;
	background-color: #5a7eff;
	margin: 0px 70rpx;
}

.label {
	color: #fff;
	border-radius: 30rpx;
	padding: 5rpx 25rpx;
	background-color: #fc3736;
}

.goout {
	height: 72rpx;
	line-height: 72rpx;
	text-align: center;
	background-color: #eff0f3;
	color: #999999;
	font-size: 28rpx;
	width: 70%;
	margin: auto;
	border-radius: 50rpx;
	margin-top: 48vh;
}

.gray-text {
	font-size: 24rpx;
	color: #999999;
	text-align: center;
	margin-top: 10rpx;
}

.gray-line {
	height: 20rpx;
	width: 100%;
	background-color: #eff0f3;
}

.flex-box-one {
	@include flex-col();
	margin: 30rpx 0;

	.icon {
		height: 80rpx;
		width: 80rpx;
		display: block;
	}
}
</style>
