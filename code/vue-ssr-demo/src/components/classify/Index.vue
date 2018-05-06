<template>
  <div class="classify-wrapper">
    <home-title title='文章分类'/>
    <ul class='classify-list'>
      <li class="classify-item">
        <a>菜单一</a>
         <ul class='classify-list'>
           <li class="classify-item">
             <a>菜单二</a>
           </li>
         </ul>
      </li>
    </ul>
  </div>

</template>

<script>
// import 'lib/normalize.css/normalize.css'
// import '@/common/styles/common.css'
import HomeTitle from '@/components/hometitle'
export default {
  components: {
    HomeTitle
  }
}
</script>

<style scoped>
  .classify-wrapper{
    border-radius: 5px;
    overflow: hidden;
  }
  ul,li{
    padding: 0;
    margin: 0;
  }
  .classify-item{
    padding: 10px 20px;
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    list-style-type: square;
    /* border-bottom: 1px solid rgba(0,0,0,.125) */
  }
  .badge{
    display: inline-block;
    padding: 3px 7px;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 7px;;
    background-color: #000;
    color: #fff;
  }
</style>
