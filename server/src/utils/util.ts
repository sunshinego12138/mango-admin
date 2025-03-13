/** 将扁平结构转为树形结构
 * @param data 要处理的数据
 * @param cb 每一项的处理函数
 * @returns
 */
export function arrayToTree<T extends Record<string, any>>(data: T[] | any[], cb = (data: T) => data): T[] {
  if (!Array.isArray(data)) {
    return []
  }
  if (data.length <= 0) {
    return []
  }
  const tree: T[] = []
  const map: { [key: string]: T } = {}

  for (const item of data) {
    // map[item.id] = { ...item, children: [] }
    map[item.id] = cb({ ...item, children: [] })
  }

  for (const item of data) {
    const node = cb(map[item.id])
    if (item.parentId) {
      const parentNode = map[item.parentId]
      if (parentNode) {
        parentNode.children!.push(node)
      }
    } else {
      tree.push(node)
    }
  }

  return tree
}

// 函数将 Item 数组转换为键值对对象
export function convertItemsToKeyValue<T extends Record<string, any>>(items: T[]): { [key: string]: any } {
  const result: { [key: string]: any } = {}

  items.forEach((item) => {
    if (item.children && item.children.length) {
      result[item.name] = convertItemsToKeyValue(item.children)
    } else {
      result[item.name] = item.value
    }
  })

  return result
}

/**
 * 从对象中排除指定的键，并返回一个新的对象。
 * @param obj - 原始对象。
 * @param keys - 需要排除的键的数组。
 * @returns 新的对象，不包含指定的键。
 */
export const omit = <T, TKeys extends keyof T>(obj: T, keys: TKeys[]): Omit<T, TKeys> => {
  if (!obj) return {} as Omit<T, TKeys>
  if (!keys || keys.length === 0) return obj as Omit<T, TKeys>
  return keys.reduce(
    (acc, key) => {
      delete acc[key]
      return acc
    },
    { ...obj },
  )
}
