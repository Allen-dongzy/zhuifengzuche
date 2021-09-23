<template>
	<view class="">
		<view class="box">
			<view class="title">记录日期</view>
			<view class="selectBox">
				<view style="width: 90%;">
					<picker mode="date" :value="enddate" :start="startDate" :end="endDate" @change="endTime">
						<view v-if="!log1" class="pickerText">请选择</view>
						<view v-else class="pickerText">{{enddate}}</view>
					</picker>
				</view>   
				<view style="width:10%;">
					<image style="width:40rpx;height: 20rpx;" :src="$util.fileUrl('/xiangxiahui.png')" mode="aspectFill"></image>
				</view>
			</view>
			<view class="title">事故说明</view>
			<textarea v-model="accidentExplain" placeholder="请填写记录说明"
				style="padding: 20rpx;height:220rpx;width: 100%;background-color: #EFF0F3;border-radius: 20rpx;" />
			<view class="title">添加照片</view>
			<view class="imgbox" v-for="(item,index) in imglist" :key='index'>
				<image style="width:160rpx;height: 160rpx;" :src="item" mode="aspectFill"></image>
				<image style="width:36rpx;height: 36rpx;position:absolute;top: -10rpx;right: -10rpx;"
					:src="$util.fileUrl('/lancha.png')" mode="aspectFill" @click="del(index)"></image>
			</view>
			<view class="imgbox" @click="getImg">
				<image style="width:160rpx;height: 160rpx;" :src="$util.fileUrl('/guanxi.png')" mode="aspectFill"></image>
			</view>
		</view>
		<button style=" color: white;
				width: 90%;
						margin: 30vh auto 0rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" @click="save">保存</button>
	</view>
	</view>
</template>

<script>
	import {
		uploadFiles
	} from '@/apis/oss';
	import{
		insertOther
	}from '@/apis/inspectionVehicle'
	export default {
		data() {
			return {
				enddate: '请选择记录时间',
				log1: false,
				imglist: [],//图片列表
				accidentExplain:'',//事故说明
				id:'',
				
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
			this.id=JSON.parse(e.obj).orderId
			console.log(JSON.parse(e.obj))
			
		for(let i=0;i<JSON.parse(e.obj).accidentVo.length;i++){
			if(JSON.parse(e.obj).accidentVo[i].type==1){
				this.imglist=JSON.parse(JSON.parse(e.obj).accidentVo[i].accidentUrl)
				this.enddate=JSON.parse(e.obj).accidentVo[i].accidentTime
				this.log1=true
				this.accidentExplain=JSON.parse(e.obj).accidentVo[i].accidentExplain
				
			}
		}
			
		},
		methods: {
			getImg(e) {
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //camera 拍照 album 相册
					success: async (res) => {
						console.log(res)
						const [err, rese] = await uploadFiles(res.tempFilePaths);
						if (err) return
						this.imglist = rese

					},
					fail() {
						uni.showToast({
							title: "拍照或引用相册失败",
							duration: 2000
						})
					}
				})
			},
			del(e){
				this.imglist.splice(e,1)
			},
			endTime(e) {  
				this.log1 = true
				this.enddate = e.target.value.replace(/\//g,'-')+' 00:00:00'
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
		async	save(){
			 
				let data={
					accidentTime:this.enddate,
					accidentExplain:this.accidentExplain,
					accidentUrl:JSON.stringify(this.imglist),
					orderId:this.id,
				}
			const [err,res]= await insertOther(data)
				if(err) return
				console.log(res)
				this.$toast("操作成功")
				setTimeout(() => {
					uni.navigateBack({
						delta:1
					})
				}, 800)
			}
		}
	}
</script>

<style>
	.selectBox {
		background-color: #EFF0F3;
		width: 100%;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		color: #999999;
		font-size: 24rpx;
	}

	.pickerText {
		height: 74rpx;
		line-height: 74rpx;
		padding-left: 20rpx;
	}

	.box {
		width: 90%;
		margin: auto;

	}

	.title {
		font-size: 28rpx;
		font-weight: bold;
		padding: 30rpx 0rpx;
	}

	.imgbox {
		position: relative;
		width: 22%;
		display: inline-block;
		margin: 0rpx 20rpx
	}
</style>
