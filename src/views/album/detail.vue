<template>
  <el-dialog v-model="visible" title="详情">
    <el-form label-width="120" :model="formData">
      <el-form-item prop="title" label="标题:">
        <span>{{ formData.title }}</span>
      </el-form-item>

      <el-form-item prop="title" label="发生时间:">
        <span>{{ formData.occurrence_time }}</span>
      </el-form-item>
      <el-form-item prop="title" label="封面:">
        <div style="width: 100px; height: 100px">
          <img
            style="width: 100%; height: 100%; cursor: pointer"
            :src="formData.cover_img_url"
          />
        </div>
      </el-form-item>
      <el-form-item prop="title" label="摘要:">
        <span>{{ formData.abstract }}</span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { detailPhotoAlbums } from '@/api/album'

const formData = reactive({
  id: '-1',
  title: '',
  cover_img_url: '',
  occurrence_time: '',
  abstract: '',
})
const visible = ref(false)
const show = row => {
  visible.value = true
  formData.id = row.id
  onDetail()
}
const onDetail = async () => {
  const { data } = await detailPhotoAlbums(formData.id)
  formData.title = data.title
  formData.cover_img_url = data.cover_img_url
  formData.occurrence_time = data.occurrence_time
  formData.abstract = data.abstract
}

const hide = () => {
  visible.value = false
}

defineExpose({
  show,
  hide,
})
</script>
