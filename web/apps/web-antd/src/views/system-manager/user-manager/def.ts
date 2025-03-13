import type { VxeGridProps } from '#/adapter/vxe-table'
import * as API from '#/api/mango-admin/user'
import { getRole } from '#/api/mango-admin/role'
import { $t } from '#/locales'
import { useVbenForm, z, type VbenFormProps } from '@vben/common-ui'
import dayjs from 'dayjs'
import { Textarea, InputPassword } from 'ant-design-vue'
import { h } from 'vue'

export const Mode = 'User'

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
      field: 'username',
      title: $t('system.user.name'),
      treeNode: true,
      minWidth: 150,
      fixed: 'left',
      slots: {
        default: 'username',
      },
    },
    {
      field: 'realName',
      title: $t('system.user.realName'),
      treeNode: true,
      minWidth: 150,
      slots: {
        default: 'realName',
      },
    },
    {
      field: 'avatar',
      title: $t('system.user.avatar'),
      treeNode: true,
      minWidth: 150,
      slots: {
        default: 'avatar',
      },
    },
    {
      field: 'role',
      title: $t('system.user.role'),
      treeNode: true,
      minWidth: 150,
      slots: {
        default: 'role',
      },
    },
    {
      field: 'sex',
      title: $t('system.user.sex'),
      treeNode: true,
      minWidth: 150,
      slots: {
        default: 'sex',
      },
    },
    {
      field: 'status',
      title: $t('system.user.status'),
      treeNode: true,
      minWidth: 150,
      slots: {
        default: 'status',
      },
    },
    {
      field: 'sort',
      title: $t('system.menu.sort'),
      treeNode: true,
      minWidth: 150,
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
      query: async (page, formValues) => {
        const params: Record<string, any> = {
          current: page.page.currentPage,
          size: page.page.pageSize,
        }
        if (formValues.start) {
          params['startTime'] = dayjs(formValues.start).valueOf()
        }

        if (formValues.end) {
          params['endTime'] = dayjs(formValues.end).valueOf()
        }

        return await getFunc(params)
      },
    },
  },
  pagerConfig: {},
  // treeConfig: {
  //   parentField: 'parentId',
  //   rowField: 'id',
  //   transform: true,
  // },
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

export const [Form1, formApi1] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      fieldName: 'username',
      label: '用户名',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入中文名',
      },
      fieldName: 'realName',
      label: '中文名',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号',
      },
      fieldName: 'phone',
      label: '手机号',
      rules: z.string().refine(
        (value) => {
          const phoneRegex =
            /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
          return phoneRegex.test(value)
        },
        {
          message: '手机号格式不正确',
        },
      ),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入邮箱',
      },
      fieldName: 'email',
      label: '电子邮箱',
      rules: z.string().refine(
        (value) => {
          const emailRegex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          return emailRegex.test(value)
        },
        {
          message: '邮箱格式不正确',
        },
      ),
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '男',
            value: 'MALE',
          },
          {
            label: '女',
            value: 'FEMALE',
          },
        ],
      },
      fieldName: 'sex',
      label: '性别',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '正常',
            value: 'ACTIVE',
          },
          {
            label: '禁用',
            value: 'INACTIVE',
          },
        ],
      },
      fieldName: 'status',
      label: '状态',
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
})

export const [Form2, formApi2] = useVbenForm({
  schema: [
    {
      component: 'ApiSelect',
      // 对应组件的参数
      componentProps: {
        style: {
          width: '100%',
        },
        showSearch: true,
        filterOption: (inputValue: string, option: Record<string, any>) => {
          if (option?.label?.includes(inputValue)) {
            return true
          } else {
            return false
          }
        },
        // 菜单接口转options格式
        afterFetch: (data: any) => {
          return data.items.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))
        },
        // 菜单接口
        api: async () => {
          return await getRole({
            size: 999,
            current: 1,
          })
        },
      },
      // 字段名
      fieldName: 'roleId',
      // 界面显示的label
      label: '所属角色',
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
  ],
  showDefaultActions: false,
})

export const [Form3, formApi3] = useVbenForm({
  schema: [
    {
      labelWidth: 0,
      wrapperClass: 'justify-center',
      component: 'MangoUpload',
      componentProps: {
        placeholder: '请选择用户头像',
      },
      fieldName: 'avatar',
      label: '',
    },
  ],
  showDefaultActions: false,
})

export const [Form4, formApi4] = useVbenForm({
  schema: [
    {
      component: h(InputPassword),
      modelPropName: 'value',
      componentProps: {
        placeholder: '请输入密码',
      },
      fieldName: 'password',
      label: '密码',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
})

export const FormAPIS = {
  formApi1,
  formApi2,
  formApi3,
  formApi4
}
