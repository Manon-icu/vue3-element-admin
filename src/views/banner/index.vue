<template>
  <el-form>
    <el-form-item label="ID">
      <el-input v-model="id"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSearch">搜索</el-button>
      <el-button type="primary" @click="onSearch">添加</el-button>
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
        <el-switch
          v-model="row.status"
          @change="onSwitchStatus(row)"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="operation" label="编辑">
      <template #default="{ row }">
        <el-button type="primary" @click="onEdit(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Edit ref="editRef" />
</template>
<script setup>
import { ref } from 'vue'
import { getBannerList, enableBanner, disableBanner } from '@/api/banner'
import Edit from './edit.vue'

const editRef = ref(null)
const id = ref()
const tableData = ref([
  // 模拟数据
  {
    id: 1,
    url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    link: 'https://www.baidu.com',
    created_at: '2021-08-01 12:00:00',
    updated_at: '2021-08-01 12:00:00',
    module_type: 1,
    module_type_desc: '首页',
    status: 1,
  },
  {
    id: 2,
    url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    link: 'https://www.baidu.com',
    created_at: '2021-08-01 12:00:00',
    updated_at: '2021-08-01 12:00:00',
    module_type: 1,
    module_type_desc: '首页',
    status: 1,
  },
  {
    id: 3,
    url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    link: 'https://www.baidu.com',
    created_at: '2021-08-01 12:00:00',
    updated_at: '2021-08-01 12:00:00',
    module_type: 1,
    module_type_desc: '首页',
    status: 1,
  },
  {
    id: 4,
    url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    link: 'https://www.baidu.com',
    created_at: '2021-08-01 12:00:00',
    updated_at: '2021-08-01 12:00:00',
    module_type: 1,
    module_type_desc: '首页',
    status: 1,
  },
  {
    id: 5,
    url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    link: 'https://www.baidu.com',
    created_at: '2021-08-01 12:00:00',
    updated_at: '2021-08-01 12:00:00',
    module_type: 1,
    module_type_desc: '首页',
    status: 1,
  },
])

const onSearch = async () => {
  const { data } = await getBannerList({ id: id.value, page: 1, page_size: 20 })
  tableData.value = data?.items
}

const onSwitchStatus = row => {
  if (row.status) {
    disableBanner(row.id)
  } else {
    enableBanner(row.id)
  }
}

const onEdit = row => {
  console.log('🚀 ~ file: index.vue:58 ~ onEdit ~ row:', row)
  editRef.value.show(row)
}
</script>
