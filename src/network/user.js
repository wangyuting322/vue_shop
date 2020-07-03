import {request} from './request.js'
// 获取所有用户列表数据
export function getuserlistdata(queryInfo){
  return request({
    url:'/users',
    method:'get',
    params:{
      queryInfo
    }
  })
}
// 更新用户的state值
export function changeuserstate(uid,state){
  return request({
    url:`/users/${uid}/state/${state}`,
    method:'put'
  })
}
// 新增用户的请求
export function addusers(addForm){
  return request({
    url:'/users',
    method:'post',
    data:{
      addForm
    }
  })
}
// 根据用户id获取该条数据的信息
export function geteditdata(id){
  return request({
    url:`/users/${id}`,
    method:'get',
    // params:{
    //   id
    // }
  })
}
// 根据用户id更新该条数据的信息
export function editusers(editForm){
  return request({
    url:`/users/${editForm.id}`,
    method:'put',
    params:{
      editForm
    }
  })
}
// 根据用户id请求删除该条数据的信息
export function removeuser(id){
  return request({
    url:`/users/${id}`,
    method:'delete'
  })
}