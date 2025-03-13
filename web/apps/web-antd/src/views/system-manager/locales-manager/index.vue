<script lang="ts" setup>
import { getLocales, deleteLocales } from '#/api/mango-admin/locales'
import MenuForm from './form.vue'
import type { VxeGridProps } from '#/adapter/vxe-table'

import { Page, useVbenDrawer, type VbenFormProps } from '@vben/common-ui'

import { Button, message, Popconfirm } from 'ant-design-vue'

import { useVbenVxeGrid } from '#/adapter/vxe-table'
import dayjs from 'dayjs'
import { $t } from '#/locales'

interface RowType {
  id: string
  parentId: string
  zhCN: string
  enUS: string
  jaJP: string
  zhTW: string
}

const [FormDrawer, FormDrawerApi] = useVbenDrawer({
  connectedComponent: MenuForm,
  onClosed() {
    gridApi.reload()
  },
})

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { type: 'seq', width: 70 },

    { field: 'name', title: $t('system.locales.name'), treeNode: true, minWidth: 150 },
    { field: 'zhCN', title: $t('system.locales.zhCN'), minWidth: 150 },
    { field: 'enUS', title: $t('system.locales.enUS'), minWidth: 150 },
    { field: 'jaJP', title: $t('system.locales.jaJP'), minWidth: 150 },
    { field: 'zhTW', title: $t('system.locales.zhTW'), minWidth: 150 },
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
  // data: MOCK_TREE_TABLE_DATA,
  proxyConfig: {
    ajax: {
      query: async (_, formValues) => {
        const params: Record<string, any> = {}
        if (formValues.name) {
          params['name'] = formValues.name
        }
        if (formValues.start) {
          params['startTime'] = dayjs(formValues.start).valueOf()
        }

        if (formValues.end) {
          params['endTime'] = dayjs(formValues.end).valueOf()
        }

        const res = await getLocales(params)
        return {
          items: res,
        }
      },
    },
  },
  pagerConfig: {
    enabled: false,
  },
  treeConfig: {
    parentField: 'parentId',
    rowField: 'id',
    transform: true,
  },
}
const formOptions: VbenFormProps = {
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
      label: $t('system.locales.name'),
    },
    {
      component: 'RangePicker',
      componentProps: {
        allowClear: true,
      },
      fieldName: 'date',
      label: $t('system.locales.createTime'),
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
}
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions, formOptions })

const expandAll = () => {
  gridApi.grid?.setAllTreeExpand(true)
}

const collapseAll = () => {
  gridApi.grid?.setAllTreeExpand(false)
}

const add = async () => {
  FormDrawerApi.setData({})
  FormDrawerApi.open()
  // const res = await postAuthLogin({
  //   username: '123456',
  //   password: '123456',
  //   captcha: true
  // })
  // console.log('res', res)
}

const deleteHandler = async (row: RowType) => {
  deleteLocales({
    id: row.id,
  })
    .then((_) => {
      gridApi.reload()
      message.success('删除成功')
    })
    .catch((_) => {
      gridApi.reload()
      message.error('删除失败')
    })
}
const editHandler = async (row: RowType) => {
  FormDrawerApi.setData(row)
  FormDrawerApi.open()
}
</script>

<template>
  <Page>
    <Grid table-title="国际化" table-title-help="国际化管理">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="expandAll"> {{$t('global.button.ExpandAll')}} </Button>
        <Button class="mr-2" type="primary" @click="collapseAll"> {{ $t('global.button.FoldAll') }} </Button>
        <Button type="primary" @click="add"> {{ $t('global.button.Add') }} </Button>
      </template>

      <template #action="{ row }">
        <div class="flex items-center gap-2">
          <Button class="w-17" type="primary" ghost @click="editHandler(row)"> {{ $t('global.button.Edit') }} </Button>
          <Popconfirm title="确认删除吗?" :ok-text="$t('global.button.Delete')" :cancel-text="$t('global.button.Delete')" @confirm="deleteHandler(row)">
            <Button class="w-17" danger ghost> {{ $t('global.button.Delete') }} </Button>
          </Popconfirm>
        </div>
      </template>
    </Grid>
    <FormDrawer />
  </Page>
</template>
