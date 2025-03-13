import { t } from 'elysia'

export const RegisterSchema = t.Object({
  agreePolicy: t.Boolean({ description: '是否同意协议' }),
  confirmPassword: t.String({ description: '确认密码' }),
  password: t.String({ description: '密码' }),
  username: t.String({ description: '用户名' }),
})

export const queryUserSchema = t.Object({
  userName: t.Optional(
    t.String({
      description: '用户名',
    }),
  ),
  status: t.Optional(
    t.Union(
      [
        t.Literal('ACTIVE', {
          description: '激活',
        }),
        t.Literal('INACTIVE', {
          description: '未激活',
        }),
      ],
      {
        description: '状态',
      },
    ),
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
})

export const userSchema = t.Object({
  username: t.String({
    description: '用户名',
  }),
  password: t.String({ description: '密码' }),
  description: t.Optional(
    t.String({
      description: '用户描述',
    }),
  ),
  roleId: t.String({
    description: '角色id',
  }),
  realName: t.Optional(
    t.String({
      description: '中文名',
    }),
  ),
  phone: t.Optional(
    t.String({
      description: '手机号',
    }),
  ),
  email: t.Optional(
    t.String({
      description: '邮箱',
    }),
  ),
  sex: t.Optional(
    t.Union([
      t.Literal('MALE', {
        description: '男性',
      }),
      t.Literal('FEMALE', {
        description: '女性',
      }),
    ]),
  ),
  status: t.Optional(
    t.Union(
      [
        t.Literal('ACTIVE', {
          description: '激活',
        }),
        t.Literal('INACTIVE', {
          description: '未激活',
        }),
      ],
      {
        description: '状态',
      },
    ),
  ),
  sort: t.Number({
    default: 0,
    description: '排序',
  }),

  avatar: t.Optional(
    t.String({
      description: '头像',
    }),
  ),
})
