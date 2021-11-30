<template>
	<view class="lease-time-selection">
		<view class="header">
			<view class="left">
				<view v-if="takeCarDateShow" class="caption">{{takeCarDateShow}}</view>
				<view v-if="!takeCarDateShow" class="caption" @click="$toast('请选择取车日期')">选择日期</view>
				<view v-if="takeCarDay || takeCarTime" class="sub-caption">
					<text v-if="takeCarDay">{{takeCarDay}}</text><text v-if="takeCarTime">{{takeCarTime}}</text>
				</view>
				<view v-if="!takeCarDay && !takeCarTime" class="sub-caption" @click="$toast('请选择取车时间')">选择时间</view>
			</view>
			<view class="title">
				<view class="left-arrow"></view>
				<view class="info">共{{totalDate}}天</view>
				<view class="right-arrow"></view>
			</view>
			<view class="right">
				<view v-if="carAlsoDateShow" class="caption">{{carAlsoDateShow}}</view>
				<view v-if="!carAlsoDateShow" class="caption" @click="$toast('请选择还车日期')">选择日期</view>
				<view v-if="carAlsoDay || carAlsoTime" class="sub-caption">
					<text v-if="carAlsoDay">{{carAlsoDay}}</text><text v-if="carAlsoTime">{{carAlsoTime}}</text>
				</view>
				<view v-if="!carAlsoDay && !carAlsoTime" class="sub-caption" @click="$toast('请选择还车时间')">选择时间</view>
			</view>
		</view>
		<view class="calendar">
			<uni-calendar :insert="true" :range="true" :showMonth="false" :date='date' :customRange="customRange"
				@change="calendarChange">
			</uni-calendar>
		</view>
		<view class="date"></view>
		<view class="picker-box">
			<view class="picker-item">
				<view class="caption">取车时间</view>
				<picker-view :value="takeCarTimeIndex" class="picker-view" @change="takeCarTimeIndexChange">
					<picker-view-column>
						<view :class="['item',{'ac': takeCarTimeIndex[0]===index}]" v-for="(item,index) in timeBox"
							:key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view class="picker-item">
				<view class="caption">还车时间</view>
				<picker-view :value="carAlsoTimeIndex" class="picker-view" @change="carAlsoTimeIndexChange">
					<picker-view-column>
						<view :class="['item',{'ac': carAlsoTimeIndex[0]===index}]" v-for="(item,index) in timeBox"
							:key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
		<view class="bottom-mat"></view>
		<view class="bottom">
			<view class="btn clear" @click="clear">清空</view>
			<view class="btn confirm" @click="confirm">确定</view>
		</view>
	</view>
</template>

<script>
	import validator from 'crazy-validator'
	import {
		transCommonTime
	} from '@/utils/tools'

	export default {
		data() {
			return {
				timeBox: ['请选择', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30',
					'05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00',
					'10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
					'16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
					'21:30', '22:00', '22:30', '23:00', '23:30'
				],
				weekShow: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				customRange: [], // 自定义选取范围
				takeCarTimeIndex: [0], // 取车时间下标
				carAlsoTimeIndex: [0], // 还车时间下标
				takeCarDate: '', // 取车日期显示
				takeCarDay: '', // 取车日是周几显示
				takeCarTime: '', // 取车时间显示
				carAlsoDate: '', // 还车日期显示
				carAlsoDay: '', // 还车日是周几显示
				carAlsoTime: '', // 还车时间显示
				totalDate: 0, // 总天数
				totalKey: true, // 是否能计算总天数
				date: '', // 日期
				from: '' // 来自哪个页面
			}
		},
		watch: {
			// 监听取车日期
			takeCarDate(newVal) {
				if (!newVal) return
				this.takeCarDay = this.weekShow[new Date(newVal).getDay()]
				this.getTotalDate()
			},
			// 监听取车日期
			carAlsoDate(newVal) {
				if (!newVal) return
				this.carAlsoDay = this.weekShow[new Date(newVal).getDay()]
				this.getTotalDate()
			},
			// 监听取车时间
			takeCarTime(newVal) {
				this.getTotalDate()
			},
			// 监听还车时间
			carAlsoTime(newVal) {
				this.getTotalDate()
			}
		},
		computed: {
			// 取车日期展示
			takeCarDateShow() {
				const date = this.takeCarDate.split('-')
				return parseInt(date[1]) && parseInt(date[2]) ? `${parseInt(date[1])}月${parseInt(date[2])}日` : ''
			},
			// 还车日期展示
			carAlsoDateShow() {
				const date = this.carAlsoDate.split('-')
				return parseInt(date[1]) && parseInt(date[2]) ? `${parseInt(date[1])}月${parseInt(date[2])}日` : ''
			}
		},
		onLoad(e) {
			if (e && e.takeCarTime) this.takeCarDate = e.takeCarTime.split(' ')[0]
			if (e && e.takeCarDayShow) this.takeCarDay = e.takeCarDayShow
			if (e && e.takeCarTimeShow) {
				this.takeCarTime = e.takeCarTimeShow
				const index = this.timeBox.indexOf(this.takeCarTime)
				this.takeCarTimeIndex = [index >= 0 ? index : 0]
			}
			if (e && e.carAlsoTime) this.carAlsoDate = e.carAlsoTime.split(' ')[0]
			if (e && e.carAlsoDayShow) this.carAlsoDay = e.carAlsoDayShow
			if (e && e.carAlsoTimeShow) {
				this.carAlsoTime = e.carAlsoTimeShow
				const index = this.timeBox.indexOf(this.carAlsoTime)
				this.carAlsoTimeIndex = [index >= 0 ? index : 0]
			}
			if (e && e.totalDate) this.totalDate = e.totalDate
			if (e && e.takeCarTime && e.carAlsoTime) this.customRange.push(e.takeCarTime.split(' ')[0], e.carAlsoTime
				.split(' ')[0])
			if (e && e.from) this.from = e.from
		},
		methods: {
			// 获取总天数
			getTotalDate() {
				if (!this.takeCarDate || !this.carAlsoDate || !this.takeCarTime || !this.carAlsoTime || !this.totalKey)
					return
				const takeCarTime = transCommonTime(`${this.takeCarDate} ${this.takeCarTime}:00`)
				const carAlsoTime = transCommonTime(`${this.carAlsoDate} ${this.carAlsoTime}:00`)
				const takeCarTimeStamp = new Date(takeCarTime).getTime()
				const carAlsoTimeStamp = new Date(carAlsoTime).getTime()
				const diffidence = carAlsoTimeStamp - takeCarTimeStamp
				const dateUnit = 86400000
				let total = parseInt(diffidence / dateUnit)
				if (diffidence % dateUnit !== 0) total++
				this.totalDate = total
			},
			// 取车时间改变
			takeCarTimeIndexChange(e) {
				this.$set(this.takeCarTimeIndex, 0, e.detail.value[0])
				if (e.detail.value[0] === 0) {
					this.takeCarTime = ''
				} else {
					this.takeCarTime = this.timeBox[e.detail.value[0]]
				}
			},
			// 还车时间改变
			carAlsoTimeIndexChange(e) {
				this.$set(this.carAlsoTimeIndex, 0, e.detail.value[0])
				if (e.detail.value[0] === 0) {
					this.carAlsoTime = ''
				} else {
					this.carAlsoTime = this.timeBox[e.detail.value[0]]
				}
			},
			// 日历改变
			calendarChange(e) {
				if (e && e.range && e.range.before) this.takeCarDate = e.range.before
				if (e && e.range && e.range.after) this.carAlsoDate = e.range.after
				const takeCarDateTimestamp = `${this.takeCarDate} 00:00:00` || ''
				const carAlsoDateTimestamp = `${this.carAlsoDate} 00:00:00` || ''
				if (takeCarDateTimestamp && carAlsoDateTimestamp && takeCarDateTimestamp > carAlsoDateTimestamp) {
					const cacheDate = this.takeCarDate
					this.takeCarDate = this.carAlsoDate
					this.carAlsoDate = cacheDate
				}
				if (e.range.data.length === 0) {
					this.totalKey = false
					this.totalDate = 0
					this.takeCarDate = ''
					this.takeCarDay = ''
					this.carAlsoDate = ''
					this.carAlsoDay = ''
				} else {
					this.totalKey = true
				}
			},
			// 清空
			clear() {
				this.$open('/pages/home/selectTime', 1)
			},
			// 确定
			confirm() {
				const checkList = [{
					value: this.takeCarDate,
					rules: [{
						type: 'required',
						msg: '请选择取车日期'
					}]
				}, {
					value: this.takeCarTime,
					rules: [{
						type: 'required',
						msg: '请选择取车时间'
					}]
				}, {
					value: this.carAlsoDate,
					rules: [{
						type: 'required',
						msg: '请选择还车日期'
					}]
				}, {
					value: this.carAlsoTime,
					rules: [{
						type: 'required',
						msg: '请选择还车时间'
					}]
				}]
				const checkRes = validator(checkList, this.$toast)
				if (checkRes.status !== 1000) return
				const takeCarTime = `${this.takeCarDate} ${this.takeCarTime}:00`
				const carAlsoTime = `${this.carAlsoDate} ${this.carAlsoTime}:00`
				const takeCarTimeStamp = new Date(takeCarTime).getTime()
				const carAlsoTimeStamp = new Date(carAlsoTime).getTime()
				const currentTimeStamp = Date.now()
				if (takeCarTimeStamp < currentTimeStamp) {
					this.$toast('开始时间不能小于当前时间！')
					return
				}
				if (carAlsoTimeStamp - takeCarTimeStamp <= (1000 * 60 * 60 * 2)) {
					this.$toast('租车时间必须大于两个小时！')
					return
				}
				if (carAlsoTimeStamp - takeCarTimeStamp > (86400000 * 29)) {
					this.$toast('租车时间不得大于二十九天！')
					return
				}
				uni.$emit('checkTime', {
					takeCarDateShow: `${this.takeCarDate.split('-')[1]}月${this.takeCarDate.split('-')[2]}日`,
					takeCarDayShow: this.takeCarDay,
					takeCarTimeShow: this.takeCarTime,
					takeCarTime,
					carAlsoDateShow: `${this.carAlsoDate.split('-')[1]}月${this.carAlsoDate.split('-')[2]}日`,
					carAlsoDayShow: this.carAlsoDay,
					carAlsoTimeShow: this.carAlsoTime,
					carAlsoTime,
					totalDate: this.totalDate,
					from: this.from
				})
				this.$close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/_mixin.scss';

	.lease-time-selection {
		background-color: #EFF0F3;
		
		.calendar {
			@include box-w(100%, #EFF0F3);
		}
		
		/deep/ .uni-calendar__content {
			background-color: #EFF0F3;
		}

		/deep/ .uni-calendar {
			width: 700rpx;
			margin: 0 auto;
		}

		/deep/ .uni-calendar__header {
			border-bottom: 0;
		}

		/deep/ .uni-calendar__header-text {
			@include font-set(28rpx, #000, 700);
		}

		/deep/ .uni-calendar__weeks-day {
			border-bottom: 0;

			&>text {
				@include font-set(24rpx, #000, 500);
			}
		}

		/deep/ .uni-calendar-item--before-checked {
			background-color: #5A7EFF;
		}

		/deep/ .uni-calendar-item--after-checked {
			background-color: #5A7EFF;
		}

		/deep/ .uni-calendar-item--multiple {
			background-color: transparent;
		}

		/deep/ .uni-calendar-item__weeks-box.uni-calendar-item--before-checked.uni-calendar-item--multiple {
			background-color: #5A7EFF;
		}

		/deep/ .uni-calendar-item__weeks-box.uni-calendar-item--after-checked.uni-calendar-item--multiple {
			background-color: #5A7EFF;
		}

		/deep/ .uni-calendar-item__weeks-box.uni-calendar-item--multiple {
			background-color: rgba(90, 126, 255, 0.50);
		}

		.header {
			@include flex-row(space-between);
			padding: 20rpx 32rpx;
			background-color: #fff;

			.left,
			.right {
				.caption {
					@include font-set(36rpx, #000, 700);
					line-height: 48rpx;
				}

				.sub-caption {
					@include font-set(24rpx, #999);
					line-height: 34rpx;

					text {
						&~text {
							margin-left: 10rpx;
						}
					}
				}
			}

			.left {
				@include flex-col(center, flex-start);
			}

			.right {
				@include flex-col(center, flex-end);
			}

			.title {
				@include flex-center;

				.left-arrow {
					@include box(80rpx, 4rpx);
					background: linear-gradient(270deg, #5a7eff 0%, rgba(196, 196, 196, 0.00));
					border-radius: 162px;
				}

				.info {
					@include font-set(32rpx, #5A7EFF, 500);
					margin: 0 50rpx;
				}

				.right-arrow {
					@include box(80rpx, 4rpx);
					background: linear-gradient(90deg, #5a7eff 0%, rgba(196, 196, 196, 0.00));
					border-radius: 162px;
				}
			}
		}

		.picker-box {
			@include box-w(100%, #fff);
			padding: 40rpx 160rpx 0;
			@include flex-row(space-between);
			border-radius: 32rpx 32rpx 0px 0px;

			.caption {
				@include font-set(28rpx, #000, 700);
			}

			.picker-view {
				height: 260rpx;

				.item {
					@include flex-center;
					transition: all .5s;

					&.ac {
						font-weight: 700;
						color: #262743;
					}
				}
			}
		}

		.bottom-mat {
			height: 194rpx;
			background-color: #fff;
		}

		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 9;
			@include box-w(100%, #fff);
			padding: 38rpx 32rpx 60rpx;
			@include flex-row(space-between);

			.btn {
				@include box(300rpx, 96rpx);
				border-radius: 52rpx;
				@include flex-center;
				@include font-set(32rpx);

				&.clear {
					border: 1px solid #B2B2B2;
					color: #B2B2B2;
				}

				&.confirm {
					background-color: #5A7EFF;
					color: #fff;
				}
			}
		}
	}
</style>
