<template>
  <div class="blog-list-container" ref="container" v-loading="isloading">
      <ul>
          <li v-for="item in data.rows" :key="item.id">
              <div class="img-container" v-if="item.thumb">
                  <RouterLink :to="{
                      name: 'BlogDetail',
                      params: {
                          id: item.id
                      }
                      }">
                      <img v-lazy="item.thumb" alt="image">
                  </RouterLink>
              </div>
              <div class="main-container">
                  <RouterLink :to="{
                      name: 'BlogDetail',
                      params: {
                          id: item.id
                      }
                  }">
                      <h2>{{item.title}}</h2>
                  </RouterLink>
                  <div class="aside">
                      <span>日期: {{item.createDate}}</span>
                      <span>浏览: {{item.scanNumber}}</span>
                      <span>评论: {{item.commentNumber}}</span>
                      <RouterLink :to="{
                          name: 'BlogCategory',
                          params: {
                              categoryId: item.category.id,
                          }
                      }">{{item.category.name}}</RouterLink>
                  </div>
                  <div class="desc">
                      {{item.description}}
                  </div>
              </div>
          </li>
      </ul>
      <Empty v-if="data.rows.length === 0 && !isloading" />
      <TurnPage v-if="data.total" :current="routeInfo.page" :total="data.total" :limit="routeInfo.limit" @pageChange="handlePageChange" />
  </div>
</template>

<script>
import Empty from "@/components/Empty/Empty.vue";
import TurnPage from "@/components/TurnPage/TurnPage.vue";
// 得到博客列表数据
import {getBlogData} from "@/api/blog.js";

export default {
    components: {
        TurnPage,
        Empty,
    },
    data(){
        return {
            data: {
                total: 0,
                rows: [],
            },
            isloading: true,
        }
    },
    async created(){
        this.data = await getBlogData(this.routeInfo.page, this.routeInfo.limit, this.routeInfo.categoryId);
        this.isloading = false;
    },
    mounted(){
        this.$bus.$on("scrollToTop", this.handleScrollToTop);
        this.$refs.container.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy(){
        this.$bus.$emit("mainScroll");
        this.$bus.$off("scrollToTop", this.handleScrollToTop);
        this.$refs.container.removeEventListener("scroll", this.handleScroll);
    },
    computed: {
        routeInfo(){
            const categoryId = +this.$route.params.categoryId || -1;
            const page = +this.$route.query.page || 1;
            const limit = +this.$route.query.limit || 10;
            return {
                categoryId,
                page,
                limit,
            }
        }
    },
    methods: {
        handlePageChange(newPage){
            const query = {
                page: newPage,
                limit: this.routeInfo.limit,
            }
            if(this.routeInfo.categoryId == -1){
                //没有分类
                this.$router.push({
                    name: "Blog",
                    query,
                });
            }else{
                //有分类
                this.$router.push({
                    name: "BlogCategory",
                    params: {
                        categoryId: this.routeInfo.categoryId,
                    },
                    query,
                });
            }
        },
        handleScrollToTop(scrolltop){
            this.$refs.container.scrollTop = scrolltop;
        },
        handleScroll(){
            this.$bus.$emit("mainScroll", this.$refs.container);
        },
    },
    watch: {
        async $route(){
            this.isloading = true;
            this.$refs.container.scrollTop = 0;
            //重新请求数据
            this.data = await getBlogData(this.routeInfo.page, this.routeInfo.limit, this.routeInfo.categoryId);
            this.isloading = false;
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blog-list-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    scroll-behavior: smooth;
    position: relative;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li{
            display: flex;
            padding: 15px 0;
            border-bottom: 1px solid @gray;
        }
    }
}
.img-container {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
        display: block;
        max-width: 200px;
    }
}
.main-container {
    flex: 1 1 auto;
    h2{
        margin: 0;
    }
    .aside{
        font-size: 0.8em;
        color: @gray;
        span{
            margin-right: 15px;
        }
    }
    .desc{
        margin: 15px 0;
        font-size: 14px;
    }
}
</style>