<template>
	<view style="padding-top: 40rpx;">
		<view class="box"><input class="inpBox" maxlength="10" type="text" v-model="name" placeholder="请输入查询对象的姓名" /> </view>
		<view class="box"><input class="inpBox" maxlength="11" type="number" v-model="phone" placeholder="请输入查询对象的手机号" /> </view>
		<view class="box"><input class="inpBox" maxlength="18" type="text" v-model="identityNum" placeholder="请输入查询对象的身份证号" />
		</view>
		<view class="find" @click="findOne">查询</view>
	</view>
</template>

<script>
	import {
		search
	} from '@/apis/risk'
	import validator from 'crazy-validator'

	export default {
		data() {
			return {
				identityNum: '',
				name: '',
				phone: ''
			}
		},
		methods: {
			async findOne() {
				const checkList = [{
					value: this.name,
					rules: [{
						type: 'required',
						msg: '请输入姓名'
					}]
				}, {
					value: this.phone,
					rules: [{
						type: 'required',
						msg: '请输入手机号'
					}, {
						type: 'phone',
						msg: '请输入正确格式的手机号'
					}]
				}, {
					value: this.identityNum,
					rules: [{
						type: 'required',
						msg: '请输入身份证'
					}, {
						type: 'identity',
						msg: '请输入正确格式的身份证'
					}]
				}]
				const checkRes = validator(checkList, this.$toast)
				if (checkRes.status != 1000) return
				let data = {
					name: this.name,
					phone: this.phone,
					identityNum: this.identityNum
				}
				const [err, res] = await search(data)
				if (err) return
				this.$open('./finded', {
					info: JSON.stringify(res.data)
				}, 1)
			}
		}
	}
</script>

<style>
	.box {
		height: 96rpx;
		width: 80%;
		margin: auto;
		margin-bottom: 30rpx;
	}

	.inpBox {
		width: 100%;
		height: 100%;
		background-color: #EFF0F3;
		border-radius: 10rpx;
		padding-left: 20rpx;
		font-size: 28rpx;
	}

	.find {
		border: 2rpx solid #5A7EFF;
		color: #5A7EFF;
		letter-spacing: 10rpx;
		font-size: 32rpx;
		width: 80%;
		margin: auto;
		text-align: center;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 10rpx;
		margin-top: 80rpx;
	}
</style>
