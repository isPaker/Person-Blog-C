<template>
  <div class="message-container" v-loading="isLoading" ref="container">
    <FormMessage title="留言板" :subTitle="`(${data.total})`" :list="data.rows" :isListLoading="isListLoading" :isShow="isShow" v-if="data"
    @submit="handleSubmit" />
  </div>
</template>

<script>
import FormMessage from "@/components/FormMessage";
import { getMessage, postMessage } from "@/api/message.js";
export default {
  data(){
    return {
      data: null,
      isLoading: true,
      isListLoading: false,
      isShow: false,
      page: 1,
      limit: 10,
    }
  },
  components: {
    FormMessage,
  },
  computed: {
    hasMore(){
        return this.data.rows.length < this.data.total;
    }
  },
  async created(){
    this.data = await getMessage({
      page: this.page,
      limit: this.limit,
    });
    this.isLoading = false;
  },
  mounted(){
    this.$refs.container.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("scrollToTop", this.handleScrollToTop);
  },
  beforeDestroy(){
    this.$bus.$emit("mainScroll");
    this.$refs.container.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("scrollToTop", this.handleScrollToTop);
  },
  methods: {
    handleScroll(){
      this.$bus.$emit("mainScroll", this.$refs.container);
      const dom = this.$refs.container;
      if(this.isListLoading || !dom){
        return;
      }
      const range = 50;
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight)
      if(dec < range){
          this.fetchMore();
      }
    },
    handleScrollToTop(scrolltop){
      this.$refs.container.scrollTop = scrolltop;
    },
    async handleSubmit(formData, callback){
      const resp = await postMessage({
        ...formData
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("感谢您的留言~")
    },
    async fetchMore(){
      if(!this.hasMore){
          this.isShow = true;
          return;
      }
      this.isListLoading = true;
      this.page ++;
      const resp = await getMessage(this.page, this.limit);
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isListLoading = false;
    },
  }
}
</script>

<style lang="less" scoped>
.message-container{
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.form-message-container{
  width: 70%;
  height: 100%;
  padding: 20px 0;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>