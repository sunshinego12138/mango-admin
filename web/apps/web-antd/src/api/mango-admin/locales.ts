// @ts-ignore
/* eslint-disable */
import { request } from '#/api/request'

/** 获取国际化管理列表, 管理用的 GET /locales */
export async function getLocales(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLocalesParams,
  options?: { [key: string]: any },
) {
  return request<any>('/locales', {
    method: 'GET',
    params: {
      // startTime has a default value: 915148800000
      startTime: '915148800000',
      // endTime has a default value: 32472144000000
      endTime: '32472144000000',
      ...params,
    },
    ...(options || {}),
  })
}

/** 更新国际化 PUT /locales */
export async function putLocales(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putLocalesParams,
  body: {
    /** 国际化字段 */
    name: string
    /** 父级id */
    parentId?: string
    /** 中文 */
    zhCN?: string
    /** 英文 */
    enUS?: string
    /** 日文 */
    jaJP?: string
    /** 繁体中文 */
    zhTW?: string
  },
  options?: { [key: string]: any },
) {
  return request<any>('/locales', {
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

/** 创建国际化 POST /locales */
export async function postLocales(
  body: {
    /** 国际化字段 */
    name: string
    /** 父级id */
    parentId?: string
    /** 中文 */
    zhCN?: string
    /** 英文 */
    enUS?: string
    /** 日文 */
    jaJP?: string
    /** 繁体中文 */
    zhTW?: string
  },
  options?: { [key: string]: any },
) {
  return request<any>('/locales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除国际化 DELETE /locales */
export async function deleteLocales(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteLocalesParams,
  options?: { [key: string]: any },
) {
  return request<any>('/locales', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取系统国际化列表,返回国际化键值对 GET /locales/all */
export async function getLocalesAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLocalesAllParams,
  options?: { [key: string]: any },
) {
  return request<any>('/locales/all', {
    method: 'GET',
    params: {
      // lang has a default value: zh-CN
      lang: 'zh-CN',
      ...params,
    },
    ...(options || {}),
  })
}
