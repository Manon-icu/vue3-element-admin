<template>
  <el-dialog v-model="visible" title="编辑">
    <el-form label-width="120">
      <el-form-item prop="url" label="图片链接:">
        <Upload v-model="formData.url" />
        <!-- <el-input v-model="formData.url"></el-input> -->
      </el-form-item>
      <el-form-item prop="link" label="跳转链接:">
        <el-input v-model="formData.link"></el-input>
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
import { addBanner } from '@/api/banner'
import { ElMessage } from 'element-plus'
import Upload from '@/components/Upload/index.vue'

const formData = ref({})
const visible = ref(false)
const loading = ref(false)

const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
  formData.value = {}
}

const onConfirm = async () => {
  try {
    loading.value = true
    await addBanner(formData.value)
    hide()
    ElMessage.success('添加成功')
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
