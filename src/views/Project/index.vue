<template>
  <ul class="project-container" v-loading="loading" ref="container">
    <li v-for="item in data" :key="item.id">
      <div class="project-img" v-if="item.thumb">
        <a :href="item.url?item.url:`javascript:;`" :target="item.url?'_blank':'_self'">
          <img v-lazy="item.thumb" alt="image">
        </a>
      </div>
      <div class="project-content">
        <h2 class="title">
          <a 
          :href="item.url?item.url:`javascript:;`" 
          :target="item.url?'_blank':'_self'">
            {{item.name}}
          </a>
          <a 
          :href="item.github?item.github:`javascript:;`" 
          :target="item.github?'_blank':'_self'" 
          :class="item.github?'github':'passive'">github</a>
        </h2>
        <div class="desc" v-for="(it, i) in item.description" :key="i">
          {{it}}
        </div>
      </div>
    </li>
    <Empty v-if="data.length === 0 && !loading " />
  </ul>
</template>

<script>
import Empty from "@/components/Empty/Empty.vue";
import {mapState} from "vuex";
export default {
  components: {
    Empty,
  },
  created(){
    this.$store.dispatch("project/fetchProject");
  },
  mounted(){
    this.$refs.container.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("scrollToTop", this.handleScrollToTop);
  },
  beforeDestroy(){
    this.$bus.$emit("mainScroll");
    this.$bus.$off("scrollToTop", this.handleScrollToTop);
    this.$refs.container.removeEventListener("scroll", this.handleScroll);
  },
  computed: mapState("project", ["loading", "data"]),
  methods: {
    handleScroll(){
      this.$bus.$emit("mainScroll", this.$refs.container);
    },
    handleScrollToTop(scrolltop){
      this.$refs.container.scrollTop = scrolltop;
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
h2{
  margin: 0;
}
.project-container{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  li{
    display: flex;
    border-bottom: 1px solid @gray;
    padding: 15px 0;
  }
  .project-img{
    flex: 0 0 auto;
    margin-right: 15px;
    img{
      display: block;
      max-width: 200px;
    }
  }
  .project-content{
    flex: 1 1 auto;
    .title{
      font-size: 1.7em;
    }
    .desc{
      margin: 0;
      margin-bottom: 15px;
    }
    .github{
      font-size: 0.6em;
      font-weight: 400;
      color: @primary;
      margin-left: 20px;
    }
  }
}
.passive{
  font-size: 0.6em;
  font-weight: 400;
  margin-left: 20px;
  color: @gray;
  cursor: not-allowed;
}
</style>