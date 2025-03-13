import { Autowired, Controller, Post } from 'mango-core'
import type { Context } from '@/index'
import type { Merge } from 'mango-types'
import { LoginSchema } from './auth.schema'
import { AuthService } from './auth.service'

@Controller({
  name: '身份鉴权',
  prefix: '/auth',
  detail: {
    description: '鉴权相关的接口',
    tags: ['auth'],
  },
})
export default class AuthController {
  @Autowired
  service: AuthService

  @Post('/login', {
    body: LoginSchema,
    detail: {
      description: '登录接口',
    },
  })
  async login(context: Merge<Context, { body: typeof LoginSchema.static }>) {
    return await this.service.login(context)
  }
}
