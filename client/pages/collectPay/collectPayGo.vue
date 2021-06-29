<template>
	<view class="">
		<view class="flexbox">
			<view class="titleLeft">日期</view>
			<view class="titleRight">2021-06-02</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">平台</view>
			<view class="titleRight">追风租车</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">项目</view>
			<view class="titleRight">大方租车</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">车牌号</view>
			<view class="titleRight">渝A·533333</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">店员</view>
			<view class="titleRight">张全蛋</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">金额(元)</view>
			<view class="titleRight">¥800</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">付款人</view>
			<view class="titleRight">张全蛋</view>
		</view>
		<view class="flexbox">
			<view class="titleLeft">银行卡</view>
			<view class="titleRight">中国工商银行 6222023100002243000</view>
		</view>
		<view class="flexbox" style="border-bottom: 0rpx;">
			<view class="titleLeft">备注</view>
			<view class="titleRight">这是上次欠的800</view>
		</view>

		<view class="flexbox"
			style="border-top: 20rpx solid #EFF0F3;border-bottom: 20rpx solid #EFF0F3;width: 100%;padding: 0rpx 5%;">
			<view class="titleLeft">提交时间</view>
			<view class="titleRight">2021-07-01 18:00:00</view>
		</view>

		<view style="width: 90%;margin: auto;padding: 20rpx 0rpx;">
			<view style="font-size: 28rpx;color: #000000;">
				上传图片
				<text style="color:#999999;font-size: 20rpx;">(辅助财务审核)</text>
			</view>
			<view style="display: inline-block;width: 22%;margin: 20rpx 1%;position: relative;"
				v-for="(item,index) in list">
				<view v-if="index==(list.length-1)">
					<image style="width:160rpx;height:160rpx;" :src="$util.fileUrl('/guanxi.png')" mode=""></image>
				</view>
				<view v-else>
					<image style="width:160rpx;height:160rpx;" :src="$util.fileUrl('/guanxi.png')" mode=""></image>
					<image style="width:36rpx;height:36rpx;position: absolute;top:-10rpx;right: -10rpx;"
						:src="$util.fileUrl('/lancha.png')" mode=""></image>
				</view>
			</view>
			<!-- 审核未通过 -->
			<view style="color: #FC3736;font-size: 28rpx;margin-top: 20rpx;">拒绝原因：图片上传错误</view>
		</view>
		<!-- 待审核 -->
		<button style=" color: white;
			width: 80%;
					margin: auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;margin-top: 40rpx;margin-bottom: 20rpx;" type="default"
			@click="next">提交审核</button>

		<!-- 审核未通过 -->
		<button style=" color: white;
				width: 80%;
						margin: auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;margin-top: 40rpx;margin-bottom: 20rpx;" type="default"
			@click="next">重新提交</button>
		<!-- 店主审核 -->
		<view class="colorTitle" style="margin-top: 20rpx ;">
			<view class="setnull">拒绝</view>
			<view class="sure">付款</view>
		</view>

		<!-- 拒绝弹窗 -->
		<view v-if="refuse==true" class="Mask">

		</view>
		<view v-if="refuse==true" class="box1">
			<view style="width: 90%;margin: auto;font-size:32rpx;padding: 20rpx 0rpx;">拒绝原因</view>
			<view style="width: 90%;margin: auto;">
				<textarea value="" style="background-color:#EFF0F3;padding: 20rpx;" placeholder="请输入拒绝原因" />
			</view>
			<view style="width: 90%;margin: auto;" >
				<view style="display: inline-block;width: 50%;">
					<view class="close">取消</view>
				</view>
				<view style="display: inline-block;width: 50%;">
					<view class="yes">确定</view>
				</view>
			</view>
		</view>

		<!-- 修改金额弹窗 -->
		<view v-if="money==true" class="Mask">

		</view>
		<view v-if="money==true" class="box1">
			<view style="width: 90%;margin: auto;font-size:32rpx;padding: 20rpx 0rpx;">修改金额</view>
			<view style="width: 90%;margin: auto;">
				<input value="" style="background-color:#EFF0F3;padding-left: 20rpx;height: 74rpx;border-radius: 10rpx;" placeholder="请输入修改金额" />
			</view>
			<view style="width: 90%;margin: auto;" >
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
	export default {
		data() {
			return {
				list: [1, 1, 1, 1],
				refuse: false,
				money:false
			}
		},
		methods: {

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

	.sure {
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
		position: absolute;
		padding: 20rpx 0px;
		border-top: 1px solid #FFFFFF;
		border-bottom: 1px solid #FFFFFF;
		background-color: white;
		top: 30vh;
		left: 5%;
		border-radius: 20rpx;
	}
	.close{
		height: 60rpx;
		width: 136rpx;
		border: 1px solid #5A7EFF;
		color: #5A7EFF;
		text-align: center;
		line-height: 60rpx;
		margin: 20px 0rpx;
		border-radius: 10rpx;
	}
	.yes{
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
</style>
