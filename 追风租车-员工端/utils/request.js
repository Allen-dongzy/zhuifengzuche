//公共js,以及基本方法封装 nvue里使用

const fetch = {
	interfaceUrl: function() {
		//接口地址
		return "http://47.104.222.98:8880/fo";
	},
	toast: function(tips) {
		uni.showToast({
			title: tips || "出错啦~",
			icon: 'none',
			duration: 2000
		})
	}, 
	request: function(data) {
		let {url, postData, method, type, showLoading} = data;
		//接口请求
		// if (showLoading) {
		// 	uni.showLoading({
		// 		mask: true,
		// 		title: '请稍候...'	
		// 	})
		// }
		
		const tokenId = uni.getStorageSync('tokenId')? uni.getStorageSync('tokenId'): "";
		// const params = {
		// 	data: method === "POST" ? postData : JSON.stringify(postData)
		// }

		return new Promise((resolve, reject) => {
	
			uni.request({
				url: fetch.interfaceUrl() + url,
				data: postData,
					header: {
						// 'content-type': type ? 'application/x-www-form-urlencoded' : 'application/json',
						'tokenId': tokenId,
					},
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
					// showLoading && uni.hideLoading()
					console.log(res.data.code)
					if(res.data.code==401){
						console.log('pp')
						uni.clearStorageSync();	
					    uni.redirectTo({
					    	url:'/pages/login/login'
					    })
					}

					// uni.showToast({ 
					//    title:res.data.msg, 
					//    icon:'none'
					// })
					resolve(res)                         
				},
				fail: (res) => {
					fetch.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})  
	}
}

module.exports = {
	request: fetch.request,
	interfaceUrl:fetch.interfaceUrl,
	url:"",
	toast: fetch.toast
}
