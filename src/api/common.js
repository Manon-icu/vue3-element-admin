import request from '@/utils/request'

// 登录接口
export const Login = data => {
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
