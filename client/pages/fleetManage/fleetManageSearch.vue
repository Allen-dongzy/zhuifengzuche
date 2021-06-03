<template>
	<view class="fleetManageSearch">
		<view class="flex searchPanel">
			<view class="flex searchInput">
				<input type="text"  class="search"/>
				<i class="cuIcon-search"></i>
				<i class="cuIcon-roundclosefill"></i>
			</view>
			<p class="cancel">取消</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.fleetManageSearch {
		position: relative;
		
		.searchPanel {
			margin-top: 20rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;
			justify-content: space-between;
			
			.searchInput {
				position: relative;
				width: 602rpx;
				height: 64rpx;
			}
			
			.search {
				
				background: #eff0f3;
				border-radius: 126rpx;
			}
			
			.cuIcon-search {
				position: absolute;
				left: 16rpx;
			}
			
			.cuIcon-roundclosefill {
				position: absolute;
			}
		}
	}
</style>
