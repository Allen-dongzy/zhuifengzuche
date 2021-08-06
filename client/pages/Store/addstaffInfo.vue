<template>
	<view class="">
		<view class="flexBox" style="background-color: #EFF0F3;height: 140rpx;width: 100%;">
			<view class="buleLine"></view>
			<view class="navText" style="margin-top: 0rpx;">基本信息</view>
		</view>


		<view style="width: 90%;margin: auto;margin-top: 20rpx;">
			<view class="titleText">姓名</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input v-model="name" class="setInp"
					placeholder="请输入姓名" type="text" /> </view>
		</view>
		<view style="width: 90%;margin: auto;margin-top: 20rpx;">
			<view class="titleText">手机号</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input v-model="phone" class="setInp"
					placeholder="请输入手机号" type="text" /> </view>
		</view>
		<!-- 	<view class="">
		<view class="titleText">密码</view>
		<view class="moreInpbox">
			<view style="width: 90%;"><input v-model="password" :type="inpType" class="inpBox" style="width: 95%;"
					placeholder="请填写密码" /></view>
			<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/kai.png')"
				mode="aspectFill" @click="look"></image>
			<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/guan.png')"
				mode="aspectFill" @click="look"></image>
	
		</view>
	</view> -->

		<view class="garyLine"></view>



		<view v-for="(item,index) in list" :key="index"
			style="border-bottom: 2rpx solid #EFF0F3;width: 90%;margin: auto;margin-top: 40rpx;">
			<view class="contentFlex">
				<view class="blueLine"></view>
				<view class="title" style="width: 72%;">{{item.title}}</view>
				<image style="height: 32rpx;width: 32rpx;" v-if="item.stuse==1" :src="$util.fileUrl('/quanxian1.png')"
					@click="setlook1" mode="aspectFill"></image>
				<image style="height: 32rpx;width: 32rpx;" v-else :src="$util.fileUrl('/quanxian2.png')"
					@click="setlook1" mode="aspectFill"></image>
				<view class="title" style="width: 10%;">查看</view>
			</view>
			<view style="width: 100%;padding: 30rpx 0rpx">
				<view v-for="(itemy,indexy) in item.children" :key="indexy"
					style="display: inline-block;width: 33%;text-align: center;padding: 5rpx 0rpx;">
					<view style="display: flex;align-items: center;">
						<image style="height: 32rpx;width: 32rpx;" v-if="itemy.hasAuthorize==true"
							:src="$util.fileUrl('/quanxian1.png')" @click="selectIndex(itemy.id)" mode="aspectFill"></image>
						<image style="height: 32rpx;width: 32rpx;" v-else :src="$util.fileUrl('/quanxian2.png')"
							@click="selectIndex(itemy.id)" mode="aspectFill"></image>
						<view class="title">{{itemy.title}}</view>
					</view>
				</view>
			</view>
		</view>


		<view class="buttonBox">
			<view class="setnull" @click="clear()">清空</view>
			<view class="sure" @click="sure">确定</view>
		</view>


	</view>
</template>

<script>
	import {
		treeList,
	} from '@/apis/shop'
	
	import {
		editEmployee
	} from '@/apis/admin'
	export default {
		data() {
			return {
				showpass: true, //密码眼睛切换 false 关闭  true开启
				inpType: '', //input 类型
				list: [],
				name: "",
				phone: "",
				selectId: [],
				obj:'',
				id:''
				// password: '',
			}
		},
		onLoad(e) {
			console.log(e)
			this.obj=JSON.parse(e.obj)
			this.name = JSON.parse(e.obj).realName
			this.phone = JSON.parse(e.obj).phone
			this.id=e.id
			// this.password=JSON.parse(e).realName
			this.treeList(JSON.parse(e.obj).id)
		},
		methods: {
			async treeList(e) {
				const [err, res] = await treeList({
					employeeId: e
				})
				if (err) return
				console.log(res)
				this.list = res.data
			},
			look() {
				console.log('ppp')
				if (this.showpass) {
					this.showpass = false
					this.inpType = 'password'
				} else {
					this.showpass = true
					this.inpType = 'number'
				}
			},
			clear(){
				for (let i = 0; i < this.list.length; i++) {
					for (let q = 0; q < this.list[i].children.length; q++) {
						this.list[i].children[q].hasAuthorize=false
					}
				}
				this.name=""
				this.phone=""
			},
			selectIndex(e) {
				for (let i = 0; i < this.list.length; i++) {
					for (let q = 0; q < this.list[i].children.length; q++) {
						if (e == this.list[i].children[q].id) {
							if (this.list[i].children[q].hasAuthorize == false) {
								this.list[i].children[q].hasAuthorize = true
							} else {
								this.list[i].children[q].hasAuthorize = false
							}
						} else {
			
						}
					}
				}
			
			},
			async	sure() {
					for (let i = 0; i < this.list.length; i++) {
						for (let q = 0; q < this.list[i].children.length; q++) {
							if (this.list[i].children[q].hasAuthorize == true) {
								this.selectId.push(this.list[i].children[q].id)
							}
						}
					}
					console.log(this.name)
					console.log(this.phone)
					console.log(Array.from(new Set(this.selectId)))
					this.selectId=Array.from(new Set(this.selectId))
	
					var data={
						id:this.obj.id,
						realName:this.name,
						phone:this.phone,
						menuIds:this.selectId,
						shopId:this.id
					}
				const [err,res] = await editEmployee(data)
					if(err) return
					uni.navigateBack({
						delta:1
					})
				}
		}
	}
</script>

<style>
	.flexBox {
		display: flex;
		align-items: center;

	}

	.buleLine {
		background-color: #5A7EFF;
		width: 6rpx;
		height: 24rpx;
		margin-left: 20rpx;
	}

	.navText {
		color: #000000;
		font-weight: bold;
		font-size: 32rpx;
		margin-left: 20rpx;
	}

	.moreInpbox {
		display: flex;
		align-items: center;
		background-color: #EFF0F3;
		width: 90%;
		margin: auto;
		border-radius: 10rpx;
	}

	.inpBox {
		background-color: #EFF0F3;
		border-radius: 10rpx;
		height: 74rpx;
		width: 90%;
		margin: auto;
		font-size: 24rpx;
		color: #999999;
		padding-left: 20rpx;
	}

	.title {
		font-size: 28rpx;
		color: #000000;
		width: 90%;
		margin: 20rpx auto;
		    text-align: left;
			padding-left: 10rpx;
	}

	.getBox {
		background-color: #EFF0F3;
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
		padding-left: 20rpx;
		font-size: 24rpx;
	}

	.garyLine {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 40rpx;
	}

	.look {
		font-size: 28rpx;
		color: #000000;
		margin-left: 20rpx;

	}

	.blueLine {
		background-color: #5A7EFF;
		width: 8rpx;
		height: 24rpx;
	}

	.contentFlex {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.setnull {
		height: 96rpx;
		width: 300rpx;
		border: 1px solid #B2B2B2;
		color: #B2B2B2;
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

	.buttonBox {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx 0rpx;
	}
	.setInp {
		background-color: #EFF0F3;
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
		padding-left: 20rpx;
		font-size: 24rpx;
	}
</style>
