<template>
	<view class="">
		<view class="topNav" v-if="search==false">
			<view class="add" @click="add">新增+</view>
			<view class="title" @click="select">筛选</view>
			<image style="height:25rpx;width: 35rpx;margin-right: 30rpx;" :src="$util.fileUrl('/xiangxia.png')" mode="">
			</image>
			<view class="title" @click="showSearch">搜索</view>
			<image style="height: 28rpx;width: 28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode="" @click="showSearch"></image>
		</view>
		
		<!-- 搜索 -->
		<view class="topNav" style="color: #8E8E93;font-size: 30rpx" v-if="search==true">
			<input type="text" placeholder="请输入送车点" style="background-color:#EFF0F3;height: 70rpx;width: 580rpx;border-radius: 50rpx;padding-left: 20rpx;" value="" />
			<view style="margin-left: 20rpx;"  @click="showSearch">取消</view>
		</view>
		
		<!-- 弹框 -->
		<view class="Mask" v-if="selectShow==true"></view>
		<view class="popBox" v-if="selectShow==true">
			<view class="topNav" style="margin-bottom: 0rpx;">
				<view class="add" >新增+</view>
				<view class="title" @click="select">筛选</view>
				<image style="height:25rpx;width: 35rpx;margin-right: 30rpx;" :src="$util.fileUrl('/xiangxia.png')"
					mode=""></image>
				<view class="title">搜索</view>
				<image style="height: 28rpx;width: 28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode=""></image>
			</view>

			<view class="popTitle">
				<view class="title" style="width: 20%;text-align: center;margin-right: 0rpx;">城市</view>
				<view class="bankLine" style="margin-left: 0rpx;"></view>
				<view class="title" style="padding-left: 20rpx;">区域</view>
			</view>
			<view class="place">
				<view class="leftBox">
					<view class="" v-for="(item,index) in 7" :key="index" class="leftItem">重庆</view>
				</view>
				<view class="rightBox">
					<view class="" v-for="(item,index) in 7" :key="index" class="rightItem">重庆</view>
				</view>
			</view>
			<view class="buttonBox">
				<view class="empty">清空</view>
				<view class="sure">确定</view>
			</view>
		</view>
		
		<!-- 列表 -->
		<view v-for="(item,index) in 5" class="listBox" @click="lookinfo">
			<view class="place">
				<view class="title">江北区</view>
				<view class="bankLine"></view>
				<view class="title">滨江路皇冠大道送车点</view>
			</view>
			<view style="color: #B2B2B2;font-size: 24rpx;margin-top: 10rpx;">这里是送车点地址</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectShow:false,
				search:false
			}
		},
		methods: {
			select(){
				if(this.selectShow){
					
					this.selectShow=false
				}else{
					this.selectShow=true
				}
			},
			showSearch(){
				
				if(this.search){
					this.search=false
					
				}else{
					this.search=true
					this.showStuse=false
				}
			},
			add(){
				uni.navigateTo({
					url:'./addPoint', 
					animationType:'pop-in',
					animationDuration:200,
				})
			},
			lookinfo(){
				uni.navigateTo({
					url:'./pointInfo', 
					animationType:'pop-in',
					animationDuration:200,
				})
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
