import { HttpStatus } from '@/enum/http'
import { JsonResponse } from 'mango-core'

type MangoResponseParam = {
  /** 返回信息 */
  message?: string
  /** 返回数据 */
  data?: Record<string, any> | null
  /** 返回中的code值 */
  code?: number | null
  /** response的code */
  responseCode?: HttpStatus
}

export const MangoResponse = (
  option: MangoResponseParam = {
    message: '',
    data: null,
    code: null,
    responseCode: HttpStatus.OK,
  },
) => {
  // const code = option.code ? option.code : option.responseCode
  const code = option.code ? option.code : 0
  return JsonResponse(
    {
      code,
      message: option.message,
      data: option.data,
    },
    option.responseCode!,
  )
}

export const BadResponse = (message: string, data: any = {}) => {
  return MangoResponse({
    code: -1,
    message,
    data,
    responseCode: HttpStatus.BAD_REQUEST,
  })
}

export const HttpResponse = async (
  cb: any,
  errorMessage = MangoResponse({
    responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '服务器出错',
  }),
) => {
  try {
    return await cb()
  } catch (error: any) {
    if (error.code === 'P2002') {
      // 唯一约束错误
      const fieldName = error.meta?.target // 获取导致错误的字段名称
      return MangoResponse({
        responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `唯一约束错误: ${fieldName}`,
      })
    }
    return errorMessage
  }
}
