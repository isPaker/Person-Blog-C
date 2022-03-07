<template>
  <div class="menu-container">
      <RouterLink v-for="item in items" :key="item.href" :to="{name: item.name}" active-class="selected" :exact="item.exact" exact-active-class="">
          <div class="icon">
              <Icon :type="item.type" />
          </div>
          <span class="media-title">{{item.title}}</span>
      </RouterLink>
  </div>
</template>

<script>
import Icon from "@/components/Icon/Icon.vue";
export default {
    components: {
        Icon
    },
    data(){
        return {
            items: [
                {
                    title: "首页",
                    type: "home",
                    name: "Home",
                    exact: true
                },
                {
                    title: "文章",
                    type: "blog",
                    name: "Blog",
                    exact: false
                },
                {
                    title: "关于我",
                    type: "about",
                    name: "About",
                    exact: true
                },
                {
                    title: "项目&效果",
                    type: "code",
                    name: "Project",
                    exact: true
                },
                {
                    title: "留言板",
                    type: "chat",
                    name: "Message",
                    exact: true
                }
            ]
        }
    },
    methods: {
        isSelected(item){
            let curPath = location.pathname.toLowerCase();
            let href = item.href.toLowerCase();
            if(item.startWidth){
                return curPath.startsWith(href);
            }else{
                return href === curPath;
            }
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
    color: @gray;
    margin: 15px 0;
    a {
        &.selected {
            background: darken(@words, 3%);
        }
        display: flex;
        height: 35px;
        margin: 10px 0;
        padding: 0 50px;
        align-items: center;
        .icon {
            width: 30px;
            text-align: center;
        }
        &:hover {
            color: #fff;
        }
    }
}
@media screen and (min-width: 500px){
    .media-title{
        display: block;
    }
}

@media screen and (max-width: 500px){
    .media-title{
        display: none;
    }
    .menu-container{
        a{
            padding: 0;
        }
    }
}
</style>