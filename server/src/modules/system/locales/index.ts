import { Autowired, Controller, Delete, Get, Post, Put } from 'mango-core'
import { LocalesService } from './locales.service'
import type { Merge } from 'mango-types'
import type { Context } from '@/index'
import { queryLocalesSchema, localesSchema, localesDeleteSchema, localesListSchema } from './locales.schema'
import { IsTokenExpiredGuard } from '@/guard/is-token-expired.guard'
import { MangoResponse } from '@/utils'
import { t } from 'elysia'

@Controller({
  name: '国际化',
  prefix: '/locales',
  detail: {
    description: '国际化的接口',
    tags: ['locales'],
  },
})
export default class LocalesController {
  @Autowired
  service: LocalesService

  @Get('/all', {
    query: localesListSchema,
    detail: {
      description: '获取系统国际化列表,返回国际化键值对',
    },
  })
  async locales(context: Merge<Context, { query: typeof localesListSchema.static }>) {
    return await this.service.locales(context)
  }

  @Get('', {
    query: queryLocalesSchema,
    detail: {
      description: '获取国际化管理列表, 管理用的',
    },
  })
  @IsTokenExpiredGuard
  async findAll(context: Merge<Context, { query: typeof queryLocalesSchema.static }>) {
    return await this.service.findAll(context)
  }

  @Post('', {
    body: localesSchema,
    detail: {
      description: '创建国际化',
    },
  })
  @IsTokenExpiredGuard
  async create(context: Merge<Context, { body: typeof localesSchema.static }>) {
    return await this.service.create(context)
  }

  @Put('', {
    body: localesSchema,
    query: t.Object({
      id: t.String({
        description: '国际化id',
      }),
    }),
    detail: {
      description: '更新国际化',
    },
  })
  @IsTokenExpiredGuard
  async update(context: Merge<Context, { body: typeof localesSchema.static }>) {
    return await this.service.update(context)
  }

  @Delete('', {
    query: localesDeleteSchema,
    detail: {
      description: '删除国际化',
    },
  })
  @IsTokenExpiredGuard
  async delete(context: Merge<Context, { query: typeof localesDeleteSchema.static }>) {
    return await this.service.delete(context)
  }
}
