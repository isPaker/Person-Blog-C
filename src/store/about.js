import {getAbout} from "@/api/about.js"
export default {
    namespaced: true,
    state: {
        loading: false,
        data: null,
    },
    mutations: {
        setLoading(state, payload){
            state.loading = payload;
        },
        setData(state, payload){
            state.data = payload;
        },
    },
    actions: {
        async fetchAbout(ctx){
            ctx.commit("setLoading", true)
            const resp = await getAbout();
            console.log("fetchAbout>>>", resp)
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false)
        }
    }
}