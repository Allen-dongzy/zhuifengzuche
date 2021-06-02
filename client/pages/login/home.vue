<template>
	<view class="content">
		<image class="loginBox" src="../../static/img/logo.png"></image>
		<view class="contentBox">
			<view class="">
				<image style="width: 204rpx;height: 204rpx;" src="../../static/img/logo2.png" mode=""></image>
			</view>
			<view style="width: 70%;">
				<view class="title">欢迎入驻追风租车</view>
				<view class="contentText">加盟热线：400-62000005</view>
			</view>
		</view>
		<view class="iconBox">
			<view v-for="(item,index) in imgList" :key="inex" class="listBox">
				<view class="">
					<image style="width:80rpx;height: 80rpx;" :src="item.img" mode=""></image>
				</view>
				<view class="">{{item.title}}</view>
			</view>
		</view>
	
			<view class="reg" @click="goreg">注册</view>
			<view class="login" @click="gologin">登录</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				imgList: [{
					img: '../../static/img/icon1.png',
					title: '免费加盟'
				}, {
					img: '../../static/img/icon2.png',
					title: '便捷操作'
				}, {
					img: '../../static/img/icon3.png',
					title: '车辆管理'
				}, {
					img: '../../static/img/icon4.png',
					title: '订单管理'
				}, {
					img: '../../static/img/icon5.png',
					title: '风控管理'
				}, ]
			}
		},
		onLoad() {

		},
		methods: {
			goreg(){
				uni.navigateTo({
					url:'./regSelect',
					animationType: 'pop-in',
					animationDuration: 200
					
				})
			},
			gologin(){
				uni.navigateTo({
					url:'./login',
					animationType: 'pop-in',
					animationDuration: 200
					
				})
			},
		}
	}
</script>

<style lang="scss">
	.loginBox{
	width: 224rpx;height:96rpx;margin-left: 32rpx;	
	}
	.content {
		background-color: #5A7EFF;
		height: 100vh;
		width: 100%;
	}

	.contentBox {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20vh;
	}

	.title {
		font-size: 40rpx;
		color: #FFFFFF;
		letter-spacing: 15rpx;
		padding: 8rpx 0rpx;
	}

	.contentText {
		color: white;
		font-size: 32rpx;
		letter-spacing: 5rpx;
		padding: 8rpx 0rpx;
	}

	.iconBox {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.listBox {
		text-align: center;
		padding: 0px 8rpx;
		margin-top: 48rpx;
		color: white;
	}
	.reg{
		border:2rpx solid white;
		 height: 96rpx;
		 width: 40%;
		 border-radius: 45rpx;
		 display: inline-block;
		 text-align: center;
		 line-height: 96rpx;
		 font-size: 32rpx;
		 margin: 0px 5%;
		 color: white;
		     margin-top: 28vh;
	}
	.login{
		 height: 96rpx;
		 width: 40%;
		 background-color: white;
		 border-radius: 45rpx;
		  display: inline-block;
		  text-align: center;
		  line-height: 96rpx;
		  font-size: 32rpx;
		   margin: 0px 5%;
		  color: #5A7EFF;
	}
</style>
