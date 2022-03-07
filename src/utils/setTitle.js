let routerTitle = "",
    siteTitle = "";

function titleControl(){
    if(!routerTitle && !siteTitle){
        document.title = "laoding...";
    }else if(routerTitle && !siteTitle){
        document.title = routerTitle;
    }else if(!routerTitle && siteTitle){
        document.title = siteTitle;
    }else{
        document.title = routerTitle + "-" + siteTitle
    }
}


export default {
    setRouterTitle(title){
        //设置路由标题
        routerTitle = title;
        titleControl()
    },
    setSiteTitle(title){
        //设置网站标题
        siteTitle = title;
        titleControl()
    }
}