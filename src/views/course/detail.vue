<template>
    <el-dialog v-model="visible" title="详情">
      <el-form label-width="120" :model="formData">

        <el-form-item  label="发生时间:">
          <span>{{ formData.occurrence_time }}</span>
        </el-form-item>
        <el-form-item  label="内容:">
          <span>{{ formData.content }}</span>
        </el-form-item>
        <el-form-item  label="状态:">
          <span>{{ formData.status_desc }}</span>
        </el-form-item>
        <el-form-item  label="图片1:">
          <div style="width: 100px;height:100px">
            <img
            v-if="formData.img_url1"
                    style="width:100%;height:100%;cursor:pointer;"
                    :src="formData.img_url1"
                  />
                  <span v-else>暂无</span>
          </div>
        
        </el-form-item>
        <el-form-item  label="图片2:">
          <div style="width: 100px;height:100px" >
            <img
              v-if="formData.img_url2"
                    style="width:100%;height:100%;cursor:pointer;"
                    :src="formData.img_url2"
                  />
                  <span v-else>暂无</span>
          </div>
        
        </el-form-item>
      </el-form>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { detailHistories } from '@/api/course'
  
  const formData = reactive({
    id:'-1',
    img_url1: '',
    img_url2: '',
    occurrence_time: '',
    content:'',
    status_desc:''
  })
  const visible = ref(false)
  const show = row => {
  visible.value = true
  formData.id = row.id
   onDetail()
}
const onDetail = async () => {
    const { data } = await detailHistories(formData.id)
    console.log(data,"datatatatat")
      formData.content = data.content
      formData.img_url1 = data.img_url1
      formData.img_url2 = data.img_url2
      formData.occurrence_time = data.occurrence_time
      formData.status_desc = data.status_desc
  }
  
  const hide = () => {
    visible.value = false
  }
  
  
  defineExpose({
    show,
    hide,
  })
  </script>
  