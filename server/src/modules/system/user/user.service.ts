import { PrismaService } from '@/prisma'
import { Autowired } from 'mango-core'
import type { Merge } from 'mango-types'
import type { Context } from '@/index'
import { RegisterSchema, queryUserSchema, userSchema } from './user.schema'
import { HttpResponse, MangoResponse, omit } from '@/utils'
import { v4 as uuidv4 } from 'uuid'
import { hashSync } from 'bcryptjs'
import { HttpStatus } from '@/enum/http'

export class UserService {
  @Autowired
  prisma: PrismaService

  async register({ body }: Merge<Context, { body: typeof RegisterSchema.static }>) {
    return await HttpResponse(async () => {
      if (!body.agreePolicy) {
        return MangoResponse({
          responseCode: HttpStatus.BAD_REQUEST,
          message: '请同意协议',
        })
      }
      if (body.password !== body.confirmPassword) {
        return MangoResponse({
          responseCode: HttpStatus.BAD_REQUEST,
          message: '两次密码不一致',
        })
      }
      const user = await this.prisma.user.create({
        data: {
          id: uuidv4().replace(/-/g, ''),
          password: hashSync(body.password, 10),
          username: body.username,
          sort: 0,
        },
      })
      const { password, lastLoginAt, lastIp, loginCount, ...res } = user
      return MangoResponse({
        data: res,
        message: '注册成功',
      })
    })
  }

  async info({ jwt, request }: Context) {
    return await HttpResponse(async () => {
      const authorization = request.headers.get('authorization')!
      if (!authorization) {
        return MangoResponse({
          responseCode: HttpStatus.UNAUTHORIZED,
          message: '未登录',
        })
      }
      const auth = authorization.split(' ').at(-1)
      const data: any = await jwt.verify(auth)
      const user = await this.prisma.user.findFirst({
        where: {
          id: data.sub,
        },
      })
      if (user) {
        const { password, lastLoginAt, lastIp, loginCount, ...res } = user
        return MangoResponse({
          data: res,
          message: '获取用户信息成功',
        })
      } else {
        return MangoResponse({
          responseCode: HttpStatus.UNAUTHORIZED,
          message: '未登录',
        })
      }
    })
  }

  async findAll({ query }: Merge<Context, { query: typeof queryUserSchema.static }>) {
    return await HttpResponse(async () => {
      // 分页处理，这里获取到的分页是字符串，需要转换成整数
      const take = Number(query.size)
      const skip = (Number(query.current) - 1) * take
      // 条件判断
      const where: Record<string, any> = {} // 查询参数
      // 模糊查询
      if (query.userName) {
        where['userName'] = { contains: query.userName }
      }

      if (query.status) {
        where['status'] = { equals: status }
      }

      const records = await this.prisma.user.findMany({
        skip,
        take,
        where,
        select: {
          id: true,
          username: true,
          realName: true,
          email: true,
          phone: true,
          avatar: true,
          sex: true,
          status: true,
          sort: true,
          roleId: true,
          role: true,
          loginCount: true,
          lastIp: true,
          lastLoginAt: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: [
          { sort: 'desc' }, // 按照sort字段升序
          { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
        ],
      })
      // 总条数
      const total = await this.prisma.user.count({ where })
      return MangoResponse({
        data: { items: records, total, current: query.current, size: take },
      })
    })
  }

  async create({ body }: Merge<Context, { body: typeof userSchema.static }>) {
    return await HttpResponse(async () => {
      const { password, ...data } = body
      const res = await this.prisma.user.create({
        data: {
          ...data,
          password: hashSync(password, 10),
        },
      })
      return MangoResponse({
        data: res,
      })
    })
  }

  async update({
    query,
    body,
  }: Merge<
    Context,
    {
      body: typeof userSchema.static
      query: {
        id: string
      }
    }
  >) {
    return await HttpResponse(async () => {
      // 判断用户是否存在
      const user = await this.prisma.user.findFirst({
        where: {
          id: query.id,
        },
      })
      if (!user) {
        return MangoResponse({
          responseCode: HttpStatus.BAD_REQUEST,
          message: '用户不存在',
        })
      }

      const res = await this.prisma.user.update({
        where: {
          id: query.id,
        },
        data: body,
      })

      return MangoResponse({
        data: omit(res, ['password']),
      })
    })
  }

  async delete({ query, headers, jwt }: Merge<Context, { query: { id: string } }>) {
    return await HttpResponse(async () => {
      const authorization = headers.authorization!
      const auth = authorization.split(' ').at(-1)
      const data: any = await jwt.verify(auth)
      if (data.sub === query.id) {
        return MangoResponse({
          responseCode: HttpStatus.BAD_REQUEST,
          message: '不能删除自己',
        })
      }
      const res = await this.prisma.user.delete({
        where: {
          id: query.id,
        },
      })
      return MangoResponse({
        data: res,
      })
    })
  }
}
