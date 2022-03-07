import eventBus from "@/eventBus.js";
import defaultGif from "@/assets/default.gif";
import { debounce } from "@/utils";
eventBus.$on("mainScroll", debounce(lazyHandleScroll, 50))

function lazyHandleScroll(){
    for(const img of imgs){
        setImage(img);
    }
}
function setImage(img){
    img.dom.src = defaultGif;
    const rect = img.dom.getBoundingClientRect();
    const clientHeight = document.documentElement.clientHeight;
    const height = rect.height || 100;
    if(rect.top >= -height && rect.top < clientHeight){
        img.dom.src = img.src;
        imgs = imgs.filter((i) => i !== img);
    }
}

let imgs = [];
export default {
    inserted: function(el, binding){
        // console.log(el, binding.value)
        const img = {
                dom: el,
                src: binding.value,
            };
        imgs.push(img);
        //初始化
        setImage(img);
    },
    unbind(el) {
        imgs = imgs.filter((img) => img.dom !== el);
    },
}