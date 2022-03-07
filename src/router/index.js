import routes from "@/router/routes.js";
import Vue from 'vue';
import VueRouter from "vue-router";
import {setTitle} from "@/utils";

if(!window.VueRouter){
  Vue.use(VueRouter);  //使用一个Vue插件
}

const router = new VueRouter({
    // 配置路由规则
  routes,
  mode: "history"
});

router.afterEach((to, from) => {
  if(to.meta.title){
    setTitle.setRouterTitle(to.meta.title);
  }
})

export default router;