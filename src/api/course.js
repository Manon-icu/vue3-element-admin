import request from '@/utils/request'

// 查询 发展历程 列表
export const getHistoriesList = params => {
    return request({
      url: '/admin/histories',
      params,
    })
  }

// 添加 发展历程
export const addHistories = data => {
  return request({
    url: '/admin/histories',
    data,
    method: 'post',
  })
}

// 编辑 发展历程
export const editHistories = (id, data) => {
  return request({
    url: `/admin/histories/${id}`,
    method: 'put',
    data,
  })
}

// 发展历程详情
export const detailHistories = (id) => {
  return request({
    url: `/admin/histories/${id}`,
    method: 'get',
  })
}


 // 发展历程状态反转
export const reverseHistoryStatus = data => {
  return request({
    url: '/admin/history/reverse-status',
    data,
    method: 'post',
  })
}

