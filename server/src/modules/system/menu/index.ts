import { Autowired, Controller, Delete, Get, Post, Put } from 'mango-core'
import type { Merge } from 'mango-types'
import type { Context } from '@/index'
import { MenuService } from './menu.service'
import { IsTokenExpiredGuard } from '@/guard/is-token-expired.guard'
import { menuDeleteSchema, menuSchema, queryMenuSchema } from './menu.schema'
import { t } from 'elysia'

@Controller({
  name: '菜单',
  prefix: '/menu',
  detail: {
    description: '菜单相关的接口',
    tags: ['menu'],
  },
})
export default class MenuController {
  @Autowired
  service: MenuService

  // @Get('/all', {
  //   detail: {
  //     description: '获取系统菜单列表，使用的',
  //   },
  // })
  // async all(context:  Context) {
  //   return await this.service.all(context)
  // }

  @Get('', {
    query: queryMenuSchema,
    detail: {
      description: '获取菜单管理列表',
    },
  })
  @IsTokenExpiredGuard
  async findAll(context: Merge<Context, { query: typeof queryMenuSchema.static }>) {
    return await this.service.findAll(context)
  }

  @Post('', {
    body: menuSchema,
    detail: {
      description: '创建菜单',
    },
  })
  @IsTokenExpiredGuard
  async create(context: Merge<Context, { body: typeof menuSchema.static }>) {
    return await this.service.create(context)
  }

  @Put('', {
    body: menuSchema,
    query: t.Object({
      id: t.String({
        description: '菜单id',
      }),
    }),
    detail: {
      description: '更新菜单',
    },
  })
  @IsTokenExpiredGuard
  async update(context: Merge<Context, { body: typeof menuSchema.static }>) {
    return await this.service.update(context)
  }

  @Delete('', {
    query: menuDeleteSchema,
    detail: {
      description: '删除菜单',
    },
  })
  @IsTokenExpiredGuard
  async delete(context: Merge<Context, { query: typeof menuDeleteSchema.static }>) {
    return await this.service.delete(context)
  }
}
