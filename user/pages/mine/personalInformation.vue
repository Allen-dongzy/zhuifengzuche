<template>
	<view class="">

		<view class="flexBox">
			<view class="title">姓名</view>
			<view style="width: 40%;margin: auto;text-align: right;">
				<input style="height: 100%;width: 100%;font-size: 24rpx;" v-model="Branch" type="text" value="" placeholder-style="text-align: right;" placeholder="填写姓名" />
			</view>
		</view>

		<view class="flexBox">
			<view class="title">身份证号</view>
			<view style="width: 40%;margin: auto;text-align: right;">
				<input style="height: 100%;width: 100%;font-size: 24rpx;" v-model="Branch" type="text" value="" placeholder-style="text-align: right;" placeholder="填写身份证号" />
			</view>
		</view>

		<view class="flexBox">
			<view class="title">紧急联系人</view>
			<view style="width: 40%;margin: auto;text-align: right;">
				<input style="height: 100%;width: 100%;font-size: 24rpx;" v-model="name"  type="text" value="" placeholder-style="text-align: right;" placeholder="填写紧急联系人" />
			</view>
		</view>

		<view class="flexBox">
			<view class="title">紧急联系人方式</view>
			<view style="width: 40%;margin: auto;text-align: right;">
				<input style="height: 100%;width: 100%;font-size: 24rpx;" v-model="cardNum" type="text" value="" placeholder-style="text-align: right;" placeholder="填写紧急联系人方式" />
			</view>
		</view>
		
		
		
		

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
	
			}
		},
		onLoad(e) {
		// console.log(e)
		// var info = JSON.parse(e.obj)
		// if(e.type==1){
		// 	this.type=e.type
		// 	this.stuse=true
		// 	this.index=info.id
		// 	this.Branch=info.kaihu
		// 	this.name=info.name
		// 	this.cardNum=info.num
		// 	this.phone=info.iphone
		// }else{
		// 	this.type=e.type
		// }
		},
		methods: {

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
	.delBox{
		width: 20%;
		text-align: center;
		margin: auto;
		color: #FE3636;
		font-size: 24rpx;
		margin-top: 30rpx;
	}
</style>
