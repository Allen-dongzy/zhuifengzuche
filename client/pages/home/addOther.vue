<template>
	<view class="">
		<view class="box">
			<view class="title">记录日期</view>
			<view class="selectBox">
				<view style="width: 90%;">
					<picker mode="date" :value="enddate" :start="startDate" :end="endDate" @change="endTime">
						<label v-if="!log1" class="pickerText">请选择</label>
						<label v-else class="pickerText">{{enddate}}</label>
					</picker>
				</view>
				<view style="width:10%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
				</view> 
			</view>
			<view class="title" >记录日期</view>
			<textarea value="" placeholder="请填写记录说明" style="padding: 20rpx;height:220rpx;width: 100%;background-color: #EFF0F3;border-radius: 20rpx;" />
			<view class="title" >添加照片</view>
			<view style="position: relative;width: 22%;display: inline-block;">
				<image style="width:160rpx;height: 160rpx;" :src="$util.fileUrl('/icon5.png')" mode=""></image>
				<image style="width:36rpx;height: 36rpx;position:absolute;top: -10rpx;right: -10rpx;" :src="$util.fileUrl('/lancha.png')" mode=""></image>
			</view>
		</view>
		<button  style=" color: white;
				width: 90%;
						margin: 30vh auto 0rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" >保存</button>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				enddate: '请选择记录时间',
				log1:false
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

			endTime: function(e) {
				this.log1=true
				this.enddate = e.target.value
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


	.selectBox {
		background-color: #EFF0F3;
		width: 100%;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		color: #999999;
		font-size: 24rpx;
	}

	.pickerText {
		height: 74rpx;
		line-height: 74rpx;
		padding-left: 20rpx;
	}
	.box{
		width: 90%;
		margin: auto;
		
	}
	.title{
		font-size: 28rpx;font-weight: bold;padding: 30rpx 0rpx;
	}
</style>
