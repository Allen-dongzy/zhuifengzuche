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
				<input type="text" v-model="bankNum" placeholder="请输入银行账号" />
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
				<input type="text" v-model="phone" placeholder="请输入电话" />
			</view>
		</view>
		<!-- 		<view class="box" style="border: none;">
			<view class="title">发票类型</view>
			<image v-show="showother==1" style="height: 32rpx;width: 32rpx;" :src="`${ossUrl}`+showimg+``" mode="" @click="select()"></image>
			<image v-show="showother==2" style="height: 32rpx;width: 32rpx;" :src="`${ossUrl}`+showimg+``" mode="" @click="select()"></image>
			<view style="margin-left: 20rpx;color: #000000;font-size:28rpx;">普票</view>
		</view>
		<view v-show="showother==1" class="box" style="border: none;padding-bottom: 10rpx;">一般人纳税证明</view> 
		<view v-show="showother==1" class="">
				<image style="height: 160rpx;width: 160rpx;" :src="`${ossUrl}/mine/beizhu.png`" mode=""></image>
		</view> -->

		<button style=" color: white;
			width: 90%;
					margin: auto;
					margin-top: 5vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx; " type="default" @click="sure">确定</button>
	</view>
</template>

<script>
	import {
		invoiceSave,
		invoiceUpdate
	} from '@/apis/invoice'
	import validator from "crazy-validator";
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				showimg: '/mine/quanxian1.png',
				showother: 2,
				title: '', //抬头
				taxNum: '', //税号
				bankNum: '', //银行账号
				openingBank: '', //开户行
				registeredAddress: '', //详细地址
				phone: '', //电话
				info:''
			}
		},
		onLoad(e) {
			if(e.obj==undefined){
				
			}else{
			 this.info =JSON.parse(e.obj)
				
				this.title=this.info.title
				this.taxNum=this.info.taxNum
				this.bankNum=this.info.bankNum
				this.openingBank=this.info.openingBank
				this.registeredAddress=this.info.registeredAddress
				this.phone=this.info.phone
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
			async sure() {

				const checkItem = [{
					value: this.title,
					rules: [{
						type: 'required',
						msg: '请输入发票抬头'
					}], // 必填项 发票抬头
				}, {
					value: this.taxNum,
					rules: [{
						type: 'required',
						msg: '请输入税号'
					}], // 必填项，税号
				}, {
					value: this.registeredAddress,
					rules: [{
						type: 'required',
						msg: '请输入注册地址'
					}], // 必填项，注册账号
				}, {
					value: this.phone,
					rules: [{
						type: 'required',
						msg: '请输入电话'
					}], // 必填项，电话
				}, {
					value: this.openingBank,
					rules: [{
						type: 'required',
						msg: '请输入开户行'
					}], // 必填项，开户行
				}, {
					value: this.bankNum,
					rules: [{
						type: 'required',
						msg: '请输入银行账号'
					}], // 必填项，银行账号
				}];
				const checkRes = validator(checkItem, this.$toast)
				if (checkRes.status !== 1000) return
				
				if(this.info==""){
					
					var data = {
						title: this.title,
						taxNum: this.taxNum,
						registeredAddress: this.registeredAddress,
						phone: this.phone,
						openingBank: this.openingBank,
						bankNum: this.bankNum,
					}
					
					const [err, res] = await invoiceSave(data)
					if (err) return
					console.log(res)
					uni.navigateBack({
						delta:1
					})
				}else{
					var data = {
						id:this.info.id,
						title: this.title,
						taxNum: this.taxNum,
						registeredAddress: this.registeredAddress,
						phone: this.phone,
						openingBank: this.openingBank,
						bankNum: this.bankNum,
					}
					
					const [err, res] = await invoiceUpdate(data)
					if (err) return
					console.log(res)
					uni.navigateBack({
						delta:1
					})
				}


			}
		}
	}
</script>

<style>
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
</style>
