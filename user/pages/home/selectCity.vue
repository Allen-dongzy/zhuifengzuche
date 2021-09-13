<template>
	<view class="container">
		<!-- 城市搜索 -->
		<view class="city-search-wrap" v-if="searchMode">
			<view class="search">
				<view class="l-search">
					<image class="icon-search" :src="`${ossUrl}/common/search.png`"></image>
					<input class="input-search" type="text" :value="keyword" placeholder="输入城市名或拼音"
						placeholder-class="default-style" placeholder-style="color:#8E8F97" :focus="searchFocus"
						@input="searchChange" />
					<image class="clear-input" :src="`${ossUrl}/common/delete.png`" v-if="showClearBtn"
						@click="keyword = ''"></image>
				</view>
				<view class="r-cancel" open-type="navigateBack" delta="1" @click="searchMode = false">
					取消
				</view>
			</view>
			<!-- 搜索列表  -->
			<view class="reach-content" v-if="keyword">
				<block v-if="searchCityList.length">
					<view class="li" v-for="item in searchCityList" :key="item.id" @click="citySearchList(item)">
						{{ item.name }}
					</view>
				</block>
				<view class="has-no-data" v-if="hasNoData">没有找到匹配数据~</view>
			</view>
		</view>

		<!-- 城市列表 -->
		<view v-if="!searchMode">
			<view class="top-search">
				<view class="item" @click="searchMode = true">
					<image class="icon-search" :src="`${ossUrl}/common/search.png`"></image>
					<text>输入城市名或拼音</text>
				</view>
			</view>
			<scroll-view class="scroll-view" scroll-y scroll-with-animation="true" enable-back-to-top="true"
				:scroll-into-view="toIndex" @scroll="scrollHandle">
				<view class="block">
					<!-- 当前城市 -->
					<view class="area list-item" id="area">
						<view class="title-wrapp">
							<view class="title">
								<text class="l">
									当前城市
								</text>
							</view>
						</view>
						<view class="ul">
							<view class="li current" @click="selectCity(currentCity)">
								<image class="icon" :src="`${ossUrl}/common/location.png`"></image>
								{{currentCity.name || ''}}
							</view>
						</view>
					</view>

					<!-- 热门城市 -->
					<view class="area list-item" id="hot">
						<view class="title-wrapp">
							<view class="title">
								<text class="l">热门城市</text>
							</view>
						</view>
						<view class="ul">
							<view class="li" v-for="(item, index) in hotCity" :key="index" @click="selectCity(item)">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<!-- 城市列表  -->
				<view class="city-list">
					<view class="list list-item" v-for="(item, index) of allCity" :key="index" :id="index">
						<view class="title">{{ index }}</view>
						<view class="item" v-for="(inner, sub) in item" :key="inner.id" @click="selectCity(inner)">
							{{ inner.name }}
						</view>
					</view>
				</view>
			</scroll-view>

			<!-- 字母列表 -->
			<view class="alphabet" @touchstart="touchStart" @touchend="touchEnd" @touchmove.stop="touchMove">
				<view v-for="(item, index) in alphabet" :key="index" @touchstart="getLetter" @touchend="setLetter"
					:id="item">
					<!-- #ifdef MP-WEIXIN -->
					<view class="item" :class="{ active: currentLetter == item }"
						:style="[{'height':`${(windowHeight-90)/alphabetLength}px`},{'line-height':`${(windowHeight-90)/alphabetLength}px`}]">
						{{ item == "area" ? "当前" : item == "hot" ? "热门" : item }}
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-ALIPAY -->
					<view class="item" :class="{ active: currentLetter == item }"
						:style="[{'height':`${(windowHeight-140)/alphabetLength}px`},{'line-height':`${(windowHeight-90)/alphabetLength}px`}]">
						{{ item == "area" ? "当前" : item == "hot" ? "热门" : item }}
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				searchMode: false, // 是否为搜索模式
				keyword: "", // 城市搜索关键字
				searchCityList: [], // 搜索的城市数据
				showClearBtn: false, // 是否展示清除按钮
				toIndex: "", //跳转的索引的字母
				tipsLetter: "", //滑动显示字母
				timer: null,
				hasNoData: false,
				searchFocus: false,
				letterDetails: [],
				currentLetter: "area", //默认选择hot
				cityInfo: {}, // 传来的城市信息对象
				cityMode: '' // 选择城市的模式
			};
		},
		computed: {
			// city 字母列表，当前城市，热门城市列表，全部城市列表
			...mapState('city', ['alphabet', 'currentCity', 'hotCity', 'allCity']),
			// app 窗口高度
			...mapState('app', ['windowHeight']),
			// 字母数量
			alphabetLength() {
				const keys = Object.keys(this.allCity)
				const noEmptyList = keys.filter(key => this.allCity[key].length > 0)
				return noEmptyList.length + 2 // 加上“当前”和“热门”
			}
		},
		watch: {
			// 城市搜索输入框
			keyword(newVal) {
				this.showClearBtn = newVal ? true : false;
				if (this.timer) clearTimeout(this.timer)
				if (!this.keyword) {
					this.searchCityList = []
					return
				}
				this.timer = setTimeout(() => {
					const result = []
					for (const i in this.allCity) {
						this.allCity[i].forEach(item => {
							if (item.name.includes(this.keyword) || item.shortName.includes(this
									.keyword)) {
								result.push(item)
							}
						})
					}
					this.searchCityList = result
					if (this.searchCityList.length === 0) this.hasNoData = true
					else this.hasNoData = false
				}, 500)
			},
			searchMode(val) {
				this.searchFocus = val
			}
		},
		onLoad(e) {
			if (e && e.cityMode) this.cityMode = e.cityMode
			// 城市
			this.getHotCity()
			this.getAllCity()
		},
		onShow() {
			this.getCurrentCity()
		},
		methods: {
			// city 获取所有城市，获取热门城市
			...mapActions('city', ['getAllCity', 'getHotCity', 'getCurrentCity']),
			//列表滚动，和右边字母表对应
			scrollHandle(e) {
				let view = uni.createSelectorQuery().in(this).selectAll(".list-item");
				view.boundingClientRect(d => {
					let top = d[0].top;
					d.forEach(item => {
						item.top = item.top - top;
						item.bottom = item.bottom - top;
						this.letterDetails.push({
							id: item.id,
							top: item.top,
							bottom: item.bottom
						});
					});
				}).exec();

				const scrollTop = e.detail.scrollTop;
				this.letterDetails.some(item => {
					if (scrollTop >= item.top && scrollTop <= item.bottom - 20) {
						this.currentLetter = item.id;
						//当前固定用的是粘性定位，如果不用粘性定位，在这里设置
						return true;
					}
				});
			},
			//搜索
			searchChange(e) {
				this.keyword = e.detail.value;
			},
			// 搜索结果列表选择
			citySearchList(item) {
				uni.$emit('checkCity', {
					cityMode: this.cityMode,
					city: JSON.stringify(item)
				})
				this.$close()
			},
			// 城市列表选择
			selectCity(item) {
				uni.$emit('checkCity', {
					cityMode: this.cityMode,
					city: JSON.stringify(item)
				})
				this.$close()
			},
			//区域选择
			selectRegion(item) {
				console.log('选择的区域是：', item)
			},
			//触发开始
			touchStart(e) {
				console.log(1)
				// console.log(e);
			},
			//移动时
			touchMove(e) {
				console.log(2)
				uni.vibrateShort();
				let y = e.touches[0].clientY;
				let offsettop = e.currentTarget.offsetTop;

				//判断选择区域,只在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 15); //右边每个字母元素的高度
					let letter = this.alphabet[num];
					this.tipsLetter = letter;
					
					let curentLetter = this.letterTransform(letter);
					uni.showToast({
						title: curentLetter,
						icon: "none",
						duration: 1000
					});
				}
			},
			//触发结束
			touchEnd() {
				console.log(3)
				this.toIndex = this.tipsLetter;
			},
			//移动开始获取字母，并放大提示
			getLetter(e) {
				console.log(4)
				uni.vibrateShort();
				let {
					id
				} = e.currentTarget;
				this.tipsLetter = id;
				let curentLetter = this.letterTransform(id);
				uni.showToast({
					title: curentLetter,
					icon: "none",
					duration: 1000
				});
			},
			//移动结束设置字母，赋值到toIndex
			setLetter() {
				console.log(5)
				this.toIndex = this.tipsLetter;
			},
			//提示字母转换
			letterTransform(letter) {
				let str = "";
				if (letter == "area") {
					str = "当前";
				} else if (letter == "hot") {
					str = "热门";
				} else {
					str = letter;
				}
				return str;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.city-search-wrap {
		width: 100%;
		padding: 0 32rpx;
		box-sizing: border-box;

		.search {
			width: 100%;
			height: 104rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #222;
			padding: 20rpx 32rpx;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 1;
			background: #fff;
			/* #ifdef H5 */
			position: fixed;
			left: 0;
			top: 4;
			z-index: 1;
			background: #fff;

			/* #endif */
			.l-search {
				width: 602rpx;
				height: 64rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				padding: 0 16rpx;
				background: #f4f5f9;
				border-radius: 50rpx;

				.icon-search {
					width: 34rpx;
					height: 36rpx;
				}

				.input-search {
					width: 500rpx;
					height: 100%;
					box-sizing: border-box;
					font-size: 28rpx;
					color: rgba(0, 0, 0, .8);
					margin-left: 10rpx;
					padding-right: 10rpx;
				}

				.default-style {
					font-size: 28rpx;
					color: rgba(0, 0, 0, .5);
				}

				.clear-input {
					width: 28rpx;
					height: 28rpx;
				}
			}

			.r-cancel {
				font-size: 30rpx;
				color: #8E8E93;
				font-weight: 500;
				margin-left: 24rpx;
			}

		}
	}

	.reach-content {
		padding-top: 84rpx;
		padding-bottom: 50rpx;

		.li {
			font-size: 32rpx;
			color: #000;
			font-weight: 700;
			padding: 30rpx 0;

			&~.li {
				border-top: 1px solid #EFF0F3;
			}
		}
	}

	.block {
		padding: 10rpx 32rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.top-search {
		height: 104rpx;
		padding: 20rpx 32rpx;
		box-sizing: border-box;
		background-color: #fff;

		.item {
			height: 64rpx;
			background: #f4f5f9;
			border-radius: 50rpx;
			font-size: 28rpx;
			color: rgba(0, 0, 0, .5);
			display: flex;
			justify-content: center;
			align-items: center;

			.icon-search {
				width: 34rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}
		}
	}

	.scroll-view {
		width: 100%;
		height: calc(100vh - 80rpx);
		box-sizing: border-box;
	}

	.area {
		margin-bottom: 30rpx;

		.title-wrapp {
			position: sticky;
			top: 0;
			left: 0;
			background: #fff;
		}

		.title {
			color: #000;
			font-size: 36rpx;
			font-weight: 700;
			padding: 10rpx 0;

			.r {
				font-size: 24rpx;
				color: #8e8f97;
				display: inline-block;
				align-items: center;
			}
		}

		.ul {
			display: flex;
			flex-wrap: wrap;

			.li {
				max-width: 200rpx;
				height: 64rpx;
				padding: 0 30rpx;
				line-height: 64rpx;
				margin-top: 30rpx;
				margin-right: 20rpx;
				background: #eff0f3;
				border-radius: 128px;
				font-size: 28rpx;
				color: #000;
				display: flex;
				justify-content: center;
				align-items: center;

				&.current {
					height: 72rpx;
					padding-left: 24rpx;
					padding-right: 40rpx;
					color: #5A7EFF;
				}

				.icon {
					width: 36rpx;
					height: 40rpx;
					margin-right: 14rpx;
				}
			}
		}
	}

	.city-list {
		width: 100%;
		padding-bottom: 50rpx;

		.title {
			height: 60rpx;
			line-height: 60rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #272636;
			background: #f4f5f9;
			margin-bottom: 20rpx;
			padding-left: 32rpx;
			position: sticky;
			top: 0;
			left: 0;
			z-index: 2;
		}

		.item {
			padding: 24rpx 0 24rpx 32rpx;
			color: #333;
			font-size: 32rpx;
			font-weight: 500;
		}
	}

	.alphabet {
		position: fixed;
		right: 0;
		top: 108rpx;
		z-index: 9;
		width: calc(750rpx - 680rpx);
		text-align: center;
		padding-right: 10rpx;
		font-size: 24rpx;
		font-weight: 700;
		color: #B2B2B2;

		.active {
			color: #666;
		}
	}

	.has-no-data {
		font-size: 24rpx;
		text-align: center;
		color: #8e8f97;
		margin-top: 50rpx;
	}
</style>
