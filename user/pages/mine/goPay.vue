<template>
	<view class="box">
		<view class="flexBox">
			<view class="blackTitle" style="width: 30%;">租车开始时间</view>
			<view style="width: 33%;">
				<picker mode="date" @change="Time" :value="timeDate" :start="startDate" :end="endDate" class="pickerBox"
					style="text-align: center;">
					<label v-if="!log1" class="grayTetx">请选择</label>
					<label v-else class="grayTetx">{{timeDate}}</label>
				</picker>
			</view>
			<view style="width: 33%;">
				<picker mode="time" @change="Time2" :value="time" :start="startDate" :end="endDate" class="pickerBox"
					style="text-align: center;">
					<label v-if="!log2" class="grayTetx">请选择</label>
					<label v-else class="grayTetx">{{time}}</label>
				</picker>
			</view>
			<view style="width:4%;">
				<image style="width:28rpx;height: 28rpx;" :src="`${ossUrl}/mine/daytime.png`" mode=""></image>
			</view>
		</view>
		<view class="flexBox">
			<view class="blackTitle">平台</view>
			<view style="width: 56%;">
				<picker @change="bindPickerChange" :value="index" :range="list" :range-key="'name'" class="pickerBox">
					<label v-if="!log3" class="grayTetx">请选择</label>
					<label v-else class="grayTetx">{{list[index].name}}</label>
				</picker>
			</view>
			<image style="width:28rpx;height: 38rpx;" :src="`${ossUrl}/mine/huiyou.png`" mode=""></image>
		</view>
		<view class="flexBox">
			<view class="blackTitle">订单</view>
			<view style="width: 56%;">
				<picker @change="bindPickerChange" :value="index" :range="list" :range-key="'name'" class="pickerBox">
					<label v-if="!log3" class="grayTetx">请选择</label>
					<label v-else class="grayTetx">{{list[index].name}}</label>
				</picker>
			</view>
			<image style="width:28rpx;height: 38rpx;" :src="`${ossUrl}/mine/huiyou.png`" mode=""></image>
		</view>
		<view class="flexBox">
			<view class="blackTitle">项目</view>
			<view style="width: 56%;">
				<picker @change="bindPickerChange" :value="index" :range="list" :range-key="'name'" class="pickerBox">
					<label v-if="!log3" class="grayTetx">请选择</label>
					<label v-else class="grayTetx">{{list[index].name}}</label>
				</picker>
			</view>
			<image style="width:28rpx;height: 38rpx;" :src="`${ossUrl}/mine/huiyou.png`" mode=""></image>
		</view>
		<view class="flexBox">
			<view class="blackTitle">车牌号</view>
			<view style="width: 59%;">
				<input style="grayTetx" type="text" value="" placeholder="请填写车牌号" />
			</view>
		</view>
		<view class="flexBox">
			<view class="blackTitle">店员</view>
			<view style="width: 59%;">
				<input style="grayTetx" type="text" value="" placeholder="请填写店员" />
			</view>
		</view>
		<view class="flexBox">
			<view class="blackTitle">金额（元）</view>
			<view style="width: 59%;">
				<input style="grayTetx" type="text" value="" placeholder="请填写金额" />
			</view>
		</view>
		<view class="flexBox">
			<view class="blackTitle">付款人/收款人</view>
			<view style="width: 59%;">
				<input style="grayTetx" type="text" value="" placeholder="请填写付款人姓名" />
			</view>
		</view>
		<view class="flexBox">
			<view class="blackTitle">银行卡</view>
			<view style="width: 59%;">
				<input style="grayTetx" type="text" value="" placeholder="请填写银行卡" />
			</view>
		</view>
		<view class="flexBox" style="border: none;">备注</view>
		<view
			style="background-color:#EFF0F3;margin-top: 20rpx;border-radius: 15rpx;width: 100%;height: 254rpx;padding: 20rpx;width: 93.5%;">
			<textarea style="padding-top:20rpx;height:114rpx;color: #999999;font-size: 24rpx;" value=""
				placeholder="请填写备注信息" />
			<view class="">

				<image style="width:120rpx;height: 120rpx;" :src="`${ossUrl}/mine/beizhu.png`" mode=""></image>
			</view>
		</view>
		
		<button style=" color: white;
			width: 100%;
					margin: auto;
					margin-top: 5vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx; " type="default" @click="pay">前往付款</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				log1: false,
				log2: false,
				log3: false,
				timeDate: '',
				time: '',
				index: "",
				ossUrl: this.$ossUrl, // oss
				list: [{
					name: 1
				}, {
					name: 2
				}, {
					name: 3
				}],
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			Time: function(e) {

				this.log1 = true
				this.timeDate = e.target.value
			},
			Time2(e) {
				this.log2 = true
				this.time = e.target.value
			},
			bindPickerChange: function(e) {
				console.log('pp1')
				this.log3 = true
				this.index = e.target.value //取其下标

			},
			pay(){
				uni.navigateTo({ 
					url:'./paySuccess'
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
		}
	}
</script>

<style>
	.box {

		width: 90%;
		margin: auto;
		margin-top: 20rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #EFF0F3;
		padding: 30rpx 0rpx;
	}

	.blackTitle {
		width: 41%;
		color: #000000;
		font-size: 28rpx;
	}

	.grayTetx {
		font-size: 28rpx;
		color: #999999;
	}

	.pickerBox {
		width: 100%;

	}
</style>
