let config = {
	mode: 'production', // 项目模式 production release develop
	secretKey: '', // md5通信秘钥
	productionHost: 'https://zuche.zdkj1.cn', // 正式域名
	releaseHost: 'http://121.40.45.191:8201', // 测试域名 
	developHost: 'http://192.168.1.55:8201', // 开发域名
	apiKeyword: 'lots-member', // 接口关键字
	ossUrl: 'http://oss.zdkj1.cn/car-rental-user', // oss通用路径
}

// 设置域名
config.host = config[`${config.mode}Host`]

export default config
