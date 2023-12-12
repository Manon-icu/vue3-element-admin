import request from '@/utils/request'

export const getNewsList = params => {
  return request({
    url: '/admin/news',
    method: 'get',
    params,
  })
}

export const getNewsDetail = id => {
  return request({
    url: `/admin/news/${id}`,
    method: 'get',
  })
}

export const createNews = data => {
  return request({
    url: '/admin/news',
    method: 'post',
    data,
  })
}

export const editNews = data => {
  return request({
    url: `/admin/news/${data.id}`,
    method: 'put',
    data,
  })
}

export const toggleStatus = data => {
  return request({
    url: `/admin/news/${id}/reverse-status`,
    method: 'post',
    data,
  })
}
