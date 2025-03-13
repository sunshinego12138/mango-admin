import type { VxeGridProps, VxeTableGridOptions } from '#/adapter/vxe-table'
import * as API from '#/api/mango-admin/role'
import { getMenu } from '#/api/mango-admin/menu'
import { $t } from '#/locales'
import type { VbenFormProps } from '@vben/common-ui'
import dayjs from 'dayjs'
import { Textarea, Tree } from 'ant-design-vue'
import { h } from 'vue'

export const Mode = 'Role'

export const getFunc = API[`get${Mode}`]
export const deleteFunc = API[`delete${Mode}`]
export const postFunc = API[`post${Mode}`]
export const putFunc = API[`put${Mode}`]

export type RowType = {
  id: string
  parentId: string
  zhCN: string
  enUS: string
  jaJP: string
  zhTW: string
}

/** 表格的配置项 */
export const gridOptions: VxeTableGridOptions<RowType> = {
  columns: [
    {
      field: 'name',
      title: $t('system.role.name'),
      treeNode: true,
      minWidth: 150,
    },
    {
      field: 'code',
      title: $t('system.role.code'),
      treeNode: true,
      minWidth: 150,
    },
    {
      field: 'description',
      title: $t('system.role.description'),
      treeNode: true,
      minWidth: 150,
    },
    {
      field: 'sort',
      title: $t('system.role.sort'),
      treeNode: true,
      minWidth: 150,
    },
    {
      field: 'action',
      title: $t('system.locales.action'),
      fixed: 'right',
      width: 150,
      slots: {
        default: 'action',
      },
    },
  ],
  height: 'auto',
  proxyConfig: {
    sort: true,
    ajax: {
      query: async (page, formValues, sort) => {
        const params: Record<string, any> = {
          current: page.page.currentPage,
          size: page.page.pageSize,
          // sortBy: page.sort.field,
          // sortOrder: page.sort.order,
        }
        if (formValues.name) {
          params['name'] = formValues.name
        }
        if (formValues.title) {
          params['title'] = formValues.title
        }
        if (formValues.start) {
          params['startTime'] = dayjs(formValues.start).valueOf()
        }

        if (formValues.end) {
          params['endTime'] = dayjs(formValues.end).valueOf()
        }

        const res = await getFunc(params)
        return res
      },
    },
  },
  pagerConfig: {},
  sortConfig: {
    defaultSort: { field: 'category', order: 'desc' },
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
}

/** 表格的查询表单配置项 */
export const tableQueryFormOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  fieldMappingTime: [['date', ['start', 'end']]],
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      componentProps: {
        allowClear: true,
      },
      label: '名称',
    },
    {
      component: 'RangePicker',
      componentProps: {
        allowClear: true,
      },
      fieldName: 'date',
      label: '创建时间',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
}

/** 增加、编辑的表单配置项 */
export const FormOption: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入角色名称',
      },
      fieldName: 'name',
      label: '角色名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入角色编码',
      },
      fieldName: 'code',
      label: '角色编码',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入排序',
        class: 'w-full',
      },
      help: '排序从小到大',
      fieldName: 'sort',
      label: '排序',
      // rules: 'required',
    },
    {
      component: h(Textarea, {
        allowClear: true,
        style: {
          minHeight: '100px',
        },
      }),
      modelPropName: 'value',
      componentProps: {
        placeholder: '请输入角色编码',
      },
      fieldName: 'description',
      label: '角色描述',
    },
    {
      component: 'ApiTree',
      componentProps: {
        checkable: true,
        alwaysLoad: true,
        fieldNames: { children: 'children', title: 'title', key: 'id' },
        api: async () => {
          return await getMenu({ tree: true })
        }
      },
      fieldName: 'menu',
      label: '菜单权限',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
  // wrapperClass: 'grid-cols-1 md:grid-cols-2',
}
