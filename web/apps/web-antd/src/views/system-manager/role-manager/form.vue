<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui'
import { useVbenForm } from '#/adapter/form'
import { FormOption, postFunc, putFunc } from './def'
import { message } from 'ant-design-vue'
import { $t } from '@vben/locales'

defineOptions({
  name: `Form`,
})

const [Form, formApi] = useVbenForm(FormOption)

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close()
  },
  onConfirm: async () => {
    const data: any = await formApi.submitForm()
    const status = await formApi.validate()
    const row = modalApi.getData<Record<string, any>>()

    if (status.valid) {
      // 验证通过
      if (row.id) {
        // 编辑
        putFunc(
          {
            id: row.id,
          },
          data,
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
        postFunc(data)
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
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      formApi.resetForm()
      formApi.resetValidate()
      const data = modalApi.getData<Record<string, any>>()
      if (data) {
        const { permissions, ...res } = data
        const menu = permissions.map((item: any) => item.menuId)
        formApi.setValues({
          ...res,
          menu,
        })
      }
    }
  },
  title: $t('system.menu.title'),
})
</script>
<template>
  <Modal class="w-[80vw]">
    <Form />
  </Modal>
</template>
