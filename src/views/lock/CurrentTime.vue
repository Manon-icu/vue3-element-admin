<template>
  <div class="current-time">
    <div class="time">{{ currentTime }}</div>
    <div class="date">
      {{ currentDate }}
      <span style="margin-left: 16px">{{ week }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { parseTime } from '@/utils'

export default defineComponent({
  setup() {
    const currentTime = ref(null)
    const getTime = () => {
      currentTime.value = parseTime(new Date(), '{h}:{i}:{s}')
      requestAnimationFrame(getTime)
    }

    onMounted(() => {
      requestAnimationFrame(getTime)
    })

    return {
      currentTime,
      currentDate: parseTime(new Date(), '{y}-{m}-{d}'),
      week: new Date().getDay(),
    }
  },
})
</script>
<style lang="scss" scoped>
.current-time {
  color: #fff;
  text-align: center;
  :deep {
    .time {
      font-family: Arial;
      font-size: 48px;
      font-weight: 700;
    }
    .date {
      font-size: 20px;
      margin-top: 16px;
    }
  }
}
</style>
