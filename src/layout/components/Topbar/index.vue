<template>
  <div class="header" :class="{ 'no-border': isHorizontalMenu }">
    <div class="navigation">
      <hamburger v-if="isShowHamburger" />
      <breadcrumbs v-if="isShowBreadcrumbs" />
    </div>
    <div class="action">
      <error-log />
      <userinfo />
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import Hamburger from './Hamburger.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import Userinfo from './Userinfo.vue'
import ErrorLog from '@/components/ErrorLog/index.vue'
import { useLayoutsettings } from '@/pinia/modules/layoutSettings'
import { storeToRefs } from 'pinia'
import { useApp } from '@/pinia/modules/app'

export default defineComponent({
  components: {
    Hamburger,
    Breadcrumbs,
    Userinfo,
    ErrorLog,
  },
  setup() {
    const defaultSettings = useLayoutsettings()

    const { device } = storeToRefs(useApp())

    const isHorizontalMenu = computed(
      () => defaultSettings.menus.mode === 'horizontal'
    )

    const isShowLogo = computed(
      () => isHorizontalMenu.value || device.value === 'mobile'
    )

    const isShowHamburger = computed(() => !isHorizontalMenu.value)

    const isShowBreadcrumbs = computed(
      () => defaultSettings.breadcrumbs.isShow && !isHorizontalMenu.value
    )

    return {
      device,
      isHorizontalMenu,
      isShowLogo,
      isShowHamburger,
      isShowBreadcrumbs,
    }
  },
})
</script>
<style lang="scss" scoped>
.header {
  height: 48px;
  border-bottom: 1px solid #e0e4ef;
  display: flex;
  justify-content: space-between;
  &.no-border {
    border: none;
  }
  .navigation {
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .action {
    display: flex;
    align-items: center;
  }
}
.mobile {
  padding-right: 0;
  :deep(.logo) {
    max-width: 24px;
    max-height: 24px;
  }
  :deep(.title) {
    display: none;
  }
}
.show-title {
  :deep(.title) {
    display: block;
    color: #333;
  }
}
</style>
