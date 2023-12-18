<template>
    <el-dialog v-model="visible" title="详情">
      <el-form label-width="120" :model="formData">
        <el-form-item prop="title" label="文件:">
          <div style="width: 100px;height:100px">
            <img
                    style="width:100%;height:100%;cursor:pointer;"
                    :src="formData.file_url"
                  />
          </div>
        
        </el-form-item>
      </el-form>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { detailPhotoAlbumsFile } from '@/api/file'
  
  const formData = reactive({
    id:'-1',
    file_url: '',
  })
  const visible = ref(false)
  const show = row => {
  visible.value = true
  formData.id = row.id
   onDetail()
}
const onDetail = async () => {
    const { data } = await detailPhotoAlbumsFile(formData.id)
    console.log(data,"datatatatat")
      formData.file_url = data.file_url
  }
  
  const hide = () => {
    visible.value = false
  }
  
  
  defineExpose({
    show,
    hide,
  })
  </script>
  