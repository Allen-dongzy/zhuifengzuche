<template>
	<view class="box">
		<view class="flexBox">
			<view class="blackTitle">平台</view>
			<view style="width: 56%;">
				<picker @change="platformChange" :value="platformIndex" :range="platformList" :range-key="'name'"
					class="pickerBox">
					<label class="grayTetx">{{platformIndex >= 0 ? platformList[platformIndex].name : '请选择' }}</label>
				</picker>
			</view>
			<image style="width:28rpx;height: 38rpx;" :src="`${ossUrl}/mine/huiyou.png`" mode="aspectFill"></image>
		</view>
		<view class="flexBox" v-if="orderKey">
			<view class="blackTitle">订单</view>
			<view style="width: 56%;">
				<picker @change="orderChange" :value="orderIndex" :range="orderList" :range-key="'show'"
					class="pickerBox">
					<label class="grayTetx">{{orderIndex >=0 ? orderList[orderIndex].show : '请选择'}}</label>
				</picker>
			</view>
			<image style="width:28rpx;height: 38rpx;" :src="`${ossUrl}/mine/huiyou.png`" mode="aspectFill"></image>
		</view>
		<view class="flexBox" v-if="timeKey">
			<view class="blackTitle" style="width: 30%;">租车开始时间</view>
			<view style="width: 66%;padding-left:100rpx">
				<picker mode="date" @change="dateChange" :value="timeDate" :start="startDate" :end="endDate"
					class="pickerBox">
					<label class="grayTetx">{{timeDate || '请选择'}}</label>
				</picker>
			</view>
			<view style="width:4%;">
				<image style="width:28rpx;height: 28rpx;" :src="`${ossUrl}/mine/daytime.png`" mode="aspectFill"></image>
			</view>
		</view>
		<view class="flexBox">
			<view class="blackTitle">项目</view>
			<view style="width: 56%;">
				<picker @change="projectChange" :value="projectIndex" :range="projectList" :range-key="'name'"
					class="pickerBox">
					<label class="grayTetx">{{projectIndex >= 0 ? projectList[projectIndex].name : '请选择' }}</label>
				</picker>
			</view>
			<image style="width:28rpx;height: 38rpx;" :src="`${ossUrl}/mine/huiyou.png`"></image>
		</view>
		<view class="flexBox">
			<view class="blackTitle">车牌号</view>
			<view style="width: 59%;">
				<input class="grayTetx" type="text" v-model="carNumber" placeholder="请填写车牌号" />
			</view>
		</view>
		<view class="flexBox">
			<view class="blackTitle">店员</view>
			<view style="width: 59%;">
				<input class="grayTetx" type="text" v-model="staffName" placeholder="请填写店员" />
			</view>
		</view>
		<view class="flexBox">
			<view class="blackTitle">金额（元）</view>
			<view style="width: 59%;">
				<input class="grayTetx" type="digit" v-model="money" placeholder="请填写金额" />
			</view>
		</view>
		<view class="flexBox">
			<view class="blackTitle">{{type===0 ? '收' : '付'}}款人</view>
			<view style="width: 59%;">
				<input class="grayTetx" type="text" v-model="payer" placeholder="请填写付款人姓名" />
			</view>
		</view>
		<view class="flexBox" @click="$open('/pages/mine/bankCard', {mode: 'select'})" v-if="type===0">
			<view class="blackTitle">银行卡</view>
			<view style="width: 56%;">
				<picker class="pickerBox" :disabled="true">
					<label
						class="grayTetx">{{Object.keys(bankCard).length>0 ? `${bankCard.bankName} (${bankCard.name} 尾号${bankCard.cardNumber.slice(bankCard.cardNumber.length-4)})` : '请选择'}}</label>
				</picker>
			</view>
			<image style="width:28rpx;height: 38rpx;" :src="`${ossUrl}/mine/huiyou.png`" mode="aspectFill"></image>
		</view>
		<view class="flexBox" style="border: none;">备注</view>
		<view
			style="background-color:#EFF0F3;margin-top: 20rpx;border-radius: 15rpx;width: 100%;height: 254rpx;padding: 20rpx;width: 93.5%;">
			<textarea style="padding-top:20rpx;height:114rpx;color: #999999;font-size: 24rpx;" v-model="remarks"
				placeholder="请填写备注信息" />
			<view>
				<view style="display: inline-block;width:120rpx;height: 120rpx;;margin-right:20rpx;position: relative;"
					v-for="(item, index) in imgList" :key="index">
					<view>
						<image style="width:120rpx;height: 120rpx" :src="item" mode="aspectFill"
							@click="previewPics(imgList, index)">
						</image>
						<image style="width:32rpx;height:32rpx;position: absolute;z-index:9;top:-10rpx;right: -16rpx;"
							:src="`${ossUrl}/common/lancha.png`" mode="aspectFill" @click.stop="removePic(index)">
						</image>
					</view>
				</view>
				<image v-if="imgList.length<3" style="width:120rpx;height: 120rpx;" :src="`${ossUrl}/mine/beizhu.png`"
					mode="aspectFill" @click="choosePics"></image>
			</view>
		</view>
		<button style=" color: white;
			width: 100%;
					margin: auto;
					margin-top: 5vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;margin-bottom:100rpx; " type="default"
			@click="receiptPaymentPayment">{{type===0 ? '前往收款' : '前往付款'}}</button>
	</view>
</template>

<script>
	import {
		receiptPaymentProjectList,
		receiptPaymentPayment,
		receiptPaymentOrderList
	} from '@/apis/receiptPayment'
	import {
		uploadFiles
	} from '@/apis/oss'
	import {
		getCodeByWxCode
	} from '@/apis/sso'
	import {
		paymentPrecreate
	} from '@/apis/payment'
	import {
		chooseImgs,
		previewImgs
	} from '@/utils/uni-tools'
	import {
		throttle
	} from '@/utils/tools'
	import validator from 'crazy-validator'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				platformList: [{
					id: 0,
					name: '追风租车'
				}, {
					id: 1,
					name: '其他租车OTA'
				}], // 平台列表
				imgList: [], // 图片列表
				platformIndex: -1, // 平台下标
				timeDate: '', // 日期
				projectList: [], // 项目列表
				projectIndex: -1, // 项目下标
				orderList: [], // 订单列表
				orderKey: false, // 订单开关
				timeKey: false, // 时间开关
				orderIndex: -1, // 订单下标
				carNumber: '', // 车牌号
				staffName: '', // 店员
				money: '', // 金额
				payer: '', // 收/付款人
				bankCard: {}, // 银行卡
				remark: '', // 备注
				type: null, // 0:收款 1:付款
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		watch: {
			// 监听平台下标
			platformIndex(newVal, oldVal) {
				if (oldVal === -1 && newVal >= 0 && this.orderList.length === 0) {
					this.receiptPaymentOrderList()
				}
				if (newVal === 0) {
					this.orderKey = true
					this.timeKey = false
				} else {
					this.orderKey = false
					this.timeKey = true
				}
			}
		},
		onLoad(e) {
			if (e && e.type) this.type = parseInt(e.type)
			let title = '发起'
			if (this.type === 0) {
				title += '收款'
			} else if (this.type === 1) {
				title += '付款'
			}
			uni.setNavigationBarTitle({
				title
			})
			this.receiptPaymentProjectList()
			this.eventListener()
		},
		methods: {
			// 平台变化
			platformChange(e) {
				this.platformIndex = parseInt(e.detail.value)
			},
			// 项目列表
			async receiptPaymentProjectList() {
				const [err, res] = await receiptPaymentProjectList()
				if (err) return
				this.projectList = res.data
			},
			// 订单列表
			async receiptPaymentOrderList() {
				const [err, res] = await receiptPaymentOrderList()
				if (err) return
				res.data.list.forEach(item => {
					item.show = `${item.rentBeginTime} ${item.carNumber}订单`
				})
				this.orderList = res.data.list
			},
			// 校验收/付款
			checkPayment() {
				const checkList = [{
					value: this.platformList && this.platformList[this.platformIndex] ? this
						.platformList[
							this.platformIndex].id + 1 : '',
					rules: [{
						type: 'required',
						msg: '请选择平台'
					}]
				}, {
					value: this.projectList && this.projectList[this.projectIndex] ? this.projectList[
						this.projectIndex].id + 1 : '',
					rules: [{
						type: 'required',
						msg: '请选择项目'
					}]
				}, {
					value: this.carNumber,
					rules: [{
						type: 'required',
						msg: '请填写车牌号'
					}]
				}, {
					value: this.staffName,
					rules: [{
						type: 'required',
						msg: '请填写店员名称'
					}]
				}, {
					value: this.money,
					rules: [{
						type: 'required',
						msg: '请填写金额'
					}]
				}, {
					value: this.payer,
					rules: [{
						type: 'required',
						msg: '请填写收/付款人'
					}]
				}]
				if (this.type === 0) {
					checkList.push({
						value: Object.keys(this.bankCard).length > 0 ? this.bankCard.id : '',
						rules: [{
							type: 'required',
							msg: '请选择银行卡'
						}]
					})
				}
				if (this.timeKey) {
					checkList.splice(1, 0, {
						value: this.timeDate,
						rules: [{
							type: 'required',
							msg: '请选择时间'
						}]
					})
				}
				if (this.orderKey) {
					checkList.splice(1, 0, {
						value: this.orderList && this.orderList[this.orderIndex] ? this.orderList[
							this.orderIndex].id + 1 : '',
						rules: [{
							type: 'required',
							msg: '请选择订单'
						}]
					})
				}
				const checkRes = validator(checkList, this.$toast)
				return checkRes.status === 1000
			},
			// 发起收/付款
			receiptPaymentPayment: throttle(async function() {
				if (!this.checkPayment()) return
				const params = {
					platform: this.platformList[this.platformIndex].id,
					localDate: this.timeDate,
					projectId: this.projectList[this.projectIndex].id,
					orderId: this.orderList[this.orderIndex].id,
					carNumber: this.carNumber,
					staffName: this.staffName,
					money: this.money,
					payer: this.payer,
					bankId: this.bankCard.id,
					transactionType: this.type,
					remarks: this.remarks,
					image: JSON.stringify(this.imgList)
				}
				const [err, res] = await receiptPaymentPayment(params)
				if (err) return
				if (this.type === 0) {
					uni.$emit('payRefresh')
					this.$open('./paySuccess', {
						type: this.type
					}, 1)
				} else if (this.type === 1) {
					this.getCodeByWxCode(res.data)
				}
			}),
			// 授权
			getCodeByWxCode: throttle(async function(info) {
				const [loginErr, loginRes] = await uni.login({
					provider: 'weixin'
				})
				if (loginErr) return
				const params = {
					code: loginRes.code,
					loginType: 1
				}
				const [err, res] = await getCodeByWxCode(params)
				if (err) return
				this.paymentPrecreate(res.data.openid, info)
			}),
			// 发起支付
			async paymentPrecreate(openId, info) {
				const params = {
					reflect: info,
					orderId: info.id,
					payerUid: openId,
					payway: '3',
					subPayway: '4',
					subject: '发起付款',
					totalAmount: this.money
				}
				const [err, res] = await paymentPrecreate(params)
				if (err) return
				this.pay(res.data.wapPayRequest)
			},
			// 支付
			async pay(wapPayRequest) {
				const [err, res] = await uni.requestPayment({
					provider: 'wxpay',
					...wapPayRequest
				})
				if (err) return
				uni.$emit('payRefresh')
				this.$open('./paySuccess', {
					type: this.type
				}, 1)
			},
			// 项目变化
			projectChange(e) {
				this.projectIndex = parseInt(e.detail.value)
			},
			// 日期变化
			dateChange(e) {
				this.timeDate = e.target.value
			},
			// 订单变化
			orderChange(e) {
				this.orderIndex = e.target.value
			},
			// 预览图片
			previewPics(urls, index = 0) {
				previewImgs(urls, index)
			},
			// 选择图片
			async choosePics() {
				const [err, res] = await chooseImgs(3 - this.imgList.length)
				if (err) return
				const [uploadErr, uploadRes] = await uploadFiles(res)
				if (uploadErr) return
				this.imgList = [...this.imgList, ...uploadRes]
			},
			// 删除图片
			removePic(index) {
				this.imgList.splice(index, 1)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 监听事件
			eventListener() {
				uni.$on('selectCard', e => {
					this.bankCard = JSON.parse(e.info)
				})
			}
		}
	}
</script>

<style>
	.box {

		width: 90%;
		margin: auto;
		margin-top: 20rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #EFF0F3;
		padding: 30rpx 0rpx;
	}

	.blackTitle {
		width: 41%;
		color: #000000;
		font-size: 28rpx;
	}

	.grayTetx {
		font-size: 28rpx;
		color: #999999;
	}

	.pickerBox {
		width: 100%;

	}
</style>
