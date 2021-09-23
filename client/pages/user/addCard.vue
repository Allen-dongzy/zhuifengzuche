<template>
	<view>
		<view class="flexBox">
			<view class="title">所属银行</view>
			<view>
				<picker class="pickerBox" @change="bindPickerChange" :value="index" :range="selectorObj"
					range-key="name">
					<view  class="uni-input">{{bankName ? bankName : '请选择银行'}}</view>
			
				</picker>
			</view>
		</view>
		<view class="flexBox"> 
			<view class="title">开户支行</view>
			<view>
				<input class="input" placeholder-style="color:#999;" v-model="branch" type="text"
					placeholder="填写开户支行信息" />
			</view>
		</view>
		<view class="flexBox">
			<view class="title">开户姓名</view>
			<view>
				<input class="input" placeholder-style="color:#999;" v-model="name" type="text" placeholder="填写开户人姓名" />
			</view>
		</view>
		<view class="flexBox">
			<view class="title">银行卡号</view>
			<view>
				<input class="input" placeholder-style="color:#999;" v-model="cardNum" type="number" maxlength="19"
					placeholder="填写银行卡号" />
			</view>
		</view>
		<view class="flexBox">
			<view class="title">银行预留手机号</view>
			<view>
				<input class="input" placeholder-style="color:#999;" v-model="phone" type="number"
					placeholder="填写银行预留手机号" />
			</view>
		</view>
		<!-- <view style="width: 90%;margin: auto; ">
			<view class="title" style="padding: 30rpx 0rpx;">商户关系证明</view>
			<view v-if="pic" class="pic-box">
				<image class="pic" :src="pic" mode="aspectFill"></image>
				<image class="delete"
					src="https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/lancha.png"
					@click="deletePic">
				</image>
			</view>
			<view v-if="!pic" class="pic-box">
				<image class="pic" :src="$util.fileUrl('/guanxi.png')" @click="selPic"></image>
			</view>
		</view> -->
		<view v-if="type==2" class="delete-btn" @click="bankCardDel">删除银行卡</view>
		<view v-if="type==1" class="btn" type="default" @click="bankCardAdd">新增</view>
		<view v-if="type==2" class="btn" type="default" @click="bankCardEdit">确定</view>
	</view>
</template>

<script>
	import {
		bankCardList,
		bankCardAdd,
		bankCard,
		bankCardEdit,
		bankCardDel
	} from '@/apis/bankCard'
	import {
		uploadFiles
	} from '@/apis/oss'
	import {
		chooseImgs
	} from '@/utils/uni-tools'
	import {
		throttle
	} from '@/utils/tools'
	import validator from 'crazy-validator'

	export default {
		data() {
			return {
				selectorObj: [], //城市列表
			
				index: 0,
				bankName: '', // 银行
				branch: '', //支行
				name: '', //姓名
				cardNum: '', //卡号
				phone: '', //预留手机号
				type: "",
				pic: '',
				walletId: null, // 钱包id
				bankCardId: null, // 银行卡id
				bankId: null // 银行id
			}
		},
		onLoad(e) {
			this.bankCardList()
			if (e && e.type) this.type = e.type
			if (e && e.walletId) this.walletId = e.walletId
			if (e && e.bankCardId) this.bankCardId = e.bankCardId
			if (this.bankCardId) this.bankCard()
		},
		methods: {
			// 获取银行卡列表
			async bankCardList() {
				const [err, res] = await bankCardList()
				if (err) return
				this.selectorObj = res.data
			},
			// 银行卡详情
			async bankCard() {
				const [err, res] = await bankCard(this.bankCardId)
				if (err) return
				this.bankName = res.data.bankName
				this.branch = res.data.accountOpeningBranch
				this.name = res.data.name
				this.cardNum = res.data.cardNumber
				this.phone = res.data.accountBankMobileNumber
				this.walletId = res.data.walletId
				this.bankId = res.data.bankId
			},
			// 校验
			checkFunc() {
				const checkList = [{
					value: this.bankName,
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
				}, {
					value: this.phone,
					rules: [{
						type: 'required',
						msg: '请填写银行预留手机号'
					}, {
						type: 'phone',
						msg: '请填写正确格式的手机号'
					}]
				}]
				const checkRes = validator(checkList, this.$toast)
				if (checkRes.status !== 1000) return false
				else return true
			},
			// 添加银行卡
			bankCardAdd: throttle(async function() {
				if (!this.checkFunc()) return
				const params = {
					bankName: this.bankName,
					accountOpeningBranch: this.branch,
					name: this.name,
					cardNumber: this.cardNum,
					accountBankMobileNumber: this.phone,
					walletId: this.walletId,
					bankId: this.bankId,
					userSource: 0
				}
				const [err, res] = await bankCardAdd(params)
				if (err) return
				this.$toast('添加成功')
				uni.$emit('refreshWallet')
				setTimeout(() => {
					this.$close()
				}, 800)
			}),
			// 编辑银行卡
			bankCardEdit: throttle(async function() {
				if (!this.checkFunc()) return
				const params = {
					bankName: this.bankName,
					accountOpeningBranch: this.branch,
					name: this.name,
					cardNumber: this.cardNum,
					accountBankMobileNumber: this.phone,
					walletId: this.walletId,
					bankId: this.bankId,
					id: this.bankCardId,
					userSource: 0
				}
				const [err, res] = await bankCardEdit(params)
				if (err) return
				this.$toast('编辑成功')
				uni.$emit('refreshWallet')
				setTimeout(() => {
					this.$close()
				}, 800)
			}),
			// 删除银行卡
			bankCardDel: throttle(async function() {
				const params = {
					id: this.bankCardId
				}
				const [err, res] = await bankCardDel(params)
				if (err) return
				this.$toast('删除成功')
				uni.$emit('refreshWallet')
				setTimeout(() => {
					this.$close()
				}, 800)
			}),
			// 选择图片
			async selPic() {
				const [err, res] = await chooseImgs(1)
				if (err) return
				const [uploadErr, uploadRes] = await uploadFiles(res)
				if (uploadErr) return
				this.pic = uploadRes[0]
			},
			// 删除图片
			deletePic() {
				this.pic = ''
			},
			// 选择银行
			bindPickerChange: function(e) {
				this.stuse = true
				this.index = e.target.value
				this.bankName = this.selectorObj[this.index].name
				this.bankId = this.selectorObj[this.index].id
			},
		}
	}
</script>

<style lang="scss">
	.flexBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		margin: auto;
		border-bottom: 2rpx solid #EFF0F3;
		padding: 30rpx 0rpx;
	}

	.title {
		width: 40%;
		font-size: 28rpx;
		font-weight: bold;
	}

	.uni-input {
		text-align: right;
		color: #999999;
		font-size: 28rpx;
	}

	.pic-box {
		position: relative;
		width: 160rpx;
		height: 160rpx;
		border: 1px solid #ddd;

		.pic {
			width: 100%;
			height: 100%;
		}

		.delete {
			position: absolute;
			right: -10rpx;
			top: -10rpx;
			width: 40rpx;
			height: 40rpx;
		}
	}

	.btn {
		color: white;
		width: 90%;
		margin: auto;
		margin-top: 25vh;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
	}

	.delete-btn {
		color: #FE3636;
		width: 20%;
		text-align: center;
		margin: auto;
		margin-top: 30rpx;
	}

	.input {
		height: 100%;
		width: 350rpx;
		text-align: right;
		color: #999;
	}
</style>
