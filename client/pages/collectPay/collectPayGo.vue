<template>
	<view class="">
		<view class="flexbox" v-show="info.platform==1">
			<view class="titleLeft">日期</view>
			<view class="titleRight">{{info.localDate}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">平台</view>
			<view v-show="info.platform==0" class="titleRight">追风租车</view>
			<view v-show="info.platform==1" class="titleRight">其他租车OTA</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">项目</view>
			<view class="titleRight">{{info.projectName}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">车牌号</view>
			<view class="titleRight">{{info.carNumber}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">店员</view>
			<view class="titleRight">{{info.staffName}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">金额(元)</view>
			<view class="titleRight">¥{{info.money}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">付款人</view>
			<view class="titleRight">{{info.payer}}</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">银行卡</view>
			<view class="titleRight"> {{info.bankCardVO.cardNumber}}</view>
		</view>
		<view class="flexbox" style="border-bottom: 0rpx;">
			<view class="titleLeft">备注</view>
			<view class="titleRight">{{info.remarks}}</view>
		</view>


		<view class="upimgbox">
			<view class="imglistbox" v-for="(item,index) in info.image" :key='index'>
				<image style="width:160rpx;height:160rpx;" :src="item" mode="aspectFill"></image>
			</view>
		</view>

		<view class="flexbox"
			style="border-top: 20rpx solid #EFF0F3;border-bottom: 20rpx solid #EFF0F3;width: 100%;padding: 0rpx 5%;">
			<view class="titleLeft">提交时间</view>
			<view class="titleRight">{{info.createTime}}</view>
		</view>



		
		<view v-show="info.examineStatus==0 || info.examineStatus==3">
			<view class="upimgbox" >
				<view style="font-size: 28rpx;color: #000000;">
					上传图片
					<text style="color:#999999;font-size: 20rpx;">(辅助财务审核)</text>
				</view>
			
				<view class="imglistbox" v-for="(item,index) in list" :key='index'>
					<image style="width:160rpx;height:160rpx;" :src="item" mode="aspectFill"></image>
					<image class="lanClose" :src="$util.fileUrl('/lancha.png')" @click="delImg(index)" mode="aspectFill"></image>
				</view>
				<view class="upimg">
					<image @click="getImg" style="width:160rpx;height:160rpx;" :src="$util.fileUrl('/guanxi.png')" mode="aspectFill">
					</image>
				</view>
				
				<!-- 审核未通过 -->
				<view class="reTitle" v-show="info.examineStatus==3">拒绝原因：{{info.reason}}</view>
			</view>
		</view>



		<view class="upimgbox" v-show="info.examineStatus==2  ">
			<view style="font-size: 28rpx;color: #000000;">
				上传图片
				<text style="color:#999999;font-size: 20rpx;">(辅助财务审核)</text>
			</view>

			<view class="imglistbox" v-for="(item,index) in list" :key='index'>
				<image style="width:160rpx;height:160rpx;" :src="item" mode="aspectFill"></image>
				<!-- <image class="lanClose" :src="$util.fileUrl('/lancha.png')" @click="delImg(index)" mode="aspectFill"></image> -->
			</view>
			<!-- 审核未通过 -->
			<view class="reTitle" v-show="info.examineStatus==3">拒绝原因：{{info.reason}}</view>
		</view>
		
		
		
<view v-show="infotype.type==0">
	<!-- 待审核 -->
	<button class="sure" type="default" @click="take(1)" v-show="info.examineStatus==0" >提交审核</button>
	<!-- 审核未通过 -->
	<button class="sure" type="default"  v-show="info.examineStatus==3" @click="take(1)">重新提交</button>
	<!-- 普通店主审核 -->
	<view class="colorTitle" style="margin: 20rpx 0rpx 60rpx 0rpx;" v-show="info.examineStatus==2 && roles[0].id==4">
		<view class="setnull" @click="refuseBtn">拒绝</view>
		<view class="pay" @click="take(3)">付款</view>
	</view>
</view>


<view v-show="infotype.type==1">
	<!-- 换车店主审核 -->
	<view class="colorTitle" style="margin: 20rpx 0rpx 60rpx 0rpx;" v-show="roles[0].id==4">
		<view class="setnull" @click="refuseBtn">拒绝</view>
		<view class="pay" @click="take(3)">通过</view>
	</view>
</view>






		<!-- 拒绝弹窗 -->
		<view v-if="refuse==true" class="Mask">

		</view>
		<view v-if="refuse==true" class="box1">
			<view style="width: 90%;margin: auto;font-size:32rpx;padding: 20rpx 0rpx;">拒绝原因</view>
			<view style="width: 90%;margin: auto;">
				<textarea v-model="reason" style="background-color:#EFF0F3;padding: 20rpx;" placeholder="请输入拒绝原因" />
			</view>
			<view style="width: 90%;margin: auto;">
				<view style="display: inline-block;width: 50%;">
					<view class="close">取消</view>
				</view>
				<view style="display: inline-block;width: 50%;">
					<view class="yes" @click="take(2)">确定</view>
				</view>
			</view>
		</view>

		<!-- 修改金额弹窗 -->
		<view v-if="money==true" class="Mask">

		</view>
		<view v-if="money==true" class="box1">
			<view style="width: 90%;margin: auto;font-size:32rpx;padding: 20rpx 0rpx;">修改金额</view>
			<view style="width: 90%;margin: auto;">
				<input value="" style="background-color:#EFF0F3;padding-left: 20rpx;height: 74rpx;border-radius: 10rpx;"
					placeholder="请输入修改金额" />
			</view>
			<view style="width: 90%;margin: auto;">
				<view style="display: inline-block;width: 50%;">
					<view class="close">取消</view>
				</view>
				<view style="display: inline-block;width: 50%;">
					<view class="yes">确定</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		throttle
	} from '@/utils/tools';
	import {
		findOneById,
		receiptPaymentAudit
	} from '@/apis/receiptPayment'
	import {
		uploadFiles
	} from '@/apis/oss';
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				list: [],
				refuse: false,
				money: false,
				info: '',//数据详细
				id: '',//数据id
				reason:'',//拒绝理由
				infotype:'',
			}
		},
		computed: {
			// 门店id
			...mapState('user', ['roles'])
		},
		onLoad(e) {
			console.log(e)
			console.log(JSON.parse(e.obj).type)
			this.id = JSON.parse(e.obj).id
			this.infotype=JSON.parse(e.obj)
			this.findOneById()
		},
		methods: {
			async findOneById() {
				const [err, res] = await findOneById(this.id)
				if (err) return
				this.info = res.data
				this.info.image = JSON.parse(res.data.image)
				this.info.examineImage=JSON.parse(res.data.examineImage)
				if(this.info.examineStatus==0){
					
				}else{ 
						this.list=this.info.examineImage
				}
			
			},
			getImg(e) {
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //camera 拍照 album 相册
					success: async (res) => {
						console.log(res)
						const [err, rese] = await uploadFiles(res.tempFilePaths);
						if (err) return
						console.log(rese)
						for (let i = 0; i < rese.length; i++) {
							this.list.push(rese[i])
						}

						this.$forceUpdate()
					},
					fail() {
						uni.showToast({
							title: "拍照或引用相册失败",
							duration: 2000
						})
					}
				})
			},
			delImg(e){
				this.list.splice(e,1)
			},
			
			take:throttle(async function(e){
				if(e==1){
					var  data={
						id:this.info.id,
						examineStatus:this.info.examineStatus,
						examineImage:JSON.stringify(this.list),
						transactionType:this.info.transactionType
					}
				}else if(e==2){
					var  data={
						id:this.info.id,
						examineStatus:3,
						transactionType:this.info.transactionType,
						reason:this.reason
					}
				}else{
					var  data={
						id:this.info.id,
						examineStatus:1,
						transactionType:this.info.transactionType,
					}
				}
	
				const [err,res] = await receiptPaymentAudit(data)
				if(err) return
				console.log(res)
				this.$toast("操作成功")
				setTimeout(() => {
					uni.navigateBack({
						delta:1
					})
				}, 800)
				

			}),
			refuseBtn(){
				this.refuse=true
			}
			
		}
	}
</script>

<style>
	.flexbox {
		display: flex;
		align-items: center;
		width: 90%;
		height: 120rpx;
		margin: auto;
		border-bottom: 2rpx solid #EFF0F3;
	}

	.titleLeft {
		width: 50%;
		text-align: left;
		font-size: 28rpx;
		color: #000000;
	}

	.titleRight {
		width: 50%;
		text-align: right;
		font-size: 28rpx;
		color: #999999;
	}

	.colorTitle {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.setnull {
		height: 96rpx;
		width: 300rpx;
		border: 1px solid #FC3736;
		color: #FC3736;
		text-align: center;
		line-height: 96rpx;
		margin: 0px 20rpx;
		border-radius: 50rpx;
	}

	.pay {
		height: 96rpx;
		width: 300rpx;
		color: white;
		background-color: #5A7EFF;
		text-align: center;
		line-height: 96rpx;
		margin: 0px 20rpx;
		border-radius: 50rpx;
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
		width: 90%;
		position: fixed;
		padding: 20rpx 0px;
		border-top: 1px solid #FFFFFF;
		border-bottom: 1px solid #FFFFFF;
		background-color: white;
		top: 30vh;
		left: 5%;
		border-radius: 20rpx;
	}

	.close {
		height: 60rpx;
		width: 136rpx;
		border: 1px solid #5A7EFF;
		color: #5A7EFF;
		text-align: center;
		line-height: 60rpx;
		margin: 20px 0rpx;
		border-radius: 10rpx;
	}

	.yes {
		height: 60rpx;
		width: 136rpx;
		color: white;
		background-color: #5A7EFF;
		text-align: center;
		line-height: 60rpx;
		margin: 20px 0rpx;
		border-radius: 10rpx;
		margin-left: 50%;
	}

	.upimgbox {
		width: 90%;
		margin: auto;
		padding: 20rpx 0rpx;
	}

	.imglistbox {
		display: inline-block;
		width: 22%;
		margin: 20rpx 1%;
		position: relative;
	}

	.lanClose {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: -10rpx;
		right: -10rpx;
	}

	.upimg {
		display: inline-block;
		width: 22%;
		margin: 20rpx 1%
	}

	.reTitle {
		color: #FC3736;
		font-size: 28rpx;
		margin-top: 20rpx;
	}

	.sure {
		color: white !important;
		width: 80%;
		margin: auto;
		background-color: #5A7EFF !important;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
	}
</style>
