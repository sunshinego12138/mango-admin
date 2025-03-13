// @ts-ignore
/* eslint-disable */
import { request } from '#/api/request'

/** 获取用户列表接口 GET /user */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserParams,
  options?: { [key: string]: any },
) {
  return request<any>('/user', {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // size has a default value: 10
      size: '10',
      ...params,
    },
    ...(options || {}),
  })
}

/** 更新用户 PUT /user */
export async function putUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putUserParams,
  body: {
    /** 用户名 */
    username: string
    /** 密码 */
    password: string
    /** 用户描述 */
    description?: string
    /** 角色id */
    roleId: string
    /** 中文名 */
    realName?: string
    /** 手机号 */
    phone?: string
    /** 邮箱 */
    email?: string
    sex: string | string
    /** 状态 */
    status?: string | string
    /** 排序 */
    sort: number
    /** 头像 */
    avatar?: string
  },
  options?: { [key: string]: any },
) {
  return request<any>('/user', {
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

/** 创建用户接口 POST /user */
export async function postUser(
  body: {
    /** 用户名 */
    username: string
    /** 密码 */
    password: string
    /** 用户描述 */
    description?: string
    /** 角色id */
    roleId: string
    /** 中文名 */
    realName?: string
    /** 手机号 */
    phone?: string
    /** 邮箱 */
    email?: string
    sex: string | string
    /** 状态 */
    status?: string | string
    /** 排序 */
    sort: number
    /** 头像 */
    avatar?: string
  },
  options?: { [key: string]: any },
) {
  return request<any>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除用户 DELETE /user */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any },
) {
  return request<any>('/user', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取用户信息接口 GET /user/info */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<any>('/user/info', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 用户注册接口 POST /user/register */
export async function postUserRegister(
  body: {
    /** 是否同意协议 */
    agreePolicy: boolean
    /** 确认密码 */
    confirmPassword: string
    /** 密码 */
    password: string
    /** 用户名 */
    username: string
  },
  options?: { [key: string]: any },
) {
  return request<any>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
