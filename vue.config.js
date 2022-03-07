module.exports = {
    devServer: {
        proxy: {
            "/api": {
                // target: "http://www.test.com"
                target: "http://127.0.0.1:7001"
            },
            "/static" : {
                target: "http://127.0.0.1:7001"
            }
        }
    },
    configureWebpack: require("./webpack.config.js"),
}