<template>
	<view class="fleetDetail">
		<view class="flex-center swiperList">
			<swiper class="swiper" indicator-dots :indicator-color="indicatorColor"
				:indicator-active-color="indicatorActiveColor">
				<swiper-item class="flex flex-wrap swiperItem">
					<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
				</swiper-item>
				<swiper-item class="flex flex-wrap swiperItem">
					<image :src="$util.fileUrl('/ms2.jpg')" lazy-load></image>
				</swiper-item>
				<swiper-item class="flex flex-wrap swiperItem">
					<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="titlePanel">
			<p class="title">奥迪A3 Sportback 2020年型</p>
			<p class="text">奥迪/自动/5座/2.0L/95#</p>
			<view class="flex flex-wrap">
				<p class="flex-center type">豪华型</p>
				<p class="flex-center type addType">+添加标签</p>
			</view>
			<view class="flex statusPanel">
				<p class="status">状态</p>
				<view class="flex statusText">
					<p>正常</p>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="flex rentPanel" @click="lookinfo">
			<view class="flex">
				<i class="line-blue"></i>
				<p class="title">租赁计划</p>
			</view>
			<view class="flex rentDetail">
				<p>详情</p>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="line"></view>
		<view class="carDetail">
			<view class="flex header">
				<i class="line-blue"></i>
				<p>车辆信息</p>
			</view>
			<view class="content">
				<view class="flex carText">
					<p class="title">车身颜色</p>
					<p class="text">白色</p>
				</view>
				<view class="flex carText">
					<p class="title">当前里程</p>
					<p class="text">5000km</p>
				</view>
				<view class="flex carText">
					<p class="title">当前油量</p>
					<p class="text">45%</p>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="carLicense">
			<view class="flex header">
				<i class="line-blue"></i>
				<p>行驶证</p>
			</view>
			<view class="content">
				<view class="flex carText">
					<p class="title">号牌号码</p>
					<p class="text">DJHIB9526324511545</p>
				</view>
				<view class="flex carText">
					<p class="title">品牌型号</p>
					<p class="text">这里是品牌型号</p>
				</view>
				<view class="flex carText">
					<p class="title">车辆识别码</p>
					<p class="text">DJHIB9526324511545</p>
				</view>
				<view class="flex carText">
					<p class="title">发动机号</p>
					<p class="text">DJHIB9526324511545</p>
				</view>
				<view class="flex carText">
					<p class="title">发证日期</p>
					<p class="text">2021-06-03</p>
				</view>
				<view class="flex carText">
					<p class="title">注册日期</p>
					<p class="text">2021-06-03</p>
				</view>
				<view class="flex flex-wrap carImg">
					<view class="fileImg">
						<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
					</view>
					<view class="fileImg">
						<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
					</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="carJiaoqiang">
			<view class="flex header">
				<i class="line-blue"></i>
				<p>交强险</p>
			</view>
			<view class="content">
				<view class="flex carText">
					<p class="title">单号</p>
					<p class="text">DJHIB9526324511545</p>
				</view>
				<view class="flex carText">
					<p class="title">续保日期</p>
					<p class="text">2021-06-03</p>
				</view>
				<view class="flex flex-wrap carImg">
					<view class="fileImg">
						<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
					</view>
					<view class="fileImg">
						<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
					</view>
					<view class="fileImg">
						<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
					</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="carTrade">
			<view class="flex header">
				<i class="line-blue"></i>
				<p>商业险</p>
			</view>
			<view class="content">
				<view class="flex carText">
					<p class="title">单号</p>
					<p class="text">DJHIB9526324511545</p>
				</view>
				<view class="flex carText">
					<p class="title">续保日期</p>
					<p class="text">2021-06-03</p>
				</view>
				<view class="flex flex-wrap carImg">
					<view class="fileImg">
						<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
					</view>
					<view class="fileImg">
						<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
					</view>
					<view class="fileImg">
						<image :src="$util.fileUrl('/ms.jpg')" lazy-load></image>
					</view>
				</view>
			</view>
		</view>

		<button style=" color: white;
			width: 80%;
					margin: auto;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;margin-top: 40rpx;margin-bottom: 20rpx;" type="default"
			@click="next">编辑</button>
			
	   <!-- 租凭计划弹框 -->
	<!--   <view class="mask" ></view>
	   <view class="frame">
			<view class="carName" >
				<view class="buleLine"> </view>
				<view class="">
					<view style="color: #000000;font-size: 28rpx;font-weight: bold;">租赁计划</view>
				</view>
			</view>
			<view  class="statusBox">
				<view v-for="(item,index) in list" class="frameBox">
					<view class="frameTitle">{{item.name}}</view>
					<view class="frameTime">{{item.time}}</view>
				</view>
			</view>
			<button  style=" color: white;
				width: 80%;
						margin: auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;margin-top: 40rpx;margin-bottom: 20rpx;" type="default" @click="next">预留</button>
	   </view> -->
	   
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorColor: '#DADADA',
				indicatorActiveColor: '#DADADA',
				list:[{name:'租凭中',time:'6月3日 12:00-6月4日 16:00'},{name:'已预订',time:'6月3日 12:00-6月4日 16:00'},{name:'预留',time:'6月3日 12:00-6月4日 16:00'},{name:'客户使用',time:'6月3日 12:00-6月4日 16:00'}]
			}
		},
		methods: {
			lookinfo(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fleetDetail {
		position: relative;

		/**
		 * 更改swiper提示点样式
		 */
		/deep/ .wx-swiper-dot {
			width: 16rpx;
			height: 16rpx;
		}

		/**
		 * 更改swiper提示点选中样式
		 */
		/deep/ .wx-swiper-dot-active {
			width: 32rpx;
			height: 16rpx;
			border-radius: 116rpx;
		}

		/**
		 * 更改swiper提示点位置,通过swiper-item的padding-bottom指定位置
		 */
		/deep/ .swiperIconPanel .wx-swiper-dots {
			bottom: 20rpx;
		}

		.swiperList {
			position: relative;
			width: 100%;

			.swiper {
				width: 100%;
				height: 390rpx;
				box-shadow: 0px 2px 0px 0px #eff0f3;

				.swiperItem {
					box-sizing: border-box;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.titlePanel {
			margin-top: 40rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;

			.title {
				font-size: 32rpx;
				font-weight: 700;
				color: #000000;
			}

			.text {
				font-size: 24rpx;
				font-weight: 400;
				color: #b2b2b2;
				margin-top: 10rpx;
			}

			.type {
				height: 34rpx;
				line-height: 34rpx;
				background: rgba(90, 126, 255, 0.10);
				border-radius: 4rpx;
				font-size: 16rpx;
				font-weight: 700;
				color: #5a7eff;
				letter-spacing: 0rpx;
				margin-top: 20rpx;
				margin-right: 20rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
			}

			.addType {
				background: rgba(90, 126, 255, 0.10);
				color: #999999;
			}

			.statusPanel {
				margin-top: 40rpx;
				padding-bottom: 40rpx;
				justify-content: space-between;

				.status {
					font-size: 32rpx;
					font-weight: 700;
					color: #000000;
				}

				.statusText {

					p {
						font-size: 32rpx;
						font-weight: 700;
						color: #5a7eff;
					}

					.cuIcon-right {
						font-size: 28rpx;
						margin-top: 4rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.line {
			width: 100%;
			height: 20rpx;
			background: #eff0f3;
		}

		.line-blue {
			width: 8rpx;
			height: 24rpx;
			background: #5a7eff;
			border-radius: 20rpx;
		}

		.rentPanel {
			height: 124rpx;
			padding-left: 12rpx;
			padding-right: 32rpx;
			justify-content: space-between;

			.title {
				font-size: 32rpx;
				font-weight: 700;
				color: #000000;
				margin-left: 12rpx;
			}

			.rentDetail {

				p {
					font-size: 32rpx;
					font-weight: 700;
					color: #5a7eff;
				}

				.cuIcon-right {
					font-size: 28rpx;
					margin-top: 4rpx;
					margin-left: 10rpx;
				}
			}
		}

		.carDetail,
		.carLicense,
		.carJiaoqiang,
		.carTrade {
			position: relative;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;

			.header {
				margin-left: -20rpx;

				p {
					font-size: 32rpx;
					font-weight: 700;
					color: #000000;
					margin-left: 12rpx;
				}
			}

			.content {
				margin-top: 40rpx;

				.carText {
					margin-top: 30rpx;
					justify-content: space-between;

					.title {
						font-size: 28rpx;
						font-weight: 400;
						color: #000000;
					}

					.text {
						font-size: 24rpx;
						font-weight: 400;
						color: #b2b2b2;
					}
				}

				.carText:first-child {
					margin-top: 0;
				}

				.carImg {
					margin-top: 40rpx;

					.fileImg {
						width: 160rpx;
						height: 160rpx;
						border-radius: 10rpx;
						overflow: hidden;
						margin-right: 16rpx;
						margin-bottom: 16rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
	
	.buleLine {
		width: 8rpx;
		height: 60rpx;
		background-color: #5A7EFF;
		border-radius: 30rpx;
		margin-right: 16rpx;
	}
	
	.carName {
		display: flex;
		align-items: center;
		color: #B2B2B2;
		font-size: 24rpx;
	}
	.mask{
		background-color: black;
		opacity: 0.7;
		position: fixed;
		    top: 0px;
		height: 100vh;
		width:100%;

	}
	.frame{
		padding: 20rpx;
		position:fixed;
		top:20vh;
		left: 10%;
		width: 80%;
		background-color: white;
		border-radius: 20rpx;
	}
	.frameBox{
		display: flex;
		align-items: center;
	}
	.frameTitle{
		width: 30%;
		color:#000000;
		font-weight: bold;
		font-size: 28rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
	}
	.frameTime{
		color:#B2B2B2 ;
		font-size: 24rpx;
	}
	.statusBox{
		
	}
</style>
