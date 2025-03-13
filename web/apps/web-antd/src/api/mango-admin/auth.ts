// @ts-ignore
/* eslint-disable */
import { request } from '#/api/request'

/** 登录接口 POST /auth/login */
export async function postAuthLogin(
  body: {
    /** 用户名 */
    username: string
    /** 密码 */
    password: string
    /** 前端的验证 */
    captcha: boolean
  },
  options?: { [key: string]: any },
) {
  return request<any>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
