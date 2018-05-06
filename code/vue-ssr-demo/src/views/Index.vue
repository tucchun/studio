<template>
  <div class="container">
    <blog-header class='header'/>
    <div class='main'>
      <div class="article">
        <blog-article v-on:clickSummary='clickSummary' v-bind:blogList='blogList'/>
      </div>
      <div class="classify">
        <blog-classify />
      </div>
    </div>
    <blog-footer />
  </div>
</template>
<script>
import Header from '@/components/header'
import Article from '@/components/list'
import Footer from '@/components/footer'
import Classify from '@/components/classify'
export default {
  asyncData ({ store, route }) {
    //  触发action后， 会返回Promise
    let blogType = route && route.params ? route.params.blogType : ''
    return store.dispatch('fetchBlogList', blogType)
  },
  computed: {
    blogList () {
      return this.$store.state.blogList
    }
  },
  methods: {
    clickSummary (blogId) {
      this.$router.push(`info/${blogId}`)
    }
  },
  components: {
    BlogHeader: Header,
    BlogArticle: Article,
    BlogFooter: Footer,
    BlogClassify: Classify
  }
}
</script>
<style scoped>
  .container{
    padding-top: 55px;
  }
  .header{
    position: fixed;
    top: 0;
    z-index: 9999;
  }
  .main{
    background-color: rgba(241, 239, 239, 0.973);
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
  .article{
    border-radius: 5px;
    overflow: hidden;
    width: 68%;
  }
  .classify{
    width: 30%;
  }
</style>
