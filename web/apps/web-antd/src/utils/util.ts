type Node = {
  id: string
  parentId: string
  children?: Node[]
  [key: string]: any
}

/** 将扁平结构转为树形结构 */
export function arrayToTree(data: { id: string; parentId: string }[]): Node[] {
  if (!Array.isArray(data)) {
    return []
  }
  if (data.length <= 0) {
    return []
  }
  const tree: Node[] = []
  const map: { [key: string]: Node } = {}

  for (const item of data) {
    map[item.id] = { ...item, children: [] }
  }

  for (const item of data) {
    const node = map[item.id]
    if (item.parentId) {
      const parentNode = map[item.parentId]
      if (parentNode) {
        parentNode.children!.push(node!)
      }
    } else {
      tree.push(node!)
    }
  }

  return tree
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
