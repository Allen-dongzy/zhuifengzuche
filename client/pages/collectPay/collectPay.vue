<template>
	<view class="">
		<view class="flexBox">
			<view v-for="(item,index) in tabList" :key="index" style="width: 25%;" @click="selectOne(index)">
				<view v-if="item.stuse==0" class="titleBox">{{item.name}}</view>
				<view v-else class="actitleBox">{{item.name}}</view>
			</view>
		</view>
		<!-- 收款 -->
		<view v-if="type==0">
			<view class="content" v-for="(item,index) in orderList" :key="index"
				@click="$open('/pages/collectPay/collectPayBack',{obj:JSON.stringify(item)})">
				<view class="contenBox" style="border-bottom: 2rpx dashed    #EFF0F3 ;">
					<view class="carNum">{{item.carNumber}}</view>
					<view class="price" style="border-bottom: 0rpx;text-align: right;">¥{{item.money}}</view>
				</view>
				<view class="contentBottom">
					<image class="xiangmuIcon" :src="$util.fileUrl('/xiangmu.png')" mode=""></image>
					<view style="font-size: 24rpx;color: #C0C0C0;">{{item.projectName}}</view>
					<image class="timeIcon" :src="$util.fileUrl('/time.png')" mode=""></image>
					<view class="time">{{item.createTime.slice(0,10)}}</view>
				</view>
			</view>
		</view>
		<!-- 付款 -->
		<view v-if="type==1">
			<view class="content" v-for="(item,index) in orderList" :key="index"
				@click="$open('/pages/collectPay/collectPayGo',{obj:JSON.stringify(item)})">
				<view class="contenBox">
					<view class="carNum">{{item.carNumber}}</view>
					<view v-if="item.examineStatus==0" class="orderType" style="color:#5A7EFF;">待确认</view>
					<view v-if="item.examineStatus==1" class="orderType" style="color:#FFA05B;">已支付</view>
					<view v-if="item.examineStatus==2" class="orderType" style="color:#FFA05B;">审核中</view>
					<view v-if="item.examineStatus==3" class="orderType" style="color:#FC3736;">未通过</view>
				</view>
				<view class="price">¥{{item.money}}</view>
				<view class="contentBottom">
					<image class="xiangmuIcon" :src="$util.fileUrl('/xiangmu.png')" mode=""></image>
					<view style="font-size: 24rpx;color: #C0C0C0;">{{item.projectName}}</view>
					<image class="timeIcon" :src="$util.fileUrl('/time.png')" mode=""></image>
					<view class="time">{{item.createTime.slice(0,10)}}</view>
				</view>
			</view>
		</view>
		<!-- 已收款 -->
		<view v-if="type==2">
			<view class="content" v-for="(item,index) in orderList" :key="index"
				@click="$open('/pages/collectPay/collectPayBacked')">
				<view class="contenBox" style="border-bottom: 2rpx dashed    #EFF0F3 ;">
					<view class="carNum">{{item.carNumber}}</view>
					<view class="price" style="border-bottom: 0rpx;text-align: right;">¥{{item.money}}</view>
				</view>
				<view class="contentBottom">
					<image class="xiangmuIcon" :src="$util.fileUrl('/xiangmu.png')" mode=""></image>
					<view style="font-size: 24rpx;color: #C0C0C0;">{{item.projectName}}</view>
					<image class="timeIcon" :src="$util.fileUrl('/time.png')" mode=""></image>
					<view class="time">{{item.createTime}}</view>
				</view>
			</view>
		</view>

		<!--已付款 -->
		<view v-if="type==3">
			<view class="content" v-for="(item,index) in orderList" :key="index"
				@click="$open('/pages/collectPay/collectPayGoed',{obj:JSON.stringify(item)})">
				<view class="contenBox">
					<view class="carNum">{{item.carNumber}}</view>
					<view class="orderType" style="color:#5A7EFF;">支付成功</view>
				</view>
				<view class="price">¥{{item.money}}</view>
				<view class="contentBottom">
					<image class="xiangmuIcon" :src="$util.fileUrl('/xiangmu.png')" mode=""></image>
					<view style="font-size: 24rpx;color: #C0C0C0;">{{item.projectName}}</view>
					<image class="timeIcon" :src="$util.fileUrl('/time.png')" mode=""></image>
					<view class="time">{{item.createTime.slice(0,10)}}</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import {
		receiptPaymentPageQuery
	} from '@/apis/receiptPayment'
	import {
		listManager
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				tabList: [{
					name: '收款',
					stuse: '1'
				}, {
					name: '付款',
					stuse: '0'
				}, {
					name: '已收款',
					stuse: '0'
				}, {
					name: '已付款',
					stuse: '0'
				}],
				type: 0, // tab类型
				orderList: [],
				list: [],
				page: 1,
				size: 10,
				requestKey: true,
				dataStatus: ''
			}
		},
		onLoad() {
			this.receiptPaymentPageQuery()
		},
		methods: {
			selectOne(e) {
				for (let i = 0; i < this.tabList.length; i++) {
					this.tabList[i].stuse = 0
				}
				this.tabList[e].stuse = 1
				this.type = e
				this.orderList=[]
				this.receiptPaymentPageQuery()
			},
			// 获取收付款
			async receiptPaymentPageQuery() {
				const params = {
					page: this.page,
					size: this.size,
					transactionType: this.type
				}
				this.dataStatus = 'loading'
				const [err, res] = await receiptPaymentPageQuery(params)
				console.log(res)
				console.log(err)
				if (err) {
					this.dataStatus = 'noData'
					return
				}
				this.orderList=res.data.list
				// listManager()
			}
		}
	}
</script>

<style>
	.flexBox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;

	}

	.titleBox {
		text-align: center;
		padding: 20rpx 0rpx;
		font-size: 28rpx;
		color: #999999;
	}

	.actitleBox {
		text-align: center;
		border-bottom: 2rpx solid #5A7EFF;
		padding: 20rpx 0rpx;
		font-size: 28rpx;
		color: #5A7EFF;
	}

	.contenBox {
		display: flex;
		align-items: center;
		width: 84%;
		margin: auto;
		margin-top: 30rpx;
	}

	.content {
		width: 90%;
		margin: auto;
		border: 2rpx solid rgba(114, 141, 244, 0.25);
		border-radius: 20rpx;
		margin-top: 30rpx;
	}

	.carNum {
		font-size: 28rpx;
		color: #000000;
		width: 50%;
		text-align: left;
	}

	.orderType {
		font-size: 24rpx;
		width: 50%;
		text-align: right;
	}

	.price {
		height: 90rpx;
		line-height: 90rpx;
		width: 84%;
		margin: auto;
		border-bottom: 2rpx dashed #EFF0F3;
		font-size: 32rpx;
		color: #FC3736;

	}

	.contentBottom {
		display: flex;
		align-items: center;
		width: 84%;
		margin: auto;
		height: 120rpx;
	}

	.time {
		margin-left: 20rpx;
		font-size: 24rpx;
		color: #000000;
	}

	.timeIcon {
		height: 22rpx;
		width: 22rpx;
		margin-left: 42%;
	}

	.xiangmuIcon {
		height: 22rpx;
		width: 22rpx;
		margin-right: 20rpx;
	}
</style>
