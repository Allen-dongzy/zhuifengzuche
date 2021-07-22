<template>
	<view class="">
		<view class="flexBox" style="width: 90%;margin: auto;">
			<view class="blueLine"></view>
			<view style="margin-left: 10rpx;">{{obj.areaName}}</view>
		</view>
		<view style="width: 90%;margin: auto;margin-top: 20rpx;">
			<view class="name">{{obj.name}}</view>
			<view class="flexBox" style="margin-top: 10rpx;">
				<view style="color: #B2B2B2;font-size: 24rpx;width: 90%;">{{obj.address}}</view>
				<image style="width:32rpx;height: 32rpx;" :src="$util.fileUrl('/map.png')" mode="" @click="mapSelect">
				</image>
			</view>
			<view style="font-size: 28rpx;padding: 20rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">
				车辆整备费：￥{{obj.commission}}</view>
			<view v-if="obj.isTraffic==1"
				style="font-size: 28rpx;padding: 20rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">交通枢纽：是</view>
			<view v-else style="font-size: 28rpx;padding: 20rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">交通枢纽：否</view>

			<view class="buttonBox">
				<view class="empty" @click="del">删除</view>
				<view class="sure" @click="edit">编辑</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		deliveryDelete
	} from '@/apis/delivery'
	export default {
		data() {
			return {
				obj: '',
			}
		},
		onLoad(e) {
			console.log(JSON.parse(e.obj))
			this.obj = JSON.parse(e.obj)
		},
		methods: {
			async del() {
				
				const [err, res] = await this.$showModal({content:'是否要删除该数据？'})
				if (res === 'confirm'){
					const [err1, res1] = await deliveryDelete({
						id: this.obj.id
					})
					if (err1) true
					uni.navigateBack({
						delta: 1
					})
				}
			},
			edit() {
				uni.navigateTo({
					url: './addPoint?obj=' + JSON.stringify(this.obj)
				})
			},
			mapSelect() {
				// 打开位置
				console.log(1)
				console.log(parseFloat(this.obj.lat))
				console.log(parseFloat(this.obj.lon))

				 uni.openLocation({
				            latitude:parseFloat(this.obj.lat),
				            longitude:parseFloat(this.obj.lon),
				            success: function (e) {
								console.log(e)
				                console.log('success');
				            },
							fail:function(e){
									console.log(e)
							}
				        });

			}
		}
	}
</script>

<style>
	.blueLine {
		background-color: #5A7EFF;
		width: 8rpx;
		height: 24rpx;
	}

	.title {
		color: #000000;
		font-size: 28rpx;
	}

	.flexBox {
		display: flex;
		align-items: center;
	}

	.name {
		font-size: 28rpx;
		color: #000000;

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
		display: flex;
		align-items: center;
		margin-top: 60vh;
	}
</style>
