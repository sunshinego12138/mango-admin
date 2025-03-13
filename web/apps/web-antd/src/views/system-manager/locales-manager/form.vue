<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui'

import { useVbenForm } from '#/adapter/form'
import { getLocales, postLocales, putLocales } from '#/api/mango-admin/locales'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'MenuForm',
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
          return await getLocales({
            tree: true,
          })
        },
        fieldNames: {
          children: 'children',
          label: 'name',
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
        placeholder: '请输入国际化字段名',
      },
      fieldName: 'name',
      label: '国际化字段名',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'zhCN',
      label: '中文',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'enUS',
      label: '英文',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'jaJP',
      label: '日文',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'zhTW',
      label: '中文繁体',
    },
  ],
  showDefaultActions: false,
})
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close()
  },
  onConfirm: async () => {
    const data: any = await formApi.submitForm()
    const status = await formApi.validate()
    const row = drawerApi.getData<Record<string, any>>()

    if (status.valid) {
      // 验证通过
      if (row.id) {
        // 编辑
        putLocales(
          {
            id: row.id,
          },
          data,
        )
          .then((_) => {
            message.success('修改成功')
            drawerApi.close()
          })
          .catch((err) => {
            console.log('err', err)
            message.error('修改失败')
          })
      } else {
        // 新增
        postLocales(data)
          .then((_) => {
            message.success('新建成功')
            drawerApi.close()
          })
          .catch((_) => {
            message.error('新增失败')
          })
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      formApi.resetForm()
      formApi.resetValidate()
      const data = drawerApi.getData<Record<string, any>>()
      if (data) {
        formApi.setValues(data)
      }
    }
  },
  title: '国际化',
})
</script>
<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
