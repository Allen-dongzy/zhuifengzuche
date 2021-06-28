import request from '@/request'
import config from '@/request/config'

// 上传oss图片
export const uploadFiles = async tempFilePaths => {
	return new Promise((resolve, reject) => {
		let imgArr = []
		for (let i = 0; i < tempFilePaths.length; i++) {
			uni.uploadFile({
				header: {
					'Content-Type': 'multipart/form-data'
				},
				url: `${config.host}/${config.apiKeyword}/oss/uploadImage`, //上传接口
				filePath: tempFilePaths[i],
				name: 'file',
				success: (res) => {
					const url = JSON.parse(res.data).data
					imgArr.push(url);
					if (imgArr.length === tempFilePaths.length) resolve(imgArr)
				},
				fail: (err => reject(err))
			});
		}
	}).then(res => [null, res]).catch(err => [err])
}
