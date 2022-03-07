// 入口文件
import Vue from 'vue';
import App from './App.vue';
import "./styles/reset.less";
import router from "@/router";
// import "@/mock";
import "./eventBus.js";
import store from "@/store";

import {showMessage} from "@/utils";
Vue.prototype.$showMessage = showMessage;
// 自定义loading指令
import Loading from "@/directives/loading.js";
Vue.directive("loading", Loading);
// 自定义 lazy 指令
import vlazy from "@/directives/lazy.js";
Vue.directive("lazy", vlazy);

store.dispatch("setting/fetchSetting");

new Vue({
  store,
  router,
  // render: h => h(App),
  render: h => h(App),
}).$mount('#app')

// 测试
//  import * as blogApi from "@/api/blog.js";
// console.log(blogApi)
// blogApi.getBlogType().then((resp)=> {
//   console.log(resp)
// })
// blogApi.getBlogData().then((resp)=>{
//   console.log(resp);
// })
// blogApi.getBlog("aaaaa").then((r)=>{
//   console.log(r)
// })
//获取评论
// blogApi.getComments().then((r)=>{
//   console.log(r)
// })
//提交评论
// blogApi.postComment({
//   nickname: "昵称",
//   content: "评论内容，纯文本",
//   blogId: "123",
// })
// .then((r) => {
//   console.log(r);
// });