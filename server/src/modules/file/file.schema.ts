import { t } from 'elysia'

export const UploadSchema = t.Object({
  file: t.File({
    description: '文件',
  }),
})

export const FilePreviewSchema = t.Object({
  name: t.String({
    description: '文件名',
  }),
})
