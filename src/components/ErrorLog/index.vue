<template>
  <div v-if="errorLogs.length > 0" class="errLog-container">
    <el-badge :is-dot="true" @click="dialogTableVisible = true">
      <el-button style="padding: 8px 10px" size="small" type="danger">
        <svg-icon name="bug" />
      </el-button>
    </el-badge>

    <el-dialog v-model="dialogTableVisible" width="80%" append-to-body>
      <template #header>
        <span style="padding-right: 10px">错误日志</span>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-delete"
          @click="clearAll"
        >
          Clear All
        </el-button>
      </template>
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template #default="{ row }">
            <div style="margin-bottom: 10px">
              <span class="message-title" style="padding-right: 16px">
                页面:
              </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>

            <div style="margin-bottom: 10px">
              <span class="message-title">事件源:</span>
              <el-tag type="primary">
                {{ row.info && row.info }}
              </el-tag>
            </div>

            <div style="margin-bottom: 10px">
              <span class="message-title">错误提示:</span>
              <el-tag type="danger">
                {{ row.err && row.err.message }}
              </el-tag>
            </div>

            <div v-if="row.err && row.err.config">
              <span class="message-title" style="padding-right: 16px">
                接口地址:
              </span>
              <el-tag type="info">
                {{ row.err && row.err.config && row.err.config.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template #default="{ row }">
            {{ row.err && row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useErrorlog } from '@/pinia/modules/errorLog'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'ErrorLog',
  setup() {
    const dialogTableVisible = ref(false)
    const errorStore = useErrorlog()
    const { logs: errorLogs } = storeToRefs(errorStore)
    const { clearErrorLog } = errorStore
    const clearAll = () => {
      dialogTableVisible.value = false
      clearErrorLog()
    }

    return {
      dialogTableVisible,
      errorLogs,
      clearAll,
    }
  },
})
</script>

<style scoped>
.errLog-container {
  margin-right: 10px;
}
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
