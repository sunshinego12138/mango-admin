<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui'

import { computed, markRaw } from 'vue'

import { AuthenticationLogin, SliderCaptcha, z } from '@vben/common-ui'
import { $t } from '@vben/locales'

import { useAuthStore } from '#/store'

defineOptions({ name: 'Login' })

const authStore = useAuthStore()


const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      dependencies: {
        // trigger(_, form) {
        //   form.setValues({
        //     password: '123456',
        //     username: '123456',
        //   })
        // },
        triggerFields: ['selectAccount'],
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: markRaw(SliderCaptcha),
      // component: markRaw(
      //   h(SliderRotateCaptcha, { src: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp' }),
      // ),
      fieldName: 'captcha',
      rules: z.boolean().refine((value) => value, {
        message: $t('authentication.verifyRequiredTip'),
      }),
    },
  ]
})
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
    :show-third-party-login="false"
    :show-code-login="false"
    :show-qrcode-login="false" />
</template>
