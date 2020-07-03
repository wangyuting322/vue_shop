import {request} from './request.js'
// 获取所有用户列表数据
export function getrightslistdata(){
  return request({
    url:'/rigths/list',
    method:'get'
  })
}