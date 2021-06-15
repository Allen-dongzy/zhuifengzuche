<template>
	<view class="">
		<view class="box">
			<view class="flexBox">
				<view class="title">品牌型号</view>
				<view class="idCard">
					<input class="inpBox" type="text" value="" placeholder="请输入品牌型号" />
				</view>
			</view>
			<view class="flexBox">
				<view class="title">客户身份证</view>
				<view class="idCard">
					<input class="inpBox" type="text" value="" placeholder="请输入品牌型号" />
				</view>
			</view>
			<view class="flexBox">
				<view class="title">客户手机号</view>
				<view class="idCard">
					<input class="inpBox" type="text" value="" placeholder="请输入品牌型号" />
				</view>
			</view>

			<view class="flexBoxContent">
				<view class="title">选择车辆</view>
				<view class="selectBox">
					<view style="width: 85%;">
						<picker @change="bindPickerChange1" :value="index" :range="list" :range-key="'name'"
							class="pickerBox">
							<label v-if="!log2" class="pickerText">请选择</label>
							<label v-else class="pickerText">{{list[index].name}}</label>
						</picker>
					</view>
					<view style="width:15%;">
						<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode="">
						</image>
					</view>
				</view>
			</view>

			<view class="flexBox">
				<view class="title">租期</view>
				<view class="timeBox">取车时间</view>
				<view class="timeBox" style="margin-left: 10%;">换车时间</view>
			</view>
			
			<view class="flexBox">
				<view class="title">金额</view>
				<view class="idCard">
					<input class="inpBox" type="text" value="" placeholder="请填写金额" />
				</view>
			</view>
			

			<view style="display: flex;margin-top: 30rpx;">
				<view class="title">备注</view>
				<view class="idCard">
					<textarea  style="padding: 20rpx;background-color:#EFF0F3;height:144rpx;width: 100%;border-radius: 10rpx;"  type="text" value="" placeholder="请填写金额" />
				</view>
			</view>
			
			<view class="flexBox" style="margin-top: 40rpx;">
				<view class="title" >添加照片</view>
				<view style="position: relative;width: 22%;display: inline-block;">
					<image style="width:160rpx;height: 160rpx;" :src="$util.fileUrl('/icon5.png')" mode=""></image>
					<image style="width:36rpx;height: 36rpx;position:absolute;top: -10rpx;right: -10rpx;" :src="$util.fileUrl('/lancha.png')" mode=""></image>
				</view>
			</view>
		</view>
		
<button  style=" color: white;
			width: 90%;
					margin: 10vh auto 0rpx auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;letter-spacing: 10rpx;" type="default" @click="next()">完成</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				log2:false,
				list: [{
					name: 1
				}, {
					name: 2
				}, {
					name: 3
				}],
				index: 0,
			}
		},
		methods: {
		bindPickerChange1: function(e) {
				console.log('pp1')
				this.log2 = true
				this.index = e.target.value //取其下标

			},
		}
	}
</script>

<style>
	.box {
		width: 90%;
		margin: auto;
	}

	.flexBox {
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}

	.inpBox {
		background-color: #EFF0F3;
		width: 100%;
		border-radius: 10rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 20rpx;
	}

	.title {
		color: black;
		font-size: 28rpx;
		width: 25%;
	}

	.idCard {
		width: 75%;
		margin: auto;
	}

	.selectBox {
		background-color: #EFF0F3;
		width: 75%;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		color: #999999;
		font-size: 24rpx;
	}

	.flexBoxContent {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
	}

	.pickerBox {
		background-color: #EFF0F3;
		color: #999999;
		font-size: 24rpx;
		height: 74rpx;
		border-radius: 10rpx;
	}

	.pickerText {
		height: 74rpx;
		line-height: 74rpx;
		padding-left: 20rpx;
	}

	.timeBox {
		background-color: #EFF0F3;
		padding-left: 5%;
		width: 33%;
		border-radius: 10rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 20rpx;


	}
</style>
