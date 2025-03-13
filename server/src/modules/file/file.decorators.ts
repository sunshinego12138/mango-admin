import { createParameterDecorator } from 'mango-core'
import type { UploadSchema } from './file.schema'
import { MangoResponse } from '@/utils'
import { HttpStatus } from '@/enum/http'

/**
 * 文件守卫
 * @param type 'image' | 'file'
 * @returns
 */
export const FileGuard = (type: 'image' | 'file' = 'file') =>
  createParameterDecorator<{
    body: typeof UploadSchema.static
  }>((context) => {
    const file: File = context.body.file
    const fileType = file.type.split('/')[0]

    if (type === 'image' && fileType !== 'image') {
      return MangoResponse({
        code: HttpStatus.BAD_REQUEST,
        message: '上传文件类型不正确,请上传图片',
      })
    }
    return true
  })
