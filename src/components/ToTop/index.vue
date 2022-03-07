<template>
  <div v-show="show" class="to-top-container" @click="handleClick">
      Top
  </div>
</template>

<script>
export default {
    data(){
        return {
            show: false,
        }
    },
    created(){
        this.$bus.$on("mainScroll", this.handleScroll)
    },
    destroyed(){
        this.$bus.$off("mainScroll", this.handleScroll)
    },
    methods: {
        handleScroll(dom){
            if(!dom){
                this.show = false;
                return;
            }
            this.show = dom.scrollTop > 100;
        },
        handleClick(){
            this.$bus.$emit("scrollToTop", 0);
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.to-top-container {
    width: 50px;
    height: 50px;
    position: fixed;
    right: 50px;
    bottom: 50px;
    border-radius: 50%;
    background: @primary;
    color: #fff;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
}
</style>