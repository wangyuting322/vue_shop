import {request} from './request.js'
export function getmenusdata(){
  return request({
    url:'/menus',
    method:'get'
  })
}