<template>
  <div class="sidebar-container">
    <template v-if="data">
        <Avatar :url="data.avatar" v-if="data" class="media-avatar" />
        <h1 class="title media-title" v-if="data">{{data.siteTitle}}</h1>
        <Menu />
        <Contact class="media-contact" />
        <p class="footer media-footer">
            {{data.icp}}
        </p>
    </template>
  </div>
</template>

<script>
import Menu from "@/components/Sidebar/Menu/Menu.vue";
import Contact from "@/components/Sidebar/Contact/Contact.vue";
import Avatar from "@/components/Avatar/Avatar.vue";
import {mapState} from "vuex";
export default {
    components: {
        Menu,
        Contact,
        Avatar
    },
    computed: mapState("setting", ["data"])
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.sidebar-container {
    // width: 16em;
    height: 100%;
    background: @dark;
    overflow: hidden;
    // overflow-y: auto;
    padding: 20px 0;
    box-sizing: border-box;
    position: relative;
    .avatar-container {
        margin: 0 auto;
    }
    .footer {
        text-align: center;
        font-size: 12px;
    }
    .title {
        text-align: center;
        color: #fff;
        font-size: 1.2rem;
    }
}
@media screen and (min-width: 500px){
    .sidebar-container{
        width: 16rem;
    }
    .media-avatar, .media-title, .media-contact, .media-footer{
        display: block;
    }
}

@media screen and (max-width: 500px){
    .sidebar-container{
        width: 30px;
    }
    .media-avatar, .media-title, .media-contact, .media-footer{
        display: none;
    }
}
</style>