import { t } from 'elysia'

export const LoginSchema = t.Object({
  username: t.String({ description: '用户名' }),
  password: t.String({ description: '密码' }),
  captcha: t.Boolean({ description: '前端的验证' }),
})
