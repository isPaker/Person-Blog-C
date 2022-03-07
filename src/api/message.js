import request from "./request.js";
// 获取评论数据
export async function getMessage(page=1, limit=10){
    return await request.get("/api/message", {
        params: {
            page,
            limit,
        }
    })
}

// 提交评论
export async function postMessage(commentInfo){
    return await request.post("/api/message", commentInfo)
}