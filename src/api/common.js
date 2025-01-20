import request from '@/utils/request'

// 登录接口
export const Login = data => {
  return request({
    url: '/admin/admin-user/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Access-Control-Allow-Origin": "*",
      'Accept': 'application/json'
    },
    data,
  })
}

// 登出接口
export const Logout = () => {
  return request({
    url: '/admin/admin-user/logout',
    method: 'post',
  })
}

// 文件上传
export const uploadFile = data => {
  return request({
    url: '/admin/common/upload',
    method: 'post',
    data,
  })
}

// 获取登录用户信息
export const GetUserinfo = () => {
  return request({
    url: '/api/userinfo',
    method: 'get',
  })
}
