<template>
  <el-dialog v-model="visible" title="编辑" width="85%" v-loading="loading">
    <el-form label-width="120" :model="formData" :rules="rules">
      <el-form-item prop="title" label="标题:">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item prop="occurrence_time" label="生效时间:">
        <el-date-picker v-model="formData.occurrence_time"></el-date-picker>
      </el-form-item>
      <el-form-item prop="cover_img_url" label="封面:">
        <Upload v-model="formData.cover_img_url" />
      </el-form-item>
      <el-form-item prop="abstract" label="简介:">
        <el-input type="textarea" v-model="formData.abstract"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容:">
        <MEditor v-model="formData.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="hide">取消</el-button>
        <el-button type="primary" :loading="loading" @click="onConfirm">
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { editNews, getNewsDetail } from '@/api/news'
import { ElMessage } from 'element-plus'
import Upload from '@/components/Upload/index.vue'
import MEditor from '@/components/MEditor/index.vue'

const props = defineProps({
  cb: {
    type: Function,
    required: true,
  },
})

const formData = ref({
  id: '',
  title: '',
  occurrence_time: '',
  cover_img_url: '',
  abstract: '',
  content: '',
})
const visible = ref(false)
const loading = ref(false)
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  occurrence_time: [
    { required: true, message: '请输入生效时间', trigger: 'blur' },
  ],
  cover_img_url: [
    { required: true, message: '请输入封面链接', trigger: 'blur' },
  ],
  abstract: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
}

const show = async ({ id }) => {
  const { data } = await getNewsDetail(id)
  formData.value.id = data.id
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = data[key]
  })
  visible.value = true
}

const hide = () => {
  visible.value = false
  formData.value = {}
}

const onConfirm = async () => {
  try {
    loading.value = true
    await editNews(formData.value)
    await props.cb?.()
    hide()
    ElMessage.success('编辑成功')
  } catch (error) {
    console.log('🚀 ~ file: edit.vue:61 ~ onConfirm ~ error:', error)
  } finally {
    loading.value = false
  }
}

defineExpose({
  show,
  hide,
})
</script>
