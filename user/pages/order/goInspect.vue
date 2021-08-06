<template>
	<view class="go-inspect">
		<view class="box">
			<view class="flexBox" style="padding: 30rpx 0rpx;">
				<view class="buleLine"></view>
				<view class="blackText" style="width: 15%;margin-left: 2%;">车牌号</view>
				<view class="blackText" style="color: #5A7EFF;">{{carNumber}}</view>
			</view>
		</view>
		<view class="flexBox">
			<view style="width: 50%;" class="flexBox">
				<image style="width: 40rpx;height: 40rpx;" :src="`${ossUrl}/common/km.png`" mode="aspectFill"></image>
				<view style="color: #5A7EFF;margin-left: 10rpx;">当前里程</view>
			</view>
			<view style="width: 50%;" class="flexBox">
				<image style="width: 40rpx;height: 40rpx;" :src="`${ossUrl}/common/you.png`" mode="aspectFill"></image>
				<view style="color: #5A7EFF;margin-left: 10rpx;">当前油量</view>
			</view>
		</view>
		<!-- 数值 -->
		<view class="flexBox">
			<view class="flexBox" style="width: 50%;">
				<view style="font-size: 50rpx;font-weight: bold;">{{mileage}}</view>
				<view style="margin: 10rpx 0rpx 0rpx 10rpx;">km ></view>
			</view>
			<view class="flexBox" style="width: 50%;">
				<view style="font-size: 50rpx;font-weight: bold;">{{oil}}</view>
				<view style="margin: 10rpx 0rpx 0rpx 10rpx;"> /10 ></view>
			</view>
		</view>
		<!-- 各项信息详情 -->
		<view v-for="(item, index) in goodsList" :key="index">
			<view class="grayLine"></view>
			<view class="flexBox" style="padding: 10rpx 0rpx 30rpx 0rpx;">
				<view class="blackText" style="width: 79%;">{{item.name}}</view>
				<view v-if="item.condition" class="ok">确认完好</view>
			</view>
			<view>
				<view class="line"></view>
				<view class="flexBox" v-for="(inner, sub) in item.children" :key='sub'>
					<view class="blackText">{{inner.name}}<text class="garyText">({{inner.description}})</text> </view>
					<view style="display: flex;align-items: center;width: 29%;">
						<view :class="['selectOk', {'statusOk': inner.condition===0}]">完好</view>
						<view v-if="!inner.condition" class="selectNo">损坏</view>
						<view v-if="inner.condition && inner.condition===1" class="lookImg"
							@click="previewPics([inner.image])">查看图片</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grayLine"></view>
		<view style="width: 90%;margin: auto;margin-top: 40rpx;" v-for="(item, index) in remarksList" :key="index">
			<view class="blackText" style="width: 10%;">备注</view>
			<view class="garyText">{{item.remarks}}</view>
			<view class="img-box" v-for="(inner, sub) in JSON.parse(item.image)" :key="sub"
				@click="previewPics(JSON.parse(item.image), sub)">
				<image style="width:160rpx;height:160rpx;" :src="inner" mode="aspectFill"></image>
			</view>
		</view>
		<view v-if="mode==='edit'" class="flexBox">
			<view class="blackText" style="width: 20%;">添加备注</view>
		</view>
		<textarea v-if="mode==='edit'" value="" placeholder="请输入备注信息"
			style="padding: 20rpx;width:85%;margin: auto;background-color: #EFF0F3;height:220rpx;border-radius: 20rpx;margin-top: 30rpx;"
			v-model="remarks" />
		<view v-if="mode==='edit'"
			style="width: 92%;margin: auto;padding-bottom: 20rpx;border-bottom: 2rpx solid #EFF0F3;">
			<view style="display: inline-block;width: 21%;margin: 20rpx 2%;position: relative;"
				v-for="(item, index) in imgList" :key="index">
				<view>
					<image style="width:160rpx;height:160rpx;" :src="item" mode="aspectFill"></image>
					<image style="width:36rpx;height:36rpx;position: absolute;top:-10rpx;right: -25rpx;"
						:src="`${ossUrl}/common/lancha.png`" mode="aspectFill" @click="removePic(index)"></image>
				</view>
			</view>
			<view v-if="imgList.length<3" style="display: inline-block;width: 21%;margin: 20rpx 2%;position: relative;"
				@click="choosePics">
				<view>
					<image style="width:160rpx;height:160rpx;" :src="`${ossUrl}/common/guanxi.png`" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<button v-if="mode==='edit'" style=" color: white;
			width: 80%;
					margin: 20rpx auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;" type="default" @click="vehicleAddRemarks">完成</button>
	</view>
</template>

<script>
	import {
		vehicleVehiclePreview,
		vehicleAddRemarks
	} from '@/apis/vehicle'
	import {
		uploadFiles
	} from '@/apis/oss'
	import {
		throttle
	} from '@/utils/tools'
	import {
		previewImgs,
		chooseImgs
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				mode: '', // 模式 edit:编辑模式 readonly:只读模式
				from: '', // order  orderDetail
				orderId: '', // 订单id
				vehicleId: '', // 车型id
				carNumber: '', // 车牌号
				goodsList: [], // 车辆物件
				mileage: '', // 当前里程
				oil: '', // 当前油量
				remarks: '', // 备注
				remarksList: [], // 车辆检验备注
				imgList: [], // 图片列表
			}
		},
		onLoad(e) {
			if (e && e.orderId) this.orderId = e.orderId
			if (e && e.vehicleId) this.vehicleId = e.vehicleId
			if (e && e.mode) this.mode = e.mode
			if (e && e.from) this.from = e.from
			this.vehicleVehiclePreview()
		},
		methods: {
			// 获取信息
			async vehicleVehiclePreview() {
				const [err, res] = await vehicleVehiclePreview(this.vehicleId, this.orderId)
				if (err) return
				this.carNumber = res.data.carNumber
				this.goodsList = res.data.goodsList
				this.mileage = res.data.mileage
				this.oil = res.data.oil
				this.remarksList = res.data.remarksList
			},
			// 预览图片
			previewPics(urls, index = 0) {
				previewImgs(urls, index)
			},
			// 选择图片
			async choosePics() {
				const [err, res] = await chooseImgs(3 - this.imgList.length)
				if (err) return
				const [uploadErr, uploadRes] = await uploadFiles(res)
				if (uploadErr) return
				this.imgList = [...this.imgList, ...uploadRes]
			},
			// 删除图片
			removePic(index) {
				this.imgList.splice(index, 1)
			},
			// 添加备注
			vehicleAddRemarks: throttle(async function() {
				const params = {
					image: JSON.stringify(this.imgList),
					vehicleId: this.vehicleId,
					orderId: this.orderId,
					remarks: this.remarks,
					type: 0
				}
				const [err, res] = await vehicleAddRemarks(params)
				if (err) return
				this.$toast('操作成功')
				setTimeout(() => {
					this.$open('/pages/common/contract', {
						mode: 'edit',
						from: this.from,
						vehicleId: this.vehicleId,
						orderId: this.orderId
					})
				}, 500)
			}),
			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
				if (e.detail.value < 1) {
					this.sliderColor = '#FC3736'
				} else {
					this.sliderColor = '#5A7EFF'

				}
			}
		}
	}
</script>

<style lang="scss">
	.go-inspect {
		padding-bottom: 50rpx;
	}

	.box {
		width: 100%;
		background-color: #EFF0F3;
	}

	.flexBox {
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		margin-top: 30rpx;
	}

	.buleLine {
		background-color: #5A7EFF;
		width: 8rpx;
		height: 24rpx;
	}

	.title {
		width: 90%;
		margin: auto;
		font-size: 28rpx;
		color: #000000;
		padding-top: 30rpx;
	}

	.blackText {
		font-size: 28rpx;
		color: #000000;
		width: 71%;
	}

	.garyText {
		font-size: 20rpx;
		color: #999999;
		margin-top: 10rpx;
	}

	.grayLine {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 30rpx;
	}

	.ok {
		color: #999999;
		border: 2rpx solid #999999;
		border-radius: 10rpx;
		font-size: 20rpx;
		padding: 6rpx;

	}

	.line {
		height: 2rpx;
		width: 100%;
		background-color: #EFF0F3;
		width: 90%;
		margin: auto;
	}

	.selectOk {
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
		padding: 5rpx 10rpx;
		border: 2rpx solid #999999;
		color: #999999;
		font-size: 20rpx;
	}

	.statusOk {
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
		padding: 5rpx 10rpx;
		color: white;
		background-color: #5A7EFF;
		font-size: 20rpx;
	}

	.selectNo {
		border-top-right-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		padding: 5rpx 10rpx;
		border: 2rpx solid #999999;
		color: #999999;
		margin-left: 5%;
		font-size: 20rpx;
	}

	.lookImg {
		color: #5A7EFF;
		font-size: 22rpx;
		margin-left: 3%;
		font-size: 20rpx;
	}

	.Mask {
		position: fixed;
		background-color: #000000;
		opacity: 0.6;
		height: 100vh;
		width: 100%;
		top: 0px;
	}

	.box1 {
		width: 80%;
		position: absolute;
		padding: 20rpx 40rpx;
		background-color: white;
		top: 0px;
		left: 10%;
	}

	.lanbox {
		border: 2rpx solid #5A7EFF;
		font-size: 24rpx;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		color: #5A7EFF;
	}

	.lanbox1 {
		font-size: 24rpx;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		color: white;
		background-color: #5A7EFF;
	}

	.img-box {
		display: inline-block;
		margin: 20rpx 0;
		position: relative;

		&~.img-box {
			margin-left: 20rpx;
		}
	}
</style>
