<template>
  <h2 class="hometitle">{{title}}</h2>
</template>

<script>
// import 'lib/normalize.css/normalize.css'
// import '@/common/styles/common.css'
export default {
  props: ['title']
}
</script>

<style>
.hometitle{
  padding: 0 10px;
  line-height: 40px;
  height: 40px;
  font-size: 18px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  border-left: 5px solid #333;
  color: #333;
  margin: 0;
}
</style>
