import Mock from "mockjs";
import qs from "querystring";

// 获取评论数据
Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function(options){
    const query = qs.parse(options.url)
    return Mock.mock({
        code: 0,
        msg: "",
        data: { 
            "total|50-105": 0,
            [`rows|${query.limit || 10}`]: [
                {
                    id: "@guid",
                    nickname: "@cname",
                    content: "@cparagraph(1, 10)",
                    createDate: "@date('yyyy-MM-dd')",
                    "avatar|1": [
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
                      ],
                },
            ],
        },
    });
})

// 提交评论
Mock.mock("/api/message", "post", {
    code: 0,
    msg: "",
    data: {
        id: "@guid",
        nickname: "@cname",
        content: "@cparagraph(1, 10)",
        createDate: "@date('yyyy-MM-dd')",
        "avatar|1": [
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
        ],
    },
})