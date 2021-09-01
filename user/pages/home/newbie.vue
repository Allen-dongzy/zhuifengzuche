<template>
	<view class="newbie">
		<image :src="`${ossUrl}/home/newbie-bg.png`" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl // oss
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.newbie {
		image {
			@include box-w();
		}
	}
</style>
