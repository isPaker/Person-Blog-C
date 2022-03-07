<template>
  <ul class="message-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar" :size="40"/>
      <div class="message-content">
        <div class="nickname">{{item.nickname}}</div>
        <div class="content">{{item.content}}</div>
        <div class="time">{{item.createDate}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar/Avatar.vue";
export default {
  components: {
    Avatar,
  },
  props: {
    list: {
      type: Array,
      default: ()=>[],
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.message-list-container {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  li{
    display: flex;
    margin: 15px 0;
    border-bottom: 1px solid @gray;
  }
  .message-content{
    margin-left: 15px;
    flex: 1 1 auto;
    position: relative;
    font-size: 1em;
    .nickname {
      margin-top: 10px;
      color: @primary;
    }
    .content {
      padding: 10px 0;
    }
    .time{
      position: absolute;
      top: 15px;
      right: 0;
      font-size: 0.8em;
      color: @gray;
    }
  }
}
</style>