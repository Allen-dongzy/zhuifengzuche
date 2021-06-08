<template>
	<view class="">
		<view class="flexBox">
			<view class="title">所属银行</view>
			<view style="width: 40%;margin: auto;">
				<picker class="pickerBox" @change="bindPickerChange" :value="index" :range="selectorObj"
					range-key="cateName">
					<view v-show="stuse==false" class="uni-input">请选择城市</view>
					<view v-show="stuse==true" class="uni-input">{{selectorObj[index].cateName}}</view>
				</picker>
			</view>
		</view>

		<view class="flexBox">
			<view class="title">开户支行</view>
			<view style="width: 40%;margin: auto;">
				<input style="height: 100%;width: 100%;" v-model="Branch" type="text" value="" placeholder="填写开户支行信息" />
			</view>
		</view>

		<view class="flexBox">
			<view class="title">开户姓名</view>
			<view style="width: 40%;margin: auto;">
				<input style="height: 100%;width: 100%;" v-model="name"  type="text" value="" placeholder="填写开户人姓名" />
			</view>
		</view>

		<view class="flexBox">
			<view class="title">银行卡号</view>
			<view style="width: 40%;margin: auto;">
				<input style="height: 100%;width: 100%;" v-model="cardNum" type="text" value="" placeholder="填写银行卡号" />
			</view>
		</view>


		<view class="flexBox">
			<view class="title">银行预留手机号</view>
			<view style="width: 40%;margin: auto;">
				<input style="height: 100%;width: 100%;" v-model="phone" type="text" value="" placeholder="填写银行预留手机号" />
			</view>
		</view>
		<view style="width: 90%;margin: auto; ">
			<view class="title" style="padding: 30rpx 0rpx;">商户关系证明</view>
			<image style="width: 160rpx;height: 160rpx;" :src="$util.fileUrl('/guanxi.png')" mode=""></image>
		</view>
		
		
		<view v-show="type==1" style="color: #FE3636;width: 20%;text-align: center;margin: auto;margin-top: 30rpx;">删除银行卡</view>
		<button style=" color: white;
			width: 90%;
					margin: auto;
					margin-top: 25vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx; " type="default">完成</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectorObj: [{
					cateName: '成都',
					id: 1
				}, {
					cateName: '重庆',
					id: 2
				}], //城市列表
				stuse: false,
				index: 0,
				Branch:'',//支行
				name:'',//姓名
				cardNum:'',//卡号
				phone:'',//预留手机号
				type:""
			}
		},
		onLoad(e) {
		console.log(e)
		var info = JSON.parse(e.obj)
		if(e.type==1){
			this.type=e.type
			this.stuse=true
			this.index=info.id
			this.Branch=info.kaihu
			this.name=info.name
			this.cardNum=info.num
			this.phone=info.iphone
		}else{
			this.type=e.type
		}
		},
		methods: {
			bindPickerChange: function(e) {
				this.stuse = true
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
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
		font-weight: bold;
	}

	.uni-input {
		text-align: center;
		color: #999999;
		font-size: 28rpx;
	}
</style>
