import * as API from '#/api/mango-admin/menu'

export const Mode = 'Menu'

export const getFunc = API[`get${Mode}`]
export const deleteFunc = API[`delete${Mode}`]
export const postFunc = API[`post${Mode}`]
export const putFunc = API[`put${Mode}`]