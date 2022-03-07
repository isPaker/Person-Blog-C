<template>
  <Layout>
    <div class="main-container" v-loading="isloading" ref="mainContainer">
      <Detail :list="data" v-if="data"/>
      <Comment v-if="!isloading"/>
    </div>
    <template #rightCon>
      <div class="nav-container" v-loading="isloading">
        <DetailNav :toc="data.toc" v-if="data"/>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout/Layout.vue";
import Detail from "./components/Detail.vue";
import DetailNav from "./components/DetailNav.vue";
import {getBlog} from "@/api/blog.js";
import Comment from "./components/Comment.vue";
import {setTitle} from "@/utils";

export default {
  components: {
    Layout,
    Detail,
    DetailNav,
    Comment,
  },
  data(){
    return {
      data: null,
      isloading: true,
    }
  },
  async created(){
    this.data = await getBlog(this.$route.params.id);
    this.isloading = false;
    setTitle.setRouterTitle(this.data.title)
  },
  mounted(){
    this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("scrollToTop", this.handleScrollToTop);
  },
  beforeDestroy(){
    this.$bus.$emit("mainScroll");
    this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("scrollToTop", this.handleScrollToTop)
  },
  methods: {
    handleScroll(){
      this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    },
    handleScrollToTop(scrolltop){
      this.$refs.mainContainer.scrollTop = scrolltop;
    }
  },
  updated(){
    const hash = location.hash;
    location.hash = "";
    setTimeout(()=>{
      location.hash = hash;
    }, 50)
  }
}
</script>

<style lang="less" scoped>
.main-container{
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  position: relative;
}
.nav-container {
  width: 15em;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
}
</style>