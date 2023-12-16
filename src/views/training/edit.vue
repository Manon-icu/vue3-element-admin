<template>
  <el-dialog v-model="visible" title="编辑" width="85%">
    <el-form label-width="120" :model="formData" :rules="rules">
      <el-form-item label="课程标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="category">
        <el-select v-model="formData.category">
          <el-option label="无" :value="0"></el-option>
          <el-option label="新课上线" :value="1"></el-option>
          <el-option label="正在报名" :value="2"></el-option>
          <el-option label="精选课程" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status">
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="有效" :value="1"></el-option>
          <el-option label="无效" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程时长数字" prop="duration_num">
        <el-input
          type="number"
          v-model="formData.duration_num"
          placeholder="请输入课程时长"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程时长单位" prop="duration_unit">
        <el-select
          v-model="formData.duration_unit"
          placeholder="请选择课程时长单位"
        >
          <el-option label="天" :value="1"></el-option>
          <el-option label="周" :value="2"></el-option>
          <el-option label="月" :value="3"></el-option>
          <el-option label="年" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结束时间" prop="end_time">
        <el-date-picker
          v-model="formData.end_time"
          placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="培训老师" prop="team_members_ids">
        <el-input
          v-model="formData.team_members_ids"
          placeholder="请输入培训老师团队成员 ID，使用逗号分隔"
        ></el-input>
      </el-form-item>
      <el-form-item prop="cover_img_url" label="封面:">
        <Upload v-model="formData.cover_img_url" />
      </el-form-item>
      <el-form-item prop="abstract" label="简介:">
        <el-input type="textarea" v-model="formData.abstract"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容:">
        <MEditor v-model="formData.content" />
      </el-form-item>
      <el-form-item label="培训信息" prop="training_information_type">
        <el-select v-model="formData.training_information_type">
          <el-option label="无" value="0"></el-option>
          <el-option label="Training infor-A" :value="1"></el-option>
          <el-option label="Training infor-B" :value="2"></el-option>
          <el-option label="Training infor-C" :value="3"></el-option>
        </el-select>
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
import { editCourse } from '@/api/training'
import { ElMessage } from 'element-plus'
import Upload from '@/components/Upload/index.vue'
import MEditor from '@/components/MEditor/index.vue'

const props = defineProps({
  cb: {
    type: Function,
    required: true,
  },
})

const formData = ref({
  id: '',
  title: '',
  category: '',
  cover_img_url: '',
  abstract: '',
  content: '',
  duration_num: 4,
  duration_unit: 2,
  end_time: '2021-09-30 00:00:00',
  team_members_ids: '1,2,3',
  training_information_type: 1,
  status: 1,
})
const visible = ref(false)
const loading = ref(false)
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  cover_img_url: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
  abstract: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  duration_num: [
    { required: true, message: '请输入课程时长', trigger: 'blur' },
  ],
  duration_unit: [
    { required: true, message: '请选择课程时长单位', trigger: 'blur' },
  ],
  end_time: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
  team_members_ids: [
    {
      required: true,
      message: '请输入培训老师团队成员 ID，使用逗号分隔',
      trigger: 'blur',
    },
  ],
  training_information_type: [
    { required: true, message: '请选择培训信息', trigger: 'blur' },
  ],
  status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
}

const show = row => {
  formData.value.id = row.id
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = row[key]
  })
  visible.value = true
}

const hide = () => {
  visible.value = false
  formData.value = {}
}

const onConfirm = async () => {
  try {
    loading.value = true
    await editCourse(formData.id, formData.value)
    await props.cb?.()
    hide()
    ElMessage.success('编辑成功')
  } catch (error) {
    console.log('🚀 ~ file: edit.vue:61 ~ onConfirm ~ error:', error)
  } finally {
    loading.value = false
  }
}

defineExpose({
  show,
  hide,
})
</script>
