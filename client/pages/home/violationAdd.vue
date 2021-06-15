<template>
	<view class="">
		<view class="box">
			<view class="flexBox" >
				<view class="blackText">违章时间</view>
					<xp-picker style="width: 65%;text-align: right;" mode="ymdhi" @confirm="confirm">请选择时间</xp-picker>
					<image style="width: 40rpx;height: 40rpx;margin-left: 5rpx;" :src="$util.fileUrl('/daytime.png')" @click="getcarInfo" mode=""></image>
			</view>
			<view class="flexBox" >
				<view class="blackText">违章地点</view>
				<input type="text" value="" placeholder="请输入违章地点" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" >
				<view class="blackText">违章行为</view>
				<input type="text" value="" placeholder="请填写违法行为" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" >
				<view class="blackText">违章机关</view>
				<input type="text" value="" placeholder="请填写采集机关" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" >
				<view class="blackText">违章金额</view>
				<input type="text" value="" placeholder="请填写处罚金额" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" style="border: 0rpx;">
				<view class="blackText">违章分数</view>
				<input type="text" value="" placeholder="请填写处罚分数" class="inpBox"  placeholder-style="text-align: right" />
			</view>
		</view>
		<view class="grayLine"></view>
		<view class="box">
			<view class="flexBox" >
				<view class="blackText">单据单号</view>
				<input type="text" value="" placeholder="请填写单据号码" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" >
				<view class="blackText">单据照片</view>
				<view class="">
					<image style="width: 200rpx;height: 120rpx;margin-left: 5rpx;" :src="$util.fileUrl('/guanxi.png')" @click="getcarInfo" mode=""></image>
					<image style="width: 200rpx;height: 120rpx;margin-left: 5rpx;" :src="$util.fileUrl('/guanxi.png')" @click="getcarInfo" mode=""></image>
				</view>
			</view>
			<view style="padding: 30rpx 0rpx;">
				<view class="blackText" style="padding: 0rpx 0rpx 20rpx 0rpx;">单据单号</view>
				<textarea value="" placeholder="这里是备注信息" style="padding: 20rpx;background-color:#EFF0F3;height:144rpx;width: 100%;border-radius: 10rpx;" />
			</view>
		</view>
		<button  style=" color: white;
				width: 90%;
						margin: 20rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" @click="next()">提交</button>
	</view>
</template>

<script>
	export default {

		data() {
			return {

			}
		},
		methods: {
			show() {
				this.$refs.picker.show()
			},
			confirm(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
	.box{
	width: 90%;
		margin: auto;
	}
	.flexBox {
		display: flex;
		align-items: center;
		padding: 25rpx 0rpx;
		border-bottom: 2rpx solid #EFF0F3;
	}

	.grayText {
		color: #999999;
		width: 70%;
		font-size: 24rpx;
		text-align: right;
	}

	.blackText {
		width: 30%;
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
		text-align: left;
	}
	.inpBox{
		width: 70%;font-size: 24rpx;color: #999999; text-align: right;direction: rtl;
	}
	.grayLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 30rpx;
	}
</style>
