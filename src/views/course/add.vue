<template>
    <el-dialog v-model="visible" :title="staticData.title">
      <el-form label-width="120" :model="formData" :rules="rules" ref="fieldForm">
        <el-form-item prop="occurrence_time" label="发生时间:">
        <el-date-picker v-model="formData.occurrence_time"  value-format="YYYY-MM-DD hh:mm:ss" type="datetime" placeholder="选择发生时间"></el-date-picker>
      </el-form-item>
        <el-form-item prop="img_url1" label="图片1地址:">
          <Upload v-model="formData.img_url1" />
        </el-form-item>
        <el-form-item prop="img_url2" label="图片2地址:">
          <Upload v-model="formData.img_url2" />
        </el-form-item>
        <el-form-item prop="content" label="发生内容:">
          <el-input type="textarea" v-model="formData.content"></el-input>
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
  import { addHistories,editHistories } from '@/api/course'
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
    img_url1: '',
    img_url2:'',
    occurrence_time: '',
    content:''
  })
  const visible = ref(false)
  const loading = ref(false)
  const rules = {
  occurrence_time: [
    { required: true, message: '请选择发生时间', trigger: 'blur' },
  ],
  img_url1: [
    { required: true, message: '请选择图片1地址', trigger: 'blur' },
  ],
  img_url2: [
    { required: true, message: '请选择图片2地址', trigger: 'blur' },
  ],
  content: [{ required: true, message: '请输入发生内容', trigger: 'blur' }],
}
  const show = row => {
  visible.value = true
  staticData.title = row.id!=-1?'编辑':'添加'
    formData.id =row.id!=-1? row.id:'-1'
    formData.img_url1 = row.id!=-1? row.img_url1:''
    formData.img_url2 = row.id!=-1? row.img_url2:''
    formData.occurrence_time = row.id!=-1? row.occurrence_time:''
    formData.content =row.id!=-1? row.content:''
}
  
  const hide = () => {
    visible.value = false
  }
  
  const onConfirm = async () => {
    fieldForm.value.validate(async valid =>{
        if (valid) {
            loading.value = true
        if(formData.id!=-1){
            await editHistories(formData.id, formData)
        }else{
            await addHistories(formData)
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
  