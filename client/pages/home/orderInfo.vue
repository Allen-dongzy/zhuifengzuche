<template>
	<view class="">
		<view class="title">距离送车1天6小时12分</view>
			<!-- 待支付 没有这句话   已取消 没有这句话     已完成 违章押金已收取21天      待收车 距离收车1天6小时12分     待送车 距离送车1天6小时12分 -->
		<!-- 关于车 -->
		<view class="box">
			<view class="flexBox">
				<view class="carName">渝A·5231B</view>
				<image style="width: 80rpx;height: 40rpx;" :src="$util.fileUrl('/yizhifu.png')" mode=""></image>
			</view>
			<view class="flexBox" style="border-bottom:2rpx dashed #999999;padding-bottom: 30rpx;">
				<view class="carType">大众 捷达丨自动 5座 2.0L</view>
				<image v-show="carShow==false" style="width: 30rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxia.png')"
					@click="getcarInfo" mode=""></image>
				<image v-show="carShow==true" style="width: 30rpx;height: 20rpx;"
					:src="$util.fileUrl('/xiangshang.png')" @click="getcarInfo" mode=""></image>
			</view>
			<view v-show="carShow==true" style="border-bottom:2rpx dashed #999999;padding-bottom: 30rpx;">
				<view class="flexBox">
					<view class="moreTitle">车身颜色</view>
					<view class="moreContent">白色</view>
				</view>
				<view class="flexBox">
					<view class="moreTitle">燃烧型号</view>
					<view class="moreContent">92号</view>
				</view>
			</view>
			<view class="flexBox">
				<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/time.png')" mode=""></image>
				<view class="">05-25 14:48至05-30 14:48</view>
			</view>
			<view class="flexBox">
				<view class="getset">取还</view>
				<view class="address">郑家院子追风1店</view>
				<view class="otherBack">异地还车</view>
				<switch @change="radioChange" class="switch" :class="(radio?'checked':'')"
					:checked="(radio?true:false)"></switch>
			</view>
		</view>
		<!-- 关于人 -->
		<view class="box">
			<view class="flexBox">
				<view class="carName">王小名</view>
				<image v-show="peopleShow==false" style="width: 30rpx;height: 20rpx;"
					:src="$util.fileUrl('/xiangxia.png')" @click="getpeopleInfo" mode=""></image>
				<image v-show="peopleShow==true" style="width: 30rpx;height: 20rpx;"
					:src="$util.fileUrl('/xiangshang.png')" @click="getpeopleInfo" mode=""></image>
			</view>
			<view class="flexBox">
				<view class="moreContent" style="text-align: left;">联系电话</view>
				<view class="moreContent" style="color:#5A7EFF ;" @click="phone">13333333333</view>
			</view>
			<view v-show="peopleShow==true">
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;">身份证号码</view>
					<view class="moreContent">222222222222222222</view>
				</view>
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;">紧急联系人</view>
					<view class="moreContent">张三</view>
				</view>
				<view class="flexBox" style="border-bottom:2rpx dashed #999999;padding-bottom: 30rpx;">
					<view class="moreContent" style="text-align: left;">紧急联系人</view>
					<view class="moreContent" style="color:#5A7EFF ;" @click="phone">13333333333</view>
				</view>
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;width: 43%;">违章</view>
					<view class="moreContent" style="width: 55%;">6次 累计30分 罚款200元</view>
					<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode=""></image>
				</view>
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;width: 43%;">事故</view>
					<view class="moreContent" style="width: 55%;">轻微0次 中等1次 严重0次</view>
					<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode=""></image>
				</view>
				<view class="flexBox">
					<view class="moreContent" style="text-align: left;width: 43%;">其他</view>
					<view class="moreContent" style="width: 55%;">3条</view>
					<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 关于钱 -->
		<view class="box">
			<view class="flexBox">
				<view class="moreTitle">租金押金</view>
				<view class="moreTitle" style="width: 15%;">未免押</view>
				<view class="moreContent" style="width: 20%;text-align: center;">¥60</view>
				<view class="moreContent" style="width: 15%;color: #5A7EFF;">已支付</view>
			</view>
			<view class="flexBox">
				<view class="moreTitle" style="width: 65%;">租金总计</view>
				<!-- <view class="moreTitle" style="width: 15%;">未免押</view> -->
				<view class="moreContent" style="width: 20%;text-align: center;">¥60</view>
				<view class="moreContent" style="width: 15%;color: #5A7EFF;">已支付</view>
			</view>
			<view class="flexBox" v-show="moneyShow==false">
				<view class="moreContent" style="width: 93%;color: #5A7EFF;">展开明细</view>
				<image v-show="moneyShow==false" style="width: 30rpx;height: 20rpx;margin-left: 10rpx;"
					:src="$util.fileUrl('/xiangxia.png')" @click="getmoneyInfo" mode=""></image>
			</view>
			<view v-show="moneyShow==true" style="border-top:2rpx dashed #999999;margin-top: 20rpx;">
				<view class="flexBox" >
					<view class="moreTitle">租金</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">异地调度费</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">零散小时费</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">夜间取车费</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">夜间取车费</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">驾无忧保障</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">基本保障费</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">手续费</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">优惠券减免</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">补收差价</view>
					<view class="moreContent">¥60</view>
				</view>
				<view class="flexBox">
					<view class="moreContent" style="width: 93%;color: #5A7EFF;">收起明细</view>
					<image style="width: 30rpx;height: 20rpx;margin-left: 10rpx;"
						:src="$util.fileUrl('/xiangshang.png')" @click="getmoneyInfo" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- 关于发票 -->
		<view class="box">
			<view class="flexBox">
				<view class="moreTitle">发票抬头</view>
				<view class="moreTitle" style="width: 43%;text-align: right;">需要</view>
				<image v-show="invoiceShow==false" style="width: 30rpx;height: 20rpx;margin-left: 10rpx;"
					:src="$util.fileUrl('/xiangxia.png')" @click="getinvoiceInfo" mode=""></image>
				<image v-show="invoiceShow==true" style="width: 30rpx;height: 20rpx;margin-left: 10rpx;"
					:src="$util.fileUrl('/xiangshang.png')" @click="getinvoiceInfo" mode=""></image>
			</view>
			<view v-show="invoiceShow==true">
				<view class="flexBox" style="border-top:2rpx dashed #EFF0F3;padding-top: 30rpx;">
					<view class="moreTitle">发票抬头</view>
					<view class="moreContent">这里是发票抬头</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">税号</view>
					<view class="moreContent">544564896164669</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">银行账号</view>
					<view class="moreContent">544564896164669</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">开户行</view>
					<view class="moreContent">中国银行江北嘴支行</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">注册地址</view>
					<view class="moreContent">这里是注册地址</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">电话</view>
					<view class="moreContent">023-66666666</view>
				</view>
				<view class="flexBox" >
					<view class="moreTitle">邮箱</view>
					<view class="moreContent">666666@qq.com</view>
				</view>
				<view class="flexBox" style="border-bottom:2rpx dashed #EFF0F3;padding-bottom: 30rpx;">
					<view class="moreTitle">发票类型</view>
					<view class="moreContent">普票</view>
				</view>
			</view>
			<view class="flexBox">
				<view class="moreTitle">订单号</view>
				<view class="moreContent">544564896164669</view>
			</view>
			<view class="flexBox">
				<view class="moreTitle">订单来源</view>
				<view class="moreContent">微信小程序</view>
			</view>
			<view class="flexBox">
				<view class="moreTitle">下单时间</view>
				<view class="moreContent" style="width:56%">2021/05/31 18:51</view>
				<image style="width: 26rpx;height: 26rpx;" :src="$util.fileUrl('/heiyou.png')" mode=""></image>
			</view>
			<view class="flexBox">
				<view class="moreTitle">所属门店</view>
				<view class="moreContent">郑家院子1号店</view>
			</view>
		</view>
		<!-- 备注-->
		<view class="box">
			<view class="moreTitle">备注：</view>
			<textarea style="border-radius: 10rpx;height: 200rpx;padding-bottom: 20rpx;" value="" placeholder="请输入备注信息" />
		</view>
		<!-- 换车 -->
			<view class="flexBox">
				<image style="width: 40rpx;height: 40rpx;margin-left: 80%;"
					:src="$util.fileUrl('/huanche.png')" @click="getmoneyInfo" mode=""></image>
				<view class="moreContent" style="width: 10%;color: #5A7EFF;" @click="changeCar">换车</view>
			</view>
			<view class="flexBox" >
				<view class="moreContent" style="width: 20%;color: #5A7EFF;margin-left: 55%;">查看违章</view>
				<view class="moreContent" style="width: 20%;color: #5A7EFF;">添加违章</view>
			</view>
		<!-- 联系客户和出车检验 -->
		<view class="flexBox" style="width: 90%;margin: 60rpx auto 30rpx auto;">
			<image style="width: 32rpx;height: 32rpx;"
				:src="$util.fileUrl('/phone@2x.png')" @click="getmoneyInfo" mode=""></image>
			<view style="color: #FFA05B;font-size: 24rpx;margin-left: 10rpx;margin-right: 38%;">联系客户</view>
			<view class="lanbox">交车情况</view>
			<view class="lanbox">收车情况</view>
			<view class="lanbox">结算佣金</view>
			<view class="lanbox">出车检验</view>
			<view class="lanbox">检验收车</view>
			<view class="lanbox">交付车辆</view>
			<view class="lanbox1">退还押金</view>
			<!-- 待支付 按钮都不要    已取消 按钮都不要    已完成 结算 收车 退还      待收车 交车 检验     待送车 出车 交付-->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carShow: false, //显示车的其他信息
				peopleShow: false, //显示人的其他信息
				moneyShow: false, //显示钱的其他信息
				invoiceShow:false,//显示发票信息
			}
		},
		methods: {
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
			changeCar(){
				uni.navigateTo({
					url:'./changeCar',
					animationDuration:200,
					animationType:'pop-in'
				})
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
	.lanbox{
		border:2rpx solid #5A7EFF;
		font-size:24rpx;
		padding: 10rpx 15rpx;
		border-radius: 10rpx;
		color: #5A7EFF;
	}
	.lanbox1{
		font-size:24rpx;
		padding: 10rpx 15rpx;
		border-radius: 10rpx;
		color: white;
		background-color: #5A7EFF;
	}
</style>
