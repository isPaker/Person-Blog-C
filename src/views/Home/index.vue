<template>
  <div class="home-container" ref="container" @wheel="handleWheel" v-loading="loading">
    <ul class="carousel-container" :style="{marginTop}" @transitionend="handleTransitionEnd">
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div class="arrowUp"
     @click="switchTo(index - 1)" v-show="index >= 1">
      <Icon type="arrowUp" />
    </div>
    <div class="arrowDown" @click="switchTo(index + 1)" v-show="index < data.length - 1">
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
       v-for="(item, i) in data" :key="item.id"
       :class="{active: index===i}"
       @click="switchTo(i)"></li>
    </ul>
  </div>
</template>

<script>
import {getBanner} from "@/api/banner.js";
import CarouselItem from "./Carouselitem";
import Icon from "@/components/Icon/Icon.vue";
import {mapState} from "vuex";

export default {
  components: {
    CarouselItem,
    Icon
  },
  data(){
    return {
      // banners: [],
      index: 0, //初始为第一页
      containerHeight: 0,
      switching: false,
      // isLoading: true,
    }
  },
  created(){
    // this.banners = await getBanner();
    // this.isLoading = false;
    this.$store.dispatch("banner/fetchBanner")
  },
  computed: {
    marginTop(){
      return - this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: {
    switchTo(i){
      this.index = i;
    },
    handleWheel(e){
      if(this.switching){
        return;
      }
      if(e.deltaY > 0 && this.index < this.data.length - 1){
        this.switching = true;
        this.index ++;
      }else if(e.deltaY < 0 && this.index > 0){
        this.switching = true;
        this.index --;
      }
    },
    handleTransitionEnd(){
      this.switching = false;
    },
    handleResize(){
      this.containerHeight = this.$refs.container.clientHeight;
    }
  },
  mounted(){
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed(){
    window.removeEventListener("resize", this.handleResize);
  },
}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  // 测试代码
  // width: 60%;
  // height: 40%;
  // border: 2px solid #f00;
  // margin: 100px auto;
  position: relative;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 0.3s;
    li {
    width: 100%;
    height: 100%;
  }
  }
  .arrowUp, .arrowDown {
    .self-center();
    font-size: 30px;
    color: @gray;
    transform: translateX(-50%);
    cursor: pointer;
  }
  .arrowUp {
    top: 25px;
    animation: jump-up 2s infinite;
  }
  .arrowDown{
    top: auto;
    bottom: 25px;
    animation: jump-down 2s infinite;
  }
  @jump: 5px;
  @keyframes jump-up {
    0%{
      transform: translate(-50%, -@jump);
    }
    50%{
      transform: translate(-50%, @jump);
    }
    100%{
      transform: translate(-50%, -@jump);
    }
  }
  @keyframes jump-down {
    0%{
      transform: translate(-50%, @jump);
    }
    50%{
      transform: translate(-50%, -@jump);
    }
    100%{
      transform: translate(-50%, @jump);
    }
  }
  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 25px;
    li {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: @dark;
      border: 1px solid #fff;
      margin-bottom: 10px;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }
  
}
</style>