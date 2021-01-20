const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * dev-server只能用于开发环境
 * 
 */


module.exports = {
    entry: './src/js/index.js',
    output: {
        //文件名称 (指定名称+目录)
        filename: 'js/[name].js',
        //输出文件目录(将来所有资源输出的公共目录)
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //loader配置
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devServer: {
        //运行代码的目录
        contentBase: resolve(__dirname, 'build'),
        //监视contentBase目录下的文件，一旦文件变化，就会reload
        watchContentBse: true,
        //监视文件时，忽略某些文件
        watchOptions: {
            //忽略文件
            ignored: /node_modules/
        },
        //启动gzip压缩
        compress: true,
        port: 5000,
        host: 'localhost',
        //自动打开浏览器
        open: true,
        //开启HMR功能
        hot: true,
        //不需要显示启动服务器日志信息
        clientLogLevel: 'none',
        //除了一些基本启动信息外，其他内容都不要显示
        quiet: true,
        //如果出错了，不要全屏提示
        overlay: false,
        //服务器代理-----> 解决开发环境的跨域问题
        proxy: {
            //一旦devServer(5000) 服务器接收到/api/xxx的请求，就会把请求转发到另一个服务器(3000)
            '/api': {
                target: 'http://localhost:3000',
                //发送请求时，请求路径重写：将/api/xxx ----> /xxx(去掉/api)
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    },
    mode: 'development'
}