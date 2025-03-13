import { t } from 'elysia'

const RouteMeta = t.Object(
  {
    activeIcon: t.Optional(t.String({ description: '激活图标（菜单/tab）' })),
    activePath: t.Optional(t.String({ description: '当前激活的菜单，有时候不想激活现有菜单，需要激活父级菜单时使用' })),
    affixTab: t.Optional(t.Boolean({ description: '是否固定标签页', default: false })),
    affixTabOrder: t.Optional(t.Number({ description: '固定标签页的顺序', default: 0 })),
    authority: t.Optional(t.Array(t.String(), { description: '需要特定的角色标识才可以访问', default: [] })),
    badge: t.Optional(t.String({ description: '徽标' })),
    badgeType: t.Optional(t.Union([t.Literal('dot'), t.Literal('normal')], { description: '徽标类型' })),
    badgeVariants: t.Optional(
      t.Union(
        [
          t.Literal('default'),
          t.Literal('destructive'),
          t.Literal('primary'),
          t.Literal('success'),
          t.Literal('warning'),
          t.String(),
        ],
        { description: '徽标颜色' },
      ),
    ),
    hideChildrenInMenu: t.Optional(t.Boolean({ description: '当前路由的子级在菜单中不展现', default: false })),
    hideInBreadcrumb: t.Optional(t.Boolean({ description: '当前路由在面包屑中不展现', default: false })),
    hideInMenu: t.Optional(t.Boolean({ description: '当前路由在菜单中不展现', default: false })),
    hideInTab: t.Optional(t.Boolean({ description: '当前路由在标签页不展现', default: false })),
    icon: t.Optional(t.Union([t.String(), t.Any()], { description: '图标（菜单/tab）' })), // `Component` 类型需要根据实际情况定义
    iframeSrc: t.Optional(t.String({ description: 'iframe 地址' })),
    ignoreAccess: t.Optional(t.Boolean({ description: '忽略权限，直接可以访问', default: false })),
    keepAlive: t.Optional(t.Boolean({ description: '开启KeepAlive缓存' })),
    link: t.Optional(t.String({ description: '外链-跳转路径' })),
    loaded: t.Optional(t.Boolean({ description: '路由是否已经加载过' })),
    maxNumOfOpenTab: t.Optional(t.Number({ description: '标签页最大打开数量', default: -1 })),
    menuVisibleWithForbidden: t.Optional(t.Boolean({ description: '菜单可以看到，但是访问会被重定向到403' })),
    noBasicLayout: t.Optional(t.Boolean({ description: '不使用基础布局（仅在顶级生效）' })),
    openInNewWindow: t.Optional(t.Boolean({ description: '在新窗口打开' })),
    order: t.Optional(t.Number({ description: '用于路由->菜单排序' })),
    query: t.Optional(t.Record(t.String(), t.Any(), { description: '菜单所携带的参数' })), // `Recordable` 类型需要根据实际情况定义
    // title: t.String({ description: '标题名称' }),
  },
  {
    description: '路由元信息',
  },
)

export const menuSchema = t.Object({
  title: t.String({
    description: '菜单名称',
  }),
  // type: t.Union(
  //   [
  //     t.Literal('DIRECTORY', {
  //       description: '目录',
  //     }),
  //     t.Literal('MENU', {
  //       description: '菜单',
  //     }),
  //   ],
  //   {
  //     default: 'MENU',
  //     description: '菜单类型',
  //   },
  // ),
  parentId: t.Optional(
    t.String({
      description: '父级id',
    }),
  ),
  name: t.String({
    description: '菜单名称',
  }),

  path: t.String({
    description: '路由路径',
  }),
  component: t.Optional(
    t.String({
      description: '组件',
    }),
  ),
  redirect: t.Optional(
    t.String({
      description: '重定向',
    }),
  ),
  sort: t.Number({
    description: '排序',
    default: 1,
  }),
  meta: t.Optional(RouteMeta),
})

export const menuDeleteSchema = t.Object({
  id: t.String({ description: '菜单id' }),
})

export const queryMenuSchema = t.Object({
  tree: t.Optional(
    t.Boolean({
      description: '是否为树形结构',
    }),
  ),
  title: t.Optional(
    t.String({
      description: '菜单名称',
    }),
  ),
  name: t.Optional(
    t.String({
      description: '路由名称',
    }),
  ),
  startTime: t.Optional(
    t.Date({
      description: '开始时间',
      default: 915148800000, // 1999-01-01
    }),
  ),

  endTime: t.Optional(
    t.Date({
      description: '结束时间',
      default: 32472144000000, // 2999-01-01
    }),
  ),
})
