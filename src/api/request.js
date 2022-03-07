import axios from "axios";
import showMessage from "@/utils/showMessage.js";

const ins = axios.create();  //创建一个axios实例, 拦截器
ins.interceptors.response.use(function(resp){ //先运行函数，在将结果返回
    if(resp.data.code !== 0){
        showMessage({
            content: resp.data.msg,
            type: "error",
        })
        return null;
    }
    // showMessage({
    //     content: resp.data.msg,
    //     type: "success",
    // })
    return resp.data.data;
});

export default ins;