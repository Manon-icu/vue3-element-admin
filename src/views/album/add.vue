<template>
    <el-dialog v-model="visible" :title="staticData.title">
      <el-form label-width="120" :model="formData" :rules="rules" ref="fieldForm">
        <el-form-item prop="title" label="标题:">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item prop="occurrence_time" label="发生时间:">
        <el-date-picker v-model="formData.occurrence_time"  value-format="YYYY-MM-DD hh:mm:ss" type="datetime" placeholder="选择发生时间"></el-date-picker>
      </el-form-item>
        <el-form-item prop="cover_img_url" label="封面:">
          <Upload v-model="formData.cover_img_url" />
        </el-form-item>
        <el-form-item prop="abstract" label="摘要:">
          <el-input type="textarea" v-model="formData.abstract"></el-input>
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
  import { addPhotoAlbums,editPhotoAlbums } from '@/api/album'
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
  })
  const fieldForm = ref();
  const formData = reactive({
    id:'-1',
    title: '',
    cover_img_url: '',
    occurrence_time: '',
    abstract:''
  })
  const visible = ref(false)
  const loading = ref(false)
  const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  occurrence_time: [
    { required: true, message: '请选择发生时间', trigger: 'blur' },
  ],
  cover_img_url: [
    { required: true, message: '请选择封面', trigger: 'blur' },
  ],
  abstract: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
}
  const show = row => {
  visible.value = true
  staticData.title = row.id!=-1?'编辑':'添加'
    formData.id =row.id!=-1? row.id:'-1'
    formData.title =row.id!=-1? row.title:''
    formData.cover_img_url = row.id!=-1? row.cover_img_url:''
    formData.occurrence_time = row.id!=-1? row.occurrence_time:''
    formData.abstract =row.id!=-1? row.abstract:''
}
  
  const hide = () => {
    visible.value = false
  }
  
  const onConfirm = async () => {
    fieldForm.value.validate(async valid =>{
        if (valid) {
            loading.value = true
        if(formData.id!=-1){
            await editPhotoAlbums(formData.id, formData)
        }else{
            await addPhotoAlbums(formData)
        }
      await props.cb?.()
      hide()
      ElMessage.success(formData.id==-1?'添加成功':'编辑成功')
      loading.value = false
        }
    })
  
  }
  const onSuccess = val => {
    formData.avatar_url = val.data.url
  }
  
  defineExpose({
    show,
    hide,
  })
  </script>
  