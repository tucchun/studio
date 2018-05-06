<template>
  <div class="newblogs">
    <home-title title='最新文章'/>
    <!-- <h2 class="hometitle">最新文章</h2> -->
    <ul>
      <li v-for='item in blogList' v-bind:key='item.id'>
        <Item v-on:clickSummary='clickSummary' v-bind='item'/>
      </li>
    </ul>
  </div>
</template>

<script>
// import 'lib/normalize.css/normalize.css'
// import '@/common/styles/common.css'
import Summary from './Summary.vue'
import HomeTitle from '@/components/hometitle'

export default {
  props: [
    'blogList'
  ],
  components: {
    HomeTitle,
    Item: Summary
  },
  methods: {
    clickSummary (blogId) {
      this.$emit('clickSummary', blogId)
    }
  }
}
</script>

<style scoped>

.newblogs {
  background: #fff;
  overflow: hidden;
  width: 100%;
}

.newblogs ul{
  padding: 10px;
  overflow: hidden;
}
</style>
