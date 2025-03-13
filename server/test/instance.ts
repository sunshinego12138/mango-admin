import { PrismaClient } from '@prisma/client'
class Singleton extends PrismaClient {
  private static instance: Singleton

  constructor() {
    // 检查是否已有实例
    if (Singleton.instance) {
      // 直接返回已存在的实例（TS 会强制类型，但实际 JS 运行时允许返回对象）
      return Singleton.instance as unknown as Singleton
    }
    // 初始化代码...
    super()
    // 保存实例
    Singleton.instance = this
  }
}

// 测试代码
const instance1 = new Singleton()
const instance2 = new Singleton()
console.log(instance1 === instance2) // 输出 true
