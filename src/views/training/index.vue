<template>
  <el-form inline v-loading="loading">
    <el-form-item label="课程标题">
      <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="类型" style="width: 200px">
      <el-select v-model="formData.category">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item in CategoryOptions"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态" style="width: 200px">
      <el-select v-model="formData.status">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item in StatusOptions"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="首页显示" style="width: 200px">
      <el-select v-model="formData.is_home">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item in IsHomeOptions"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSearch">搜索</el-button>
      <el-button type="primary" @click="onAdd">添加</el-button>
    </el-form-item>
  </el-form>
  <el-table bordered :data="tableData">
    <el-table-column prop="title" label="课程标题"></el-table-column>
    <el-table-column prop="is_home_desc" label="首页显示">
      <template #default="{ row }">
        <el-text v-html="row.is_home_desc" />
        <el-text v-show="row.is_home === 1" v-html="', 排序值：'+row.home_index" />
      </template>
    </el-table-column>
    <!-- <el-table-column prop="home_index" label="首页排序值"></el-table-column> -->
    <el-table-column prop="updated_at" label="创建时间"></el-table-column>
    <el-table-column prop="cover_img_url" label="封面图">
      <template #default="{ row }">
        <el-image
          :src="row.cover_img_url"
          :preview-src-list="[row.cover_img_url]"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :z-index="999"
          preview-teleported
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="abstract" label="摘要">
      <template #default="{ row }" v-html="row.abstract"></template>
    </el-table-column>
    <el-table-column prop="category_desc" label="类型"></el-table-column>
    <el-table-column prop="status_desc" label="状态"></el-table-column>
    <el-table-column prop="operation" label="操作">
      <template #default="{ row }">
        <el-switch
          style="margin-right: 10px"
          v-model="row.status"
          :active-value="1"
          :inactive-value="2"
          @change="onSwitchStatus(row)"
        ></el-switch>
        <el-link type="primary" @click="onEdit(row)">编辑</el-link>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="pagination.total"
      v-model:current-page="pagination.page"
      :page-size="pagination.page_size"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

  <Edit ref="editRef" :cb="onSearch" />
  <Add ref="addRef" :cb="onSearch" />
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getTrainingList, toggleCourseStatus } from '@/api/training'
import Edit from './edit.vue'
import Add from './add.vue'

const CategoryEnums = {
  0: '无',
  1: '新课上线',
  //2: '正在报名',
  3: '精选课程',
}
const StatusEnums = {
  0: '全部',
  1: '有效',
  2: '无效',
}
const IsHomeEnums = {
  [-1]: '全部',
  1: '是',
  0: '否',
}

const CategoryOptions = Object.entries(CategoryEnums).map(([value, label]) => ({
  value,
  label,
}))

const StatusOptions = Object.entries(StatusEnums).map(([value, label]) => ({
  value,
  label,
}))

const IsHomeOptions = Object.entries(IsHomeEnums).map(([value, label]) => ({
  value,
  label,
}))

const loading = ref(false)
const editRef = ref(null)
const addRef = ref(null)
const formData = reactive({
  category: '0',
  title: '',
  status: '0',
  is_home: '-1',
})
const pagination = reactive({
  page: 1,
  page_size: 10,
  total: 0,
})
const tableData = ref([])

const onSearch = async () => {
  try {
    loading.value = true
    const { data } = await getTrainingList({
      ...formData,
      page: pagination.page,
      page_size: pagination.page_size,
    })
    tableData.value = data?.items
    pagination.total = data?.total
  } catch (error) {
    console.log('🚀 ~ file: index.vue:26 ~ error', error)
  } finally {
    loading.value = false
  }
}

const onSwitchStatus = async row => {
  await toggleCourseStatus({ id: row.id })
  await onSearch()
}

const onEdit = row => {
  editRef.value.show(row)
}

const onAdd = () => {
  addRef.value.show()
}

const handleCurrentChange = async val => {
  pagination.page = val
  await onSearch()
}
const handleSizeChange = async val => {
  pagination.page_size = val
  pagination.page = 1
  await onSearch()
}

onMounted(async () => {
  pagination.page = 1
  await onSearch()
})
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
