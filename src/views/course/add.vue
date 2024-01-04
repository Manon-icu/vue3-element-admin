<template>
    <el-dialog v-model="visible" :title="staticData.title">
      <el-form label-width="120" :model="formData" :rules="rules" ref="fieldForm">
        <el-form-item prop="occurrence_time" label="发生时间:">
        <el-date-picker v-model="formData.occurrence_time"  value-format="YYYY-MM" type="month" placeholder="选择发生时间"></el-date-picker>
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
  import { addHistories,editHistories,detailHistories } from '@/api/course'
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
  const formData = ref({
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
    { required: false, message: '请选择图片1地址', trigger: 'blur' },
  ],
  img_url2: [
    { required: false, message: '请选择图片2地址', trigger: 'blur' },
  ],
  content: [{ required: true, message: '请输入发生内容', trigger: 'blur' }],
}
  

const show = async row => {
  console.log(row,"asdad")
  staticData.title = row.id!=-1?'编辑':'添加'
  if(row.id!=-1) {
    const { data } = await detailHistories(row.id)
  formData.value = {...data}
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = data[key]
  })
  }else{
    formData.value = {
      id:-1
    }
  }
  visible.value = true
}



  
  const hide = () => {
    visible.value = false
  }
  
  const onConfirm = async () => {
    fieldForm.value.validate(async valid =>{
        if (valid) {
          console.log(formData.value,"formDataformDataformData")
          formData.value.occurrence_time =formData.value.id==-1?formData.value.occurrence_time? formData.value.occurrence_time+'-01':'':formData.value.occurrence_time
            loading.value = true
        if(formData.value.id!=-1){
            await editHistories(formData.value.id, formData.value)
        }else{
            await addHistories(formData.value)
        }
      await props.cb?.()
      hide()
      ElMessage.success(formData.value.id==-1?'添加成功':'编辑成功')
      loading.value = false
        }
    })
  
  }
  const onSuccess = val => {
    formData.value.avatar_url = val.data.url
  }
  
  defineExpose({
    show,
    hide,
  })
  </script>
  