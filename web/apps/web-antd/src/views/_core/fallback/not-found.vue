<script lang="ts" setup>
import { Fallback } from '@vben/common-ui'

defineOptions({ name: 'Fallback404Demo' })

const logout = () => {
  
}
</script>

<template>
  <Fallback status="404">
    <template #action>
      <VbenButton size="lg" @click="logout">
        <ArrowLeft class="mr-2 size-4" />
        {{ $t('common.backToHome') }}
      </VbenButton>
    </template>
  </Fallback>
</template>
