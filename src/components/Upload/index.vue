<template>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    action="http://api.montessori-hz.com/admin/common/upload"
    :auto-upload="true"
    :on-success="onSuccess"
    :on-remove="onRemove"
    :limit="limit"
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>
    <template #file="{ file }">
      <el-image
        :src="file?.response?.data?.file_url"
        style="width: 100px; height: 100px"
      ></el-image>
    </template>
  </el-upload>
</template>

<script setup>
import { ref } from 'vue'
const uploadRef = ref(null)

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    default: 1,
  },
})
const $emit = defineEmits(['update:modelValue'])
// 成功后更新 model
const onSuccess = val => {
  $emit('update:modelValue', val?.data?.file_url)
}
//移除或替换
const onRemove = () => {
  $emit('update:modelValue', '')
}
</script>
