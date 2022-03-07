<template>
  <ul class="nav-list-container">
    <li v-for="(item , i) in list" :key="i">
        <span :class="{active: item.isSelected}" @click="handleClick(item)">{{item.name}}</span>
        <span class="article-number" :class="{active: item.isSelected}" @click="handleClick(item)" v-if="item.articleCount">{{item.articleCount}}篇</span>
        <NavList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
    name: "NavList",
    props: {
        // {name: "aa", isSelected: true, children: [{name: "bb", isSelected: false}]}
        list: {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        handleClick(item){
            if(!item.isSelected){
                this.$emit("select", item)
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.nav-list-container {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 1em;
    li{
        line-height: 30px;
        margin-left: 1rem;
        cursor: pointer;
        .article-number{
            color: @gray;
            font-size: 0.6em;
            margin-left: 15px;
        }
        .active {
            color: @warn;
            font-weight: bold;
        }
    }
}
</style>