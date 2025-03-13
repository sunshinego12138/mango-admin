// @ts-ignore
/* eslint-disable */
import { request } from '#/api/request'

/** 文件相关的接口 GET /file/file */
export async function getFileFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFileFileParams,
  options?: { [key: string]: any },
) {
  return request<any>('/file/file', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 文件相关的接口 POST /file/upload/image */
export async function postFileUploadImage(
  body: {
    otherField?: string
  },
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''))
        } else {
          formData.append(ele, JSON.stringify(item))
        }
      } else {
        formData.append(ele, item)
      }
    }
  })

  return request<any>('/file/upload/image', {
    method: 'POST',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'},
    ...(options || {}),
  })
}
