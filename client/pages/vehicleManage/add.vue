<template>
	<view class="add">
		<view v-if="carId == ''">
			<view class="flexBoxContent" v-if="roles[0].id == 1">
				<view class="title">门店</view>
				<view class="selectBox" @click="">
					<view style="width: 85%;">
						<picker @change="selectStore" :value="indexStore" :range="list" :range-key="'name'" class="pickerBox">
							<view class="pickerText">{{ storeName != '' ? storeName : '请选择' }}</view>
						</picker>
					</view>
					<view style="width:10%;"><image style="width:40rpx;height: 20rpx;transform: rotate(-90deg);" :src="`${filePath}/vehicleManage/down-mini.png`"></image></view>
				</view>
			</view>
		</view>
		<view class="header">
			<view class="label"></view>
			<text>填写车型信息</text>
		</view>
		<view class="vehicle-information">
			<view class="item">
				<view class="caption">选择品牌</view>
				<tui-dropdown-list :show="brandKey" :top="80" :height="500">
					<template v-slot:selectionbox>
						<view class="info" @tap="brandKey ? closeSelBox('brand') : openSelBox('brand')">
							<view>{{ brand ? brand : '请选择品牌' }}</view>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<scroll-view class="box" scroll-y="true">
							<view class="drop-item" v-for="(item, index) in brandList" :key="index" @tap="checkBrand(index)">{{ item.name }}</view>
						</scroll-view>
					</template>
				</tui-dropdown-list>
			</view>

			<view class="item">
				<view class="caption">选择类别</view>
				<tui-dropdown-list :show="classesKey" :top="80" :height="500">
					<template v-slot:selectionbox>
						<view class="info" @tap="classesKey ? closeSelBox('classes') : openSelBox('classes')">
							<text>{{ classes ? classes : '请选择类别' }}</text>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<scroll-view class="box" scroll-y="true">
							<view class="drop-item" v-for="(item, index) in classesList" :key="index" @tap="checkClasses(index)">{{ item.name }}</view>
						</scroll-view>
					</template>
				</tui-dropdown-list>
			</view>

			<view class="item">
				<view class="caption">车型</view>
				<input class="info" v-model="vehicleModel" type="text" placeholder="请填写车型" placeholder-style="color:#999;" maxlength="80" />
			</view>

			<view class="item">
				<view class="caption">年款</view>

				<picker mode="date" fields="year" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" class="pickerBox" style="width: 520rpx;">
					<view class="pickerText">{{ date }}年</view>
				</picker>
			</view>

			<view class="item">
				<view class="caption">门数</view>
				<picker :value="doorIndex" :range="doorList" :range-key="'name'" @change="changedoor" class="pickerBox">
					<view class="pickerText">{{ doorIndex !== '' ? doorList[doorIndex].name : '请选择' }}</view>
				</picker>
			</view>
			<view class="item">
				<view class="caption">变速箱类型</view>
				<picker :value="speedIndex" :range="speedList" :range-key="'name'" @change="changespeed" class="pickerBox" style="width: 520rpx;">
					<view class="pickerText">{{ speedIndex !== '' ? speedList[speedIndex].name : '请选择' }}</view>
				</picker>
			</view>
			<view class="item">
				<view class="caption">动力类型</view>
				<picker :value="powerIndex" :range="powerList" :range-key="'name'" @change="changepower" class="pickerBox" style="width: 520rpx;">
					<view class="pickerText">{{ powerIndex !== '' ? powerList[powerIndex].name : '请选择' }}</view>
				</picker>
			</view>
			<view class="item">
				<view class="caption">燃油类型</view>
				<picker :value="fuelIndex" :range="fuelList" :range-key="'name'" @change="changefuel" class="pickerBox" style="width: 520rpx;">
					<view class="pickerText">{{ fuelIndex !== '' ? fuelList[fuelIndex].name : '请选择' }}</view>
				</picker>
			</view>

			<view class="item">
				<view class="caption">排档</view>
				<tui-dropdown-list :show="stallKey" :top="80" :height="76 * stallList.length + 40 * 2">
					<template v-slot:selectionbox>
						<view class="info" @tap="stallKey ? closeSelBox('stall') : openSelBox('stall')">
							<text>{{ stall ? stall : '请选择排档' }}</text>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<view class="box">
							<view class="drop-item" v-for="(item, index) in stallList" :key="index" @tap="checkStall(index)">{{ item.text }}</view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>
			<view class="item">
				<view class="caption">座位数</view>
				<tui-dropdown-list :show="seatKey" :top="80" :height="76 * seatList.length + 40 * 2">
					<template v-slot:selectionbox>
						<view class="info" @tap="seatKey ? closeSelBox('seat') : openSelBox('seat')">
							<text>{{ seat ? seat : '请选择座位数' }}</text>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<view class="box">
							<view class="drop-item" v-for="(item, index) in seatList" :key="index" @tap="checkSeat(index)">{{ item.text }}座</view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>
			<view class="item">
				<view class="caption">排量</view>
				<tui-dropdown-list :show="displacementKey" :top="80" :height="500">
					<template v-slot:selectionbox>
						<view class="info" @tap="displacementKey ? closeSelBox('displacement') : openSelBox('displacement')">
							<text>{{ displacement ? displacement : '请选择排量' }}</text>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<scroll-view class="box" scroll-y="true">
							<view class="drop-item" v-for="(item, index) in displacementList" :key="index" @tap="checkDisplacement(index)">{{ item.name }}</view>
						</scroll-view>
					</template>
				</tui-dropdown-list>
			</view>
			<view class="item">
				<view class="caption">燃油型号</view>
				<input class="info" v-model="model" type="text" placeholder="请填写燃油型号" placeholder-style="color:#999;" maxlength="80" />
			</view>
			<view class="item" style="height: auto;">
				<view class="caption">添加标签</view>
				<view class="label-box">
					<view class="label add" @click="addlabel">+新增</view>
					<view class="label" style="position: relative;" v-for="(item, index) in labelList">
						<image
							style="width:30rpx;height: 30rpx;position: absolute;top:-3rpx;right:-3rpx"
							:src="`${filePath}/vehicleManage/delete.png`"
							@click="delLabel(index)"
							mode="aspectFill"
						></image>
						{{ item }}
					</view>
				</view>
			</view>

			<view class="item" style="height: auto;">
				<view class="caption">允许设置限时优惠:</view>
				<switch style="margin-left: 10%;" @change="switch1Change" />
			</view>

			<view class="picture-group">
				<div class="color-bar"></div>
				<view class="caption">车型图片</view>
				<view class="picture-box">
					<view class="image-card" v-for="(item, index) in cartypeImg">
						<image class="picture" :src="item" mode="aspectFill"></image>
						<image class="delete" :src="`${filePath}/vehicleManage/delete.png`" @click.stop="del(1, index)"></image>
					</view>

					<view class="image-card add" @click="getImg(1)"><image class="picture" :src="`${filePath}/vehicleManage/camera.png`" mode="aspectFill"></image></view>
				</view>
			</view>
			<view class="picture-group">
				<div class="color-bar"></div>
				<view class="caption">实拍图片</view>
				<view class="picture-box">
					<view class="image-card" v-for="(item, index) in actualImg">
						<image class="picture" :src="item" mode="aspectFill"></image>
						<image class="delete" :src="`${filePath}/vehicleManage/delete.png`" @click="del(2, index)"></image>
					</view>

					<view class="image-card add" @click="getImg(2)"><image class="picture" :src="`${filePath}/vehicleManage/camera.png`" mode="aspectFill"></image></view>
				</view>
			</view>
		</view>
		<view class="header">
			<view class="label"></view>
			<text>费用设置</text>
		</view>
		<view class="costs-set">
			<view class="item">
				<view class="caption">租车押金</view>
				<input class="info" v-model="rentalMoney" type="text" placeholder="请设置租车押金" placeholder-style="color:#999;" maxlength="80" />
			</view>
			<view class="item">
				<view class="caption">基本保障费</view>
				<input class="info" v-model="protectionMoney" type="text" placeholder="请设置基本保障费" placeholder-style="color:#999;" maxlength="80" />
			</view>
			<view class="item">
				<view class="caption">违章押金</view>
				<input class="info" v-model="breakRulesMoney" type="text" placeholder="请设置违章押金" placeholder-style="color:#999;" maxlength="80" />
			</view>
		</view>
		<view class="header">
			<view class="label"></view>
			<text>批量设置租金</text>
		</view>
		<view class="set-up-the-rent">
			<view class="tab-header" v-if="weekType == 1">
				<view class="tab" @click="select(2)">周内价格</view>
				<view class="tab ac">周末价格</view>
			</view>
			<view class="tab-header" v-else>
				<view class="tab ac">周内价格</view>
				<view class="tab" @click="select(1)">周末价格</view>
			</view>
			<view class="input-box">
				<view class="square" @click="reduce(2)">-10%</view>
				<view class="square" @click="reduce(1)">-1</view>
				<!-- 	<view class="input">50</view> -->
				<input class="input" v-if="weekType == 1" type="text" v-model="weekExternal" />
				<input class="input" v-else type="text" v-model="weekWithin" />

				<view class="square" @click="add(1)">+1</view>
				<view class="square" @click="add(2)">+10%</view>
			</view>
			<view v-if="carId == ''" class="btn" @click="sure(1)">添加</view>
			<view v-else class="btn" @click="sure(2)">确定</view>
		</view>

		<uni-popup ref="popup" type="center">
			<view style="width:500rpx;margin: auto;background-color: white;border-radius: 20rpx;padding:30rpx 0rpx;">
				<view style="text-align: center;margin: 20rpx 0rpx;">添加标签</view>
				<input
					type="text"
					value=""
					v-model="labelText"
					placeholder="请输入标签"
					style="border: 2rpx solid #5A7EFF;border-radius: 10rpx;width: 90%;margin-left: 5%;height: 80rpx;line-height: 80rpx;padding-left: 20rpx;"
				/>
				<view style="display: flex;justify-content:center;align-items: center;margin: 20rpx 0rpx;">
					<view
						style="background-color: #5A7EFF;color: white;font-size: 28rpx;text-align: center;height: 60rpx;line-height: 40rpx;padding: 10rpx 20rpx;width: 150rpx;border-radius: 15rpx;margin-right: 20rpx;"
						@click="close(1)"
					>
						确定
					</view>
					<view
						style="border: 2rpx solid #5A7EFF;color: #5A7EFF;font-size: 28rpx;text-align: center;height: 60rpx;line-height: 40rpx;padding: 10rpx 20rpx;width: 150rpx;border-radius: 15rpx;margin-left: 20rpx;"
						@click="close(2)"
					>
						取消
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import config from '@/common/js/config'

import { vehicleBrandQueryAll } from '@/apis/vehicleBrand'

import { vehicleCategoryQueryAll } from '@/apis/vehicleCategory'
import { outputVolume, insertVehicleModel, vehicleModelUpdate, searchCarid } from '@/apis/vehicleModel'
import { mapState } from 'vuex'
import { uploadFiles } from '@/apis/oss'

import { memberShopPageQuery } from '../../apis/memberShop'
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		})
		return {
			date: currentDate,
			doorList: [
				{
					name: '2门'
				},
				{
					name: '3门'
				},
				{
					name: '4门'
				}
			],
			doorIndex: 0,
			speedList: [
				{
					name: '自动'
				},
				{
					name: '手动'
				}
			],
			speedIndex: 0,
			powerList: [
				{
					name: '燃油'
				},
				{
					name: '纯电动'
				},
				{
					name: '混合电动'
				}
			],
			powerIndex: 0,
			fuelList: [
				{
					name: '汽油'
				},
				{
					name: '柴油'
				},
				{
					name: '电油混合'
				},
				{
					name: '电动'
				},
				{
					name: '其他类型'
				}
			],
			fuelIndex: 0,

			// -----

			storeShow: false, //门店显示或者隐藏
			list: [], //门店列表
			storeName: '', //门店值
			indexStore: '', //门店角标
			storeId: '', //门店id
			filePath: config.filePath,
			brandList: [], // 品牌列表
			brandKey: false, // 品牌开关
			brand: '', // 品牌
			brandId: '', //品牌id
			classesList: [], // 类别列表
			classesKey: false, // 类别开关
			classes: '', // 类别
			classesId: '', //类别Id
			stallList: [
				{
					text: '手动'
				},
				{
					text: '自动'
				}
			], // 排档列表
			stallKey: false, // 排档开关
			stall: '', // 排档
			seatList: [
				{
					text: '2'
				},
				{
					text: '5'
				},
				{
					text: '6'
				},
				{
					text: '7'
				},
				{
					text: '9'
				}
			], // 座位数列表
			seatKey: false, // 座位开关
			seat: '', // 座位
			displacementList: [], // 排量列表
			displacementKey: false, // 排量开关
			displacement: '', // 排量
			displacementId: '', // 排量Id
			action: '',
			actualImg: [], //实际图片
			cartypeImg: [], //车型图片
			price: '', //价格
			labelList: [], //标签数组
			labelText: '', //输入标签
			rentalMoney: '', //租车押金
			protectionMoney: '', //基本保障费
			breakRulesMoney: '', //违章押金
			model: '', //燃油型号
			vehicleModel: '', //车型
			weekType: 1, //1周末价格 2周内价格
			weekExternal: '', //周末价格
			weekWithin: '', //周内价格
			carId: '', //车型id
			isLimited: '' //限时优惠1开 0关
		}
	},
	computed: {
		// 门店id
		...mapState('user', ['shopId']),
		...mapState('user', ['roles']),
		startDate() {
			return this.getDate('start')
		},
		endDate() {
			return this.getDate('end')
		}
	},
	watch: {
		price(newVal) {
			if (this.weekType == 1) {
				this.weekWithin = this.price
				this.weekType = 1
			} else {
				this.weekExternal = this.price
				this.weekType = 2
			}
		}
	},
	onLoad(e) {
		this.getBrand()
		this.getType()
		this.outputVolume()
		this.getStore()
		console.log(e)

		if (e.id != undefined) {
			this.searchCarid(e.id)
			this.carId = e.id
			this.storeId = e.memberShopId
		} else {
			this.storeId = this.shopId
		}
	},

	methods: {
		//限时优惠
		switch1Change: function(e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value)
			if (e.target.value) {
				this.isLimited = 1
			} else {
				this.isLimited = 0
			}
		},
		//获取时间
		getDate(type) {
			const date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()

			if (type === 'start') {
				year = year - 60
			} else if (type === 'end') {
				year = year + 2
			}
			month = month > 9 ? month : '0' + month
			day = day > 9 ? day : '0' + day
			// return `${year}-${month}-${day}`;
			return `${year}`
		},
		bindDateChange: function(e) {
			this.date = e.target.value
		},
		//获取门店
		async getStore() {
			const [err, res] = await memberShopPageQuery()
			if (err) return
			this.list = res.data.list
		},
		//选择门店
		selectStore(e) {
			this.indexStore = e.target.value //取其下标
			this.storeName = this.list[this.indexStore].name
			this.storeId = this.list[this.indexStore].id
		},
		delLabel(e) {
			this.labelList.splice(e, 1)
		},
		select(e) {
			this.weekType = e

			if (this.carId == '') {
			} else {
				if (e == 1) {
					this.price = this.weekWithin
				} else {
					this.price = this.weekExternal
				}
			}
		},
		//详情
		async searchCarid(e) {
			console.log(e)
			const [err, res] = await searchCarid(e)
			if (err) true
			console.log(res)

			this.brand = res.data.brandName
			this.classes = res.data.categoryName
			this.displacement = res.data.outputVolumeName

			this.brandId = res.data.brandId
			this.classesId = res.data.categoryId
			this.displacementId = res.data.outputVolumeId

			this.stall = res.data.gears
			this.seat = res.data.capacity
			this.vehicleModel = res.data.name
			this.model = res.data.model

			this.labelList = JSON.parse(res.data.labels)
			this.cartypeImg = JSON.parse(res.data.vehicleModelFiles)
			this.actualImg = JSON.parse(res.data.realPicturesFiles)
			this.rentalMoney = res.data.rentalMoney
			this.protectionMoney = res.data.protectionMoney
			this.breakRulesMoney = res.data.breakRulesMoney
			this.weekExternal = res.data.weekExternal
			this.weekWithin = res.data.weekWithin
			this.price = res.data.weekWithin

			for (let i = 0; i < this.doorList.length; i++) {
				if (this.doorList[i].name == res.data.doorsCount) {
					this.doorIndex = i
				}
			}

			for (let q = 0; q < this.speedList.length; q++) {
				if (this.speedList[q].name == res.data.gearboxType) {
					this.speedIndex = q
				}
			}

			for (let w = 0; w < this.powerList.length; w++) {
				if (this.powerList[w].name == res.data.powerType) {
					this.powerIndex = w
				}
			}

			for (let r = 0; r < this.fuelList.length; r++) {
				if (this.fuelList[r].name == res.data.fuelType) {
					this.fuelIndex = r
				}
			}
		},
		//品牌
		async getBrand() {
			const [err, res] = await vehicleBrandQueryAll()
			if (err) return
			console.log(res)
			this.brandList = res.data
		},
		//类别
		async getType() {
			const [err, res] = await vehicleCategoryQueryAll()
			if (err) return
			console.log(res)
			this.classesList = res.data
		},
		//排量
		async outputVolume() {
			const [err, res] = await outputVolume()
			if (err) return
			console.log(res)
			this.displacementList = res.data
		},
		//上传图片
		getImg(e) {
			uni.chooseImage({
				count: 9,
				sizeType: ['original', 'compressed'],
				sourceType: ['camera', 'album'], //camera 拍照 album 相册
				success: async res => {
					console.log(res)
					const [err, rese] = await uploadFiles(res.tempFilePaths)
					if (err) return
					console.log(rese)
					if (e == 1) {
						console.log('pppp=====')
						for (let i = 0; i < rese.length; i++) {
							console.log(rese[i])
							this.cartypeImg.push(rese[i])
						}
					} else {
						for (let i = 0; i < rese.length; i++) {
							this.actualImg.push(rese[i])
						}
					}
				}
			})
		},
		//e是类型 q是角标
		del(e, q) {
			if (e == 1) {
				this.cartypeImg.splice(q, 1)
			} else {
				this.actualImg.splice(q, 1)
			}
		},
		reduce(e) {
			if (this.weekType == 1) {
				if (this.weekExternal > 1) {
					if (e == 1) {
						this.weekExternal--
					} else {
						this.weekExternal = parseFloat(this.weekExternal) - parseFloat(this.weekExternal) * 0.1
					}
				}
				this.weekExternal = parseFloat(this.weekExternal).toFixed(2)
			} else {
				if (this.weekWithin > 1) {
					if (e == 1) {
						this.weekWithin--
					} else {
						this.weekWithin = parseFloat(this.weekWithin) - parseFloat(this.weekWithin) * 0.1
					}
				}
				this.weekWithin = parseFloat(this.weekWithin).toFixed(2)
			}
		},
		add(e) {
			if (this.weekType == 2) {
				if (this.weekWithin > 0) {
					this.weekWithin = parseFloat(this.weekWithin)
					if (e == 1) {
						this.weekWithin++
					} else {
						this.weekWithin = this.weekWithin + this.weekWithin * 0.1
					}
				}
				this.weekWithin = this.weekWithin.toFixed(2)
			} else {
				if (this.weekExternal > 0) {
					this.weekExternal = parseFloat(this.weekExternal)
					if (e == 1) {
						this.weekExternal++
					} else {
						this.weekExternal = this.weekExternal + this.weekExternal * 0.1
					}
				}
				this.weekExternal = this.weekExternal.toFixed(2)
			}
		},
		// 打开选择
		openSelBox(selName) {
			this.closeAllSelBox()
			this[`${selName}Key`] = true
		},
		// 关闭选择
		closeSelBox(selName) {
			this[`${selName}Key`] = false
		},
		// 关闭所有
		closeAllSelBox(selName) {
			this.brandKey = false
			this.classesKey = false
		},
		// 选择品牌
		checkBrand(index) {
			this.brand = this.brandList[index].name
			this.closeSelBox('brand')
			this.brandId = this.brandList[index].id
		},
		// 选择类别
		checkClasses(index) {
			this.classes = this.classesList[index].name
			this.closeSelBox('classes')
			this.classesId = this.classesList[index].id
		},
		// 选择排档
		checkStall(index) {
			this.stall = this.stallList[index].text
			this.closeSelBox('stall')
		},
		// 选择座位
		checkSeat(index) {
			this.seat = this.seatList[index].text
			this.closeSelBox('seat')
		},
		// 选择排量
		checkDisplacement(index) {
			this.displacement = this.displacementList[index].name
			this.displacementId = this.displacementList[index].id
			this.closeSelBox('displacement')
		},
		//选择门数
		changedoor(e) {
			console.log(e)
			this.doorIndex = e.detail.value
		},
		//选择变速箱类型
		changespeed(e) {
			this.speedIndex = e.detail.value
		},

		//选择动力类型
		changepower(e) {
			this.powerIndex = e.detail.value
		},

		//选择燃油类型
		changefuel(e) {
			this.fuelIndex = e.detail.value
		},

		// 添加标签弹窗关
		close(e) {
			if (e == 1) {
				this.labelList.push(this.labelText)
				console.log(this.labelList)
			}
			this.$refs.popup.close()
		},
		// 添加标签弹窗开
		addlabel() {
			this.$refs.popup.open()
			this.labelText = ''
		},

		async sure(e) {
			if (this.brandId == '') {
				this.$toast('请选择品牌')
				return false
			} else if (this.classesId == '') {
				this.$toast('请选择类别')
				return false
			} else if (this.vehicleModel == '') {
				this.$toast('请填写车型')
				return false
			} else if (this.stall == '') {
				this.$toast('请选择排挡')
				return false
			} else if (this.seat == '') {
				this.$toast('请选择座位数')
				return false
			} else if (this.displacementId == '') {
				this.$toast('请选择排量')
				return false
			} else if (this.model == '') {
				this.$toast('请填写燃油型号')
				return false
			} else if (this.cartypeImg == '') {
				this.$toast('请上传车型图片')
				return false
			} else if (this.actualImg == '') {
				this.$toast('请上传实拍图片')
				return false
			} else if (this.rentalMoney == '') {
				this.$toast('请填写租车押金')
				return false
			} else if (this.protectionMoney == '') {
				this.$toast('请填写基本保障费')
				return false
			} else if (this.breakRulesMoney == '') {
				this.$toast('请填写违章押金')
				return false
			} else if (this.weekExternal == '') {
				this.$toast('请填写周末价格')
				return false
			} else if (this.weekWithin == '') {
				this.$toast('请填周内价格')
				return false
			}
			if (e == 1) {
				var data = {
					brandId: this.brandId,
					categoryId: this.classesId,
					name: this.vehicleModel,
					gears: this.stall,
					capacity: this.seat,
					outputVolumeId: this.displacementId,
					model: this.model,
					labels: JSON.stringify(this.labelList),
					vehicleModelFiles: JSON.stringify(this.cartypeImg),
					realPicturesFiles: JSON.stringify(this.actualImg),
					rentalMoney: this.rentalMoney,
					protectionMoney: this.protectionMoney,
					breakRulesMoney: this.breakRulesMoney,
					weekExternal: this.weekExternal,
					weekWithin: this.weekWithin,
					memberShopId: this.storeId,
					vehicleYear: this.date,
					doorsCount: this.doorList[this.doorIndex].name,
					gearboxType: this.speedList[this.speedIndex].name,
					powerType: this.powerList[this.powerIndex].name,
					fuelType: this.fuelList[this.fuelIndex].name,
					isLimited: this.isLimited
				}
				const [err, res] = await insertVehicleModel(data)
				if (err) return
				console.log(res)
				uni.navigateBack({
					delta: 1
				})
			} else {
				var data = {
					id: this.carId,
					brandId: this.brandId,
					categoryId: this.classesId,
					name: this.vehicleModel,
					gears: this.stall,
					capacity: this.seat,
					outputVolumeId: this.displacementId,
					model: this.model,
					labels: JSON.stringify(this.labelList),
					vehicleModelFiles: JSON.stringify(this.cartypeImg),
					realPicturesFiles: JSON.stringify(this.actualImg),
					rentalMoney: this.rentalMoney,
					protectionMoney: this.protectionMoney,
					breakRulesMoney: this.breakRulesMoney,
					weekExternal: this.weekExternal,
					weekWithin: this.weekWithin,
					memberShopId: this.storeId,
					vehicleYear: this.date,
					doorsCount: this.doorList[this.doorIndex].name,
					gearboxType: this.speedList[this.speedIndex].name,
					powerType: this.powerList[this.powerIndex].name,
					fuelType: this.fuelList[this.fuelIndex].name,
					isLimited: this.isLimited
				}
				const [err, res] = await vehicleModelUpdate(data)
				if (err) return
				console.log(res)
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/static/scss/_mixin.scss';

.add {
	.header {
		@include box(100%, 140rpx, #eff0f3);
		@include flex-row();
		padding: 0 40rpx;
		@include flex-row();
		@include font-set(32rpx, #000, 700);

		.label {
			@include box(8rpx, 24rpx, #5a7eff);
			border-radius: 20rpx;
			margin-right: 20rpx;
		}
	}

	.vehicle-information,
	.costs-set {
		background-color: #fff;
		padding: 40rpx 0;

		.item {
			@include box(100%, 74rpx);
			@include flex-row(space-between);
			padding: 0 32rpx;

			& ~ .item {
				margin-top: 40rpx;
			}

			.caption {
				@include font-set(28rpx, #000, 700);
			}

			.info {
				@include box(520rpx, 74rpx, #eff0f3);
				@include font-set(24rpx, #999);
				@include flex-row(space-between);
				border-radius: 10rpx;
				padding: 0 20rpx;

				.icon {
					@include box(32rpx, 16rpx);
				}
			}

			.placeholder-class {
				@include font-set(24rpx, #999);
			}

			.label-box {
				@include box-w(520rpx);
				@include flex-wrap;
				padding-bottom: 20rpx;

				.label {
					background-color: #eff0f3;
					padding: 20rpx 36rpx;
					@include font-set(24rpx, #000000);
					border-radius: 10rpx;
					margin-top: 20rpx;

					& ~ .label {
						margin-left: 20rpx;
					}

					&.add {
						padding: 16rpx 32rpx;
						background-color: #fff;
						border: 1px solid #5a7eff;
						color: #5a7eff;
					}
				}
			}

			.box {
				@include box(520rpx, 500rpx, #eff0f3);
				padding: 39rpx;
				border: 1px solid #ddd;
				border-top: 0;
				overflow-y: auto;

				.drop-item {
					@include box(100%, 76rpx);
					@include flex-row();
					@include font-set(24rpx, #000000, 100);
				}
			}
		}

		.picture-group {
			background-color: #fff;
			padding: 40rpx 0 0;

			.color-bar {
				@include box(100%, 20rpx, #eff0f3);
			}

			.caption {
				@include font-set(28rpx, #000, 700);
				padding: 40rpx 40rpx 0;
			}

			.picture-box {
				margin-top: 10rpx;
				padding: 0 40rpx;
				@include box-w();
				@include flex-wrap;

				.image-card {
					position: relative;
					@include square(160rpx);
					border-radius: 10rpx;
					margin-top: 20rpx;

					&:not(:nth-of-type(4n + 1)) {
						margin-left: 10rpx;
					}

					&.add {
						background-color: #eff0f3;
						@include flex-center;

						.picture {
							@include square(60rpx);
						}
					}

					.picture {
						@include square();
						border-radius: 10rpx;
					}

					.delete {
						position: absolute;
						right: -8rpx;
						top: -18rpx;
						z-index: 9;
						@include circle(36rpx);
					}
				}
			}
		}
	}

	.set-up-the-rent {
		.tab-header {
			@include box-w();
			@include flex-row();

			.tab {
				padding: 0 32rpx;
				@include font-set(28rpx, #000, 700);
				margin-top: 40rpx;

				&.ac {
					color: #5a7eff;
				}
			}
		}

		.input-box {
			@include box-w();
			@include flex-row(space-between);
			padding: 0 32rpx;
			margin-top: 40rpx;

			.square {
				@include square(74rpx);
				border: 1px solid #000;
				border-radius: 12rpx;
				@include flex-center;
				@include font-set(24rpx, #000, 100);
			}

			.input {
				@include box(230rpx, 74rpx, #eff0f3);
				@include flex-center;
				@include font-set(24rpx, #5a7eff, 500);
				border-radius: 10rpx;
				text-align: center;
			}
		}

		.btn {
			@include box(670rpx, 96rpx, #5a7eff);
			@include flex-center;
			@include font-set(32rpx, #fff, 700);
			border-radius: 52rpx;
			letter-spacing: 20rpx;
			margin: 60rpx auto;
		}
	}
}

.flexBoxContent {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 30rpx;
	width: 90%;
	margin: auto;
	margin-bottom: 30rpx;
}

.title {
	color: black;
	font-size: 28rpx;
	width: 25%;
	font-weight: 700;
}

.selectBox {
	background-color: #eff0f3;
	width: 75%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 10rpx;
	color: #999999;
	font-size: 24rpx;
}

.pickerBox {
	background-color: #eff0f3;
	color: #999999;
	font-size: 24rpx;
	height: 74rpx;
	border-radius: 10rpx;
	width: 520rpx;
}

.pickerText {
	height: 74rpx;
	line-height: 74rpx;
	padding-left: 20rpx;
	color: #999999;
	width: 520rpx;
	background-color: #eff0f3;
	border-radius: 10rpx;
}
</style>
