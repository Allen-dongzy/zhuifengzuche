// request.js
const request = (options) => {
  return new Promise((resolve, reject) => {
    const { data, method } = options
    //console.log(data)
    // if(data && method !== 'get') {
    //   options.data = JSON.stringify(data)
    // }
    uni.request({
      header: { 'Content-Type': 'application/x-www-form-urlencoded',
                  // 'openid':uni.getStorageSync('openid')
     },
      url:options.url,
      data:data,
      method:method,

      success: function(res) {
        //console.log(res)
        if(res.data.code==401){
          // uni.clearStorageSync('userinfo')
          uni.showToast({
            title: res.data.msg,
            icon:'none',
            duration: 2000, //延迟时间,
            success: res => {
              uni.reLaunch({
                url: '../index/index',
              })
            }
          })
    
        }
          //console.log('ppp')
          resolve(res.data)
  
      },
      fail: function(res) {
        reject(res.data)
      }
    })
  })
}
export default request