<template>
  <el-form inline v-loading="loading">
    <el-form-item label="昵称">
      <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="formData.status">
        <el-option label="全部" value="-1"></el-option>
        <el-option label="有效" value="1"></el-option>
                <el-option label="无效" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSearch">搜索</el-button>
      <el-button type="primary" @click="onAdd">添加</el-button>
    </el-form-item>
  </el-form>
  <el-table bordered :data="tableData">
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="occurrence_time" label="发生时间"></el-table-column>
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
    <el-table-column prop="status_desc" label="状态"></el-table-column>
    <!-- <el-table-column prop="status" label="状态">
      <template #default="{ row }">
        <el-popconfirm
          :title="`Are you sure to ${row.status ? 'disable' : 'enable'} this?`"
          @confirm="onSwitchStatus(row)"
        >
          <template #reference>
            <el-button>{{ row.status === 1 ? '禁用' : '启用' }}</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column> -->
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
import { getNewsList, toggleStatus } from '@/api/news'
import Edit from './edit.vue'
import Add from './add.vue'

const loading = ref(false)
const editRef = ref(null)
const addRef = ref(null)
const formData = reactive({
  title: '',
  status: '1',
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
    const { data } = await getNewsList({
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
  await toggleStatus({ id: row.id })
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
