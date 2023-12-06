<template>
  <el-dropdown trigger="hover">
    <div class="userinfo">
      <i class="el-icon-user" />
      admin
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">Log out</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useApp } from '@/pinia/modules/app'
import { Logout } from '@/api/common'

const router = useRouter()

// 退出
const logout = async () => {
  await Logout()
  // 清除token
  useApp().clearToken()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.userinfo {
  padding: 0 16px;
  line-height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #f5f5f5;
  }
  .el-icon-user {
    font-size: 20px;
    margin-right: 8px;
  }
  .avatar {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
