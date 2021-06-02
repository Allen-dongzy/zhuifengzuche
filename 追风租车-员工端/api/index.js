import request from '../utils/request.js'
// baseUrl也可拼接在request.js中，当有多个鉴权模块，放在这里更灵活
const baseUrl = getApp().globalData.baseUrl

//get 事例
export function join_user(data) {
  return request({ 
    url: `${baseUrl}/activity/reward/join_user`,
    method: 'get',
    data:data
  })
} 
//post 事例
export function reward_info(data) {
  return request({ 
    url: `${baseUrl}/activity/reward/reward_info`,
    method: 'post',
    data:data
  })
} 



