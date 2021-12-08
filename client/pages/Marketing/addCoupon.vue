<template>
	<view>

		<view class="title">优惠券名称</view>
		<view class="idCard">
			<picker class="pickerBox" @change="selectName" :value="couponTitle" :range="nameList" range-key="name">

				<view class="pickerText">{{couponTitle==""?'请选择':couponTitle}}</view>
			</picker>
		</view> 


		<view class="title">使用时间</view>
		<view class="flexBoxContent">
			<view style="width: 40%;">
				<picker mode="date" @change="selectTime" :value="startTime" :start="startDate" :end="currentdate"
					class="pickerBox">

					<view class="pickerText">{{startTime==""?'请选择':startTime}}</view>
				</picker>
			</view>

			<view style="width: 40%;margin-left: 10%;">
				<picker mode="date" @change="selectendTime" :value="endTime" :start="startDate" :end="currentdate"
					class="pickerBox">

					<view class="pickerText">{{endTime==""?'请选择':endTime}}</view>
				</picker>
			</view>
		</view>

		<view class="title">金额</view>

		<view class="flexBoxContent" style="width: 100%;">
			<view style="display: flex;align-items: center;margin-left: 5%;">
				<view style="margin: 0rpx 20rpx;">满</view>
				<view class="flexBoxContent"
					style="width: 45%;background-color:#EFF0F3;margin-top: 0rpx;height: 74rpx;border-radius: 10rpx;padding: 0rpx 10rpx;">
					<input type="text" v-model="maxNum" />
					<view style="color: #999999;">元</view>
				</view>
			</view>

			<view style="display: flex;align-items: center;">
				<view style="margin: 0rpx 20rpx;">减</view>
				<view class="flexBoxContent"
					style="width: 45%;background-color:#EFF0F3;margin-top: 0rpx;height: 74rpx;border-radius: 10rpx;padding: 0rpx 10rpx;">
					<input type="text" v-model="minNum" />
					<view style="color: #999999;">元</view>
				</view>
			</view>
		</view>

		<view class="title">使用对象</view>
		<view class="idCard">
			<picker class="pickerBox" @change="selectObj" :value="userName" :range="useObject" range-key="name">

				<view class="pickerText">{{userName==""?'请选择':userName}}</view>
			</picker>
		</view>

		<view class="title">赠送节点</view>
		<view class="idCard">
			<picker class="pickerBox" @change="selectNode" :value="couponNode" :range="nodeList" range-key="name">

				<view class="pickerText">{{couponNode==""?'请选择':couponNode}}</view>
			</picker>
		</view> 

		<view class="flexBoxContent">
			<view style="margin-right: 70%;">状态</view>
			<switch class="switch" :checked="status===1" @change="deliveryOnOrOffButton" />
		</view>
		


		<view class="sure" @click="sure()">确定</view>


	</view>
</template>

<script>
	import {
		queryAll
	} from '@/apis/vehicleModel'
	import {
		uploadFiles
	} from '@/apis/oss';

	import {
		couponAdd,
		couponinfo,
		couponNodeList,
		userVip
	} from '@/apis/marketing'



	export default {
		data() {
			return {
				nameList: [{
					name: '新人优惠',
					id: 0
				}, {
					name: '评价优惠',
					id: 1
				}, {
					name: '节日优惠',
					id: 2
				}],
				useObject: [],
				nodeList: [],
				couponTitle: '',//优惠券名称
				userName:'',//使用对象
				userNameid:'',//使用对象id
				couponNode:'',//数据节点
				couponNodeid:'',//数据节点id
				startTime: '',
				endTime: '',
				maxNum:'',//满多少
				minNum:'',//减多少
				status:'',//状态
				type:"",//1是新增 2是编辑
				id:'',//数据id

			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(e) {
			console.log(e)
			this.getnodelist()
			this.getuserlist()
			this.type=e.type
			if(e.type==1){
				
			}else{
				this.type=e.type
				this.id=e.id
				this.getInfo(e.id)
			}
		},
		mounted() {

		},
		methods: {
			//获取详情
			async getInfo(e) {
				const [err, res] = await couponinfo(e)
				if (err) return
				console.log(res)
				
				 this.couponNodeid=res.data.couponNodeId
				 this.couponTitle=res.data.couponTitle
				 this.startTime=res.data.openTime.substring(0,10)
				 this.endTime=res.data.closeTime.substring(0,10)
				 this.maxNum=res.data.minPoint
				 this.minNum=res.data.discountAmount
				 this.userName=res.data.userObject
				 this.couponNode=res.data.couponNode
				 this.status=res.data.isEnable
				 this.userNameid=res.data.userObjectId
					
			},
			//获取节点
			async getnodelist(e) {
				const [err, res] = await couponNodeList()
				if (err) return
				console.log(res) 
				this.nodeList=res.data
					
			},
			//获取使用对象
			async getuserlist(e) {
				const [err, res] = await userVip()
				if (err) return
				console.log(res) 
				this.useObject=res.data
					
			},
			
			//获取时间
			getDate() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (day >= 0 && day <= 9) {
					day = "0" + day;
				}
				this.currentdate = year + seperator1 + month + seperator1 + day;
				return this.currentdate;
			},

			selectName(e) {
				console.log(e.target.value)
				this.couponTitle = this.nameList[e.target.value].name

			},
			selectObj(e) {
				console.log(e.target.value)
				this.userName = this.useObject[e.target.value].name
				this.userNameid=this.useObject[e.target.value].id
			
			},
			selectNode(e) {
				console.log(e.target.value)
				this.couponNode = this.nodeList[e.target.value].name
				this.couponNodeid = this.nodeList[e.target.value].id
				
			},
			selectTime(e) {
				console.log(e.target.value)
				if (e.target.value.indexOf("/") != -1) {
					e.target.value = e.target.value.replace(/\//g, '-');
					this.startTime = e.target.value
				} else {
					this.startTime = e.target.value
				}
			},
			selectendTime(e) {
				console.log(e.target.value)
				if (e.target.value.indexOf("/") != -1) {
					e.target.value = e.target.value.replace(/\//g, '-');
					this.endTime = e.target.value
				} else {
					this.endTime = e.target.value
				}
			},
			// 开启/关闭送车点
			 deliveryOnOrOffButton(e) {
			
				this.status = e.target.value
		

			
			},
			//确定
			async sure() {
			if(this.type==1){
			if(this.status){
				this.status=1
			}else{
				this.status=0
			}
				var data = {
					couponTitle: this.couponTitle,
					openTime: this.startTime+" 00:00:00",
					closeTime: this.endTime+" 00:00:00",
					minPoint:this.maxNum,
					discountAmount:this.minNum,	
					userObject: this.userName,
					userObjectId:this.userNameid,
					couponNode:this.couponNode,
					couponNodeId:this.couponNodeid,
					isEnable:this.status
				}
			}else{
				var data = {
					id:this.id,
					couponTitle: this.couponTitle,
					openTime: this.startTime+" 00:00:00",
					closeTime: this.endTime+" 00:00:00",
					minPoint:this.maxNum,
					discountAmount:this.minNum,	
					userObject: this.userName,
					userObjectId:this.userNameid,
					couponNode:this.couponNode,
					couponNodeId:this.couponNodeid,
					isEnable:this.status
				}
			}
				const [err, res] = await couponAdd(data)
				if (err) return
				console.log(res)
				this.$toast('添加成功')
		
			}
		}
	}
</script>

<style>
	.flexBoxContent {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
	}

	.pickerBox {
		background-color: #EFF0F3;
		color: #999999;
		font-size: 24rpx;
		height: 74rpx;
		border-radius: 10rpx;
	}

	.selectBox {
		background-color: #EFF0F3;
		width: 70%;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		margin-left: 5%;
		color: #999999;
		font-size: 24rpx;
	}

	.pickerText {
		height: 74rpx;
		line-height: 74rpx;
		padding-left: 20rpx;
		background-color: #EFF0F3;
	}

	.inpBox {
		background-color: #EFF0F3;
		width: 100%;
		border-radius: 10rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 24rpx;
		padding-left: 20rpx;
	}




	.title {
		color: black;
		font-size: 28rpx;
		margin-top: 40rpx;
		margin-left: 32rpx;
	}

	.idCard {
		width: 90%;
		margin: auto;
		padding-top: 20rpx;
	}

	.sure {
		background-color: #5A7EFF;
		color: white;
		font-size: 28rpx;
		text-align: center;
		height: 90rpx;
		line-height: 70rpx;
		padding: 10rpx 20rpx;
		width: 90%;
		border-radius: 50rpx;
		margin-left: 5%;
		margin-top: 100rpx;
	}
	.delText{
		text-align: center;
		width: 21%;
		margin: auto;
		margin-top: 20rpx;
		color: #FC3736;
		border-bottom: 1px solid #FC3736;
	}
</style>
