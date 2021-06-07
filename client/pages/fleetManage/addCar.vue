<template>
	<view>
		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;">
			<view class="buleLine"></view>
			<view class="title" style="margin-top: 0rpx;">填写车辆信息</view>
		</view>
		<view class="flexBoxContent">
			<view class="">选择车型</view>
			<view class="selectBox">
				<view style="width: 80%;">
					<picker @change="bindPickerChange" :value="index" :range="list" :range-key="'name'"
						class="pickerBox">
						<label v-if="!log1" class="pickerText">请选择</label>
						<label v-else class="pickerText">{{list[index].name}}</label>
					</picker>
				</view>
				<view style="width:15%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
				</view>
			</view>
		</view>
		<view class="flexBoxContent">
			<view class="">车&ensp;牌&ensp;号</view>
			<input class="inpBox" style="width: 70%;" type="text" value="" placeholder="请输入车牌号" />
		</view>
		<view class="flexBoxContent">
			<view class="">车身颜色</view>
			<view class="selectBox">
				<view
					style="width: 80%;padding-left: 20rpx;height: 74rpx;line-height: 74rpx;display: flex;align-items: center;">
					<view class="">黑色</view>
					<view class="colorBox" :style="{backgroundColor:boxColor}"></view>
				</view>
				<view style="width:15%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
				</view>
			</view>
		</view>

		<view class="flexBoxContent">
			<view class="">车辆状态</view>
			<view class="selectBox">
				<view style="width: 80%;">
					<picker @change="bindPickerChange1" :value="index" :range="list" :range-key="'name'"
						class="pickerBox">
						<label v-if="!log2" class="pickerText">请选择</label>
						<label v-else class="pickerText">{{list[index].name}}</label>
					</picker>
				</view>
				<view style="width:15%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
				</view>
			</view>
		</view>

		<view class="flexBoxContent">
			<view class="">购置日期</view>
			<view class="selectBox">
				<view style="width: 80%;">
					<picker mode="date" @change="Time" :value="timeDate" :start="startDate" :end="endDate"
						class="pickerBox">
						<label v-if="!log3" class="pickerText">请选择</label>
						<label v-else class="pickerText">{{timeDate}}</label>
					</picker>

				</view>
				<view style="width:15%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
				</view>
			</view>
		</view>
		<view class="lineBox"></view>
		<view class="title">身份证照片</view>
		<view class="idCard">
			<image class="imgBox" :src="$util.fileUrl('/driver1.png')" mode=""></image>
			<image class="imgBox" :src="$util.fileUrl('/driver2.png')" mode=""></image>
		</view>


		<view class="title">号牌号码</view>
		<view class="idCard">
			<input class="inpBox" type="text" value="" placeholder="请输入号牌号码" />
		</view>

		<view class="title">品牌型号</view>
		<view class="idCard">
			<input class="inpBox" type="text" value="" placeholder="请输入品牌型号" />
		</view>

		<view class="title">车辆识别代号</view>
		<view class="idCard">
			<input class="inpBox" type="text" value="" placeholder="请输入车辆识别代号" />
		</view>

		<view class="title">发动机号码</view>
		<view class="idCard">
			<input class="inpBox" type="text" value="" placeholder="请输入发动机号码" />
		</view>




		<view class="title">发证日期</view>
		<view class="selectBox" style="margin-left: 10%;width: 82%;margin-top: 20rpx;">
			<view style="width: 80%;">
				<picker mode="date" @change="getTime" :value="getcard" :start="startDate" :end="endDate"
					class="pickerBox">
					<label v-if="!log4" class="pickerText">请选择</label>
					<label v-else class="pickerText">{{getcard}}</label>
				</picker>

			</view>
			<view style="width:15%;">
				<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
			</view>
		</view>


		<view class="title">注册日期</view>
		<view class="selectBox" style="margin-left: 10%;width: 82%;margin-top: 20rpx;">
			<view style="width: 80%;">
				<picker mode="date" @change="setTime" :value="ceartTime" :start="startDate" :end="endDate"
					class="pickerBox">
					<label v-if="!log5" class="pickerText">请选择</label>
					<label v-else class="pickerText">{{ceartTime}}</label>
				</picker>

			</view>
			<view style="width:15%;">
				<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
			</view>
		</view>
		
		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;margin-top: 40rpx;">
			<view class="buleLine"></view>
			<view class="title" style="margin-top: 0rpx;">交强险</view>
		</view>
		
	<view class="flexBoxContent">
		<view class="">车&ensp;牌&ensp;号</view>
		<input class="inpBox" style="width: 70%;" type="text" value="" placeholder="请输入车牌号" />
	</view>
		
		<view class="title">续保日期</view>
		<view class="selectBox" style="margin-left: 10%;width: 82%;margin-top: 20rpx;">
			<view style="width: 80%;">
				<picker mode="date" @change="protectDay" :value="protectTime" :start="startDate" :end="endDate"
					class="pickerBox">
					<label v-if="!log6" class="pickerText">请选择</label>
					<label v-else class="pickerText">{{protectTime}}</label>
				</picker>
		
			</view>
			<view style="width:15%;">
				<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
			</view>
		</view>
		
		<view style="margin-top: 40rpx;">
			<view v-for="(item,index) in list" :key="index" style="display: inline-block;width: 20%;margin: 0px 2%;">
				<view style="position: relative;">
					<image style="height:160rpx;width: 160rpx;" src="../../static/img/icon3.png" mode=""></image>
					<image style="position: absolute;height: 36rpx;width: 36rpx;top: -20rpx;left:140rpx;" :src="$util.fileUrl('/lancha.png')" mode=""></image>
				</view>
			</view>
		</view>
		
	

		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;margin-top: 40rpx;">
			<view class="buleLine"></view>
			<view class="title" style="margin-top: 0rpx;">商业险</view>
		</view>
		
	<view class="flexBoxContent">
		<view class="">单&ensp;&ensp;号</view>
		<input class="inpBox" style="width: 70%;" type="text" value="" placeholder="请输入车牌号" />
	</view>
		
		<view class="title">续保日期</view>
		<view class="selectBox" style="margin-left: 10%;width: 82%;margin-top: 20rpx;">
			<view style="width: 80%;">
				<picker mode="date" @change="protectDay" :value="protectTime" :start="startDate" :end="endDate"
					class="pickerBox">
					<label v-if="!log6" class="pickerText">请选择</label>
					<label v-else class="pickerText">{{protectTime}}</label>
				</picker>
		
			</view>
			<view style="width:15%;">
				<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
			</view>
		</view>
		
		<view style="margin-top: 40rpx;">
			<view v-for="(item,index) in list" :key="index" style="display: inline-block;width: 20%;margin: 0px 2%;">
				<view style="position: relative;">
					<image style="height:160rpx;width: 160rpx;" src="../../static/img/icon3.png" mode=""></image>
					<image style="position: absolute;height: 36rpx;width: 36rpx;top: -20rpx;left:140rpx;" :src="$util.fileUrl('/lancha.png')" mode=""></image>
				</view>
			</view>
		</view>
		
		
		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;margin-top: 40rpx;">
				<view class="buleLine"></view>
				<view class="title" style="margin-top: 0rpx;">保险证</view>
			</view>
			
			
			<view style="margin-top: 40rpx;">
				<view v-for="(item,index) in list" :key="index" style="display: inline-block;width: 20%;margin: 0px 2%;">
					<view style="position: relative;">
						<image style="height:160rpx;width: 160rpx;" src="../../static/img/icon3.png" mode=""></image>
						<image style="position: absolute;height: 36rpx;width: 36rpx;top: -20rpx;left:140rpx;" :src="$util.fileUrl('/lancha.png')" mode=""></image>
					</view>
				</view>
			</view>
			
			<button  style=" color: white;
				width: 80%;
						margin: auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;margin-top: 40rpx;margin-bottom: 20rpx;" type="default" @click="next">新增</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: 1
				}, {
					name: 2
				}, {
					name: 3
				}],
				index: 0,
				log1: false,
				log2: false,
				log3: false,
				log4: false,
				log5: false,
				log6: false,
				boxColor: '#000000',
				timeDate: '',
				getcard: '',
				ceartTime: '',
				protectTime:''
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
			bindPickerChange: function(e) {
				console.log('pp1')
				this.log1 = true
				this.index = e.target.value //取其下标

			},
			bindPickerChange1: function(e) {
				console.log('pp1')
				this.log2 = true
				this.index = e.target.value //取其下标

			},

			Time: function(e) {

				this.log3 = true
				this.timeDate = e.target.value
			},
			getTime: function(e) {
				console.log(e.target.value)
				this.log4 = true
				this.getcard = e.target.value
			},
			setTime: function(e) {
				this.log5 = true
				this.ceartTime = e.target.value
			},
			protectDay:function(e){
				this.log6 = true
				this.protectTime = e.target.value
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
	.flexBoxContent {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;

	}

	.buleLine {
		background-color: #5A7EFF;
		width: 6rpx;
		height: 24rpx;
		margin-left: 20rpx;
	}

	.title {
		color: #000000;
		font-weight: bold;
		font-size: 32rpx;
		margin-left: 20rpx;
	}

	.pickerBox {
		background-color: #EFF0F3;
		color: #999999;
		font-size: 24rpx;
		height: 74rpx;
		border-radius: 10rpx;
	}

	.selectBox {
		background-color: #EFF0F3;
		width: 70%;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		margin-left: 5%;
		color: #999999;
		font-size: 24rpx;
	}

	.pickerText {
		height: 74rpx;
		line-height: 74rpx;
		padding-left: 20rpx;
	}

	.inpBox {
		background-color: #EFF0F3;
		width: 92%;
		border-radius: 10rpx;
		margin-left: 5%;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 20rpx;
	}

	.colorBox {
		height: 24rpx;
		width: 24rpx;
		border-radius: 5rpx;
		margin-left: 10rpx;
	}

	.lineBox {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin: 40rpx 0px;
	}

	.title {
		color: black;
		font-size: 28rpx;
		margin-top: 40rpx;
		margin-left: 32rpx;
	}

	.idCard {
		width: 90%;
		margin: auto;
		padding-top: 20rpx;
	}

	.imgBox {
		height: 186rpx;
		width: 44%;
		margin: 0px 3%;
	}
</style>
