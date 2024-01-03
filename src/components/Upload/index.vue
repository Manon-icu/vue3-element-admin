<template>
  <el-upload
    :file-list="fileList"
    ref="uploadRef"
    action="http://api.montessori-hz.com/admin/common/upload"
    :auto-upload="true"
    :on-success="onSuccess"
    :on-exceed="onExceed"
    accept="file/*"
    :limit="limit"
    list-type="picture"
  >
    <el-button type="primary">Click to upload</el-button>
  </el-upload>
</template>

<script setup>
import { computed, ref } from 'vue'
import { genFileId } from 'element-plus'
const uploadRef = ref(null)

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  EditfileUrl: {
    type: String,
    default:
      'https://lmg.jj20.com/up/allimg/1113/051220112022/200512112022-1-1200.jpg',
  },
  limit: {
    type: Number,
    default: 1,
  },
})
const fileList = computed(() => {
  return props.modelValue ? [{ url: props.modelValue }] : []
})
const $emit = defineEmits(['update:modelValue'])
// 成功后更新 model
const onSuccess = val => {
  $emit('update:modelValue', val?.data?.file_url)
}
const onExceed = files => {
  uploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
  uploadRef.value.submit()
}
</script>
