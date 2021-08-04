<template>
	<view class="join-investment">
		<view class="section">感谢您关注追风租车！
追风租车，总部位于重庆，是一家依托大数据为基础，精准把控出行需求，专注于以科技提升服务体验，整合租车服务全产业链，以“资源共享，服务社会”为核心思想的一站式租车服务提供商，致力于为大家提供安全、实惠、贴心的租车全流程服务。
目前企业已成功研发完成追风租车2.0出行系统，引入多重租车新概念，引领新的租车服务体验。同时，追风依托与各大主机厂、大型出行服务平台、汽车经销商等企业的跨界合作，为各位加盟商用户提供超低价、高水准的租车出行服务，结合产业互动的发展战略，逐步占据更大的市场份额。
公司以厂家和品牌经销商为基础，精准识别客户需求，为客户制定整体车辆解决方案，涵盖短租、长租、接待、车辆租赁服务、增值服务、个性化定制服务等板块。强调个性化、差异化需求，长期保持追风在租车服务市场上的优势地位。
经过追风人孜孜不倦的努力，目前追风租车已构建起先进的技术研发团队、健全的风险控制体系、智能的车队运营体系、高效的产品开发体系、稳定的组织架构体系，并通过直营、加盟、联营、异业合作等方式构建追风租车行业生态圈，打造汽车租赁服务行业标杆企业。
在未来你追风租车将通过更加灵活的运营模式，迎合汽车租赁市场的巨大需求，为消费者提供全方位的汽车租赁服务。</view>
		<view class="contact">合作垂询请联系：13320299077</view>
		<image class="qr" :src="`${ossUrl}/common/qr-code.png`" mode="aspectFill"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.join-investment {
		padding: 20rpx 32rpx;

		.section {
			@include font-set(28rpx, #666);
			@include text-both;
			line-height: 40rpx;
			@include text-reserve;
		}

		.contact {
			@include font-set(28rpx, #666, 700);
			@include text-both;
			line-height: 40rpx;
			margin-top: 50rpx;
		}

		.qr {
			@include square(198rpx);
			margin-top: 20rpx;
		}
	}
</style>
