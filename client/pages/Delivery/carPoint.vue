<template>
	<view class="">
		<view class="topNav" v-if="search==false">
			<view class="add" @click="add">新增+</view>
			<view class="title" @click="select">筛选</view>
			<image style="height:25rpx;width: 35rpx;margin-right: 30rpx;" @click="select"
				:src="$util.fileUrl('/xiangxia.png')" mode="aspectFill">
			</image>
			<view class="title" @click="showSearch">搜索</view>
			<image style="height: 28rpx;width: 28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode="aspectFill"
				@click="showSearch"></image>
		</view>

		<!-- 搜索 -->
		<view class="topNav" style="color: #8E8E93;font-size: 30rpx" v-if="search==true">
			<input type="text" placeholder="请输入送车点" v-model="searchVal"
				style="background-color:#EFF0F3;height: 70rpx;width: 580rpx;border-radius: 50rpx;padding-left: 28rpx;padding-right: 28rpx;"
				@input="setSearch" />
			<view style="margin-left: 20rpx;" @click="showSearch">取消</view>
		</view>

		<!-- 弹框 -->
		<view class="Mask" v-if="selectShow==true"></view>
		<view class="popBox" v-if="selectShow==true">
			<view class="topNav" style="margin-bottom: 0rpx;">
				<view class="add">新增+</view>
				<view class="title" @click="select">筛选</view>
				<image style="height:25rpx;width: 35rpx;margin-right: 30rpx;" @click="select"
					:src="$util.fileUrl('/xiangxia.png')" mode="aspectFill"></image>
				<view class="title">搜索</view>
				<image style="height: 28rpx;width: 28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode="aspectFill"></image>
			</view>

			<view class="popTitle">
				<view class="title" style="width: 20%;text-align: center;margin-right: 0rpx;">城市</view>
				<view class="bankLine" style="margin-left: 0rpx;"></view>
				<view class="title" style="padding-left: 20rpx;">区域</view>
			</view>
			<view class="place">
				<view class="leftBox">
					<view class="" v-for="(item,index) in cityList" :key="index" class="leftItem"
						@click="selectCity(index)">
						<view style="color:#5A7EFF" v-if="item.status==true">{{item.name}}</view>
						<view style="color: black;" v-else>{{item.name}}</view>
					</view>
				</view>
				<view class="rightBox">
					<view class="" v-for="(item,index) in areaList" :key="index" class="rightItem"
						@click="selectArea(index)">
						<view style="color:#5A7EFF" v-if="item.status==true">{{item.name}}</view>
						<view style="color: black;" v-else>{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="buttonBox">
				<view class="empty" @click="clear()">清空</view>
				<view class="sure" @click="sure()">确定</view>
			</view>
		</view>

		<!-- 列表 -->
		<view v-for="(item,index) in list" class="listBox" @click="lookinfo(item)">
			<view class="place">
				<view class="title">{{item.areaName}}</view>
				<view class="bankLine"></view>
				<view class="title">{{item.name}}</view>
			</view>
			<view style="color: #B2B2B2;font-size: 24rpx;margin-top: 10rpx;">{{item.address}}</view>
		</view>



	</view>
</template>

<script>
	import {
		deliveryPageQuery
	} from '@/apis/delivery'
	import {
		debounce
	} from '@/utils/tools';

	import {
		allFindCityList,
		allFindProvincesList,
		allFindAreasList
	} from '@/apis/regionProvince';

	export default {
		data() {
			return {
				selectShow: false,
				search: false,
				cityList: [],
				areaList: [],
				list: [],
				page: 1,
				size: 10,
				cityId: '', //城市id
				areaId: '', //区域id
				searchVal: '', //输入内容
			}
		},
		onLoad() {
	
		},
		onShow() {
			this.deliveryPageQuery()
			this.allFindCityList()
		},
		methods: {
			//市
			async allFindCityList(e, q) {

				const [err, res] = await allFindCityList()
				if (err || res.code !== 200) return
				console.log(res.data)
				this.cityList = res.data
				for (let i = 0; i < this.cityList.length; i++) {
					this.cityList[i].status = false
				}
				this.cityList[0].status = true
				this.allFindAreasList(this.cityList[0].code)
				this.cityId = this.cityList[0].code
			},
			//区
			async allFindAreasList(e) {

				let data = {
					name: "",
					cityCodes: e
				}
				const [err, res] = await allFindAreasList(data)
				if (err || res.code !== 200) return
				console.log(res.data)
				this.areaList = res.data
				for (let i = 0; i < this.areaList.length; i++) {
					this.areaList[i].status = false
				}
				this.areaList[0].status = true
				this.areaId = this.areaList[0].areaCode
			},
			//获取列表
			async deliveryPageQuery() {
				let data = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await deliveryPageQuery(data)
				if (err) return
				console.log(res)
				this.list = res.data.list
			},
			//筛选
			select() {
				if (this.selectShow) {

					this.selectShow = false
				} else {
					this.selectShow = true
				}
			},
			//搜索
			showSearch() {

				if (this.search) {
					this.search = false

				} else {
					this.search = true
					this.showStuse = false
				}
			},

			setSearch: debounce(async function() {
				let data = {
					page: this.page,
					size: this.size,
					search: this.searchVal
				}
				const [err, res] = await deliveryPageQuery(data)
				if (err) return
				console.log(res)
				this.list = res.data.list

			}),
			add() {
				uni.navigateTo({
					url: './addPoint',
					animationType: 'pop-in',
					animationDuration: 200,
				})
			},
			lookinfo(e) {
				uni.navigateTo({
					url: './pointInfo?obj=' + JSON.stringify(e),
					animationType: 'pop-in',
					animationDuration: 200,
				})
			},
			selectCity(e) {
				console.log('pp')
				for (let i = 0; i < this.cityList.length; i++) {
					this.cityList[i].status = false
				}
				this.cityList[e].status = true
				this.allFindAreasList(this.cityList[e].code)
				this.cityId = this.cityList[e].code

				this.$forceUpdate()
			},
			selectArea(e) {
				for (let i = 0; i < this.areaList.length; i++) {
					this.areaList[i].status = false
				}
				this.areaList[e].status = true
				this.areaId = this.areaList[e].areaCode
				this.$forceUpdate()
			},
			clear() {
				for (let i = 0; i < this.areaList.length; i++) {
					this.areaList[i].status = false
				}
				for (let i = 0; i < this.cityList.length; i++) {
					this.cityList[i].status = false
				}
				this.areaList[0].status = true
				this.cityList[0].status = true
				this.areaId = ""
				this.cityId = ""
			},
			async sure() {
				let data = {
					page: this.page,
					size: this.size,
					areaCode: this.areaId,
					cityCode: this.cityId
				}
				const [err, res] = await deliveryPageQuery(data)
				if (err) return
				console.log(res)
				this.list = res.data.list
				if (this.list.length == 0) {
					this.$toast("暂无数据")
				}
				this.select()
			}
		}
	}
</script>

<style>
	.topNav {
		display: flex;
		align-items: center;
		width: 90%;
		margin-left: 5%;
		margin-bottom: 30rpx;
	}

	.place {
		display: flex;
		align-items: center;
	}

	.add {
		color: #5A7EFF;
		border: 2rpx solid #5A7EFF;
		height: 48rpx;
		width: 172rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 48rpx;
		font-size: 24rpx;
		margin-right: 40%;
	}

	.title {
		color: #000000;
		font-size: 28rpx;
		margin-right: 10rpx;

	}

	.bankLine {
		margin: 0rpx 15rpx;
		height: 25rpx;
		width: 2rpx;
		background-color: #000000;
	}

	.listBox {
		width: 90%;
		margin: auto;
		padding: 30rpx 0rpx;
		border-bottom: 2rpx solid #EFF0F3;
	}

	.Mask {
		position: fixed;
		background-color: #000000;
		opacity: 0.6;
		height: 100vh;
		width: 100%;
		top: 0px;
	}

	.empty {
		color: #B2B2B2;
		border: 2rpx solid #B2B2B2;
		padding: 26rpx 118rpx;
		font-size: 32rpx;
		border-radius: 50rpx;
		margin-right: 20rpx;
	}

	.sure {
		color: white;
		padding: 26rpx 118rpx;
		font-size: 32rpx;
		background-color: #5A7EFF;
		border-radius: 50rpx;
		margin-left: 20rpx;
	}

	.buttonBox {
		justify-content: center;
		border-top: 2rpx solid #EFF0F3;
		padding: 20rpx 0rpx;
		display: flex;
		align-items: center;
	}



	.popBox {
		position: fixed;
		top: 0rpx;
		width: 100%;
		background-color: white;
	}

	.popTitle {
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #EFF0F3;
		height: 140rpx;
	}

	.leftBox {
		width: 20%;
		text-align: center;
		height: 540rpx;
		overflow-y: scroll;
		border-right: 2rpx solid #EFF0F3;
	}

	.leftItem {
		height: 90rpx;
		width: 100%;
		line-height: 90rpx;
		color: #000000;
		font-size: 26rpx;
		border-right: 2rpx solid #5A7EFF;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rightBox {
		width: 79%;
		text-align: center;
		height: 600rpx;
		overflow-y: scroll;
	}

	.rightItem {
		height: 90rpx;
		width: 100%;
		line-height: 90rpx;
		color: #000000;
		font-size: 26rpx;
		border-bottom: 2rpx solid #EFF0F3;
	}
</style>
