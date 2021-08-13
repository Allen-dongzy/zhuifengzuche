<template>
	<view class="">
		<view v-if="type==0" class="title"></view>
		<view v-if="type==101" class="title"></view>
		<view v-if="type==1" class="title">{{info.countdown}}</view>
		<view v-if="type==5" class="title">{{info.countdown}}</view>
		<view v-if="type==100" class="title">{{info.countdown}}</view>
		<!-- 待支付 没有这句话   已取消 没有这句话     已完成 违章押金已收取21天      待收车 距离收车1天6小时12分     待送车 距离送车1天6小时12分 -->
		<!-- 关于车 -->
		<view class="box">
			<view v-for="(item,index) in info.adminOrderVehicleInfoVoList" :key="index">
				<view class="flexBox">
					<view class="carName">{{item.vehicleNumber}}</view>
					<image style="width: 80rpx;height: 40rpx;" :src="$util.fileUrl('/yizhifu.png')" mode="aspectFill"></image>
				</view>
				<view class="flexBox" style="border-bottom:2rpx dashed #999999;padding-bottom: 30rpx;">
					<view class="carType">{{item.modelName}}</view>
					<image v-if="carShow==false" style="width: 30rpx;height: 20rpx;"
						:src="$util.fileUrl('/xiangxia.png')" @click="getcarInfo" mode="aspectFill"></image>
					<image v-if="carShow==true" style="width: 30rpx;height: 20rpx;"
						:src="$util.fileUrl('/xiangshang.png')" @click="getcarInfo" mode="aspectFill"></image>
				</view>
				<view v-if="carShow==true" style="border-bottom:2rpx dashed #999999;padding-bottom: 30rpx;">
					<view class="flexBox">
						<view class="moreTitle">车身颜色</view>
						<view class="moreContent">{{item.vehicleColour}}</view>
					</view>
					<view class="flexBox">
						<view class="moreTitle">燃烧型号</view>
						<view class="moreContent">{{item.model}}</view>
					</view>
				</view>
			</view>


			<view class="flexBox">

				<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/time.png')" mode="aspectFill"></image>
				<view class="">{{info.rentBeginTime.slice(0,10)}}至{{info.rentEndTime.slice(0,10)}}</view>


			</view>

			<view class="flexBox" v-if="info.endDeliveryName==info.startDeliveryName">
				<view class="getset">取还</view>
				<view class="address">郑家院子追风1店</view>
				<view class="otherBack">异地还车</view>
				<switch disabled="true" class="switch" :class="(radio?'checked':'')" :checked="(radio?true:false)">
				</switch>
			</view>

			<view v-else>
				<view class="flexBox">
					<view class="getset">取</view>
					<view class="address">{{info.startDeliveryName}}</view>
				</view>
				<view class="flexBox">
					<view class="getset">还</view>
					<view class="address">{{info.endDeliveryName}}</view>
				</view>
			</view>

		</view>
		<!-- 关于人 -->
		<view class="box">
			<view class="flexBox">
				<view class="carName">{{info.userRealName}}</view>
				<image v-if="peopleShow==false" style="width: 30rpx;height: 20rpx;"
					:src="$util.fileUrl('/xiangxia.png')" @click="getpeopleInfo" mode="aspectFill"></image>
				<image v-if="peopleShow==true" style="width: 30rpx;height: 20rpx;"
					:src="$util.fileUrl('/xiangshang.png')" @click="getpeopleInfo" mode="aspectFill"></image>
			</view>
			<view class="flexBox">
				<view class="moreContent" style="text-align: left;" @click="phone(info.userPhone)">联系电话</view>
				<view class="moreContent" style="color:#5A7EFF ;" @click="phone">{{info.userPhone}}</view>
			</view>
			<view v-if="peopleShow==true">
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;">身份证号码</view>
					<view class="moreContent">{{info.userIdCard}}</view>
				</view>
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;">紧急联系人</view>
					<view class="moreContent">{{info.userEmergencyContactName}}</view>
				</view>
				<view class="flexBox" style="border-bottom:2rpx dashed #999999;padding-bottom: 30rpx;">
					<view class="moreContent" style="text-align: left;">紧急联系人电话</view>
					<view class="moreContent" style="color:#5A7EFF ;" @click="phone">{{info.userEmergencyContactPhone}}
					</view>
				</view>
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;width: 43%;">违章</view>
					<view class="moreContent" style="width: 55%;">{{info.breakRulesString}}</view>
					<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode="aspectFill"></image>
				</view>
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;width: 43%;">事故</view>
					<view class="moreContent" style="width: 55%;">{{info.accidentString}}</view>
					<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode="aspectFill"></image>
				</view>
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;width: 43%;">其他</view>
					<view class="moreContent" style="width: 55%;">{{info.otherString}}</view>
					<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<!-- 关于钱 -->
		<view class="box">
			<view class="flexBox">
				<view class="moreTitle">租金押金</view>
				<view class="moreTitle" style="width: 21%;" v-if="info.depositType==1">未免押</view>
				<view class="moreTitle" style="width: 21%;" v-else>全额免押</view>
				<view  class="moreContent" style="width: 20%;text-align: center;">¥{{info.rentalDeposit}}</view>
				<view v-if="info.isPaymentRentalDeposit==0" class="moreContent" style="width: 15%;color: #5A7EFF;">未缴</view>
				<view v-if="info.isPaymentRentalDeposit==1" class="moreContent" style="width: 15%;color: #5A7EFF;">已缴</view>
			</view>
			<view class="flexBox">
				<view class="moreTitle" style="width: 65%;">租金总计</view>
				<!-- <view class="moreTitle" style="width: 15%;">未免押</view> -->
				<view class="moreContent" style="width: 20%;text-align: center;">¥{{info.orderDeposit}}</view>
				<view v-if="info.payStatus==1" class="moreContent" style="width: 15%;color: #5A7EFF;">已支付</view>
				<view v-else class="moreContent" style="width: 15%;color: #5A7EFF;">未支付</view>
			</view>
			<view class="flexBox" v-if="moneyShow==false">
				<view class="moreContent" style="width: 93%;color: #5A7EFF;">展开明细</view>
				<image v-if="moneyShow==false" style="width: 30rpx;height: 20rpx;margin-left: 10rpx;"
					:src="$util.fileUrl('/xiangxia.png')" @click="getmoneyInfo" mode="aspectFill"></image>
			</view>
			<view v-if="moneyShow==true" style="border-top:2rpx dashed #999999;margin-top: 20rpx;">
				<view class="flexBox" v-for="(item,index) in info.orderPriceList" :key='index'>
					<view class="moreTitle">{{item.name}}</view>
					<view class="moreContent">¥{{item.price}}</view>
				</view>

				<view class="flexBox">
					<view class="moreContent" style="width: 93%;color: #5A7EFF;">收起明细</view>
					<image style="width: 30rpx;height: 20rpx;margin-left: 10rpx;"
						:src="$util.fileUrl('/xiangshang.png')" @click="getmoneyInfo" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<!-- 关于发票 -->
		<view class="box">
			<view class="flexBox">
				<view class="moreTitle">发票抬头</view>
				<view class="moreTitle" style="width: 43%;text-align: right;" v-if="info.isInvoice==1">需要</view>
				<view class="moreTitle" style="width: 43%;text-align: right;" v-else>不需要</view>
				<image v-if="invoiceShow==false" style="width: 30rpx;height: 20rpx;margin-left: 10rpx;"
					:src="$util.fileUrl('/xiangxia.png')" @click="getinvoiceInfo" mode="aspectFill"></image>
				<image v-if="invoiceShow==true" style="width: 30rpx;height: 20rpx;margin-left: 10rpx;"
					:src="$util.fileUrl('/xiangshang.png')" @click="getinvoiceInfo" mode="aspectFill"></image>
			</view>
			<view v-if="info.isInvoice==1">
				<view v-if="invoiceShow==true">
					<view class="flexBox" style="border-top:2rpx dashed #EFF0F3;padding-top: 30rpx;">
						<view class="moreTitle">发票抬头</view>
						<view class="moreContent">{{info.invoiceTitle}}</view>
					</view>
					<view class="flexBox">
						<view class="moreTitle">税号</view>
						<view class="moreContent">{{info.invoiceTaxNum}}</view>
					</view>
					<view class="flexBox">
						<view class="moreTitle">银行账号</view>
						<view class="moreContent">{{info.invoiceBankNum}}</view>
					</view>
					<view class="flexBox">
						<view class="moreTitle">开户行</view>
						<view class="moreContent">{{info.invoiceOpeningBank}}</view>
					</view>
					<view class="flexBox">
						<view class="moreTitle">注册地址</view>
						<view class="moreContent">{{info.invoiceRegisteredAddress}}</view>
					</view>
					<view class="flexBox">
						<view class="moreTitle" @click="phone(info.invoicePhone)">电话</view>
						<view class="moreContent">{{info.invoicePhone}}</view>
					</view>
					<view class="flexBox" style="border-bottom:2rpx dashed #EFF0F3;padding-bottom: 30rpx;">
						<view class="moreTitle">发票类型</view>
						<view v-if="info.invoiceType==1" class="moreContent">专票</view>
						<view v-else class="moreContent">普票</view>
					</view>
				</view>
			</view>
			<view class="flexBox">
				<view class="moreTitle">订单号</view>
				<view class="moreContent">{{info.orderSn}}</view>
			</view>
			<view class="flexBox">
				<view class="moreTitle">订单来源</view>
				<view v-if="info.orderSource==0" class="moreContent">微信小程序</view>
				<view v-if="info.orderSource==1" class="moreContent">支付宝小程序</view>
			</view>
			<view class="flexBox">
				<view class="moreTitle">下单时间</view>
				<view class="moreContent" style="width:56%">{{info.createTime}}</view>
				<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode="aspectFill"></image>
			</view>
			<view class="flexBox">
				<view class="moreTitle">所属门店</view>
				<view class="moreContent">{{info.memberShopName}}</view>
			</view>
		</view>
		<!-- 备注-->
		<view class="box">
			<view class="moreTitle">备注：</view>
			<textarea style="border-radius: 10rpx;height: 200rpx;padding-bottom: 20rpx;" :value="info.orderRemark"
				placeholder="请输入备注信息" disabled="true" />
		</view>
		<!-- 换车 -->
<!-- 		<view class="flexBox" v-if="type==5 || type==1">
			<image style="width: 40rpx;height: 40rpx;margin-left: 80%;" :src="$util.fileUrl('/huanche.png')"></image>
			<view class="moreContent" style="width: 10%;color: #5A7EFF;" @click="changeCar(info)">换车</view>
		</view> -->
		<view class="flexBox" v-if="type==100">
			<view class="moreContent" style="width: 20%;color: #5A7EFF;margin-left: 55%;" @click="violation(1)">查看违章</view>
			<view class="moreContent" style="width: 20%;color: #5A7EFF;" @click="violation(2)">添加违章</view>
		</view>
		<!-- 联系客户和出车检验 -->
		<view class="flexBox" style="width: 90%;margin: 60rpx auto 30rpx auto;">
			<image style="width: 32rpx;height: 32rpx;" mode="aspectFill" :src="$util.fileUrl('/phone@2x.png')" @click="phone(info.userPhone)"></image>
			<view style="color: #FFA05B;font-size: 24rpx;margin-left: 10rpx;">联系客户</view>
			<view style="width: 75%;display: flex;align-items: center;justify-content: flex-end;">
				<view v-if="type==5" class="lanbox" @click="deliverCar(2)">交车情况</view>
				<view v-if="type==100" class="lanbox" @click="shoucheInfo">收车情况</view>
				<!-- <view v-if="type==100" class="lanbox">结算佣金</view> -->
				<view v-if="type==1" class="lanbox"  @click="goInspect()">出车检验</view>
				<view v-if="type==5 " class="lanbox" @click="jianyanshouche"
					:disabled="info.isPaymentIllegalDeposit==1">检验收车</view>
				<view :disabled="info.isVehicleCertificates==true" v-if="type==1" @click="deliverCar(1)"
					class="lanbox">交付车辆</view>
				<view v-if="type==100" class="lanbox1" @click="backMoney">退还押金</view>
			</view>
			<!-- 待支付 按钮都不要    已取消 按钮都不要    已完成  100 结算 收车 退还      待收车 5 交车 检验       待送车 1 出车 交付-->
		</view>
	</view>
</template>

<script>
	import {
		orderInfo
	} from '@/apis/rentalOrder'
	import {
		refundOfIllegalDeposit
	} from '@/apis/pay'
	export default {
		data() {
			return {
				carShow: false, //显示车的其他信息
				peopleShow: false, //显示人的其他信息
				moneyShow: false, //显示钱的其他信息
				invoiceShow: false, //显示发票信息
				info: '',
				type: '', //订单类型
			}
		},
		
		onLoad(e) {
			console.log(e)
			this.orderInfo(e.id)
			this.type = e.type
		},
		methods: {
			async orderInfo(e) {
				let data = {
					orderId: e
				}
				const [err, res] = await orderInfo(data)
				if (err) return
				console.log(res)
				this.info = res.data
			},
			getcarInfo() {
				if (this.carShow) {
					this.carShow = false
				} else {
					this.carShow = true
				}
			},
			getpeopleInfo() {
				if (this.peopleShow) {
					this.peopleShow = false
				} else {
					this.peopleShow = true
				}
			},
			getmoneyInfo() {
				if (this.moneyShow) {
					this.moneyShow = false
				} else {
					this.moneyShow = true
				}
			},
			getinvoiceInfo() {
				if (this.invoiceShow) {
					this.invoiceShow = false
				} else {
					this.invoiceShow = true
				}
			},
			phone(e) {
				uni.makePhoneCall({
					phoneNumber: e //仅为示例
				});
			},
			changeCar(e) {
				
				uni.navigateTo({
					url: './changeCar?obj='+JSON.stringify(this.info),
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			//出车检验
			goInspect() {
				if(this.info.isCarTest==true){
					return false;
				}
				let data = {
					order: this.info.id,
					carnum: this.info.adminOrderVehicleInfoVoList[0].vehicleNumber,
					vehicleId: this.info.adminOrderVehicleInfoVoList[0].vehicleId,
				}

				uni.navigateTo({
					url: './goInspect?obj=' + JSON.stringify(data)
				})
			},
			//交车情况
			deliverCar(e) {
				let data = {
					order: this.info.id,
					carnum: this.info.vehicleNumber,
					vehicleId: this.info.vehicleId
				}

				uni.navigateTo({
					url: './deliverCar?type=' + e + '&obj=' + JSON.stringify(data)
				})
			},
			//检验收车
			jianyanshouche() {
				let data = {
					order: this.info.id,
					carnum: this.info.vehicleNumber,
					vehicleId: this.info.vehicleId
				}

				uni.navigateTo({
					url: './inspectionCollect?obj=' + JSON.stringify(data)
				})
			},
			shoucheInfo(){
				let data = {
					order: this.info.id,
				}
				
				uni.navigateTo({
					url: './inspectionCollectInfo?obj=' + JSON.stringify(data)
				})
			},
			violation(e){
				if(e==1){
					uni.navigateTo({
						url:'./violation?obj='+JSON.stringify(this.info)
					})
				}else{
					uni.navigateTo({
						url:'./violationAdd?type=1&obj='+JSON.stringify(this.info)
					})
				}
			},
		async	backMoney(){
				const [err,res]=await refundOfIllegalDeposit(this.info.id)
				if(err) return
				this.$toast('退还成功')
			}
		}
	}
</script>

<style>
	.flexBox {
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}

	.box {
		width: 90%;
		margin: auto;
		border: 2rpx solid rgba(114, 141, 244, 0.25);
		border-radius: 15rpx;
		padding: 30rpx;
		margin-top: 30rpx;

	}

	.title {
		width: 90%;
		margin: auto;
		color: #5A7EFF;
		font-size: 36rpx;
	}

	.carType {
		color: #999999;
		font-size: 24rpx;
		width: 93%;
	}

	/**
	 * 去掉开关选择器图标
	 */
	/deep/ switch::after,
	switch::before {
		content: ''
	}

	/**
	 * 开关选择器高度
	 */
	/deep/ switch .wx-switch-input,
	switch .uni-switch-input {
		height: 36rpx !important;
	}

	/**
	 * 开关选择器未选中按钮样式
	 */
	/deep/ switch .wx-switch-input::after,
	switch .uni-switch-input::after {
		left: -4rpx;
		box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, .6);
	}

	/**
	 * 开关选择器选中按钮样式
	 */
	/deep/ switch .wx-switch-input.wx-switch-input-checked::after,
	switch .uni-switch-input.uni-switch-input-checked::after {
		left: 48rpx;
		box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, .6);
	}

	/**
	 * 开关选择器选中颜色
	 */
	/deep/ switch[checked] .wx-switch-input {
		background-color: #5A7EFF !important;
	}

	.carName {
		width: 93%;
		font-size: 28rpx;
		color: #000000;
	}

	.getset {
		color: #5A7EFF;
		font-size: 24rpx;
	}

	.address {
		font-size: 24rpx;
		margin-left: 20rpx;
		width: 50%;
	}

	.otherBack {
		color: #999999;
		font-size: 24rpx;
		margin-right: 20rpx
	}

	.moreTitle {
		width: 50%;
		font-size: 28rpx;
	}

	.moreContent {
		font-size: 28rpx;
		width: 50%;
		color: #999999;
		text-align: right;
	}

	.lanbox {
		border: 2rpx solid #5A7EFF;
		font-size: 24rpx;
		padding: 10rpx 15rpx;
		border-radius: 10rpx;
		color: #5A7EFF;
		margin-left: 5%;
		width: 26%;
		text-align: center;
	}

	.lanbox1 {
		font-size: 24rpx;
		padding: 10rpx 15rpx;
		border-radius: 10rpx;
		color: white;
		background-color: #5A7EFF;
		margin-left: 5%;
		width: 26%;
		text-align: center;
	}
</style>
