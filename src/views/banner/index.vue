<template>banner</template>
<script setup>
import { onMounted } from 'vue'
import { getBannerList } from '@/api/banner'

onMounted(async () => {
  const res = await getBannerList()
  console.log(res)
})
</script>
