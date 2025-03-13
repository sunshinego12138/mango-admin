<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui'
import { $t } from '@vben/locales'
import { Step, Steps, message } from 'ant-design-vue'
import { ref } from 'vue'
import { Form1, Form2, Form3, Form4, FormAPIS as _FormAPIS, postFunc, putFunc } from './def'
import { omit } from '#/utils'

defineOptions({
  name: `Form`,
})

const currentTab = ref(0)
// 是否是编辑模式
const isEdit = ref(false)

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    const FormAPIS = isEdit.value ? omit(_FormAPIS, ['formApi4']) : _FormAPIS
    if (currentTab.value === 0) {
      modalApi.close()
      return
    }

    // 设置取消和确认按钮的文字
    if (currentTab.value + 1 == Object.keys(FormAPIS).length) {
      modalApi.setState({ confirmText: '下一步' })
    }
    if (currentTab.value - 1 == 0) {
      modalApi.setState({ cancelText: '取消' })
    } else {
      modalApi.setState({ cancelText: '上一步' })
    }
    currentTab.value -= 1
  },
  onConfirm: async () => {
    const FormAPIS = isEdit.value ? omit(_FormAPIS, ['formApi4']) : _FormAPIS
    if (currentTab.value + 2 < Object.keys(FormAPIS).length) {
      modalApi.setState({ confirmText: '下一步' })
    } else {
      modalApi.setState({ confirmText: '保存' })
    }
    if (currentTab.value + 1 !== 0) {
      modalApi.setState({ cancelText: '上一步' })
    } else {
      modalApi.setState({ cancelText: '取消' })
    }
    if (currentTab.value + 1 !== Object.keys(FormAPIS).length) {
      // @ts-ignore
      const api = FormAPIS[`formApi${currentTab.value + 1}`]
      const status = await api.validate()
      if (status.valid) {
        currentTab.value += 1
      }
      return
    }

    let api
    if (isEdit.value) {
      api = FormAPIS.formApi1.merge(FormAPIS.formApi2).merge(FormAPIS.formApi3)
    } else {
      api = FormAPIS.formApi1.merge(FormAPIS.formApi2).merge(FormAPIS.formApi3).merge(_FormAPIS.formApi4)
    }

    const data: any = await api.submitAllForm()
    const status = await api.validate()
    let status2
    if (isEdit.value) {
      status2 = true
    } else {
      const passwordStatus = await _FormAPIS.formApi4.validate()
      status2 = passwordStatus.valid
    }
    const row = modalApi.getData<Record<string, any>>()

    if (status.valid && status2) {
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
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      currentTab.value = 0
      isEdit.value = false
      const FormAPIS = isEdit.value ? omit(_FormAPIS, ['formApi4']) : _FormAPIS
      const api = FormAPIS.formApi1.merge(FormAPIS.formApi2).merge(FormAPIS.formApi3)
      api.resetForm()
      api.resetValidate()
      const data = modalApi.getData<Record<string, any>>()
      if (Object.keys(data).length) {
        isEdit.value = true
        FormAPIS.formApi1.setValues(data)
        FormAPIS.formApi2.setValues(data)
        FormAPIS.formApi3.setValues(data)
      }
    }
  },
  confirmText: '下一步',
  title: $t('system.menu.title'),
})
</script>
<template>
  <Modal class="w-[80vw]">
    <!-- <Form1 /> -->
    <div class="w-full h-full">
      <div class="px-16 pb-4">
        <Steps :current="currentTab" class="steps">
          <Step title="个人信息" />
          <Step title="用户信息" />
          <Step title="设置头像" />
          <Step v-if="!isEdit" title="设置密码" />
        </Steps>
      </div>

      <div>
        <Form1 v-show="currentTab === 0" />
        <Form2 v-show="currentTab === 1" />
        <Form3 v-show="currentTab === 2" />
        <Form4 v-if="!isEdit" v-show="currentTab === 3" />
        <!-- <SecondForm v-show="currentTab === 1" /> -->
      </div>
    </div>
  </Modal>
</template>
