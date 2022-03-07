<template>
  <div class="blog-category-container" v-loading="isloading">
    <h2>文章</h2>
    <NavList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import NavList from "./NavList.vue";
import {getBlogType} from "@/api/blog.js";
export default {
  components: {
    NavList,
  },
  data(){
    return {
      data: [],
      isloading: true,
    }
  },
  async created(){
    this.data = await getBlogType();
    this.isloading = false;
  },
  computed: {
    categoryId(){
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list(){
      const total = this.data.reduce(function(a, b){
        return a + b.articleCount;
      }, 0);
      const result = [
        {id: -1, name: "全部", articleCount: total},
        ...this.data,
      ];
      return result.map((it) => ({
        ...it,
        isSelected: it.id === this.categoryId,
      }));
    }
  },
  methods: {
    handleSelect(item){
      const query = {
                page: 1,
                limit: this.limit,
            }
      if(item.id === -1){
        this.$router.push({
          name: "Blog",
          query
        })
      }else{
        this.$router.push({
          name: "BlogCategory",
          query,
          params: {
            categoryId: item.id,
          }
        })
      }
    }
  },
}
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 250px;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  h2{
    font-size: 1.5em;
    margin: 15px 0;
  }
}
@media screen and (min-width: 500px){
  .blog-category-container{
    display: block;
  }
}
@media screen and (max-width: 500px){
  .blog-category-container{
    display: none;
  }
}
</style>