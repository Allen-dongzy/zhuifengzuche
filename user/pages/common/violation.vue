<template>
	<view class="violation">
		<view class="title">逾期付款违约责任</view>
		<view class="info">根据《租车合同》以及相关协议的约定，鉴于乙方逾期付款，乙方将承担以下违约责任：
乙方逾期未支付有关费用的（包括但不限于平台服务费、基本租车费、超期租金、强行续租违约金、车辆停运损失费、基础服务费、手续费、增值服务、用车期间产生的 ETC
费用、贬值损失、加油服务费、超程服务费、夜间服务费、违章罚金、应付赔偿费用等所有费用），每逾期 1 日，甲方将以乙方未付款项总额为基数按日千分之五的标准收取违约金。
乙方的所有欠费，请乙方务必于五个工作日内支付完毕。
乙方未按期支付的，甲方将继续收取违约金，可能将给乙方造成巨大的经济负担，而且还将影响乙方个人的银行征信、支付宝及其他平台信用，以上法律后果将由乙方自行承担，望乙方慎知！
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

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.violation {
		padding: 30rpx;
		
		.title {
			@include font-set(32rpx, #000, 700);
			text-align: center;
		}

		.info {
			@include font-set(28rpx, #666);
			@include text-reserve;
			@include text-both;
			line-height: 48rpx;
			margin-top: 25rpx;
		}
	}
</style>
