<template>
<!-- 1.样式
     2.模板和数据
     3.事件
 -->
    <div class="turnPage-container" v-if="pageNumber > 1">
        <a :class="{disabled: current === 1}" @click="handleClick(1)">|&lt;&lt;</a>
        <a :class="{disabled: current === 1}" @click="handleClick(current - 1)">&lt;&lt;</a>
        <a v-for="(n, i) in numbers" :key="i" :class="{active: current === n}" @click="handleClick(n)">
            {{n}}
        </a>
        <a :class="{disabled: current === pageNumber}" @click="handleClick(current + 1)">&gt;&gt;</a>
        <a :class="{disabled: current === pageNumber}" @click="handleClick(pageNumber)">&gt;&gt;|</a>
    </div>
</template>

<style lang="less" scoped>
// ~@/表示src目录
@import "~@/styles/var.less";
.turnPage-container {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    a {
        color: @primary;
        margin: 0 10px;
        cursor: pointer;
        &.disabled {
            color: @lightWords;
            cursor: not-allowed;
        }
        &.active {
            color: @words;
            cursor: text;
        }
    }
}
</style>

<script>
// @/表示src目录
export default {
    props: {
        current: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
        limit: {
            type: Number,
            default: 10
        },
        visibleNumber: {
            type: Number,
            default: 10
        }
    },
    computed: {
        // 总页数
        pageNumber(){
            return Math.ceil(this.total / this.limit)
        },
        // 显示最小页数
        minPageNumber(){
            let min = this.current - Math.floor(this.visibleNumber / 2);
            if(min < 1){
                min = 1;
            }
            return min
        },
        // 显示最大页数
        maxPageNumber(){
            let max = this.minPageNumber + this.visibleNumber - 1;
            if(max > this.pageNumber){
                max = this.pageNumber
            }
            return max
        },
        // 显示的页数数量
        numbers(){
            let nums = [];
            for(let i=this.minPageNumber; i<=this.maxPageNumber; i++){
                nums.push(i);
            }
            return nums;
        }
    },
    methods: {
        handleClick(newPage){
            if(newPage < 1){
                newPage = 1
            }
            if(newPage > this.pageNumber){
                newPage = this.pageNumber
            }
            if(newPage === this.current){
                return;
            }
            this.$emit("pageChange", newPage)
        }
    }
}
</script>