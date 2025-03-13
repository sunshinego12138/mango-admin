import { PrismaService } from '@/prisma'
import { Autowired, HttpStatus, JsonResponse } from 'mango-core'
import type { Context } from 'mango-types'
import type { FilePreviewSchema, UploadSchema } from './file.schema'
import { v4 as uuidv4 } from 'uuid'
import { MangoResponse, saveFile } from '@/utils'
import { file } from 'elysia'

function arrayBufferToBase64(buffer: any) {
  const base64String = Buffer.from(buffer).toString('base64')
  return base64String
}

export class FileService {
  @Autowired
  prisma: PrismaService

  async upload(context: Context<'body', typeof UploadSchema.static>) {
    const type = context.body.file.name.split('.').at(-1)
    const id = uuidv4()
    const name = `${id}.${type}`
    const status = await saveFile(context.body.file, name)
    if (status) {
      return MangoResponse({
        data: {
          name: context.body.file.name,
          file: name,
        },
        message: '上传成功',
      })
    } else {
      return MangoResponse({
        code: HttpStatus.BAD_REQUEST,
        message: '上传失败',
      })
    }
  }

  async file(context: Context<'query', typeof FilePreviewSchema.static>) {
    return file(`uploads/${context.query.name}`)
  }
}
