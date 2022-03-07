import request from "./request";

// 获取分页博客数据
export async function getBlogData(page=1, limit=10, categoryid=-1){
    return await request.get("/api/blog", {
        params: {
            page,
            limit,
            categoryid,
        }
    })
}

// 获取博客分类
export async function getBlogType(){
    return await request.get("/api/blogtype");
}

// 获取单个博客数据
export async function getBlog(id){
    return await request.get(`/api/blog/${id}`);
}

// 获取评论数据
export async function getComments(page=1, limit=10, blogid){
    return await request.get("/api/comment", {
        params: {
            page,
            limit,
            blogid,
        }
    })
}

// 提交评论
export async function postComment(commentInfo){
    return await request.post("/api/comment", commentInfo)
}