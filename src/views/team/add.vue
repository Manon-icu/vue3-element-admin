<template>
  <el-dialog v-model="visible" title="编辑">
    <el-form label-width="120" :model="formData" :rules="rules">
      <el-form-item prop="nick_name" label="昵称:">
        <el-input v-model="formData.nick_name"></el-input>
      </el-form-item>
      <el-form-item prop="job_title" label="职称:">
        <el-input v-model="formData.job_title"></el-input>
      </el-form-item>
      <el-form-item prop="avatar_url" label="头像:">
        <Upload v-model="formData.avatar_url" />
      </el-form-item>
      <el-form-item prop="introduce" label="简介:">
        <el-input type="textarea" v-model="formData.introduce"></el-input>
      </el-form-item>
      <el-form-item prop="group_type" label="团队分组:">
        <el-select v-model="formData.group_type">
          <el-option label="培训师团队" value="1"></el-option>
          <el-option label="培训中心团队" value="2"></el-option>
          <el-option label="课程培训师" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="sort_index" label="排序:">
        <el-input v-model="formData.sort_index"></el-input>
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
import { addTeamMember } from '@/api/about'
import { ElMessage } from 'element-plus'
import Upload from '@/components/Upload/index.vue'

const props = defineProps({
  cb: {
    type: Function,
    required: true,
  },
})

const formData = reactive({
  nick_name: '',
  job_title: '',
  avatar_url: '',
  introduce: '',
  group_type: '',
  sort_index: '',
})
const visible = ref(false)
const loading = ref(false)
const rules = {
  nick_name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  job_title: [{ required: true, message: '请输入职称', trigger: 'blur' }],
  avatar_url: [{ required: true, message: '请输入头像', trigger: 'blur' }],
  introduce: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  group_type: [{ required: true, message: '请输入团队分组', trigger: 'blur' }],
  sort_index: [{ required: true, message: '请输入排序', trigger: 'blur' }],
}

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
    await addTeamMember(formData)
    await props.cb?.()
    hide()
    ElMessage.success('添加成功')
  } catch (error) {
    console.log('🚀 ~ file: edit.vue:61 ~ onConfirm ~ error:', error)
  } finally {
    loading.value = false
  }
}
const onSuccess = val => {
  formData.avatar_url = val.data.url
}

defineExpose({
  show,
  hide,
})
</script>
