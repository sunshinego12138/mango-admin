import { t } from 'elysia'

export const roleSchema = t.Object({
  name: t.String({
    description: '角色名称',
  }),
  code: t.String({
    description: '角色编码',
  }),
  sort: t.Number({
    description: '排序',
    default: 1,
  }),
  description: t.Optional(
    t.String({
      description: '角色描述',
    }),
  ),
  menu: t.Array(t.String(), {
    description: '菜单id集合',
  }),
})

export const roleDeleteSchema = t.Object({
  id: t.String({ description: '角色id' }),
})

export const queryRoleSchema = t.Object({
  name: t.Optional(
    t.String({
      description: '角色名称',
    }),
  ),
  code: t.Optional(
    t.String({
      description: '角色编码',
    }),
  ),
  current: t.Optional(
    t.Number({
      description: '当前页',
      default: 1,
    }),
  ),
  size: t.Optional(
    t.Number({
      description: '每页条数',
      default: 10,
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
