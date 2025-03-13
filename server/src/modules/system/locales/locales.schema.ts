import { t } from 'elysia'

export const localesListSchema = t.Object({
  lang: t.Union(
    [
      t.Literal('zh-CN', {
        description: '中文',
      }),
      t.Literal('en-US', {
        description: '英文',
      }),
      t.Literal('ja-JP', {
        description: '日文',
      }),
      t.Literal('zh-TW', {
        description: '繁体中文',
      }),
    ],
    {
      description: '国际化值',
      default: 'zh-CN',
    },
  ),
})

export const queryLocalesSchema = t.Object({
  id: t.Optional(
    t.String({
      description: '国际化id',
    }),
  ),
  tree: t.Optional(
    t.Boolean({
      description: '是否为树形结构',
    }),
  ),
  name: t.Optional(
    t.String({
      description: '国际化字段',
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

export const localesSchema = t.Object({
  name: t.String({
    description: '国际化字段',
  }),
  parentId: t.Optional(
    t.String({
      description: '父级id',
    }),
  ),
  zhCN: t.Optional(
    t.String({
      description: '中文',
    }),
  ),
  enUS: t.Optional(
    t.String({
      description: '英文',
    }),
  ),
  jaJP: t.Optional(
    t.String({
      description: '日文',
    }),
  ),
  zhTW: t.Optional(
    t.String({
      description: '繁体中文',
    }),
  ),
})

export const localesDeleteSchema = t.Object({
  id: t.String({ description: '国际化字段id' }),
})
