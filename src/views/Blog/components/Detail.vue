<template>
  <div class="detail-container">
    <h2>{{list.title}}</h2>
    <div class="aside">
      <span>时间：{{list.createDate}}</span>
      <span>浏览量：{{list.scanNumber}}</span>
      <a href="#comment-list">评论：{{list.commentNumber}}</a>
      <a href="">{{ list.category.name }}</a>
    </div>
    <div v-html="list.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.detail-container{
  h2{
    margin: 0;
    margin-bottom: 10px;
    font-size: 1.2em;
  }
  .aside{
    color: @gray;
    font-size: 0.8em;
    span, a {
      margin-right: 15px;
    }
  }
}
.markdown-body{
  margin: 2em 0;
}
</style>