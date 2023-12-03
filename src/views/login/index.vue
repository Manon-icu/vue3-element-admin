<template>
  <div class="login">
    <el-form class="form" :model="model" :rules="rules" ref="loginForm">
      <h1 class="title">Login</h1>
      <el-form-item prop="userName">
        <el-input
          class="text"
          v-model="model.account"
          prefix-icon="User"
          clearable
          placeholder="Username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="text"
          v-model="model.pass_word"
          prefix-icon="Lock"
          show-password
          clearable
          placeholder="Password"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="btn"
          size="large"
          @click="submit"
        >
          {{ btnText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  computed,
} from 'vue'
import { Login } from '@/api/common'
import { useRouter, useRoute } from 'vue-router'
import { useApp } from '@/pinia/modules/app'

export default defineComponent({
  name: 'login',
  setup() {
    const { proxy: ctx } = getCurrentInstance() // 可以把ctx当成vue2中的this
    const router = useRouter()
    const route = useRoute()
    const getRules = () => ({
      account: [
        {
          required: true,
          message: 'Please input username',
          trigger: 'blur',
        },
      ],
      pass_word: [
        {
          required: true,
          message: 'Please input password',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 12,
          message: '6 to 12 characters in length',
          trigger: 'blur',
        },
      ],
    })
    const state = reactive({
      model: {
        account: 'admin',
        pass_word: 'ami@888888',
      },
      rules: getRules(),
      loading: false,
      btnText: computed(() => (state.loading ? 'Login...' : 'Login')),
      loginForm: ref(null),
      submit: () => {
        if (state.loading) {
          return
        }
        state.loginForm.validate(async valid => {
          if (valid) {
            state.loading = true
            const { code, data, message } = await Login(state.model)
            if (code === 0) {
              ctx.$message.success({
                message: 'Success',
                duration: 1000,
              })

              const targetPath = decodeURIComponent(route.query.redirect)
              if (targetPath.startsWith('http')) {
                // 如果是一个url地址
                window.location.href = targetPath
              } else if (targetPath.startsWith('/')) {
                // 如果是内部路由地址
                router.push(targetPath)
              } else {
                router.push('/')
              }
              useApp().initToken(data)
            } else {
              ctx.$message.error(message)
            }
            state.loading = false
          }
        })
      },
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
.login {
  transition: transform 1s;
  transform: scale(1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2d3a4b;
  .form {
    width: 520px;
    max-width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    margin: 160px auto 0;
    :deep {
      .el-input__wrapper {
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        background: rgba(0, 0, 0, 0.1);
      }
      .el-input-group--append > .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .el-input-group--prepend > .el-input__wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .title {
      color: #fff;
      text-align: center;
      font-size: 24px;
      margin: 0 0 24px;
    }
    .text {
      font-size: 16px;
      :deep(.el-input__inner) {
        color: #fff;
        height: 48px;
        line-height: 48px;
        &::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }
    .btn {
      width: 100%;
    }
  }
}
.change-lang {
  position: fixed;
  right: 20px;
  top: 20px;
  :deep {
    .change-lang {
      height: 24px;
      &:hover {
        background: none;
      }
      .icon {
        color: #fff;
      }
    }
  }
}
</style>
