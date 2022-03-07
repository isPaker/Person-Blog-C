<template>
  <div class="comment-container" ref="commentContainer">
      <FormMessage 
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      :isShow="isShow"
      @submit="handleSubmit"
      v-if="data" />
  </div>
</template>

<script>
import FormMessage from "@/components/FormMessage";
import {getComments, postComment} from "@/api/blog.js";
export default {
    components: {
        FormMessage,
    },
    data(){
        return {
            data: null,
            page: 1,
            limit: 10,
            isLoading: false,
            isShow: false,
        }
    },
    async created(){
        this.data = await getComments(this.page, this.limit, this.$route.params.id);
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    destroyed(){
        this.$bus.$off("mainScroll", this.handleScroll);
    },
    computed: {
        hasMore(){
            return this.data.rows.length < this.data.total;
        }
    },
    methods: {
        async handleSubmit(formData, callback){
            const resp = await postComment({
                blogId: this.$route.params.id,
                ...formData,
            });
            this.data.rows.unshift(resp);
            this.data.total ++;
            callback("评论成功")
        },
        handleScroll(dom){
            if(this.isLoading || !dom){
                return;
            }
            const range = 50;
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight)
            if(dec < range){
                this.fetchMore();
            }
        },
        async fetchMore(){
            if(!this.hasMore){
                this.isShow = true;
                return;
            }
            this.isLoading = true;
            this.page ++;
            const resp = await getComments(this.page, this.limit, this.$route.params.id);
            this.data.total = resp.total;
            this.data.rows = this.data.rows.concat(resp.rows);
            this.isLoading = false;
            // console.log(this.data.rows)
        }
    },
}
</script>

<style lang="less" scoped>
.comment-container {
    margin: 3em 0;
}
</style>