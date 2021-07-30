<template>
	<view class="">
		<view class="flexBox">
			<view class="title">所属银行</view>
			<view style="width: 40%;margin: auto;">
				<picker class="pickerBox" @change="bankChange" :value="index" :range="bankList" range-key="name">
					<view class="uni-input">{{index&&index>=0 ? bankList[index].name : (bank || '请选择所属银行')}}</view>
				</picker>
			</view>
		</view>
		<view class="flexBox">
			<view class="title">开户支行</view>
			<view style="width: 40%;margin: auto;text-align: right;">
				<input style="height: 100%;width: 100%;font-size: 24rpx;" v-model="branch" type="text" value=""
					placeholder-style="text-align: right;" placeholder="填写开户支行信息" />
			</view>
		</view>
		<view class="flexBox">
			<view class="title">开户姓名</view>
			<view style="width: 40%;margin: auto;text-align: right;">
				<input style="height: 100%;width: 100%;font-size: 24rpx;" v-model="name" type="text" value=""
					placeholder-style="text-align: right;" placeholder="填写开户人姓名" />
			</view>
		</view>
		<view class="flexBox">
			<view class="title">银行卡号</view>
			<view style="width: 40%;margin: auto;text-align: right;">
				<input style="height: 100%;width: 100%;font-size: 24rpx;" v-model="cardNum" type="text" value=""
					placeholder-style="text-align: right;" placeholder="填写银行卡号" />
			</view>
		</view>
		<view v-show="type==1" class="delBox" @click="bankCardDel">删除银行卡</view>
		<view v-if="type===0" class="btn" @click="bankCardAdd">新增</view>
		<view v-else class="btn" @click="bankCardEdit">更新</view>
	</view>
</template>

<script>
	import {
		bankList
	} from '@/apis/bank'
	import {
		bankCardAdd,
		bankCardEdit,
		bankCardDel
	} from '@/apis/bankCard'
	import {
		throttle
	} from '@/utils/tools'
	import validator from 'crazy-validator'

	export default {
		data() {
			return {
				id: '', // 已有的银行卡id
				bankList: [], // 银行信息
				bank: '', // 银行
				index: '', // 银行下标
				branch: '', //支行
				name: '', //姓名
				cardNum: '', //卡号
				type: 0, // 0新增 1编辑
			}
		},
		onLoad(e) {
			if (e && e.type) this.type = parseInt(e.type)
			let title = ''
			if (this.type === 0) {
				title = '添加银行卡'
			} else if (this.type === 1) {
				title = '编辑银行卡'
			}
			uni.setNavigationBarTitle({
				title
			})
			if (e && e.info) {
				const info = JSON.parse(e.info)
				if (Object.keys(info).length > 0) {
					this.id = info.id
					this.bank = info.bankName
					this.branch = info.accountOpeningBranch
					this.name = info.name
					this.cardNum = info.cardNumber
				}
			}
			this.getBankList()
		},
		methods: {
			// 银行列表
			async getBankList() {
				const [err, res] = await bankList()
				if (err) return
				this.bankList = res.data
				if (!this.bank) return
				this.bankList.forEach((item, index) => {
					if (this.bank === item.name) this.index = index
				})
			},
			// 校验银行卡信息
			checkBand() {
				const checkList = [{
					value: this.bankList && this.bankList[this.index] ? this.bankList[this.index].id : '',
					rules: [{
						type: 'required',
						msg: '请选择所属银行'
					}]
				}, {
					value: this.branch,
					rules: [{
						type: 'required',
						msg: '请填写开户支行'
					}]
				}, {
					value: this.name,
					rules: [{
						type: 'required',
						msg: '请填写开户姓名'
					}]
				}, {
					value: this.cardNum,
					rules: [{
						type: 'required',
						msg: '请填写银行卡号'
					}, {
						type: 'length',
						min: 16,
						max: 19,
						msg: '请输入16-19位数字的银行卡号'
					}]
				}]
				const checkRes = validator(checkList, this.$toast)
				return checkRes.status === 1000
			},
			// 添加银行卡
			bankCardAdd: throttle(async function() {
				if (!this.checkBand()) return
				const params = {
					bankId: this.bankList[this.index].id,
					bankName: this.bankList[this.index].name,
					accountOpeningBranch: this.branch,
					name: this.name,
					cardNumber: this.cardNum,
					userSource: 1
				}
				const [err, res] = await bankCardAdd(params)
				if (err) return
				this.$toast('添加成功')
				uni.$emit('bandCardRefresh')
				setTimeout(() => {
					this.$close()
				}, 500)
			}),
			// 编辑银行卡
			bankCardEdit: throttle(async function() {
				if (!this.checkBand()) return
				const params = {
					id: this.id,
					bankId: this.bankList[this.index].id,
					bankName: this.bankList[this.index].name,
					accountOpeningBranch: this.branch,
					name: this.name,
					cardNumber: this.cardNum,
					userSource: 1
				}
				const [err, res] = await bankCardEdit(params)
				if (err) return
				this.$toast('编辑成功')
				uni.$emit('bandCardRefresh')
				setTimeout(() => {
					this.$close()
				}, 500)
			}),
			// 删除银行卡
			bankCardDel: throttle(async function() {
				const [btnErr, btnRes] = await this.$showModal({
					content: '确定删除银行卡？'
				})
				if (btnRes !== 'confirm') return
				const params = {
					id: this.id
				}
				const [err, res] = await bankCardDel(params)
				if (err) return
				this.$toast('删除成功')
				uni.$emit('bandCardRefresh')
				setTimeout(() => {
					this.$close()
				}, 500)
			}),
			// 银行改变
			bankChange: function(e) {
				this.index = e.target.value
			}
		}
	}
</script>

<style>
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

	.uni-input {
		text-align: right;
		color: #999999;
		font-size: 28rpx;
	}

	.delBox {
		width: 50%;
		height: 96rpx;
		text-align: center;
		line-height: 96rpx;
		margin: auto;
		color: #FE3636;
		font-size: 24rpx;
		margin-top: 30rpx;
	}

	.btn {
		position: fixed;
		bottom: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		width: 90%;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
	}
</style>
