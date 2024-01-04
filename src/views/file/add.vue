<template>
  <el-dialog v-model="visible" :title="staticData.title">
    <el-form label-width="120" :model="formData" :rules="rules" ref="fieldForm">
      <el-form-item prop="file_url" label="文件:">
        <Upload v-model="formData.file_url" />
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
import { ref, reactive } from 'vue'
import { addPhotoAlbumsFiles, editPhotoAlbumsFiles,detailPhotoAlbumsFile } from '@/api/file'
import { ElMessage } from 'element-plus'
import Upload from '@/components/Upload/index.vue'

const props = defineProps({
  cb: {
    type: Function,
    required: true,
  },
})
const staticData = reactive({
  title: '添加',
  isAdd: 1,
})
const fieldForm = ref(null) // 引用表单实例
const formData = ref({
  photo_album_id: '',
  file_url: '',
  file_type: 1,
})
const visible = ref(false)
const loading = ref(false)
const rules = {
  file_url: [{ required: true, message: '请选择文件', trigger: 'blur' }],
}


// const show = row => {
//   visible.value = true
//   staticData.title = row.isAdd == 1 ? '添加' : '编辑'
//   formData.value.file_url = row.isAdd == 1 ? '' : row.file_url
//   formData.value.photo_album_id = row.photo_album_id ? row.photo_album_id : ''
//   if (row.isAdd == 1) {
//   }
// }


const show = async row => {
  console.log(row,"asdad")
  staticData.title = row.isAdd == 1 ? '添加' : '编辑'
  formData.value.photo_album_id = row.photo_album_id ? row.photo_album_id : ''
  if(row.isAdd!=1) {
    const { data } = await detailPhotoAlbumsFile(row.id)
  formData.value = {...data}
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
function isImageType(str) {
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.PNG',
    '.JPG',
    '.JPEG',
    '.BMP',
    '.GIF',
  ]
  'png', 'jpg', 'jpeg', 'bmp', 'gif'
  return imageExtensions.some(extension => str.endsWith(extension))
}
const onConfirm = async () => {
  fieldForm.value.validate(async valid => {
    if (valid) {
      loading.value = true
      const fileType = isImageType(formData.value.file_url) ? 1 : 2
      formData.value.file_type = fileType
      if (staticData.title == '添加') {
        await addPhotoAlbumsFiles(formData.value)
      } else {
        const editFormData = {
          file_url: formData.value.file_url,
          file_type: fileType,
        }
        await editPhotoAlbumsFiles(formData.value.photo_album_id, editFormData)
      }

      await props.cb?.()
      hide()
      ElMessage.success(`${staticData.title}成功`)
      loading.value = false
      const resetFormData = {
        file_url: '',
        file_type: 1,
        photo_album_id: '',
      }
      formData.value = resetFormData
    }
  })
}
const onSuccess = val => {
  console.log(val, 'valvalvalvalvalvalval')
  formData.value.file_url = val.data.url
}

defineExpose({
  show,
  hide,
  resetForm,
})
</script>
