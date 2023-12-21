import request from '@/utils/request'

/**
 * 课程分页列表
 * @param {*} params
 * @returns
 */
export const getTrainingList = params => {
  return request({
    url: '/admin/courses',
    method: 'get',
    params,
  })
}

/**
 * 课程详情
 * @param {*} id
 * @returns
 */
export const getTrainingDetail = id => {
  return request({
    url: `/admin/courses/${id}`,
    method: 'get',
  })
}

/**
 * 添加课程
 * @param {*} data
 * @returns
 */
export const addCourse = data => {
  return request({
    url: '/admin/courses',
    method: 'post',
    data,
  })
}

/**
 * 编辑课程
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const editCourse = (id, data) => {
  return request({
    url: `/admin/courses/${id}`,
    method: 'put',
    data,
  })
}

export const toggleCourseStatus = data => {
  return request({
    url: `/admin/course/reverse-status`,
    method: 'POST',
    data,
  })
}
