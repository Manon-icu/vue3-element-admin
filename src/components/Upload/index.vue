<template>
  <el-upload
    ref="uploadRef"
    action="http://api.montessori-hz.com/admin/common/upload"
    :auto-upload="true"
    :on-success="onSuccess"
    accept="file/*"
    :limit="limit"
    list-type="picture"
  >
    <el-button type="primary">Click to upload</el-button>
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
const $emit = defineEmits(['update:modelValue'])
// 成功后更新 model
const onSuccess = val => {
  $emit('update:modelValue', val?.data?.file_url)
}
</script>
