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
  import { addPhotoAlbumsFiles,editPhotoAlbumsFiles } from '@/api/file'
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
    isAdd:1,
  })
  const fieldForm = ref();
  const formData = reactive({
    photo_album_id:'',
    file_url: '',
    file_type:1
  })
  const visible = ref(false)
  const loading = ref(false)
  const rules = {
  file_url: [
    { required: true, message: '请选择文件', trigger: 'blur' },
  ],
}
  const show = row => {
  visible.value = true
  staticData.title = row.isAdd==1?'添加':'编辑'
    formData.file_url = row.isAdd==1?'': row.file_url
    formData.photo_album_id =row.photo_album_id?row.photo_album_id:''
}
  
  const hide = () => {
    visible.value = false
  }
  
  const onConfirm = async () => {
    fieldForm.value.validate(async valid =>{
        if (valid) {
            loading.value = true
            if(staticData.title=='添加') {
              await addPhotoAlbumsFiles(formData)
            }else{
              const editFormData = {
                file_url:formData.file_url,
                file_type:1
              }
              await editPhotoAlbumsFiles(formData.photo_album_id, editFormData)
            }
          
      await props.cb?.()
      hide()
      ElMessage.success(`{staticData.title}成功`)
      loading.value = false
        }
    })
  
  }
  const onSuccess = val => {
    console.log(val,"valvalvalvalvalvalval")
    formData.file_url = val.data.url
  }
  
  defineExpose({
    show,
    hide,
  })
  </script>
  