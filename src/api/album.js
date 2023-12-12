import request from '@/utils/request'

// 查询 相册 列表
export const getPhotoAlbumsList = params => {
    return request({
      url: '/admin/photo-albums',
      params,
    })
  }

// 添加 相册
export const addPhotoAlbums = data => {
  return request({
    url: '/admin/photo-albums',
    data,
    method: 'post',
  })
}


// 相册详情
export const detailPhotoAlbums = (id) => {
  return request({
    url: `admin/photo-albums/${id}`,
    method: 'get',
  })
}

// 编辑 相册
  export const editPhotoAlbums = (id, data) => {
    return request({
      url: `/admin/photo-albums/${id}`,
      method: 'put',
      data,
    })
  }

 // 相册状态反转
export const reverseStatusPhoto = data => {
  return request({
    url: '/admin/photo-album/reverse-status',
    data,
    method: 'post',
  })
}

