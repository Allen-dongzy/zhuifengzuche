<script>
	import {
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		showModal
	} from '@/utils/uni-tools'

	export default {
		onLaunch: function() {
			console.log('App Launch')
			// app信息
			this.setSystemInfo()
			// 设置app所处平台
			this.setPlatform()
			// 用户信息
			this.getUserInfo()
			// 更新
			this.updateCheck()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// app 获取并设置系统信息
			...mapActions('app', ['setSystemInfo']),
			// app 设置平台
			...mapMutations('app', ['setPlatform']),
			// user 获取用户信息
			...mapActions('user', ['getUserInfo']),
			// 小程序更新检测
			updateCheck() {
				const updateManager = uni.getUpdateManager()
				// 检测回调
				updateManager.onCheckForUpdate(res => {
					if (!res || !res.hasUpdate) return
					// 下载成功
					updateManager.onUpdateReady(async () => {
						const [err, res] = await showModal({
							title: '更新',
							content: '新版本已经准备好，是否重启应用？'
						})
						if (err) return 
						updateManager.applyUpdate()
					})
					// 下载失败
					updateManager.onUpdateFailed(() => {
						showModal({
							title: '更新',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
							showCancel: false
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_reset.scss';
	/*  #ifdef  MP-ALIPAY  */
	@import '@/static/scss/_ali-reset.scss';
	/*  #endif  */
</style>
