<template>
  <el-dropdown-item @click="dialogVisible = true">Lock Screen</el-dropdown-item>
  <el-dialog
    title="Lock Screen"
    v-model="dialogVisible"
    width="640px"
    custom-class="lock-modal"
    append-to-body
  >
    <Avatar />
    <el-form
      :model="lockModel"
      :rules="lockRules"
      ref="lockForm"
      label-width="90px"
    >
      <el-form-item label="Please input screen password" prop="password">
        <el-input
          type="password"
          v-model.trim="lockModel.password"
          autocomplete="off"
          @keyup.enter="submitForm"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-btn" type="primary" @click="submitForm">
          Lock Screen
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue'
import Avatar from '@/components/Avatar/index.vue'
import { useRouter } from 'vue-router'
import { useApp } from '@/pinia/modules/app'

export default defineComponent({
  components: {
    Avatar,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const dialogVisible = ref(false)
    const lockForm = ref(null)
    const lockModel = reactive({
      password: '',
    })
    const lockRules = reactive({
      password: [{ required: true, message: 'Please input screen password' }],
    })
    const submitForm = () => {
      lockForm.value.validate(valid => {
        if (!valid) {
          return false
        }

        // 对密码加密并跟token保存在一起
        useApp().setScreenCode(lockModel.password)

        // 跳转到锁屏页面
        router.push('/lock?redirect=' + router.currentRoute.value.fullPath)
      })
    }

    return {
      dialogVisible,
      lockForm,
      lockModel,
      lockRules,
      submitForm,
    }
  },
})
</script>

<style lang="scss">
.lock-modal[aria-modal] {
  max-width: 90%;
}
</style>
