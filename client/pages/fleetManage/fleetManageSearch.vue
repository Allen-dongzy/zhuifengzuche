<template>
	<view class="">
		<view class="topNav">
			<view class="fleetManageSearch">
				<view class="flex searchPanel">
					<view class="flex searchInput">
						<input v-model="carNum" placeholder="请输入车牌号" type="text" class="search" />
						<image style="width:28rpx;height:28rpx;" :src="$util.fileUrl('/fangdajing.png')" mode="aspectFill"></image> 
						<i class="cuIcon-roundclosefill"></i>
					</view>
				</view>
			</view>
			<view class="searchText" @click="search">搜索</view>
		</view>
		<view class="flex-center flex-wrap content">
				<view v-for="(item, index) in list" :key="index" class="panel" @click="carInfo(item.id)">
					<view class="flex titlePanel">
						<p class="title">{{item.carNumber}}</p>
						<p v-if="item.vehicleStatus==1" class="type">正常</p>
						<p v-if="item.vehicleStatus==2" class="type">异常</p>
						<p v-if="item.vehicleStatus==3" class="type">租赁中</p>
						<p v-if="item.vehicleStatus==4" class="type">预留中</p>
					</view>
					<p class="text">{{item.brandName}}丨{{item.gears}} {{item.capacity}}座 {{item.outputVolumeName}}</p>
					<view class="flex detail">
						<p class="oil" v-if="item.oil!=null">油量：62%</p>
						<p class="car">车龄：{{item.carAge}}</p>
					</view>
					<view class="flex-center line" v-if="item.vehicleStatus==3">
						<i></i>
					</view>
					<p class="name" v-if="item.vehicleStatus==3">使用人：张全蛋</p>
					<view class="flex timeText" v-if="item.vehicleStatus>2">
						<text class="cuIcon-countdown"></text>
						<p>05-25 14:48 至 05-30 14:48</p>
					</view>
				</view>
			<view class="loadmore">
				<tui-loadmore v-if="false" :index="2"></tui-loadmore>
				<tui-nomore v-else text="没有更多了"></tui-nomore>
			</view>
		</view>

	</view>





</template>

<script>
	import {
		vehiclePageQuery
	} from '@/apis/vehicle'
	
	export default {
		data() {
			return {
				list:[],
				carNum:'',
				vcarId:''//车型id
			}
		},
		onLoad(e) {
			console.log(e.id==undefined)
			if(e.id==undefined){
					this.getlist()
			}else{
				this.vcarId=e.id
				this.search()
			}
		},
		methods: {
			//获取列表
			async getlist() {
				let data = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await vehiclePageQuery(data)
				if (err) return
				console.log(res)
				this.list = res.data.list
			
			},
		async	search(){
				let data = {
					page: this.page,
					size: this.size,
					searchField:this.carNum,
					vehicleModelId:this.vcarId,
				}
				
				const [err, res] = await vehiclePageQuery(data)
				if (err) return
				console.log(res)
				this.list = res.data.list
			},
			carInfo(e) {
				uni.navigateTo({
					url: './fleetDetail?id=' + e,
					animationDuration: 200,
					animationType: 'pop-in'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topNav {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}

	.fleetManageSearch {
		position: relative;
		width: 70%;


		.searchPanel {
			width: 100%;

			.searchInput {
				position: relative;
				width: 100%;
				height: 64rpx;
			}

			.search {

				background: #eff0f3;
				border-radius: 126rpx;
				padding-left: 50rpx;
				padding-right: 50rpx;
				width: 100%;
				height: 100%;

			}

			.cuIcon-search {
				position: absolute;
				left: 16rpx;
			}

			.cuIcon-roundclosefill {
				position: absolute;
				left: 93%;


			}
		}
	}

	.searchText {
		width: 15%;
		text-align: center;
		color: #8E8E93;
		font-size: 30rpx;
	}

	.content {
		margin-top: 20rpx;

		.panel {
			width: 670rpx;
			min-height: 220rpx;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(114, 141, 244, 0.25);
			padding: 40rpx;
			margin-bottom: 30rpx;

			.titlePanel {
				justify-content: space-between;

				.title {
					font-size: 28rpx;
					font-weight: 700;
					color: #000000;
				}

				.type {
					font-size: 28rpx;
					font-weight: 700;
					color: #5a7eff;
					letter-spacing: 0rpx;
				}
			}

			.text {
				margin-top: 12rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
			}

			.detail {
				margin-top: 20rpx;

				.oil {
					font-size: 24rpx;
					font-weight: 400;
					color: #000000;
					letter-spacing: 0rpx;
					margin-right: 60rpx;
				}

				.car {
					font-size: 24rpx;
					font-weight: 400;
					color: #000000;
					letter-spacing: 0rpx;
					
				}
			}

			.line {
				width: 100%;
				margin-top: 30rpx;

				i {
					width: 590rpx;
					border-bottom: 1rpx dashed #999999;
				}
			}

			.name {
				margin-top: 30rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;
				letter-spacing: 0rpx;
			}

			.timeText {
				margin-top: 10rpx;

				.cuIcon-countdown {
					font-size: 30rpx;
				}

				p {
					margin-left: 10rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #000000;
					letter-spacing: 0rpx;
				}
			}
		}

		.panel:first-child {
			margin-top: 10rpx;
		}
	}
</style>
