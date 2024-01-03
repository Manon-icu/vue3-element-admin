import request from '@/utils/request'

// 添加团队成员
export const addTeamMember = data => {
  return request({
    url: '/admin/team-members',
    data,
    method: 'post',
  })
}

// 编辑团队成员
export const editTeamMember = (id, data) => {
  return request({
    url: `/admin/team-members/${id}`,
    data,
    method: 'put',
  })
}

// 团队成员详情
export const getTeamMember = id => {
  return request({
    url: `/admin/team-members/${id}`,
  })
}

// 查询团队成员列表
export const getTeamMemberList = params => {
  return request({
    url: '/admin/team-members',
    params,
    method: 'get',
  })
}

// 启用团队成员
export const enableTeamMember = id => {
  return request({
    url: `/admin/team-members/${id}/enable`,
    method: 'put',
  })
}

// 禁用团队成员
export const disableTeamMember = id => {
  return request({
    url: `/admin/team-members/${id}/disable`,
    method: 'post',
  })
}
export const toggleTeamMemberStatus = data => {
  return request({
    url: `/admin/team-members/reverse-status`,
    method: 'post',
    data,
  })
}
