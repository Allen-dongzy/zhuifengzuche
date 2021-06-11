<template>
	<view>
		<view class="box">
			<view class="flexBox" style="padding: 30rpx 0rpx;">
				<view class="buleLine"></view>
				<view class="blackText" style="width: 15%;margin-left: 2%;">车牌号</view>
				<view class="blackText" style="color: #5A7EFF;">审核未通过</view>
			</view>
		</view>
		<view class="flexBox">
			<view style="width: 50%;" class="flexBox">
				<image style="width: 40rpx;height: 40rpx;" :src="$util.fileUrl('/km.png')" mode=""></image>
				<view style="color: #5A7EFF;margin-left: 10rpx;">当前里程</view>
			</view>
			<view style="width: 50%;" class="flexBox">
				<image style="width: 40rpx;height: 40rpx;" :src="$util.fileUrl('/you.png')" mode=""></image>
				<view style="color: #5A7EFF;margin-left: 10rpx;">当前油量</view>
			</view>
		</view>
		<!-- 数值 -->
		<view class="flexBox">
			<view class="flexBox" style="width: 50%;">
				<view style="font-size: 50rpx;font-weight: bold;">36900</view>
				<view style="margin: 10rpx 0rpx 0rpx 10rpx;">km ></view>
			</view>
			<view class="flexBox" style="width: 50%;">
				<view style="font-size: 50rpx;font-weight: bold;">2</view>
				<view style="margin: 10rpx 0rpx 0rpx 10rpx;">/5 ></view>
			</view>
		</view>

		<!-- 各项信息详情 -->
		<view v-for="(item,index) in list" class="">
			<view class="grayLine"></view>
			<view class="flexBox" style="padding: 10rpx 0rpx 30rpx 0rpx;">
				<view class="blackText" style="width: 79%;">{{item.name}}</view>
				<view class="ok">确认完好</view>
				<image style="width: 32rpx;height: 16rpx;margin-left: 10rpx;" :src="$util.fileUrl('/xiangshang.png')"
					mode=""></image>
			</view>

			<view class="">
				<view class="line"></view>
				<view class="flexBox" v-for="(itemy,index) in item.item" :key='index'>
					<view class="blackText">{{itemy.name}}<text class="garyText">({{itemy.ohterName}})</text> </view>
					<view v-if='itemy.status===""' style="display: flex;align-items: center;width: 29%;">
						<view class="selectOk">完好</view>
						<view class="selectNo">损坏</view>
					</view>
					<view v-if="itemy.status===0" style="display: flex;align-items: center;width: 29%;">
						<view class="statusOk">完好</view>
						<view class="selectNo">损坏</view>
					</view>
					<view v-if="itemy.status===1" style="display: flex;align-items: center;width: 29%;">
						<view class="selectOk">完好</view>
						<view class="lookImg">查看图片</view>
					</view>

				</view>
			</view>
		</view>

		<view class="grayLine"></view>

		<view class="flexBox">
			<view class="blackText" style="width: 10%;">备注</view>
			<view class="garyText">请添加备注&上传车辆其他的照片</view>
		</view>
		<textarea value="" placeholder="请输入备注信息"
			style="padding: 20rpx;width: 90%;margin: auto;background-color: #EFF0F3;height:220rpx;border-radius: 20rpx;margin-top: 30rpx;" />

		<view style="width: 90%;margin: auto;padding-bottom: 20rpx;border-bottom: 2rpx solid #EFF0F3;">
			<view style="display: inline-block;width: 22%;margin: 20rpx 1%;position: relative;"
				v-for="(item,index) in imgList">
				<view v-if="index==(imgList.length-1)">
					<image style="width:160rpx;height:160rpx;" :src="$util.fileUrl('/guanxi.png')" mode=""></image>
				</view>
				<view v-else>
					<image style="width:160rpx;height:160rpx;" :src="$util.fileUrl('/guanxi.png')" mode=""></image>
					<image style="width:36rpx;height:36rpx;position: absolute;top:-10rpx;right: -10rpx;"
						:src="$util.fileUrl('/lancha.png')" mode=""></image>
				</view>
			</view>
		</view>

		<button style=" color: white;
			width: 80%;
					margin: 20rpx auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;" type="default">完成</button>

		<!-- 里程弹窗 -->
		<view class="Mask" v-show="mileage==true"></view>
		<view class="box1" v-show="mileage==true">
			<view class="blackText">当前里程数</view>
			<input type="text" value="" placeholder="请输入里程数"
				style="background-color: #EFF0F3;height:74rpx;width: 100%;border-radius: 10rpx;padding-left: 20rpx;margin-top: 20rpx;" />
			<view class="flexBox" style="width: 100%;">
				<view class="lanbox">取消</view>
				<view class="lanbox1" style="margin-left: 57%;">确定</view>
			</view>
		</view>
		<!-- 油量弹窗 -->
		<view class="Mask" v-show="Oil==true"></view>
		<view class="box1" v-show="Oil==true">
			<view class="blackText">当前油量</view>
			<slider value="5" @change="sliderChange" backgroundColor="#EFF0F3" block-size="16"
				:activeColor="sliderColor" step="0.5" min="0" max="10" show-value />
			<view class="flexBox" style="width: 100%;">
				<view class="lanbox">取消</view>
				<view class="lanbox1" style="margin-left: 57%;">确定</view>
			</view>
		</view>

		<!--  -->
		<view class="Mask" v-show="imgshow==true"></view>
		<view class="box1" v-show="imgshow==true">
			<view class="blackText">请上传图片</view>
			<image style="width:80%;height:350rpx;margin-left: 10%;margin-top: 30rpx;" :src="$util.fileUrl('/guanxi.png')" mode=""></image>
			<view class="flexBox" style="width: 100%;">
				<view class="lanbox">取消</view>
				<view class="lanbox1" style="margin-left: 57%;">确定</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '外观',
					item: [{
						name: '前部',
						ohterName: '前杠/机盖',
						status: ""
					}, {
						name: '中部',
						ohterName: '前后翼子板/车门',
						status: 0
					}, {
						name: '后部',
						ohterName: '后杠/后备箱盖',
						status: 1
					}]
				}, {
					name: '车身配件',
					item: [{
						name: '后视镜/雨刮器',
						ohterName: '',
						status: ""
					}, {
						name: '轮胎/轮圈',
						ohterName: '',
						status: 0
					}, {
						name: '车灯',
						ohterName: '前后大灯/转向灯/雾灯',
						status: 1
					}]
				}],

				imgList: [1, 1, 1, 1],
				sliderColor: '#5A7EFF',
				mileage: false,
				Oil: false,
				imgshow: false,
			}
		},
		methods: {
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
</style>
