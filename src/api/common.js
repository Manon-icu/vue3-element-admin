import request from '@/utils/request'

// 登录接口
export const Login = data => {
  request.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return request({
    url: '/admin/admin-user/login',
    method: 'post',
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
