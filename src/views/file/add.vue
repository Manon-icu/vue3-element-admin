<template>
  <el-dialog v-model="visible" title="添加">
    <el-form label-width="120" :model="formData" :rules="rules" ref="fieldForm">
      <el-form-item prop="file_url" label="文件:">
        <el-upload
          v-model:file-list="fileList"
          ref="uploadRef"
          action="https://api.montessori-hz.com/admin/common/upload"
          accept="file/*"
          list-type="picture"
          :multiple="true"
          :on-success="onSuccess"
        >
          <el-button type="primary">Click to upload</el-button>
        </el-upload>
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
import { batchAddPhotoAlbumsFiles } from '@/api/file'
import { ElMessage } from 'element-plus'

const props = defineProps({
  cb: {
    type: Function,
    required: true,
  },
})
const uploadRef = ref(null)
const fileList = ref([])

const fieldForm = ref(null) // 引用表单实例
const formData = ref({
  photo_album_id: '',
  file_url: '',
})
const visible = ref(false)
const loading = ref(false)
const rules = {
  file_url: [{ required: true, message: '请选择文件', trigger: 'blur' }],
}

const show = async id => {
  formData.value.photo_album_id = id ?? ''
  visible.value = true
}

const resetForm = () => {
  fieldForm.value.resetFields()
}
const hide = () => {
  visible.value = false
}

const onConfirm = async () => {
  fieldForm.value.validate(async valid => {
    if (valid) {
      loading.value = true

      await batchAddPhotoAlbumsFiles({
        photo_album_id: formData.value.photo_album_id,
        json_data: formData.value.file_url,
      })

      await props.cb?.()
      hide()
      ElMessage.success('添加成功')
      loading.value = false
      const resetFormData = {
        file_url: '',
        photo_album_id: '',
      }
      formData.value = resetFormData
    }
  })
}

const onSuccess = (response, uploadFile, uploadFiles) => {
  const jsonData = uploadFiles.map(item => ({
    file_url: item.response.data.file_url,
    file_type: /\.(jpg|png|gif)$/i.test(item.response.data.file_url) ? 1 : 2,
  }))
  formData.value.file_url = JSON.stringify(jsonData)
}

defineExpose({
  show,
  hide,
  resetForm,
})
</script>
