<template>
  <header class="header">
    <page-nav />
  </header>
</template>

<script>
// import 'lib/normalize.css/normalize.css'
// import '@/common/styles/common.css'
import PageNav from '@/components/nav/Index'
export default {
  components: {
    PageNav
  }
}
</script>

<style scoped>
 .header{
   width: 100%;
 }
</style>
