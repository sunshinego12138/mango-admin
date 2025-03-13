declare namespace API {
  type deleteLocalesParams = {
    /** 国际化字段id */
    id: string
  }

  type deleteMenuParams = {
    /** 菜单id */
    id: string
  }

  type deleteRoleParams = {
    /** 角色id */
    id: string
  }

  type deleteUserParams = {
    /** 用户id */
    id: string
  }

  type getFileFileParams = {
    /** 文件名 */
    name: string
  }

  type getLocalesAllParams = {
    /** 国际化值 */
    lang: string | string | string | string
  }

  type getLocalesParams = {
    /** 国际化id */
    id?: string
    /** 是否为树形结构 */
    tree?: boolean
    /** 国际化字段 */
    name?: string
    /** 开始时间 */
    startTime?: Date | string | string | number
    /** 结束时间 */
    endTime?: Date | string | string | number
  }

  type getMenuParams = {
    /** 是否为树形结构 */
    tree?: boolean
    /** 菜单名称 */
    title?: string
    /** 路由名称 */
    name?: string
    /** 开始时间 */
    startTime?: Date | string | string | number
    /** 结束时间 */
    endTime?: Date | string | string | number
  }

  type getRoleParams = {
    /** 角色名称 */
    name?: string
    /** 角色编码 */
    code?: string
    /** 当前页 */
    current?: number
    /** 每页条数 */
    size?: number
    /** 开始时间 */
    startTime?: Date | string | string | number
    /** 结束时间 */
    endTime?: Date | string | string | number
  }

  type getUserParams = {
    /** 用户名 */
    userName?: string
    /** 状态 */
    status?: string | string
    /** 当前页 */
    current?: number
    /** 每页条数 */
    size?: number
  }

  type putLocalesParams = {
    /** 国际化id */
    id: string
  }

  type putMenuParams = {
    /** 菜单id */
    id: string
  }

  type putRoleParams = {
    /** 角色id */
    id: string
  }

  type putUserParams = {
    /** 用户id */
    id: string
  }
}
