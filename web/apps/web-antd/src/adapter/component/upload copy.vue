<template>
  <view>
    <Upload
      name="avatar"
      class="avatar-uploader rounded-full"
      list-type="picture-card"
      v-model:file-list="fileList"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      @change="imageUpload">
      <div v-if="imageUrl">
        <img :src="imageUrl" alt="avatar" style="height: 102px; width: 102px; border-radius: 50%" />
      </div>
      <div v-else>
        <div class="rounded-full w-full h-full" v-if="loading">上传中</div>
        <div class="rounded-full w-full h-full" v-else>Upload</div>
      </div>
    </Upload>
  </view>
</template>

<script setup lang="ts">
import { Upload, message, type UploadChangeParam } from 'ant-design-vue'
import { ref } from 'vue'
import { postFileUploadImage } from '#/api/mango-admin/file'

const fileList = ref([])
const currentImg = ref<UploadChangeParam['file']>()
const loading = ref(false)
const model = defineModel<string>()
const imageUrl = ref('')

function beforeUpload(file: any) {
  const isJpgOrPng =
    file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg'
  if (!isJpgOrPng) {
    return message.error('请上传正确的图片格式!')
  }
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    return message.error('图片大小必须小于5MB!')
  }
}

async function imageUpload(info: UploadChangeParam) {
  try {
    if (loading.value) return
    loading.value = true
    if (currentImg.value?.uid == info.file.uid) {
      return
    }
    const res = await postFileUploadImage({}, info.file.originFileObj)
    const url = `${import.meta.env.VITE_GLOB_API_URL}file/file?name=${res.file}`
    currentImg.value = info.file
    model.value = url
    loading.value = false
    imageUrl.value = url
  } catch (error) {
    console.log('error', error)
  }
  // getBase64(info.file.originFileObj, (img: any) => {
  //   imageUrl.value = img
  //   model.value = img
  // })
}
</script>

<style scoped>
:deep(.ant-upload) {
  border-radius: 50% !important;
}
</style>
