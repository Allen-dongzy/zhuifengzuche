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
					<picker  @change="bindPickerChange" :value="index" :range="list" :range-key="'name'"
						class="pickerBox">
						<view v-if="!log1" class="pickerText">{{carObj!=''?carObj.vehicleModelName:'请选择'}}</view>
						<view v-else class="pickerText">{{list[index].name}}</view>
					</picker>
				</view>
				<view style="width:15%;">
					<image mode="aspectFill" style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" ></image>
				</view>
			</view>
		</view> 
		<view class="flexBoxContent">
			<view class="">车&ensp;牌&ensp;号</view>
			<input class="inpBox" style="width: 70%;" type="text" v-model="carNum" placeholder="请输入车牌号" />
		</view>
		<view class="flexBoxContent">
			<view class="">车身颜色</view>
			<view class="selectBox" @click="open">
				<view
					style="width: 80%;padding-left: 20rpx;height: 74rpx;line-height: 74rpx;display: flex;align-items: center;">
					<view class="">{{colorName}}</view>
					<view class="colorBox" :style="{backgroundColor:boxColor}"></view>
				</view>
				<view style="width:15%;">
					<image mode="aspectFill" style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" ></image>
				</view>
			</view>
		</view>

		<view class="flexBoxContent">
			<view class="">车辆状态</view>
			<view class="selectBox">
				<view style="width: 80%;">
					<picker @change="bindPickerChange1" :value="index1" :range="carStatus" :range-key="'name'"
						class="pickerBox">
						<view v-if="!log2" class="pickerText">请选择</view>
						<view v-else class="pickerText">{{carStatus[index1].name}}</view>
					</picker>
				</view>
				<view style="width:15%;">
					<image mode="aspectFill" style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" ></image>
				</view>
			</view>
		</view>

		<view class="flexBoxContent">
			<view class="">购置日期</view>
			<view class="selectBox">
				<view style="width: 80%;">
					<picker mode="date" @change="selectpurchaseTime" :value="purchaseTime" :start="startDate"
						:end="currentdate" class="pickerBox">
						<view v-if="!log3" class="pickerText">请选择</view>
						<view v-else class="pickerText">{{purchaseTime}}</view>
					</picker>

				</view>
				<view style="width:15%;">
					<image mode="aspectFill" style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" ></image>
				</view>
			</view>
		</view>
		<view class="lineBox"></view>
		<view class="title">行驶证照片</view>
		<view class="idCard">
			<image mode="aspectFill" class="imgBox" @click="getImg(1)" :src="idCard1 || $util.fileUrl('/driver1.png')" ></image>
			<image mode="aspectFill" class="imgBox" @click="getImg(2)" :src="idCard2 ||$util.fileUrl('/driver2.png')" ></image>
		</view>


		<view class="title">号牌号码</view>
		<view class="idCard">
			<input class="inpBox" v-model="plateNumber" type="text" value="" placeholder="请输入号牌号码" />
		</view>

		<view class="title">品牌型号</view>
		<view class="idCard">
			<input class="inpBox" v-model="brandModel" type="text" value="" placeholder="请输入品牌型号" />
		</view>

		<view class="title">车辆识别代号</view>
		<view class="idCard">
			<input class="inpBox" v-model="discernCode" type="text" value="" placeholder="请输入车辆识别代号" />
		</view>

		<view class="title">发动机号码</view>
		<view class="idCard">
			<input class="inpBox" v-model="engineNum" type="text" value="" placeholder="请输入发动机号码" />
		</view>




		<view class="title">发证日期</view>
		<view class="selectBox" style="margin-left: 10%;width: 82%;margin-top: 20rpx;">
			<view style="width: 80%;">
				<picker mode="date" @change="selectgetcard" :value="getcard" :start="startDate" :end="currentdate"
					class="pickerBox">
					<view v-if="!log4" class="pickerText">请选择</view>
					<view v-else class="pickerText">{{getcard}}</view>
				</picker>

			</view>
			<view style="width:15%;">
				<image mode="aspectFill" style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" ></image>
			</view>
		</view>


		<view class="title">注册日期</view>
		<view class="selectBox" style="margin-left: 10%;width: 82%;margin-top: 20rpx;">
			<view style="width: 80%;">
				<picker mode="date" @change="setTime" :value="ceartTime" :start="startDate" :end="currentdate"
					class="pickerBox">
					<view v-if="!log5" class="pickerText">请选择</view>
					<view v-else class="pickerText">{{ceartTime}}</view>
				</picker>

			</view>
			<view style="width:15%;">
				<image mode="aspectFill" style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" ></image>
			</view>
		</view>

		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;margin-top: 40rpx;">
			<view class="buleLine"></view>
			<view class="title" style="margin-top: 0rpx;">交强险</view>
		</view>

		<view class="flexBoxContent">
			<view class="">单&ensp;&ensp;&ensp;&ensp;号</view>
			<input class="inpBox" v-model="insuranceSn" style="width: 70%;" type="text" value="" placeholder="请输入单号" />
		</view>


		<view class="flexBoxContent">
			<view class="">续保日期</view>
			<view class="selectBox">
				<view style="width: 80%;">
					<picker mode="date" @change="selectRenewalTime" :value="RenewalTime" :start="startDate"
						:end="endDate" class="pickerBox">
						<view v-if="!log6" class="pickerText">请选择</view>
						<view v-else class="pickerText">{{RenewalTime}}</view>
					</picker>

				</view>
				<view style="width:15%;">
					<image mode="aspectFill" style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" ></image>
				</view>
			</view>
		</view>

		<view style="margin-top: 40rpx;">
			<view v-for="(item,index) in CompulsoryList" :key="index"
				style="display: inline-block;width: 20%;margin: 0px 2%;">
				<view style="position: relative;">
					<image mode="aspectFill" style="height:160rpx;width: 160rpx;" :src="item" ></image>
					<image mode="aspectFill" style="position: absolute;height: 36rpx;width: 36rpx;top: -20rpx;left:140rpx;"
						:src="$util.fileUrl('/lancha.png')" @click="delImg(1,index)" ></image>
				</view>
			</view>
			<view style="display: inline-block;width: 20%;margin: 0px 2%;" @click="getImgMore(3)">
				<image mode="aspectFill" style="height:160rpx;width: 160rpx;" :src="$util.fileUrl('/guanxi.png')" ></image>
			</view>
		</view>



		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;margin-top: 40rpx;">
			<view class="buleLine"></view>
			<view class="title" style="margin-top: 0rpx;">商业险</view>
		</view>

		<view class="flexBoxContent">
			<view class="">单&ensp;&ensp;&ensp;&ensp;号</view>
			<input class="inpBox" v-model="businessSn" style="width: 70%;" type="text" value="" placeholder="请输入单号" />
		</view>


		<view class="flexBoxContent">
			<view class="">续保日期</view>
			<view class="selectBox">
				<view style="width: 80%;">
					<picker mode="date" @change="selectBusinessDate" :value="businessDate" :start="startDate"
						:end="endDate" class="pickerBox">
						<view v-if="!log7" class="pickerText">请选择</view>
						<view v-else class="pickerText">{{businessDate}}</view>
					</picker>

				</view>
				<view style="width:15%;">
					<image mode="aspectFill" style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" ></image>
				</view>
			</view>
		</view>

		<view style="margin-top: 40rpx;">
			<view v-for="(item,index) in businessList" :key="index"
				style="display: inline-block;width: 20%;margin: 0px 2%;">
				<view style="position: relative;">
					<image mode="aspectFill" style="height:160rpx;width: 160rpx;" :src="item" ></image>
					<image mode="aspectFill" @click="delImg(2,index)"
						style="position: absolute;height: 36rpx;width: 36rpx;top: -20rpx;left:140rpx;"
						:src="$util.fileUrl('/lancha.png')" ></image>
				</view>
			</view>
			<view style="display: inline-block;width: 20%;margin: 0px 2%;" @click="getImgMore(4)">
				<image mode="aspectFill" style="height:160rpx;width: 160rpx;" :src="$util.fileUrl('/guanxi.png')" ></image>
			</view>
		</view>


		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;margin-top: 40rpx;">
			<view class="buleLine"></view>
			<view class="title" style="margin-top: 0rpx;">保险证</view>
		</view>


		<view style="margin-top: 40rpx;">
			<view v-for="(item,index) in InsuranceList" :key="index"
				style="display: inline-block;width: 20%;margin: 0px 2%;">
				<view style="position: relative;">
					<image mode="aspectFill" style="height:160rpx;width: 160rpx;" :src="item" ></image>
					<image mode="aspectFill" style="position: absolute;height: 36rpx;width: 36rpx;top: -20rpx;left:140rpx;"
						:src="$util.fileUrl('/lancha.png')" @click="delImg(3,index)" ></image>
				</view>
			</view>
			<view style="display: inline-block;width: 20%;margin: 0px 2%;" @click="getImgMore(5)">
				<image mode="aspectFill" style="height:160rpx;width: 160rpx;" :src="$util.fileUrl('/guanxi.png')" ></image>
			</view>
		</view>

		<button style=" color: white;
				width: 80%;
						margin: auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;margin-top: 40rpx;margin-bottom: 20rpx;" type="default"
			@click="next">保存</button>


		<!-- //颜色弹窗 -->
		<uni-popup ref="popup" type="center">
			<view style="background-color: #F1F1F1;width: 510rpx;height: 400rpx;border-radius: 20rpx;padding: 20rpx;">
				<view v-for="(item,index) in colorList" style="display: inline-block;margin: 2rpx 30rpx;"
					@click="selectColor(index)">
					<view style="display: flex;justify-content: center;align-items: center;">
						<view class="">{{item.name}}</view>
						<view class="coloBox" :style="{backgroundColor:item.color}"></view>
					</view>

				</view>
			</view>
		</uni-popup>


	</view>
</template>

<script>
	import {
		queryAll
	} from '@/apis/vehicleModel'
	import {
		uploadFiles
	} from '@/apis/oss';
	import {
		vehicleInsert,
		vehicleSelectOne,
		vehicleUpdate
	} from '@/apis/vehicle'




	export default {
		data() {
			return {
				list: [], //车型list
				carStatus: [{
					name: '正常',
					id: 1
				}, {
					name: '异常',
					id: 2
				}], //状态list
				index: 0,
				index1: 0,
				log1: false,
				log2: false,
				log3: false,
				log4: false,
				log5: false,
				log6: false,
				log7: false,
				//log 所有选择器 初始显示
				boxColor: '#000000', //彩色小方块
				colorName: '黑色', //颜色名字
				colorList: [{
					name: '黑色',
					color: '#000000'
				}, {
					name: '白色',
					color: '#FFFFFF'
				}, {
					name: '红色',
					color: '#D9001B'
				}, {
					name: '蓝色',
					color: '#02A7F0'
				}, {
					name: '黄色',
					color: '#FFFF00'
				}, {
					name: '橙色',
					color: '#F59A23'
				}, {
					name: '绿色',
					color: '#03BF16'
				}, {
					name: '紫色',
					color: '#8080FF'
				}, {
					name: '灰色',
					color: '#EFF0F3'
				}, {
					name: '棕色',
					color: '#962323'
				}],

				carNum: '', //车牌号
				purchaseTime: '', //购置时间
				getcard: '', //发证时间
				ceartTime: '', //注册时间
				RenewalTime: '', //续保日期1
				RenewalTime: '', //续保日期2
				idCard1: '', //身份证正
				idCard2: '', //身份证反
				CompulsoryList: [], //交强险img List
				businessList: [], //商业img List
				InsuranceList: [], //保险证img List
				vehicleModelId: '', //车型id
				statusId: '', //状态id
				plateNumber: '', //号牌号码
				brandModel: '', //品牌型号
				discernCode: '', //车辆识别
				engineNum: '', //发动机号码
				insuranceSn: '', //交强险单号
				businessSn: '', //商业险单号
				businessDate: '', //商业险续保日期
				carObj: '', //详情车辆信息、
				carId: '',
				currentdate:''
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
		onLoad(e) {
			this.currentdate =this.getNowFormatDate();	
			this.queryAll()
			if (e.id != undefined) {
				this.vehicleSelectOne(e.id)
				this.carId = e.id
			}

		},
		mounted() {
		            let inputEle = document.querySelector('.input input')    
		            inputEle.addEventListener('blur',function(){    
		                document.body.scrollIntoView()    
		            })    
		        },
		methods: {
			//获取时间
		 getNowFormatDate(){
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (day >= 0 && day <= 9) {
					day = "0" + day;
				}
				 this.currentdate = year + seperator1 + month + seperator1 + day;
				return this.currentdate;
			},
			//获取详情
			async vehicleSelectOne(e) {
				const [err, res] = await vehicleSelectOne(e)
				if (err) return
				console.log(res)
				this.carObj = res.data


				// this.log1: false,
				this.log2 = true,
					this.log3 = true,
					this.log4 = true,
					this.log5 = true,
					this.log6 = true,
					this.log7 = true,


					this.carNum = this.carObj.carNumber
				for (let i = 0; i < this.colorList.length; i++) {
					if (this.carObj.colour == this.colorList[i].name) {
						this.boxColor = this.colorList[i].color
						this.colorName = this.colorList[i].name
					}
				}
				for (let i = 0; i < this.carStatus.length; i++) {
					if (this.carObj.vehicleStatus == this.carStatus[i].id) {
						this.index1 = i
					}
				}
				this.vehicleModelId = this.carObj.vehicleModelId
				this.statusId = this.carStatus[this.index1].id
				this.purchaseTime = this.carObj.purchaseTime
				this.idCard1 = this.carObj.vehicleDrivingPositiveFiles
				this.idCard2 = this.carObj.vehicleDrivingNegativeFiles
				this.plateNumber = this.carObj.plateNumber
				this.brandModel = this.carObj.brandModel
				this.discernCode = this.carObj.discernCode
				this.engineNum = this.carObj.engineNum
				this.getcard = this.carObj.issueDate
				this.ceartTime = this.carObj.registeredDate
				this.insuranceSn = this.carObj.insuranceSn
				this.RenewalTime = this.carObj.insuranceTime
				this.CompulsoryList = JSON.parse(this.carObj.insuranceFile)
				this.businessSn = this.carObj.businessSn
				this.businessDate = this.carObj.businessDate
				this.businessList = JSON.parse(this.carObj.businessFile)
				this.InsuranceList = JSON.parse(this.carObj.insuranceUrls)





				console.log(this.carObj)
			},
			//删除图片
			delImg(e, q) {
				if (e == 1) {
					this.CompulsoryList.splice(e, 1)
				} else if (e == 2) {
					this.businessList.splice(e, 1)
				} else {
					this.viewList.splice(e, 1)
				}
			},
			//获取车型
			async queryAll() {
				const [err, res] = await queryAll()
				if (err) return
				console.log(res)
				this.list = res.data.list
			},
			//选择颜色
			selectColor(e) {
				console.log(e)
				this.colorName = this.colorList[e].name
				this.boxColor = this.colorList[e].color
				this.$refs.popup.close()
			},
			// 打开颜色弹窗
			open() {
				this.$refs.popup.open()
			},
			// 关闭颜色弹窗
			// close() {
			// 	this.$refs.popup.close()
			// },
			//身份证图片上传
			getImg(e) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //camera 拍照 album 相册
					success: async (res) => {
						console.log('ppppp')
						console.log(res)
						const [err, rese] = await uploadFiles([res.tempFilePaths[0]]);//微信
						// const [err, rese] = await uploadFiles([res.apFilePathsV2[0]]);//支付宝
						console.log('乒乒乓乓')
						console.log(rese)
						if (err) return
						console.log(rese)
						if (e == 1) {
							this.idCard1 = rese[0]
						} else {
							this.idCard2 = rese[0]
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

			//交强险图片上传
			getImgMore(e) {
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //camera 拍照 album 相册
					success: async (res) => {
						console.log(res)
						const [err, rese] = await uploadFiles(res.tempFilePaths);
						console.log(rese)
						if (err) return
						console.log(rese)
						if (e == 3) {
							for (let i = 0; i < rese.length; i++) {
								this.CompulsoryList.push(rese[i])
							}

						} else if (e == 4) {
							for (let i = 0; i < rese.length; i++) {

								this.businessList.push(rese[i])
							}

						} else {
							for (let i = 0; i < rese.length; i++) {

								this.InsuranceList.push(rese[i])
							}
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
			async next() {
				if (this.vehicleModelId == "") {
					this.$toast("请选择车型")
					return false
				} else if (this.carNum == "") {
					this.$toast("请填写车牌号")
					return false
				} else if (this.colorName == "") {
					this.$toast("请选择车身颜色")
					return false
				} else if (this.statusId == "") {
					this.$toast("请选择车辆状态")
					return false
				} else if (this.purchaseTime == "") {
					this.$toast("请选择购置日期")
					return false
				} else if (this.idCard1 == "") {
					this.$toast("请上传行驶证正页")
					return false
				} else if (this.idCard2 == "") {
					this.$toast("请上传行驶证副页")
					return false
				} else if (this.plateNumber == "") {
					this.$toast("请填写号牌号码")
					return false
				} else if (this.brandModel == "") {
					this.$toast("请填写品牌号码")
					return false
				} else if (this.discernCode == "") {
					this.$toast("请填写车辆识别代号")
					return false
				} else if (this.engineNum == "") {
					this.$toast("请填写发动机号码")
					return false
				} else if (this.getcard == "") {
					this.$toast("请选择发证日期")
					return false
				} else if (this.ceartTime == "") {
					this.$toast("请选择注册日期")
					return false
				} else if (this.insuranceSn == "") {
					this.$toast("请填写交强险单号")
					return false
				} else if (this.RenewalTime == "") {
					this.$toast("请选择交强险续保日期")
					return false
				} else if (this.CompulsoryList == "") {
					this.$toast("请上传交强险险图片")
					return false
				} else if (this.businessSn == "") {
					this.$toast("请填写商业险单号")
					return false
				} else if (this.businessDate == "") {
					this.$toast("请选择商业险续保日期")
					return false
				} else if (this.businessList == "") {
					this.$toast("请上传商业险险图片")
					return false
				} else if (this.InsuranceList == "") {
					this.$toast("请上传保险证图片")
					return false
				}
				if (this.carId == "") {
					var data = {
						vehicleModelId: this.vehicleModelId,
						carNumber: this.carNum,
						colour: this.colorName,
						vehicleStatus: this.statusId,
						purchaseTime: this.purchaseTime,
						vehicleDrivingPositiveFiles: this.idCard1,
						vehicleDrivingNegativeFiles: this.idCard2,
						plateNumber: this.plateNumber,
						brandModel: this.brandModel,
						discernCode: this.discernCode,
						engineNum: this.engineNum,
						issueDate: this.getcard,
						registeredDate: this.ceartTime,
						insuranceSn: this.insuranceSn,
						insuranceTime: this.RenewalTime,
						insuranceFile: JSON.stringify(this.CompulsoryList),
						businessSn: this.businessSn,
						businessDate: this.businessDate,
						businessFile: JSON.stringify(this.businessList),
						insuranceUrls: JSON.stringify(this.InsuranceList),
					}
					const [err, res] = await vehicleInsert(data)
					if (err) return
					console.log(res)
					this.$toast("操作成功")
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 800)
				} else {
					var data = {
						id: this.carId,
						vehicleModelId: this.vehicleModelId,
						carNumber: this.carNum,
						colour: this.colorName,
						vehicleStatus: this.statusId,
						purchaseTime: this.purchaseTime,
						vehicleDrivingPositiveFiles: this.idCard1,
						vehicleDrivingNegativeFiles: this.idCard2,
						plateNumber: this.plateNumber,
						brandModel: this.brandModel,
						discernCode: this.discernCode,
						engineNum: this.engineNum,
						issueDate: this.getcard,
						registeredDate: this.ceartTime,
						insuranceSn: this.insuranceSn,
						insuranceTime: this.RenewalTime,
						insuranceFile: JSON.stringify(this.CompulsoryList),
						businessSn: this.businessSn,
						businessDate: this.businessDate,
						businessFile: JSON.stringify(this.businessList),
						insuranceUrls: JSON.stringify(this.InsuranceList),
					}
					const [err, res] = await vehicleUpdate(data)
					if (err) return
					console.log(res)
					this.$toast("操作成功")
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 800)

				}

			},
			bindPickerChange: function(e) {
				console.log('pp1')
				this.log1 = true
				this.index = e.target.value //取其下标
				this.vehicleModelId = this.list[this.index].id
			},
			bindPickerChange1: function(e) {
				console.log('pp1')
				this.log2 = true
				console.log(e.target.value)
				this.index1 = e.target.value //取其下标
				this.statusId = this.carStatus[this.index1].id
			},
			selectpurchaseTime(e) {
				this.log3 = true
				console.log(e.target.value)
				if(e.target.value.indexOf("/") != -1){
					e.target.value=e.target.value.replace(/\//g,'-');
					this.purchaseTime = e.target.value
				}else{
					this.purchaseTime = e.target.value
				}
				
				
			},

			selectgetcard: function(e) {
				console.log(e.target.value)
				this.log4 = true
				
				if(e.target.value.indexOf("/") != -1){
					e.target.value=e.target.value.replace(/\//g,'-');
					this.getcard = e.target.value
				}else{
					this.getcard = e.target.value
				}
			},



			setTime: function(e) {
				this.log5 = true
			
				if(e.target.value.indexOf("/") != -1){
					e.target.value=e.target.value.replace(/\//g,'-');
					this.ceartTime = e.target.value
				}else{
					this.ceartTime = e.target.value
				}
			},
			selectRenewalTime(e) {
				this.log6 = true
				
				if(e.target.value.indexOf("/") != -1){
					e.target.value=e.target.value.replace(/\//g,'-');
					this.RenewalTime = e.target.value
				}else{
					this.RenewalTime = e.target.value
				}
			},
			selectBusinessDate: function(e) {
				this.log7 = true
				
				if(e.target.value.indexOf("/") != -1){
					e.target.value=e.target.value.replace(/\//g,'-');
					this.businessDate = e.target.value
				}else{
					this.businessDate = e.target.value
				}
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

	.coloBox {
		height: 24rpx;
		width: 24rpx;
		border-radius: 5rpx;
		margin-left: 10rpx;
	}
</style>
