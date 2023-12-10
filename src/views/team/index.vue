<template>  
我的团队
    <!-- <el-form>
      <el-form-item>
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form> -->
    <!-- <el-table   v-loading="loading" bordered :data="tableData">
      <el-table-column width="50" prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="occurrence_time" label="发生时间"></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column width="80"  prop="status_desc" label="状态"> </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template #default="{ row }">
              <el-switch
              style="margin-right: 10px"
          v-model="row.status"
          @change="onSwitch(row)"
        ></el-switch>

          <el-link type="primary" @click="onEdit(row)"
            >编辑</el-link
          >
          <el-link style="margin-left: 10px;" type="primary" @click="onDetail(row)"
            >详情</el-link
          >
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
    </div> -->
  
  </template>
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { getPhotoAlbumsList } from '@/api/album'
  
  const pagination = reactive({
    page: 1,
    page_size: 20,
    total: 0,

  })
  const tableData = ref([])
  
  const onSearch = async () => {
    const { data } = await getPhotoAlbumsList({
      page: pagination.page,
      page_size: pagination.page_size,
    })
    tableData.value = data?.items
    pagination.total = data?.total
  }
  
  const onSwitch = row => {
    console.log(row,"rowoowowo")
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
  .clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
  </style>
  