import { Autowired, Controller, Delete, Get, Post, Put } from 'mango-core'
import type { Merge } from 'mango-types'
import type { Context } from '@/index'
import { UserService } from './user.service'
import { RegisterSchema, queryUserSchema, userSchema } from './user.schema'
import { IsTokenExpiredGuard } from '@/guard/is-token-expired.guard'
import { t } from 'elysia'

@Controller({
  name: '用户管理',
  prefix: '/user',
  detail: {
    description: '用户相关的接口',
    tags: ['user'],
  },
})
export default class UserController {
  @Autowired
  service: UserService

  @Post('/register', {
    body: RegisterSchema,
    detail: {
      description: '用户注册接口',
    },
  })
  async register(context: Merge<Context, { body: typeof RegisterSchema.static }>) {
    return await this.service.register(context)
  }

  @Get('/info', {
    detail: {
      description: '获取用户信息接口',
    },
  })
  @IsTokenExpiredGuard
  async info(context: Context) {
    return await this.service.info(context)
  }

  @Get('', {
    query: queryUserSchema,
    detail: {
      description: '获取用户列表接口',
    },
  })
  @IsTokenExpiredGuard
  async findAll(context: Merge<Context, { query: typeof queryUserSchema.static }>) {
    return await this.service.findAll(context)
  }

  @Post('', {
    body: userSchema,
    detail: {
      description: '创建用户接口',
    },
  })
  @IsTokenExpiredGuard
  async create(context: Merge<Context, { body: typeof userSchema.static }>) {
    return await this.service.create(context)
  }

  @Put('', {
    body: t.Omit(userSchema, ['password']),
    query: t.Object({
      id: t.String({
        description: '用户id',
      }),
    }),
    detail: {
      description: '更新用户',
    },
  })
  @IsTokenExpiredGuard
  async update(
    context: Merge<
      Context,
      {
        body: typeof userSchema.static
        query: {
          id: string
        }
      }
    >,
  ) {
    return await this.service.update(context)
  }

  @Delete('', {
    query: t.Object({
      id: t.String({
        description: '用户id',
      }),
    }),
    detail: {
      description: '删除用户',
    },
  })
  @IsTokenExpiredGuard
  async delete(context: Merge<Context, { query: { id: string } }>) {
    return await this.service.delete(context)
  }
}
