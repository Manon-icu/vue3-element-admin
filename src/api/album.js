import request from '@/utils/request'

// 添加 相册
export const addPhotoAlbums = data => {
  return request({
    url: '/admin/photo-albums',
    data,
    method: 'post',
  })
}

// 编辑 相册
export const editPhotoAlbums = id => {
    return request({
      url: `/admin/photo-albums/${id}`,
      method: 'put',
    })
  }


// 查询 相册 列表
export const getPhotoAlbumsList = params => {
    return request({
      url: '/admin/photo-albums',
      params,
    })
  }

