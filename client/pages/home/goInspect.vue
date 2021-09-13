<template>
	<view>
		<view class="box">
			<view class="flexBox" style="padding: 30rpx 0rpx;">
				<view class="buleLine"></view>
				<view class="blackText" style="width: 15%;margin-left: 2%;">车牌号</view>
				<view class="blackText" style="color: #5A7EFF;">{{info.carnum}}</view>
			</view>
		</view>
		<view class="flexBox">
			<view style="width: 50%;" class="flexBox">
				<image style="width: 40rpx;height: 40rpx;" :src="$util.fileUrl('/km.png')" mode="aspectFill"></image>
				<view style="color: #5A7EFF;margin-left: 10rpx;">当前里程</view>
			</view>
			<view style="width: 50%;" class="flexBox">
				<image style="width: 40rpx;height: 40rpx;" :src="$util.fileUrl('/you.png')" mode="aspectFill"></image>
				<view style="color: #5A7EFF;margin-left: 10rpx;">当前油量</view>
			</view>
		</view>
		<!-- 数值 -->
		<view class="flexBox">
			<view class="flexBox" style="width: 50%;" @click="setMileage">
				<view style="font-size: 50rpx;font-weight: bold;">{{mileageNum}}</view>
				<view style="margin: 10rpx 0rpx 0rpx 10rpx;">km ></view>
			</view>
			<view class="flexBox" style="width: 50%;" @click="setOil">
				<view style="font-size: 50rpx;font-weight: bold;">{{oilNum}}</view>
				<view style="margin: 10rpx 0rpx 0rpx 10rpx;">/10 ></view>
			</view>
		</view>

		<!-- 各项信息详情 -->
		<view v-for="(item,index) in goInspectInfo.goodsList" :key="index" class="">
			<view class="grayLine"></view>
			<view class="flexBox" style="padding: 10rpx 0rpx 30rpx 0rpx;">
				<view class="blackText" style="width: 79%;">{{item.name}}</view>
				<view v-if="item.condition==0" class="ok">确认完好</view>

				<view  v-else class="no" @click="okSome(index)">确认完好</view>
				
				<image style="width: 32rpx;height: 16rpx;margin-left: 10rpx;" :src="$util.fileUrl('/xiangshang.png')"
					mode="aspectFill"></image>
			</view>

			<view class="">
				<view class="line"></view>
				<view class="flexBox" v-for="(itemy,indexy) in item.children" :key='indexy'>
					<view class="blackText">{{itemy.name}}<text class="garyText">{{itemy.description}}</text> </view>
					<view v-if='itemy.condition===null' style="display: flex;align-items: center;width: 29%;">
						<view class="selectOk" @click="setGood(itemy.id,index)">完好</view>
						<view class="selectNo" @click="setBad(itemy.id)">损坏</view>
					</view>
					<view v-if="itemy.condition===0" style="display: flex;align-items: center;width: 29%;">
						<view class="statusOk" @click="setGood(itemy.id,index)">完好</view>
						<view class="selectNo" @click="setBad(itemy.id)">损坏</view>
					</view>
					<view v-if="itemy.condition===1" style="display: flex;align-items: center;width: 29%;">
						<view class="selectOk" @click="setGood(itemy.id,index)">完好</view>
						<view class="lookImg" v-if="itemy.image" @click="lookImg(itemy.image,itemy.id)">查看图片</view>
						<view class="lookImg" v-else @click="setBadImg(itemy.id)">上传图片</view>
					</view>

				</view>
			</view>
		</view>

		<view class="grayLine"></view>

		<view class="flexBox">
			<view class="blackText" style="width: 10%;">备注</view>
			<view class="garyText">请添加备注&上传车辆其他的照片</view>
		</view>
		<textarea v-model="mark" placeholder="请输入备注信息"
			style="padding: 20rpx;width: 90%;margin: auto;background-color: #EFF0F3;height:220rpx;border-radius: 20rpx;margin-top: 30rpx;" />

		<view style="width: 90%;margin: auto;padding-bottom: 20rpx;border-bottom: 2rpx solid #EFF0F3;">
			<view style="display: inline-block;width: 22%;margin: 20rpx 1%;position: relative;"
				v-for="(item,index) in imgList" :key="index">
				<image style="width:160rpx;height:160rpx;" :src="item" mode="aspectFill"></image>
				<image style="width:36rpx;height:36rpx;position: absolute;top:-10rpx;right: -10rpx;"
					:src="$util.fileUrl('/lancha.png')" @click="delImg(index)"></image>
			</view>
			<view style="display: inline-block;width: 22%;margin: 20rpx 1%;position: relative;">
				<view @click="updataImg(1)">
					<image style="width:160rpx;height:160rpx;" :src="$util.fileUrl('/guanxi.png')" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<button style=" color: white;
			width: 80%;
					margin: 20rpx auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;" type="default" @click="sure()">完成</button>

		<!-- 里程弹窗 -->
		<view class="Mask" v-if="mileage==true"></view>
		<view class="box1" v-if="mileage==true">
			<view class="blackText">当前里程数</view>
			<input type="text" v-model="mileageNum" placeholder="请输入里程数"
				style="background-color: #EFF0F3;height:74rpx;width: 100%;border-radius: 10rpx;padding-left: 20rpx;margin-top: 20rpx;" />
			<view class="flexBox" style="width: 100%;">
				<view class="lanbox" @click="mileage=false">取消</view>
				<view class="lanbox1" style="margin-left: 57%;" @click="mileage=false">确定</view>
			</view>
		</view>
		<!-- 油量弹窗 -->
		<view class="Mask" v-if="Oil==true"></view>
		<view class="box1" v-if="Oil==true">
			<view class="blackText">当前油量</view>
			<slider value="0" @change="sliderChange" backgroundColor="#EFF0F3" block-size="16"
				:activeColor="sliderColor" step="0.5" min="0" max="10" show-value />
			<view class="flexBox" style="width: 100%;">
				<view class="lanbox" @click="Oil=false">取消</view>
				<view class="lanbox1" style="margin-left: 57%;" @click="Oil=false">确定</view>
			</view>
		</view>

		<!-- 损坏图片上传-->
		<view class="Mask" v-if="imgshow==true"></view>
		<view class="box1" v-if="imgshow==true">
			<view class="blackText">请上传图片</view>
			<image style="width:80%;height:350rpx;margin-left: 10%;margin-top: 30rpx;"
				:src="$util.fileUrl('/guanxi.png')" mode="aspectFill" @click="updataImg(0)"></image>
			<view class="flexBox" style="width: 100%;">
				<view class="lanbox" @click="imgshow=false">取消</view>
				<view class="lanbox1" style="margin-left: 57%;" @click="imgshow=false">确定</view>

			</view>
		</view>

		<!--  查看损坏图片-->
		<view class="Mask" v-if="imgshow1==true"></view>
		<view class="box1" v-if="imgshow1==true">
			<view class="blackText">查看图片</view>
			<image style="width:80%;height:350rpx;margin-left: 10%;margin-top: 30rpx;" :src="badimgUrl" mode="aspectFill"></image>
			<view class="flexBox" style="width: 100%;">
				<view class="lanbox" @click="imgshow1=false">取消</view>
				<view class="lanbox1" style="margin-left: 29%;" @click="change()">修改</view>
				<view class="lanbox1" style="margin-left: 5%;" @click="upsure()">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryGoods,
		addaddRecord
	} from '@/apis/vehicleCheck'

	import {
		uploadFiles
	} from '@/apis/oss';
	export default {
		data() {
			return {
				imgList: [], //备注图片
				sliderColor: '#5A7EFF',
				mileage: false, //里程显示
				mileageNum: 0, //里程数
				Oil: false, //油量
				oilNum: 0, //油量数
				imgshow: false, //上传损坏图片
				imgshow1: false, //查看损坏图片
				badimgUrl: '', //损坏图片链接
				info: '', //传递过来的信息
				goInspectInfo: '', //出车检验信息
				mark: '', //备注
				selectId: '', //选择的id

			}
		},
		onLoad(e) {
			console.log(JSON.parse(e.obj))
			this.info = JSON.parse(e.obj)
			this.getInfo()
		},
		methods: {
			okSome(e){
				this.goInspectInfo.goodsList[e].condition=0
				for(let i=0;i<this.goInspectInfo.goodsList[e].children.length;i++){
					this.goInspectInfo.goodsList[e].children[i].condition=0
				}
			},
			async getInfo() {

				const [err, res] = await queryGoods(this.info.vehicleId, this.info.order)
				if (err) return
				console.log(res)
				this.goInspectInfo = res.data
			},
			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
				if (e.detail.value < 1) {
					this.sliderColor = '#FC3736'
				} else {
					this.sliderColor = '#5A7EFF'
				}
				this.oilNum = e.detail.value
			},
			setMileage() {
				this.mileage = true

			},
			setOil() {
				this.Oil = true
			},
			setGood(e,w) {
				for (let i = 0; i < this.goInspectInfo.goodsList.length; i++) {
					
					for (let q = 0; q < this.goInspectInfo.goodsList[i].children.length; q++) {
						if (e == this.goInspectInfo.goodsList[i].children[q].id) {
							this.goInspectInfo.goodsList[i].children[q].condition = 0
						}
					}
				}
				
			if(this.goInspectInfo.goodsList[w].children.every(item => item.condition==0)){
				this.goInspectInfo.goodsList[w].condition=0
			}else{
				this.goInspectInfo.goodsList[w].condition=1
			}


		
			},
			setBad(e) {
				console.log(e)
				for (let i = 0; i < this.goInspectInfo.goodsList.length; i++) {
					for (let q = 0; q < this.goInspectInfo.goodsList[i].children.length; q++) {
						console.log(this.goInspectInfo.goodsList[i].children[q].id)
						if (e == this.goInspectInfo.goodsList[i].children[q].id) {
							this.goInspectInfo.goodsList[i].children[q].condition = 1
							this.goInspectInfo.goodsList[i].condition = 1
						}
					}
				}

				
				
						
			},
			setBadImg(e) {
				this.imgshow = true
				this.selectId = e
			},
			lookImg(e,q) {
				console.log(e)
				this.selectId = q
				this.badimgUrl = e
				this.imgshow1 = true
			},
			change() {
				this.imgshow = true
				this.imgshow1 = false
			},
			updataImg(e) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //camera 拍照 album 相册
					success: async (res) => {
						console.log(res)
						const [err, rese] = await uploadFiles([res.tempFilePaths[0]]);
						if (err) return
						console.log(rese)
						if (e == 0) {
							this.badimgUrl = rese[0]
							this.imgshow1 = true
							this.imgshow = false
						} else {
							if (this.imgList.length < 3) {
								this.imgList.push(rese[0])
							} else {
								uni.toast('最多上传三张照片')
							}

						}
					},
					fail() {
						uni.showToast({
							title: "",
							duration: 2000
						})
					}
				})
			},
			delImg(index) {
				this.imgList.splice(index, 1)
			},
			async sure() {
				console.log(this.mileageNum)
				console.log(this.oilNum)
				console.log(this.imgList)
				console.log(this.mark)
				
				if(this.mileageNum==""){
					this.$toast("请填写公里数")
					return false;
				}else if(this.oilNum==""){
					this.$toast("请填写油量数")
					return false;
				}
				
				for (let i = 0; i < this.goInspectInfo.goodsList.length; i++) {
					for (let q = 0; q < this.goInspectInfo.goodsList[i].children.length; q++) {
						if (this.goInspectInfo.goodsList[i].children[q].condition==null) {
							this.$toast("请勾选车辆设备")
							return false;
						}
					}
				}
				
				let mark = {
					image: JSON.stringify(this.imgList),
					remarks: this.mark,
				}
				let data = {
					carNumber: this.info.carnum,
					vehicleId: this.info.vehicleId,
					orderId: this.info.order,
					mileage: this.mileageNum,
					oil: this.oilNum,
					goodsList: this.goInspectInfo.goodsList,
					remarks: mark
				}
				console.log(data)
			
				const [err, res] = await addaddRecord(data)
				if (err) return
				uni.navigateBack({
					delta: 1
				})
			},
			upsure() {
				this.imgshow = false
				this.imgshow1 = false
				for (let i = 0; i < this.goInspectInfo.goodsList.length; i++) {
					for (let q = 0; q < this.goInspectInfo.goodsList[i].children.length; q++) {
						if (this.selectId == this.goInspectInfo.goodsList[i].children[q].id) {
							this.goInspectInfo.goodsList[i].children[q].image = this.badimgUrl
						}
					}
				}
			}
		}
	}
</script>

<style>
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
	}

	.grayLine {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 30rpx;
	}

	.no {
		color: #999999;
		border: 2rpx solid #999999;
		border-radius: 10rpx;
		font-size: 20rpx;
		padding: 6rpx;

	}

	.ok {
		border-radius: 10rpx;
		font-size: 20rpx;
		padding: 6rpx;
		color: white;
		background-color: #5A7EFF;

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
		top: 30vh;
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
</style>
