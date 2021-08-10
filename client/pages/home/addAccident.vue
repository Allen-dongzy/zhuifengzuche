<template>
	<view class="">
		<view class="box">
			<view class="title">事故类型</view>
			<view class="flexBox" style="padding: 0rpx;">
				<view v-for="(item,index) in list" class="flexBox" style="margin-right: 10%;" @click="select(index)">
					<image v-show="item.status==true" style="width: 32rpx;height: 32rpx;margin-left: 5rpx;" :src="$util.fileUrl('/quanxian1.png')"  mode="aspectFill"></image>
					<image v-show="item.status==false" style="width: 32rpx;height: 32rpx;margin-left: 5rpx;" :src="$util.fileUrl('/quanxian2.png')"  mode="aspectFill"></image>
					<view style="margin-left: 10rpx;">{{item.name}}</view>
				</view>
			</view>
			
			<view class="title">事故日期</view>
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
			
			<view style="padding: 30rpx 0rpx;">
				<view class="blackText" style="padding: 0rpx 0rpx 20rpx 0rpx;">事故说明</view>
				<textarea v-model="reason" placeholder="这里是备注信息" style="padding: 20rpx;background-color:#EFF0F3;height:144rpx;width: 100%;border-radius: 10rpx;" />
			</view>
			
			<view class="title" >添加照片</view>
			<view class="imgbox" v-for="(item,index) in imglist" :key='index'>
				<image style="width:160rpx;height: 160rpx;" :src="item" mode="aspectFill"></image>
				<image style="width:36rpx;height: 36rpx;position:absolute;top: -10rpx;right: -10rpx;"
					:src="$util.fileUrl('/lancha.png')" mode="aspectFill" @click="del(index)"></image>
			</view>
			<view class="imgbox" @click="getImg">
				<image style="width:160rpx;height: 160rpx;" :src="$util.fileUrl('/guanxi.png')" mode="aspectFill"></image>
			</view>
			
		</view>
		
		<button  style=" color: white;
				width: 90%;
						margin: 30vh auto 0rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" @click="save" >保存</button>
	</view>
</template>

<script>
	import {
		uploadFiles
	} from '@/apis/oss';
	import{
		insertAccident
	}from '@/apis/inspectionVehicle'
	
	export default {
		data() {
			return {
				list:[{status:false,name:'轻微'},{status:false,name:'中等'},{status:false,name:'严重'}],
				enddate: '请选择',
				log1:false ,
				reason:'',//事故说明
				selectId:'',
				imglist:[] 
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
				if(JSON.parse(e.obj).accidentVo[i].type==0){
					this.imglist=JSON.parse(JSON.parse(e.obj).accidentVo[i].accidentUrl)
					this.enddate=JSON.parse(e.obj).accidentVo[i].accidentTime
					this.log1=true
					this.reason=JSON.parse(e.obj).accidentVo[i].accidentExplain
					this.list[JSON.parse(e.obj).accidentVo[i].level].status=true
					this.selectId=JSON.parse(e.obj).accidentVo[i].level
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
			select(e){
				for(var i=0;i<this.list.length;i++){
				this.list[i].status=false
				}
				this.list[e].status=true
				this.selectId=e
			},
			endTime: function(e) {
				this.log1=true
				this.enddate = e.target.value+' 00:00:00'
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
						level:this.selectId,
						accidentTime:this.enddate,
						accidentExplain:this.reason,
						accidentUrl:JSON.stringify(this.imglist),
						orderId:this.id
					}
				const [err,res]= await insertAccident(data)
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
	
	.flexBox {
		display: flex;
		align-items: center;
		padding: 20rpx 0rpx;
	}
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
	.blackText {
		width: 30%;
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
		text-align: left;
	}
	.imgbox {
		position: relative;
		width: 22%;
		display: inline-block;
		margin: 0rpx 20rpx
	}
</style>
