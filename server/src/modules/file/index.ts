import { Autowired, Controller, Get, Post } from 'mango-core'
import type { Context } from 'mango-types'
import { FileService } from './file.service'
import { FilePreviewSchema, UploadSchema } from './file.schema'
import { FileGuard } from './file.decorators'

@Controller({
  name: '文件服务',
  prefix: '/file',
  detail: {
    description: '文件相关的接口',
    tags: ['file'],
  },
})
export default class FileController {
  @Autowired
  service: FileService

  @Post('/upload/image', {
    // body: UploadSchema,
    detail: {
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary', // 指定为文件类型
                },
                otherField: {
                  type: 'string',
                },
              },
              required: ['file'], // 指定必需字段
            },
          },
        },
      },
    },
  })
  @FileGuard('image')
  async uploadImage(context: Context<'body', typeof UploadSchema.static>) {
    return await this.service.upload(context)
  }

  @Get('/file', {
    query: FilePreviewSchema,
  })
  async image(context: Context<'query', typeof FilePreviewSchema.static>) {
    return await this.service.file(context)
  }
}
