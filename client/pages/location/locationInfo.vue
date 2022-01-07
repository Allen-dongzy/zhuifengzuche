<template>
	<view class="">
		<view class="">
			<view class="carNum">渝A-5331B</view>
			<view class="">豪华｜大众｜零度</view>
		</view>
		<map style="width:100%;height:700rpx" :controls="controls" :latitude="latitude"
			:longitude="longitude" :markers="covers" @click="getadd" @controltap="controltapfunc"
			@updated="updatedmap"></map>
			
			
	</view>
</template>

<script>



	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
		
				address: '',
				latitudeInp: '',
				longitudeInp: '',



				//地图
				id: 0, // 使用 marker点击事件 需要填写id
				// mapWidth: "100%",
				// mapHeight: "300rpx",
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
				//地图
				obj: "" //编辑详情

			}
		},
		onLoad(e) {

			this.getSystemInfo()
			this.getlocation();
		
		},
		computed: {
			//  user模式 门店id
			...mapState('user', ['shopId'])
		},

		methods: {




			// updatedmap: function() {},

			controltapfunc: function(e) {
				this.getlocation();
			},
			getSystemInfo: function() {
				var that = this
				uni.getSystemInfo({
					success: function(res) {
						that.windowWidth = '440rpx'
						that.windowHeight ='300rpx'	
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

				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						that.latitude = res.latitude
						that.longitude = res.longitude
						that.address = res.address
						that.covers = [{
							latitude: res.latitude,
							longitude: res.longitude,
							iconPath: '../../static/img/place.png',
							width: 30,
							height: 30
						}]
						that.$forceUpdate()
					}
				});

			},
			//获取当前位置
			getlocation: function() {
				var that = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log(res)
						console.log(that.obj != "")
						console.log(typeof(that.obj))
						if (that.obj != "") {
							that.longitude = Number(that.obj.lon)
							that.latitude = Number(that.obj.lat)
						} else {
							that.latitude = res.latitude;
							that.longitude = res.longitude;
						}
						that.covers = [{
							latitude: res.latitude,
							longitude: res.longitude,
							iconPath: '../../static/img/place.png',
							width: 30,
							height: 30
						}]
						// func.getLocation为封装的根据经纬度查询对应的地址的ajax方法

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
	.carNum{
		color: #000000;
		font-weight: 500;
		
	}
	
</style>
