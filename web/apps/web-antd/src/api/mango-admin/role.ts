// @ts-ignore
/* eslint-disable */
import { request } from '#/api/request'

/** 获取角色列表 GET /role */
export async function getRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleParams,
  options?: { [key: string]: any },
) {
  return request<any>('/role', {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // size has a default value: 10
      size: '10',
      // startTime has a default value: 915148800000
      startTime: '915148800000',
      // endTime has a default value: 32472144000000
      endTime: '32472144000000',
      ...params,
    },
    ...(options || {}),
  })
}

/** 更新角色 PUT /role */
export async function putRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putRoleParams,
  body: {
    /** 角色名称 */
    name: string
    /** 角色编码 */
    code: string
    /** 排序 */
    sort: number
    /** 角色描述 */
    description?: string
    /** 菜单id集合 */
    menu: string[]
  },
  options?: { [key: string]: any },
) {
  return request<any>('/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  })
}

/** 创建角色 POST /role */
export async function postRole(
  body: {
    /** 角色名称 */
    name: string
    /** 角色编码 */
    code: string
    /** 排序 */
    sort: number
    /** 角色描述 */
    description?: string
    /** 菜单id集合 */
    menu: string[]
  },
  options?: { [key: string]: any },
) {
  return request<any>('/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除角色 DELETE /role */
export async function deleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleParams,
  options?: { [key: string]: any },
) {
  return request<any>('/role', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
