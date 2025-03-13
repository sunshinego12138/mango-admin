<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui'
import { useVbenForm } from '#/adapter/form'
import { getFunc, postFunc, putFunc, Mode } from './def'
import { message } from 'ant-design-vue'
import { $t } from '@vben/locales'

defineOptions({
  name: `${Mode}Form`,
})

const [Form, formApi] = useVbenForm({
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
})
const [MetaForm, metaFormApi] = useVbenForm({
  schema: [
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入排序',
        class: 'w-full',
      },
      help: '用于路由->菜单排序',
      fieldName: 'order',
      label: '排序',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入图标',
        class: 'w-full',
      },
      help: '可以去https://yesicon.app中获取图标',
      fieldName: 'icon',
      label: '图标',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入激活图标',
        class: 'w-full',
      },
      help: '激活图标（菜单/tab）',
      fieldName: 'activeIcon',
      label: '激活图标',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入当前激活的菜单',
        class: 'w-full',
      },
      help: '当前激活的菜单，有时候不想激活现有菜单，需要激活父级菜单时使用',
      fieldName: 'activePath',
      label: '激活菜单',
    },

    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入固定标签页的顺序',
        class: 'w-full',
      },
      fieldName: 'affixTabOrder',
      help: '固定标签页的顺序',
      label: '标签页顺序',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入徽标',
        class: 'w-full',
      },
      fieldName: 'badge',
      label: '徽标',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        class: 'w-full',
        options: [
          {
            label: '点状',
            value: 'dot',
          },
          {
            label: '文本',
            value: 'normal',
          },
        ],
        placeholder: '请选择徽标类型',
      },
      fieldName: 'badgeType',
      label: '徽标类型',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        class: 'w-full',
        options: [
          {
            label: 'default',
            value: 'default',
          },
          {
            label: 'destructive',
            value: 'destructive',
          },
          {
            label: 'primary',
            value: 'primary',
          },
          {
            label: 'success',
            value: 'success',
          },
          {
            label: 'warning',
            value: 'warning',
          },
        ],
        placeholder: '请选择徽标颜色',
      },
      fieldName: 'badgeVariants',
      label: '徽标颜色',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入Iframe地址',
        class: 'w-full',
      },
      fieldName: 'iframeSrc',
      label: 'Iframe 地址',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入Iframe地址',
        class: 'w-full',
      },
      help: '外链-跳转路径',
      fieldName: 'link',
      label: 'Link',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入标签页最大打开数量',
        class: 'w-full',
      },
      help: '标签页最大打开数量',
      fieldName: 'maxNumOfOpenTab',
      label: '标签最大值',
    },
    {
      component: 'Switch',
      fieldName: 'affixTab',
      help: '是否固定标签页',
      label: '固定标签页',
    },
    {
      component: 'Switch',
      fieldName: 'hideChildrenInMenu',
      help: '当前路由的子级在菜单中不展现',
      label: '隐藏子级',
    },
    {
      component: 'Switch',
      fieldName: 'hideInBreadcrumb',
      help: '当前路由在面包屑中不展现',
      label: '隐藏面包屑',
    },
    {
      component: 'Switch',
      fieldName: 'hideInMenu',
      help: '当前路由在菜单中不展现',
      label: '隐藏',
    },
    {
      component: 'Switch',
      fieldName: 'hideInTab',
      help: '当前路由在标签页不展现',
      label: '隐藏Tab',
    },
    {
      component: 'Switch',
      fieldName: 'keepAlive',
      help: '开启KeepAlive缓存',
      label: 'KeepAlive',
    },
    {
      component: 'Switch',
      fieldName: 'loaded',
      help: '路由是否已经加载过',
      label: '是否加载过',
    },
    {
      component: 'Switch',
      fieldName: 'menuVisibleWithForbidden',
      help: '菜单可以看到，但是访问会被重定向到403',
      label: '可访问',
    },
    {
      component: 'Switch',
      fieldName: 'openInNewWindow',
      help: '是否在新窗口打开',
      label: '新窗口打开',
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
})
const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close()
  },
  onConfirm: async () => {
    const data: any = await formApi.submitForm()
    const meta: any = await metaFormApi.submitForm()
    const status = await formApi.validate()
    const metaStatus = await metaFormApi.validate()
    const row = modalApi.getData<Record<string, any>>()

    if (status.valid && metaStatus.valid) {
      const res = {
        ...data,
        meta: {
          ...Object.fromEntries(Object.entries(meta).filter(([_, value]) => value !== undefined)),
        },
      }
      // 验证通过
      if (row.id) {
        // 编辑
        putFunc(
          {
            id: row.id,
          },
          res,
        )
          .then((_) => {
            message.success($t('global.form.ModifiedSuccess'))
            modalApi.close()
          })
          .catch((_) => {
            message.error($t('global.form.ModificationFailed'))
          })
      } else {
        // 新增
        postFunc(res)
          .then((_) => {
            message.success($t('global.form.AddSuccess'))
            modalApi.close()
          })
          .catch((_) => {
            message.error($t('global.form.AddFailed'))
          })
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      formApi.resetForm()
      formApi.resetValidate()
      const data = modalApi.getData<Record<string, any>>()
      if (data) {
        formApi.setValues(data)
        if (data.meta) {
          metaFormApi.setValues(data.meta)
        }
      }
    }
  },
  title: $t('system.menu.title'),
})
</script>
<template>
  <Modal class="w-[80vw]">
    <Form />
    <h1 class="mb-5">菜单元信息</h1>
    <MetaForm />
  </Modal>
</template>
