import { HttpResponse, MangoResponse } from '@/utils'
import { createParameterDecorator } from 'mango-core'
import { HttpStatus } from '@/enum/http'
import dayjs from 'dayjs'
import { PrismaService } from '@/prisma'
import { Context } from '..'

const prisma = new PrismaService()

/**
 * 用于校验请求头中的token是否合法
 */
export const IsTokenExpiredGuard = createParameterDecorator(async ({ jwt, request }: Context) => {
  try {
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN // 有效时间，单位小时
    const authorization = request.headers.get('authorization')
    if (!authorization) {
      return MangoResponse({
        responseCode: HttpStatus.UNAUTHORIZED,
        message: '请在请求头中携带token',
      })
    }
    const auth = authorization.split(' ').at(-1)
    const data: any = await jwt.verify(auth)
    if (data) {
      const user = await prisma.user.findFirst({
        where: {
          id: data.sub,
        },
      })
      if (!user) {
        return MangoResponse({
          responseCode: HttpStatus.UNAUTHORIZED,
          message: '用户不存在',
        })
      }
      // 签发时间
      const sign_time = dayjs(data.timestamp)
      // 过期时间
      const expiration_time = sign_time.add(Number(JWT_EXPIRES_IN), 'hour')
      // 当前时间
      const current_time = dayjs()
      // 判断是否超时
      const isExpired = current_time.isAfter(expiration_time)
      if (isExpired) {
        return MangoResponse({
          responseCode: HttpStatus.UNAUTHORIZED,
          message: '用户已过期',
        })
      } else {
        return true
      }
    } else {
      return MangoResponse({
        responseCode: HttpStatus.UNAUTHORIZED,
        message: '用户已过期',
      })
    }
  } catch (error) {
    return MangoResponse({
      responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '服务器出错',
    })
  }
})

// export const IsTokenExpiredGuard = createParameterDecorator(async ({ headers, jwt }) => {
//   const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN // 有效时间，单位小时
//   const authorization = headers?.authorization
//   if (!authorization) {
//     return {
//       status: false,
//       response: MangoResponse({
//         responseCode: HttpStatus.UNAUTHORIZED,
//         message: '请在请求头中携带token',
//       }),
//     }
//   }
//   const auth = authorization.split(' ').at(-1)
//   const data: any = await jwt.verify(auth)
//   if (data) {
//     const user = await prisma.user.findFirst({
//       where: {
//         id: data.sub,
//       },
//     })
//     if (!user) {
//       return {
//         status: false,
//         response: MangoResponse({
//           responseCode: HttpStatus.UNAUTHORIZED,
//           message: '用户不存在',
//         }),
//       }
//     }
//     // 签发时间
//     const sign_time = dayjs(data.timestamp)
//     // 过期时间
//     const expiration_time = sign_time.add(Number(JWT_EXPIRES_IN), 'hour')
//     // 当前时间
//     const current_time = dayjs()
//     // 判断是否超时
//     const isExpired = current_time.isAfter(expiration_time)
//     if (isExpired) {
//       return {
//         status: false,
//         response: MangoResponse({
//           responseCode: HttpStatus.UNAUTHORIZED,
//           message: '用户已过期',
//         }),
//       }
//     } else {
//       return {
//         status: true,
//       }
//     }
//   } else {
//     return {
//       status: false,
//       response: MangoResponse({
//         responseCode: HttpStatus.UNAUTHORIZED,
//         message: '用户已过期',
//       }),
//     }
//   }
// })
