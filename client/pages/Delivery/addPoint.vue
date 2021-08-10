<template>
	<view class="">
		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;">
			<view class="buleLine"></view>
			<view class="title" style="margin-top: 0rpx;">填写送车点信息</view>
		</view>

		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">省份</view>
			<view class="selectBox">
				<view style="width: 90%;">
					<picker @change="selectShen" :value="provinceIndex" :range="provinceList" :range-key="'name'"
						class="pickerBox">
						<view v-if="!log" class="pickerText">{{selectProvinceName!=''?selectProvinceName:'请选择'}}</view>
						<view v-else class="pickerText">{{provinceList[provinceIndex].name}}</view>
					</picker>
				</view>
				<view style="width:10%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill"></image>
				</view>
			</view>
		</view>


		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">城市</view>
			<view class="selectBox">
				<view style="width: 90%;">
					<picker @change="selectShi" :value="cityIndex" :range="cityList" :range-key="'name'"
						class="pickerBox">
						<view v-if="!log1" class="pickerText">{{selectCityName!=''?selectCityName:'请选择'}}</view>
						<view v-else class="pickerText">{{cityList[cityIndex].name}}</view>
					</picker>
				</view>
				<view style="width:10%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">区域</view>
			<view class="selectBox">
				<view style="width: 90%;">
					<picker @change="selectQu" :value="areaIndex" :range="areaList" :range-key="'name'"
						class="pickerBox">
						<view v-if="!log2" class="pickerText">{{selectAreaName!=''?selectAreaName:'请选择'}}</view>
						<view v-else class="pickerText">{{areaList[areaIndex].name}}</view>
					</picker>
				</view>
				<view style="width:10%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">送车点名称</view>
			<input class="inpBox" v-model="carPoint" type="text" value="" placeholder="请输入送车点名称" />
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
			<view style="width: 22%;text-align: left;">请输入具体地址</view>
			<input class="inpBox" type="text" v-model="address" placeholder="请输入具体地址" />
		</view>
		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">地图经度</view>
			<input class="inpBox" type="text" v-model="longitudeInp" placeholder="请输入地图经度" />
		</view>
		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">地图纬度</view>
			<input class="inpBox" type="text" v-model="latitudeInp" placeholder="请输入地图纬度" />
		</view>

		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">车辆整备费</view>
			<input class="inpBox" v-model="price" type="text" value="" placeholder="请输入车辆整备费" />
		</view>

		<view class="flexBoxContent">
			<view style="width: 22%;text-align: left;">交通枢纽</view>
			<view class="selectBox">
				<view style="width: 90%;">
					<picker @change="pickerTransportation" :value="index" :range="TransportationList"
						:range-key="'name'" class="pickerBox">
						<view v-if="!log3" class="pickerText">{{indexName!=""?indexName:'请选择'}}</view>
						<view v-else class="pickerText">{{TransportationList[index].name}}</view>
					</picker>
				</view>
				<view style="width:10%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<button style=" color: white;
			width: 80%;
					margin:50rpx auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
					line-height: 96rpx;
				    height: 96rpx;" type="default" @click="sure">确定</button>

	</view>
</template>

<script>
	import {
		deliverySave,
		deliveryUpdate
	} from '@/apis/delivery'

	import {
		allFindCityList,
		allFindProvincesList,
		allFindAreasList
	} from '@/apis/regionProvince';

	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				log: false,
				log1: false,
				log2: false,
				log3: true,
				provinceList: [], //省份数组
				cityList: [], //城市数组
				areaList: [], //区域数组
				provinceIndex: '', //省份角标
				cityIndex: '', //城市角标
				areaIndex: '', //区角标
				index: 1, //交通枢纽角标
				indexName:'',//交通枢纽名字
				selectProvince: '', //选择省份ID
				selectProvinceName: '', //选择省份名字
				selectCity: '', //选择城市ID
				selectCityName: '', //选择城市名字
				selectArea: '', //选择区域ID
				selectAreaName: '', //选择区域名字
				selectTransportation: 0, //选择枢纽ID
				TransportationList: [{
					name: '是',
					id: 1
				}, {
					name: '否',
					id: 0
				}], //交通枢纽数组
				carPoint: '', //送车点
				price: '', //装备费用
				address: '',
				latitudeInp: '',
				longitudeInp: '',



				//地图
				id: 0, // 使用 marker点击事件 需要填写id
				mapWidth: "430rpx",
				mapHeight: "300rpx",
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

			console.log(e.obj == undefined)

			if (e.obj == undefined) {

			} else {
				this.obj = JSON.parse(e.obj)
				this.selectProvinceName=this.obj.provinceName
				this.selectProvince=this.obj.provinceCode
				this.selectCityName=this.obj.cityName
				this.selectCity = JSON.parse(e.obj).cityCode
				this.selectArea = JSON.parse(e.obj).areaCode
				this.selectAreaName = JSON.parse(e.obj).areaName
				this.carPoint = JSON.parse(e.obj).name
				this.address = JSON.parse(e.obj).address
				this.longitudeInp = JSON.parse(e.obj).lon
				this.latitudeInp = JSON.parse(e.obj).lat
				this.price = JSON.parse(e.obj).commission
				this.selectTransportation = JSON.parse(e.obj).isTraffic
				if(this.obj.isTraffic==1){
					this.indexName="是"
				}else{
					this.indexName="否"
				}
			}
			this.getSystemInfo()
			this.getlocation();
			this.allFindProvincesList()
		},
		computed: {
			//  user模式 门店id
			...mapState('user', ['shopId'])
		},

		methods: {
			//省
			async allFindProvincesList() {
				console.log('pp')
				const [err, res] = await allFindProvincesList({})
				if (err || res.code !== 200) return
				console.log(res.data)
				this.provinceList = res.data
			},
			//市
			async allFindCityList(e, q) {

				let data = {
					name: "",
					provinceCodes: q
				}
				const [err, res] = await allFindCityList(data)
				if (err || res.code !== 200) return
				console.log(res.data)
				this.cityList = res.data
			},
			//区
			async allFindAreasList(e, q) {

				let data = {
					name: "",
					cityCodes: q
				}
				const [err, res] = await allFindAreasList(data)
				if (err || res.code !== 200) return
				console.log(res.data)
				this.areaList = res.data
			},
			//选择省
			selectShen: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.log = true
				this.provinceIndex = e.target.value
				this.selectProvince = this.provinceList[this.provinceIndex].code
				this.selectProvinceName = this.provinceList[this.provinceIndex].name
				this.allFindCityList(this.provinceList[this.provinceIndex].name, this.provinceList[this.provinceIndex]
					.code)
				this.log1 = false
				this.log2 = false
				this.selectCityName=""
				this.selectAreaName=""
				this.$forceUpdate()
			},
			//选择市
			selectShi: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.log1 = true
				this.cityIndex = e.target.value
				this.selectCity = this.cityList[this.cityIndex].code
				this.selectCityName = this.cityList[this.cityIndex].name
				this.allFindAreasList(this.cityList[this.cityIndex].name, this.cityList[this.cityIndex].code)
				this.log2 = false
				this.selectAreaName=""
			},
			//选择区
			selectQu: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.log2 = true
				this.areaIndex = e.target.value
				this.selectArea = this.areaList[this.areaIndex].areaCode
				this.selectAreaName = this.areaList[this.areaIndex].name
			},
			//选择枢纽
			pickerTransportation(e) {
				this.log3 = true
				this.index = e.target.value
				this.selectTransportation = this.TransportationList[this.index].id
			},
			async sure() {
				if(this.obj==""){
					var data = {
						provinceCode: this.selectProvince,
						provinceName: this.selectProvinceName,
						cityCode: this.selectCity,
						cityName: this.selectCityName,
						areaCode: this.selectArea,
						areaName: this.selectAreaName,
						name: this.carPoint,
						address: this.address,
						lon: this.longitudeInp,
						lat: this.latitudeInp,
						commission: this.price,
						isTraffic: this.selectTransportation,
						shopId: this.shopId,
					}
					
					const [err, res] = await deliverySave(data)
					if (err) return
					console.log(res)
					uni.navigateBack({
						delta: 1
					})
				}else{
					var data = {
						id:this.obj.id,
						provinceCode: this.selectProvince,
						provinceName: this.selectProvinceName,
						cityCode: this.selectCity,  
						cityName: this.selectCityName,
						areaCode: this.selectArea,
						areaName: this.selectAreaName,
						name: this.carPoint,
						address: this.address,
						lon: this.longitudeInp,
						lat: this.latitudeInp,
						commission: this.price,
						isTraffic: this.selectTransportation,
						shopId: this.shopId,
					
					}
					
					const [err, res] = await deliveryUpdate(data)
					if (err) return
					console.log(res)
					uni.navigateBack({
						delta: 1
					})
				}
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
						that.latitudeInp = res.latitude
						that.longitudeInp = res.longitude
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
