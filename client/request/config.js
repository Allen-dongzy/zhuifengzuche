let config = {
	mode: 'develop', // 项目模式 production release develop
	secretKey: '', // md5通信秘钥
	productionHost: 'https://zuche.zdkj1.cn', // 正式域名
	releaseHost: 'https://zctest.zdkj1.cn', // 测试域名 
	developHost: 'http://192.168.2.124:8201', // 开发域名
	apiKeyword: 'lots-admin', // 接口代理关键字
	// http://test.frp.hechieh.com
}

// 设置域名
config.host = config[`${config.mode}Host`]

export default config
