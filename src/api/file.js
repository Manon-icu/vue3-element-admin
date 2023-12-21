import request from '@/utils/request'

// 查询 相册文件 列表
export const getPhotoAlbumsFilesList = params => {
  return request({
    url: '/admin/photo-album-files',
    params,
  })
}

// 添加 相册文件
export const addPhotoAlbumsFiles = data => {
  return request({
    url: '/admin/photo-album-files',
    data,
    method: 'post',
  })
}


// 编辑 相册文件
export const editPhotoAlbumsFiles = (id, data) => {
  return request({
    url: `/admin/photo-album-files/${id}`,
    method: 'put',
    data,
  })
}

// 相册文件详情
export const detailPhotoAlbumsFile = (id) => {
  return request({
    url: `/admin/photo-album-files/${id}`,
    method: 'get',
  })
}


 // 相册文件状态反转
export const reverseFileStatusPhoto = data => {
  return request({
    url: '/admin/photo-album-file/reverse-status',
    data,
    method: 'post',
  })
}

