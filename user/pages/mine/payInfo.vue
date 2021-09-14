<template>
	<view class="">
		<view class="titlebox" :style="{ backgroundImage: 'url(' + `${ossUrl}/mine/payinfo.png` + ')' }">
			<view style="margin-left: 30rpx;padding-top: 60rpx;color:white;">{{ info.examineStatus | statusFilter(type) }}</view>
		</view>
		<view class="titleName">
			<view class="blackText">{{ info.projectName }}</view>
			<view class="grayTetx">{{ info.carNumber }}丨{{ info.createTime ? info.createTime.split(' ')[0] : '' }}</view>
		</view>
		<view class="flexBox">
			<view class="flexleft">店员</view>
			<view class="flexright">{{ info.staffName }}</view>
		</view>
		<view class="flexBox">
			<view class="flexleft">平台</view>
			<view class="flexright">{{ info.platform | platformFilter }}</view>
		</view>
		<view class="flexBox">
			<view class="flexleft">金额</view>
			<view class="flexright" style="color: #FC3736;">¥{{ info.money }}</view>
		</view>
		<view class="flexBox">
			<view class="flexleft">付款人</view>
			<view class="flexright">{{ info.payer }}</view>
		</view>
		<view class="flexBox">
			<view class="flexleft">银行卡</view>
			<view v-if="info.bankCardVO" class="flexright">{{ info.bankCardVO.bankName }} {{ info.bankCardVO.cardNumber }}</view>
		</view>
		<view style="width: 90%;margin: auto;margin-top: 30rpx;font-size: 28rpx;">备注</view>
		<view style="width: 90%;margin: auto;margin-top: 30rpx;color: #999999;font-size: 24rpx;">{{ info.remarks }}</view>
		<view style="width: 90%;margin: auto;">
			<view v-for="(item, index) in images" :key="index" style="display: inline-block;margin: 40rpx 20rpx 40rpx 0;" @click="previewPics(images, index)">
				<image style="width:160rpx;height:160rpx;" :src="item" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
import { receiptPaymentFindOneById } from '@/apis/receiptPayment'
import { previewImgs } from '@/utils/uni-tools'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			type: null, // 0收款 1付款
			id: '',
			info: {}
		}
	},
	computed: {
		images() {
			return this.info && this.info.image ? JSON.parse(this.info.image) : []
		}
	},
	filters: {
		statusFilter(status, type) {
			if (!status && status !== 0) return ''
			const statusBox = ['待确认', '已收款', '审核中', '未通过']
			if (type === 1) statusBox[1] = '已付款'
			return statusBox[status]
		},
		platformFilter(platform) {
			return platform === 0 ? '追风租车' : '其他租车OTA'
		}
	},
	onLoad(e) {
		if (e && e.type) this.type = parseInt(e.type)
		if (e && e.id) this.id = parseInt(e.id)
		let title = ''
		if (this.type === 0) {
			title += '收款详情'
		} else if (this.type === 1) {
			title += '付款详情'
		}
		uni.setNavigationBarTitle({
			title
		})
		this.receiptPaymentFindOneById()
	},
	methods: {
		// 获取详情
		async receiptPaymentFindOneById() {
			const [err, res] = await receiptPaymentFindOneById(this.id)
			if (err) return
			this.info = res.data
		},
		// 预览图片
		previewPics(urls, index = 0) {
			previewImgs(urls, index)
		}
	}
}
</script>

<style>
.titlebox {
	width: 100%;
	height: 192rpx;
}

.titleName {
	width: 100%;
	height: 114rpx;
	border-bottom: 20rpx solid #eff0f3;
	padding: 30rpx 20rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	background-color: white;
	margin-top: -34rpx;
}

.blackText {
	font-size: 28rpx;
	color: #000000;
	margin-bottom: 30rpx;
}

.grayTetx {
	color: #999999;
	font-size: 24rpx;
}

.flexBox {
	width: 90%;
	margin: auto;
	padding: 30rpx 0rpx;
	border-bottom: 2rpx solid #eff0f3;
	display: flex;
	align-items: center;
}

.flexleft {
	color: #000000;
	font-size: 28rpx;
	width: 15%;
}

.flexright {
	color: #999999;
	font-size: 28rpx;
	width: 85%;
	text-align: right;
}
</style>
