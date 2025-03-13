<template>
  <div class="flex flex-col items-center">
    <dir class="!pl-0 w-[200px] h-[200px] rounded-full overflow-hidden bg-slate-200">
      <Image :src="model" placeholder />
    </dir>

    <Upload
      name="avatar"
      class="avatar-uploader rounded-full bg-blue-600"
      list-type="text"
      v-model:file-list="fileList"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      @change="imageUpload">
      <Button type="primary">选择图片</Button>
    </Upload>
  </div>
</template>

<script setup lang="ts">
import { Upload, message, Image, Button, type UploadChangeParam } from 'ant-design-vue'
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

:deep(.ant-image) {
  display: flex;
  width: 200px;
  height: 200px;
  border-radius: 50% !important;
  overflow: hidden;
}
</style>
