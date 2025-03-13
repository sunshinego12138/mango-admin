import { PrismaService } from '@/prisma'
import { Autowired, HttpStatus } from 'mango-core'
import type { LoginSchema } from './auth.schema'
import { compareSync } from 'bcryptjs'
import { HttpResponse, MangoResponse } from '@/utils'
import dayjs from 'dayjs'
import type { Merge } from 'mango-types'
import type { Context } from '@/index'

export class AuthService {
  @Autowired
  prisma: PrismaService

  async login({ body, jwt }: Merge<Context, { body: typeof LoginSchema.static }>) {
    return await HttpResponse(async () => {
      const user = await this.prisma.user.findFirst({
        where: {
          username: body.username,
        },
      })
      if (!user || !compareSync(body.password, user.password)) {
        return MangoResponse({
          responseCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: '用户名或密码错误',
        })
      }
      const { password, lastLoginAt, lastIp, loginCount, ...res } = user
      return MangoResponse({
        data: {
          ...res,
          accessToken: await jwt.sign({
            sub: user.id,
            timestamp: dayjs().valueOf(),
          }),
        },
      })
    })
  }
}
