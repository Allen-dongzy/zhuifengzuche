<template>
	<view class="">
		<view class="box">
			<view class="title">事故类型</view>
			<view class="flexBox" style="padding: 0rpx;">
				<view v-for="(item,index) in list" class="flexBox" style="margin-right: 10%;" @click="select(index)">
					<image v-show="item.status==true" style="width: 32rpx;height: 32rpx;margin-left: 5rpx;" :src="$util.fileUrl('/quanxian1.png')" @click="getcarInfo" mode=""></image>
					<image v-show="item.status==false" style="width: 32rpx;height: 32rpx;margin-left: 5rpx;" :src="$util.fileUrl('/quanxian2.png')" @click="getcarInfo" mode=""></image>
					<view style="margin-left: 10rpx;">轻微</view>
				</view>
			</view>
			
			<view class="title">事故日期</view>
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
			
			<view style="padding: 30rpx 0rpx;">
				<view class="blackText" style="padding: 0rpx 0rpx 20rpx 0rpx;">事故说明</view>
				<textarea value="" placeholder="这里是备注信息" style="padding: 20rpx;background-color:#EFF0F3;height:144rpx;width: 100%;border-radius: 10rpx;" />
			</view>
			
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
</template>

<script>
	export default {
		data() {
			return {
				list:[{status:false},{status:false},{status:true}],
				enddate: '请选择',
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
			select(e){
				for(var i=0;i<this.list.length;i++){
				this.list[i].status=false
				}
				this.list[e].status=true
			},
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
	
	.flexBox {
		display: flex;
		align-items: center;
		padding: 20rpx 0rpx;
	}
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

	.box {
		width: 90%;
		margin: auto;

	}

	.title {
		font-size: 28rpx;
		font-weight: bold;
		padding: 30rpx 0rpx;
	}
	.blackText {
		width: 30%;
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
		text-align: left;
	}
</style>
