import request from "./request.js";
export async function getBanner(){
    return await request.get("/api/banner")
}