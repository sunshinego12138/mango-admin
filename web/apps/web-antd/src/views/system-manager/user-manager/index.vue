<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table'
import { $t } from '#/locales'
import { Page, useVbenModal } from '@vben/common-ui'
import { Button, message, Popconfirm, Tag, Avatar } from 'ant-design-vue'
import { Icon } from '@iconify/vue'
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
    <Grid :table-title="$t('system.user.title')">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="expandAll"> {{ $t('global.button.ExpandAll') }} </Button>
        <Button class="mr-2" type="primary" @click="collapseAll"> {{ $t('global.button.FoldAll') }} </Button>
        <Button type="primary" @click="add"> {{ $t('global.button.Add') }} </Button>
      </template>
      <template #username="{ row }">
        <Tag color="purple">
          <div class="flex items-center justify-center py-0.5">
            <Icon style="font-size: 16px" icon="solar:user-hands-linear" />
            <div style="font-size: 14px">{{ row.username }}</div>
          </div>
        </Tag>
      </template>
      <template #realName="{ row }">
        {{ row.realName || '暂未设置' }}
      </template>
      <template #avatar="{ row }">
        <Avatar :src="row.avatar || 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp'" />
      </template>
      <template #role="{ row }">
        <div>
          <Tag v-if="row?.role?.name == undefined">暂未设置</Tag>
          <Tag v-else>
            <div class="flex items-center justify-center py-0.5">
              <Icon style="font-size: 16px" icon="tabler:user-bolt" />
              <div style="font-size: 14px">{{ row?.role?.name }}</div>
            </div>
          </Tag>
        </div>
      </template>
      <template #sex="{ row }">
        <div class="w-full h-full flex items-center justify-center">
          <Tag v-if="row.sex === 'MALE'" color="green"><Icon icon="ph:gender-male-bold" style="font-size: 18px" /></Tag>
          <Tag v-else color="pink"><Icon icon="ph:gender-female-bold" style="font-size: 18px" /></Tag>
        </div>
      </template>
      <template #status="{ row }">
        <div class="w-full h-full flex items-center justify-center">
          <Tag v-if="row.status === 'ACTIVE'" color="green">正常</Tag>
          <Tag v-else color="red">禁用</Tag>
        </div>
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
