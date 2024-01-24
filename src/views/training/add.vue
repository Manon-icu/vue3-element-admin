<template>
  <el-dialog v-model="visible" title="添加课程" width="85%" :before-close="hide">
    <el-form label-width="120" :model="formData" :rules="rules">
      <el-form-item label="课程标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="显示在首页" prop="is_home_desc">
        <el-switch v-model="formData.is_home_desc"
        inline-prompt
        active-value="是"
        inactive-value="否"
        active-text="是"
        inactive-text="否" />
      </el-form-item>
      <el-form-item label="首页排序值" prop="home_index">
        <el-input-number v-model="formData.home_index" :min="1" :max="20" />
      </el-form-item>
      <el-form-item label="类型" prop="category">
        <el-select v-model="formData.category">
          <el-option label="无" :value="0"></el-option>
          <el-option label="新课上线" :value="1"></el-option>
          <el-option label="精选课程" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <!-- 
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status">
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="有效" :value="1"></el-option>
          <el-option label="无效" :value="2"></el-option>
        </el-select>
      </el-form-item>
    -->
      <!-- <el-form-item label="课程时长数字" prop="duration_num">
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
      </el-form-item> -->
      <el-form-item label="报名结束时间" prop="end_time">
        <el-date-picker
          v-model="formData.end_time"
          value-format="YYYY-MM-DD"
          placeholder="请选择报名结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="培训老师" prop="team_members_ids">
        <el-select 
          multiple
          placeholder="请选择培训老师团队成员"
          v-model="formData.team_members_ids"
         >
         <el-option
        v-for="item in teamMembersOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
        </el-select>
        <!-- <el-input
          v-model="formData.team_members_ids"
          placeholder="请输入培训老师团队成员 ID，使用逗号分隔"
        ></el-input> -->
      </el-form-item>
      <el-form-item prop="cover_img_url" label="封面:">
        <Upload v-model="formData.cover_img_url" />
      </el-form-item>
      <el-form-item prop="abstract" label="简介:">
        <el-input type="textarea" v-model="formData.abstract"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="content" label="内容:">
        <MEditor v-model="formData.content" />
      </el-form-item> -->
      <el-form-item prop="preface" label="写在前面:">
        <MEditor v-model="formData.preface" />
      </el-form-item>
      <el-form-item prop="description" label="课程描述:">
        <MEditor v-model="formData.description" />
      </el-form-item>
      <el-form-item prop="timetable_img_url" label="课程时间表:">
        <Upload v-model="formData.timetable_img_url" />
      </el-form-item>
      <!-- <el-form-item label="培训信息" prop="training_information_type">
        <el-select v-model="formData.training_information_type">
          <el-option label="Training infor-A" :value="1"></el-option>
          <el-option label="Training infor-B" :value="2"></el-option>
          <el-option label="Training infor-C" :value="3"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item prop="course_time" label="课程时间:">
        <MEditor v-model="formData.course_time" />
      </el-form-item>
      <el-form-item prop="notification" label="特别说明:">
        <MEditor v-model="formData.notification" />
      </el-form-item>
      <el-form-item prop="tution_fee" label="培训费用:">
        <MEditor v-model="formData.tution_fee" />
      </el-form-item>
      <el-form-item prop="language" label="授课语言:">
        <MEditor v-model="formData.language" />
      </el-form-item>
      <el-form-item prop="application_requirements" label="申请要求:">
        <MEditor v-model="formData.application_requirements" />
      </el-form-item>
      <el-form-item prop="application" label="申请方式:">
        <MEditor v-model="formData.application" />
      </el-form-item>
      <el-form-item prop="application_process" label="申请流程:">
        <MEditor v-model="formData.application_process" />
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
import { addCourse } from '@/api/training'
import { ElMessage } from 'element-plus'
import Upload from '@/components/Upload/index.vue'
import MEditor from '@/components/MEditor/index.vue'
import { getTeamMemberList } from '@/api/about'

const props = defineProps({
  cb: {
    type: Function,
    required: true,
  },
})

const initFormData = {
  title: '',
  is_home: 0,
  home_index: 1,
  is_home_desc: '否',
  category: 0,
  cover_img_url: '',
  abstract: '',
  preface: '',
  description: '',
  // content: '',
  timetable_img_url: '',
  course_time: '',
  notification: '',
  tution_fee: '',
  language: '',
  application_requirements: '',
  application: '',
  application_process: '',
  duration_num: 4,
  duration_unit: 2,
  end_time: '',
  team_members_ids: '',
  training_information_type: 1,
  status: 1,
}

let teamMembersOptions = []

const formData = ref({
  ...initFormData
})
const visible = ref(false)
const loading = ref(false)
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  cover_img_url: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
  abstract: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
  // content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  preface: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  description: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  // duration_num: [
  //   { required: true, message: '请输入课程时长', trigger: 'blur' },
  // ],
  // duration_unit: [
  //   { required: true, message: '请选择课程时长单位', trigger: 'blur' },
  // ],
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

const show = async () => {
  visible.value = true
  // formData.value = initFormData 
  const { data } = await getTeamMemberList()
  teamMembersOptions = data?.items.map((item) => ({
    value: item.id,
    label: item.nick_name
  }))
}

const hide = () => {
  visible.value = false
  formData.value = {...initFormData}
}

const onConfirm = async () => {
  try {
    loading.value = true
    if(formData.value.is_home_desc === '是') {
      formData.value.is_home = 1
      formData.value.is_home_desc = '是'
    } else {
      formData.value.is_home = 0
      formData.value.is_home_desc = '否'
    }
    formData.value.team_members_ids = formData.value.team_members_ids.join(',')
    const {code, message}= await addCourse(formData.value)
    await props.cb?.()
    if(code === 0) {
      ElMessage.success('添加成功！')
    } else {
      ElMessage.error(`添加失败！${message}`)
    }
    hide()
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
