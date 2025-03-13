// @ts-ignore
/* eslint-disable */
import { request } from '#/api/request'

/** 获取菜单管理列表 GET /menu */
export async function getMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMenuParams,
  options?: { [key: string]: any },
) {
  return request<any>('/menu', {
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

/** 更新菜单 PUT /menu */
export async function putMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putMenuParams,
  body: {
    /** 菜单名称 */
    title: string
    /** 父级id */
    parentId?: string
    /** 菜单名称 */
    name: string
    /** 路由路径 */
    path: string
    /** 组件 */
    component?: string
    /** 重定向 */
    redirect?: string
    /** 排序 */
    sort: number
    /** 路由元信息 */
    meta?: {
      activeIcon?: string
      activePath?: string
      affixTab?: boolean
      affixTabOrder?: number
      authority?: string[]
      badge?: string
      badgeType?: string | string
      badgeVariants?: string | string | string | string | string | string
      hideChildrenInMenu?: boolean
      hideInBreadcrumb?: boolean
      hideInMenu?: boolean
      hideInTab?: boolean
      icon?: string | any
      iframeSrc?: string
      ignoreAccess?: boolean
      keepAlive?: boolean
      link?: string
      loaded?: boolean
      maxNumOfOpenTab?: number
      menuVisibleWithForbidden?: boolean
      noBasicLayout?: boolean
      openInNewWindow?: boolean
      order?: number
      query?: Record<string, any>
    }
  },
  options?: { [key: string]: any },
) {
  return request<any>('/menu', {
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

/** 创建菜单 POST /menu */
export async function postMenu(
  body: {
    /** 菜单名称 */
    title: string
    /** 父级id */
    parentId?: string
    /** 菜单名称 */
    name: string
    /** 路由路径 */
    path: string
    /** 组件 */
    component?: string
    /** 重定向 */
    redirect?: string
    /** 排序 */
    sort: number
    /** 路由元信息 */
    meta?: {
      activeIcon?: string
      activePath?: string
      affixTab?: boolean
      affixTabOrder?: number
      authority?: string[]
      badge?: string
      badgeType?: string | string
      badgeVariants?: string | string | string | string | string | string
      hideChildrenInMenu?: boolean
      hideInBreadcrumb?: boolean
      hideInMenu?: boolean
      hideInTab?: boolean
      icon?: string | any
      iframeSrc?: string
      ignoreAccess?: boolean
      keepAlive?: boolean
      link?: string
      loaded?: boolean
      maxNumOfOpenTab?: number
      menuVisibleWithForbidden?: boolean
      noBasicLayout?: boolean
      openInNewWindow?: boolean
      order?: number
      query?: Record<string, any>
    }
  },
  options?: { [key: string]: any },
) {
  return request<any>('/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除菜单 DELETE /menu */
export async function deleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenuParams,
  options?: { [key: string]: any },
) {
  return request<any>('/menu', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
