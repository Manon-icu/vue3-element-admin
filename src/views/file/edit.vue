<template>
  <el-dialog v-model="visible" title="编辑">
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
import { detailPhotoAlbumsFile, editPhotoAlbumsFiles } from '@/api/file'
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

const show = async row => {
  formData.value.photo_album_id = row.photo_album_id ? row.photo_album_id : ''
  if (row.isAdd != 1) {
    const { data } = await detailPhotoAlbumsFile(row.id)
    formData.value = { ...data }
    Object.keys(formData.value).forEach(key => {
      formData.value[key] = data[key]
    })
  }
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
      const { photo_album_id, file_url } = formData.value
      await editPhotoAlbumsFiles(photo_album_id, {
        file_url: file_url,
        file_type: /\.(jpg|png|gif)$/i.test(file_url) ? 1 : 2,
      })

      await props.cb?.()
      hide()
      ElMessage.success('编辑成功')
      loading.value = false
      const resetFormData = {
        file_url: '',
        photo_album_id: '',
      }
      formData.value = resetFormData
    }
  })
}

const onSuccess = (_, uploadFile) => {
  formData.value.file_url = uploadFile.response.data.file_url
}

defineExpose({
  show,
  hide,
  resetForm,
})
</script>
