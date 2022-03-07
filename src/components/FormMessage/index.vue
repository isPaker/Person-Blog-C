<template>
  <div class="form-message-container" id="comment-list">
      <FormData @submit="handleSubmit" />
      <h2>
          <span>{{title}}</span>
          <span>{{subTitle}}</span>
      </h2>
      <MessageList :list="list" />
      <div class="loading" v-loading="isListLoading"></div>
      <div class="nomore" v-if="isShow">没有更多了...</div>
  </div>
</template>

<script>
import FormData from "./FormData.vue";
import MessageList from "./MessageList.vue";
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
        subTitle: {
            type: String,
            default: "",
        },
        list: {
            type: Array,
            default: [],
        },
        isListLoading: {
            type: Boolean,
            default: false,
        },
        isShow: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        FormData,
        MessageList,
    },
    methods: {
        handleSubmit(formData, callback){
            this.$emit("submit", formData, callback)
        }
    }
}
</script>

<style lang="less" scoped>
.form-message-container {
    h2{
        font-size: 1em;
    }
    .loading {
        height: 50px;
        position: relative;
    }
    .nomore {
        text-align: center;
    }
}
</style>