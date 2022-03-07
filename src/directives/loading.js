import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";

function creatLoadingImg(){
    const img = document.createElement("img");
    img.dataset.role = "loading";
    img.src=loadingUrl;
    img.className = styles.loading;
    return img;
}

function getLoadingImg(el){
    return el.querySelector("img[data-role=loading]");
}

export default function(el, bingding){
    const curImg = getLoadingImg(el);
    if(bingding.value){
        if(!curImg){
            const img = creatLoadingImg();
            el.appendChild(img);
        }
    }else{
        if(curImg){
            curImg.remove();
        }
    }
    
}