import { PrismaService } from '@/prisma'
import { Autowired } from 'mango-core'
import type { Merge } from 'mango-types'
import type { Context } from '@/index'
import { queryLocalesSchema, localesSchema, localesDeleteSchema, type localesListSchema } from './locales.schema'
import { BadResponse, HttpResponse, MangoResponse, arrayToTree, convertItemsToKeyValue } from '@/utils'

type localesKey = (typeof localesListSchema.static)['lang']

export class LocalesService {
  @Autowired
  prisma: PrismaService

  async findAll({ query }: Merge<Context, { query: typeof queryLocalesSchema.static }>) {
    return await HttpResponse(async () => {
      // 条件判断
      const where: Record<string, any> = {} // 查询参数
      // 模糊查询
      if (query?.name) {
        where['name'] = { contains: query.name }
      }

      if (query?.startTime && query?.endTime) {
        where['createdAt'] = {
          gte: new Date(Number(query.startTime)),
          lte: new Date(Number(query.endTime)),
        }
      }
      const res = await this.prisma.locales.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }],
      })
      const data = query.tree ? arrayToTree(res || []) : res
      return MangoResponse({
        data,
      })
    })
  }

  async locales({ query }: Merge<Context, { query: typeof localesListSchema.static }>) {
    return await HttpResponse(async () => {
      const res = await this.prisma.locales.findMany({
        orderBy: [{ createdAt: 'desc' }],
      })
      const data = arrayToTree(res, (item) => {
        const key = query.lang.replaceAll('-', '') as keyof typeof item
        return {
          ...item,
          value: item[key],
        }
      })
      const result = convertItemsToKeyValue(data as any)
      return MangoResponse({
        data: result,
      })
    })
  }

  async create({ body }: Merge<Context, { body: typeof localesSchema.static }>) {
    return await HttpResponse(async () => {
      const item = await this.prisma.locales.count({
        where: {
          name: body.name,
          parentId: body.parentId,
        },
      })
      if (item > 0) {
        return BadResponse('同一层级 name 不能相同')
      }
      const res = await this.prisma.locales.create({
        data: body,
      })
      return MangoResponse({
        data: res,
      })
    })
  }

  async update({ body, query }: Merge<Context, { body: typeof localesSchema.static }>) {
    return await HttpResponse(async () => {
      // 判断父级不能是子级
      if (query.id === body.parentId) {
        return BadResponse('父级不能是自己')
      }
      // 条件判断
      const where = {
        id: {
          not: query.id,
        },
        name: body.name,
        parentId: body.parentId || null,
      }
      // 同一层级不能有重复的key
      const hasChildren = await this.prisma.locales.count({
        where,
      })
      if (hasChildren > 0) {
        return BadResponse('同一层级 name 不能相同')
      }
      const res = await this.prisma.locales.update({
        where: { id: query.id },
        data: body,
      })
      return MangoResponse({
        data: res,
      })
    })
  }

  async delete({ query }: Merge<Context, { query: typeof localesDeleteSchema.static }>) {
    return await HttpResponse(async () => {
      const hasChildren = await this.prisma.locales.count({
        where: {
          parentId: query.id,
        },
      })
      if (hasChildren > 0) {
        return BadResponse('该国际化字段下有子级，不能删除!')
      } else {
        const res = await this.prisma.locales.delete({
          where: { id: query.id },
        })
        return MangoResponse({
          data: res,
        })
      }
    })
  }
}
