<template>
    <div class="view-btn"> <el-button type="primary" @click="onAdd">添加</el-button></div>
    <div class="view-content"> 
      <div class="view-filter"> 
        <el-card class="box-card">
         <el-form style="display: flex;">
      <el-form-item class="search-item" lable="标题:">
        <el-input
            placeholder="请输入标题"
            v-model="parameter.title"
          >
          </el-input>
      </el-form-item>
      <el-form-item class="search-item" lable="状态:">
        <el-select v-model="parameter.status" @change="handleStatusChange">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="有效" value="1"></el-option>
                <el-option label="无效" value="2"></el-option>
              </el-select>
     
        </el-form-item>
        <el-form-item class="search-item">
              <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
        <el-form-item class="search-item">
              <el-button  @click="onReset">重置</el-button>
        </el-form-item>
    </el-form>
        </el-card>
    </div>
    </div>
    <el-table  v-loading="loading" bordered :data="tableData">
      <el-table-column width="50" prop="id" label="ID"></el-table-column>
      <el-table-column prop="title"   label="标题"></el-table-column>
      <el-table-column prop="occurrence_time"   label="发生时间"></el-table-column>
      <el-table-column prop="created_at"   label="创建时间"></el-table-column>
      <el-table-column prop="updated_at"   label="更新时间"></el-table-column>
      <el-table-column width="80"  prop="status_desc" label="状态"> </el-table-column>
      <el-table-column prop="operation"   label="操作">
        <template #default="{ row }">
              <el-switch
              style="margin-right: 10px"
              v-model="row.status"
              :active-value="1"
              :inactive-value="2"
              @change="onSwitchStatus(row.id)"
        ></el-switch>
          <el-link type="primary" @click="onEdit(row)"
            >编辑</el-link
          >
          <el-link style="margin-left: 10px;" type="primary" @click="onDetail(row)"
            >详情</el-link
          >
          <el-link style="margin-left: 10px;" type="primary" @click="onGoFileList(row)"
            >文件列表</el-link
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
    </div>
  
  <Add ref="addRef"  :cb="onSearch" />
  <Detail ref="detailRef"   />
  </template>
  <script setup>
  import { ref, reactive, onMounted ,toRefs} from 'vue'
  import { getPhotoAlbumsList,reverseStatusPhoto } from '@/api/album'
import { useRouter } from 'vue-router'
import Add from './add.vue'
import Detail from './detail.vue'

const router = useRouter()
const addRef = ref(null)
const detailRef = ref(null)
  const pagination = reactive({
    page: 1,
    page_size: 20,
    total: 0,
  })
  const parameter = reactive({
    status: '1',
    title: '',
  })

let loading = ref(false)
  const tableData = ref([])
  const onSearch = async () => {
    loading = true
    const { data } = await getPhotoAlbumsList({
      page: pagination.page,
      page_size: pagination.page_size,
      status:parameter.status,
      title:parameter.title
    })
    tableData.value = data?.items
    pagination.total = data?.total
    loading = false
  }
  const onReset = async () => {
    pagination.page = 1
    parameter.status = '-1'
    parameter.title = ''
    await onSearch()
  }
  const onSwitchStatus = async id => {
  await reverseStatusPhoto({ id })
  await onSearch()

}
  
const onAdd = () => {
  addRef.value.show({id:-1})
}
const onGoFileList = (row) => {
  console.log(row.id,'asd')
  router.push({
        name: 'file',
        params: {
          id: row.id
        }
    })
  
}


const onEdit = row => {
  addRef.value.show(row)
}

const onDetail = row => {
  detailRef.value.show(row)
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

  const handleStatusChange = async val => {
    console.log(val,"valval")
    parameter.status = val
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
.view-filter {
  margin-bottom: 16px;
}
.el-form-item {
  margin-bottom: 0;
}
.view-btn{
  margin-bottom: 10px;
  display: flex;
    justify-content: flex-end;
}
.search-item{
  margin-left: 10px;
}
  </style>
  