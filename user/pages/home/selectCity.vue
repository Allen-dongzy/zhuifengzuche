<template>
	<view class="select-city">
		<t-city />
	</view>
</template>

<script>
	import TCity from '@/components/t-city/t-city'

	export default {
		data() {
			return {}
		},
		components: {
			TCity
		},
		methods: {}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.select-city {}
</style>
