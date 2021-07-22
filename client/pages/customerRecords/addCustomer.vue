<template>
	<view>
		<view class="box">
			
	<view class="flexBoxContent" v-show="roles[0].id==1">
		<view class="title">门店</view>
		<view class="selectBox" @click="">
			<view style="width: 85%;">
				<picker @change="selectStore" :value="indexStore" :range="list" :range-key="'name'"
						class="pickerBox">
						<label  class="pickerText">{{storeName!=''?storeName:'请选择'}}</label>
					</picker>
			</view>
			<view style="width:10%;">
				<image style="width:40rpx;height: 20rpx;transform: rotate(-90deg);"
					:src="`${filePath}/vehicleManage/down-mini.png`"></image>
			</view>
		</view>
	</view>
			
			<view class="flexBox">
				<view class="title">客户名称</view>
				<view class="item">
					<input class="inpBox" type="text" v-model="name" placeholder="请输入客户名称" />
				</view>
			</view>
			<view class="flexBox">
				<view class="title">客户身份证</view>
				<view class="item">
					<input class="inpBox" type="text" v-model="idCard" placeholder="请输入客户身份证" />
				</view>
			</view>
			<view class="flexBox">
				<view class="title">客户手机号</view>
				<view class="item">
					<input class="inpBox" type="text" v-model="phone" placeholder="请输入客户手机号" />
				</view>
			</view>
			<view class="flexBoxContent">
				<view class="title">选择车辆</view>
				<view class="selectBox" @click="$open('/pages/customerRecords/selectCart')">
					<view style="width: 85%;">
						<view class="pickerBox">
							<label v-if="true" class="pickerText">{{cartName || '请选择车辆'}}</label>
							<label v-else class="pickerText"></label>
						</view>
					</view>
					<view style="width:10%;">
						<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')"></image>
					</view>
				</view>
			</view>
			<view class="flexBox">
				<view class="title">租期</view>
				<view class="timeBox" @click="goTime">{{takeCarTime || '取车时间'}}</view>
				<view class="timeBox" style="margin-left: 30rpx;" @click="goTime">{{carAlsoTime || '还车时间'}}</view>
			</view>
			<view class="flexBox">
				<view class="title">金额</view>
				<view class="item">
					<input class="inpBox" type="number" v-model="price" placeholder="请填写金额" />
				</view>
			</view>
			<view style="display: flex;margin-top: 30rpx;">
				<view class="title">备注</view>
				<view class="item">
					<textarea
						style="padding: 20rpx;background-color:#EFF0F3;height:144rpx;width: 100%;border-radius: 10rpx;"
						type="text" v-model="remark" placeholder="请填写备注" />
				</view>
			</view>
			<view class="flexBox" style="margin-top: 40rpx;">
				<view class="title">备注图片</view>
				<view class="pic-box" v-for="(item, index) in picBox" :key="index">
					<image class="pic" :src="item" @click="previewPic(index)" mode="aspectFill"></image>
					<image class="delete" :src="$util.fileUrl('/lancha.png')" @click="deletePic(index)"></image>
				</view>
				<view v-if="picBox.length<3" class="pic-box">
					<image class="pic" :src="$util.fileUrl('/guanxi.png')" @click="chooseImgs"></image>
				</view>
			</view>
		</view>
		<view class="btn" type="default" @click="recordsAdd()">完成</view>
	</view>
</template>

<script>
	import {
		recordsAdd
	} from '@/apis/customer'
	import {
		uploadFiles
	} from '@/apis/oss'
	import {
		chooseImgs,
		previewImgs
	} from '@/utils/uni-tools'
	import {
		throttle
	} from '@/utils/tools'
	import {
		mapState
	} from 'vuex'
	import validator from 'crazy-validator'
import{memberShopPageQuery} from '../../apis/memberShop'
	import config from '@/common/js/config'
	export default {
		data() {
			return {
				name: '', // 名称
				idCard: '', // 身份证
				phone: '', // 手机号
				price: '', // 金额
				remark: '', // 备注
				takeCarTime: '', // 取车时间
				carAlsoTime: '', // 还车时间
				cartId: '', // 选中车辆id
				cartName: '', // 选中车辆名称
				picBox: [], // 图片
				list:[],//门店列表
				storeName:'',//门店值
				indexStore:'',//门店角标
				storeId:'',//门店id
				filePath: config.filePath,
				
			}
		},
		computed: {
			//  user模式 门店id
			...mapState('user', ['shopId','roles'])
			
			
		},
		onLoad() {
			this.eventListener()
				this.getStore()
			console.log(this.roles)
		},
		methods: {
			
			//获取门店
			async getStore(){
			  const [err,res] = await memberShopPageQuery()
			  if (err) return
			  this.list =res.data.list
			},
			//选择门店
			selectStore(e){
				this.indexStore = e.target.value //取其下标
				this.storeName=this.list[this.indexStore].name
				this.storeId=this.list[this.indexStore].id
			},
			
			// 前往选择时间
			goTime() {
				this.$open('/pages/customerRecords/leaseTimeSelection')
			},
			// 添加记录
			recordsAdd: throttle(async function() {
				const checkList = [{
					value: this.name,
					rules: [{
						type: 'required',
						msg: '请输入客户名称'
					}]
				}, {
					value: this.idCard,
					rules: [{
						type: 'required',
						msg: '请输入客户身份证'
					}, {
						type: 'identity',
						msg: '请输入正确的客户身份证'
					}]
				}, {
					value: this.phone,
					rules: [{
						type: 'required',
						msg: '请输入客户手机号'
					}, {
						type: 'phone',
						msg: '请输入正确的客户手机号'
					}]
				}, {
					value: this.cartId,
					rules: [{
						type: 'required',
						msg: '请选择车辆'
					}]
				}, {
					value: this.takeCarTime,
					rules: [{
						type: 'required',
						msg: '请选择取车时间'
					}]
				}, {
					value: this.carAlsoTime,
					rules: [{
						type: 'required',
						msg: '请选择还车时间'
					}]
				}, {
					value: this.price,
					rules: [{
						type: 'required',
						msg: '请输入金额'
					}]
				}]
				const checkRes = validator(checkList, this.$toast)
				if (checkRes.status !== 1000) return
				const params = {
					shopId: this.storeId,
					name: this.name,
					idCard: this.idCard,
					phone: this.phone,
					vehicleId: this.cartId,
					collectionTime: this.takeCarTime,
					giveBackTime: this.carAlsoTime,
					amount: this.price,
					remark: this.remark,
					remarkImages: this.picBox.join()
				}
				const [err, res] = await recordsAdd(params)
				if (err) return
				this.$toast('添加成功')
				uni.$emit('refreshEvaluation')
				setTimeout(() => {
					this.$close()
				}, 500)
			}),
			// 预览图片
			previewPic(index) {
				previewImgs(this.picBox, index)
			},
			// 删除图片
			deletePic(index) {
				this.picBox.splice(index, 1)
			},
			// 选择照片
			async chooseImgs() {
				const [err, res] = await chooseImgs(3 - this.picBox.length)
				if (err) return
				const [upErr, upRes] = await uploadFiles(res)
				if (upErr) return
				this.picBox = [...this.picBox, ...upRes]
			},
			// 监听
			eventListener() {
				// 获取租车时间
				uni.$on('getCarRentalTime', (e) => {
					this.takeCarTime = e.takeCarTime
					this.carAlsoTime = e.carAlsoTime
				})
				// 获取选中的车辆
				uni.$on('selectCart', (e) => {
					this.cartId = e.cartId
					this.cartName = e.cartName
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.box {
		width: 90%;
		margin: auto;
	}

	.flexBox {
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}

	.inpBox {
		background-color: #EFF0F3;
		width: 100%;
		border-radius: 10rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 20rpx;
	}

	.title {
		color: black;
		font-size: 28rpx;
		width: 25%;
	}

	.item {
		width: 75%;
		margin: auto;
	}

	.selectBox {
		background-color: #EFF0F3;
		width: 75%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 10rpx;
		color: #999999;
		font-size: 24rpx;
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

	.pickerText {
		height: 74rpx;
		line-height: 74rpx;
		padding-left: 20rpx;
		color: #999999;
	}

	.timeBox {
		background-color: #EFF0F3;
		width: 35%;
		border-radius: 10rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 16rpx;
	}

	.btn {
		color: white;
		width: 90%;
		margin: 10vh auto 0rpx auto;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		letter-spacing: 10rpx;
		text-align: center;
	}

	.pic-box {
		position: relative;
		width: 22%;

		&~.pic-box {
			margin-left: 28rpx;
		}

		.pic {
			width: 160rpx;
			height: 160rpx;
		}

		.delete {
			width: 36rpx;
			height: 36rpx;
			position: absolute;
			top: -10rpx;
			right: -10rpx;
		}
	}
</style>
