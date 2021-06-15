<template>
	<view class="add">
		<view class="header">
			<view class="label"></view>
			<text>填写车辆信息</text>
		</view>
		<view class="vehicle-information">
			<view class="item">
				<view class="caption">选择品牌</view>
				<tui-dropdown-list :show="brandKey" :top="80" :height="(76*brandList.length)+(40*2)">
					<template v-slot:selectionbox>
						<view class="info" @tap="brandKey ? closeSelBox('brand') :openSelBox('brand')">
							<text>{{ brand ? brand :'请选择品牌'}}</text>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<view class="box">
							<view class="drop-item" v-for="(item, index) in brandList" :key="index"
								@tap="checkBrand(index)">{{ item.text }}</view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>
			<view class="item">
				<view class="caption">选择类别</view>
				<tui-dropdown-list :show="classesKey" :top="80" :height="(76*classesList.length)+(40*2)">
					<template v-slot:selectionbox>
						<view class="info" @tap="classesKey ? closeSelBox('classes') : openSelBox('classes')">
							<text>{{ classes ? classes :'请选择类别'}}</text>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<view class="box">
							<view class="drop-item" v-for="(item, index) in classesList" :key="index"
								@tap="checkClasses(index)">{{ item.text }}</view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>
			<view class="item">
				<view class="caption">车型</view>
				<input class="info" type="text" placeholder="请填写车型" placeholder-style="color:#999;" maxlength="80">
			</view>
			<view class="item">
				<view class="caption">排档</view>
				<tui-dropdown-list :show="stallKey" :top="80" :height="(76*stallList.length)+(40*2)">
					<template v-slot:selectionbox>
						<view class="info" @tap="stallKey ? closeSelBox('stall') : openSelBox('stall')">
							<text>{{ stall ? stall :'请选择排档'}}</text>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<view class="box">
							<view class="drop-item" v-for="(item, index) in stallList" :key="index"
								@tap="checkStall(index)">{{ item.text }}</view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>
			<view class="item">
				<view class="caption">座位数</view>
				<tui-dropdown-list :show="seatKey" :top="80" :height="(76*seatList.length)+(40*2)">
					<template v-slot:selectionbox>
						<view class="info" @tap="seatKey ? closeSelBox('seat') : openSelBox('seat')">
							<text>{{ seat ? seat :'请选择座位数'}}</text>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<view class="box">
							<view class="drop-item" v-for="(item, index) in seatList" :key="index"
								@tap="checkSeat(index)">{{ item.text }}</view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>
			<view class="item">
				<view class="caption">排量</view>
				<tui-dropdown-list :show="displacementKey" :top="80" :height="(76*displacementList.length)+(40*2)">
					<template v-slot:selectionbox>
						<view class="info"
							@tap="displacementKey ? closeSelBox('displacement') : openSelBox('displacement')">
							<text>{{ displacement ? displacement :'请选择排量'}}</text>
							<image class="icon" :src="`${filePath}/vehicleManage/down-mini.png`"></image>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<view class="box">
							<view class="drop-item" v-for="(item, index) in displacementList" :key="index"
								@tap="checkDisplacement(index)">{{ item.text }}</view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>
			<view class="item">
				<view class="caption">燃油型号</view>
				<input class="info" type="text" placeholder="请填写燃油型号" placeholder-style="color:#999;" maxlength="80">
			</view>
			<view class="item">
				<view class="caption">添加标签</view>
				<view class="label-box">
					<view class="label add">+新增</view>
					<view class="label">新车</view>
					<view class="label">五个字标签</view>
				</view>
			</view>
			<view class="picture-group">
				<div class="color-bar"></div>
				<view class="caption">车型图片</view>
				<view class="picture-box">
					<view class="image-card">
						<image class="picture"
							src="https://img0.baidu.com/it/u=1631582372,4013670020&fm=11&fmt=auto&gp=0.jpg"
							mode="aspectFill"></image>
						<image class="delete" :src="`${filePath}/vehicleManage/delete.png`"></image>
					</view>
					<view class="image-card">
						<image class="picture"
							src="https://img0.baidu.com/it/u=1631582372,4013670020&fm=11&fmt=auto&gp=0.jpg"
							mode="aspectFill"></image>
						<image class="delete" :src="`${filePath}/vehicleManage/delete.png`"></image>
					</view>
					<view class="image-card">
						<image class="picture"
							src="https://img0.baidu.com/it/u=1631582372,4013670020&fm=11&fmt=auto&gp=0.jpg"
							mode="aspectFill"></image>
						<image class="delete" :src="`${filePath}/vehicleManage/delete.png`"></image>
					</view>
					<view class="image-card add">
						<image class="picture" :src="`${filePath}/vehicleManage/camera.png`" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="picture-group">
				<div class="color-bar"></div>
				<view class="caption">实拍图片</view>
				<view class="picture-box">
					<view class="image-card">
						<image class="picture"
							src="https://img0.baidu.com/it/u=1631582372,4013670020&fm=11&fmt=auto&gp=0.jpg"
							mode="aspectFill"></image>
						<image class="delete" :src="`${filePath}/vehicleManage/delete.png`"></image>
					</view>
					<view class="image-card">
						<image class="picture"
							src="https://img0.baidu.com/it/u=1631582372,4013670020&fm=11&fmt=auto&gp=0.jpg"
							mode="aspectFill"></image>
						<image class="delete" :src="`${filePath}/vehicleManage/delete.png`"></image>
					</view>
					<view class="image-card">
						<image class="picture"
							src="https://img0.baidu.com/it/u=1631582372,4013670020&fm=11&fmt=auto&gp=0.jpg"
							mode="aspectFill"></image>
						<image class="delete" :src="`${filePath}/vehicleManage/delete.png`"></image>
					</view>
					<view class="image-card add">
						<image class="picture" :src="`${filePath}/vehicleManage/camera.png`" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="header">
			<view class="label"></view>
			<text>费用设置</text>
		</view>
		<view class="costs-set">
			<view class="item">
				<view class="caption">租车押金</view>
				<input class="info" type="text" placeholder="请设置租车押金" placeholder-style="color:#999;" maxlength="80">
			</view>
			<view class="item">
				<view class="caption">基本保障费</view>
				<input class="info" type="text" placeholder="请设置基本保障费" placeholder-style="color:#999;" maxlength="80">
			</view>
			<view class="item">
				<view class="caption">违章押金</view>
				<input class="info" type="text" placeholder="请设置违章押金" placeholder-style="color:#999;" maxlength="80">
			</view>
		</view>
		<view class="header">
			<view class="label"></view>
			<text>批量设置租金</text>
		</view>
		<view class="set-up-the-rent">
			<view class="tab-header">
				<view class="tab ac">周内价格</view>
				<view class="tab">周末价格</view>
			</view>
			<view class="input-box">
				<view class="square">-10%</view>
				<view class="square">-1</view>
				<view class="input">50</view>
				<view class="square">+1</view>
				<view class="square">+10%</view>
			</view>
			<view class="btn">添加</view>
		</view>
	</view>
</template>

<script>
	import config from '@/common/js/config'

	export default {
		data() {
			return {
				filePath: config.filePath,
				brandList: [{
					text: '奔驰'
				}, {
					text: '宝马'
				}, {
					text: '大众'
				}, {
					text: '迪奥'
				}], // 品牌列表
				brandKey: false, // 品牌开关
				brand: '', // 品牌
				classesList: [{
					text: '豪华型'
				}, {
					text: '经济型'
				}, {
					text: '商务型'
				}, {
					text: '舒适型'
				}, {
					text: '城市suv'
				}, {
					text: '高端型'
				}], // 类别列表
				classesKey: false, // 类别开关
				classes: '', // 类别
				stallList: [{
					text: '手动'
				}, {
					text: '自动'
				}], // 排档列表
				stallKey: false, // 排档开关
				stall: '', // 排档
				seatList: [{
					text: '5座'
				}, {
					text: '7座'
				}, {
					text: '9座'
				}], // 座位数列表
				seatKey: false, // 座位开关
				seat: '', // 座位
				displacementList: [{
					text: '1.5T'
				}, {
					text: '2.0T'
				}, {
					text: '6.0T'
				}, {
					text: '8.0T'
				}], // 排量列表
				displacementKey: false, // 排量开关
				displacement: '', // 排量
				action: '',
				fileList: [{
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}, {
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}, {
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}, {
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}]
			}
		},
		methods: {
			// 打开选择
			openSelBox(selName) {
				this.closeAllSelBox()
				this[`${selName}Key`] = true
			},
			// 关闭选择
			closeSelBox(selName) {
				this[`${selName}Key`] = false
			},
			// 关闭所有
			closeAllSelBox(selName) {
				this.brandKey = false
				this.classesKey = false
			},
			// 选择品牌
			checkBrand(index) {
				this.brand = this.brandList[index].text
				this.closeSelBox('brand')
			},
			// 选择类别
			checkClasses(index) {
				this.classes = this.classesList[index].text
				this.closeSelBox('classes')
			},
			// 选择排档
			checkStall(index) {
				this.stall = this.stallList[index].text
				this.closeSelBox('stall')
			},
			// 选择座位
			checkSeat(index) {
				this.seat = this.seatList[index].text
				this.closeSelBox('seat')
			},
			// 选择排量
			checkDisplacement(index) {
				this.displacement = this.displacementList[index].text
				this.closeSelBox('displacement')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/_mixin.scss';

	.add {
		.header {
			@include box(100%, 140rpx, #EFF0F3);
			@include flex-row();
			padding: 0 40rpx;
			@include flex-row();
			@include font-set(32rpx, #000, 700);

			.label {
				@include box(8rpx, 24rpx, #5A7EFF);
				border-radius: 20rpx;
				margin-right: 20rpx;
			}
		}

		.vehicle-information,
		.costs-set {
			background-color: #fff;
			padding: 40rpx 0;

			.item {
				@include box(100%, 74rpx);
				@include flex-row(space-between);
				padding: 0 32rpx;

				&~.item {
					margin-top: 40rpx;
				}

				.caption {
					@include font-set(28rpx, #000, 700);
				}

				.info {
					@include box(520rpx, 74rpx, #EFF0F3);
					@include font-set(24rpx, #999);
					@include flex-row(space-between);
					border-radius: 10rpx;
					padding: 0 20rpx;

					.icon {
						@include box(32rpx, 16rpx);
					}
				}

				.placeholder-class {
					@include font-set(24rpx, #999);
				}

				.label-box {
					@include box(520rpx, 74rpx);
					@include flex-row();

					.label {
						background-color: #EFF0F3;
						padding: 20rpx 36rpx;
						@include font-set(24rpx, #000000);
						border-radius: 10rpx;

						&~.label {
							margin-left: 20rpx;
						}

						&.add {
							padding: 16rpx 32rpx;
							background-color: #fff;
							border: 1px solid #5A7EFF;
							color: #5A7EFF;
						}
					}
				}

				.box {
					@include box-w(520rpx, #EFF0F3);
					padding: 39rpx;
					border: 1px solid #ddd;
					border-top: 0;

					.drop-item {
						@include box(100%, 76rpx);
						@include flex-row();
						@include font-set(24rpx, #000000, 100);
					}
				}
			}

			.picture-group {
				background-color: #fff;
				padding: 40rpx 0 0;

				.color-bar {
					@include box(100%, 20rpx, #EFF0F3);
				}

				.caption {
					@include font-set(28rpx, #000, 700);
					padding: 40rpx 40rpx 0;
				}

				.picture-box {
					margin-top: 40rpx;
					padding: 0 40rpx;
					@include box-w();
					@include flex-row();

					.image-card {
						position: relative;
						@include square(160rpx);
						border-radius: 10rpx;

						&~.image-card {
							margin-left: 16rpx;
						}

						&.add {
							background-color: #EFF0F3;
							@include flex-center;

							.picture {
								@include square(60rpx);
							}
						}

						.picture {
							@include square();
							border-radius: 10rpx;
						}

						.delete {
							position: absolute;
							right: -8rpx;
							top: -18rpx;
							z-index: 9;
							@include circle(36rpx);
						}
					}
				}
			}
		}

		.set-up-the-rent {
			.tab-header {
				@include box-w();
				@include flex-row();

				.tab {
					padding: 0 32rpx;
					@include font-set(28rpx, #000, 700);
					margin-top: 40rpx;

					&.ac {
						color: #5A7EFF;
					}
				}
			}

			.input-box {
				@include box-w();
				@include flex-row(space-between);
				padding: 0 32rpx;
				margin-top: 40rpx;

				.square {
					@include square(74rpx);
					border: 1px solid #000;
					border-radius: 12rpx;
					@include flex-center;
					@include font-set(24rpx, #000, 100);
				}

				.input {
					@include box(230rpx, 74rpx, #EFF0F3);
					@include flex-center;
					@include font-set(24rpx, #5A7EFF, 500);
					border-radius: 10rpx;
				}
			}

			.btn {
				@include box(670rpx, 96rpx, #5A7EFF);
				@include flex-center;
				@include font-set(32rpx, #fff, 700);
				border-radius: 52rpx;
				letter-spacing: 20rpx;
				margin: 60rpx auto;
			}
		}
	}
</style>
