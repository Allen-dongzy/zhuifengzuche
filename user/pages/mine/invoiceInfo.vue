<template>
	<view class="">
		<view class="box">
			<view class="title">发票抬头</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" v-model="title" placeholder="请输入发票抬头" />
			</view>
		</view>
		<view class="box">
			<view class="title">税号</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" v-model="taxNum" placeholder="请输入税号" />
			</view>
		</view>
		<view class="box">
			<view class="title">银行账号</view>
			<view class="titleInp" style="width: 80%;">
				<input type="number" :maxlength="19" v-model="bankNum" placeholder="请输入银行账号" />
			</view>
		</view>
		<view class="box">
			<view class="title">开户行</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" v-model="openingBank" placeholder="请输入开户行" />
			</view>
		</view>
		<view class="box">
			<view class="title">注册地址</view>
			<view class="titleInp" style="width: 80%;">
				<input type="text" v-model="registeredAddress" placeholder="请输入注册地址" />
			</view>
		</view>
		<view class="box">
			<view class="title">电话</view>
			<view class="titleInp" style="width: 80%;">
				<input type="number" :maxlength="11" v-model="phone" placeholder="请输入电话" />
			</view>
		</view>
		<view v-if="mode==='edit'" class="delete-btn" @click="invoiceDelete">删除该抬头</view>
		<view class="btn" @click="invoiceHandler">{{mode==='add' ? '添加' : '更新'}}</view>
	</view>
</template>

<script>
	import {
		invoiceSave,
		invoiceUpdate,
		invoiceDelete
	} from '@/apis/invoice'
	import {
		throttle
	} from '@/utils/tools'
	import validator from "crazy-validator"

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				mode: '', // add  edit
				showimg: '/mine/quanxian1.png',
				showother: 2,
				title: '', //抬头
				taxNum: '', //税号
				bankNum: '', //银行账号
				openingBank: '', //开户行
				registeredAddress: '', //详细地址
				phone: '', //电话
				info: ''
			}
		},
		onLoad(e) {
			if (e && e.mode) this.mode = e.mode
			uni.setNavigationBarTitle({
				title: e.mode === 'add' ? '添加新抬头' : '发票详情'
			})
			if (e && e.info) {
				this.info = JSON.parse(e.info)
				this.title = this.info.title
				this.taxNum = this.info.taxNum
				this.bankNum = this.info.bankNum
				this.openingBank = this.info.openingBank
				this.registeredAddress = this.info.registeredAddress
				this.phone = this.info.phone
			}
		},
		methods: {
			select() {
				if (this.showother == 2) {
					this.showimg = '/mine/quanxian2.png'
					this.showother = 1
				} else {
					this.showother = 2
					this.showimg = '/mine/quanxian1.png'
				}
			},
			// 处理发票
			invoiceHandler: throttle(function() {
				const checkItem = [{
					value: this.title,
					rules: [{
						type: 'required',
						msg: '请输入发票抬头'
					}],
				}, {
					value: this.taxNum,
					rules: [{
						type: 'required',
						msg: '请输入税号'
					}],
				}, {
					value: this.bankNum,
					rules: [{
						type: 'required',
						msg: '请输入银行账号'
					}, {
						type: 'length',
						min: 16,
						max: 19,
						msg: '请输入16-19位数字的银行卡号'
					}],
				}, {
					value: this.openingBank,
					rules: [{
						type: 'required',
						msg: '请输入开户行'
					}],
				}, {
					value: this.registeredAddress,
					rules: [{
						type: 'required',
						msg: '请输入注册地址'
					}],
				}, {
					value: this.phone,
					rules: [{
						type: 'required',
						msg: '请输入电话'
					}, {
						type: 'phone',
						msg: '请输入正确格式的电话'
					}],
				}];
				const checkRes = validator(checkItem, this.$toast)
				if (checkRes.status !== 1000) return
				if (this.mode === 'add') this.invoiceSave()
				else if (this.mode === 'edit') this.invoiceUpdate()
			}),
			// 添加发票抬头
			async invoiceSave() {
				const params = {
					title: this.title,
					taxNum: this.taxNum,
					registeredAddress: this.registeredAddress,
					phone: this.phone,
					openingBank: this.openingBank,
					bankNum: this.bankNum,
				}
				const [err, res] = await invoiceSave(params)
				if (err) return
				this.$toast('操作成功！')
				uni.$emit('invoiceRefresh')
				setTimeout(() => {
					this.$close()
				}, 500)
			},
			// 更新发票抬头
			async invoiceUpdate() {
				const params = {
					id: this.info.id,
					title: this.title,
					taxNum: this.taxNum,
					registeredAddress: this.registeredAddress,
					phone: this.phone,
					openingBank: this.openingBank,
					bankNum: this.bankNum,
				}
				const [err, res] = await invoiceUpdate(params)
				if (err) return
				this.$toast('操作成功！')
				uni.$emit('invoiceRefresh')
				setTimeout(() => {
					this.$close()
				}, 500)
			},
			// 删除发票抬头
			invoiceDelete: throttle(async function() {
				const [btnErr, btnRes] = await this.$showModal({
					content: '确定删除发票抬头？'
				})
				if (btnRes !== 'confirm') return
				const params = {
					id: this.info.id
				}
				const [err, res] = await invoiceDelete(params)
				if (err) return
				this.$toast('删除成功！')
				uni.$emit('invoiceRefresh')
				setTimeout(() => {
					this.$close()
				}, 500)
			})
		}
	}
</script>

<style lang="scss">
	.box {
		width: 90%;
		margin: auto;
		padding: 20rpx 0rpx;
		border-bottom: 2rpx solid #EFF0F3;
		display: flex;
		align-items: center;
	}

	.title {
		color: #000000;
		font-size: 24rpx;
		width: 20%;
	}

	.titleInp {
		color: #000000;
		font-size: 24rpx;
		width: 20%;
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

	.delete-btn {
		position: fixed;
		bottom: 200rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		background-color: transparent;
		color: #FE3636;
		font-size: 24rpx;
	}
</style>
