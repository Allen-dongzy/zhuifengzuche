let config = { 
	mode: 'develop', // 项目模式 production release develop
	secretKey: '', // md5通信秘钥
	productionHost: '', // 正式域名
	releaseHost: '', // 测试域名
	developHost: '', // 开发域名
	apiKeyword: '', // 接口代理关键字
	uploadImgUrl: '', // 上传文件的统一路径
}

// 设置域名
config.host = config[`${config.mode}Host`]

export default config
