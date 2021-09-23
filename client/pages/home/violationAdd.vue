<template>
	<view class="">
		<view class="box">
			
			<view class="flexBox" >
				<view class="blackText">违章时间</view>
					<view style="width: 63%;text-align: right;" @click="dateOpen('hopeBeginTime', hopeBeginTime)">
					    <text class="text1" v-if="hopeBeginTime">{{ hopeBeginTime }}</text>
					    <text class="text1 color3" v-else>请选择</text>
					</view>
					<my-datetime ref="dateTimePop" @ok="timeOk"></my-datetime>
					
					<image style="width: 40rpx;height: 40rpx;margin-left: 5rpx;" :src="$util.fileUrl('/daytime.png')" @click="getcarInfo" mode="aspectFill"></image>
			</view>
			<view class="flexBox" >
				<view class="blackText">违章地点</view>
				<input type="text" v-model="place"  placeholder="请输入违章地点" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" >
				<view class="blackText">违章行为</view>
				<input type="text" v-model="behavior"  placeholder="请填写违法行为" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" >
				<view class="blackText">违章机关</view>
				<input type="text" v-model="authority"  placeholder="请填写采集机关" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" >
				<view class="blackText">违章金额</view>
				<input type="text" v-model="amount"  placeholder="请填写处罚金额" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" style="border: 0rpx;">
				<view class="blackText">违章分数</view>
				<input type="text" v-model="score"  placeholder="请填写处罚分数" class="inpBox"  placeholder-style="text-align: right" />
			</view>
		</view>
		<view class="grayLine"></view>
		<view class="box">
			<view class="flexBox" >
				<view class="blackText">单据单号</view>
				<input type="text" v-model="num"  placeholder="请填写单据号码" class="inpBox"  placeholder-style="text-align: right" />
			</view>
			<view class="flexBox" >
				<view class="blackText">单据照片</view>
				<view class="">
					<image style="width: 200rpx;height: 120rpx;margin-left: 5rpx;" :src="imgbox || $util.fileUrl('/guanxi.png')"  @click="getImg()" mode="aspectFill"></image>
				</view>
			</view>
			<view style="padding: 30rpx 0rpx;">
				<view class="blackText" style="padding: 0rpx 0rpx 20rpx 0rpx;">备注</view>
				<textarea v-model="remarks"  placeholder="这里是备注信息" style="padding: 20rpx;background-color:#EFF0F3;height:144rpx;width: 100%;border-radius: 10rpx;" />
			</view>
		</view>
		<button  style=" color: white;
				width: 90%;
						margin: 20rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" @click="next()">提交</button>
	</view>
</template>

<script>
	import myDatetime from '@/components/my-datetime/my-datetime'
	import {uploadFiles} from '@/apis/oss';
	import {breakRulesInsert,breakRulesUpdate}from '@/apis/breakRules'
	export default {
		    components: {
		      'my-datetime': myDatetime
		    },
		data() {
			return {
				  hopeBeginTime: '',
				                dateKey: '',
								
				time:'',
				place:'',
				behavior:'',
				authority:'',
				amount:'',
				score:'',
				num:'',
				remarks:'',
				imgbox:'',
				info:'',
				type:''
			}
		},
		onLoad(e) {
			console.log(e.obj)
			console.log(JSON.parse(e.obj))
			this.type=e.type
			if(e.type==1){
				this.info=JSON.parse(e.obj)
			}else{
				this.info=JSON.parse(e.obj)
				this.hopeBeginTime=JSON.parse(e.obj).rulesTime
				this.place=JSON.parse(e.obj).rulesAddress
				this.behavior=JSON.parse(e.obj).rulesName
				this.authority=JSON.parse(e.obj).gatherOffice
				this.amount=JSON.parse(e.obj).rulesMoney
				this.score=JSON.parse(e.obj).rulesScore
				this.num=JSON.parse(e.obj).rulesNo
				this.remarks=JSON.parse(e.obj).remarks
				this.imgbox=JSON.parse(e.obj).rulesUrls
			}
				
		},
		methods: {
			  // 开启弹窗
			        dateOpen (key, date) {
			            this.dateKey = key
			            this.$refs.dateTimePop.open(date || '');
			        },
			        // 关闭弹窗
			        timeOk (str, obj) {
			            console.log(str, obj)
			            this[this.dateKey] = str || ''
			        },
					
					

	
			getImg(e) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //camera 拍照 album 相册
					success: async (res) => {
						console.log(res)
						const [err, rese] = await uploadFiles([res.tempFilePaths[0]]);
						if (err) return
						console.log(rese)
						this.imgbox=rese[0]
			
					},
					fail() {
						uni.showToast({
							title: "拍照或引用相册失败",
							duration: 2000
						})
					}
				})
			},
		async	next(){
			if(this.type==1){
				let data={
					rulesTime:this.hopeBeginTime,
					rulesAddress:this.place,
					rulesName:this.behavior,
					gatherOffice:this.authority,
					rulesMoney:this.amount,
					rulesScore:this.score,
					rulesNo:this.num,
					remarks:this.remarks,
					rulesUrls:this.imgbox,
					orderId:this.info.id
				}
				const[err,res]=await breakRulesInsert(data)
				if(err) return
				this.$toast('添加成功')
				setTimeout(() => {
				uni.navigateBack({
					delta:1
				})
				}, 800)
			}else{
				let data={
					rulesTime:this.hopeBeginTime,
					rulesAddress:this.place,
					rulesName:this.behavior,
					gatherOffice:this.authority,
					rulesMoney:this.amount,
					rulesScore:this.score,
					rulesNo:this.num,
					remarks:this.remarks,
					rulesUrls:this.imgbox,
					orderId:this.info.orderId,
					id:this.info.id
				}
				const[err,res]=await breakRulesUpdate(data)
				if(err) return
				this.$toast('编辑成功')
				setTimeout(() => {
					uni.navigateBack({
						delta:1
					})
				}, 800)
			}
			
			
		
			
			
		}
		
		}
	}
</script>

<style>
	.box{
	width: 90%;
		margin: auto;
	}
	.flexBox {
		display: flex;
		align-items: center;
		padding: 25rpx 0rpx;
		border-bottom: 2rpx solid #EFF0F3;
	}

	.grayText {
		color: #999999;
		width: 70%;
		font-size: 24rpx;
		text-align: right;
	}

	.blackText {
		width: 30%;
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
		text-align: left;
	}
	.inpBox{
		width: 70%;font-size: 24rpx;color: #999999; text-align: right;
	}
	.grayLine{
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 30rpx;
	}
</style>
