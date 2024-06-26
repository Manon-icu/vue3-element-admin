import request from '@/utils/request'

// 添加 banner
export const addBanner = data => {
  return request({
    url: '/admin/banner-configs',
    data,
    method: 'post',
  })
}

// 编辑 banner
export const editBanner = (id, data) => {
  return request({
    url: `/admin/banner-configs/${id}`,
    data,
    method: 'put',
  })
}

// banner 详情
export const getBanner = id => {
  return request({
    url: `/admin/banner-configs/${id}`,
  })
}

// 查询 banner 列表
export const getBannerList = params => {
  return request({
    url: '/admin/banner-configs',
    params,
  })
}

// 启用 banner
export const enableBanner = id => {
  return request({
    url: `/admin/banner-configs/${id}/enable`,
    method: 'post',
  })
}

// 禁用 banner
export const disableBanner = id => {
  return request({
    url: `/admin/banner-configs/${id}/disable`,
    method: 'post',
  })
}

// 状态反转
export const toggleBannerStatus = data => {
  return request({
    url: `/admin/banner-config/reverse-status`,
    method: 'post',
    data,
  })
}
