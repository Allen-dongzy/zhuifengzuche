<template>
	<view class="">
		<view class="topNav">
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" src="../../static/img/1.png" mode=""></image>
			</view>
			<view style="font-size: 32rpx;">基本信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" src="../../static/img/next2.png" mode=""></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" src="../../static/img/2.png" mode=""></image>
			</view>
			<view style="font-size: 32rpx;">证件信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" src="../../static/img/next1.png" mode=""></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" src="../../static/img/3-3.png" mode=""></image>
			</view>
			<view style="font-size: 32rpx;color: #5A7EFF;">门店信息</view>
		</view>

		<view class="">
			<u-form :model="form" ref="uForm" :border-bottom="show">
				<u-form-item :border-bottom="show">
					<view class="fromTitel">城市</view>
					<picker class="pickerBox" @change="bindPickerChange" :value="index" :range="selectorObj"
						range-key="cateName">
						<view v-show="index==-1" class="uni-input">请选择城市</view>
						<view v-show="index!=-1" class="uni-input">{{selectorObj[index].cateName}}</view>
					</picker>
				</u-form-item>
				<u-form-item :border-bottom="show">
					<view class="fromTitel">门店名称</view>
					<input class="inpBox" type="text" placeholder="请填写门店名字" />
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">门店地址</view>
					<input class="inpBox" type="text" placeholder="请填写门店地址" />
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">门店电话</view>
					<input class="inpBox" type="text" placeholder="请填写门店电话" />
				</u-form-item>



				<u-form-item :border-bottom="show">
					<view class="fromTitel">营业时间</view>
					<view class="timeBox">
						<picker mode="time" style="width: 40%;height: 74rpx;" class="pickerBox" @change="pickerStar"
							:value="indexStar">
							<view v-show="indexStar==-1" class="uni-input" style="height: 74rpx;">请选择开始时间</view>
							<view v-show="indexStar!=-1" class="uni-input" style="height: 74rpx;">{{indexStar}}</view>
						</picker>

						<picker mode="time" style="width: 40%;height: 74rpx;" class="pickerBox" @change="pickerEnd"
							:value="indexEnd">
							<view v-show="indexEnd==-1" class="uni-input" style="height: 74rpx;">请选择结束时间</view>
							<view v-show="indexEnd!=-1" class="uni-input" style="height: 74rpx;">{{indexEnd}}</view>
						</picker>
					</view>
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">地图经纬度</view>
					<view class="local">
						<input style="width: 43%;" class="inpBox" type="text" placeholder="请输入经度" />
						<input style="width: 43%;margin-left: 4%;" class="inpBox" type="text" placeholder="请输入经度" />
					</view>
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">门店图片</view>
					<image class="imgBox" :src="$util.fileUrl('/upload_image@2x.png')" mode=""></image>
				</u-form-item>


				<u-form-item :border-bottom="show">
					<view class="fromTitel">负责人/法人</view>
					<input class="inpBox" type="text" placeholder="请填写负责人或者法人名称" />
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">负责人/法人 电话</view>
					<input class="inpBox" type="text" placeholder="请填写负责人或者法人名称电话" />
				</u-form-item>


				<u-button type="primary" :custom-style="customStyle" @click="next">完成</u-button>

			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: '',
					sex: ''
				}, //表单数据
				show: false, //表单底部边框线
				selectorObj: [{
					cateName: '1',
					id: 1
				}, {
					cateName: '2',
					id: 2
				}], //城市列表
				index: -1, //选择城市角标
				indexStar: -1, //开始时间角标
				indexEnd: -1, //结束时间角标
				customStyle: {
					margin: 'auto',
					marginTop: '60px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginBottom: '20px',
					color: 'white',
					width: '90%',
					borderRadius: '50rpx',
					backgroundColor: '#5A7EFF'
				} //提交按钮样式

			}
		},
		onLoad() {

		},
		methods: {

			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			pickerStar: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexStar = e.target.value
			},
			pickerEnd: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexEnd = e.target.value
			},
		}
	}
</script>

<style>
	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 122rpx;
		width: 100%;
		border-bottom: 20rpx solid #EFF0F3;
	}

	.inpBox {
		background-color: #EFF0F3;
		border-radius: 10rpx;
		height: 74rpx;
		width: 90%;
		margin: auto;
		font-size: 24rpx;
		color: #999999;
		padding-left: 20rpx;
	}

	.fromTitel {
		width: 90%;
		margin: auto;
	}


	.pickerBox {
		width: 90%;
		margin: auto;
		background: #EFF0F3;
		border-radius: 10rpx;
		padding-left: 20rpx;
		color: #999999
	}

	.timeBox {
		display: flex;
		justify-items: center;
		align-items: center;
	}

	.local {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.imgBox {
		height: 186rpx;
		width: 44%;
		margin: 0px 3%;
	}
</style>
