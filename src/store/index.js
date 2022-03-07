import Vue from "vue"
import Vuex from "vuex"
import setting from "./setting.js"
import banner from "./banner.js"
import about from "./about.js"
import project from "./project.js"

if(!window.Vuex){
    Vue.use(Vuex);
}

export default new Vuex.Store({
    modules: {
        setting,
        banner,
        about,
        project,
    },
    strict: true,
})