import type { VxeGridProps } from '#/adapter/vxe-table'
import * as API from '#/api/mango-admin/menu'
import { $t } from '#/locales'
import type { VbenFormProps } from '@vben/common-ui'
import dayjs from 'dayjs'

export const Mode = 'Menu'

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
export const gridOptions: VxeGridProps<RowType> = {
  columns: [
    {
      field: 'title',
      title: $t('system.menu.name'),
      treeNode: true,
      minWidth: 150,
      slots: {
        default: 'title',
      },
    },
    {
      field: 'action',
      title: $t('system.menu.action'),
      fixed: 'right',
      width: 150,
      slots: {
        default: 'action',
      },
    },
  ],
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async (_, formValues) => {
        const params: Record<string, any> = {}
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
        return {
          items: res,
        }
      },
    },
  },
  pagerConfig: {
    // enabled: false,
  },
  treeConfig: {
    parentField: 'parentId',
    rowField: 'id',
    transform: true,
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
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'ApiTreeSelect',
      // 对应组件的参数
      componentProps: {
        style: {
          width: '100%',
        },
        treeDefaultExpandAll: true,
        // 菜单接口转options格式
        afterFetch: (data: any) => {
          return data
        },
        // 菜单接口
        api: async () => {
          const _menu = await getFunc({
            tree: true,
          })
          const menu = _menu || []
          const menuHandler = (data: any[]) => {
            data.forEach((item) => {
              item.title = $t(item.title)
              if (item.children && item.children.length > 0) {
                menuHandler(item.children)
              }
            })
          }
          menuHandler(menu)
          return menu
        },
        fieldNames: {
          children: 'children',
          label: 'title',
          value: 'id',
        },
      },
      // 字段名
      fieldName: 'parentId',
      // 界面显示的label
      label: '父级',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入菜单名称',
      },
      fieldName: 'title',
      help: '显示在页面上的名字，可以使用国际化',
      label: '菜单名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入路由名称',
      },
      fieldName: 'name',
      label: '路由名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入路由路径',
      },
      fieldName: 'path',
      label: '路由路径',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入组件',
      },
      fieldName: 'component',
      label: '组件',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入重定向地址',
      },
      fieldName: 'redirect',
      label: '重定向',
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
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
}
