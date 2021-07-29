<template>
	<view class="select-city">
		<t-city :cityMode="cityMode" :city="city" />
	</view>
</template>

<script>
	import TCity from '@/components/t-city/t-city'

	export default {
		data() {
			return {
				cityMode: '', // 城市模式
			}
		},
		components: {
			TCity
		},
		onLoad(e) {
			if (e && e.cityMode) this.cityMode = e.cityMode
		},
		methods: {}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.select-city {}
</style>
