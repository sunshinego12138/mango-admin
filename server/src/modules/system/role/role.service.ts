import { PrismaService } from '@/prisma'
import { BadResponse, HttpResponse, MangoResponse, arrayToTree } from '@/utils'
import { Autowired } from 'mango-core'
import type { Merge } from 'mango-types'
import type { Context } from '@/index'
import { roleSchema, queryRoleSchema, roleDeleteSchema } from './role.schema'

export class RoleService {
  @Autowired
  prisma: PrismaService

  async findAll({ query }: Merge<Context, { query: typeof queryRoleSchema.static }>) {
    return await HttpResponse(async () => {
      // 分页处理，这里获取到的分页是字符串，需要转换成整数
      const take = Number(query.size)
      const skip = (Number(query.current) - 1) * take
      // 条件判断
      const where: Record<string, any> = {} // 查询参数
      // 模糊查询
      if (query.name) {
        where['name'] = { contains: query.name }
      }

      if (query.code) {
        where['code'] = { contains: query.code }
      }

      if (query.startTime && query.endTime) {
        where['createdAt'] = {
          gte: new Date(Number(query.startTime)),
          lte: new Date(Number(query.endTime)),
        }
      }
      const records = await this.prisma.role.findMany({
        skip,
        take,
        where,
        include: {
          permissions: {
            include: {
              role: true,
              menu: true,
            },
          },
        },
        orderBy: [
          { sort: 'desc' }, // 按照sort字段升序
          { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
        ],
      })
      // 总条数
      const total = await this.prisma.role.count({ where })
      return MangoResponse({
        data: { items: records, total, current: query.current, size: take },
      })
    })
  }

  async create({ body }: Merge<Context, { body: typeof roleSchema.static }>) {
    return await HttpResponse(async () => {
      const { menu, ...data } = body
      const result = await this.prisma.role.create({
        data: {
          ...data,
          permissions: {
            create: body.menu.map((menuId) => ({
              menuId,
            })),
          },
        },
      })
      return MangoResponse({
        data: result,
      })
    })
  }

  async update({ body, query }: Merge<Context, { body: typeof roleSchema.static }>) {
    return await HttpResponse(async () => {
      const result = await this.prisma.$transaction(async (prisma) => {
        // 删除角色权限
        await prisma.permission.deleteMany({ where: { roleId: query.id } })
        const { menu, ...data } = body
        // 使用事务进行嵌套写入
        const result = await prisma.role.update({
          where: { id: query.id },
          data: {
            ...data,
            permissions: {
              create: body.menu.map((menuId) => ({
                menuId,
              })),
            },
          },
        })
        return result
      })
      return MangoResponse({
        data: result,
      })
    })
  }

  async delete({ query }: Merge<Context, { query: typeof roleDeleteSchema.static }>) {
    return await HttpResponse(async () => {
      const result = await this.prisma.$transaction([
        this.prisma.permission.deleteMany({ where: { roleId: query.id } }),
        this.prisma.role.delete({ where: { id: query.id } }),
      ])
      // const result = await this.prisma.$transaction(async (prisma) => {
      //   await prisma.permission.deleteMany({ where: { roleId: query.id } }),
      //   await prisma.role.delete({ where: { id: query.id } }),
      // })
      return MangoResponse({
        data: result,
      })
    })
  }
}
