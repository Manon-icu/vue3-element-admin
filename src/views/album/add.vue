<template>
  <el-dialog v-model="visible" :title="staticData.title">
    <el-form label-width="120" :model="formData" :rules="rules" ref="fieldForm">
      <el-form-item prop="title" label="标题:">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item prop="occurrence_time" label="发生时间:">
        <el-date-picker
          v-model="formData.occurrence_time"
          value-format="YYYY-MM-DD"
          placeholder="选择发生时间"
        ></el-date-picker>
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
import { addPhotoAlbums, editPhotoAlbums, detailPhotoAlbums } from '@/api/album'
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
const fieldForm = ref()
const formData = ref({
  id: '-1',
  title: '',
  cover_img_url: '',
  occurrence_time: '',
  abstract: '',
})
const visible = ref(false)
const loading = ref(false)

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  occurrence_time: [
    { required: true, message: '请选择发生时间', trigger: 'blur' },
  ],
  cover_img_url: [{ required: true, message: '请选择封面', trigger: 'blur' }],
  abstract: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
}

const show = async row => {
  staticData.title = row.id != -1 ? '编辑' : '添加'
  if (row.id != -1) {
    const { data } = await detailPhotoAlbums(row.id)
    formData.value = { ...data }
    Object.keys(formData.value).forEach(key => {
      formData.value[key] = data[key]
    })
  }
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const onConfirm = async () => {
  fieldForm.value.validate(async valid => {
    if (valid) {
      loading.value = true
      const { cover_img_url, ...rest } = formData.value

      if (formData.value.id != -1) {
        await editPhotoAlbums(formData.value.id, formData.value)
      } else {
        await addPhotoAlbums(formData.value)
      }
      await props.cb?.()
      hide()
      ElMessage.success(formData.value.id == -1 ? '添加成功' : '编辑成功')
      loading.value = false
    }
  })
}

defineExpose({
  show,
  hide,
})
</script>
