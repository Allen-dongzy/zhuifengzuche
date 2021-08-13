<template>
	<view class="">

		<view class="">
			<view class="titleText">姓名</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input v-model="name" class="setInp"
					placeholder="请输入姓名" type="text" /> </view>
		</view>
		<view class="">
			<view class="titleText">手机号</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input v-model="phone" class="setInp"
					placeholder="请输入手机号" type="text" /> </view>
		</view>
		<view class="">
			<view class="titleText">密码</view>
			<view class="moreInpbox">
				<view style="width: 90%;"><input v-model="password" :type="inpType" class="inpBox" style="width: 95%;"
						placeholder="请填写密码" /></view>
				<image v-if="showpass==false" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/kai.png')"
					mode="aspectFill" @click="look"></image>
				<image v-if="showpass==true" style="height: 40rpx;width: 40rpx;" :src="$util.fileUrl('/guan.png')"
					mode="aspectFill" @click="look"></image>

			</view>
		</view>

		<view v-for="(item,index) in list" :key="index"
			style="border-bottom: 2rpx solid #EFF0F3;width: 90%;margin: auto;margin-top: 40rpx;">
			<view class="contentFlex">
				<view class="blueLine"></view>
				<view class="title" style="width:72%;">{{item.title}}</view>
				<image style="height: 32rpx;width: 32rpx;" v-if="item.stuse==1" :src="$util.fileUrl('/quanxian1.png')"
					@click="setlook1" mode="aspectFill"></image>
				<image style="height: 32rpx;width: 32rpx;" v-else :src="$util.fileUrl('/quanxian2.png')"
					@click="setlook1" mode="aspectFill"></image>
				<view class="title">查看</view>
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

		<view style="display: flex;justify-content: center;align-items: center;margin-top: 60rpx;font-size: 32rpx;">
			<view class="del">删除员工</view>
			<view class="changge" @click="sure">修改</view>
		</view>




	</view>
</template>

<script>
	import {
		addEmployee
	} from '@/apis/admin'

	import {
		treeList
	} from '@/apis/shop'
	export default {
		data() {
			return {
				showpass: true, //密码眼睛切换 false 关闭  true开启
				inpType: '',
				//stuse:0是没有选中 1是选中
				list: [],
				name: "",
				phone: "",
				password: '',
				selectId: [],
				id:''
			}
		},
		onLoad(e) {
			console.log(e)
			this.id=e.id
			this.treeList()
		},
		methods: {
			async treeList() {
				const [err, res] = await treeList()
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
				console.log(this.password)
				console.log(Array.from(new Set(this.selectId)))
				this.selectId=Array.from(new Set(this.selectId))
				var data={
					realName:this.name,
					phone:this.phone,
					password:this.password,
					menuIds:this.selectId,
					shopId:this.id
				}
			const [err,res] = await addEmployee(data)
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
		width: 90%;
		margin: auto;
		height: 120rpx;
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

	.titleText {
		font-size: 28rpx;
		color: #000000;
		width: 90%;
		margin: 20rpx auto;
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

	.title {
		font-size: 28rpx;
		color: #000000;
		margin-left: 20rpx;

	}

	.setInp {
		background-color: #EFF0F3;
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
		padding-left: 20rpx;
		font-size: 24rpx;
	}

	.del {
		border: 2rpx solid #5A7EFF;
		color: #5A7EFF;
		height: 96rpx;
		line-height: 96rpx;
		padding: 0rpx 40rpx;
		border-radius: 50rpx;
		margin: 0rpx 5%;
		width: 600rpx;
		text-align: center;
	}

	.changge {
		color: white;
		height: 96rpx;
		line-height: 96rpx;
		padding: 0rpx 40rpx;
		border-radius: 50rpx;
		background-color: #5A7EFF;
		margin: 0rpx 5%;
		width: 600rpx;
		text-align: center;
	}
</style>
