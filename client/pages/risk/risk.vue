<template>
	<view class="">
		<view class="text">
			追风租车通过3年的数据沉淀，协全行业最全SaaS智能风控管理系统，为汽车服务先行者保驾护航。 <br />
			（请确认客户已经授权同意查询个人信用信息，本公司不对查询结果和数据内容提供任何要素担保）
		</view>
		<view class="find" @click="findOne">查询</view>
		<view class="find" @click="buyNum">购买次数</view>
		<view class="num">剩余查询次数：{{num}}</view>

		<view v-if="puy==true" class="Mask"></view>
		<view v-if="puy==true" class="box1">
			<view class="flexBox">
				<view style="width: 90%;font-size: 30rpx;">购买次数</view>
				<view style="width: 10%;font-size: 30rpx;color: #999999;" @click="buyNum">取消</view>
			</view>
			<view style="margin-top: 30rpx;">
				<view v-for="(item,index) in list" :key="index" class="selectBox" @click="selectBox(index)">
					<view v-if="item.status==false" class="noselectBox">
						<view class="">{{item.num}}次</view>
						<view class="">￥{{item.price}}</view>
					</view>
					<view v-if="item.status==true" class="acselectBox">
						<view class="">{{item.num}}次</view>
						<view class="">￥{{item.price}}</view>
					</view>
				</view>
			</view>

			<button style=" color: white;
				width: 90%;
						margin: auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
						margin-top: 20rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" @click="sure">完成</button>
		</view>
	</view>
</template>

<script>
	import {
		addBuyHistory,
		findQueryNum
	} from "@/apis/risk.js"
	import {
		getCodeByWxCode
	} from "@/apis/admin.js"


	import {
		precreate
	} from "../../apis/pay"

	import {
		throttle
	} from '@/utils/tools';


	export default {
		data() {
			return {
				list: [{
					num: '10',
					price: '100',
					status: true
				}, {
					num: '20',
					price: '190',
					status: false
				}, {
					num: '30',
					price: '270',
					status: false
				}, {
					num: '40',
					price: '340',
					status: false
				}, {
					num: '50',
					price: '400',
					status: false
				}, {
					num: '100',
					price: '500',
					status: false
				}, ],
				puy: false,
				selectNum: 0, //选择的套餐角标
				buyinfo: '', //购买需要的参数
				num: '', //剩余次数
			}
		},

		onShow() {
			this.findQueryNum()
		},
		methods: {
			async findQueryNum() {

				const [err, res] = await findQueryNum()
				console.log(res)
				this.num = res.data
			},
			findOne() {
				console.log('pp')
				uni.navigateTo({
					url: './find',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			buyNum() {
				if (this.puy) {
					this.puy = false
				} else {
					this.puy = true
				}

			},
			async sure() {
				// addBuyHistory

				// #ifdef MP-WEIXIN
				let data = {
					buyCount: this.list[this.selectNum].num,
					buyMoney: this.list[this.selectNum].price,
					payType: 0
				}
				// #endif

				// #ifdef MP-ALIPAY
				let data = {
					buyCount: this.list[this.selectNum].num,
					buyMoney: this.list[this.selectNum].price,
					payType: 1
				}
				// #endif

				const [err, res] = await addBuyHistory(data)
				console.log(res)
				this.buyinfo = res.data
				this.getCodeByWxCode()
			},
			selectBox(e) {
				this.selectNum = e
				for (let i = 0; i < this.list.length; i++) {
					this.list[i].status = false
				}
				this.list[e].status = true
			},
			// 授权
			getCodeByWxCode: throttle(async function(index) {



				// #ifdef MP-ALIPAY
				const [loginErr, loginRes] = await uni.login({
					provider: 'alipay'
				})
				if (loginErr) return
				console.log(loginRes)
				const params = {
					code: loginRes.code,
					loginType: 2
				}
				const [err, res] = await getCodeByWxCode(params)
				if (err) return
				this.precreate(res.data.user_id)
				// #endif


				// #ifdef MP-WEIXIN

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
				this.precreate(res.data.openid)
				// #endif

			}),

			async precreate(e) {

				// #ifdef MP-WEIXIN
				let data = {
					payerUid: e,
					payway: 3,
					reflect: this.buyinfo,
					subPayway: 4,
					subject: '风控',
					totalAmount: this.list[this.selectNum].price,
				}
				// #endif

				// #ifdef MP-ALIPAY
				let data = {
					payerUid: e,
					payway: 2,
					reflect: this.buyinfo,
					subPayway: 4,
					subject: '风控',
					totalAmount: this.list[this.selectNum].price,
				}
				// #endif



				const [err, res] = await precreate(data)
				if (err) return
				this.pay(res.data.wapPayRequest)


			},


			// 支付
			async pay(wapPayRequest) {
				const [err, res] = await uni.requestPayment({
					// #ifdef MP-WEIXIN
					provider: 'wxpay',
					// #endif

					// #ifdef MP-ALIPAY
					provider: 'alipay',
					// #endif
					...wapPayRequest
				})
				if (err) return

				this.findQueryNum()
			},



		}
	}
</script>

<style>
	.text {
		font-size: 28rpx;
		color: #999999;
		width: 90%;
		margin: auto;
		padding-top: 10vh;
	}

	.find {
		border: 2rpx solid #5A7EFF;
		color: #5A7EFF;
		letter-spacing: 10rpx;
		font-size: 32rpx;
		width: 90%;
		margin: auto;
		text-align: center;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 20rpx;
		margin-top: 80rpx;
	}

	.num {
		color: #999999;
		font-size: 24rpx;
		width: 40%;
		margin: auto;
		text-align: center;
		margin-top: 20rpx;
	}

	.Mask {
		position: fixed;
		background-color: #000000;
		opacity: 0.6;
		height: 100vh;
		width: 100%;
		top: 0px;
	}

	.box1 {
		width: 100%;
		position: absolute;
		padding: 20rpx 40rpx;
		background-color: white;
		bottom: 0rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
	}

	.selectBox {
		display: inline-block;
		width: 23%;
		margin: 20rpx 5%;
		height: 120rpx;
		line-height: 60rpx;
	}

	.acselectBox {



		color: #5A7EFF;
		border: 2rpx solid #5A7EFF;
		text-align: center;

		border-radius: 20rpx;
	}

	.noselectBox {



		color: #999999;
		border: 2rpx solid #999999;
		text-align: center;

		border-radius: 20rpx;
	}
</style>
