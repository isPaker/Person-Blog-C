import getComponent from "./getComponent";
import Icon from "@/components/Icon/Icon.vue";
import styles from "./showMessage.module.less";

/**
 * @description: 弹出消息
 * @param {String} content 消息内容
 * @param {type} type  消息类型
 * @param {duration} duration  消息消失延迟时间
 * @param {container} container  弹出消息的父元素
 */
export default function(options = {}){
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;

    // 创建一个DOM
    const oDiv = document.createElement("div");
    const iconDom = getComponent(Icon, {type});
    oDiv.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    // 设置样式
    const typeClassName = styles[`message-${type}`];
    oDiv.className = `${styles.message} ${typeClassName}`;
    // 加入到容器中
    if(options.container){
        if(getComputedStyle(container).position == "static"){
            container.style.position = "relative";
        }
    }
    container.appendChild(oDiv);
    // 重新渲染
    oDiv.clientHeight;
    oDiv.style.opacity = 1;
    oDiv.style.transform = `translate(-50%, -50%) translateY(0)`;
    // 消失
    setTimeout(function(){
        oDiv.style.opacity = 0;
        oDiv.style.transform = `translate(-50%, -50%) translateY(-25px)`;
        oDiv.addEventListener("transitionend",function(){
            oDiv.remove();
            options.callback && options.callback();
        },true)
    }, duration)

}