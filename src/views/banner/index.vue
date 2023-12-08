<template>
  <el-form>
    <el-form-item>
      <el-button type="primary" @click="onSearch">搜索</el-button>
      <el-button type="primary" @click="onAdd">添加</el-button>
    </el-form-item>
  </el-form>
  <el-table bordered :data="tableData">
    <el-table-column prop="id" label="ID"></el-table-column>
    <el-table-column prop="url" label="图片链接"></el-table-column>
    <el-table-column prop="link" label="跳转链接"></el-table-column>
    <el-table-column prop="created_at" label="创建时间"></el-table-column>
    <el-table-column prop="updated_at" label="更新时间"></el-table-column>
    <el-table-column prop="module_type" label="类型"></el-table-column>
    <el-table-column prop="module_type_desc" label="类型说明"></el-table-column>
    <el-table-column prop="status" label="状态">
      <template #default="{ row }">
        <el-popconfirm
          :title="`Are you sure to ${row.status ? 'disable' : 'enable'} this?`"
          @confirm="onSwitchStatus(row)"
        >
          <template #reference>
            <el-button>{{ row.status ? '禁用' : '启用' }}</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
    <el-table-column prop="operation" label="编辑">
      <template #default="{ row }">
        <el-button type="primary" @click="onEdit(row)">编辑</el-button>
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

  <Edit ref="editRef" />
  <Add ref="addRef" />
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getBannerList, toggleBannerStatus } from '@/api/banner'
import Edit from './edit.vue'
import Add from './add.vue'

const editRef = ref(null)
const addRef = ref(null)
const pagination = reactive({
  page: 1,
  page_size: 20,
  total: 0,
})
const tableData = ref([])

const onSearch = async () => {
  const { data } = await getBannerList({
    page: pagination.page,
    page_size: pagination.page_size,
  })
  tableData.value = data?.items
  pagination.total = data?.total
}

const onSwitchStatus = async row => {
  await toggleBannerStatus({ id: row.id })
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
