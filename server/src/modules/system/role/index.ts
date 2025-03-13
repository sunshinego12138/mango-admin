import { Autowired, Controller, Delete, Get, Post, Put } from 'mango-core'
import type { Context } from '@/index'
import type { Merge } from 'mango-types'
import { RoleService } from './role.service'
import { IsTokenExpiredGuard } from '@/guard/is-token-expired.guard'
import { roleDeleteSchema, roleSchema, queryRoleSchema } from './role.schema'
import { t } from 'elysia'

@Controller({
  name: '角色管理',
  prefix: '/role',
  detail: {
    description: '角色管理相关的接口',
    tags: ['role'],
  },
})
export default class RoleController {
  @Autowired
  service: RoleService

  @Get('', {
    query: queryRoleSchema,
    detail: {
      description: '获取角色列表',
    },
  })
  @IsTokenExpiredGuard
  async findAll(context: Merge<Context, { query: typeof queryRoleSchema.static }>) {
    return await this.service.findAll(context)
  }

  @Post('', {
    body: roleSchema,
    detail: {
      description: '创建角色',
    },
  })
  @IsTokenExpiredGuard
  async create(context: Merge<Context, { body: typeof roleSchema.static }>) {
    return await this.service.create(context)
  }

  @Put('', {
    body: roleSchema,
    query: t.Object({
      id: t.String({
        description: '角色id',
      }),
    }),
    detail: {
      description: '更新角色',
    },
  })
  @IsTokenExpiredGuard
  async update(context: Merge<Context, { body: typeof roleSchema.static }>) {
    return await this.service.update(context)
  }

  @Delete('', {
    query: roleDeleteSchema,
    detail: {
      description: '删除角色',
    },
  })
  @IsTokenExpiredGuard
  async delete(context: Merge<Context, { query: typeof roleDeleteSchema.static }>) {
    return await this.service.delete(context)
  }
}
