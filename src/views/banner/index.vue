<template>banner</template>
<script setup>
import { onMounted } from 'vue'
import { getBannerList, getBanner, enableBanner } from '@/api/banner'

onMounted(async () => {
  // const res = await getBannerList({ page: 1, page_size: 20, id: 6 })
  // const res = await enableBanner(6)
  await enableBanner(6)
  console.log(res)
})
</script>
