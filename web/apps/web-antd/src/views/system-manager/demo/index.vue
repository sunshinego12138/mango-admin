<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table'
import { $t } from '#/locales'
import { Page, useVbenModal } from '@vben/common-ui'
import { Button, message, Popconfirm } from 'ant-design-vue'
import { deleteFunc, tableQueryFormOptions, gridOptions } from './def'
import Form from './form.vue'

interface RowType {
  id: string
  parentId: string
  zhCN: string
  enUS: string
  jaJP: string
  zhTW: string
}

const [FormDrawer, FormDrawerApi] = useVbenModal({
  connectedComponent: Form,
  onClosed() {
    gridApi.reload()
  },
})

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions, formOptions: tableQueryFormOptions })

const expandAll = () => {
  gridApi.grid?.setAllTreeExpand(true)
}

const collapseAll = () => {
  gridApi.grid?.setAllTreeExpand(false)
}

const add = async () => {
  FormDrawerApi.setData({})
  FormDrawerApi.open()
}

const deleteHandler = async (row: RowType) => {
  deleteFunc({
    id: row.id,
  })
    .then((_) => {
      gridApi.reload()
      message.success($t('global.form.DeleteSuccess'))
    })
    .catch((_) => {
      gridApi.reload()
      message.error($t('global.form.DeleteFailed'))
    })
}
const editHandler = async (row: RowType) => {
  FormDrawerApi.setData(row)
  FormDrawerApi.open()
}
</script>

<template>
  <Page auto-content-height>
    <Grid :table-title="$t('system.menu.title')">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="expandAll"> {{ $t('global.button.ExpandAll') }} </Button>
        <Button class="mr-2" type="primary" @click="collapseAll"> {{ $t('global.button.FoldAll') }} </Button>
        <Button type="primary" @click="add"> {{ $t('global.button.Add') }} </Button>
      </template>
      <template #action="{ row }">
        <div class="flex items-center gap-2">
          <Button class="w-17" type="primary" ghost @click="editHandler(row)"> {{ $t('global.button.Edit') }} </Button>
          <Popconfirm
            title="确认删除吗?"
            :ok-text="$t('global.button.Delete')"
            :cancel-text="$t('global.button.Cancel')"
            @confirm="deleteHandler(row)">
            <Button class="w-17" danger ghost> {{ $t('global.button.Delete') }} </Button>
          </Popconfirm>
        </div>
      </template>
    </Grid>
    <FormDrawer />
  </Page>
</template>
