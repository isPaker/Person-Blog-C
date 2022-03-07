import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";
import NotFound from "@/views/NotFound.vue";

configure({
  trickleSpeed: 10,
  showSpinner: false,
})

function getComponent(compReslover){
  return async () => {
    start();
    const comp = await compReslover();
    done();
    return comp;
  }
}

export default [
  {
    name: "Home",
    path: "/",
    component: getComponent(()=>import(/*webpackChunkName: "home"*/ "@/views/Home")),
    meta: { title: "首页" }
  },
  {
    name: "Blog",
    path: "/blog",
    component: getComponent(()=>import(/*webpackChunkName: "blog"*/ "@/views/Blog")),
    meta: { title: "文章" }
  },
  {
    name: "BlogCategory",
    path: "/blog/cate/:categoryId", 
    component: getComponent(()=>import(/*webpackChunkName: "blog"*/ "@/views/Blog")),
    meta: { title: "文章" }
  },
  {
    name: "BlogDetail",
    path: "/blog/:id",
    component: getComponent(()=>import(/*webpackChunkName: "blogDetail"*/ "@/views/Blog/BlogDetail.vue")),
    meta: { title: "文章详情" }
  },
  {
    name: "About",
    path: "/about",
    component: getComponent(()=>import(/*webpackChunkName: "about"*/ "@/views/About")),
    meta: { title: "关于我" }
  },
  {
    name: "Project",
    path: "/project",
    component: getComponent(()=>import(/*webpackChunkName: "project"*/ "@/views/Project")),
    meta: { title: "项目&效果" }
  },
  {
    name: "Message",
    path: "/message",
    component: getComponent(()=>import(/*webpackChunkName: "message"*/ "@/views/Message")),
    meta: { title: "留言板" }
  },
  {
    name: "NotFound",
    path: "*",
    component: NotFound,
  },
];