<template>
  <div class="detail-nav-container">
    <h2>目录</h2>
    <NavList :list="tocWithSelect" @select="dealClick" />
  </div>
</template>

<script>
import NavList from "./NavList.vue";
import { debounce } from "@/utils";
export default {
  props: {
    toc: {
      type: Array,
    }
  },
  data(){
    return {
      activeAnchor: "",
    }
  },
  components: {
    NavList,
  },
  computed: {
    // 得到带有isSelect属性的toc数组
    tocWithSelect(){
      const getTOC = (toc = [])=>{
        return toc.map((t)=>({
          ...t,
          isSelected: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    // 得到TOC对应的元素数组
    doms(){
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    }
  },
  created(){
    this.setSelectDebounce = debounce(this.setSelect, 50)
    this.$bus.$on("mainScroll", this.setSelectDebounce)
  },
  destroyed(){
    this.$bus.$off("mainScroll", this.setSelectDebounce)
  },
  methods: {
    dealClick(item){
      location.hash = item.anchor
    },
    setSelect(){
      this.activeAnchor = "";
      const range = 100;
      for(const dom of this.doms){
        if(!dom){
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if(top >= 0 && top <= range){
          this.activeAnchor = dom.id;
          return;
        }else if(top > range){
          return;
        }else {
          this.activeAnchor = dom.id;
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail-nav-container {
  h2{
    margin: 0;
    font-size: 1.2em;
  }
}
</style>