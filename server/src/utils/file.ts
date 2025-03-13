import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
/** 保存文件 */
export async function saveFile(file: File, name?: string) {
  // 1. 使用 arrayBuffer() 读取文件内容
  const arrayBuffer = await file.arrayBuffer()

  // 2. 创建 Uint8Array 视图
  const byteArray = new Uint8Array(arrayBuffer)

  // 3. 将字节数据转换为 Base64
  const base64String = Buffer.from(byteArray).toString('base64')

  // 4. 保存图片
  try {
    const buffer = Buffer.from(base64String, 'base64')
    // 如果没有uploads目录，就创建一个
    if (!existsSync('uploads')) {
      mkdirSync('uploads')
    }
    // 将图片存储到uploads/目录下
    writeFileSync(`uploads/${name ? name : file.name}`, buffer)
    return true
  } catch (error) {
    console.error('Failed to save image', error)
    return false
  }
}
