<template>
	<view class="">
		<view class="topNav">
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/1.png')" mode="aspectFill"></image>
			</view>
			<view style="font-size: 32rpx;">基本信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" :src="$util.fileUrl('/next2.png')" mode="aspectFill"></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/2.png')" mode="aspectFill"></image>
			</view>
			<view style="font-size: 32rpx;">证件信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" :src="$util.fileUrl('/next1.png')" mode="aspectFill"></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" :src="$util.fileUrl('/3-3.png')" mode="aspectFill"></image>
			</view>
			<view style="font-size: 32rpx;color: #5A7EFF;">门店信息</view>
		</view>
		
		<view class="">
			<view class="fromTitel">省份</view>
			<picker class="pickerBox" @change="selectShen" :value="shenindex" :range="selectShenobj" range-key="name">
				<view  class="uni-input">{{shenindex!=-1?selectShenobj[shenindex].name:'请选择城市'}}</view>
			</picker>
		
			<view class="fromTitel">城市</view>
			<picker class="pickerBox" @change="selectShi" :value="shiindex" :range="selectorObj" range-key="name">
				<view  class="uni-input">{{shiindex!=-1?selectorObj[shiindex].name:'请选择城市'}}</view>
			</picker>
		
			<view class="fromTitel">区域</view>
			<picker class="pickerBox" @change="selectQu" :value="quindex" :range="selectorquObj" range-key="name">
				
				<view  class="uni-input">{{quindex!=-1?selectorquObj[quindex].name:'请选择区域'}}</view>
			</picker>
		
		
		
		
			<view class="fromTitel">门店名称</view>
			<input class="inpBox" v-model="storeName" type="text" placeholder="请填写门店名字" />
		
			<view class="fromTitel">门店地址</view>
			<input class="inpBox" v-model="address" type="text" placeholder="请填写门店地址" />
		
			<view class="fromTitel">门店电话</view>
			<input class="inpBox" v-model="storePhone" type="text" placeholder="请填写门店电话" />
		
			<view class="fromTitel">营业时间</view>
			<view class="timeBox">
				<picker mode="time" style="width: 40%;height: 74rpx;" class="pickerBox" @change="pickerStar" :value="indexStar">
		
					<view  class="uni-input" style="height: 74rpx;width: 43%;margin: 0px 4% 0px 5%;">{{indexStar}}</view>
				</picker>
		

				   
				<picker mode="time" style="width: 40%;height: 74rpx;" class="pickerBox" @change="pickerEnd" :value="indexEnd">
					
					<view  class="uni-input" style="height: 74rpx;width: 43%;margin: 0px 0px 0px 0%;">{{indexEnd}}</view>
				</picker>
			</view>
		
		
		

			<view class="fromTitel">地图经纬度</view>
			<view class="local">
				<input style="width: 43%;margin-left: 0%;" v-model="longitude" class="inpBox" type="text" placeholder="请输入经度" />
				<input style="width: 43%;margin-left: 4%;" v-model="latitude" class="inpBox" type="text"
					placeholder="请输入纬度" />
			</view>

			<view class="fromTitel">门店图片</view>
			<image class="imgBox" @click="getImg(0)" :src="storeImg || $util.fileUrl('/upload_image@2x.png')" mode="aspectFill">
			</image>

			<view class="fromTitel">负责人/法人</view>
			<input class="inpBox" v-model="corporationName" type="text" placeholder="请填写负责人或者法人名称" />

			<view class="fromTitel">负责人/法人 电话</view>
			<input class="inpBox" type="text" v-model="corporationNamePhone" placeholder="请填写负责人或者法人名称电话" />



			<view class="fromTitel">车辆整备费</view>
			<input class="inpBox" type="text" v-model="price" placeholder="请填写车辆整备费" />



			<view class="title">门店图片-门头照片</view>
			<view class="idCard">
				<image class="imgBox1" :src="idCard1 || $util.fileUrl('/guanxi.png')" mode="aspectFill" @click="getImg(1)">
				</image>
			</view>

			<view class="title">门店图片-店内照片</view>
			<view class="idCard">
				<image class="imgBox1" :src="idCard2 || $util.fileUrl('/guanxi.png')" mode="aspectFill" @click="getImg(2)">
				</image>
			</view>

			<view class="title">门店图片-店铺室外照片</view>
			<view class="idCard">
				<image class="imgBox1" :src="idCard3 || $util.fileUrl('/guanxi.png')" mode="aspectFill" @click="getImg(3)">
				</image>
			</view>

			<view class="title">对公账户开户许可证</view>
			<view class="idCard">
				<image class="imgBox1" :src="idCard4 || $util.fileUrl('/guanxi.png')" mode="aspectFill" @click="getImg(4)">
				</image>
			</view>


			<button style=" color: white;
			width: 80%;
					margin: 20rpx auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;" type="default" @click="next()">完成</button>


		</view>
	</view>
</template>

<script>
	import {
		open
	} from '@/utils/uni-tools'
	import {
		allFindCityList,
		allFindProvincesList,
		allFindAreasList
	} from '@/apis/regionProvince';
	import {
		uploadFiles
	} from '@/apis/oss';
	import {
		shopOwnerRegister
	} from '@/apis/admin';


	export default {
		data() {
			return {
				show: false, //表单底部边框线

				selectShenobj: [], //省列表
				selectorObj: [], //城市列表
				selectorquObj: [], //区域列表	
				
				city: '', //城市
				shenindex: -1, //选择省角标
				shiindex: -1, //选择市角标
				quindex: -1, //选择区角标
				indexStar: '00:00', //开始时间角标
				indexEnd: '00:00', //结束时间角标
				obj: {}, //传递的全部数据

				selectProvince: '', //选择的省
				selectCity: '', //选择的市
				selectArea: '', //选择的区 
				selectStar: '', //选择的开始时间
				selectEnd: '', //选择的结束时间
				storeName: '', //门店名字
				address: '', //门店地址
				storePhone: '', //门店电话
				longitude: '', //经度
				latitude: '', //纬度
				storeImg: '', //门店照片
				idCard1: '', //门店图片-门头照片
				idCard2: '', //门店图片-店内照片
				idCard3: '', //门店图片-店铺室外照片
				idCard4: '', //对公账户开户许可证
				corporationName: '', //法人姓名
				corporationNamePhone: '', //法人电话
				price:'',//车辆整备费
	
			}
		},
		onLoad() {
			// console.log(JSON.parse(e))
			uni.$on('businessParams', (e) => {
				console.log('--------')
				console.log(e)
				this.obj = e
			})
			this.allFindProvincesList()
		},
		methods: {
			
			async allFindProvincesList() {
				console.log('pp')
				const [err, res] = await allFindProvincesList({})
				if (err || res.code !== 200) return
				console.log(res.data)
				this.selectShenobj = res.data
			},
			async allFindCityList(e,q) {

				let data = {
					name: "",
					provinceCodes:q
				}
				const [err, res] = await allFindCityList(data)
				if (err || res.code !== 200) return
				console.log(res.data)
				this.selectorObj = res.data
			},
			
			async allFindAreasList(e,q) {
			
				let data = {
					name: "",
					cityCodes:q
				}
				const [err, res] = await allFindAreasList(data)
				if (err || res.code !== 200) return
				console.log(res.data)
				this.selectorquObj = res.data
			},
			async next() {


			if(this.storeName==""){
				this.$toast('请输入店名称')
				return false;
			}else if(this.address==""){
					this.$toast('请输入地址')
					return false;
			}else if(this.storePhone==""){
					this.$toast('请输入门店电话')
					return false;
			}else if(this.selectStar==""){
					this.$toast('请选择开始时间')
					return false;
			}else if(this.selectEnd==""){
					this.$toast('请选择结束时间')
					return false;
			}else if(this.longitude==""){
					this.$toast('请输入经度')
					return false;
			}else if(this.latitude==""){
					this.$toast('请输入纬度')
					return false;
			}else if(this.storeImg==""){
					this.$toast('请输入门店图片')
					return false;
			}else if(this.corporationName==""){
					this.$toast('请输入法人名字')
					return false;
			}else if(this.corporationNamePhone==""){
					this.$toast('请输入法人名字电话')
					return false;
			}else if(this.price==""){
					this.$toast('请输入车辆整备费')
					return false;
			}
			
				this.obj.provinceCode = this.selectProvince
				this.obj.cityCode = this.selectCity
				this.obj.areaCode = this.selectArea
				this.obj.name = this.storeName
				this.obj.memberAddress = this.address
				this.obj.memberPhone = this.storePhone
				this.obj.beginTime = this.selectStar
				this.obj.endTime = this.selectEnd
				this.obj.lon = this.longitude
				this.obj.lat = this.latitude
				this.obj.shopImages = this.storeImg
				this.obj.principal = this.corporationName
				this.obj.principalPhone = this.corporationNamePhone
				this.obj.serviceFee = this.price
				this.obj.doorHeadPicture = this.idCard1
				this.obj.inStorePicture = this.idCard2
				this.obj.outdoorPictures = this.idCard3
				this.obj.accountOpeningPermit = this.idCard4
				
				const [err, res] = await shopOwnerRegister(this.obj)
				if (err) return
				console.log(res)
				this.$toast('注册成功')
				 setTimeout(() => {
					 open('/pages/login/login', 2)
				 },500)
			},
			selectShen: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.shenindex = e.target.value
				this.selectProvince = this.selectShenobj[this.shenindex].code
				this.allFindCityList(this.selectShenobj[this.shenindex].name,this.selectShenobj[this.shenindex].code)
					this.shiindex=-1
					this.quindex=-1
			},
			selectShi: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.shiindex = e.target.value
				this.selectCity = this.selectorObj[this.shiindex].code
				this.allFindAreasList(this.selectorObj[this.shiindex].name,this.selectorObj[this.shiindex].code)
				this.quindex=-1
			},
			selectQu: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.quindex = e.target.value
				this.selectArea = this.selectorquObj[this.quindex].areaCode 
				
			},
			pickerStar: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexStar = e.target.value
				this.selectStar = this.indexStar
			},
			pickerEnd: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexEnd = e.target.value
				this.selectEnd = this.indexEnd
			},
			getImg(e) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //camera 拍照 album 相册
					success: async (res) => {
						console.log(res)
						const [err, rese] = await uploadFiles([res.tempFilePaths[0]]);
						console.log(rese)
						if (err) return
						console.log(rese)

						if (e == 0) {
							this.storeImg = rese[0]
						} else if (e == 1) {
							this.idCard1 = rese[0]
						} else if (e == 2) {
							this.idCard2 = rese[0]
						} else if (e == 3) {
							this.idCard3 = rese[0]
						} else {
							this.idCard4 = rese[0]
						}

					},
					fail() {
						uni.showToast({
							title: "拍照或引用相册失败",
							duration: 2000
						})
					}
				})
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
		margin-left: 5%;
		font-size: 24rpx;
		color: #999999;
		padding-left: 20rpx;
		margin-top: 20rpx;
	}
	
	.fromTitel {
		width: 90%;
		margin: auto;
		margin-top: 40rpx;
	}
	
	
	.pickerBox {
		width: 90%;
		height: 74rpx;
		margin: auto;
		background: #EFF0F3;
		border-radius: 10rpx;
		padding-left: 20rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.uni-input{
		width: 90%;
		height: 74rpx;
		line-height: 74rpx;
		margin: auto;
		background: #EFF0F3;
		border-radius: 10rpx;
		padding-left: 20rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.uni-input1{
		width: 39%;
		height: 74rpx;
		line-height: 74rpx;
		margin: auto;
		background: #EFF0F3;
		border-radius: 10rpx;
		padding-left: 20rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.timeBox {
		display: flex;
		justify-items: center;
		align-items: center;
		margin-top: 20rpx;
	}
	
	.local {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.imgBox {
		height: 186rpx;
		width: 44%;
		margin: 20px 0rpx 0rpx 5%;
	}
	
	
	
	.title {
	
		color: black;
		font-size: 28rpx;
		width: 90%;
		margin: auto;
		margin-top: 40rpx;
	
	}
	
	.idCard {
		width: 90%;
		margin: auto;
		padding-top: 20rpx;
	}
	
	.imgBox1 {
		height: 186rpx;
		width: 44%;
	
	}
</style>
