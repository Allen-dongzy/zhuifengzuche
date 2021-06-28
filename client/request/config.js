let config = {
	mode: 'develop', // 项目模式 production release develop
	secretKey: '', // md5通信秘钥
	productionHost: 'http://192.168.1.30:8201', // 正式域名
	releaseHost: 'http://192.168.1.30:8201', // 测试域名
	developHost: 'http://192.168.1.30:8201', // 开发域名
	apiKeyword: 'lots-admin', // 接口代理关键字
}

// 设置域名
config.host = config[`${config.mode}Host`]

export default config