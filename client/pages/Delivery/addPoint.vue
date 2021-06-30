<template>
	<view class="">
		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;">
			<view class="buleLine"></view>
			<view class="title" style="margin-top: 0rpx;">填写送车点信息</view>
		</view>
		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">城市</view>
			<view class="selectBox">
				<view style="width: 90%;">
					<picker @change="cityPicker" :value="cityIndex" :range="cityList" :range-key="'name'"
						class="pickerBox">
						<label v-if="!log1" class="pickerText">请选择</label>
						<label v-else class="pickerText">{{cityList[cityIndex].name}}</label>
					</picker>
				</view>
				<view style="width:10%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
				</view>
			</view>
		</view>

		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">区域</view>
			<view class="selectBox">
				<view style="width: 90%;">
					<picker @change="blockPicker" :value="blockIndex" :range="cityList" :range-key="'name'"
						class="pickerBox">
						<label v-if="!log2" class="pickerText">请选择</label>
						<label v-else class="pickerText">{{cityList[blockIndex].name}}</label>
					</picker>
				</view>
				<view style="width:10%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
				</view>
			</view>
		</view>

		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">送车点名称</view>
			<input class="inpBox" type="text" value="" placeholder="请输入车牌号" />
		</view>
		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">送车点地址</view>
			<view class="inpBox" style="padding-left: 0rpx;background-color: white;">
				<map :style="[{width:mapWidth,height: mapHeight}]" :controls="controls" :latitude="latitude"
					:longitude="longitude" :markers="covers" @click="getadd" @controltap="controltapfunc"
					 @updated="updatedmap"></map>
			</view>
		</view>
		<view class="flexBoxContent" style="margin-top: 280rpx;">
			<view style="width: 22%;text-align: left;">地图经度</view>
			<input class="inpBox" type="text" :value="longitude" placeholder="请输入地图经度" />
		</view>
		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">地图纬度</view>
			<input class="inpBox" type="text" :value="latitude" placeholder="请输入地图纬度" />
		</view>

		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">车辆整备费</view>
			<input class="inpBox" type="text" value="" placeholder="请输入车辆整备费" />
		</view>
		
		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">交通枢纽</view>
			<view class="selectBox">
				<view style="width: 90%;">
					<picker @change="Picker" :value="index" :range="cityList" :range-key="'name'"
						class="pickerBox">
						<label v-if="!log3" class="pickerText">请选择</label>
						<label v-else class="pickerText">{{cityList[index].name}}</label>
					</picker>
				</view>
				<view style="width:10%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode=""></image>
				</view>
			</view>
		</view>
		
		<button  style=" color: white;
			width: 80%;
					margin: auto;
					margin-top: 50rpx;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
					line-height: 96rpx;
				    height: 96rpx;" type="default" @click="next">新增</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				log1: false,
				log2: false,
				log3: false,
				cityList: [{
					name: '重庆'
				}, {
					name: '成都'
				}, {
					name: '深圳'
				}],
				cityIndex: '',
				blockIndex: '',
				index:'',
		
				id: 0, // 使用 marker点击事件 需要填写id
				mapWidth: "300rpx",
				mapHeight: "1000rpx",
				windowWidth: "",
				windowHeight: "",
				textwidth: "",
				textheight: "",
				title: 'map',
				latitude: '',
				longitude: '',
				covers: [],
				controls: [{ //在地图上显示控件，控件不随着地图移动
					id: 111, //控件id
					iconPath: '../../static/img/place.png', //显示的图标    
					position: { //控件在地图的位置
						left: 0,
						top: 0,
						width: 30,
						height: 30,
					},
					clickable: true
				}],


			}
		},
		onLoad() {
			this.getSystemInfo()
			this.getlocation();
		},

		methods: {
			cityPicker: function(e) {
				this.log1 = true
				this.cityIndex = e.target.value //取其下标

			},
			blockPicker(e) {
				this.log2 = true
				this.blockIndex = e.target.value //取其下标
			},



			updatedmap: function() {},
		
			controltapfunc: function(e) {
				this.getlocation();
			},
			getSystemInfo: function() {
				var that = this
				uni.getSystemInfo({
					success: function(res) {
						that.windowWidth = '440rpx'
						that.windowHeight = res.windowHeight
						that.mapWidth = that.windowWidth
						that.mapHeight = that.windowHeight - 80
						that.textwidth = that.windowWidth
						that.textheight = that.windowHeight - that.mapHeight
						that.controls = [{ //在地图上显示控件，控件不随着地图移动
							id: 111, //控件id
							iconPath: '../../static/img/place.png', //显示的图标    
							position: { //控件在地图的位置
								left: that.mapWidth - 70,
								top: that.mapHeight - 70,
								width: 30,
								height: 30
							},
							clickable: true
						}]
					}
				});
			},
			getadd: function(res) {
				var that = this;
				that.latitude = res.detail.latitude
				that.longitude = res.detail.longitude
				that.covers = [{
					latitude: res.detail.latitude,
					longitude: res.detail.longitude,
					iconPath: '../../static/img/place.png',
					width: 30,
					height: 30
				}]
				console.log()
				// that.$forceUpdate()
				// func.getLocation(res.detail.longitude,res.detail.latitude,function(result){
				//     that.address =result.data.result.formatted_addresses.recommend
				// },function(err){
				// })
				// that.$forceUpdate();
			},
			//获取当前位置
			getlocation: function() {
				var that = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) { 
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						that.covers = [{
							latitude: res.latitude,
							longitude: res.longitude,
							iconPath: '../../static/img/place.png',
							width: 30,
							height: 30
						}]
						//func.getLocation为封装的根据经纬度查询对应的地址的ajax方法
						// func.getLocation(res.longitude,res.latitude,function(result){
						//     that.address = result.data.result.formatted_addresses.recommend
						// },function(err){
						// })
						that.$forceUpdate();
					},
					fail: function(ret) {
						console.log(JSON.stringify(ret));
					}
				});
			}



		}
	}
</script>

<style>
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

	.selectBox {
		background-color: #EFF0F3;
		width: 60%;
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
		border-radius: 10rpx;
		margin-left: 5%;
		width: 60%;
		height: 74rpx;
		padding-left: 20rpx;
		
	}
</style>
