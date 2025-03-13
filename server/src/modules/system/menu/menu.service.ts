import { PrismaService } from '@/prisma'
import { BadResponse, HttpResponse, MangoResponse, arrayToTree } from '@/utils'
import { Autowired, HttpStatus } from 'mango-core'
import type { Merge } from 'mango-types'
import type { Context } from '@/index'
import { menuSchema, queryMenuSchema, menuDeleteSchema } from './menu.schema'

export class MenuService {
  @Autowired
  prisma: PrismaService

  /** 保存菜单时的验证 */
  async validateSaveMenu({ body }: Merge<Context, { body: typeof menuSchema.static }>) {
    // 先验证是否有父级
    if (body.parentId && body.parentId.length) {
      const menu = await this.prisma.menu.findUnique({
        where: {
          id: body.parentId,
        },
      })
      if (!menu) {
        return BadResponse('父级不存在!')
      }
    }
    return null
  }

  async all({}: Context) {
    return await HttpResponse(async () => {
      return MangoResponse({
        data: [
          {
            meta: {
              order: -1,
              title: 'page.dashboard.title',
            },
            name: 'Dashboard',
            path: '/dashboard',
            redirect: '/dashboard/analytics',
            children: [
              {
                name: 'Analytics',
                path: '/analytics',
                component: '/dashboard/analytics/index',
                meta: {
                  affixTab: true,
                  title: 'page.dashboard.analytics',
                },
              },
              {
                name: 'Workspace',
                path: '/workspace',
                component: '/dashboard/workspace/index',
                meta: {
                  title: 'page.dashboard.workspace',
                },
              },
            ],
          },
          {
            meta: {
              order: 999,
              title: 'system.title',
              icon: 'icon-park-twotone:setting',
            },
            name: 'SystemManager',
            path: '/system',

            children: [
              {
                name: 'LocalesManager',
                path: '/locales-manager',
                component: '/system-manager/locales-manager/index',
                meta: {
                  icon: 'grommet-icons:language',
                  title: 'system.locales.title',
                },
              },
              {
                name: 'MenuManager',
                path: '/menu-manager',
                component: '/system-manager/menu-manager/index',
                meta: {
                  icon: 'hugeicons:menu-restaurant',
                  title: 'system.menu.title',
                },
              },
            ],
          },
        ],
      })
    })
  }

  async findAll({ query, jwt, request }: Merge<Context, { query: typeof queryMenuSchema.static }>) {
    return await HttpResponse(async () => {
      const authorization = request.headers.get('authorization')!
      const auth = authorization.split(' ').at(-1)
      const data: any = await jwt.verify(auth)
      const user = await this.prisma.user.findFirst({
        where: {
          id: data.sub,
        },
      })
      if (!user?.roleId) {
        return MangoResponse({
          data: [],
          message: '该用户未设置角色',
          responseCode: HttpStatus.UNAUTHORIZED,
        })
      }
      const permission = await this.prisma.permission.findMany({
        where: {
          roleId: user.roleId,
        },
      })
      // 获取菜单列表
      const permissionList = permission.map((item) => item.menuId)
      const where: Record<string, any> = {}
      if (query.title) {
        where['title'] = { contains: query.title }
      }

      if (query.name) {
        where['name'] = { contains: query.name }
      }

      if (query.startTime && query.endTime) {
        where['createdAt'] = {
          gte: new Date(Number(query.startTime)),
          lte: new Date(Number(query.endTime)),
        }
      }
      const result = await this.prisma.menu.findMany({
        where,
        orderBy: [
          { sort: 'asc' }, // 按照sort字段升序
          { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
        ],
      })
      // 获取该角色的菜单
      const list = result.filter((item) => permissionList.includes(item.id))
      const res = query.tree ? arrayToTree(list || []) : list
      // 向meta中添加title
      const reverse = (data: any[]) => {
        data.forEach((item) => {
          item.meta.title = item.title
          if (item.children && item.children.length) {
            reverse(item.children)
          }
        })
      }
      reverse(res)
      return MangoResponse({
        data: res,
      })
    })
  }

  async create(context: Merge<Context, { body: typeof menuSchema.static }>) {
    return await HttpResponse(async () => {
      const response = await this.validateSaveMenu(context)
      if (response) {
        return response
      }
      const result = await this.prisma.menu.create({
        data: {
          ...context.body,
          meta: {
            ...context.body?.meta,
            title: context.body.title,
          },
        },
      })
      return MangoResponse({
        data: result,
      })
    })
  }

  async update(context: Merge<Context, { body: typeof menuSchema.static }>) {
    return await HttpResponse(async () => {
      if (context.query.id === context.query.parentId) {
        return BadResponse('父级不能是自己!')
      }
      const response = await this.validateSaveMenu(context)
      if (response) {
        return response
      }
      const result = await this.prisma.menu.update({
        where: { id: context.query.id },
        data: context.body,
      })
      return MangoResponse({
        data: result,
      })
    })
  }

  async delete({ query }: Merge<Context, { query: typeof menuDeleteSchema.static }>) {
    return await HttpResponse(async () => {
      // 查询该菜单是否有子级
      const hasChildren = await this.prisma.menu.count({
        where: {
          parentId: query.id,
        },
      })
      if (hasChildren > 0) {
        return BadResponse('该菜单下有子级，不能删除!')
      } else {
        const result = await this.prisma.menu.delete({
          where: { id: query.id },
        })
        return MangoResponse({
          data: result,
        })
      }
    })
  }
}
