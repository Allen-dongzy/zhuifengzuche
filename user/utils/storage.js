const STORAGE_KEY = 'setting'

// 根缓存为STORAGE_KEY,moduleName子模块，key和val为根缓存的键值或子模块中键值
export default {
	// 设置某项缓存,moduleName为子模块，非必填
	set (key, val, moduleName) {
		if (moduleName) {
			let module = this.get(moduleName) || {}
			module[key] = val
			this.set(moduleName, module)
		} else {
			let setting = this.storage()
			setting[key] = val
			uni.setStorageSync(STORAGE_KEY, setting)
		}
	},

	// 获取某项缓存
	get (key, moduleName) {
		if (moduleName) {
			let module = this.get(moduleName)
			if (module) return module[key]
		} else return this.storage()[key]
	},

	// 删除某项缓存
	remove (key, moduleName) {
		let setting = this.storage()
		if (moduleName) {
			if (!setting[moduleName]) return
			delete setting[moduleName][key]
		} else delete setting[key]
		uni.setStorageSync(STORAGE_KEY, setting)
	},

	// 清空缓存
	clear () {
		uni.setStorageSync(STORAGE_KEY, {})
	},

	// 获取缓存
	storage () {
		return uni.getStorageSync(STORAGE_KEY) || {}
	}
}
