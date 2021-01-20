const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
    entry: './src/index.js',
    output: {
        //文件名称 (指定名称+目录)
        filename: 'js/[name].js',
        //输出文件目录(将来所有资源输出的公共目录)
        path: resolve(__dirname, 'build')
    },
    module: {
        rule: [
            //loader配置
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.js$/,
                //排除node_modules下的js文件
                exclude: /node_modules/,
                //只检查src下面的js文件 这样性能更好
                include:  resolve(__dirname, 'src'),
                //优先执行 一般不写的话，默认为中间执行
                enforce: 'pre',
                //延后执行
                // enforce: 'post'
                //单个loader用loader作为key就可以
                loader: 'eslint-loader'
            },
            {
                //以下配置只会生效一个
                oneof: [

                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}